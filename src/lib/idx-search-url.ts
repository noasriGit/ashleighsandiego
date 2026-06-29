// Build IDX Broker search URLs from community search config.
// See: https://support.idxbroker.com/hc/en-us/articles/34489458510619
//
// Results pages honor IDX shortcodes (lp/hp/bd/tb), not minPrice/maxPrice/minBed.

import type { IdxSearchConfig } from "@/data/idx-search-config";
import { IDX_MLS_ID } from "@/data/site-config";
import { RESIDENTIAL_IDX_PROPERTY_TYPES } from "@/lib/idx-residential-filter";

const IDX_RESULTS_PATH = "/idx/results/listings";

// Default IDX Broker hosts (e.g. nvdigitalconsulting.idxbroker.com) that saved-search URLs
// and listing detail URLs point at before the branded subdomain is wired up.
const IDX_DEFAULT_HOST_PATTERN = /(^|\.)idxbroker\.com$/i;

/**
 * Rewrite a default IDX Broker host to the branded subdomain, preserving the path and query.
 * Returns the input unchanged when it is empty, already branded, or not parseable. This keeps
 * users on search.[domain].com instead of the raw IDX broker host.
 */
export function normalizeIdxUrl(
  url: string | undefined | null,
  baseUrl: string = process.env.NEXT_PUBLIC_IDX_BASE_URL ?? "",
): string | undefined {
  if (!url) return undefined;
  const root = baseUrl.replace(/\/$/, "");
  if (!root) return url;

  try {
    const parsed = new URL(url);
    if (!IDX_DEFAULT_HOST_PATTERN.test(parsed.hostname)) return url;
    const base = new URL(root);
    parsed.protocol = base.protocol;
    parsed.host = base.host;
    return parsed.toString();
  } catch {
    return url;
  }
}

export type IdxSearchUrlOptions = {
  /** Override zip codes (defaults to config.zipCodes). */
  zipCodes?: string[];
  minPrice?: number;
  maxPrice?: number;
  minBed?: number;
  minBath?: number;
  /** IDX Broker system property type (e.g. sfr, rnt). See pt shortcode docs. */
  propertyType?: string;
};

/**
 * Build a pre-filtered IDX results URL for a community search config.
 * Returns null when no base URL or no filter criteria are available.
 */
export function buildIdxSearchUrl(
  baseUrl: string,
  config: IdxSearchConfig,
  options: IdxSearchUrlOptions = {},
): string | null {
  const root = baseUrl.replace(/\/$/, "");
  if (!root) return null;

  const params = new URLSearchParams();

  const zipCodes = options.zipCodes ?? config.zipCodes;
  zipCodes.forEach((zip) => params.append("zipcode[]", zip));
  config.cityIds.forEach((id) => params.append("city[]", String(id)));

  const minPrice = options.minPrice ?? config.minPrice;
  const maxPrice = options.maxPrice ?? config.maxPrice;
  // IDX results.php reads lp (low) / hp (high) price shortcodes, not minPrice/maxPrice.
  if (minPrice != null) params.set("lp", String(minPrice));
  if (maxPrice != null) params.set("hp", String(maxPrice));
  if (options.minBed != null) params.set("bd", String(options.minBed));
  if (options.minBath != null) params.set("tb", String(options.minBath));
  if (options.propertyType) {
    params.set("pt", options.propertyType);
  } else {
    RESIDENTIAL_IDX_PROPERTY_TYPES.forEach((pt) => params.append("pt[]", pt));
  }

  params.set("idxID", IDX_MLS_ID);

  // Active listings only (standard IDX saved-link default).
  params.append("a_status[]", "active");

  const hasGeo = zipCodes.length > 0 || config.cityIds.length > 0;
  const appliesResidentialFilter = !options.propertyType;
  const hasCriteria =
    hasGeo ||
    minPrice != null ||
    maxPrice != null ||
    options.minBed != null ||
    options.minBath != null ||
    Boolean(options.propertyType) ||
    appliesResidentialFilter;

  if (!hasCriteria) {
    return root;
  }

  return `${root}${IDX_RESULTS_PATH}?${params.toString()}`;
}

/**
 * Resolve the best browse URL for a community.
 *
 * When zip/city filters exist in config, prefer the dynamic results URL built from
 * community-zips.ts — IDX saved /i/ links may exist before their queryString is
 * configured in the Control Panel (common during MLS onboarding).
 *
 * Falls back to savedSearchUrl for entries without geographic filters, then dynamic.
 */
export function resolveIdxBrowseUrl(
  baseUrl: string,
  config: IdxSearchConfig,
  options?: IdxSearchUrlOptions,
): string | null {
  const zipCodes = options?.zipCodes ?? config.zipCodes;
  const hasGeoFilter = zipCodes.length > 0 || config.cityIds.length > 0;
  const dynamic = buildIdxSearchUrl(baseUrl, config, options);

  if (hasGeoFilter && dynamic) {
    return dynamic;
  }

  if (config.savedSearchUrl) {
    return normalizeIdxUrl(config.savedSearchUrl, baseUrl) ?? config.savedSearchUrl;
  }

  return dynamic;
}

/**
 * Pick the IDX destination for a filtered search form.
 * With filters, build a dynamic results URL so criteria apply.
 * Without filters, prefer the branded saved-search landing when available.
 */
export function resolveIdxSearchFromFilters(
  baseUrl: string,
  config: IdxSearchConfig,
  filters: IdxSearchUrlOptions,
): string {
  const hasFilters = Boolean(
    filters.minPrice != null ||
      filters.maxPrice != null ||
      filters.minBed != null ||
      filters.minBath != null ||
      filters.propertyType,
  );

  // Rental saved searches are sale-focused; always build a dynamic URL for rentals.
  if (hasFilters || filters.propertyType === "rnt") {
    return buildIdxSearchUrl(baseUrl, config, filters) ?? baseUrl;
  }

  return resolveIdxBrowseUrl(baseUrl, config) ?? baseUrl;
}
