import type { IdxListing } from "@/lib/idx-api";

function parseNumber(value?: string): number | null {
  if (!value?.trim()) return null;
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function isDetachedFamilyType(propertyType?: string): boolean {
  if (!propertyType?.trim()) return false;
  return /\b(single.?family|townhome|town.?home|townhouse|pud|detached|sfr)\b/i.test(
    propertyType,
  );
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo]!;
  const weight = idx - lo;
  return sorted[lo]! * (1 - weight) + sorted[hi]! * weight;
}

type PriceContext = {
  median: number;
  p75: number;
  p90: number;
};

/** Higher scores represent listings that read as realistic family homes. */
export function scoreFamilyHomeListing(
  listing: IdxListing,
  priceContext?: PriceContext,
): number {
  if (!listing.imageUrl) return -1;

  let score = 10;

  const beds = parseNumber(listing.beds);
  const baths = parseNumber(listing.baths);
  const sqft = parseNumber(listing.sqft);
  const price = parseNumber(listing.price);

  if (beds != null) {
    if (beds >= 4) score += 35;
    else if (beds >= 3) score += 30;
    else if (beds >= 2) score += 18;
    else score += 5;
  }

  if (baths != null) {
    if (baths >= 2.5) score += 15;
    else if (baths >= 2) score += 12;
    else if (baths >= 1) score += 5;
  }

  if (sqft != null) {
    if (sqft >= 1200 && sqft <= 4000) score += 20;
    else if (sqft >= 900 && sqft < 1200) score += 10;
    else if (sqft > 4000 && sqft <= 5500) score += 8;
    else score += 2;
  }

  if (isDetachedFamilyType(listing.propertyType)) score += 15;

  if (price != null && priceContext) {
    const { median, p75, p90 } = priceContext;
    if (price > p90) score -= 25;
    else if (price <= p75 && price >= median * 0.65) score += 25;
    else if (price < median * 0.65) score += 15;
    else score += 10;
  }

  return score;
}

/**
 * Pick featured-grid listings that look like typical family homes instead of
 * surfacing the most expensive inventory first.
 */
export function selectFamilyHomeListings(
  listings: IdxListing[],
  limit: number,
): IdxListing[] {
  if (listings.length === 0 || limit <= 0) return [];
  if (listings.length <= limit) return listings;

  const withPhoto = listings.filter((listing) => listing.imageUrl);
  const pool = withPhoto.length >= limit ? withPhoto : listings;

  const prices = pool
    .map((listing) => parseNumber(listing.price))
    .filter((price): price is number => price != null)
    .sort((a, b) => a - b);

  const priceContext: PriceContext | undefined =
    prices.length > 0
      ? {
          median: percentile(prices, 0.5),
          p75: percentile(prices, 0.75),
          p90: percentile(prices, 0.9),
        }
      : undefined;

  return [...pool]
    .sort(
      (a, b) =>
        scoreFamilyHomeListing(b, priceContext) - scoreFamilyHomeListing(a, priceContext),
    )
    .slice(0, limit);
}
