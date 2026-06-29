import { communities } from "@/data/communities";
import { siteConfig } from "@/data/site-config";

/** Buyer-path landing pages linked from the homepage bento grid. */
export const HOME_BUYER_PATH_COUNT = 5;

export function getNeighborhoodGuideCount(): number {
  return communities.filter((c) => c.hasGuide).length;
}

export function getHomeStatBandStats() {
  return [
    {
      value: String(getNeighborhoodGuideCount()),
      label: "Neighborhood Guides",
    },
    {
      value: String(siteConfig.geo.radiusMiles),
      label: `Mile Radius from ${siteConfig.geo.center}`,
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
