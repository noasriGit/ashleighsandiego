/**
 * Build IDX saved-link queryString values from zip/city filters.
 * Matches src/lib/idx-search-url.ts for consistency.
 */

export function buildIdxQueryString({ zipCodes = [], cityIds = [], minPrice, maxPrice } = {}) {
  const params = new URLSearchParams();

  zipCodes.forEach((zip) => params.append("zipcode[]", zip));
  cityIds.forEach((id) => params.append("city[]", String(id)));

  if (minPrice != null) params.set("minPrice", String(minPrice));
  if (maxPrice != null) params.set("maxPrice", String(maxPrice));

  params.append("a_status[]", "active");

  return params.toString();
}
