import { communities } from "@/data/communities";

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
