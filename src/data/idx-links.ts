// Subdomain saved-search link resolver. Backed by src/data/idx-search-config.ts:
// savedSearchUrl when set, otherwise a dynamic zip-filtered URL from idx-search-url.ts.

import {
  getIdxSearchConfig,
  idxSearchConfigs,
  GENERAL_KEY,
} from "@/data/idx-search-config";
import { IDX_SEARCH_DOMAIN } from "@/data/site-config";
import { normalizeIdxUrl, resolveIdxBrowseUrl } from "@/lib/idx-search-url";

export const IDX_BASE_URL = (
  process.env.NEXT_PUBLIC_IDX_BASE_URL ?? `https://${IDX_SEARCH_DOMAIN}`
).replace(/\/$/, "");

/** On unless explicitly disabled — avoids missing Vercel env showing the "Search homes" fallback. */
export function isIdxPublicEnabled(): boolean {
  return process.env.NEXT_PUBLIC_IDX_ENABLED !== "false" && Boolean(IDX_BASE_URL);
}

export type IdxLinkEntry = {
  /** Full URL to a pre-filtered IDX saved search on the subdomain. */
  savedSearchUrl: string;
  /** Short, human label for the browse CTA (e.g. "La Jolla homes"). */
  label?: string;
};

/**
 * Resolve the IDX destination for a page.
 *
 * @param slug community slug, "_military", or undefined for the general search.
 * @returns the link entry (with a resolved href), or null when IDX is not configured.
 */
export function getIdxLink(
  slug?: string,
): (IdxLinkEntry & { href: string }) | null {
  if (!IDX_BASE_URL) return null;

  const entry = getIdxSearchConfig(slug);
  const general = idxSearchConfigs[GENERAL_KEY];

  const href =
    resolveIdxBrowseUrl(IDX_BASE_URL, entry) ??
    resolveIdxBrowseUrl(IDX_BASE_URL, general) ??
    IDX_BASE_URL;

  return {
    savedSearchUrl: normalizeIdxUrl(entry.savedSearchUrl, IDX_BASE_URL) ?? entry.savedSearchUrl,
    label: entry.label,
    href,
  };
}
