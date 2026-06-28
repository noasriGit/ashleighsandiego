import type { Feature, FeatureCollection, Polygon } from "geojson";

export type CommunityBoundaryProperties = {
  slug: string;
  name: string;
  tier: 1 | 2 | 3;
  parentSlug?: string;
};

export type CommunityBoundaryFeature = Feature<Polygon, CommunityBoundaryProperties>;

export type CommunityBoundaryCollection = FeatureCollection<
  Polygon,
  CommunityBoundaryProperties
>;

export const COMMUNITY_BOUNDARIES_URL = "/geo/community-boundaries.geojson";

/** Brand-aligned fill colors by tier (hex). */
export const TIER_FILL_COLORS: Record<1 | 2 | 3, string> = {
  1: "#670038",
  2: "#72595e",
  3: "#2a2223",
};

/** Approximate centroid of a polygon ring (for future map features). */
export function getBoundaryCentroid(feature: CommunityBoundaryFeature): [number, number] {
  const ring = feature.geometry.coordinates[0];
  let sumLng = 0;
  let sumLat = 0;
  const count = ring.length - 1;
  for (let i = 0; i < count; i++) {
    sumLng += ring[i][0];
    sumLat += ring[i][1];
  }
  return [sumLng / count, sumLat / count];
}

export function getMapStyleUrl(): string {
  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  if (key) {
    return `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;
  }
  return "https://tiles.openfreemap.org/styles/liberty";
}
