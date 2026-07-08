/**
 * Write a static public/sitemap.xml for Google Search Console.
 *
 * Next.js metadata routes can return 200 in browsers while GSC reports
 * "Couldn't fetch". A plain static file avoids that class of issues.
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

const staticPages = [
  "",
  "/relocating-to-san-diego",
  "/moving-to-la-jolla",
  "/military-va-relocation-san-diego",
  "/first-time-home-buyer-san-diego",
  "/neighborhoods",
  "/search-homes",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/accessibility",
];

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
    const changeFrequency = path === "" ? "weekly" : "monthly";
    const priority =
      path === "" ? "1.0" : path.includes("neighborhoods/") ? "0.8" : "0.9";

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
