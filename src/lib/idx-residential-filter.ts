/**
 * Residential-only inventory filter for IDX listings.
 *
 * IDX Broker system property type codes (Settings → MLS → Property Types):
 *   sfr — Single Family Residential (houses, townhomes)
 *   cnd — Condos
 *   mfr — Multifamily Residential (apartments, duplexes)
 *
 * Excluded everywhere: commercial, land, rentals, business opportunity, farms, etc.
 */

export const RESIDENTIAL_IDX_PROPERTY_TYPES = ["sfr", "cnd", "mfr"] as const;

const EXCLUDED_IDX_PROPERTY_TYPES = new Set([
  "com",
  "ld",
  "rnt",
  "ri",
  "bo",
  "frm",
  "lse",
  "othr",
  "mh",
]);

const EXCLUDED_LABEL_PATTERN =
  /\b(commercial|office|retail|industrial|warehouse|business opportuni|lots?\s*(&|and)\s*land|vacant land|\bland\b|farm|agricultural|rental income|\blease\b|\brent\b|mobile home|\bother\b)/i;

const RESIDENTIAL_LABEL_PATTERN =
  /\b(single family|single-family|condo|condominium|townhome|town home|townhouse|multi.?family|multifamily|apartment|duplex|triplex|fourplex|residential|pud\b|detached)/i;

/** True when a listing's property type is residential buyer inventory. */
export function isResidentialPropertyType(propertyType?: string): boolean {
  if (!propertyType?.trim()) return true;

  const lowered = propertyType.trim().toLowerCase();
  const code = lowered.replace(/[^a-z0-9]/g, "");

  if (EXCLUDED_IDX_PROPERTY_TYPES.has(code)) return false;
  if (
    RESIDENTIAL_IDX_PROPERTY_TYPES.includes(
      code as (typeof RESIDENTIAL_IDX_PROPERTY_TYPES)[number],
    )
  ) {
    return true;
  }

  if (EXCLUDED_LABEL_PATTERN.test(propertyType)) return false;
  if (RESIDENTIAL_LABEL_PATTERN.test(propertyType)) return true;

  // Unknown MLS labels: keep rather than hide valid homes with nonstandard wording.
  return true;
}

export function isResidentialListing(listing: { propertyType?: string }): boolean {
  return isResidentialPropertyType(listing.propertyType);
}

export function filterResidentialListings<T extends { propertyType?: string }>(
  listings: T[],
): T[] {
  return listings.filter(isResidentialListing);
}
