// Server-only IDX Broker API client (extended API-first build).
//
// Reads IDX_API_KEY (never exposed to the browser). All functions are defensive: they
// return [] / null / {} on any error or when the key is missing, so pages render without
// listing cards if the API is unavailable. Responses are cached via fetch revalidation to
// stay well within partner rate limits (~1,500 req/hr per client).
//
// IDX API constraints (documented):
//   • /clients/featured     , agent's own featured listings; full payload; isOnSite=true
//   • /clients/savedlinks/{id}/results, up to 250 community MLS listings; isOnSite=false
//   • /clients/supplemental , manually-added non-MLS listings; flat array; isOnSite=false
//   • No single-listing MLS lookup by arbitrary ID exists in the API
//   • Full MLS browse, registration, favorites, and alerts stay on the IDX subdomain
//
// isOnSite flag drives ListingCard link routing:
//   true  → /listings/[idxId]/[listingId] on the main domain (full on-site detail page)
//   false → fullDetailsURL on the branded subdomain (wrapper-styled IDX page)
//
// IDX_API_KEY has no NEXT_PUBLIC_ prefix, never included in the client bundle.
// Only import this module from Server Components / server code.

import { getIdxSearchConfig } from "@/data/idx-search-config";
import { normalizeIdxUrl } from "@/lib/idx-search-url";
import { cache } from "react";

const IDX_API_BASE = "https://api.idxbroker.com";

const REVALIDATE_LISTINGS = 15 * 60;
const REVALIDATE_COUNTS = 60 * 60;
const REVALIDATE_METADATA = 24 * 60 * 60;

// Safety cap: at 50 listings/page this allows up to 500 featured listings per full scan,
// well above the known 202 total, guarding against an unexpected pagination loop.
const MAX_FEATURED_PAGES = 10;

// ─── Public types ────────────────────────────────────────────────────────────

export type IdxListing = {
  /** Composite key "{idxId}!{listingId}", use as React key only. */
  id: string;
  /** MLS prefix, e.g. "a000". Segment 1 of /listings/[idxId]/[listingId]. */
  idxId?: string;
  /** MLS listing number, e.g. "M1364182". Segment 2 of /listings/[idxId]/[listingId]. */
  listingId?: string;

  address: string;
  city?: string;
  state?: string;
  zipcode?: string;
  county?: string;
  /** When false the MLS requires the street address be hidden from display. */
  displayAddress?: boolean;

  price?: string;

  beds?: string;
  /** Total baths (full + partial). */
  baths?: string;
  fullBaths?: string;
  partialBaths?: string;
  sqft?: string;
  acres?: string;
  yearBuilt?: string;
  propertyType?: string;
  status?: string;

  /** URL of the first listing photo. */
  imageUrl?: string;
  /** All photo URLs in order, drives the on-site detail gallery. */
  allImages?: string[];

  /** fullDetailsURL normalized to the branded subdomain. */
  detailUrl?: string;
  /** Property description (remarksConcat field). */
  remarks?: string;

  listingAgentId?: string;
  listingOfficeId?: string;

  latitude?: string;
  longitude?: string;

  /**
   * true  = listing came from /clients/featured; on-site detail page available at
   *         /listings/[idxId]/[listingId] on the main domain.
   * false = listing came from /clients/savedlinks/{id}/results or /clients/supplemental;
   *         detail link goes to the branded subdomain (fullDetailsURL).
   */
  isOnSite: boolean;
};

/** Filters accepted by getFeaturedListingsPage and getCommunityListings. */
export type FeaturedPageFilters = {
  zipCodes?: string[];
  cityIds?: number[];
};

/** Return shape for paginated featured listing fetches. */
export type FeaturedPage = {
  listings: IdxListing[];
  /** Total featured listing count as reported by the API envelope. */
  total?: number;
  /** Whether there are more pages after this one. */
  hasMore: boolean;
  /** Offset to pass on the next call when hasMore is true. */
  nextOffset?: number;
};

// ─── Internal helpers ────────────────────────────────────────────────────────

type RawListing = Record<string, unknown>;

function str(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return String(value);
  return undefined;
}

function firstImageUrl(images: unknown): string | undefined {
  if (!images || typeof images !== "object") return undefined;
  for (const value of Object.values(images as Record<string, unknown>)) {
    if (value && typeof value === "object") {
      const url = str((value as Record<string, unknown>).url);
      if (url) return url;
    }
  }
  return undefined;
}

function allImageUrls(images: unknown): string[] {
  if (!images || typeof images !== "object") return [];
  const urls: string[] = [];
  for (const value of Object.values(images as Record<string, unknown>)) {
    if (value && typeof value === "object") {
      const url = str((value as Record<string, unknown>).url);
      if (url) urls.push(url);
    }
  }
  return urls;
}

function normalizeListing(raw: RawListing, isOnSite: boolean): IdxListing | null {
  const listingId = str(raw.listingID) ?? str(raw.id);
  const idxId = str(raw.idxID);
  const id = idxId && listingId ? `${idxId}!${listingId}` : (listingId ?? idxId ?? "");
  const address = str(raw.address) ?? str(raw.streetName);
  if (!id || !address) return null;

  const rawPrice = str(raw.listingPrice) ?? str(raw.price);
  const images = raw.image;
  const displayAddressRaw = str(raw.displayAddress);

  const imgAll = allImageUrls(images);

  return {
    id,
    idxId,
    listingId,
    address,
    city: str(raw.cityName) ?? str(raw.city),
    state: str(raw.state),
    zipcode: str(raw.zipcode),
    county: str(raw.countyName),
    displayAddress: displayAddressRaw !== undefined ? displayAddressRaw !== "n" : undefined,
    price: rawPrice
      ? `$${Number(rawPrice.replace(/[^0-9.]/g, "")).toLocaleString()}`
      : undefined,
    beds: str(raw.bedrooms) ?? str(raw.totalBedrooms),
    baths: str(raw.totalBaths) ?? str(raw.bathrooms),
    fullBaths: str(raw.fullBaths),
    partialBaths: str(raw.partialBaths),
    sqft: str(raw.sqFt) ?? str(raw.totalSqFt),
    acres: str(raw.acres),
    yearBuilt: str(raw.yearBuilt),
    propertyType: str(raw.idxPropType) ?? str(raw.propType),
    status: str(raw.propStatus) ?? str(raw.idxStatus),
    imageUrl: firstImageUrl(images) ?? str(raw.imageUrl as unknown),
    allImages: imgAll.length > 0 ? imgAll : undefined,
    detailUrl: normalizeIdxUrl(str(raw.fullDetailsURL) ?? str(raw.detailsURL)),
    remarks: str(raw.remarksConcat),
    listingAgentId: str(raw.listingAgentID),
    listingOfficeId: str(raw.listingOfficeID),
    latitude: str(raw.latitude),
    longitude: str(raw.longitude),
    isOnSite,
  };
}

/** Unwrap both paginated ({ data, next, total }) and flat listing responses. */
type ListingEnvelope = {
  listings: RawListing[];
  next: string | null;
  total?: number;
};

function unwrapEnvelope(data: unknown): ListingEnvelope {
  if (!data) return { listings: [], next: null };

  if (Array.isArray(data)) {
    return {
      listings: (data as RawListing[]).filter((v) => v && typeof v === "object"),
      next: null,
    };
  }

  if (typeof data !== "object") return { listings: [], next: null };

  const obj = data as Record<string, unknown>;
  const isPaginated =
    ("total" in obj || "first" in obj || "next" in obj) &&
    obj.data != null &&
    typeof obj.data === "object";

  if (isPaginated) {
    const raw = obj.data;
    const listings = Array.isArray(raw)
      ? (raw as RawListing[]).filter((v) => v && typeof v === "object")
      : Object.values(raw as Record<string, RawListing>).filter(
          (v) => v && typeof v === "object",
        );
    return {
      listings,
      next: typeof obj.next === "string" ? obj.next : null,
      total: typeof obj.total === "number" ? obj.total : undefined,
    };
  }

  // Non-paginated object keyed by listing composite key.
  const listings = Object.values(obj).filter(
    (v) => v && typeof v === "object" && !Array.isArray(v),
  ) as RawListing[];
  return { listings, next: null };
}

function normalizeEnvelope(
  data: unknown,
  limit: number,
  isOnSite: boolean,
): IdxListing[] {
  const { listings } = unwrapEnvelope(data);
  return listings
    .map((r) => normalizeListing(r, isOnSite))
    .filter((l): l is IdxListing => l !== null)
    .slice(0, limit);
}

function isApiEnabled(): boolean {
  if (!process.env.IDX_API_KEY) return false;
  return process.env.IDX_API_ENABLED !== "false";
}

async function idxApiFetch(path: string, revalidate: number): Promise<unknown | null> {
  const apiKey = process.env.IDX_API_KEY;
  if (!apiKey || !isApiEnabled()) return null;

  try {
    const res = await fetch(`${IDX_API_BASE}${path}`, {
      headers: { accesskey: apiKey, outputtype: "json" },
      next: { revalidate },
    });

    if (res.status === 204) return null;

    if (!res.ok) {
      console.error(`[idx-api] ${path} responded ${res.status}`);
      return null;
    }

    const text = await res.text();
    if (!text.trim()) return null;
    try {
      return JSON.parse(text) as unknown;
    } catch {
      console.error(`[idx-api] ${path} returned a non-JSON body`);
      return null;
    }
  } catch (error) {
    console.error(`[idx-api] ${path} failed`, error);
    return null;
  }
}

// ─── Public API functions ────────────────────────────────────────────────────

/**
 * Paginate through ALL featured listings (follows next until null or MAX_FEATURED_PAGES).
 * Used by the on-site detail page to locate a listing by idxId + listingId.
 * Each page is independently cached at 15-min ISR via Next.js fetch.
 */
const getAllFeaturedListingsCached = cache(async (): Promise<IdxListing[]> => {
  if (!isApiEnabled()) return [];

  const all: IdxListing[] = [];
  let offset = 0;
  const limit = 50;

  for (let page = 0; page < MAX_FEATURED_PAGES; page++) {
    const data = await idxApiFetch(
      `/clients/featured?offset=${offset}&limit=${limit}`,
      REVALIDATE_LISTINGS,
    );
    if (!data) break;

    const { listings: raw, next } = unwrapEnvelope(data);
    const normalized = raw
      .map((r) => normalizeListing(r, true))
      .filter((l): l is IdxListing => l !== null);

    all.push(...normalized);

    if (!next || normalized.length === 0) break;
    offset += limit;
  }

  return all;
});

export async function getAllFeaturedListings(): Promise<IdxListing[]> {
  return getAllFeaturedListingsCached();
}

/**
 * Find a single featured listing by its idxId + listingId pair.
 * Returns null when the listing is not in the agent's featured set (→ fall back to
 * linking to fullDetailsURL on the branded subdomain).
 */
const getFeaturedListingCached = cache(
  async (idxId: string, listingId: string): Promise<IdxListing | null> => {
  if (!isApiEnabled()) return null;

  let offset = 0;
  const limit = 50;

  for (let page = 0; page < MAX_FEATURED_PAGES; page++) {
    const data = await idxApiFetch(
      `/clients/featured?offset=${offset}&limit=${limit}`,
      REVALIDATE_LISTINGS,
    );
    if (!data) break;

    const { listings: raw, next } = unwrapEnvelope(data);
    const normalized = raw
      .map((r) => normalizeListing(r, true))
      .filter((l): l is IdxListing => l !== null);

    const found = normalized.find(
      (listing) => listing.idxId === idxId && listing.listingId === listingId,
    );
    if (found) return found;

    if (!next || normalized.length === 0) break;
    offset += limit;
  }

    return null;
  },
);

export async function getFeaturedListing(
  idxId: string,
  listingId: string,
): Promise<IdxListing | null> {
  return getFeaturedListingCached(idxId, listingId);
}

/**
 * Single page of featured listings with optional geographic filter.
 * Used by the /listings paginated browse route.
 */
export async function getFeaturedListingsPage(
  offset = 0,
  limit = 50,
  filters?: FeaturedPageFilters,
): Promise<FeaturedPage> {
  if (!isApiEnabled()) return { listings: [], hasMore: false };

  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
  });
  filters?.zipCodes?.forEach((zip) => params.append("zipcode[]", zip));
  filters?.cityIds?.forEach((id) => params.append("city[]", String(id)));

  const data = await idxApiFetch(`/clients/featured?${params}`, REVALIDATE_LISTINGS);
  if (!data) return { listings: [], hasMore: false };

  const { listings: raw, next, total } = unwrapEnvelope(data);
  const listings = raw
    .map((r) => normalizeListing(r, true))
    .filter((l): l is IdxListing => l !== null);

  return {
    listings,
    total,
    hasMore: Boolean(next) && listings.length > 0,
    nextOffset: listings.length > 0 ? offset + listings.length : undefined,
  };
}

/**
 * Featured listings filtered to a community's city IDs / zip codes.
 *
 * Priority:
 *   1. Saved-link results (/clients/savedlinks/{id}/results) when savedSearchId is set,
 *      returns real community MLS listings (up to 250, isOnSite=false).
 *   2. Featured listings filtered by zip/city, agent's own featured set (isOnSite=true).
 *   3. Empty [], never falls through to the unfiltered featured set, so wrong-market
 *      demo listings never appear on a community page.
 */
export async function getCommunityListings(
  slug?: string,
  limit = 6,
): Promise<IdxListing[]> {
  if (!isApiEnabled()) return [];

  const config = getIdxSearchConfig(slug);

  // 1. Saved-link results for this community (real MLS, up to 250 listings).
  if (config.savedSearchId) {
    const saved = await getSavedLinkResults(config.savedSearchId, limit);
    if (saved.length > 0) return saved;
  }

  // 2. Featured listings filtered by community zip / city.
  const params = new URLSearchParams();
  config.cityIds.forEach((id) => params.append("city[]", String(id)));
  config.zipCodes.forEach((zip) => params.append("zipcode[]", zip));

  const query = params.toString();

  // When the slug is undefined (general homepage case) and there are no zip/city
  // constraints, fetch all featured listings unfiltered.
  const path = query ? `/clients/featured?${query}` : "/clients/featured";
  const data = await idxApiFetch(path, REVALIDATE_LISTINGS);

  // Strict geo guard: return exactly what the filter matched, no fallthrough.
  return normalizeEnvelope(data, limit, true);
}

/**
 * Up to `limit` MLS listings from a saved search's result set.
 * These are real community listings (isOnSite=false, detail goes to branded subdomain).
 *
 * Returns [] when savedLinkId is empty, the API is unavailable, or the saved search
 * has no results (e.g. before the real MLS feed is active).
 */
export async function getSavedLinkResults(
  savedLinkId: string | undefined,
  limit = 6,
): Promise<IdxListing[]> {
  if (!savedLinkId || !isApiEnabled()) return [];

  const data = await idxApiFetch(
    `/clients/savedlinks/${encodeURIComponent(savedLinkId)}/results`,
    REVALIDATE_LISTINGS,
  );
  return normalizeEnvelope(data, limit, false);
}

/**
 * Live property count for a single saved search via the per-link count endpoint.
 * Preferred over getAllSavedSearchCounts() because the bulk endpoint returns 400
 * on accounts without active saved searches (e.g. demo/a000 accounts).
 * Returns null when unavailable.
 */
export async function getSavedLinkCount(
  savedLinkId: string | undefined,
): Promise<number | null> {
  if (!savedLinkId || !isApiEnabled()) return null;

  const data = await idxApiFetch(
    `/clients/savedlinks/${encodeURIComponent(savedLinkId)}/count`,
    REVALIDATE_COUNTS,
  );
  if (data == null) return null;
  if (typeof data === "number") return data;
  if (typeof data === "string") {
    const n = Number((data as string).replace(/[^0-9.]/g, ""));
    return Number.isNaN(n) ? null : n;
  }
  if (typeof data === "object") {
    // Some IDX responses wrap the count: { "count": 42 } or { "total": 42 }
    const obj = data as Record<string, unknown>;
    const raw = obj.count ?? obj.total ?? obj.properties;
    if (typeof raw === "number") return raw;
    if (typeof raw === "string") {
      const n = Number((raw as string).replace(/[^0-9.]/g, ""));
      return Number.isNaN(n) ? null : n;
    }
  }
  return null;
}

/**
 * Live property counts for every saved search, keyed by saved-search ID.
 * Returns {} on error.
 *
 * NOTE: this bulk endpoint returns HTTP 400 on demo accounts and on accounts
 * where no saved searches have been created yet. Prefer getSavedLinkCount() for
 * community pages; use this only when you need counts for all searches at once.
 */
export async function getAllSavedSearchCounts(): Promise<Record<string, number>> {
  const data = await idxApiFetch(
    "/clients/savedlinkstotalpropertycount",
    REVALIDATE_COUNTS,
  );
  if (!data || typeof data !== "object") return {};

  const out: Record<string, number> = {};
  for (const [id, value] of Object.entries(data as Record<string, unknown>)) {
    if (typeof value === "number") {
      out[id] = value;
    } else if (typeof value === "string" && value.trim() !== "") {
      const n = Number(value.replace(/[^0-9.]/g, ""));
      if (!Number.isNaN(n)) out[id] = n;
    }
  }
  return out;
}

/**
 * Live property count for a single saved search.
 * Routes through getSavedLinkCount() (the per-link endpoint) instead of the bulk
 * endpoint which returns 400 on accounts without active saved searches.
 */
export async function getSavedSearchCount(
  savedSearchId?: string,
): Promise<number | null> {
  return getSavedLinkCount(savedSearchId);
}

/**
 * One-time setup helper. Returns the raw list of cities (with IDX numeric IDs) so you
 * can populate `cityIds` in idx-search-config.ts. Not used at render time. Cached 24h.
 */
export async function getAvailableCities(): Promise<unknown> {
  return idxApiFetch("/clients/cities", REVALIDATE_METADATA);
}

/**
 * One-time setup helper. Returns saved-search metadata (IDs, names, URLs) so you can
 * populate `savedSearchId` / `savedSearchUrl` in idx-search-config.ts. Cached 24h.
 */
export async function getSavedLinksList(): Promise<unknown> {
  return idxApiFetch("/clients/savedlinks", REVALIDATE_METADATA);
}
