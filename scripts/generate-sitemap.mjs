/**
 * Write a static public/sitemap.xml for Google Search Console.
 *
 * Next.js metadata routes can return 200 in browsers while GSC reports
 * "Couldn't fetch". A plain static file avoids that class of issues.
 *
 * Sources:
 *   - src/data/routes.ts — authoritative static-page indexability/sitemap state
 *     (every entry with inSitemap: true)
 *   - src/lib/seo-indexability.ts — WAVE1 + ACTIVE_REINTRODUCTION community slugs
 *     (dynamic /neighborhoods/[slug] indexability)
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./load-env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

loadEnvFiles(root);

const SITE_DOMAIN = "sdcommunities.com";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_DOMAIN}`;

function readArrayExport(source, exportName) {
  const re = new RegExp(
    `export const ${exportName}[^=]*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`,
  );
  const match = re.exec(source);
  if (!match) return [];
  return [...match[1].matchAll(/"([^"]*)"/g)].map((m) => m[1]);
}

/** Parse every top-level `{ path: "...", ... }` route object out of routes.ts. */
function readRouteEntries(source) {
  const blockRe = /\{[^{}]*path:\s*"([^"]*)"[^{}]*\}/g;
  const entries = [];
  let match;
  while ((match = blockRe.exec(source)) !== null) {
    const block = match[0];
    entries.push({
      path: match[1],
      inSitemap: /inSitemap:\s*true/.test(block),
    });
  }
  return entries;
}

function getStaticSitemapPaths() {
  const source = readFileSync(join(root, "src/data/routes.ts"), "utf8");
  return readRouteEntries(source)
    .filter((entry) => entry.inSitemap)
    .map((entry) => entry.path);
}

function getWave1SitemapPaths() {
  const staticPaths = getStaticSitemapPaths();
  const source = readFileSync(
    join(root, "src/lib/seo-indexability.ts"),
    "utf8",
  );
  const wave1 = readArrayExport(source, "WAVE1_COMMUNITY_SLUGS");
  const reintro = readArrayExport(source, "ACTIVE_REINTRODUCTION_CLUSTERS");
  const communityPaths = [...new Set([...wave1, ...reintro])].map(
    (slug) => `/neighborhoods/${slug}`,
  );
  return [...staticPaths, ...communityPaths];
}

function getRouteMeta(path) {
  const source = readFileSync(join(root, "src/data/routes.ts"), "utf8");
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const blockRe = new RegExp(
    `\\{[\\s\\S]*?path:\\s*"${escaped}"[\\s\\S]*?changeFrequency:\\s*"(\\w+)"[\\s\\S]*?priority:\\s*([\\d.]+)`,
  );
  const match = blockRe.exec(source);
  if (match) {
    return { changeFrequency: match[1], priority: match[2] };
  }

  if (path.startsWith("/neighborhoods/")) {
    return { changeFrequency: "monthly", priority: "0.8" };
  }

  return { changeFrequency: "monthly", priority: "0.8" };
}

const allPages = getWave1SitemapPaths();
const lastModified = new Date().toISOString();

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("'", "&apos;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const urlEntries = allPages
  .map((path) => {
    const url = `${baseUrl}${path}`;
    const { changeFrequency, priority } = getRouteMeta(path);

    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outputPath = join(root, "public/sitemap.xml");
writeFileSync(outputPath, xml, "utf8");

console.log(`Wrote ${allPages.length} URLs to public/sitemap.xml`);
