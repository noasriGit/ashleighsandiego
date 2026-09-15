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
 *   - src/lib/sitemap-entries.ts — lastmod only from verified YYYY-MM-DD dates
 *
 * Usage: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./load-env.mjs";
import { getSitemapUrlEntries } from "../src/lib/sitemap-entries";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

loadEnvFiles(root);

const SITE_DOMAIN = "sdcommunities.com";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_DOMAIN}`;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("'", "&apos;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const entries = getSitemapUrlEntries();

const urlEntries = entries
  .map((entry) => {
    const url = `${baseUrl}${entry.path}`;
    const lastmodLine = entry.lastmod
      ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`
      : "";

    return `  <url>
    <loc>${escapeXml(url)}</loc>${lastmodLine}
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
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

const withLastmod = entries.filter((entry) => entry.lastmod).length;
console.log(
  `Wrote ${entries.length} URLs to public/sitemap.xml (${withLastmod} with lastmod, ${entries.length - withLastmod} omitted lastmod)`,
);
