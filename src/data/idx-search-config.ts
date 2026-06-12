// Central IDX search registry. Auto-built from communities.ts + community-zips.ts.
// Manual saved-search IDs/URLs live in data/idx-search-overrides.json (sync via npm run idx:sync-searches).
//
// IMPORTANT — IDX API constraint: the IDX Broker REST API does NOT return arbitrary MLS
// search results. It only returns the agent's *featured* listings (filterable by city ID /
// zip code) and *saved-search property counts*. Full MLS browse stays on the IDX subdomain.
//
// Dynamic search URLs are built automatically from zip codes when savedSearchUrl is empty.
// See src/lib/idx-search-url.ts.

import { communities, launchCommunitySlugs } from "./communities";
import { getCommunityZips } from "./community-zips";
import overrides from "../../data/idx-search-overrides.json";
import { resolveIdxBrowseUrl } from "@/lib/idx-search-url";

export type IdxSearchConfig = {
  /** IDX numeric city IDs (from GET /clients/cities). Most accurate featured filter. */
  cityIds: number[];
  /** Zip codes for secondary filtering (and sub-areas that don't map to one city). */
  zipCodes: string[];
  /** Control Panel saved-search ID, used by GET /clients/savedlinkstotalpropertycount. */
  savedSearchId?: string;
  /** Full URL to a pre-filtered IDX saved search on the subdomain (browse-all fallback). */
  savedSearchUrl: string;
  /** Short, human label for the browse CTA (e.g. "La Jolla homes"). */
  label: string;
  /** Default price hints for UI copy only — not enforced against the API. */
  minPrice?: number;
  maxPrice?: number;
};

type IdxSearchOverride = Partial<
  Pick<
    IdxSearchConfig,
    "cityIds" | "savedSearchId" | "savedSearchUrl" | "label" | "minPrice" | "maxPrice"
  >
>;

const overrideMap = overrides as Record<string, IdxSearchOverride>;

export const GENERAL_KEY = "_general";
export const MILITARY_KEY = "_military";

function homesLabel(name: string): string {
  return `${name} homes`;
}

function buildConfig(
  label: string,
  zipCodes: string[],
  override: IdxSearchOverride = {},
): IdxSearchConfig {
  return {
    cityIds: override.cityIds ?? [],
    zipCodes,
    savedSearchId: override.savedSearchId ?? "",
    savedSearchUrl: override.savedSearchUrl ?? "",
    label: override.label ?? label,
    minPrice: override.minPrice,
    maxPrice: override.maxPrice,
  };
}

/** All launch community slugs plus special keys. Used by sync script naming conventions. */
export const idxSearchSlugs = [...launchCommunitySlugs, GENERAL_KEY, MILITARY_KEY] as const;

function buildAllConfigs(): Record<string, IdxSearchConfig> {
  const configs: Record<string, IdxSearchConfig> = {};

  for (const community of communities) {
    const zips = getCommunityZips(community.slug);
    if (zips.length === 0) continue;
    configs[community.slug] = buildConfig(
      homesLabel(community.name),
      zips,
      overrideMap[community.slug],
    );
  }

  configs[GENERAL_KEY] = buildConfig(
    "all San Diego homes",
    getCommunityZips(GENERAL_KEY),
    overrideMap[GENERAL_KEY],
  );

  configs[MILITARY_KEY] = buildConfig(
    "homes near San Diego bases",
    getCommunityZips(MILITARY_KEY),
    overrideMap[MILITARY_KEY],
  );

  return configs;
}

export const idxSearchConfigs: Record<string, IdxSearchConfig> = buildAllConfigs();

/** Resolve a search config by slug, falling back to the general config. */
export function getIdxSearchConfig(slug?: string): IdxSearchConfig {
  if (slug && idxSearchConfigs[slug]) return idxSearchConfigs[slug];
  return idxSearchConfigs[GENERAL_KEY];
}

/** Resolve the browse URL for a community, preferring saved search over dynamic zip URL. */
export function getIdxBrowseUrl(slug?: string): string | null {
  const baseUrl = (process.env.NEXT_PUBLIC_IDX_BASE_URL ?? "").replace(/\/$/, "");
  if (!baseUrl) return null;
  const config = getIdxSearchConfig(slug);
  return resolveIdxBrowseUrl(baseUrl, config);
}
