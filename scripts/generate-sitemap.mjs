/**
 * Write a static public/sitemap.xml for Google Search Console.
 *
 * Next.js metadata routes can return 200 in browsers while GSC reports
 * "Couldn't fetch". A plain static file avoids that class of issues.
 *
 * Sources:
 *   - src/data/routes.ts (entries with inSitemap: true)
 *   - src/data/communities.ts (hasGuide: true neighborhood guides)
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

function getSitemapRoutes() {
  const source = readFileSync(join(root, "src/data/routes.ts"), "utf8");
  const routes = [];
  const blockRe = /\{\s*path:\s*"([^"]+)"[\s\S]*?inSitemap:\s*(true|false)/g;
  let match;

  while ((match = blockRe.exec(source)) !== null) {
    if (match[2] === "true") {
      routes.push(match[1]);
    }
  }

  return routes;
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

function getLaunchCommunitySlugs() {
  const source = readFileSync(join(root, "src/data/communities.ts"), "utf8");
  const slugs = [];

  for (const match of source.matchAll(
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?hasGuide:\s*true/g,
  )) {
    slugs.push(match[1]);
  }

  return slugs;
}

const staticPages = getSitemapRoutes();
const communityPages = getLaunchCommunitySlugs().map(
  (slug) => `/neighborhoods/${slug}`,
);
const allPages = [...staticPages, ...communityPages];
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
