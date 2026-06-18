/**
 * Validate automated IDX search config coverage for all communities.
 *
 * Usage: node scripts/generate-idx-search-config.mjs
 *
 * Reads community data from src/data/communities.ts and zip mappings from
 * src/data/community-zips.ts (via a lightweight inline mirror for the script).
 * Prints a coverage report, the runtime config is built automatically in
 * idx-search-config.ts at import time.
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./load-env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

loadEnvFiles(root);

// Mirror of launch slugs + special keys (keep in sync with communities.ts).
const LAUNCH_SLUGS = [
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
];

const SPECIAL = ["_general", "_military"];

// Parse ZIP_OVERRIDES from community-zips.ts (simple regex extraction).
const zipsSource = readFileSync(
  join(root, "src/data/community-zips.ts"),
  "utf8",
);
const zipBlock = zipsSource.match(
  /const ZIP_OVERRIDES[\s\S]*?= \{([\s\S]*?)\};/,
)?.[1];
if (!zipBlock) {
  console.error("Could not parse ZIP_OVERRIDES from community-zips.ts");
  process.exit(1);
}

const zipOverrides = {};
for (const match of zipBlock.matchAll(/(?:"([^"]+)"|([a-z0-9_-]+)):\s*\[([^\]]*)\]/g)) {
  const slug = match[1] ?? match[2];
  const zips = [...match[3].matchAll(/"(\d{5})"/g)].map((m) => m[1]);
  zipOverrides[slug] = zips;
}

const overridesPath = join(root, "data/idx-search-overrides.json");
let overrides = {};
try {
  overrides = JSON.parse(readFileSync(overridesPath, "utf8"));
} catch {
  console.warn("No idx-search-overrides.json found, saved search IDs not synced yet.");
}

const idxBase = process.env.NEXT_PUBLIC_IDX_BASE_URL ?? "https://search.sdcommunities.com";

console.log("\nIDX Community Search Config Report\n");
console.log(`Base URL: ${idxBase}\n`);
console.log("Launch communities:\n");

let missing = 0;
for (const slug of LAUNCH_SLUGS) {
  const zips = zipOverrides[slug] ?? [];
  const override = overrides[slug] ?? {};
  const hasSaved = Boolean(override.savedSearchUrl || override.savedSearchId);
  const dynamicUrl =
    zips.length > 0
      ? `${idxBase.replace(/\/$/, "")}/idx/results/listings?${zips.map((z) => `zipcode[]=${z}&`).join("")}a_status[]=active`
      : "(no zips)";

  if (zips.length === 0) missing++;

  console.log(`  ${slug}`);
  console.log(`    zips:        ${zips.join(", ") || "MISSING"}`);
  console.log(`    saved link:  ${hasSaved ? override.savedSearchUrl || override.savedSearchId : "(dynamic URL only)"}`);
  console.log(`    dynamic URL: ${dynamicUrl}`);
  console.log("");
}

console.log("Special searches:\n");
for (const slug of SPECIAL) {
  const zips = zipOverrides[slug] ?? [];
  const override = overrides[slug] ?? {};
  console.log(`  ${slug}: zips=[${zips.join(", ")}] saved=${override.savedSearchUrl || "none"}`);
}

const totalCommunities = Object.keys(zipOverrides).filter(
  (k) => !k.startsWith("_"),
).length;
console.log(`\nTotal communities with zip config: ${totalCommunities}`);
if (missing > 0) {
  console.warn(`\nWarning: ${missing} launch communit${missing === 1 ? "y" : "ies"} missing zip codes.`);
  process.exit(1);
}

console.log("\nConfig is auto-built at runtime in src/data/idx-search-config.ts.");
console.log("To sync saved search IDs from IDX: npm run idx:sync-searches\n");
