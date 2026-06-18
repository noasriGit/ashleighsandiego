// Build IDX Broker search URLs from community search config.
// See: https://support.idxbroker.com/hc/en-us/articles/34489458510619

import type { IdxSearchConfig } from "@/data/idx-search-config";

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
  if (minPrice != null) params.set("minPrice", String(minPrice));
  if (maxPrice != null) params.set("maxPrice", String(maxPrice));
  if (options.minBed != null) params.set("minBed", String(options.minBed));
  if (options.minBath != null) params.set("minBath", String(options.minBath));

  // Active listings only (standard IDX saved-link default).
  params.append("a_status[]", "active");

  if (params.toString() === "a_status%5B%5D=active") {
    // No geographic filter, only useful for _general when no saved search exists.
    if (zipCodes.length === 0 && config.cityIds.length === 0) return root;
  }

  return `${root}${IDX_RESULTS_PATH}?${params.toString()}`;
}

/** Resolve the best browse URL: saved search URL takes precedence over dynamic build. */
export function resolveIdxBrowseUrl(
  baseUrl: string,
  config: IdxSearchConfig,
  options?: IdxSearchUrlOptions,
): string | null {
  if (config.savedSearchUrl) {
    return normalizeIdxUrl(config.savedSearchUrl, baseUrl) ?? config.savedSearchUrl;
  }
  return buildIdxSearchUrl(baseUrl, config, options);
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
      filters.minBath != null,
  );

  if (hasFilters) {
    return buildIdxSearchUrl(baseUrl, config, filters) ?? baseUrl;
  }

  return resolveIdxBrowseUrl(baseUrl, config) ?? baseUrl;
}
