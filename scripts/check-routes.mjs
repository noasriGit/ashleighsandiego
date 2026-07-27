/**
 * Route-registry consistency check (docs/seo-rebuild-plan.md §17/§20).
 *
 * Cross-checks src/data/routes.ts against:
 *   1. The actual App Router file tree (every static, non-dynamic route in the
 *      registry must have a corresponding page.tsx, and vice versa).
 *   2. src/data/internal-links.ts (every link target must be a known route and
 *      must never point at a 301 redirect source).
 *
 * Run: npm run routes:validate
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const APP_DIR = path.join(ROOT, "src", "app");

// Routes that intentionally have no static page.tsx entry (dynamic segments,
// or App Router special files that aren't content pages).
const DYNAMIC_OR_SPECIAL = new Set(["/neighborhoods/[slug]"]);

/** @param {string} filePath */
function readRoutePaths(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const re = /path:\s*"([^"]+)"/g;
  const paths = [];
  let match;
  while ((match = re.exec(src)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

/** @param {string} filePath */
function readRedirectSources(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const re = /redirectsFrom:\s*\[([^\]]*)\]/g;
  const sources = [];
  let match;
  while ((match = re.exec(src)) !== null) {
    const items = match[1].match(/"([^"]+)"/g) ?? [];
    sources.push(...items.map((s) => s.replace(/"/g, "")));
  }
  return sources;
}

/** @param {string} filePath */
function readLinkPlan(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const entryRe = /\{\s*from:\s*"([^"]+)",\s*linksTo:\s*\[([^\]]*)\]\s*\}/g;
  const entries = [];
  let match;
  while ((match = entryRe.exec(src)) !== null) {
    const from = match[1];
    const linksTo = (match[2].match(/"([^"]+)"/g) ?? []).map((s) => s.replace(/"/g, ""));
    entries.push({ from, linksTo });
  }
  return entries;
}

/** Discover every static App Router page and return it as a route path (e.g. /about). */
function discoverAppRoutes(dir, prefix = "") {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name === "api") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...discoverAppRoutes(full, `${prefix}/${entry.name}`));
    } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
      routes.push(prefix === "" ? "/" : prefix);
    }
  }
  return routes;
}

function main() {
  const routesPath = path.join(ROOT, "src", "data", "routes.ts");
  const linksPath = path.join(ROOT, "src", "data", "internal-links.ts");

  const registryPaths = new Set(readRoutePaths(routesPath));
  const redirectSources = new Set(readRedirectSources(routesPath));
  const linkPlan = readLinkPlan(linksPath);
  const appRoutes = discoverAppRoutes(APP_DIR).filter((r) => !DYNAMIC_OR_SPECIAL.has(r));

  const errors = [];

  for (const route of appRoutes) {
    if (!registryPaths.has(route) && !redirectSources.has(route)) {
      errors.push(`App route "${route}" has a page.tsx but no entry in src/data/routes.ts.`);
    }
  }

  for (const registryPath of registryPaths) {
    if (!appRoutes.includes(registryPath)) {
      errors.push(`routes.ts entry "${registryPath}" has no matching src/app page.tsx.`);
    }
  }

  for (const entry of linkPlan) {
    if (!registryPaths.has(entry.from)) {
      errors.push(`internal-links.ts: "${entry.from}" is not in the route registry.`);
    }
    for (const target of entry.linksTo) {
      if (redirectSources.has(target)) {
        errors.push(`internal-links.ts: "${entry.from}" links to "${target}", a 301 redirect source.`);
      }
      if (!registryPaths.has(target)) {
        errors.push(`internal-links.ts: "${entry.from}" links to unregistered route "${target}".`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Route registry validation failed:\n");
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  console.log(`OK: ${registryPaths.size} registry routes match the App Router file tree; internal-link plan is chain-free.`);
}

main();
