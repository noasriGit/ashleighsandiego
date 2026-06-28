# IDX Broker Integration Guide

This document covers the IDX Broker integration for the San Diego Relocation Home Guide
site. It is the operational companion to the code in `src/components/idx/`,
`src/data/idx-links.ts`, and `src/lib/idx-api.ts`.

The integration is **partner-compliant**: no long-term iframes. Content pages link to a
branded IDX subdomain (saved searches); `/search-homes` embeds the IDX omnibar widget; and
(Phase 2) selected pages pull featured listings via the IDX API server-side.

---

## 1. Prerequisites Checklist (IDX Control Panel)

Complete these in the IDX Broker Control Panel **before** flipping `NEXT_PUBLIC_IDX_ENABLED=true`
in production. None of these require code changes.

### MLS / feed

- [x] MLS feed approved (SDMLS — confirmed 2026-06-24)
- [ ] MLS feed actively syncing in IDX (verify: `npm run idx:verify` shows California listings, not Florida demo data)
- [ ] Confirm which MLS board(s) the feed covers (affects display rules in Phase 2)

### Branding / compliance (must match `src/data/site-config.ts`)

- [ ] Agent profile: name, DRE #, email, phone, photo
- [ ] Brokerage: "Berkshire Hathaway HomeServices California Properties", license #, office address
- [ ] Equal Housing Opportunity logo enabled site-wide
- [ ] BHHS franchise disclaimer configured (copy from `siteConfig.franchiseDisclaimer`,
      replacing `{year}` with the current year)

### Lead settings

- [ ] Registration gate configured (recommended: prompt after 3–5 listing views, confirm with client)
- [ ] Lead notification email routed to the agent
- [ ] (Phase 3) CRM routing, if/when the client provides a CRM

### Saved searches

- [ ] One saved search created per launch community (13 total, see section 3)
- [ ] One general "all San Diego" saved search (`_general`)
- [ ] One military-focused saved search (`_military`) covering base-adjacent areas
- [ ] Run `npm run idx:sync-searches` to populate `data/idx-search-overrides.json` (do not hand-edit `src/data/idx-links.ts`)

### Subdomain + wrapper

- [x] IDX subdomain: `sdcommunities.idxbroker.com` (no custom CNAME required)
- [ ] **Includes wrapper** configured (Header/Footer URLs — see section 4)
- [ ] Hosted assets deployed on sdcommunities.com (`idx-header.html`, `idx-footer.html`, CSS files)
- [ ] Results/detail CSS deployed and linked from `idx-footer.html` — see section 4
      (panel paste into Categories → Results / Designs → Details is optional backup)

### Widget

- [ ] Omnibar widget enabled (Control Panel -> Widgets -> Omnibar)
- [ ] Copy the widget embed script URL into `NEXT_PUBLIC_IDX_WIDGET_URL`

### API (Phase 2 only)

- [ ] Partner/client API key issued -> set `IDX_API_KEY` (server-only, never `NEXT_PUBLIC_`)

---

## 2. Environment Variables

See `.env.example` for the full list. IDX-specific:

| Variable | Phase | Exposure | Purpose |
|----------|-------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | 1 | public | Canonical site URL, e.g. `https://sdcommunities.com`. Used for metadata, sitemap, JSON-LD, and canonical tags. |
| `NEXT_PUBLIC_IDX_ENABLED` | 1 | public | Master switch. `"true"` activates live IDX; anything else shows the CustomSearchForm fallback. |
| `NEXT_PUBLIC_IDX_BASE_URL` | 1 | public | IDX search host root, e.g. `https://sdcommunities.idxbroker.com`. Used to build saved-search links. |
| `NEXT_PUBLIC_IDX_WIDGET_URL` | 1 | public | Omnibar embed script URL. Required only for the `/search-homes` widget. |
| `IDX_API_KEY` | 3 | **server-only** | IDX API access key for community featured listings + live saved-search counts. Never prefix with `NEXT_PUBLIC_`. |
| `IDX_API_ENABLED` | 3 | **server-only** | Optional kill switch for API calls. Defaults to on when `IDX_API_KEY` is set; `"false"` disables API-driven listings/counts only. |

`NEXT_PUBLIC_IDX_EMBED_URL` (the old iframe URL) is **removed**. Delete it from any deployment env.

---

## 3. Saved Search Link Map

Each saved search created in the Control Panel is mapped to a community slug. The source of
truth is `data/idx-search-overrides.json` (populated by `npm run idx:sync-searches`) merged
with auto-generated zip config in `src/data/idx-search-config.ts`. `src/data/idx-links.ts`
only resolves the browse URL from that config, do not hand-edit saved-search URLs there.
Keys match the `slug` values in `src/data/communities.ts`.

Saved-search and listing detail URLs returned by the API or Control Panel are automatically
rewritten to `NEXT_PUBLIC_IDX_BASE_URL` (the branded subdomain) via `normalizeIdxUrl` in
`src/lib/idx-search-url.ts`, so users never land on the raw `*.idxbroker.com` host.

| Key (slug) | Community / page | Used by |
|------------|------------------|---------|
| `la-jolla` | La Jolla | `/neighborhoods/la-jolla`, `/moving-to-la-jolla` |
| `pacific-beach` | Pacific Beach | `/neighborhoods/pacific-beach` |
| `university-city` | University City / UTC | `/neighborhoods/university-city` |
| `clairemont` | Clairemont | `/neighborhoods/clairemont` |
| `mission-valley` | Mission Valley | `/neighborhoods/mission-valley` |
| `del-mar` | Del Mar | `/neighborhoods/del-mar` |
| `carmel-valley` | Carmel Valley | `/neighborhoods/carmel-valley` |
| `point-loma` | Point Loma | `/neighborhoods/point-loma` |
| `sorrento-valley` | Sorrento Valley / Sorrento Mesa | `/neighborhoods/sorrento-valley` |
| `bay-park` | Bay Park | `/neighborhoods/bay-park` |
| `ocean-beach` | Ocean Beach | `/neighborhoods/ocean-beach` |
| `hillcrest` | Hillcrest | `/neighborhoods/hillcrest` |
| `north-park` | North Park | `/neighborhoods/north-park` |
| `_general` | (fallback) | Homepage, `/relocating-to-san-diego`, any page without a community |
| `_military` | (fallback) | `/military-va-relocation-san-diego` |

If a key has no saved-search URL yet, `getIdxLink()` falls back to `_general`, and if that is
also empty it falls back to `NEXT_PUBLIC_IDX_BASE_URL`. So the site degrades gracefully while
saved searches are still being built out.

---

## 4. Wrapper Strategy & Subdomain Setup

IDX search runs at **`https://sdcommunities.idxbroker.com`** (IDX-provided subdomain on
`*.idxbroker.com`). No custom CNAME on `sdcommunities.com` is required for launch.

Optional later: a fully branded host like `search.sdcommunities.com` via CNAME →
`subdomains.idxbroker.com` and **Account → `/mgmt/account`** in Middleware. See
[Setting Up a Custom Domain](https://support.idxbroker.com/hc/en-us/articles/34490030166555-Setting-Up-a-Custom-Domain).

### Wrapper requirements

- All URLs **absolute** (`https://sdcommunities.com/...`), never relative
- Plain `<a>` / `<img>` only, no framework tags
- Includes header (logo + nav), footer (disclaimers, Equal Housing, Privacy/Terms links)
- Re-upload or redeploy whenever `siteConfig.nav`, agent/brokerage details, or the franchise
  disclaimer change — hosted HTML is a static copy and does not track the main site automatically

### Root cause (verified 2026-06-28): the wrapper had no `<head>`

Inspecting the **live wrapped page** (`sdcommunities.idxbroker.com/idx/results/listings?...`)
revealed the real defect: the served document had **no `<!DOCTYPE html>`, `<html>`, `<head>`,
or `<body>`** and **zero IDX default stylesheets** — only our four `<link>`s. IDX was simply
concatenating `[idx-header.html] + [IDX content] + [idx-footer.html]`, and our files were bare
fragments.

Per IDX's own docs a Static/Includes wrapper header section is **"`<html>`, `<head>`, and some
of the `<body>`"** and **"IDX Broker automatically injects its stylesheets into this
structure."** With no `<head>`, IDX had nowhere to inject its **base results/detail CSS**, so
every IDX page lost its grid/card layout (raw stacked listings) — even though our wrapper chrome
and color overrides loaded fine. Disabling the wrapper appeared to "fix" it only because IDX
then served its own complete document (with its base CSS).

(Earlier "IDX strips `<link>`/`<script>`" theories were wrong — nothing is stripped. The
missing document scaffolding was the actual cause.)

**Current design (v13):** the wrapper is a complete HTML document split in two.

1. `idx-header.html` → `<!DOCTYPE html><html><head>` (meta, `<title>`, fonts, `idx-wrapper.css`)
   `</head><body>` + `<header>`. **IDX injects its base CSS into this `<head>`**, which supplies
   the results grid/card layout.
2. `idx-footer.html` → `idx-results.css` + `idx-detail.css` `<link>` (end of body, so our brand
   colors/spacing override IDX's base CSS) + `<footer>` + `</body></html>`.

Bump `?v=` after editing any CSS file. Pasting CSS into the Custom CSS panels is optional backup.

### Middleware upload checklist (Designs panel)

Log in at [middleware.idxbroker.com/mgmt](https://middleware.idxbroker.com/mgmt) and complete
these steps whenever `public/idx-header.html`, `public/idx-footer.html`, or the CSS files in
`public/` change in the repo.

**Deploy sdcommunities.com first** so hosted URLs resolve.

#### Step 1 — Includes wrapper (recommended)

Hosted fragments:

The header loads fonts + `idx-wrapper.css` via `<link>`. The footer loads
`idx-results.css` + `idx-detail.css` via `<link>` (placed last so they apply after IDX's
default stylesheets). All four files are hosted on `sdcommunities.com`.

| URL | Repo file |
|-----|-----------|
| `https://sdcommunities.com/idx-header.html` | [public/idx-header.html](../public/idx-header.html) |
| `https://sdcommunities.com/idx-footer.html` | [public/idx-footer.html](../public/idx-footer.html) |

1. Go to **Design → Website → Wrappers** (some accounts: **Designs → Wrapper**).
2. Create or edit the SD Communities wrapper.
3. Set type to **Includes** (cURL / URL — **not** Static).
4. **Header URL:** `https://sdcommunities.com/idx-header.html`
5. **Footer URL:** `https://sdcommunities.com/idx-footer.html`
6. Save and set this wrapper as **Primary** for `sdcommunities.idxbroker.com`.
7. **Clear Static wrapper fields** if you previously pasted HTML there (leave blank or delete old wrapper).

The wrapper `<link>` tags load the CSS directly — no Custom CSS panel paste required (Steps 2/3
are optional backup).

Verify hosted files in a browser before saving in IDX:

- `https://sdcommunities.com/idx-header.html` (fonts + `idx-wrapper.css` `<link>`s)
- `https://sdcommunities.com/idx-footer.html` (`idx-results.css` + `idx-detail.css` `<link>`s)
- `https://sdcommunities.com/idx-wrapper.css` (no `@import`)
- `https://sdcommunities.com/idx-results.css`
- `https://sdcommunities.com/idx-detail.css`

#### Step 1b — Static wrapper

A Static wrapper with `<link>` tags is fine (IDX does not strip them). Prefer **Includes** so
the hosted files stay the single source of truth. See [`docs/idx-wrapper.html`](idx-wrapper.html).

#### Step 2 — Results custom CSS (OPTIONAL backup)

Results CSS already loads from the footer `<link>`. Only do this if you want a panel-level
backup or override:

1. Go to **Design → Website → Custom CSS → Categories → Results**
   (some accounts: **Designs → Results → Custom CSS** — same field).
2. Select **all** existing CSS in the Results category, delete it, and paste the **entire**
   contents of [`public/idx-results.css`](../public/idx-results.css) (full swap, not an append).
3. Save Changes.

**If results still look unstyled:**

- Confirm `idx-footer.html` (deployed) contains the `idx-results.css` `<link>` and the file
  returns HTTP 200; **bump `?v=`** if you edited the CSS but the CDN serves an old copy.
- Clear the IDX **wrapper cache** (Design → Wrappers) — Includes are cached ~3 hours.
- Hard refresh in incognito; confirm `#IDX-main`/`.idx-results` exists and the cabernet/pearl
  rules appear in DevTools computed styles.

**If wrapper header/footer is unstyled:**

- Confirm `idx-wrapper.css` returns HTTP 200 and the header `<link>` points to it (bump `?v=`).
- Confirm Includes Header URL points to `idx-header.html`, not an old Static paste.

#### Step 3 — Details custom CSS (OPTIONAL backup)

Detail CSS already loads from the footer `<link>`. To add a panel backup:

1. Go to **Designs → Details** → active template **Standard** → **Custom CSS** tab.
2. Paste the **entire** contents of [`public/idx-detail.css`](../public/idx-detail.css) (full swap).
3. Save.

#### Step 4 — Optional results CTA band

If your Middleware version exposes **Results → Custom HTML** (or header content above
results), paste this block above the listing grid:

```html
<div class="IDX-sd-guide-cta">
  Planning a move to San Diego?
  <a href="https://sdcommunities.com/neighborhoods">Explore neighborhood guides</a>
  or
  <a href="https://sdcommunities.com/contact">book a free buyer strategy call</a>.
</div>
```

Styles for `.IDX-sd-guide-cta` are already in `docs/idx-results.css`.

#### Step 5 — Hard refresh and verify

1. Open an incognito window (bypasses cache).
2. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) on each test URL in the Visual QA table below.
3. If styles do not appear, confirm the wrapper is Primary and Custom CSS was saved as a
   full replacement (not appended to old Bootstrap overrides).

### Post-upload DOM audit

After upload, open Chrome DevTools on each page type and confirm these nodes exist. If a
selector is missing, note the actual class/id and patch the CSS file before re-uploading.

| Page | URL | Root wrapper | Key selectors to verify |
|------|-----|--------------|-------------------------|
| Zip results | `/idx/results/listings?zipcode[]=92037&a_status[]=active` | `.idx-results` / `#IDX-main` | `.idx-listing-card`, `.idx-listing-card__image`, `#IDX-map`, `.idx-results__listings` |
| Saved search | `/i/la-jolla` (or saved-link URL from Control Panel) | `.IDX-wrapper-standard` | Same as results; saved-link pages may omit refine panel |
| Listing detail | Click any listing from results | `.IDX-wrapper-standard` | `#IDX-detailsWrapper`, `#IDX-detailsPrice`, `#IDX-detailsContact`, `#IDX-mainPhotos` |

**Common fixes:**

- **ALL idx pages unstyled (raw Bootstrap)** → the deployed `idx-footer.html` is missing the
  `idx-results.css`/`idx-detail.css` `<link>`s, the CSS files 404, or the IDX wrapper cache is
  stale. Redeploy, confirm the files return 200, **bump `?v=`**, and clear the wrapper cache.
- Edited CSS not showing → CDN is serving the cached `?v=` URL; bump the version in the wrapper.
- Wrapper header/footer missing → wrapper not set as Primary, or Includes URLs wrong / not deployed.
- Wrapper header/footer **unstyled** → `idx-wrapper.css` 404s or the header `<link>` is wrong;
  redeploy and confirm the file returns 200.
- Styles partially applied → results/detail CSS loaded before IDX defaults; confirm the
  `<link>`s are in `idx-footer.html` (bottom of body), not the header.
- Fonts not loading → confirm the Google Fonts `<link>` in `idx-header.html` returns 200.

### Optional custom CNAME (not required for launch)

If you later want `search.sdcommunities.com` instead of `sdcommunities.idxbroker.com`:

1. **DNS:** CNAME `search` → `subdomains.idxbroker.com`
2. **IDX:** [middleware.idxbroker.com/mgmt/account](https://middleware.idxbroker.com/mgmt/account) → Use Custom Domain = Yes → enter `search.sdcommunities.com`
3. Update `NEXT_PUBLIC_IDX_BASE_URL` and re-run `npm run idx:sync-searches`

---

## 5. Brand Colors (for IDX Custom CSS + wrapper)

From `src/app/globals.css` (BHHS Traditional theme):

| Token | Hex | Use |
|-------|-----|-----|
| Cabernet (primary) | `#670038` | Buttons, links, headings |
| Espresso (text) | `#2a2223` | Body text |
| Earth | `#72595e` | Secondary accents |
| Dove | `#aa979c` | Borders |
| Pearl (bg) | `#f5f1f2` | Page background |
| Rose | `#ece3e5` | Cards / soft fills |
| White | `#ffffff` | Surfaces |

---

## 6. Lead Funnel Map

| Page | Browse mechanism | High-intent capture |
|------|------------------|---------------------|
| Homepage | Featured listings (Phase 2) + link CTA | Strategy call CTA |
| `/search-homes` | IDX omnibar widget (inline) | CustomSearchForm below widget |
| `/neighborhoods/[slug]` | Community saved-search link | CustomSearchForm |
| `/relocating-to-san-diego` | General saved-search link | LeadMagnet + CustomSearchForm |
| `/moving-to-la-jolla` | La Jolla saved-search link | Strategy call CTA |
| `/military-va-relocation-san-diego` | Military saved-search link | LeadMagnet + CustomSearchForm |

- **IDX owns**: saved searches, listing alerts, favorites, registration gating.
- **Site owns**: planning, neighborhood fit, strategy calls, custom search form, email capture.

---

## 7. API-First Listings, Live Counts & On-Site Detail

### On-site vs. off-site boundary

| Feature | Where it lives | Notes |
|---------|---------------|-------|
| Featured listing grids | Main domain | `/clients/featured` API |
| **On-site listing detail** | Main domain `/listings/[idxId]/[listingId]` | Full payload: gallery, remarks, map, specs |
| Saved-link results grids (up to 250/community) | Main domain | `/clients/savedlinks/{id}/results` API |
| Non-featured listing detail | Branded subdomain (wrapper-styled) | No single-listing MLS lookup in API |
| Full MLS browse (>250 / unfiltered) | Branded subdomain | API constraint, not a compliance rule |
| Registration / favorites / alerts | IDX-hosted | IDX platform requirement |

**Compliance basis:** `/clients/featured` is explicitly designed to power on-site listing
display. The prohibition is on *querying arbitrary MLS listings by ID*, not on displaying
what the API returns for featured/saved-link results.

### `isOnSite` flag

Every `IdxListing` carries `isOnSite: boolean`. `ListingCard` uses it for link routing:
- `true` → Next.js `<Link href="/listings/[idxId]/[listingId]">` (stays on main domain)
- `false` → `<a href={detailUrl}>` (branded subdomain, `normalizeIdxUrl` already applied)

### Functions

| Function | Endpoint | Cache TTL | Use |
|----------|----------|-----------|-----|
| `getAllFeaturedListings()` | `GET /clients/featured` (paginated) | 15 min | Paginate all featured; used by detail page lookup |
| `getFeaturedListing(idxId, listingId)` | (wraps above) | 15 min | Single featured listing for detail page |
| `getFeaturedListingsPage(offset, limit, filters)` | `GET /clients/featured?offset=&limit=` | 15 min | Paginated browse at `/listings` |
| `getCommunityListings(slug, limit)` | savedlinks results → featured filter | 15 min | Community grids (tries saved link first) |
| `getSavedLinkResults(savedLinkId, limit)` | `GET /clients/savedlinks/{id}/results` | 15 min | Up to 250 real MLS listings per saved search |
| `getSavedLinkCount(savedLinkId)` | `GET /clients/savedlinks/{id}/count` | 1 hr | Per-link live count (preferred over bulk endpoint) |
| `getSavedSearchCount(id)` | (wraps `getSavedLinkCount`) | 1 hr | Community page stat band count |
| `getAllSavedSearchCounts()` | `GET /clients/savedlinkstotalpropertycount` | 1 hr | Bulk counts, returns 400 on demo/no-saved-search accounts |
| `getAvailableCities()` | `GET /clients/cities` | 24 hr | One-time setup: city IDs for config |
| `getSavedLinksList()` | `GET /clients/savedlinks` | 24 hr | One-time setup: saved-search IDs/URLs |

### `getCommunityListings` priority

1. `getSavedLinkResults(config.savedSearchId)`, real community MLS listings (up to 250,
   `isOnSite=false`) when a saved search is configured. `CommunityListings` title: "Homes in {community}".
2. `GET /clients/featured?zip[]=&city[]=`, agent's featured set filtered to community
   (`isOnSite=true`). Title: "Featured Listings in {community}".
3. Empty `[]`, **no fallthrough to the unfiltered featured set.** A La Jolla page will
   never show demo Florida listings.

### On-site listing detail: `/listings/[idxId]/[listingId]`

- Data: `getAllFeaturedListings()` paginates through the featured set (4–5 calls at 50/page,
  independently cached at 15-min ISR), then filters client-side by composite key.
- When not found: soft 404 with a "View on our search portal" CTA to `fullDetailsURL`.
- Metadata: `<title>` = price + address; OG image = first listing photo; RealEstateListing
  structured data.

### Paginated browse: `/listings`

- `?community=la-jolla`, filter by community zip/city codes.
- `?page=N`, 50 listings per page. Pages > 1 excluded from search index.
- Prominent "Search all MLS listings" upsell to `/search-homes` (full MLS browse).

### `savedlinkstotalpropertycount` 400

This bulk endpoint returns HTTP 400 on demo accounts and accounts with no active saved
searches. `getSavedSearchCount()` now routes through `getSavedLinkCount()` (per-link
endpoint) instead. After real saved searches are created and `npm run idx:sync-searches`
is run, both endpoints should work.

### Config: `src/data/idx-search-config.ts`

Each community slug maps to `cityIds`, `zipCodes`, `savedSearchId`, and `savedSearchUrl`.
Populate `cityIds` once via `getAvailableCities()` and `savedSearchId` via
`getSavedLinksList()` (both are static values that change rarely). `savedSearchId` now
also unlocks `getSavedLinkResults()` for community-specific MLS grids (up to 250 listings).

Rate limits: partner client accounts allow ~1,500 req/hr. With 15-min/1-hr caching and ~20
listing surfaces, real usage stays well under 100 req/hr.

---

## 8. Testing Checklist

See **section 10** for IDX subdomain visual QA (wrapper, CSS, mobile/desktop) after Middleware upload.

- [ ] Each of the 13 community links opens the correct pre-filtered results on the subdomain
- [ ] `/search-homes` omnibar renders and submits to the subdomain
- [ ] Wrapper header/footer render with working absolute links + disclaimers
- [ ] Mobile (iOS Safari, Chrome Android): no horizontal scroll, tap targets >= 44px
- [ ] `CustomSearchForm` submits a lead (`leadType: "custom-search"`)
- [ ] With `NEXT_PUBLIC_IDX_ENABLED=false`: placeholder + form on all pages, no JS errors
- [ ] Invalid `IDX_API_KEY`: pages render without listing cards, no 500s
- [ ] Lighthouse on `/neighborhoods/la-jolla`: no iframe, correct canonical, no mixed content
- [ ] **On-site detail (Phase 1):** Click a featured card → `/listings/[idxId]/[listingId]` stays on main domain; full gallery, specs, remarks, map render; BHHS disclaimer present
- [ ] **Soft 404:** `/listings/unknown/999` shows "not found" page with subdomain CTA, not a hard error
- [ ] **Geo guard:** No Florida demo listings appear on `/neighborhoods/la-jolla` when the filtered featured set is empty
- [ ] **Card links:** Featured card uses `<a href="/listings/...">` (internal); savedlinks card uses external `href` pointing to branded subdomain
- [ ] **savedlinks results (Phase 2):** When `savedSearchId` is populated and saved search returns data, community page title reads "Homes in {community}", not "Featured Listings"
- [ ] **Paginated browse:** `/listings` renders a grid; `/listings?community=la-jolla` filters correctly; `/listings?page=2` paginates

---

## 10. IDX Visual QA Checklist (branded subdomain)

Run after uploading wrapper + CSS (section 4). Test in incognito at **375px** (mobile) and
**1280px** (desktop).

| Test | URL | Pass criteria |
|------|-----|---------------|
| Results (zip filter) | `https://sdcommunities.idxbroker.com/idx/results/listings?zipcode[]=92037&a_status[]=active` | BHHS logo header, pearl background, cabernet prices, white rounded cards in 3-col grid (desktop), no green Bootstrap alerts |
| Saved search | Community saved-link URL (e.g. La Jolla from Control Panel) | Same branding; community-filtered results |
| Detail click-through | Any listing from results | Rounded gallery, cabernet price, styled contact form, pearl page background |
| Mobile 375px | Same URLs | No horizontal scroll; buttons and pagination ≥44px tall |
| Desktop 1280px | Same URLs | 3-column card grid; sticky BHHS header |
| Footer compliance | All pages | Franchise + SDMLS + agent disclaimers; Equal Housing line; cabernet footer |
| Return path | Header logo + nav links | All resolve to `https://sdcommunities.com/...` |
| Search pill | Header second row | "Search homes on sdcommunities.com" links to `/search-homes` |
| Main site parity | Compare to `https://sdcommunities.com/neighborhoods/la-jolla` | Same logo, fonts (Marcellus headings, Manrope body), cabernet CTAs, card feel |

### Asset file reference

| Asset | Repo path | Deploy / IDX target |
|-------|-----------|---------------------|
| Includes header | `public/idx-header.html` | Deploy → `https://sdcommunities.com/idx-header.html` → Wrappers → Includes Header URL |
| Includes footer | `public/idx-footer.html` | Deploy → `https://sdcommunities.com/idx-footer.html` → Wrappers → Includes Footer URL |
| Wrapper CSS | `public/idx-wrapper.css` | Deploy → linked from `idx-header.html` (`?v=`) |
| Results CSS | `public/idx-results.css` | Deploy → linked from `idx-footer.html` (`?v=`); optional Categories → Results backup |
| Detail CSS | `public/idx-detail.css` | Deploy → linked from `idx-footer.html` (`?v=`); optional Designs → Details backup |
| Static wrapper (reference) | `docs/idx-wrapper.html` | Prefer Includes |

---

## 11. Open Items From Client

| Item | Needed for |
|------|------------|
| ~~MLS feed approval status~~ | Done (2026-06-24) |
| Agent name, DRE #, email, phone | Phase 1 launch |
| Brokerage license # and office address | Phase 1 launch |
| Domain DNS access (CNAME) | Phase 1 |
| Saved search URLs (after creation) | Phase 1 |
| Registration gate preference (# views) | Phase 1 IDX config |
| CRM platform (for `CRM_WEBHOOK_URL`) | Phase 1 |
| IDX API key | Phase 2 |
| MLS display rules (sold data, photos) | Phase 2 |
