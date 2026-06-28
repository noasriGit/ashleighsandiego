# Pre-Publish Review Checklist

Complete for each community before setting `hasGuide: true` and deploying.

## Factual accuracy

- [ ] Research brief exists at `briefs/{slug}.md` with all 8 sections
- [ ] Minimum 5 authoritative sources in source log
- [ ] Every stat in `CommunityContent.stats` is verifiable (ZIP, freeway, named anchor)
- [ ] No fabricated walk scores, school ratings, price ranges, or commute minutes without source
- [ ] Low-confidence claims omitted or qualified ("roughly", "varies by block")

## Fair housing & compliance

- [ ] Copy describes place and amenities, not people or demographic steering
- [ ] No "best neighborhood" superlatives without qualification
- [ ] Schools: district names only; FAQ reminds buyers to verify boundaries
- [ ] No MLS or AI-generated marketing imagery

## SEO & content quality

- [ ] Primary keyword from CSV mapped in `src/data/keywords.ts`
- [ ] Meta title: `Living in {name}: A Buyer's Guide`
- [ ] Subarea page adds distinct value vs parent (<30% overlap)
- [ ] Cannibalization note in brief vs parent and sibling slugs
- [ ] 3–5 FAQs target PAA / long-tail queries from brief

## Code & wiring

- [ ] `CommunityContent` entry complete (`whoItsFor`, `housingOverview`, `lifestyle`, `commute`, `nearbyComparisons`, `faqs`)
- [ ] `hasGuide: true` in `communities.ts`
- [ ] ZIP verified in `community-zips.ts`
- [ ] `nearbyComparisons` slugs point to live guides
- [ ] Parent guide cross-links updated (if child of existing guide)
- [ ] Hero/thumbnail sourced OR gradient fallback documented
- [ ] `image-manifest.json` + `ATTRIBUTION.md` updated if images added

## IDX & listings

- [ ] Browse URL resolves (`getIdxBrowseUrl(slug)`)
- [ ] Saved search created in IDX CP OR zip fallback documented in brief
- [ ] Shared-ZIP subareas: listings disclaimer applies on page

## QA

- [ ] `/neighborhoods/{slug}` renders (no 404)
- [ ] FAQ JSON-LD present
- [ ] CommunityListings block behaves (listings or graceful omit)
- [ ] Sitemap includes URL
- [ ] Directory card links and shows thumbnail if configured
