# Community Image Briefs

Visual anchor and source plan for all 43 neighborhood guides. Each slug gets a **hero** (`1920×1080`) and **thumb** (`800×450`) at `/images/neighborhoods/{slug}-hero.jpg` and `{slug}-thumb.jpg`.

## Selection rules

1. Photo must show a landmark, streetscape, or geography **specific to that slug**
2. Wikimedia Commons preferred for identifiable landmarks; Unsplash for residential streetscapes
3. Subarea images must be visually distinct from the parent in the `/neighborhoods` grid
4. No IDX/MLS listing photos or AI-generated imagery

## Tier 1 (13)

| Slug | Visual anchor | Source | Notes |
|------|---------------|--------|-------|
| `la-jolla` | La Jolla Cove coastline | Unsplash | Parent overview; Cove vista |
| `pacific-beach` | PB pier and boardwalk | Unsplash | |
| `university-city` | Geisel Library / UCSD | Unsplash | UTC anchor |
| `clairemont` | Palm-lined residential street | Unsplash | Central SD suburban |
| `mission-valley` | Mission Valley West / Fashion Valley corridor | Wikimedia | **Re-curated** — was downtown skyline |
| `del-mar` | Del Mar beach and bluffs | Unsplash | |
| `carmel-valley` | Hillside neighborhood ocean views | Unsplash | |
| `point-loma` | Point Loma Lighthouse | Unsplash | Cabrillo / peninsula |
| `sorrento-valley` | Sorrento Valley biotech corridor | Wikimedia | **Re-curated** — was duplicate Geisel |
| `bay-park` | Mission Bay waterfront | Unsplash | Bay views from hills |
| `ocean-beach` | OB Pier at sunset | Unsplash | |
| `hillcrest` | Balboa Park architecture | Unsplash | Hillcrest / Balboa adjacency |
| `north-park` | Walkable commercial street | Unsplash | Adams / 30th corridor feel |

## Tier 2 (17)

| Slug | Visual anchor | Source | Notes |
|------|---------------|--------|-------|
| `bay-ho` | Vacation Isle, Mission Bay | Wikimedia | Quiet bay-side pocket |
| `north-clairemont` | Clairemont canyon / residential hills | Wikimedia | Distinct from parent palm street |
| `kearny-mesa` | Commercial dining corridor | Unsplash | Convoy-adjacent hub |
| `linda-vista` | Central mesa residential streetscape | Unsplash | USD / MV adjacency |
| `mission-hills` | Presidio of San Diego ruins | Wikimedia | Historic Presidio Park |
| `torrey-pines` | Torrey Pines State Reserve bluffs | Wikimedia | Coastal bluff trails |
| `del-mar-heights` | Del Mar Fairgrounds | Wikimedia | Hills above Del Mar |
| `torrey-hills` | Soledad view from Torrey Pines | Wikimedia | Hills between CV and TP |
| `civita` | Mission Valley master-planned hills | Wikimedia | Newer MV development |
| `serra-mesa` | Mission Valley central corridor | Wikimedia | SDSU / MV adjacency |
| `ocean-beach` | (see Tier 1) | | |
| `hillcrest` | (see Tier 1) | | |
| `north-park` | (see Tier 1) | | |
| `bay-park` | (see Tier 1) | | |

## Tier 3 — La Jolla cluster (7)

| Slug | Visual anchor | Source |
|------|---------------|--------|
| `la-jolla-cove` | Cove rocks and sea lions | Wikimedia |
| `la-jolla-shores` | Scripps Pier and Shores beach | Wikimedia |
| `la-jolla-village` | Girard Avenue village streetscape | Wikimedia |
| `bird-rock` | Bird Rock Cafe / La Jolla Blvd | Wikimedia |
| `muirlands` | Mount Soledad panoramic views | Wikimedia |
| `mount-soledad` | Mount Soledad memorial overlook | Wikimedia |
| `windansea` | Windansea Beach surf shack coast | Wikimedia |

## Tier 3 — Pacific Beach / Mission Bay (3)

| Slug | Visual anchor | Source |
|------|---------------|--------|
| `crown-point` | Mission Bay rowing / Crown Point | Wikimedia |
| `mission-beach` | Mission Beach boardwalk | Wikimedia |
| `mission-bay` | Mission Bay Park sunset | Wikimedia |

## Tier 3 — Central / coastal (13)

| Slug | Visual anchor | Source |
|------|---------------|--------|
| `morena` | Liberty Station promenade | Wikimedia |
| `old-town` | Old Town San Diego historic plaza | Wikimedia |
| `midway-district` | San Diego airport / Midway area aerial | Wikimedia |
| `point-loma-heights` | Cabrillo National Monument | Wikimedia |
| `university-heights` | University Heights Library / Park Blvd | Wikimedia |
| `normal-heights` | Normal Heights neighborhood streetscape | Wikimedia |
| `bankers-hill` | Balboa Park Botanical Building close-up | Wikimedia |
| `little-italy` | Little Italy neighborhood sign / street | Wikimedia |
| `downtown-san-diego` | Gaslamp Quarter streetscape | Wikimedia |
| `balboa-park` | Balboa Park Botanical Building | Wikimedia |

## Audit log (2026-06-29)

| Slug | Issue | Action |
|------|-------|--------|
| `mission-valley` | Hero showed downtown skyline / Coronado Bridge | Replaced with Mission Valley West photo |
| `sorrento-valley` | Hero duplicated Geisel Library (same as UTC) | Replaced with Sorrento Valley corridor photo |
| All phase-1 subareas | Inherited parent `{parent}-hero.jpg` | Switched to slug-specific files |

Canonical download URLs live in [`src/data/community-image-sources.json`](../../src/data/community-image-sources.json).
