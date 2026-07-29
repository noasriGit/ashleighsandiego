/**
 * Single source of truth for which URLs should be indexed and included in the sitemap.
 * Wave 1 focuses crawl budget on high-value hubs while subareas remain accessible.
 *
 * Static paths use this repo's live destinations (redirect targets from the
 * sandiegohomes Wave 1 set where those routes were renamed).
 */

/** Tier-1 and selected Tier-2 neighborhood roots in the first indexing wave. */
export const WAVE1_COMMUNITY_SLUGS = [
  "la-jolla",
  "pacific-beach",
  "university-city",
  "clairemont",
  "mission-valley",
  "del-mar",
  "carmel-valley",
  "point-loma",
  "sorrento-valley",
  "bay-park",
  "ocean-beach",
  "hillcrest",
  "north-park",
] as const;

export type Wave1CommunitySlug = (typeof WAVE1_COMMUNITY_SLUGS)[number];

/**
 * Static routes included in sitemap.xml (indexable editorial pages).
 * Mapped from Wave 1 recovery paths onto this repo's App Router destinations.
 */
export const INDEXABLE_STATIC_PATHS = [
  "",
  "/about",
  "/moving-to-san-diego",
  "/la-jolla-neighborhoods",
  "/military-realtor-san-diego",
  "/first-time-home-buyer-san-diego",
  "/neighborhoods",
] as const;

/** Static routes that remain live but should not be indexed or sitemapped. */
export const NOINDEX_STATIC_PATHS = [
  "/privacy-policy",
  "/terms",
  "/accessibility",
  "/search-homes",
  "/listings",
  "/contact",
  "/san-diego-neighborhood-map",
  "/living-in-san-diego",
  "/la-jolla-real-estate-agent",
  "/affordable-neighborhoods-san-diego",
  "/san-diego-suburbs",
  "/cities-near-san-diego",
  "/san-diego-condos-for-sale",
  "/downtown-san-diego-condos-for-sale",
  "/la-jolla-condos-for-sale",
  "/del-mar-new-luxury-homes",
  "/la-jolla-vs-del-mar",
] as const;

/**
 * Controlled reintroduction clusters (Phase 5).
 * Enable one cluster at a time after content passes review-checklist.md.
 * Empty by default — no child pages reindexed until explicitly activated.
 */
export const ACTIVE_REINTRODUCTION_CLUSTERS: readonly string[] = [];

/** Future batches — activate slugs in ACTIVE_REINTRODUCTION_CLUSTERS when ready. */
export const REINTRODUCTION_CLUSTERS = {
  laJollaCoastal: ["la-jolla-shores", "bird-rock", "windansea"],
  laJollaHillside: ["torrey-pines"],
  pacificBeach: ["mission-beach"],
  missionValley: ["civita", "linda-vista"],
  clairemont: ["kearny-mesa"],
  delMar: ["del-mar-heights"],
  hillcrestUrban: ["mission-hills", "university-heights", "bankers-hill"],
  downtown: ["downtown-san-diego", "little-italy"],
  pointLoma: ["old-town"],
} as const;

/**
 * Authoritative indexable community set — Wave 1 plus any activated reintroduction
 * clusters. Page robots and sitemap inclusion must both derive from this list.
 */
export function getIndexableCommunitySlugs(): string[] {
  return [
    ...new Set<string>([
      ...WAVE1_COMMUNITY_SLUGS,
      ...ACTIVE_REINTRODUCTION_CLUSTERS,
    ]),
  ];
}

export function isCommunityIndexable(slug: string): boolean {
  return getIndexableCommunitySlugs().includes(slug);
}

export function isStaticPathIndexable(path: string): boolean {
  return (INDEXABLE_STATIC_PATHS as readonly string[]).includes(path);
}

export function isStaticPathNoindex(path: string): boolean {
  return (NOINDEX_STATIC_PATHS as readonly string[]).includes(path);
}

export function getIndexableCommunityPaths(): string[] {
  return getIndexableCommunitySlugs().map((slug) => `/neighborhoods/${slug}`);
}

export function getSitemapPaths(): string[] {
  return [...INDEXABLE_STATIC_PATHS, ...getIndexableCommunityPaths()];
}

export function getRobotsForCommunity(
  slug: string,
): { index: boolean; follow: boolean } | undefined {
  if (!isCommunityIndexable(slug)) {
    return { index: false, follow: true };
  }
  return undefined;
}
