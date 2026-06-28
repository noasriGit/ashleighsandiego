/**
 * Validates public/geo/community-boundaries.geojson against communities.ts slugs.
 * Run: npm run geo:validate-boundaries
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

/** @param {string} filePath */
function readCommunitySlugs(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

/** @param {unknown} coords */
function isValidRing(coords) {
  if (!Array.isArray(coords) || coords.length < 4) return false;
  for (const point of coords) {
    if (!Array.isArray(point) || point.length < 2) return false;
    const [lng, lat] = point;
    if (typeof lng !== "number" || typeof lat !== "number") return false;
    if (lng < -180 || lng > 180 || lat < -90 || lat > 90) return false;
  }
  const first = coords[0];
  const last = coords[coords.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}

function main() {
  const geoPath = path.join(ROOT, "public", "geo", "community-boundaries.geojson");
  const communitiesPath = path.join(ROOT, "src", "data", "communities.ts");

  if (!fs.existsSync(geoPath)) {
    console.error(`Missing ${geoPath}. Run: node scripts/generate-community-boundaries.mjs`);
    process.exit(1);
  }

  const expectedSlugs = readCommunitySlugs(communitiesPath);
  const geo = JSON.parse(fs.readFileSync(geoPath, "utf8"));

  if (geo.type !== "FeatureCollection" || !Array.isArray(geo.features)) {
    console.error("GeoJSON must be a FeatureCollection");
    process.exit(1);
  }

  const foundSlugs = new Set();
  const errors = [];

  for (const feature of geo.features) {
    const slug = feature?.properties?.slug;
    if (!slug || typeof slug !== "string") {
      errors.push("Feature missing properties.slug");
      continue;
    }
    if (foundSlugs.has(slug)) {
      errors.push(`Duplicate slug: ${slug}`);
    }
    foundSlugs.add(slug);

    const geom = feature.geometry;
    if (!geom || geom.type !== "Polygon" || !Array.isArray(geom.coordinates?.[0])) {
      errors.push(`${slug}: invalid Polygon geometry`);
      continue;
    }
    if (!isValidRing(geom.coordinates[0])) {
      errors.push(`${slug}: invalid or unclosed polygon ring`);
    }
  }

  for (const slug of expectedSlugs) {
    if (!foundSlugs.has(slug)) {
      errors.push(`Missing polygon for community slug: ${slug}`);
    }
  }

  for (const slug of foundSlugs) {
    if (!expectedSlugs.includes(slug)) {
      errors.push(`Unknown slug in GeoJSON (not in communities.ts): ${slug}`);
    }
  }

  if (errors.length > 0) {
    console.error("Boundary validation failed:\n");
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  console.log(`OK: ${foundSlugs.size} community boundaries validated.`);
}

main();
