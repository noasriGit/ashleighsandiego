/**
 * Generates public/geo/community-boundaries.geojson from hand-tuned bounds.
 * Boundaries are approximate marketing guides — not legal neighborhood lines.
 *
 * Run: node scripts/generate-community-boundaries.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

/** @typedef {[number, number, number, number]} Bounds [west, south, east, north] lng/lat */
/** @typedef {'west' | 'east' | 'south' | 'north'} OceanEdge */

/**
 * @typedef {object} ShapeProfile
 * @property {number} [chamfer] Corner cut ratio (0–0.3)
 * @property {OceanEdge} [ocean] Which edge gets a gentle coastal curve
 * @property {number} [oceanCurve] Coastal curve strength (degrees lng/lat)
 * @property {number} [skewX] Horizontal shear (-0.15 to 0.15)
 * @property {number} [skewY] Vertical shear
 */

/** @type {Record<string, { bounds: Bounds, tier: number, parentSlug?: string, shape?: ShapeProfile }>} */
const BOUNDARY_BOUNDS = {
  // Tier 1
  "la-jolla": { bounds: [-117.295, 32.825, -117.235, 32.885], tier: 1, shape: { chamfer: 0.16, ocean: "west", oceanCurve: 0.012 } },
  "pacific-beach": { bounds: [-117.265, 32.775, -117.215, 32.815], tier: 1, shape: { chamfer: 0.14, ocean: "west", oceanCurve: 0.008 } },
  "university-city": { bounds: [-117.235, 32.845, -117.175, 32.895], tier: 1, shape: { chamfer: 0.12, skewX: 0.04 } },
  clairemont: { bounds: [-117.225, 32.795, -117.155, 32.855], tier: 1, shape: { chamfer: 0.1 } },
  "mission-valley": { bounds: [-117.185, 32.745, -117.125, 32.785], tier: 1, shape: { chamfer: 0.12, skewX: -0.05 } },
  "del-mar": { bounds: [-117.285, 32.925, -117.235, 32.965], tier: 1, shape: { chamfer: 0.15, ocean: "west", oceanCurve: 0.006 } },
  "carmel-valley": { bounds: [-117.255, 32.905, -117.195, 32.955], tier: 1, shape: { chamfer: 0.11, skewY: 0.03 } },
  "point-loma": { bounds: [-117.265, 32.685, -117.205, 32.735], tier: 1, shape: { chamfer: 0.14, ocean: "west", oceanCurve: 0.01 } },
  "sorrento-valley": { bounds: [-117.225, 32.875, -117.175, 32.915], tier: 1, shape: { chamfer: 0.1, skewX: 0.06 } },
  // Tier 2 standalone
  "bay-park": { bounds: [-117.215, 32.775, -117.165, 32.815], tier: 2, shape: { chamfer: 0.14, ocean: "west", oceanCurve: 0.005 } },
  "ocean-beach": { bounds: [-117.265, 32.735, -117.225, 32.775], tier: 2, shape: { chamfer: 0.16, ocean: "west", oceanCurve: 0.007 } },
  hillcrest: { bounds: [-117.175, 32.725, -117.135, 32.755], tier: 2, shape: { chamfer: 0.18 } },
  "north-park": { bounds: [-117.145, 32.725, -117.105, 32.755], tier: 2, shape: { chamfer: 0.18 } },
  // Tier 2 subareas
  "bay-ho": { bounds: [-117.205, 32.785, -117.175, 32.805], tier: 2, parentSlug: "bay-park", shape: { chamfer: 0.2 } },
  "north-clairemont": { bounds: [-117.215, 32.815, -117.165, 32.855], tier: 2, parentSlug: "clairemont", shape: { chamfer: 0.12 } },
  "kearny-mesa": { bounds: [-117.175, 32.795, -117.135, 32.835], tier: 2, parentSlug: "clairemont", shape: { chamfer: 0.12 } },
  "linda-vista": { bounds: [-117.185, 32.765, -117.145, 32.795], tier: 2, parentSlug: "mission-valley", shape: { chamfer: 0.18 } },
  "mission-hills": { bounds: [-117.165, 32.735, -117.135, 32.755], tier: 2, parentSlug: "hillcrest", shape: { chamfer: 0.2 } },
  "torrey-pines": { bounds: [-117.275, 32.855, -117.235, 32.885], tier: 2, parentSlug: "la-jolla", shape: { chamfer: 0.16, ocean: "west", oceanCurve: 0.006 } },
  "del-mar-heights": { bounds: [-117.265, 32.945, -117.225, 32.965], tier: 2, parentSlug: "del-mar", shape: { chamfer: 0.2 } },
  "torrey-hills": { bounds: [-117.235, 32.915, -117.195, 32.945], tier: 2, parentSlug: "carmel-valley", shape: { chamfer: 0.14 } },
  civita: { bounds: [-117.165, 32.755, -117.135, 32.775], tier: 2, parentSlug: "mission-valley", shape: { chamfer: 0.22 } },
  "serra-mesa": { bounds: [-117.145, 32.765, -117.105, 32.795], tier: 2, parentSlug: "mission-valley", shape: { chamfer: 0.16 } },
  // Tier 3 La Jolla subareas
  "la-jolla-cove": { bounds: [-117.278, 32.845, -117.265, 32.855], tier: 3, parentSlug: "la-jolla", shape: { chamfer: 0.22, ocean: "west", oceanCurve: 0.004 } },
  "la-jolla-shores": { bounds: [-117.265, 32.845, -117.245, 32.865], tier: 3, parentSlug: "la-jolla", shape: { chamfer: 0.18, ocean: "west", oceanCurve: 0.005 } },
  "la-jolla-village": { bounds: [-117.275, 32.835, -117.255, 32.848], tier: 3, parentSlug: "la-jolla", shape: { chamfer: 0.2 } },
  "bird-rock": { bounds: [-117.275, 32.815, -117.255, 32.835], tier: 3, parentSlug: "la-jolla", shape: { chamfer: 0.18, ocean: "west", oceanCurve: 0.004 } },
  muirlands: { bounds: [-117.265, 32.855, -117.245, 32.875], tier: 3, parentSlug: "la-jolla", shape: { chamfer: 0.16 } },
  "mount-soledad": { bounds: [-117.255, 32.825, -117.235, 32.855], tier: 3, parentSlug: "la-jolla", shape: { chamfer: 0.14 } },
  windansea: { bounds: [-117.285, 32.825, -117.265, 32.845], tier: 3, parentSlug: "la-jolla", shape: { chamfer: 0.2, ocean: "west", oceanCurve: 0.005 } },
  // Tier 3 PB / Mission Bay
  "crown-point": { bounds: [-117.235, 32.785, -117.215, 32.805], tier: 3, parentSlug: "pacific-beach", shape: { chamfer: 0.2, ocean: "west", oceanCurve: 0.003 } },
  "mission-beach": { bounds: [-117.255, 32.765, -117.225, 32.785], tier: 3, parentSlug: "pacific-beach", shape: { chamfer: 0.18, ocean: "west", oceanCurve: 0.006 } },
  "mission-bay": { bounds: [-117.235, 32.765, -117.205, 32.785], tier: 3, parentSlug: "pacific-beach", shape: { chamfer: 0.16, ocean: "west", oceanCurve: 0.004 } },
  // Tier 3 Bay Park / Point Loma
  morena: { bounds: [-117.215, 32.765, -117.185, 32.785], tier: 3, parentSlug: "bay-park", shape: { chamfer: 0.2 } },
  "old-town": { bounds: [-117.205, 32.745, -117.185, 32.765], tier: 3, parentSlug: "point-loma", shape: { chamfer: 0.22 } },
  "midway-district": { bounds: [-117.215, 32.735, -117.185, 32.755], tier: 3, parentSlug: "point-loma", shape: { chamfer: 0.18 } },
  "point-loma-heights": { bounds: [-117.245, 32.715, -117.215, 32.735], tier: 3, parentSlug: "point-loma", shape: { chamfer: 0.18, ocean: "west", oceanCurve: 0.004 } },
  // Tier 3 Hillcrest / North Park / Downtown
  "university-heights": { bounds: [-117.155, 32.735, -117.125, 32.755], tier: 3, parentSlug: "hillcrest", shape: { chamfer: 0.2 } },
  "normal-heights": { bounds: [-117.125, 32.735, -117.095, 32.755], tier: 3, parentSlug: "north-park", shape: { chamfer: 0.2 } },
  "bankers-hill": { bounds: [-117.175, 32.715, -117.155, 32.735], tier: 3, parentSlug: "hillcrest", shape: { chamfer: 0.22 } },
  "downtown-san-diego": { bounds: [-117.175, 32.695, -117.145, 32.725], tier: 3, parentSlug: "hillcrest", shape: { chamfer: 0.12, ocean: "west", oceanCurve: 0.003 } },
  "little-italy": { bounds: [-117.175, 32.715, -117.155, 32.735], tier: 3, parentSlug: "downtown-san-diego", shape: { chamfer: 0.24, ocean: "west", oceanCurve: 0.003 } },
  "balboa-park": { bounds: [-117.155, 32.725, -117.125, 32.745], tier: 3, parentSlug: "hillcrest", shape: { chamfer: 0.16 } },
};

/** Community names keyed by slug (mirrors communities.ts). */
const COMMUNITY_NAMES = {
  "la-jolla": "La Jolla",
  "pacific-beach": "Pacific Beach",
  "university-city": "University City / UTC",
  clairemont: "Clairemont",
  "mission-valley": "Mission Valley",
  "del-mar": "Del Mar",
  "carmel-valley": "Carmel Valley",
  "point-loma": "Point Loma",
  "sorrento-valley": "Sorrento Valley / Sorrento Mesa",
  "bay-park": "Bay Park",
  "ocean-beach": "Ocean Beach",
  hillcrest: "Hillcrest",
  "north-park": "North Park",
  "bay-ho": "Bay Ho",
  "north-clairemont": "North Clairemont",
  "kearny-mesa": "Kearny Mesa",
  "linda-vista": "Linda Vista",
  "mission-hills": "Mission Hills",
  "torrey-pines": "Torrey Pines",
  "del-mar-heights": "Del Mar Heights",
  "torrey-hills": "Torrey Hills",
  civita: "Civita",
  "serra-mesa": "Serra Mesa",
  "la-jolla-cove": "La Jolla Cove",
  "la-jolla-shores": "La Jolla Shores",
  "la-jolla-village": "La Jolla Village",
  "bird-rock": "Bird Rock",
  muirlands: "Muirlands",
  "mount-soledad": "Mount Soledad",
  windansea: "Windansea",
  "crown-point": "Crown Point",
  "mission-beach": "Mission Beach",
  "mission-bay": "Mission Bay",
  morena: "Morena",
  "old-town": "Old Town San Diego",
  "midway-district": "Midway District",
  "point-loma-heights": "Point Loma Heights",
  "university-heights": "University Heights",
  "normal-heights": "Normal Heights",
  "bankers-hill": "Bankers Hill",
  "little-italy": "Little Italy",
  "downtown-san-diego": "Downtown San Diego",
  "balboa-park": "Balboa Park",
};

/**
 * Build a chamfered polygon with optional coastal curve and skew.
 * Produces octagonal-ish shapes instead of sharp rectangles.
 *
 * @param {Bounds} bounds
 * @param {ShapeProfile} [profile]
 */
function boundsToShapedPolygon(bounds, profile = {}) {
  const { chamfer = 0.14, ocean, oceanCurve = 0.008, skewX = 0, skewY = 0 } = profile;
  const [west, south, east, north] = bounds;
  const width = east - west;
  const height = north - south;
  const inset = chamfer * Math.min(width, height);
  const cx = (west + east) / 2;
  const cy = (south + north) / 2;

  /** @param {number} lng @param {number} lat */
  const skew = (lng, lat) => {
    const dx = lng - cx;
    const dy = lat - cy;
    return [cx + dx + dy * skewX, cy + dy + dx * skewY];
  };

  /** @param {OceanEdge} edge */
  const coastalPoints = (edge) => {
    const curve = oceanCurve;
    switch (edge) {
      case "west":
        return [
          skew(west, south + inset),
          skew(west - curve * 0.35, cy - height * 0.18),
          skew(west - curve, cy),
          skew(west - curve * 0.35, cy + height * 0.18),
          skew(west, north - inset),
        ];
      case "east":
        return [
          skew(east, south + inset),
          skew(east + curve * 0.35, cy - height * 0.18),
          skew(east + curve, cy),
          skew(east + curve * 0.35, cy + height * 0.18),
          skew(east, north - inset),
        ];
      case "south":
        return [
          skew(west + inset, south),
          skew(cx - width * 0.18, south - curve * 0.35),
          skew(cx, south - curve),
          skew(cx + width * 0.18, south - curve * 0.35),
          skew(east - inset, south),
        ];
      case "north":
        return [
          skew(west + inset, north),
          skew(cx - width * 0.18, north + curve * 0.35),
          skew(cx, north + curve),
          skew(cx + width * 0.18, north + curve * 0.35),
          skew(east - inset, north),
        ];
      default:
        return [];
    }
  };

  /** @type {[number, number][]} */
  let ring;

  if (ocean === "west") {
    ring = [
      ...coastalPoints("west"),
      skew(west + inset, north),
      skew(east - inset, north),
      skew(east, north - inset),
      skew(east, south + inset),
      skew(east - inset, south),
      skew(west + inset, south),
    ];
  } else if (ocean === "east") {
    ring = [
      skew(west + inset, south),
      skew(east - inset, south),
      ...coastalPoints("east"),
      skew(east - inset, north),
      skew(west + inset, north),
      skew(west, north - inset),
      skew(west, south + inset),
    ];
  } else if (ocean === "south") {
    ring = [
      skew(west + inset, north),
      skew(east - inset, north),
      skew(east, north - inset),
      skew(east, south + inset),
      ...coastalPoints("south"),
      skew(west, south + inset),
      skew(west, north - inset),
    ];
  } else if (ocean === "north") {
    ring = [
      skew(west + inset, south),
      skew(east - inset, south),
      skew(east, south + inset),
      skew(east - inset, north),
      ...coastalPoints("north"),
      skew(west + inset, north),
      skew(west, south + inset),
    ];
  } else {
    ring = [
      skew(west + inset, south),
      skew(east - inset, south),
      skew(east, south + inset),
      skew(east - inset, north),
      skew(west + inset, north),
      skew(west, north - inset),
      skew(west, south + inset),
    ];
  }

  ring.push(ring[0]);
  return [ring];
}

function buildGeoJson() {
  const features = Object.entries(BOUNDARY_BOUNDS)
    .map(([slug, config]) => {
      const props = {
        slug,
        name: COMMUNITY_NAMES[slug] ?? slug,
        tier: config.tier,
      };
      if (config.parentSlug) props.parentSlug = config.parentSlug;

      return {
        type: "Feature",
        properties: props,
        geometry: {
          type: "Polygon",
          coordinates: boundsToShapedPolygon(config.bounds, config.shape),
        },
      };
    })
    // Draw tier-1 first (bottom), tier-3 last (top) for cleaner overlap + click targets.
    .sort((a, b) => a.properties.tier - b.properties.tier);

  return {
    type: "FeatureCollection",
    features,
  };
}

const outDir = path.join(ROOT, "public", "geo");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "community-boundaries.geojson");
const geojson = buildGeoJson();
fs.writeFileSync(outPath, JSON.stringify(geojson, null, 2) + "\n");
console.log(`Wrote ${geojson.features.length} features to ${outPath}`);
