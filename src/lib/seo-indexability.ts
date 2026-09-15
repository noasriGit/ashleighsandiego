/**
 * Single source of truth for which DYNAMIC neighborhood/community slugs should be
 * indexed and included in the sitemap, plus controlled reintroduction clusters.
 *
 * Static page indexability and sitemap membership are owned by `src/data/routes.ts`
 * (see `RouteEntry.indexable` / `RouteEntry.inSitemap`, and the
 * `getIndexableStaticPaths` / `getStaticSitemapPaths` / `isStaticPathIndexable` /
 * `isStaticPathNoindex` helpers exported there) — import those directly instead of
 * duplicating a second static-path list in this file.
 */

import { getStaticSitemapPaths } from "@/data/routes";

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

/**
 * Crawlable href for a community guide. Deferred (noindex) guides return
 * undefined so hubs can render a non-link preview instead of an anchor.
 */
export function getNeighborhoodGuideHref(slug: string): string | undefined {
  if (!isCommunityIndexable(slug)) return undefined;
  return `/neighborhoods/${slug}`;
}

export function getIndexableCommunityPaths(): string[] {
  return getIndexableCommunitySlugs().map((slug) => `/neighborhoods/${slug}`);
}

/**
 * Full sitemap path list: static pages from `routes.ts` (`inSitemap: true`)
 * plus indexable dynamic community paths from this file.
 */
export function getSitemapPaths(): string[] {
  return [...getStaticSitemapPaths(), ...getIndexableCommunityPaths()];
}

export function getRobotsForCommunity(
  slug: string,
): { index: boolean; follow: boolean } | undefined {
  if (!isCommunityIndexable(slug)) {
    return { index: false, follow: true };
  }
  return undefined;
}
