/**
 * Verify Wave 1 SEO architecture: sitemap, indexability, content gates, links.
 *
 * Run: npm run seo:verify
 */

import {
  ACTIVE_REINTRODUCTION_CLUSTERS,
  getIndexableCommunitySlugs,
  getSitemapPaths,
  WAVE1_COMMUNITY_SLUGS,
} from "../src/lib/seo-indexability";
import {
  getExpectedSitemapUrls,
  validateSeoArchitecture,
} from "../src/lib/seo-validation";
import { siteConfig } from "../src/data/site-config";
import {
  getIndexableStaticPaths,
  getNoindexStaticPaths,
  getPathRedirects,
} from "../src/data/routes";

function main() {
  const issues = validateSeoArchitecture();
  const sitemapPaths = getSitemapPaths();
  const indexableSlugs = getIndexableCommunitySlugs();
  const urls = getExpectedSitemapUrls();
  const redirects = getPathRedirects();

  console.log("SEO architecture verification\n");
  console.log(`Site URL: ${siteConfig.url}`);
  console.log(`Sitemap URL count: ${sitemapPaths.length}`);
  console.log(`Indexable static paths: ${getIndexableStaticPaths().length}`);
  console.log(`Wave 1 communities: ${WAVE1_COMMUNITY_SLUGS.length}`);
  console.log(`Active reintroduction clusters: ${ACTIVE_REINTRODUCTION_CLUSTERS.length}`);
  console.log(`Indexable community slugs: ${indexableSlugs.length}`);
  console.log(`Total indexable URL count: ${getIndexableStaticPaths().length + indexableSlugs.length}`);
  console.log(`Noindex static path groups: ${getNoindexStaticPaths().length}`);
  console.log(`Path redirects: ${redirects.length}`);
  console.log("\nGenerated sitemap URLs:");
  for (const url of urls) {
    console.log(`  - ${url}`);
  }

  if (issues.length > 0) {
    console.error(`\nFAILED with ${issues.length} issue(s):\n`);
    for (const issue of issues) {
      const loc = [
        issue.slug ? `slug=${issue.slug}` : null,
        issue.field ? `field=${issue.field}` : null,
        issue.sourceFile ? `file=${issue.sourceFile}` : null,
      ]
        .filter(Boolean)
        .join(", ");
      console.error(`  [${issue.code}] ${issue.message}${loc ? ` (${loc})` : ""}`);
    }
    process.exit(1);
  }

  console.log("\nAll SEO architecture checks passed.");
  console.log(
    `Summary: ${sitemapPaths.length} sitemap URLs · ${indexableSlugs.length} indexable communities · ${ACTIVE_REINTRODUCTION_CLUSTERS.length} active reintroduction clusters · ${redirects.length} path redirects (no chains).`,
  );
}

main();
