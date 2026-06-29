# Image Attribution

Neighborhood and marketing photos are downloaded locally from curated sources. Full slot metadata lives in [`src/data/image-manifest.json`](../../src/data/image-manifest.json); community-specific sources in [`src/data/community-image-sources.json`](../../src/data/community-image-sources.json).

## Unsplash

Most tier-1 neighborhood heroes and several residential streetscapes use the [Unsplash License](https://unsplash.com/license) (commercial use allowed; attribution appreciated).

| Photographer | Used in |
|--------------|---------|
| Kevin Schmid | Clairemont, Linda Vista, search homes hero, first-time buyer split |
| Jeremy Huang | Contact hero, Hillcrest thumb |
| Hakan Toker | Home hero, relocating hero |
| James Lee | La Jolla subareas split section |
| Unsplash Contributors | La Jolla, Pacific Beach, Del Mar, UTC, and other tier-1 heroes/thumbs |

## Wikimedia Commons

Subarea and landmark neighborhood photos use Wikimedia Commons files under CC0, CC BY, CC BY-SA, or public domain licenses. **Attribution is required** for CC-licensed files; see each file's Commons page linked in the manifest.

Representative community sources:

| Community | File | License |
|-----------|------|---------|
| La Jolla Cove | [La Jolla Cove (12139852426)](https://commons.wikimedia.org/wiki/File:La_Jolla_Cove_(12139852426).jpg) | CC BY-SA 2.0 |
| La Jolla Shores | [Scripps Pier La Jolla CA](https://commons.wikimedia.org/wiki/File:Scripps_Pier_La_Jolla_CA.jpg) | CC BY-SA 3.0 |
| Mount Soledad | [Mount Soledad - Looking North](https://commons.wikimedia.org/wiki/File:Mount_Soledad_-_Looking_North.jpg) | CC0 |
| Torrey Pines | [Blacks-Beach-Trail-From-Torrey-Pines-Gliderport](https://commons.wikimedia.org/wiki/File:Blacks-Beach-Trail-From-Torrey-Pines-Gliderport.jpg) | CC BY-SA 4.0 |
| Mission Valley | [Mission Valley West panoramio](https://commons.wikimedia.org/wiki/File:Mission_Valley_West,_San_Diego,_CA,_USA_-_panoramio_(7).jpg) | CC BY-SA 3.0 |
| Old Town | [Old Town San Diego](https://commons.wikimedia.org/wiki/File:Old_Town_San_Diego.jpg) | CC BY-SA 3.0 |
| Downtown | [Gaslamp Quarter 01](https://commons.wikimedia.org/wiki/File:Gaslamp_Quarter_01.jpg) | CC BY-SA 3.0 |
| Balboa Park | [Balboa Park Botanical Building 01](https://commons.wikimedia.org/wiki/File:Balboa_Park_Botanical_Building_01.jpg) | CC BY-SA 3.0 |

Complete per-slug attribution: run `node scripts/check-community-images.mjs` and inspect manifest candidates.

## Compliance notes

- No AI-generated or MLS listing photography is used for marketing heroes or neighborhood imagery.
- Agent headshot: placeholder until a licensed agent photo is provided by the site owner.
- Subarea card thumbnails may reuse the hero file when a separate Commons thumb was unavailable at download time.
