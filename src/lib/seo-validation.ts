/**
 * SEO architecture and community content quality gates (Wave 1).
 * Used by scripts/verify-seo-architecture.ts.
 */

import {
  communities,
  getCommunityBySlug,
  getLaunchCommunitySlugs,
} from "@/data/communities";
import { getCommunityContent } from "@/data/community-content";
import { getPathRedirects, routes } from "@/data/routes";
import { siteConfig } from "@/data/site-config";
import {
  ACTIVE_REINTRODUCTION_CLUSTERS,
  getIndexableCommunitySlugs,
  getSitemapPaths,
  INDEXABLE_STATIC_PATHS,
  isCommunityIndexable,
  isStaticPathNoindex,
  NOINDEX_STATIC_PATHS,
  WAVE1_COMMUNITY_SLUGS,
} from "@/lib/seo-indexability";

export type SeoValidationIssue = {
  code: string;
  message: string;
  slug?: string;
  field?: string;
  sourceFile?: string;
};

const COMMUNITY_CONTENT_FILE = "src/data/community-content.ts";
const COMMUNITY_SEO_FILE = "src/data/community-seo-extensions.ts";
const COMMUNITIES_FILE = "src/data/communities.ts";
const INDEXABILITY_FILE = "src/lib/seo-indexability.ts";
const ROUTES_FILE = "src/data/routes.ts";

function issue(
  code: string,
  message: string,
  extra?: Partial<SeoValidationIssue>,
): SeoValidationIssue {
  return { code, message, ...extra };
}

function normalizeName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function slugifyLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function comparisonLabelMatchesCommunity(
  label: string,
  destinationSlug: string,
): boolean {
  const community = getCommunityBySlug(destinationSlug);
  if (!community) return false;

  const labelNorm = normalizeName(label);
  const nameNorm = normalizeName(community.name);
  if (labelNorm === nameNorm) return true;
  if (nameNorm.includes(labelNorm) || labelNorm.includes(nameNorm)) return true;

  const labelSlug = slugifyLabel(label);
  if (labelSlug === destinationSlug) return true;
  if (destinationSlug.startsWith(labelSlug) || labelSlug.startsWith(destinationSlug)) {
    return true;
  }

  const primaryName = community.name.split("/")[0]?.trim() ?? community.name;
  if (normalizeName(primaryName) === labelNorm) return true;
  if (slugifyLabel(primaryName) === destinationSlug) return true;

  const byName = communities.find((c) => normalizeName(c.name) === labelNorm);
  if (byName && byName.slug !== destinationSlug) return false;

  const labelTokens = labelNorm.split(" ").filter((t) => t.length > 2);
  const slugTokens = destinationSlug.split("-").filter((t) => t.length > 2);
  const overlap = labelTokens.filter((t) => slugTokens.includes(t));
  return overlap.length >= Math.min(2, Math.max(labelTokens.length, 1));
}

function hasMeaningfulStrings(values: string[] | undefined, min = 1): boolean {
  if (!values || values.length < min) return false;
  return values.every((v) => typeof v === "string" && v.trim().length >= 12);
}

export function validateComparisonCards(
  currentSlug: string,
  comparisons: { name: string; slug: string }[],
  sourceFile: string,
): SeoValidationIssue[] {
  const issues: SeoValidationIssue[] = [];

  for (const card of comparisons) {
    if (card.slug === currentSlug) {
      issues.push(
        issue(
          "comparison-self-link",
          `Comparison card "${card.name}" links to the current page slug "${currentSlug}".`,
          { slug: currentSlug, field: "nearbyComparisons", sourceFile },
        ),
      );
      continue;
    }

    const destination = getCommunityBySlug(card.slug);
    if (!destination) {
      issues.push(
        issue(
          "comparison-missing-slug",
          `Comparison card "${card.name}" points to unknown slug "${card.slug}".`,
          { slug: currentSlug, field: "nearbyComparisons.slug", sourceFile },
        ),
      );
      continue;
    }

    if (!destination.hasGuide) {
      issues.push(
        issue(
          "comparison-no-guide",
          `Comparison card "${card.name}" points to "${card.slug}" which has no published guide.`,
          { slug: currentSlug, field: "nearbyComparisons.slug", sourceFile },
        ),
      );
    }

    if (!comparisonLabelMatchesCommunity(card.name, card.slug)) {
      issues.push(
        issue(
          "comparison-label-mismatch",
          `Comparison label "${card.name}" does not match destination community "${destination.name}" (${card.slug}).`,
          { slug: currentSlug, field: "nearbyComparisons.name", sourceFile },
        ),
      );
    }
  }

  return issues;
}

export function validateIndexableCommunityContent(slug: string): SeoValidationIssue[] {
  const issues: SeoValidationIssue[] = [];
  const community = getCommunityBySlug(slug);
  const content = getCommunityContent(slug);
  const sourceFile = COMMUNITY_CONTENT_FILE;

  if (!community) {
    issues.push(
      issue("missing-registry", `Indexable slug "${slug}" missing from community registry.`, {
        slug,
        field: "communities",
        sourceFile: COMMUNITIES_FILE,
      }),
    );
    return issues;
  }

  if (!community.hasGuide) {
    issues.push(
      issue("missing-guide-flag", `Indexable slug "${slug}" has hasGuide=false.`, {
        slug,
        field: "hasGuide",
        sourceFile: COMMUNITIES_FILE,
      }),
    );
  }

  if (!content) {
    issues.push(
      issue("missing-content", `Indexable slug "${slug}" missing community content entry.`, {
        slug,
        field: "communityContent",
        sourceFile,
      }),
    );
    return issues;
  }

  if (content.slug !== slug) {
    issues.push(
      issue(
        "canonical-slug-mismatch",
        `Content slug "${content.slug}" does not match route slug "${slug}".`,
        { slug, field: "slug", sourceFile },
      ),
    );
  }

  if (!content.expertSummary?.trim() || content.expertSummary.trim().length < 40) {
    issues.push(
      issue("missing-expertSummary", `Missing or too-short expertSummary for "${slug}".`, {
        slug,
        field: "expertSummary",
        sourceFile: COMMUNITY_SEO_FILE,
      }),
    );
  }

  if (!hasMeaningfulStrings(content.buyerMisunderstandings, 1)) {
    issues.push(
      issue(
        "missing-buyerMisunderstandings",
        `Missing meaningful buyerMisunderstandings for "${slug}".`,
        { slug, field: "buyerMisunderstandings", sourceFile: COMMUNITY_SEO_FILE },
      ),
    );
  }

  if (!content.sources || content.sources.length < 1) {
    issues.push(
      issue("missing-sources", `Missing sources for "${slug}" (need at least one).`, {
        slug,
        field: "sources",
        sourceFile: COMMUNITY_SEO_FILE,
      }),
    );
  }

  if (!content.reviewedBy?.trim()) {
    issues.push(
      issue("missing-reviewedBy", `Missing reviewedBy for "${slug}".`, {
        slug,
        field: "reviewedBy",
        sourceFile: COMMUNITY_SEO_FILE,
      }),
    );
  }

  if (!content.publishedAt?.trim()) {
    issues.push(
      issue("missing-publishedAt", `Missing publishedAt for "${slug}".`, {
        slug,
        field: "publishedAt",
        sourceFile: COMMUNITY_SEO_FILE,
      }),
    );
  }

  if (!content.lastSubstantialUpdate?.trim()) {
    issues.push(
      issue(
        "missing-lastSubstantialUpdate",
        `Missing lastSubstantialUpdate for "${slug}".`,
        { slug, field: "lastSubstantialUpdate", sourceFile: COMMUNITY_SEO_FILE },
      ),
    );
  }

  if (community.parentSlug) {
    const parent = getCommunityBySlug(community.parentSlug);
    if (!parent) {
      issues.push(
        issue(
          "invalid-parent",
          `parentSlug "${community.parentSlug}" does not exist for "${slug}".`,
          { slug, field: "parentSlug", sourceFile: COMMUNITIES_FILE },
        ),
      );
    }
    if (community.parentSlug === slug) {
      issues.push(
        issue("self-parent", `Community "${slug}" is its own parent.`, {
          slug,
          field: "parentSlug",
          sourceFile: COMMUNITIES_FILE,
        }),
      );
    }
    if (!content.differsFromParent?.trim() || content.differsFromParent.trim().length < 40) {
      issues.push(
        issue(
          "missing-differsFromParent",
          `Indexable child "${slug}" requires differsFromParent (generic fallback does not count).`,
          { slug, field: "differsFromParent", sourceFile: COMMUNITY_SEO_FILE },
        ),
      );
    }
  }

  issues.push(...validateComparisonCards(slug, content.nearbyComparisons, sourceFile));

  if (content.subareas) {
    for (const sub of content.subareas) {
      if (!getCommunityBySlug(sub.slug)) {
        issues.push(
          issue(
            "subarea-missing-slug",
            `Subarea hub link "${sub.name}" points to unknown slug "${sub.slug}".`,
            { slug, field: "subareas.slug", sourceFile: COMMUNITY_SEO_FILE },
          ),
        );
      }
    }
  }

  return issues;
}

export function validateDeferredCommunity(slug: string): SeoValidationIssue[] {
  const issues: SeoValidationIssue[] = [];
  const community = getCommunityBySlug(slug);
  const content = getCommunityContent(slug);

  if (!community) {
    issues.push(
      issue("deferred-missing-registry", `Guide slug "${slug}" missing from registry.`, {
        slug,
        sourceFile: COMMUNITIES_FILE,
      }),
    );
    return issues;
  }

  if (community.parentSlug) {
    if (community.parentSlug === slug) {
      issues.push(
        issue("self-parent", `Community "${slug}" is its own parent.`, {
          slug,
          field: "parentSlug",
          sourceFile: COMMUNITIES_FILE,
        }),
      );
    } else if (!getCommunityBySlug(community.parentSlug)) {
      issues.push(
        issue(
          "invalid-parent",
          `parentSlug "${community.parentSlug}" does not exist for "${slug}".`,
          { slug, field: "parentSlug", sourceFile: COMMUNITIES_FILE },
        ),
      );
    }
  }

  if (content) {
    issues.push(
      ...validateComparisonCards(slug, content.nearbyComparisons, COMMUNITY_CONTENT_FILE),
    );
  }

  return issues;
}

function isKnownInternalPath(path: string): boolean {
  if (path === "/" || path === "") return true;
  if (routes.some((r) => r.path === path)) return true;

  const neighborhoodMatch = path.match(/^\/neighborhoods\/([a-z0-9-]+)$/);
  if (neighborhoodMatch) {
    const community = getCommunityBySlug(neighborhoodMatch[1]!);
    return Boolean(community?.hasGuide);
  }

  if (path.startsWith("/listings/")) return true;
  return false;
}

export function validateSeoArchitecture(): SeoValidationIssue[] {
  const issues: SeoValidationIssue[] = [];

  for (const slug of WAVE1_COMMUNITY_SLUGS) {
    if (!getCommunityBySlug(slug)) {
      issues.push(
        issue("wave1-missing", `Wave 1 slug "${slug}" is not in the community registry.`, {
          slug,
          sourceFile: INDEXABILITY_FILE,
        }),
      );
    }
  }

  for (const slug of ACTIVE_REINTRODUCTION_CLUSTERS) {
    if (!getCommunityBySlug(slug)) {
      issues.push(
        issue(
          "reintro-missing",
          `Active reintroduction slug "${slug}" is not in the community registry.`,
          { slug, sourceFile: INDEXABILITY_FILE },
        ),
      );
    }
    if ((WAVE1_COMMUNITY_SLUGS as readonly string[]).includes(slug)) {
      issues.push(
        issue(
          "reintro-wave1-overlap",
          `Slug "${slug}" is in both WAVE1_COMMUNITY_SLUGS and ACTIVE_REINTRODUCTION_CLUSTERS.`,
          { slug, sourceFile: INDEXABILITY_FILE },
        ),
      );
    }
  }

  const indexableSlugs = getIndexableCommunitySlugs();
  for (const slug of indexableSlugs) {
    issues.push(...validateIndexableCommunityContent(slug));
  }

  for (const slug of getLaunchCommunitySlugs()) {
    if (isCommunityIndexable(slug)) continue;
    issues.push(...validateDeferredCommunity(slug));
  }

  for (const community of communities) {
    if (!community.parentSlug) continue;
    if (community.parentSlug === community.slug) {
      issues.push(
        issue("self-parent", `Community "${community.slug}" is its own parent.`, {
          slug: community.slug,
          field: "parentSlug",
          sourceFile: COMMUNITIES_FILE,
        }),
      );
    } else if (!getCommunityBySlug(community.parentSlug)) {
      issues.push(
        issue(
          "invalid-parent",
          `parentSlug "${community.parentSlug}" does not exist for "${community.slug}".`,
          { slug: community.slug, field: "parentSlug", sourceFile: COMMUNITIES_FILE },
        ),
      );
    }
  }

  // --- Sitemap registry ---
  const sitemapPaths = getSitemapPaths();
  const unique = new Set<string>();
  for (const path of sitemapPaths) {
    if (unique.has(path)) {
      issues.push(
        issue("sitemap-duplicate", `Duplicate sitemap path "${path || "/"}".`, {
          sourceFile: INDEXABILITY_FILE,
        }),
      );
    }
    unique.add(path);

    if (path.startsWith("/neighborhoods/")) {
      const slug = path.replace("/neighborhoods/", "");
      if (!isCommunityIndexable(slug)) {
        issues.push(
          issue(
            "sitemap-noindex-community",
            `Sitemap includes noindex community "${slug}".`,
            { slug, sourceFile: INDEXABILITY_FILE },
          ),
        );
      }
    } else if (!(INDEXABLE_STATIC_PATHS as readonly string[]).includes(path)) {
      issues.push(
        issue(
          "sitemap-unapproved-static",
          `Sitemap includes unapproved static path "${path || "/"}".`,
          { sourceFile: INDEXABILITY_FILE },
        ),
      );
    }

    if (isStaticPathNoindex(path)) {
      issues.push(
        issue("sitemap-utility", `Sitemap includes utility/noindex path "${path}".`, {
          sourceFile: INDEXABILITY_FILE,
        }),
      );
    }

    if (path.includes("?") || path.includes("=") || path.includes("[")) {
      issues.push(
        issue("sitemap-parameterized", `Sitemap includes parameterized path "${path}".`, {
          sourceFile: INDEXABILITY_FILE,
        }),
      );
    }
  }

  for (const path of INDEXABLE_STATIC_PATHS) {
    if (!unique.has(path)) {
      issues.push(
        issue(
          "sitemap-missing-static",
          `Approved indexable static path "${path || "/"}" missing from sitemap.`,
          { sourceFile: INDEXABILITY_FILE },
        ),
      );
    }
  }

  for (const slug of indexableSlugs) {
    const path = `/neighborhoods/${slug}`;
    if (!unique.has(path)) {
      issues.push(
        issue(
          "sitemap-missing-community",
          `Indexable community "${slug}" missing from sitemap.`,
          { slug, sourceFile: INDEXABILITY_FILE },
        ),
      );
    }
  }

  const expectedCount = INDEXABLE_STATIC_PATHS.length + indexableSlugs.length;
  if (sitemapPaths.length !== expectedCount) {
    issues.push(
      issue(
        "sitemap-count-mismatch",
        `Sitemap count ${sitemapPaths.length} !== registry count ${expectedCount}.`,
        { sourceFile: INDEXABILITY_FILE },
      ),
    );
  }

  // routes.ts must agree with Wave 1 static set
  for (const route of routes) {
    const isWave1Static =
      route.path === "/"
        ? (INDEXABLE_STATIC_PATHS as readonly string[]).includes("")
        : (INDEXABLE_STATIC_PATHS as readonly string[]).includes(route.path);

    if (isWave1Static) {
      if (!route.indexable || !route.inSitemap) {
        issues.push(
          issue(
            "routes-wave1-static-mismatch",
            `Wave 1 static "${route.path}" must be indexable+inSitemap in routes.ts.`,
            { sourceFile: ROUTES_FILE },
          ),
        );
      }
    } else if (route.path.startsWith("/listings")) {
      if (route.indexable || route.inSitemap) {
        issues.push(
          issue(
            "routes-listings-indexable",
            `Listings route "${route.path}" must remain noindex/out of sitemap.`,
            { sourceFile: ROUTES_FILE },
          ),
        );
      }
    } else if (route.indexable || route.inSitemap) {
      issues.push(
        issue(
          "routes-non-wave1-indexable",
          `Non–Wave 1 route "${route.path}" is still indexable/inSitemap.`,
          { sourceFile: ROUTES_FILE },
        ),
      );
    }
  }

  for (const path of NOINDEX_STATIC_PATHS) {
    if (unique.has(path)) {
      issues.push(
        issue("sitemap-noindex-static", `Noindex static path "${path}" appears in sitemap.`, {
          sourceFile: INDEXABILITY_FILE,
        }),
      );
    }
  }

  // Redirect sources must not appear in sitemap
  const redirectSources = new Set(getPathRedirects().map((r) => r.source));
  for (const path of sitemapPaths) {
    const normalized = path || "/";
    if (redirectSources.has(normalized)) {
      issues.push(
        issue(
          "sitemap-redirect-source",
          `Sitemap includes redirect source "${normalized}".`,
          { sourceFile: INDEXABILITY_FILE },
        ),
      );
    }
  }

  // Redirect chains / loops
  const redirectMap = new Map(getPathRedirects().map((r) => [r.source, r.destination]));
  for (const [source, dest] of redirectMap) {
    const next = redirectMap.get(dest);
    if (next) {
      issues.push(
        issue(
          "redirect-chain",
          `Redirect chain detected: ${source} → ${dest} → ${next}.`,
          { sourceFile: ROUTES_FILE },
        ),
      );
    }
    if (dest === source) {
      issues.push(
        issue("redirect-loop", `Redirect loop at "${source}".`, {
          sourceFile: ROUTES_FILE,
        }),
      );
    }
  }

  // Keyword ownership among indexable routes
  const keywordOwners = new Map<string, string>();
  for (const route of routes) {
    if (!route.indexable) continue;
    if (!route.primaryKeyword || route.primaryKeyword.startsWith("(") || route.primaryKeyword.startsWith("N/A")) {
      continue;
    }
    const key = route.primaryKeyword.toLowerCase();
    const existing = keywordOwners.get(key);
    if (existing && existing !== route.path) {
      issues.push(
        issue(
          "keyword-collision",
          `Primary keyword "${route.primaryKeyword}" claimed by both "${existing}" and "${route.path}".`,
          { sourceFile: ROUTES_FILE },
        ),
      );
    } else {
      keywordOwners.set(key, route.path);
    }

    if (!route.primaryKeyword.trim()) {
      issues.push(
        issue("missing-primary-keyword", `Indexable route "${route.path}" missing primaryKeyword.`, {
          sourceFile: ROUTES_FILE,
        }),
      );
    }
  }

  // Internal routes — nav + footer
  for (const item of siteConfig.nav) {
    if (!isKnownInternalPath(item.href)) {
      issues.push(
        issue("nav-broken", `Navigation link "${item.label}" points to unknown route "${item.href}".`, {
          sourceFile: "src/data/site-config.ts",
        }),
      );
    }
  }

  const footerPaths = [
    "/",
    "/san-diego-neighborhood-map",
    "/la-jolla-neighborhoods",
    "/affordable-neighborhoods-san-diego",
    "/san-diego-suburbs",
    "/cities-near-san-diego",
    "/moving-to-san-diego",
    "/living-in-san-diego",
    "/military-realtor-san-diego",
    "/la-jolla-real-estate-agent",
    "/san-diego-condos-for-sale",
    "/downtown-san-diego-condos-for-sale",
    "/la-jolla-condos-for-sale",
    "/del-mar-new-luxury-homes",
    "/la-jolla-vs-del-mar",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/accessibility",
  ];
  for (const path of footerPaths) {
    if (!isKnownInternalPath(path)) {
      issues.push(
        issue("footer-broken", `Footer link points to unknown route "${path}".`, {
          sourceFile: "src/components/layout/Footer.tsx",
        }),
      );
    }
  }

  return issues;
}

export function getExpectedSitemapUrls(baseUrl = siteConfig.url): string[] {
  return getSitemapPaths().map((path) => `${baseUrl}${path}`);
}
