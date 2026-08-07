import { getIndexableCommunitySlugs } from "@/lib/seo-indexability";

/** Buyer-path landing pages linked from the homepage bento grid. */
export const HOME_BUYER_PATH_COUNT = 5;

/**
 * Homepage stat band count — intentionally derived from the current
 * indexable Wave 1 community set (not the full `hasGuide` content
 * footprint) so on-page messaging doesn't overstate the recovery-phase
 * indexable network. See docs/seo-rebuild-plan.md and src/lib/seo-indexability.ts.
 */
export function getNeighborhoodGuideCount(): number {
  return getIndexableCommunitySlugs().length;
}

export function getHomeStatBandStats() {
  return [
    {
      value: String(getNeighborhoodGuideCount()),
      label: "Neighborhood Guides",
    },
    {
      value: "Coastal to Inland",
      label: "Every Price Point",
    },
    {
      value: String(HOME_BUYER_PATH_COUNT),
      label: "Buyer Paths",
    },
    {
      value: "Free",
      label: "Strategy Calls",
    },
  ];
}
