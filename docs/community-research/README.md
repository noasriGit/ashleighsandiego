# Community Research Methodology

Research briefs for sdcommunities.com neighborhood buyer guides. Every factual claim in published copy must trace to a completed brief in `briefs/{slug}.md`.

## Audience

**Primary persona:** Relocating buyers comparing San Diego neighborhoods near La Jolla, UTC, and coastal/central SD — not tourists or casual visitors.

**Primary search intents:**

1. Community guide — "living in {area}", "what is {area} like"
2. Relocation comparison — "{area} vs {parent/nearby}"
3. Buyer practicals — housing types, commute anchors, lifestyle fit

## Source standards

### Tier 1 (preferred)

- City of San Diego Community Plan areas and planning documents
- SANDAG, Census ACS (demographics only, with year)
- MTS / SANDAG transit pages
- San Diego Parks & Recreation, state/city park sites
- Recognized institutions (UCSD, USD, Liberty Station, Del Mar Fairgrounds)

### Tier 2 (supplemental)

- Walk Score (qualitative walkability only, with date checked)
- Official school district boundary maps (San Diego Unified, Poway Unified, etc.)

### Excluded

- Random blogs, forums, Reddit
- Zillow / Redfin neighborhood blurbs without verification
- AI summaries without primary-source confirmation
- Outdated sources (>5 years for redevelopment/transit unless still authoritative)

## Workflow

1. Select community from backlog (see project plan).
2. Complete `TEMPLATE.md` → save as `briefs/{slug}.md`.
3. **Review gate:** Flag low-confidence claims; omit or qualify in copy.
4. Write `CommunityContent` entry in `src/data/community-content.ts`.
5. Set `hasGuide: true` in `src/data/communities.ts`.
6. Add keywords, verify ZIPs, source images, update parent cross-links.
7. Run `review-checklist.md` before marking done.

## Subarea rule

Every subarea page (`parentSlug` set) must document **how it differs from the parent guide** in geography, housing stock, and buyer fit. Target less than 30% text overlap with the parent page.

## Fair housing

Describe the place — housing types, anchors, commute, amenities — not people or demographic steering. Avoid "best for families of X" or implied protected-class preferences.

## File layout

```
docs/community-research/
  README.md           ← this file
  TEMPLATE.md         ← per-community brief template
  review-checklist.md ← pre-publish QA
  briefs/
    {slug}.md         ← completed research briefs
```
