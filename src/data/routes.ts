/**
 * Central route registry — the single source of truth for which URLs are indexable,
 * what each owns, and what belongs in the sitemap. Driven by docs/seo-rebuild-plan.md §4/§6.
 *
 * `sitemap.ts` is generated entirely from `inSitemap` entries here — do not hardcode paths
 * in sitemap.ts. `scripts/check-routes.mjs` cross-checks this file against the App Router
 * file tree so the registry can't silently drift from the real routes.
 */

export type RouteCluster =
  | "core"
  | "process"
  | "military"
  | "la-jolla"
  | "agent-price"
  | "county"
  | "condo"
  | "del-mar"
  | "mission-valley"
  | "utility";

export type RouteEntry = {
  path: string;
  /** Primary keyword this URL is built to own (docs/seo-rebuild-plan.md §3–4). */
  primaryKeyword: string;
  cluster: RouteCluster;
  /** Whether the page ships `index, follow` (true) or `noindex, follow` (false). */
  indexable: boolean;
  /** Included in sitemap.xml. Should equal `indexable` for every entry except dynamic children. */
  inSitemap: boolean;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  /** Path this URL 301-redirects from, if any (see next.config.ts). */
  redirectsFrom?: string[];
  notes?: string;
};

export const routes: RouteEntry[] = [
  {
    path: "/",
    primaryKeyword: "san diego neighborhoods",
    cluster: "core",
    indexable: true,
    inSitemap: true,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/san-diego-neighborhood-map",
    primaryKeyword: "san diego neighborhood map",
    cluster: "core",
    indexable: true,
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
    notes:
      "Wave 2: indexed for interactive geographic exploration intent. Homepage keeps ownership of \"san diego neighborhoods\"; this page owns \"san diego neighborhood map\".",
  },
  {
    path: "/moving-to-san-diego",
    primaryKeyword: "moving to san diego",
    cluster: "process",
    indexable: true,
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.9,
    redirectsFrom: ["/relocating-to-san-diego"],
  },
  {
    path: "/living-in-san-diego",
    primaryKeyword: "living in san diego",
    cluster: "process",
    indexable: true,
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
    notes:
      "Wave 2: indexed after adding visible E-E-A-T signals (reviewed-by, published/updated dates, sources) and confirming intent split from /moving-to-san-diego (lifestyle/daily-life vs relocation process).",
  },
  {
    path: "/military-realtor-san-diego",
    primaryKeyword: "military realtor san diego",
    cluster: "military",
    indexable: true,
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
    redirectsFrom: ["/military-va-relocation-san-diego"],
  },
  {
    path: "/la-jolla-neighborhoods",
    primaryKeyword: "la jolla neighborhoods",
    cluster: "la-jolla",
    indexable: true,
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.9,
    redirectsFrom: ["/moving-to-la-jolla"],
  },
  {
    path: "/la-jolla-real-estate-agent",
    primaryKeyword: "la jolla real estate agent",
    cluster: "agent-price",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/affordable-neighborhoods-san-diego",
    primaryKeyword: "affordable neighborhoods san diego",
    cluster: "agent-price",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/san-diego-suburbs",
    primaryKeyword: "san diego suburbs",
    cluster: "county",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/cities-near-san-diego",
    primaryKeyword: "cities near san diego",
    cluster: "county",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/san-diego-condos-for-sale",
    primaryKeyword: "san diego condos for sale",
    cluster: "condo",
    indexable: true,
    inSitemap: true,
    changeFrequency: "weekly",
    priority: 0.9,
    notes:
      "Wave 2: indexed after adding a district comparison table and prominent links to Mission Valley, downtown, and La Jolla condo pages. Child district pages (downtown, La Jolla) remain deferred until upgraded.",
  },
  {
    path: "/mission-valley-condos-for-sale",
    primaryKeyword: "condos for sale in mission valley san diego",
    cluster: "mission-valley",
    indexable: true,
    inSitemap: true,
    changeFrequency: "weekly",
    priority: 0.8,
    notes:
      "Wave 2: transactional condo-inventory page, distinct intent from /neighborhoods/mission-valley (informational guide). Mission Valley is the strongest existing discovery page (GSC), so this captures adjacent commercial intent without cannibalizing the guide.",
  },
  {
    path: "/downtown-san-diego-condos-for-sale",
    primaryKeyword: "downtown san diego condos for sale",
    cluster: "condo",
    indexable: false,
    inSitemap: false,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/la-jolla-condos-for-sale",
    primaryKeyword: "la jolla condos for sale",
    cluster: "condo",
    indexable: false,
    inSitemap: false,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/del-mar-new-luxury-homes",
    primaryKeyword: "del mar new luxury homes",
    cluster: "del-mar",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/la-jolla-vs-del-mar",
    primaryKeyword: "la jolla vs del mar",
    cluster: "del-mar",
    indexable: false,
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0.5,
    notes: "Deliberately lightweight per weak_clusters:mv_defer decision. Demotion trigger: revisit in 6 months if it hasn't earned 5+ referring domains or any page-1 rankings.",
  },
  {
    path: "/about",
    primaryKeyword: "N/A — brand/E-E-A-T page",
    cluster: "utility",
    indexable: true,
    inSitemap: true,
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    path: "/contact",
    primaryKeyword: "N/A — conversion utility",
    cluster: "utility",
    indexable: false,
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0.6,
  },
  // --- noindex, follow: crawl parents and deferred inventory (docs/seo-rebuild-plan.md §12) ---
  {
    path: "/neighborhoods",
    primaryKeyword: "(deferred directory — see /)",
    cluster: "utility",
    indexable: true,
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.7,
    notes: "Wave 1: directory hub re-indexable as crawl parent for deferred guides.",
  },
  {
    path: "/search-homes",
    primaryKeyword: "(deferred utility)",
    cluster: "utility",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0,
  },
  {
    path: "/listings",
    primaryKeyword: "(deferred utility)",
    cluster: "utility",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0,
  },
  {
    path: "/listings/[idxId]/[listingId]",
    primaryKeyword: "(deferred utility)",
    cluster: "utility",
    indexable: false,
    inSitemap: false,
    changeFrequency: "monthly",
    priority: 0,
    notes: "Listing detail pages. Excluded per docs/seo-rebuild-plan.md §9 — thin, volatile MLS duplicates.",
  },
  {
    path: "/first-time-home-buyer-san-diego",
    primaryKeyword: "first time home buyer san diego",
    cluster: "utility",
    indexable: true,
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.7,
    notes: "Wave 1: restored to indexable editorial set.",
  },
  {
    path: "/privacy-policy",
    primaryKeyword: "(legal utility)",
    cluster: "utility",
    indexable: false,
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0,
  },
  {
    path: "/terms",
    primaryKeyword: "(legal utility)",
    cluster: "utility",
    indexable: false,
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0,
  },
  {
    path: "/accessibility",
    primaryKeyword: "(legal utility)",
    cluster: "utility",
    indexable: false,
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0,
  },
];

export function getIndexableRoutes(): RouteEntry[] {
  return routes.filter((r) => r.inSitemap);
}

export function getRouteByPath(path: string): RouteEntry | undefined {
  return routes.find((r) => r.path === path);
}

/** All 3 chain-free path redirects, sourced from route entries (kept next to next.config.ts logic). */
export function getPathRedirects(): { source: string; destination: string }[] {
  return routes.flatMap((r) =>
    (r.redirectsFrom ?? []).map((source) => ({ source, destination: r.path })),
  );
}

/** Primary indexable content clusters (excludes /contact and /about utility pages). */
export function getPrimaryClusterRoutes(): RouteEntry[] {
  return routes.filter(
    (r) => r.indexable && r.cluster !== "utility",
  );
}

/**
 * Static paths in `routes.ts` that ship `index, follow` and belong in the sitemap.
 * This is the authoritative static-page list — do not duplicate it elsewhere.
 * Community/neighborhood indexability is dynamic and lives in `src/lib/seo-indexability.ts`.
 */
export function getIndexableStaticPaths(): string[] {
  return routes.filter((r) => r.indexable).map((r) => r.path);
}

/** Static paths included in sitemap.xml. Should equal `getIndexableStaticPaths()`. */
export function getStaticSitemapPaths(): string[] {
  return routes.filter((r) => r.inSitemap).map((r) => r.path);
}

/** Static paths that remain live but must not be indexed or included in the sitemap. */
export function getNoindexStaticPaths(): string[] {
  return routes.filter((r) => !r.indexable).map((r) => r.path);
}

export function isStaticPathIndexable(path: string): boolean {
  return routes.some((r) => r.path === path && r.indexable);
}

export function isStaticPathNoindex(path: string): boolean {
  return routes.some((r) => r.path === path && !r.indexable);
}
