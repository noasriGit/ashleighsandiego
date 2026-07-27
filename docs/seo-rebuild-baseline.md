# Pre-Migration Baseline (Phase 0)

Captured before any Phase 1+ changes in this rebuild. See `docs/seo-rebuild-plan.md` for the full plan.

## Ranking baseline

Per `google_us_sandiego_list-overview_serps_2026-07-26_18-12-13.csv` (403 keywords, 6,656 SERP rows, pulled 2026-07-20/26): `sdcommunities.com` and `sandiegorelocationhomeguide.com` appear **0 times** in the entire export. Baseline organic visibility for the target keyword universe is zero.

## Submitted sitemap before rebuild (54 URLs)

Static (11): `/`, `/relocating-to-san-diego`, `/moving-to-la-jolla`, `/military-va-relocation-san-diego`, `/first-time-home-buyer-san-diego`, `/neighborhoods`, `/search-homes`, `/contact`, `/privacy-policy`, `/terms`, `/accessibility`.

Dynamic (43): `/neighborhoods/{slug}` for every slug returned by `getLaunchCommunitySlugs()` (see `src/data/communities.ts`).

## Indexability before rebuild

- `robots.txt`: `allow: /` for all user agents, no disallow rules.
- Only existing `noindex` in the codebase: `/listings?page=2+` (`src/app/listings/page.tsx`).
- No redirects other than the three host-canonicalization rules in `next.config.ts` (www → apex, legacy domain → apex, www.legacy → apex).

## GSC verification

A Google Search Console verification file was committed in `37951fe` (see repo root / `public`). This document assumes GSC property verification exists; actual GSC coverage/impressions data must be pulled from the live Search Console property by whoever has account access — it is not available inside this repository or the SERP export, so it could not be captured programmatically as part of this pass.

## Target post-migration state (for comparison at the Week 8/12/24 checkpoints in §20 of the plan)

- Sitemap: 17 URLs (home + 14 clusters + `/about` + `/contact`).
- `noindex, follow`: 49 URLs (43 guides, `/neighborhoods`, `/search-homes`, `/listings` + variants, `/first-time-home-buyer-san-diego`, 3 legal pages).
- Path redirects: 3 (`/relocating-to-san-diego`, `/moving-to-la-jolla`, `/military-va-relocation-san-diego`).

## Rank tracking

Track the 15 primary keywords (see `docs/seo-rebuild-plan.md` §3) plus their top 3 secondaries each in whatever external rank tracker is paired with the GSC property. This repository does not include a rank-tracking integration.
