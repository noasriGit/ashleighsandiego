/**
 * Sync IDX saved-search IDs and URLs into data/idx-search-overrides.json.
 *
 * Requires IDX_API_KEY in .env / .env.local.
 *
 * Usage:
 *   npm run idx:sync-searches
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./load-env.mjs";
import { loadCommunitySearchTargets } from "./idx-communities.mjs";
import {
  fetchSavedLinks,
  matchSavedLink,
  buildSavedLinkUrl,
  brandSavedLinkUrl,
} from "./idx-api.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const overridesPath = join(root, "data/idx-search-overrides.json");

loadEnvFiles(root);

const API_KEY = process.env.IDX_API_KEY;
if (!API_KEY) {
  console.error(
    "IDX_API_KEY is required. Add it to .env or .env.local in the project root.",
  );
  process.exit(1);
}

const idxBaseUrl =
  process.env.NEXT_PUBLIC_IDX_BASE_URL ?? "https://search.sdcommunities.com";

const targets = loadCommunitySearchTargets(root);
const links = await fetchSavedLinks(API_KEY);
console.log(`Fetched ${links.length} saved links from IDX.\n`);

let overrides = {};
try {
  overrides = JSON.parse(readFileSync(overridesPath, "utf8"));
} catch {
  overrides = { _comment: "Synced from IDX API" };
}

let matched = 0;
for (const { slug, name } of targets) {
  const hit = matchSavedLink(links, slug, name);
  if (!hit) {
    console.log(`  ✗ ${slug}, no matching saved link found`);
    continue;
  }
  matched++;
  const linkName = hit.linkName || slug.replace(/^_/, "");
  const url = brandSavedLinkUrl(
    hit.url || buildSavedLinkUrl(idxBaseUrl, linkName),
    idxBaseUrl,
    linkName,
  );
  overrides[slug] = {
    ...overrides[slug],
    savedSearchId: hit.id,
    ...(url ? { savedSearchUrl: url } : {}),
  };
  console.log(`  ✓ ${slug} → id=${hit.id}${url ? ` url=${url}` : ""}`);
}

writeFileSync(overridesPath, `${JSON.stringify(overrides, null, 2)}\n`);
console.log(`\nWrote ${matched} matches to ${overridesPath}`);
console.log("Restart dev server to pick up override changes.\n");
