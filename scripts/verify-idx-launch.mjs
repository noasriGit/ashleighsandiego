/**
 * Pre-flight checks for IDX Phase 1 launch.
 *
 * Usage: npm run idx:verify
 *
 * Requires IDX_API_KEY in .env / .env.local.
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./load-env.mjs";
import { idxRequest, fetchSavedLinks } from "./idx-api.mjs";
import { loadCommunitySearchTargets } from "./idx-communities.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

loadEnvFiles(root);

const API_KEY = process.env.IDX_API_KEY;
const idxBaseUrl =
  process.env.NEXT_PUBLIC_IDX_BASE_URL ?? "https://sdcommunities.idxbroker.com";
const idxEnabled = process.env.NEXT_PUBLIC_IDX_ENABLED === "true";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sdcommunities.com";

let failures = 0;
let warnings = 0;

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

function fail(msg) {
  console.log(`  ✗ ${msg}`);
  failures++;
}

function warn(msg) {
  console.log(`  ⚠ ${msg}`);
  warnings++;
}

function section(title) {
  console.log(`\n${title}`);
}

section("IDX Launch Verification");
console.log(`Site: ${siteUrl}`);
console.log(`IDX base: ${idxBaseUrl}`);
console.log(`NEXT_PUBLIC_IDX_ENABLED: ${idxEnabled}`);

section("Environment");
if (API_KEY) pass("IDX_API_KEY is set");
else fail("IDX_API_KEY missing — add to .env or .env.local");

if (idxBaseUrl) pass(`NEXT_PUBLIC_IDX_BASE_URL = ${idxBaseUrl}`);
else fail("NEXT_PUBLIC_IDX_BASE_URL missing");

if (idxEnabled) pass("IDX master switch is ON");
else warn("NEXT_PUBLIC_IDX_ENABLED is not \"true\" — site shows CustomSearchForm fallback");

if (process.env.NEXT_PUBLIC_IDX_WIDGET_URL) {
  pass("NEXT_PUBLIC_IDX_WIDGET_URL is set");
} else {
  warn("NEXT_PUBLIC_IDX_WIDGET_URL empty — /search-homes omnibar will not render");
}

section("Branded subdomain");
try {
  const res = await fetch(idxBaseUrl, { method: "HEAD", redirect: "follow" });
  if (res.ok || res.status === 403) {
    pass(`search subdomain responds (${res.status})`);
  } else {
    fail(`search subdomain returned HTTP ${res.status}`);
  }
} catch (error) {
  fail(`search subdomain unreachable — configure CNAME in DNS + IDX Control Panel (${error.message})`);
}

section("Saved searches");
if (!API_KEY) {
  fail("Skipped — no API key");
} else {
  const links = await fetchSavedLinks(API_KEY);
  const targets = loadCommunitySearchTargets(root);
  pass(`${links.length} saved links in IDX (${targets.length} expected)`);

  const unfiltered = links.filter(
    (link) =>
      !link.queryString ||
      link.queryString === "page=listings&" ||
      !link.queryString.includes("zipcode"),
  );
  if (unfiltered.length === 0) {
    pass("All saved links have zip filters in queryString");
  } else {
    warn(
      `${unfiltered.length} saved link(s) missing zip filters — update in IDX Control Panel or rely on dynamic browse URLs`,
    );
  }

  let overrides = {};
  try {
    overrides = JSON.parse(
      readFileSync(join(root, "data/idx-search-overrides.json"), "utf8"),
    );
  } catch {
    fail("data/idx-search-overrides.json missing — run npm run idx:sync-searches");
  }

  for (const { slug } of targets) {
    if (!overrides[slug]?.savedSearchId) {
      fail(`${slug} — no savedSearchId in overrides`);
    }
  }
  if (failures === 0) pass("All community overrides have savedSearchId");
}

section("MLS feed");
if (!API_KEY) {
  fail("Skipped — no API key");
} else {
  const { ok, data } = await idxRequest(API_KEY, "GET", "/clients/featured?limit=5");
  if (!ok) {
    fail("Could not fetch /clients/featured");
  } else {
    const listings = data?.data ? Object.values(data.data) : [];
    const sample = listings[0];
    const state = sample?.state ?? sample?.stateAbrv ?? "";
    const city = sample?.cityName ?? sample?.city ?? "";
    const isDemoFlorida =
      /florida|^fl$/i.test(String(state)) ||
      /coral gables|miami|opa-locka|bal harbour/i.test(String(city));

    if (isDemoFlorida) {
      warn(
        `API still serving demo Florida listings (${city}, ${state}) — SDMLS feed may still be syncing after approval`,
      );
    } else if (/california|^ca$/i.test(String(state))) {
      pass(`Live SDMLS data detected (sample: ${city}, ${state})`);
    } else {
      warn(`Unexpected sample listing: ${city}, ${state}`);
    }

    const generalId = JSON.parse(
      readFileSync(join(root, "data/idx-search-overrides.json"), "utf8"),
    )._general?.savedSearchId;
    if (generalId) {
      const countRes = await idxRequest(
        API_KEY,
        "GET",
        `/clients/savedlinks/${generalId}/count`,
      );
      if (countRes.ok) {
        const count = Number(countRes.data);
        if (count >= 10000) {
          warn(`General saved search count is ${count} — likely demo data until feed syncs`);
        } else if (count > 0) {
          pass(`General saved search count: ${count.toLocaleString()}`);
        } else {
          warn("General saved search count is 0");
        }
      }
    }
  }
}

section("Static assets");
for (const file of ["docs/idx-wrapper.html", "docs/idx-results.css", "docs/idx-detail.css"]) {
  if (existsSync(join(root, file))) pass(`${file} present`);
  else fail(`${file} missing — upload to IDX Control Panel`);
}

section("Summary");
if (failures === 0 && warnings === 0) {
  console.log("\nAll checks passed. Set NEXT_PUBLIC_IDX_ENABLED=true in Vercel and redeploy.\n");
} else if (failures === 0) {
  console.log(`\n${warnings} warning(s). Review above, then enable IDX in production when ready.\n`);
} else {
  console.log(`\n${failures} failure(s), ${warnings} warning(s). Fix blockers before enabling IDX.\n`);
  process.exit(1);
}
