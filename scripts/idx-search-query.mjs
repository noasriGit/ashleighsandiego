/**
 * Build IDX saved-link queryString values from zip/city filters.
 * Matches src/lib/idx-search-url.ts for consistency.
 */

export function buildIdxQueryString({ zipCodes = [], cityIds = [], minPrice, maxPrice, minBed, minBath, propertyType, idxID = "d010" } = {}) {
  const params = new URLSearchParams();

  params.set("idxID", idxID);
  zipCodes.forEach((zip) => params.append("zipcode[]", zip));
  cityIds.forEach((id) => params.append("city[]", String(id)));

  if (minPrice != null) params.set("lp", String(minPrice));
  if (maxPrice != null) params.set("hp", String(maxPrice));
  if (minBed != null) params.set("bd", String(minBed));
  if (minBath != null) params.set("tb", String(minBath));
  if (propertyType) params.set("pt", propertyType);

  params.append("a_status[]", "active");

  return params.toString();
}
