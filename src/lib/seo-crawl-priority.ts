/**
 * Crawl-priority checks for Wave 1 hubs, sitemap lastmod, and the five
 * priority URLs. Used by scripts/verify-seo-architecture.ts.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  getNoindexStaticPaths,
  getPathRedirects,
  isStaticPathIndexable,
} from "@/data/routes";
import {
  ACTIVE_REINTRODUCTION_CLUSTERS,
  getIndexableCommunitySlugs,
  getRobotsForCommunity,
  getSitemapPaths,
  isCommunityIndexable,
  WAVE1_COMMUNITY_SLUGS,
} from "@/lib/seo-indexability";
import {
  getLastmodForPath,
  getSitemapUrlEntries,
  LASTMOD_DATE_RE,
  parseVerifiedLastmod,
} from "@/lib/sitemap-entries";
import { getLaunchCommunitySlugs } from "@/data/communities";
import type { SeoValidationIssue } from "@/lib/seo-validation";

const ROOT = process.cwd();

export const PRIORITY_PATHS = [
  "/mission-valley-condos-for-sale",
  "/military-realtor-san-diego",
  "/moving-to-san-diego",
  "/la-jolla-neighborhoods",
  "/san-diego-neighborhood-map",
] as const;

/** Frozen Wave 1 set — this pass must not add, remove, or reorder these slugs. */
export const EXPECTED_WAVE1_COMMUNITY_SLUGS = [
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
] as const;

export const EXPECTED_SITEMAP_COUNT = 24;

/** Git-verified lastmod for each Wave 1 neighborhood guide. */
export const EXPECTED_NEIGHBORHOOD_LASTMOD: Record<string, string> = {
  "la-jolla": "2026-07-29",
  "pacific-beach": "2026-07-29",
  "university-city": "2026-07-29",
  clairemont: "2026-07-29",
  "mission-valley": "2026-08-27",
  "del-mar": "2026-07-29",
  "carmel-valley": "2026-07-29",
  "point-loma": "2026-07-29",
  "sorrento-valley": "2026-07-29",
  "bay-park": "2026-07-29",
  "ocean-beach": "2026-07-29",
  hillcrest: "2026-08-27",
  "north-park": "2026-07-29",
};

type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

function issue(
  code: string,
  message: string,
  extra?: Partial<SeoValidationIssue>,
): SeoValidationIssue {
  return { code, message, ...extra };
}

function readProjectFile(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

export function parseSitemapXml(xml: string): SitemapUrl[] {
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  return blocks.map((match) => {
    const block = match[1] ?? "";
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    const changefreq = block.match(/<changefreq>([^<]+)<\/changefreq>/)?.[1];
    const priority = block.match(/<priority>([^<]+)<\/priority>/)?.[1];
    return { loc, lastmod, changefreq, priority };
  });
}

function pathFromLoc(loc: string, baseUrl: string): string {
  const normalizedBase = baseUrl.replace(/\/$/, "");
  if (loc === normalizedBase || loc === `${normalizedBase}/`) return "/";
  return loc.replace(normalizedBase, "") || "/";
}

function sourceHasHref(source: string, href: string): boolean {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`href=["'\`]${escaped}["'\`]`),
    new RegExp(`href:\\s*["'\`]${escaped}["'\`]`),
  ];
  return patterns.some((re) => re.test(source));
}

function previewSectionHasCrawlableDeferredLinks(source: string): boolean {
  const marker = "Additional Neighborhood Previews";
  const idx = source.indexOf(marker);
  if (idx === -1) return true;
  const preview = source.slice(idx);
  return /href=\{\`\/neighborhoods\/\$\{c\.slug\}\`\}/.test(preview) ||
    /href=["']\/neighborhoods\/[a-z0-9-]+["']/.test(preview);
}

export function validateCrawlPriority(baseUrl: string): SeoValidationIssue[] {
  const issues: SeoValidationIssue[] = [];
  const sitemapXml = readProjectFile("public/sitemap.xml");
  const sitemapUrls = parseSitemapXml(sitemapXml);
  const sitemapPaths = sitemapUrls.map((u) => pathFromLoc(u.loc, baseUrl));
  const registryPaths = getSitemapPaths();
  const redirectSources = new Set(getPathRedirects().map((r) => r.source));
  const noindexStatic = new Set(getNoindexStaticPaths());
  const deferredSlugs = getLaunchCommunitySlugs().filter((slug) => !isCommunityIndexable(slug));

  if (sitemapUrls.length !== EXPECTED_SITEMAP_COUNT) {
    issues.push(
      issue(
        "sitemap-priority-count",
        `Generated sitemap has ${sitemapUrls.length} URLs; expected ${EXPECTED_SITEMAP_COUNT}.`,
        { sourceFile: "public/sitemap.xml" },
      ),
    );
  }

  if (sitemapUrls.length !== registryPaths.length) {
    issues.push(
      issue(
        "sitemap-xml-registry-mismatch",
        `Generated sitemap has ${sitemapUrls.length} URLs but registry has ${registryPaths.length}.`,
        { sourceFile: "public/sitemap.xml" },
      ),
    );
  }

  const seenLocs = new Set<string>();
  for (const url of sitemapUrls) {
    if (!url.loc) {
      issues.push(issue("sitemap-missing-loc", "Sitemap url entry is missing <loc>.", { sourceFile: "public/sitemap.xml" }));
      continue;
    }
    if (seenLocs.has(url.loc)) {
      issues.push(
        issue("sitemap-duplicate-loc", `Sitemap contains duplicate loc "${url.loc}".`, {
          sourceFile: "public/sitemap.xml",
        }),
      );
    }
    seenLocs.add(url.loc);

    const path = pathFromLoc(url.loc, baseUrl);

    if (redirectSources.has(path)) {
      issues.push(
        issue("sitemap-redirect-source", `Sitemap includes redirect source "${path}".`, {
          sourceFile: "public/sitemap.xml",
        }),
      );
    }

    if (path.startsWith("/neighborhoods/")) {
      const slug = path.replace("/neighborhoods/", "");
      if (!isCommunityIndexable(slug)) {
        issues.push(
          issue("sitemap-deferred-community", `Sitemap includes deferred community "${slug}".`, {
            slug,
            sourceFile: "public/sitemap.xml",
          }),
        );
      }
    } else if (noindexStatic.has(path) || path.startsWith("/listings")) {
      issues.push(
        issue(
          "sitemap-noindex-utility",
          `Sitemap includes noindex utility path "${path}".`,
          { sourceFile: "public/sitemap.xml" },
        ),
      );
    }

    if (url.lastmod) {
      if (!LASTMOD_DATE_RE.test(url.lastmod)) {
        issues.push(
          issue(
            "sitemap-lastmod-not-date",
            `Sitemap lastmod "${url.lastmod}" on "${path}" is not a YYYY-MM-DD date (build timestamps are forbidden).`,
            { sourceFile: "public/sitemap.xml" },
          ),
        );
      }
      if (url.lastmod.includes("T") || url.lastmod.includes("Z")) {
        issues.push(
          issue(
            "sitemap-lastmod-build-time",
            `Sitemap lastmod on "${path}" looks like a build timestamp.`,
            { sourceFile: "public/sitemap.xml" },
          ),
        );
      }
    }

    const expectedLastmod = getLastmodForPath(path);
    if (!expectedLastmod && url.lastmod) {
      issues.push(
        issue(
          "sitemap-lastmod-unverified",
          `Sitemap includes lastmod on "${path}" without a verified modification date.`,
          { sourceFile: "public/sitemap.xml" },
        ),
      );
    }
    if (expectedLastmod && url.lastmod !== expectedLastmod) {
      issues.push(
        issue(
          "sitemap-lastmod-mismatch",
          `Sitemap lastmod on "${path}" is "${url.lastmod}" but verified date is "${expectedLastmod}".`,
          { sourceFile: "public/sitemap.xml" },
        ),
      );
    }
    if (expectedLastmod && !url.lastmod) {
      issues.push(
        issue(
          "sitemap-lastmod-missing",
          `Sitemap omitted lastmod on "${path}" despite verified date "${expectedLastmod}".`,
          { sourceFile: "public/sitemap.xml" },
        ),
      );
    }
  }

  for (const path of registryPaths) {
    if (!sitemapPaths.includes(path)) {
      issues.push(
        issue("sitemap-missing-registry-path", `Registry path "${path}" missing from generated sitemap.`, {
          sourceFile: "public/sitemap.xml",
        }),
      );
    }
  }

  const generatorSource = readProjectFile("scripts/generate-sitemap.ts");
  const lastmodLibSource = readProjectFile("src/lib/sitemap-entries.ts");
  for (const [label, source] of [
    ["scripts/generate-sitemap.ts", generatorSource],
    ["src/lib/sitemap-entries.ts", lastmodLibSource],
  ] as const) {
    if (
      /new Date\(\)\.toISOString\(/.test(source) ||
      /Date\.now\(\)/.test(source) ||
      /lastModified\s*=\s*new Date/.test(source)
    ) {
      issues.push(
        issue(
          "sitemap-lastmod-build-fallback",
          `${label} must not generate lastmod from build time or Date.now().`,
          { sourceFile: label },
        ),
      );
    }
  }

  const neighborhoodsPage = readProjectFile("src/app/neighborhoods/page.tsx");
  const mapPage = readProjectFile("src/app/san-diego-neighborhood-map/page.tsx");
  const homePage = readProjectFile("src/app/page.tsx");
  const movingPage = readProjectFile("src/app/moving-to-san-diego/page.tsx");
  const condoHubPage = readProjectFile("src/app/san-diego-condos-for-sale/page.tsx");
  const laJollaPage = readProjectFile("src/app/la-jolla-neighborhoods/page.tsx");
  const communityPage = readProjectFile("src/app/neighborhoods/[slug]/page.tsx");
  const seoExtensions = readProjectFile("src/data/community-seo-extensions.ts");
  const communityCard = readProjectFile("src/components/community/CommunityCard.tsx");
  const mapPopup = readProjectFile("src/components/map/CommunityMapPopup.tsx");

  if (!neighborhoodsPage.includes("isCommunityIndexable")) {
    issues.push(
      issue(
        "neighborhoods-indexability-source",
        "/neighborhoods must derive featured vs preview from isCommunityIndexable().",
        { sourceFile: "src/app/neighborhoods/page.tsx" },
      ),
    );
  }
  if (!neighborhoodsPage.includes("Guide in development")) {
    issues.push(
      issue(
        "deferred-preview-label",
        "Deferred neighborhood previews must be labeled Guide in development.",
        { sourceFile: "src/app/neighborhoods/page.tsx" },
      ),
    );
  }
  if (previewSectionHasCrawlableDeferredLinks(neighborhoodsPage)) {
    issues.push(
      issue(
        "deferred-preview-link",
        "Deferred neighborhood preview cards must not produce crawlable links.",
        { sourceFile: "src/app/neighborhoods/page.tsx" },
      ),
    );
  }
  if (!/href=\{\`\/neighborhoods\/\$\{c\.slug\}\`\}/.test(neighborhoodsPage)) {
    issues.push(
      issue(
        "indexable-neighborhood-link",
        "Indexable neighborhood cards on /neighborhoods must still produce crawlable links.",
        { sourceFile: "src/app/neighborhoods/page.tsx" },
      ),
    );
  }

  if (!mapPage.includes("getNeighborhoodGuideHref") || !mapPage.includes("isCommunityIndexable")) {
    issues.push(
      issue(
        "map-indexability-source",
        "/san-diego-neighborhood-map must derive crawlable guide links from indexability helpers.",
        { sourceFile: "src/app/san-diego-neighborhood-map/page.tsx" },
      ),
    );
  }
  if (!mapPage.includes("Guide in development")) {
    issues.push(
      issue(
        "map-deferred-label",
        "Deferred map directory labels must include Guide in development.",
        { sourceFile: "src/app/san-diego-neighborhood-map/page.tsx" },
      ),
    );
  }
  if (!communityCard.includes("getNeighborhoodGuideHref")) {
    issues.push(
      issue(
        "community-card-indexability",
        "CommunityCard must only wrap indexable guides in crawlable links.",
        { sourceFile: "src/components/community/CommunityCard.tsx" },
      ),
    );
  }
  if (!mapPopup.includes("getNeighborhoodGuideHref")) {
    issues.push(
      issue(
        "map-popup-indexability",
        "Map popups must not emit crawlable anchors to deferred guides.",
        { sourceFile: "src/components/map/CommunityMapPopup.tsx" },
      ),
    );
  }

  const homepageRequired = [
    "/mission-valley-condos-for-sale",
    "/military-realtor-san-diego",
    "/moving-to-san-diego",
    "/la-jolla-neighborhoods",
    "/san-diego-neighborhood-map",
  ];
  for (const href of homepageRequired) {
    if (!sourceHasHref(homePage, href)) {
      issues.push(
        issue(
          "priority-home-link",
          `Homepage main content must link to "${href}".`,
          { sourceFile: "src/app/page.tsx" },
        ),
      );
    }
  }

  if (!sourceHasHref(condoHubPage, "/mission-valley-condos-for-sale")) {
    issues.push(
      issue(
        "condo-hub-mv-link",
        "/san-diego-condos-for-sale must link to /mission-valley-condos-for-sale.",
        { sourceFile: "src/app/san-diego-condos-for-sale/page.tsx" },
      ),
    );
  }

  if (
    !seoExtensions.includes('href: "/mission-valley-condos-for-sale"') ||
    !communityPage.includes("content.transactionalPage")
  ) {
    issues.push(
      issue(
        "mv-guide-condo-link",
        "/neighborhoods/mission-valley must still link to /mission-valley-condos-for-sale.",
        { sourceFile: "src/data/community-seo-extensions.ts" },
      ),
    );
  }

  if (
    !sourceHasHref(laJollaPage, "/neighborhoods/la-jolla") ||
    !seoExtensions.includes('href: "/la-jolla-neighborhoods"')
  ) {
    issues.push(
      issue(
        "la-jolla-cross-link",
        "/neighborhoods/la-jolla and /la-jolla-neighborhoods must still cross-link.",
        { sourceFile: "src/app/la-jolla-neighborhoods/page.tsx" },
      ),
    );
  }

  if (!sourceHasHref(movingPage, "/military-realtor-san-diego")) {
    issues.push(
      issue(
        "moving-military-link",
        "/moving-to-san-diego must link to /military-realtor-san-diego.",
        { sourceFile: "src/app/moving-to-san-diego/page.tsx" },
      ),
    );
  }
  if (!sourceHasHref(movingPage, "/san-diego-neighborhood-map")) {
    issues.push(
      issue(
        "moving-map-link",
        "/moving-to-san-diego must link to /san-diego-neighborhood-map.",
        { sourceFile: "src/app/moving-to-san-diego/page.tsx" },
      ),
    );
  }

  if (JSON.stringify([...WAVE1_COMMUNITY_SLUGS]) !== JSON.stringify([...EXPECTED_WAVE1_COMMUNITY_SLUGS])) {
    issues.push(
      issue(
        "wave1-changed",
        "WAVE1_COMMUNITY_SLUGS changed during the crawl-priority pass.",
        { sourceFile: "src/lib/seo-indexability.ts" },
      ),
    );
  }
  if (ACTIVE_REINTRODUCTION_CLUSTERS.length !== 0) {
    issues.push(
      issue(
        "reintro-activated",
        "ACTIVE_REINTRODUCTION_CLUSTERS must remain empty.",
        { sourceFile: "src/lib/seo-indexability.ts" },
      ),
    );
  }

  for (const slug of deferredSlugs) {
    const robots = getRobotsForCommunity(slug);
    if (!robots || robots.index !== false || robots.follow !== true) {
      issues.push(
        issue(
          "deferred-robots",
          `Deferred community "${slug}" must emit noindex,follow.`,
          { slug, sourceFile: "src/lib/seo-indexability.ts" },
        ),
      );
    }
  }

  for (const path of PRIORITY_PATHS) {
    if (!isStaticPathIndexable(path)) {
      issues.push(
        issue("priority-not-indexable", `Priority path "${path}" must remain indexable.`, {
          sourceFile: "src/data/routes.ts",
        }),
      );
    }
    if (!registryPaths.includes(path)) {
      issues.push(
        issue("priority-not-in-sitemap", `Priority path "${path}" must remain in the sitemap.`, {
          sourceFile: "src/lib/seo-indexability.ts",
        }),
      );
    }
  }

  const entries = getSitemapUrlEntries();
  const undatedStatic = entries.filter(
    (entry) => !entry.path.startsWith("/neighborhoods/") && !entry.lastmod,
  );
  if (undatedStatic.length === 0) {
    issues.push(
      issue(
        "sitemap-lastmod-all-present",
        "Missing verified modification dates should omit lastmod; every static URL currently has one.",
        { sourceFile: "src/lib/sitemap-entries.ts" },
      ),
    );
  }

  const invalidLastmodExamples = ["2026-99-99", "2026-13-01", "2026-02-30", "2026-02-29", "2026-04-31"];
  for (const invalid of invalidLastmodExamples) {
    if (parseVerifiedLastmod(invalid) !== undefined) {
      issues.push(
        issue(
          "lastmod-impossible-date",
          `parseVerifiedLastmod("${invalid}") must reject impossible calendar dates.`,
          { sourceFile: "src/lib/sitemap-entries.ts" },
        ),
      );
    }
  }
  if (parseVerifiedLastmod("2026-08-27") !== "2026-08-27") {
    issues.push(
      issue(
        "lastmod-valid-date",
        'parseVerifiedLastmod("2026-08-27") must accept a real calendar date.',
        { sourceFile: "src/lib/sitemap-entries.ts" },
      ),
    );
  }

  const seoExtensionsSource = readProjectFile("src/data/community-seo-extensions.ts");
  if (seoExtensionsSource.includes('UPDATED = "2026-07-01"') || seoExtensionsSource.includes('"2026-07-01"')) {
    issues.push(
      issue(
        "blanket-lastmod-date",
        "Wave 1 lastSubstantialUpdate must not use the unverified blanket date 2026-07-01.",
        { sourceFile: "src/data/community-seo-extensions.ts" },
      ),
    );
  }

  for (const [slug, expected] of Object.entries(EXPECTED_NEIGHBORHOOD_LASTMOD)) {
    const path = `/neighborhoods/${slug}`;
    const actual = getLastmodForPath(path);
    if (actual !== expected) {
      issues.push(
        issue(
          "neighborhood-lastmod-mismatch",
          `Neighborhood "${slug}" lastmod is "${actual ?? "(omitted)"}" but git-verified date is "${expected}".`,
          { slug, sourceFile: "src/data/community-seo-extensions.ts" },
        ),
      );
    }
  }

  return issues;
}

export function countDeferredGuideSlugs(): number {
  return getLaunchCommunitySlugs().filter((slug) => !isCommunityIndexable(slug)).length;
}

export function getIndexableGuideCount(): number {
  return getIndexableCommunitySlugs().length;
}
