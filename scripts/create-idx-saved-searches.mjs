/**
 * Create IDX Broker saved links for all launch communities via the API.
 *
 * IDX supports PUT https://api.idxbroker.com/clients/savedlinks to create saved links.
 * Requires IDX_API_KEY in .env / .env.local.
 *
 * Usage:
 *   npm run idx:create-searches              # dry-run (shows what would be created)
 *   npm run idx:create-searches -- --apply   # create missing saved links + sync overrides
 *   npm run idx:create-searches -- --apply --slug la-jolla
 *   npm run idx:create-searches -- --inspect # list accepted PUT fields from IDX API
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./load-env.mjs";
import { loadCommunitySearchTargets } from "./idx-communities.mjs";
import { buildIdxQueryString } from "./idx-search-query.mjs";
import {
  createSavedLink,
  fetchSavedLinks,
  inspectSavedLinkFields,
  matchSavedLink,
  buildSavedLinkUrl,
} from "./idx-api.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const overridesPath = join(root, "data/idx-search-overrides.json");

loadEnvFiles(root);

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const inspect = args.includes("--inspect");
const slugFilter = args.includes("--slug")
  ? args[args.indexOf("--slug") + 1]
  : null;

const API_KEY = process.env.IDX_API_KEY;
if (!API_KEY) {
  console.error("IDX_API_KEY is required. Add it to .env or .env.local.");
  process.exit(1);
}

const idxBaseUrl =
  process.env.NEXT_PUBLIC_IDX_BASE_URL ?? "https://search.sdcommunities.com";

if (inspect) {
  const result = await inspectSavedLinkFields(API_KEY);
  console.log("IDX savedlinks PUT fields (empty PUT response):\n");
  console.log(JSON.stringify(result.data ?? result.text, null, 2));
  process.exit(result.ok ? 0 : 1);
}

let targets = loadCommunitySearchTargets(root);
if (slugFilter) {
  targets = targets.filter((t) => t.slug === slugFilter);
  if (targets.length === 0) {
    console.error(`Unknown slug: ${slugFilter}`);
    process.exit(1);
  }
}

const existingLinks = await fetchSavedLinks(API_KEY);
console.log(`Found ${existingLinks.length} existing saved links in IDX.\n`);

if (!apply) {
  console.log("DRY RUN, pass --apply to create saved links.\n");
}

let created = 0;
let skipped = 0;
let failed = 0;

for (const target of targets) {
  const { slug, name, zipCodes } = target;

  if (zipCodes.length === 0) {
    console.log(`  ⊘ ${slug}, skipped (no zip codes)`);
    skipped++;
    continue;
  }

  const existing = matchSavedLink(existingLinks, slug, name);
  if (existing) {
    console.log(`  ○ ${slug}, already exists (id=${existing.id}, name="${existing.linkName}")`);
    skipped++;
    continue;
  }

  const linkName = slug.replace(/^_/, "");
  const title = `${name} Homes for Sale`;
  const queryString = buildIdxQueryString({ zipCodes });

  const fields = {
    linkName,
    linkTitle: title,
    pageTitle: `${title} | San Diego Relocation Home Guide`,
    queryString,
  };

  console.log(`  ${apply ? "+" : "→"} ${slug}`);
  console.log(`      linkName:     ${linkName}`);
  console.log(`      zips:         ${zipCodes.join(", ")}`);
  console.log(`      queryString:  ${queryString}`);

  if (!apply) continue;

  const result = await createSavedLink(API_KEY, fields);
  if (!result.ok) {
    console.log(`      ✗ failed (${result.status}): ${result.text || JSON.stringify(result.data)}`);
    failed++;
    continue;
  }

  console.log(`      ✓ created${result.data ? ` → ${JSON.stringify(result.data)}` : ""}`);
  created++;

  // Brief pause to stay under rate limits when bulk-creating.
  await new Promise((r) => setTimeout(r, 300));
}

if (apply && created > 0) {
  console.log("\nRefreshing saved links and writing overrides...\n");
  const refreshedLinks = await fetchSavedLinks(API_KEY);

  let overrides = {};
  try {
    overrides = JSON.parse(readFileSync(overridesPath, "utf8"));
  } catch {
    overrides = { _comment: "Synced from IDX API" };
  }

  let synced = 0;
  for (const target of targets) {
    const hit = matchSavedLink(refreshedLinks, target.slug, target.name);
    if (!hit) continue;
    synced++;
    overrides[target.slug] = {
      ...overrides[target.slug],
      savedSearchId: hit.id,
      savedSearchUrl:
        hit.url || buildSavedLinkUrl(idxBaseUrl, hit.linkName || target.slug.replace(/^_/, "")),
    };
    console.log(`  ✓ ${target.slug} → id=${hit.id}`);
  }

  writeFileSync(overridesPath, `${JSON.stringify(overrides, null, 2)}\n`);
  console.log(`\nWrote ${synced} entries to ${overridesPath}`);
}

console.log(
  `\nDone. ${apply ? `Created ${created}, skipped ${skipped}, failed ${failed}.` : "Re-run with --apply to create."}\n`,
);

if (failed > 0) process.exit(1);
