// Zip codes per community slug. Primary source for automated IDX search filters.
//
// Launch communities (hasGuide) pull primary zips from community-content stats.
// Tier-2/3 entries inherit from parent when no explicit zips are set.
//
// Regenerate / validate with: npm run idx:generate-config

import { communities } from "./communities";
import { communityContent } from "./community-content";

/** Explicit zip overrides and extensions beyond community-content stats. */
const ZIP_OVERRIDES: Record<string, string[]> = {
  "la-jolla": ["92037"],
  "pacific-beach": ["92109"],
  "university-city": ["92122", "92121", "92117"],
  clairemont: ["92117", "92111"],
  "mission-valley": ["92108"],
  "del-mar": ["92014"],
  "carmel-valley": ["92130"],
  "point-loma": ["92106", "92107"],
  "sorrento-valley": ["92121"],
  "bay-park": ["92110"],
  "ocean-beach": ["92107"],
  hillcrest: ["92103"],
  "north-park": ["92104"],
  // Tier 2, metadata only
  "bay-ho": ["92110"],
  "north-clairemont": ["92117"],
  "kearny-mesa": ["92111"],
  "linda-vista": ["92111"],
  "mission-hills": ["92103"],
  "torrey-pines": ["92037"],
  "del-mar-heights": ["92014"],
  "torrey-hills": ["92130"],
  civita: ["92108"],
  "serra-mesa": ["92123"],
  // Tier 3, subareas
  "la-jolla-cove": ["92037"],
  "la-jolla-shores": ["92037"],
  "la-jolla-village": ["92037"],
  "bird-rock": ["92037"],
  muirlands: ["92037"],
  "mount-soledad": ["92037"],
  windansea: ["92037"],
  "crown-point": ["92109"],
  "mission-beach": ["92109"],
  "mission-bay": ["92109"],
  morena: ["92110"],
  "old-town": ["92110"],
  "midway-district": ["92110"],
  "point-loma-heights": ["92106"],
  "university-heights": ["92116"],
  "normal-heights": ["92116"],
  "bankers-hill": ["92101"],
  "little-italy": ["92101"],
  "downtown-san-diego": ["92101"],
  "balboa-park": ["92101"],
  // Special searches
  _general: [],
  _military: ["92136", "92145", "92106", "92118"],
};

function zipFromContentStats(slug: string): string[] {
  const stats = communityContent[slug]?.stats;
  if (!stats) return [];
  return stats
    .filter((s) => s.label === "ZIP Code" && /^\d{5}$/.test(s.value))
    .map((s) => s.value);
}

function uniqueZips(zips: string[]): string[] {
  return [...new Set(zips.filter(Boolean))];
}

/**
 * Resolve zip codes for a community slug.
 * Order: explicit override → content stats → parent slug inheritance.
 */
export function getCommunityZips(slug: string): string[] {
  if (slug in ZIP_OVERRIDES) {
    return uniqueZips(ZIP_OVERRIDES[slug]);
  }

  const fromContent = zipFromContentStats(slug);
  if (fromContent.length > 0) return fromContent;

  const community = communities.find((c) => c.slug === slug);
  if (community?.parentSlug) {
    return getCommunityZips(community.parentSlug);
  }

  return [];
}

/** True when a subarea shares the same ZIP set as its parent (IDX zip filter cannot isolate the pocket). */
export function isZipOnlySubarea(slug: string): boolean {
  const community = communities.find((c) => c.slug === slug);
  if (!community?.parentSlug) return false;

  const zips = getCommunityZips(slug);
  const parentZips = getCommunityZips(community.parentSlug);
  if (zips.length === 0 || parentZips.length === 0) return false;

  const zipSet = new Set(zips);
  return (
    zips.length === parentZips.length &&
    parentZips.every((z) => zipSet.has(z))
  );
}

/** All community slugs that have at least one zip code configured. */
export function getSearchableCommunitySlugs(): string[] {
  const slugs = new Set<string>();
  for (const community of communities) {
    if (getCommunityZips(community.slug).length > 0) {
      slugs.add(community.slug);
    }
  }
  slugs.add("_general");
  slugs.add("_military");
  return [...slugs];
}
