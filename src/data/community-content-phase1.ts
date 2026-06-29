import type { CommunityContent } from "./community-content";

export const phase1CommunityContent: Record<string, CommunityContent> = {
  // ── Tier 2 ──────────────────────────────────────────────────────────────

  "torrey-hills": {
    slug: "torrey-hills",
    heroImage: "/images/neighborhoods/torrey-hills-hero.jpg",
    heroImageAlt: "Mount Soledad view from Torrey Hills, San Diego",
    thumbnail: "/images/neighborhoods/torrey-hills-thumb.jpg",
    thumbnailAlt: "Hillside neighborhood between Carmel Valley and Torrey Pines",
    stats: [
      { value: "92130", label: "ZIP Code" },
      { value: "I-5 · I-805", label: "Freeway Access" },
      { value: "Torrey Pines", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Families relocating for schools and master-planned amenities near UTC",
      "Buyers who want Carmel Valley access at a slightly inland setting",
      "Professionals commuting to Sorrento Valley or UCSD",
      "Relocating buyers comparing Del Mar who want more yard space",
    ],
    housingOverview:
      "Torrey Hills sits between Carmel Valley and Torrey Pines with a mix of single-family homes, townhomes, and select condos. Many streets date to the 1990s–2000s with established landscaping and cul-de-sac layouts. Inventory tends toward family-sized floor plans rather than the newer tract homes found deeper in Carmel Valley.",
    lifestyle:
      "The area feels suburban and family-oriented with neighborhood parks and easy access to Carmel Valley Road shopping. Torrey Pines State Natural Reserve and coastal trails are a short drive west. Daily errands often route through Carmel Valley or UTC rather than a dedicated village center within Torrey Hills itself.",
    commute:
      "I-5 and I-805 are roughly 5–10 minutes away. Sorrento Valley and UTC employers are typically 10–15 minutes by car. UCSD is roughly 15–20 minutes. Downtown San Diego is roughly 25–30 minutes depending on traffic.",
    nearbyComparisons: [
      { name: "Carmel Valley", slug: "carmel-valley", note: "Broader master-planned area with newer construction options" },
      { name: "Torrey Pines", slug: "torrey-pines", note: "Closer to coastal bluffs and golf course scenery" },
      { name: "University City", slug: "university-city", note: "More condo inventory and Westfield UTC proximity" },
    ],
    faqs: [
      { question: "How does Torrey Hills differ from Carmel Valley?", answer: "Torrey Hills is a specific residential pocket within the Carmel Valley area, generally closer to Torrey Pines and I-5. Housing stock is slightly older than newer Carmel Valley tracts, and the feel is more established neighborhood than master-planned community." },
      { question: "Is Torrey Hills good for relocating families?", answer: "Torrey Hills is popular with relocating families who want Carmel Valley schools and amenities. Verify school boundaries for your target streets before buying." },
      { question: "How far is Torrey Hills from the beach?", answer: "Torrey Pines beaches and the state reserve are roughly 10 minutes west. Del Mar beaches are roughly 10–15 minutes north." },
      { question: "What housing types are available in Torrey Hills?", answer: "Single-family homes dominate, with townhomes and some condos on select streets. Most properties offer 3+ bedrooms suited to family buyers." },
    ],
  },

  "mission-hills": {
    slug: "mission-hills",
    heroImage: "/images/neighborhoods/mission-hills-hero.jpg",
    heroImageAlt: "Presidio of San Diego ruins in Presidio Park, Mission Hills",
    thumbnail: "/images/neighborhoods/mission-hills-thumb.jpg",
    thumbnailAlt: "Historic Presidio Park overlooking Mission Hills, San Diego",
    stats: [
      { value: "92103", label: "ZIP Code" },
      { value: "I-5 · SR-163", label: "Freeway Access" },
      { value: "Presidio Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking historic architecture near downtown and Balboa Park",
      "Professionals working at downtown or Hillcrest medical centers",
      "Relocating buyers who want walkable urban living with character homes",
      "Empty nesters downsizing from larger suburban properties",
    ],
    housingOverview:
      "Mission Hills features early-20th-century Craftsman, Spanish Revival, and Tudor-style homes on tree-lined streets. Many properties have been thoughtfully updated while retaining original character. Condos and townhomes appear on select corridors, but the area is primarily single-family with mature landscaping and canyon-adjacent lots.",
    lifestyle:
      "Mission Hills offers a quieter, residential counterpoint to Hillcrest's commercial core while sharing walkable access to dining and Balboa Park. Presidio Park and Old Town are nearby. The pace is neighborhood-oriented with strong architectural identity rather than nightlife-focused.",
    commute:
      "Downtown San Diego is roughly 5–10 minutes by car. Hillcrest and UCSD Hillcrest medical campus are within a few minutes. I-5 and SR-163 provide regional access. UTC and Sorrento Valley are roughly 20–25 minutes north.",
    nearbyComparisons: [
      { name: "Hillcrest", slug: "hillcrest", note: "More commercial density and walkable dining corridors" },
      { name: "Bankers Hill", slug: "bankers-hill", note: "Closer to downtown with more high-rise condo options" },
      { name: "Point Loma", slug: "point-loma", note: "Peninsula living with bay views and Liberty Station" },
    ],
    faqs: [
      { question: "How does Mission Hills compare to Hillcrest?", answer: "Mission Hills is primarily residential with historic single-family homes, while Hillcrest has more commercial density and condo inventory. Both offer walkable access to Balboa Park and central San Diego amenities." },
      { question: "Are there historic home considerations in Mission Hills?", answer: "Many homes date to the early 1900s. Buyers should budget for inspections covering foundation, plumbing, and any Mills Act or historic designation requirements on specific properties." },
      { question: "Is Mission Hills walkable?", answer: "Residential streets are pleasant for walking, and Hillcrest's commercial district and Balboa Park are reachable on foot from many blocks. A car is still useful for grocery runs beyond the immediate area." },
      { question: "What is the commute like from Mission Hills?", answer: "Central San Diego employers are well served. Downtown is roughly 5–10 minutes. North County job centers require freeway access and are roughly 20–30 minutes depending on destination." },
    ],
  },

  "torrey-pines": {
    slug: "torrey-pines",
    heroImage: "/images/neighborhoods/torrey-pines-hero.jpg",
    heroImageAlt: "Torrey Pines State Natural Reserve coastal bluffs, San Diego",
    thumbnail: "/images/neighborhoods/torrey-pines-thumb.jpg",
    thumbnailAlt: "Torrey Pines bluff trail overlooking the Pacific Ocean",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Torrey Pines State Natural Reserve", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want coastal bluff living near UCSD and Sorrento Valley",
      "Outdoor enthusiasts prioritizing hiking trails and ocean proximity",
      "Professionals in biotech or university roles seeking a short commute",
      "Relocating buyers comparing La Jolla Village who prefer quieter streets",
    ],
    housingOverview:
      "Torrey Pines encompasses hillside and bluff-top homes west of I-5, with a mix of mid-century ranch homes, custom builds, and newer construction on canyon lots. The Torrey Pines Golf Course area adds a distinct sub-pocket. Condos are limited compared to La Jolla Village; most inventory is single-family with view premiums on ocean-facing streets.",
    lifestyle:
      "Torrey Pines State Natural Reserve defines outdoor recreation here with coastal trails and dramatic bluff views. The area is quieter than La Jolla Village with less foot traffic and commercial density. UCSD and Scripps Institution of Oceanography are nearby, contributing an academic and research-oriented neighborhood feel.",
    commute:
      "I-5 runs through the area, providing direct access north and south. Sorrento Valley biotech campuses are roughly 5–10 minutes. UCSD is roughly 10 minutes. La Jolla Village is roughly 5–10 minutes east. Downtown is roughly 25–30 minutes.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Broader village amenities and more condo inventory" },
      { name: "Del Mar", slug: "del-mar", note: "Similar coastal character, slightly north with village dining" },
      { name: "University City", slug: "university-city", note: "More central with UTC shopping, less bluff-top scenery" },
    ],
    faqs: [
      { question: "How does Torrey Pines differ from broader La Jolla?", answer: "Torrey Pines is the western, bluff-top portion of La Jolla centered on the state reserve and golf course. It has fewer village shops and condos than La Jolla Village but offers direct coastal trail access and a quieter residential character." },
      { question: "Is Torrey Pines good for UCSD commuters?", answer: "Yes, UCSD and Scripps are roughly 10 minutes away. Sorrento Valley employers are even closer. Torrey Pines is one of the most commute-friendly coastal pockets in La Jolla." },
      { question: "What outdoor recreation is available in Torrey Pines?", answer: "Torrey Pines State Natural Reserve offers hiking trails along coastal bluffs. Nearby beaches include Torrey Pines State Beach and Black's Beach. The area is well suited to buyers who prioritize trail and ocean access." },
    ],
  },

  "civita": {
    slug: "civita",
    heroImage: "/images/neighborhoods/civita-hero.jpg",
    heroImageAlt: "Mission Valley West hills near Civita master-planned community",
    thumbnail: "/images/neighborhoods/civita-thumb.jpg",
    thumbnailAlt: "Mission Valley redevelopment hills, San Diego",
    stats: [
      { value: "92108", label: "ZIP Code" },
      { value: "I-805 · I-8", label: "Freeway Access" },
      { value: "Civita Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "First-time buyers seeking newer construction in central San Diego",
      "Families relocating who want master-planned parks and community amenities",
      "Commuters needing freeway access to multiple job centers",
      "Buyers comparing Mission Valley who prioritize new-home warranties",
    ],
    housingOverview:
      "Civita is a master-planned community within Mission Valley featuring newer single-family homes, townhomes, and condos built from the 2010s onward. Floor plans emphasize open layouts, energy-efficient construction, and attached garages. Unlike older Mission Valley condo towers, Civita offers a suburban-within-urban feel with dedicated parks and walking paths.",
    lifestyle:
      "Civita Park serves as the community hub with playgrounds, sports courts, and gathering spaces. Shopping and dining are a short drive to Fashion Valley or Mission Valley Mall. The area lacks the neighborhood history of Clairemont or Hillcrest but compensates with modern amenities and a family-friendly layout.",
    commute:
      "Civita sits near the I-805 and I-8 interchange, one of San Diego's best-connected freeway nodes. Downtown is roughly 10–15 minutes. UTC is roughly 15–20 minutes. Most central San Diego job centers are reachable within roughly 20–25 minutes.",
    nearbyComparisons: [
      { name: "Mission Valley", slug: "mission-valley", note: "Broader area with older condo towers and more retail" },
      { name: "Serra Mesa", slug: "serra-mesa", note: "Established mid-century homes at generally lower price points" },
      { name: "Clairemont", slug: "clairemont", note: "More lot space and mature trees, older housing stock" },
    ],
    faqs: [
      { question: "How does Civita differ from the rest of Mission Valley?", answer: "Civita is a newer master-planned pocket with single-family homes, townhomes, and modern condos built around Civita Park. The broader Mission Valley area has more 1970s–90s condo towers and commercial strip development." },
      { question: "Is Civita good for relocating families?", answer: "Civita attracts families with its parks, newer construction, and central location. School boundaries should be verified for specific addresses within the community." },
      { question: "Are there HOA fees in Civita?", answer: "Most Civita properties include HOA fees covering common area maintenance, parks, and community amenities. Review HOA documents during escrow for specific cost and coverage details." },
      { question: "What is the commute like from Civita?", answer: "Freeway access is excellent. Downtown, Kearny Mesa, and Sorrento Valley are all roughly 15–25 minutes depending on traffic and exact destination." },
    ],
  },

  "del-mar-heights": {
    slug: "del-mar-heights",
    heroImage: "/images/neighborhoods/del-mar-heights-hero.jpg",
    heroImageAlt: "Del Mar Fairgrounds above Del Mar Heights, San Diego County",
    thumbnail: "/images/neighborhoods/del-mar-heights-thumb.jpg",
    thumbnailAlt: "Del Mar Fairgrounds grandstand and racetrack",
    stats: [
      { value: "92014", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Del Mar Village", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Families relocating for Del Mar schools with hillside lot preferences",
      "Buyers who want canyon or ocean views above the coastal village",
      "Professionals with flexible commutes or remote work arrangements",
      "Relocating buyers comparing Carmel Valley who want Del Mar address proximity",
    ],
    housingOverview:
      "Del Mar Heights sits on the hills east of Del Mar Village with single-family homes ranging from 1960s ranch-style to contemporary custom builds. Many lots offer canyon, lagoon, or ocean views. Unlike the flat village below, Heights properties typically sit on larger lots with more privacy and elevation.",
    lifestyle:
      "Del Mar Heights is residential and quiet with local parks and canyon trail access. Del Mar Village dining and the fairgrounds are roughly 5–10 minutes downhill. Beaches are accessible but require a short drive rather than walking distance. The feel is suburban-coastal rather than walkable village.",
    commute:
      "I-5 is roughly 5 minutes via Carmel Valley Road or Via de la Valle. Sorrento Valley is roughly 10–15 minutes south. Downtown San Diego is roughly 25–30 minutes. Many residents work remotely or commute south to biotech hubs.",
    nearbyComparisons: [
      { name: "Del Mar", slug: "del-mar", note: "Walkable village and beach proximity at the base of the hills" },
      { name: "Carmel Valley", slug: "carmel-valley", note: "More master-planned suburban feel, similar school access" },
      { name: "Torrey Hills", slug: "torrey-hills", note: "Inland Carmel Valley pocket with established neighborhoods" },
    ],
    faqs: [
      { question: "How does Del Mar Heights differ from Del Mar Village?", answer: "Del Mar Heights is the hillside residential area above the village with larger lots and view premiums. The village offers walkable dining and closer beach access. Both share the Del Mar address and school district." },
      { question: "Are there view properties in Del Mar Heights?", answer: "Yes, canyon, lagoon, and ocean views are common on elevated streets. View premiums vary by orientation and sightline quality." },
      { question: "Is Del Mar Heights good for relocating families?", answer: "Del Mar Heights is popular with relocating families who want Del Mar schools and hillside living. Budget and lot-size preferences should guide your search." },
    ],
  },

  "north-clairemont": {
    slug: "north-clairemont",
    heroImage: "/images/neighborhoods/north-clairemont-hero.jpg",
    heroImageAlt: "Hillside residential neighborhood in North Clairemont, San Diego",
    thumbnail: "/images/neighborhoods/north-clairemont-thumb.jpg",
    thumbnailAlt: "Canyon-adjacent homes in North Clairemont, San Diego",
    stats: [
      { value: "92117", label: "ZIP Code" },
      { value: "I-5 · I-805", label: "Freeway Access" },
      { value: "Tecolote Canyon", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking mid-century homes with canyon views in central San Diego",
      "Families who want yards and central location without coastal premiums",
      "Commuters to Kearny Mesa, UTC, or Mission Valley",
      "Relocating buyers comparing Bay Park who prefer flatter, established blocks",
    ],
    housingOverview:
      "North Clairemont features 1950s–70s single-family homes on generous lots, many backing to Tecolote Canyon or offering west-facing sunset views. Housing stock is similar to broader Clairemont but North Clairemont tends toward slightly larger lots and more hillside terrain. Condos and townhomes are less common here than in southern Clairemont pockets.",
    lifestyle:
      "Tecolote Canyon Natural Park provides hiking and open space directly adjacent to many streets. The area is quiet and residential with a strong mid-century neighborhood character. Clairemont Town Square and Morena Boulevard dining are nearby for errands and meals.",
    commute:
      "I-5 and I-805 are roughly 5–10 minutes. Mission Valley is roughly 10 minutes. Kearny Mesa and UTC are roughly 10–15 minutes. Downtown is roughly 15–20 minutes depending on route and traffic.",
    nearbyComparisons: [
      { name: "Clairemont", slug: "clairemont", note: "Broader central neighborhood with similar housing stock" },
      { name: "Bay Park", slug: "bay-park", note: "Hillside views and bay breezes, slightly higher elevation" },
      { name: "Kearny Mesa", slug: "kearny-mesa", note: "More commercial density and diverse dining options" },
    ],
    faqs: [
      { question: "How does North Clairemont differ from Clairemont?", answer: "North Clairemont is the northern portion of the Clairemont area with more canyon-adjacent lots and hillside terrain. Housing styles and era are similar, but North Clairemont often offers better views and slightly larger lots." },
      { question: "Is North Clairemont good for relocating families?", answer: "North Clairemont offers space, central location, and canyon access at value compared to coastal areas. Verify school boundaries for your target streets." },
      { question: "What outdoor access does North Clairemont offer?", answer: "Tecolote Canyon Natural Park borders much of North Clairemont with trails and open space. Mission Bay and Pacific Beach are roughly 10–15 minutes by car." },
    ],
  },

  "serra-mesa": {
    slug: "serra-mesa",
    heroImage: "/images/neighborhoods/serra-mesa-hero.jpg",
    heroImageAlt: "Mission Valley corridor near Serra Mesa, San Diego",
    thumbnail: "/images/neighborhoods/serra-mesa-thumb.jpg",
    thumbnailAlt: "Central San Diego mesa neighborhood near SDSU",
    stats: [
      { value: "92123", label: "ZIP Code" },
      { value: "I-805 · I-8", label: "Freeway Access" },
      { value: "SDSU", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking central location near SDSU and Mission Valley",
      "Commuters who need access to multiple freeway corridors",
      "Families wanting single-family homes at central San Diego price points",
      "Relocating buyers comparing Linda Vista who prefer established residential streets",
    ],
    housingOverview:
      "Serra Mesa offers post-war and mid-century single-family homes on flat, grid-patterned streets. Many properties have been updated with modern kitchens and additions while retaining original footprints. Unlike Mission Valley's condo towers, Serra Mesa is predominantly detached single-family with driveways and yards.",
    lifestyle:
      "Serra Mesa is a quiet, residential pocket bordered by SDSU, Mission Valley, and Kearny Mesa. Local parks and the Aztec Mesa shopping center serve daily needs. The area lacks a walkable village center but offers practical central access for errands across San Diego.",
    commute:
      "I-805 and I-8 are roughly 5 minutes. SDSU is adjacent. Downtown is roughly 10–15 minutes. Kearny Mesa and Mission Valley employers are roughly 5–10 minutes. UTC is roughly 15–20 minutes north.",
    nearbyComparisons: [
      { name: "Mission Valley", slug: "mission-valley", note: "More condos and retail centers, less yard space" },
      { name: "Linda Vista", slug: "linda-vista", note: "Adjacent area with similar central access" },
      { name: "Clairemont", slug: "clairemont", note: "Similar mid-century homes with canyon access to the west" },
    ],
    faqs: [
      { question: "How does Serra Mesa differ from Mission Valley?", answer: "Serra Mesa is primarily single-family residential with mid-century homes and yards. Mission Valley has more condo towers, shopping centers, and commercial development along the freeway corridor." },
      { question: "Is Serra Mesa good for SDSU-affiliated buyers?", answer: "Serra Mesa borders SDSU and offers short commutes to campus. It suits faculty, staff, and buyers who want central access without university-area density." },
      { question: "What is the commute like from Serra Mesa?", answer: "Central San Diego is well served with I-805 and I-8 nearby. Most job centers within the city are roughly 10–25 minutes depending on destination and traffic." },
    ],
  },

  "kearny-mesa": {
    slug: "kearny-mesa",
    heroImage: "/images/neighborhoods/kearny-mesa-hero.jpg",
    heroImageAlt: "Fashion Valley transit hub near Kearny Mesa, San Diego",
    thumbnail: "/images/neighborhoods/kearny-mesa-thumb.jpg",
    thumbnailAlt: "Commercial corridor near Kearny Mesa, San Diego",
    stats: [
      { value: "92111", label: "ZIP Code" },
      { value: "I-805 · I-15", label: "Freeway Access" },
      { value: "Convoy District", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want central location with diverse dining and shopping",
      "Commuters to Kearny Mesa office parks or Miramar employment centers",
      "Relocating buyers seeking single-family homes near the Convoy District",
      "Investors and owner-occupants interested in central San Diego value",
    ],
    housingOverview:
      "Kearny Mesa mixes single-family homes from the 1960s–80s with commercial and light-industrial corridors along Convoy Street and Clairemont Mesa Boulevard. Residential pockets east of Convoy offer detached homes with yards, while areas closer to the commercial core include townhomes and condos. The housing landscape is more varied than neighboring Clairemont.",
    lifestyle:
      "The Convoy District is one of San Diego's most diverse dining corridors with Asian restaurants, markets, and bakeries. Keary Mesa Community Park and local shopping centers serve daily needs. The area is functional and central rather than scenic or walkable in the residential pockets.",
    commute:
      "I-805 and I-15 provide regional access within roughly 5 minutes. Sorrento Valley is roughly 10–15 minutes. Downtown is roughly 15–20 minutes. Miramar and central San Diego office parks are often within roughly 10–15 minutes.",
    nearbyComparisons: [
      { name: "Clairemont", slug: "clairemont", note: "More residential character, less commercial density" },
      { name: "Serra Mesa", slug: "serra-mesa", note: "Quieter residential grid near SDSU" },
      { name: "University City", slug: "university-city", note: "Closer to UTC and UCSD, more suburban feel" },
    ],
    faqs: [
      { question: "How does Kearny Mesa differ from Clairemont?", answer: "Kearny Mesa has more commercial and dining density, especially along the Convoy District. Clairemont is more uniformly residential. Both offer mid-century single-family homes in central San Diego." },
      { question: "What is the Convoy District?", answer: "The Convoy District along Convoy Street is a dining and retail corridor known for Asian cuisine and markets. It is a major draw for food-focused buyers relocating to the area." },
      { question: "Is Kearny Mesa good for commuters?", answer: "Kearny Mesa's central location and I-805/I-15 access make it practical for buyers working across multiple San Diego job centers." },
    ],
  },

  "linda-vista": {
    slug: "linda-vista",
    heroImage: "/images/neighborhoods/linda-vista-hero.jpg",
    heroImageAlt: "Palm-lined residential street near Linda Vista, San Diego",
    thumbnail: "/images/neighborhoods/linda-vista-thumb.jpg",
    thumbnailAlt: "Central San Diego neighborhood street near Linda Vista",
    stats: [
      { value: "92111", label: "ZIP Code" },
      { value: "I-805 · I-8", label: "Freeway Access" },
      { value: "USD · Mission Valley", label: "Nearby Anchors" },
    ],
    whoItsFor: [
      "Buyers seeking central San Diego location near USD and Mission Valley",
      "Commuters who need freeway access without coastal premiums",
      "First-time buyers looking for condos or single-family homes centrally",
      "Relocating buyers comparing Mission Valley who want established neighborhood streets",
    ],
    housingOverview:
      "Linda Vista offers a mix of post-war single-family homes, duplexes, and condo complexes on hilly terrain overlooking Mission Valley. Many streets feature canyon or valley views. Compared to newer Mission Valley developments like Civita, Linda Vista has older housing stock with more character and generally lower entry points.",
    lifestyle:
      "Linda Vista borders USD, Mission Valley, and Kearny Mesa with access to the Linda Vista Community Park and local shopping along Morena Boulevard. The area is centrally located and practical for errands across San Diego. Tecolote Canyon and Mission Bay are a short drive away.",
    commute:
      "I-805 and I-8 are roughly 5 minutes. USD is within the neighborhood. Downtown is roughly 10–15 minutes. Mission Valley employers are roughly 5 minutes. UTC is roughly 15–20 minutes north.",
    nearbyComparisons: [
      { name: "Mission Valley", slug: "mission-valley", note: "More retail and newer condo developments in the valley floor" },
      { name: "Morena", slug: "morena", note: "Emerging corridor with infill development nearby" },
      { name: "Bay Park", slug: "bay-park", note: "Hillside views and bay proximity to the west" },
    ],
    faqs: [
      { question: "How does Linda Vista differ from Mission Valley?", answer: "Linda Vista is an established residential neighborhood on the hills above Mission Valley with older single-family homes and canyon views. Mission Valley below has more commercial development, condo towers, and newer communities like Civita." },
      { question: "Is Linda Vista good for USD commuters?", answer: "Linda Vista surrounds and borders USD, making it one of the most convenient residential areas for university-affiliated buyers." },
      { question: "What housing types are available in Linda Vista?", answer: "Single-family homes, duplexes, and condos are all available. Hillside streets often offer views of Mission Valley or canyons." },
      { question: "What is the commute like from Linda Vista?", answer: "Central location with dual freeway access makes most San Diego job centers reachable within roughly 10–25 minutes depending on destination." },
    ],
  },

  "bay-ho": {
    slug: "bay-ho",
    heroImage: "/images/neighborhoods/bay-ho-hero.jpg",
    heroImageAlt: "Vacation Isle waterfront on Mission Bay, San Diego",
    thumbnail: "/images/neighborhoods/bay-ho-thumb.jpg",
    thumbnailAlt: "Mission Bay canals near Bay Ho, San Diego",
    stats: [
      { value: "92110", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Mission Bay", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking quiet residential streets near Mission Bay",
      "Families who want Bay Park proximity at a slightly lower profile",
      "Commuters to central San Diego, Kearny Mesa, or downtown",
      "Relocating buyers comparing Clairemont who want bay-area breezes",
    ],
    housingOverview:
      "Bay Ho is a compact residential pocket within the Bay Park area featuring 1950s–70s single-family homes on flat to gently sloping streets. Lots are generally modest but many homes have been updated. Unlike the hillside portions of Bay Park, Bay Ho sits on flatter terrain closer to Morena Boulevard and Mission Bay access points.",
    lifestyle:
      "Bay Ho is quiet and residential with minimal commercial activity within the pocket itself. Mission Bay recreation, Tecolote Canyon, and Morena Boulevard dining are all a short drive. The feel is neighborhood-suburban with bay proximity rather than beach-town energy.",
    commute:
      "I-5 and I-8 are roughly 5–10 minutes. Downtown is roughly 10–15 minutes. Kearny Mesa is roughly 10 minutes. Pacific Beach is roughly 10 minutes west.",
    nearbyComparisons: [
      { name: "Bay Park", slug: "bay-park", note: "Broader hillside area with canyon and bay views" },
      { name: "Morena", slug: "morena", note: "Emerging corridor with newer development nearby" },
      { name: "Clairemont", slug: "clairemont", note: "Similar mid-century homes, slightly further from the bay" },
    ],
    faqs: [
      { question: "How does Bay Ho differ from Bay Park?", answer: "Bay Ho is a smaller, flatter residential pocket within Bay Park, generally closer to Morena Boulevard and Mission Bay access. Bay Park's hillside streets offer more elevation and views." },
      { question: "Is Bay Ho good for Mission Bay access?", answer: "Mission Bay parks and recreation areas are roughly 5–10 minutes by car. Bay Ho offers bay proximity without Pacific Beach crowds or price points." },
      { question: "What is the commute like from Bay Ho?", answer: "Central San Diego is well served with I-5 and I-8 nearby. Downtown and Kearny Mesa are roughly 10–15 minutes." },
    ],
  },

  // ── Tier 3: La Jolla subareas ───────────────────────────────────────────

  "la-jolla-cove": {
    slug: "la-jolla-cove",
    heroImage: "/images/neighborhoods/la-jolla-cove-hero.jpg",
    heroImageAlt: "La Jolla Cove sea lions and rocky coastline, San Diego",
    thumbnail: "/images/neighborhoods/la-jolla-cove-thumb.jpg",
    thumbnailAlt: "Sea lions resting on rocks at La Jolla Cove",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "La Jolla Cove", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want to live steps from La Jolla's most iconic coastline",
      "Empty nesters and professionals seeking walkable coastal dining",
      "Relocating buyers prioritizing ocean views and village proximity",
      "Second-home or part-time residents drawn to the Cove atmosphere",
    ],
    housingOverview:
      "La Jolla Cove sits on the bluffs above the famous cove, with a concentration of condos, townhomes, and select single-family homes on narrow, winding streets. Housing here is denser and more vertical than La Jolla Shores or Bird Rock, with many units offering direct ocean or cove views. Inventory is limited and turnover is low.",
    lifestyle:
      "The Cove area centers on coastal dining, sea lion viewing, and sunset walks along the bluff. Ellen Browning Scripps Park and the Cave Store are local landmarks. The pace is tourist-adjacent but residents enjoy immediate access to one of San Diego's most photographed coastlines.",
    commute:
      "I-5 is roughly 5–10 minutes via Torrey Pines Road. UCSD is roughly 10–15 minutes. Sorrento Valley is roughly 10–15 minutes. Downtown is roughly 25–30 minutes. Many Cove-area residents work remotely or commute to nearby university and biotech campuses.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Broader village with more housing variety across subareas" },
      { name: "La Jolla Village", slug: "la-jolla-village", note: "More shopping and dining density inland" },
      { name: "Bird Rock", slug: "bird-rock", note: "Quieter coastal neighborhood south of the Cove" },
    ],
    faqs: [
      { question: "How does La Jolla Cove differ from other La Jolla subareas?", answer: "The Cove is the most compact and ocean-front portion of La Jolla, with condos and townhomes on bluff-top streets above the sea lion colony. La Jolla Shores offers beach access and family homes, while the Village has more commercial density inland." },
      { question: "Are there condo options at La Jolla Cove?", answer: "Yes, condos and townhomes are the primary housing types near the Cove bluffs. Single-family homes exist on select streets but are less common than in Bird Rock or Muirlands." },
      { question: "Is the Cove area walkable?", answer: "Coastal paths, dining, and park areas are walkable from most Cove-adjacent addresses. Inland errands typically require a short drive to La Jolla Village or UTC." },
    ],
  },

  "la-jolla-shores": {
    slug: "la-jolla-shores",
    heroImage: "/images/neighborhoods/la-jolla-shores-hero.jpg",
    heroImageAlt: "Scripps Pier at La Jolla Shores beach, San Diego",
    thumbnail: "/images/neighborhoods/la-jolla-shores-thumb.jpg",
    thumbnailAlt: "La Jolla Shores sandy beach and calm Pacific waters",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "La Jolla Shores Beach", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Relocating families who want a flat, sandy beach and calm water access",
      "Buyers seeking single-family homes within walking distance of the ocean",
      "Outdoor enthusiasts interested in kayaking, snorkeling, and beach activities",
      "UCSD-affiliated buyers who want a family-friendly La Jolla subarea",
    ],
    housingOverview:
      "La Jolla Shores features single-family homes, duplexes, and beach-adjacent condos on flat terrain between the sand and La Jolla Village Drive. Unlike the Cove's bluff-top density, Shores offers wider streets, larger lots, and a beach-town residential feel. Many homes date to the 1950s–70s with ocean-view premiums on Avenida de la Playa.",
    lifestyle:
      "La Jolla Shores Beach is the anchor with calm water, kayak rentals, and the Scripps Pier visible offshore. The Shores commercial strip offers casual dining and a grocery store. Kellogg Park provides grassy beachfront space. The subarea is family-oriented with a relaxed beach-neighborhood pace.",
    commute:
      "I-5 is roughly 5–10 minutes. UCSD and Scripps are roughly 5–10 minutes north. Sorrento Valley is roughly 10–15 minutes. Downtown is roughly 25–30 minutes depending on traffic.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Broader area encompassing all La Jolla subareas" },
      { name: "La Jolla Cove", slug: "la-jolla-cove", note: "Iconic bluff-top cove, more condo density" },
      { name: "Pacific Beach", slug: "pacific-beach", note: "More casual beach town with boardwalk energy" },
    ],
    faqs: [
      { question: "How does La Jolla Shores differ from La Jolla Cove?", answer: "La Jolla Shores has a flat, sandy beach with family homes and calm water, while the Cove sits on bluffs with sea lions and more condo inventory. Shores is generally considered the most family-friendly beach subarea in La Jolla." },
      { question: "Is La Jolla Shores good for relocating families?", answer: "La Jolla Shores is popular with relocating families due to beach access, flat terrain, and a neighborhood feel. School boundaries should be verified for specific addresses." },
      { question: "Can you walk to the beach from La Jolla Shores homes?", answer: "Many properties on streets near Avenida de la Playa are within walking distance of the beach. Inland streets require a short walk or drive." },
    ],
  },

  "la-jolla-village": {
    slug: "la-jolla-village",
    heroImage: "/images/neighborhoods/la-jolla-village-hero.jpg",
    heroImageAlt: "Girard Avenue streetscape in La Jolla Village, San Diego",
    thumbnail: "/images/neighborhoods/la-jolla-village-thumb.jpg",
    thumbnailAlt: "La Jolla Village shops along Girard Avenue",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5 · I-805", label: "Freeway Access" },
      { value: "La Jolla Village Square", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want walkable dining and shopping in La Jolla",
      "Professionals seeking condo or townhome living near UTC and UCSD",
      "Relocating buyers who prioritize village amenities over beach proximity",
      "Empty nesters downsizing from larger La Jolla single-family homes",
    ],
    housingOverview:
      "La Jolla Village is the commercial and residential hub inland from the coast, with a higher concentration of condos, townhomes, and mid-rise buildings along Prospect Street, Girard Avenue, and La Jolla Village Drive. Single-family homes exist on peripheral streets but the Village core skews toward multi-family and mixed-use inventory.",
    lifestyle:
      "Prospect Street and Girard Avenue form the dining and boutique shopping core. La Jolla Village Square and UTC are nearby for larger retail runs. The Village offers the most walkable daily-life experience in La Jolla, with museums, galleries, and coastal paths reachable from many addresses.",
    commute:
      "I-5 and I-805 are roughly 5–10 minutes. UTC and Westfield UTC are roughly 5–10 minutes east. UCSD is roughly 10 minutes. Sorrento Valley is roughly 10–15 minutes. Downtown is roughly 25–30 minutes.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Full La Jolla area including coastal subareas" },
      { name: "University City", slug: "university-city", note: "More UTC proximity, less village character" },
      { name: "La Jolla Cove", slug: "la-jolla-cove", note: "Coastal bluff living with ocean views" },
    ],
    faqs: [
      { question: "How does La Jolla Village differ from coastal La Jolla subareas?", answer: "The Village is La Jolla's inland commercial center with more condos, walkable dining, and shopping. Coastal subareas like the Cove and Shores offer beach and bluff proximity with different housing types." },
      { question: "Are there condo options in La Jolla Village?", answer: "Yes, condos and townhomes are common in the Village, especially along Prospect Street and La Jolla Village Drive. They suit buyers who want La Jolla address and walkability without single-family home maintenance." },
      { question: "Is La Jolla Village walkable?", answer: "The Village core is one of the most walkable areas in La Jolla for dining, shopping, and errands. Coastal trails and beaches require a short drive or walk downhill." },
    ],
  },

  "bird-rock": {
    slug: "bird-rock",
    heroImage: "/images/neighborhoods/bird-rock-hero.jpg",
    heroImageAlt: "Bird Rock Cafe on La Jolla Boulevard, Bird Rock",
    thumbnail: "/images/neighborhoods/bird-rock-thumb.jpg",
    thumbnailAlt: "Local shops along La Jolla Boulevard in Bird Rock",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Bird Rock", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Families relocating who want La Jolla schools with a neighborhood feel",
      "Buyers seeking single-family homes south of the Village bustle",
      "Professionals commuting to UTC, Sorrento Valley, or UCSD",
      "Relocating buyers comparing Pacific Beach who want La Jolla address",
    ],
    housingOverview:
      "Bird Rock is a coastal La Jolla subarea south of the Village with predominantly single-family homes on flat to gently sloping streets. Mid-century ranch homes and updated custom builds dominate, with fewer condos than the Village or Cove. Bird Rock Avenue and the local commercial strip provide a small-scale village feel distinct from Prospect Street's density.",
    lifestyle:
      "Bird Rock has a tight-knit neighborhood identity with local coffee shops, restaurants, and a weekly farmers market on La Jolla Boulevard. Beaches are accessible via short drives or walks. The pace is quieter than La Jolla Village but more residential than Torrey Pines bluff areas.",
    commute:
      "I-5 is roughly 5 minutes via La Jolla Boulevard or Nautilus Street. UTC is roughly 10 minutes. UCSD is roughly 10–15 minutes. Downtown is roughly 25–30 minutes.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Broader coastal village with more subarea variety" },
      { name: "La Jolla Cove", slug: "la-jolla-cove", note: "Iconic bluff-top cove with more condo inventory" },
      { name: "Pacific Beach", slug: "pacific-beach", note: "More casual beach town, Garnet Avenue nightlife" },
    ],
    faqs: [
      { question: "How does Bird Rock differ from La Jolla Village?", answer: "Bird Rock is a quieter, primarily single-family neighborhood south of the Village with its own small commercial strip. The Village has more condos, dining density, and tourist foot traffic along Prospect Street." },
      { question: "Is Bird Rock good for relocating families?", answer: "Bird Rock is one of the most popular La Jolla subareas for families due to single-family homes, local schools, and neighborhood feel. Verify boundaries for your target streets." },
      { question: "What dining and shopping does Bird Rock offer?", answer: "Bird Rock Avenue and La Jolla Boulevard have local restaurants, coffee shops, and a farmers market. Larger retail runs typically go to La Jolla Village or UTC." },
    ],
  },

  "muirlands": {
    slug: "muirlands",
    heroImage: "/images/neighborhoods/muirlands-hero.jpg",
    heroImageAlt: "Panoramic view from Mount Soledad toward Muirlands, La Jolla",
    thumbnail: "/images/neighborhoods/muirlands-thumb.jpg",
    thumbnailAlt: "Hillside La Jolla canyon views in Muirlands",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Mount Soledad", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking hillside La Jolla homes with canyon or ocean views",
      "Families who want larger lots and privacy within the La Jolla address",
      "Relocating professionals with flexible commutes or remote work",
      "Buyers comparing Mount Soledad who prefer Muirlands' established streets",
    ],
    housingOverview:
      "Muirlands occupies the hills between La Jolla Village and Mount Soledad with custom and mid-century homes on generous, often canyon-adjacent lots. Winding streets and mature landscaping create a secluded feel unlike the flat terrain of Bird Rock or Shores. View premiums apply on streets with Pacific or canyon sightlines.",
    lifestyle:
      "Muirlands is quiet and residential with minimal commercial activity. Mount Soledad Memorial and hiking trails are nearby. La Jolla Village dining is roughly 5–10 minutes downhill. The subarea suits buyers who prioritize privacy, views, and lot size over walkable village access.",
    commute:
      "I-5 is roughly 10 minutes via Nautilus Street or Torrey Pines Road. UCSD is roughly 10–15 minutes. Sorrento Valley is roughly 10–15 minutes. Downtown is roughly 25–30 minutes.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Full La Jolla area including coastal and village subareas" },
      { name: "Mount Soledad", slug: "mount-soledad", note: "Higher elevation with panoramic views" },
      { name: "Bird Rock", slug: "bird-rock", note: "Flatter coastal neighborhood with local shops" },
    ],
    faqs: [
      { question: "How does Muirlands differ from other La Jolla subareas?", answer: "Muirlands is a hillside enclave with larger lots, canyon views, and a secluded residential character. Unlike the Village or Shores, it has no commercial core and limited walkability to shops or beaches." },
      { question: "Are there view homes in Muirlands?", answer: "Yes, many streets offer canyon, ocean, or city views depending on orientation and elevation. View quality varies block by block." },
      { question: "Is Muirlands good for families?", answer: "Muirlands attracts families who want space, views, and La Jolla schools. The tradeoff is less walkable access to beaches and village amenities compared to Shores or Bird Rock." },
    ],
  },

  "mount-soledad": {
    slug: "mount-soledad",
    heroImage: "/images/neighborhoods/mount-soledad-hero.jpg",
    heroImageAlt: "Mount Soledad National Veterans Memorial overlooking San Diego",
    thumbnail: "/images/neighborhoods/mount-soledad-thumb.jpg",
    thumbnailAlt: "Mount Soledad memorial cross and panoramic bay views",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Mount Soledad Memorial", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want panoramic views from La Jolla's highest elevation",
      "Relocating families seeking privacy on larger hillside lots",
      "Professionals with remote or flexible work arrangements",
      "Buyers comparing Muirlands who want maximum view potential",
    ],
    housingOverview:
      "Mount Soledad homes sit on the slopes and summit area surrounding the memorial, with a mix of mid-century ranch homes and contemporary custom builds. Lots tend to be larger with dramatic sightlines across San Diego, the ocean, and inland valleys. The terrain is steep on many streets, and some properties require careful access planning.",
    lifestyle:
      "The Mount Soledad Memorial and surrounding trails define the outdoor experience. The area is quiet and removed from La Jolla's commercial corridors. Village dining and beaches are roughly 10–15 minutes downhill. The subarea appeals to buyers who treat views and privacy as primary amenities.",
    commute:
      "I-5 is roughly 10–15 minutes via Nautilus Street or Torrey Pines Road. UCSD is roughly 10–15 minutes. Sorrento Valley is roughly 15 minutes. Downtown is roughly 25–30 minutes with the added hill climb on return trips.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Broader La Jolla with coastal and village options" },
      { name: "Muirlands", slug: "muirlands", note: "Adjacent hillside enclave with similar character" },
      { name: "Del Mar Heights", slug: "del-mar-heights", note: "North county hillside living with canyon views" },
    ],
    faqs: [
      { question: "How does Mount Soledad differ from Muirlands?", answer: "Mount Soledad sits at higher elevation with more panoramic views and steeper terrain. Muirlands is adjacent but generally at slightly lower elevation with a similar hillside residential character." },
      { question: "Are Mount Soledad views worth the tradeoffs?", answer: "Buyers who prioritize panoramic views and privacy often find Mount Soledad compelling. Tradeoffs include steep streets, longer drives to beaches and shops, and variable microclimates on exposed ridges." },
      { question: "What is access like on Mount Soledad streets?", answer: "Many streets are narrow and steep. Visit target properties at different times to assess driveway access, parking, and winter weather conditions on exposed roads." },
    ],
  },

  "windansea": {
    slug: "windansea",
    heroImage: "/images/neighborhoods/windansea-hero.jpg",
    heroImageAlt: "Windansea Beach surf shack and rocky coastline, La Jolla",
    thumbnail: "/images/neighborhoods/windansea-thumb.jpg",
    thumbnailAlt: "Windansea Beach waves along the La Jolla coast",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Windansea Beach", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers drawn to La Jolla's surf culture and rocky coastline",
      "Professionals and creatives seeking a bohemian coastal pocket",
      "Relocating buyers who want ocean proximity without Village density",
      "Second-home buyers attracted to Windansea's iconic beach character",
    ],
    housingOverview:
      "Windansea occupies the bluffs between Bird Rock and La Jolla Cove with cottages, mid-century homes, and select modern builds on narrow coastal streets. The rocky shoreline and surf break define the area's character. Housing is eclectic rather than uniform, with many properties retaining a low-profile, beach-cottage aesthetic unlike the larger homes in Muirlands or Shores.",
    lifestyle:
      "Windansea Beach is known for its surf break, palm-covered shack, and rocky tide pools. The commercial footprint is minimal with residents driving to Bird Rock or the Village for dining. The vibe is coastal and creative with a strong connection to ocean recreation.",
    commute:
      "I-5 is roughly 5–10 minutes. UCSD is roughly 10–15 minutes. Sorrento Valley is roughly 10–15 minutes. Downtown is roughly 25–30 minutes.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Full La Jolla area with village and beach subareas" },
      { name: "La Jolla Cove", slug: "la-jolla-cove", note: "Iconic cove with sea lions and bluff-top condos" },
      { name: "Pacific Beach", slug: "pacific-beach", note: "More boardwalk energy and Garnet Avenue nightlife" },
    ],
    faqs: [
      { question: "How does Windansea differ from La Jolla Shores?", answer: "Windansea has a rocky surf beach and cottage-style homes on bluff-top streets, while Shores offers a flat sandy beach and family-oriented residential streets. Windansea has a more bohemian, surf-focused character." },
      { question: "Is Windansea good for surf enthusiasts?", answer: "Windansea Beach is one of San Diego's iconic surf breaks. Buyers who prioritize surf access often find this subarea appealing despite limited on-site commercial amenities." },
      { question: "What housing types exist in Windansea?", answer: "Cottages, mid-century homes, and occasional new construction on small lots. The housing stock is eclectic and often smaller in scale than other La Jolla subareas." },
    ],
  },

  // ── Tier 3: Pacific Beach cluster ───────────────────────────────────────

  "crown-point": {
    slug: "crown-point",
    heroImage: "/images/neighborhoods/crown-point-hero.jpg",
    heroImageAlt: "Rowing crews on Mission Bay near Crown Point, San Diego",
    thumbnail: "/images/neighborhoods/crown-point-thumb.jpg",
    thumbnailAlt: "Mission Bay waterways in Crown Point, Pacific Beach",
    stats: [
      { value: "92109", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Mission Bay", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want canal-side or bay-adjacent living near Pacific Beach",
      "Water enthusiasts interested in paddleboarding, kayaking, and boating",
      "Relocating buyers comparing Mission Bay who want PB proximity",
      "Young professionals seeking a quieter pocket within the PB area",
    ],
    housingOverview:
      "Crown Point is a peninsula jutting into Mission Bay with canal-front homes, bay-view condos, and select single-family properties on the fan-shaped street grid. Unlike the Garnet Avenue corridor, Crown Point offers waterfront living with docks and canal access on many properties. Housing includes 1960s–80s builds and renovated contemporary homes.",
    lifestyle:
      "Mission Bay recreation defines Crown Point with calm water for paddle sports, sailing, and waterfront dining at nearby resorts. The area is quieter than central Pacific Beach but still within reach of Garnet Avenue. Crown Point Park provides bayfront green space.",
    commute:
      "I-5 and I-8 are roughly 5–10 minutes. UTC is roughly 15–20 minutes. Downtown is roughly 15–20 minutes. Sorrento Valley is roughly 15–20 minutes north.",
    nearbyComparisons: [
      { name: "Pacific Beach", slug: "pacific-beach", note: "Broader beach town with Garnet Avenue nightlife" },
      { name: "Mission Bay", slug: "mission-bay", note: "Adjacent bay-front condos and recreation areas" },
      { name: "Bay Park", slug: "bay-park", note: "Hillside residential with bay views to the east" },
    ],
    faqs: [
      { question: "How does Crown Point differ from Pacific Beach?", answer: "Crown Point is a bay-front peninsula with canal access and quieter residential streets, while central Pacific Beach centers on the ocean boardwalk and Garnet Avenue nightlife. Crown Point suits buyers who prioritize bay recreation over beach boardwalk energy." },
      { question: "Are there waterfront homes in Crown Point?", answer: "Yes, many canal-front properties include private docks or bay access. Bay-view condos and townhomes are also available on the peninsula." },
      { question: "Is Crown Point good for water sports?", answer: "Mission Bay's calm water makes Crown Point ideal for paddleboarding, kayaking, and sailing. The bay-front location is a primary draw for water-oriented buyers." },
    ],
  },

  "mission-beach": {
    slug: "mission-beach",
    heroImage: "/images/neighborhoods/mission-beach-hero.jpg",
    heroImageAlt: "Mission Beach boardwalk and Pacific Ocean, San Diego",
    thumbnail: "/images/neighborhoods/mission-beach-thumb.jpg",
    thumbnailAlt: "Mission Beach boardwalk on a sunny day",
    stats: [
      { value: "92109", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Belmont Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want classic boardwalk beach-town living",
      "Young professionals and couples drawn to active coastal lifestyle",
      "Relocating buyers comparing Pacific Beach who want a narrower beach strip",
      "Remote workers who prioritize beach access over commute length",
    ],
    housingOverview:
      "Mission Beach occupies a narrow strip between the ocean and Mission Bay with condos, beach cottages, and duplexes packed along Ocean Front Walk and adjacent streets. The housing density is higher than Crown Point or north PB, with many vacation-rental-adjacent properties. Belmont Park anchors the southern end with amusement rides and beachfront dining.",
    lifestyle:
      "The boardwalk, beach volleyball courts, and Belmont Park define Mission Beach's active, social atmosphere. Bay-side streets offer calmer water access. The area is livelier than Crown Point and more compact than Pacific Beach's broader grid.",
    commute:
      "I-5 and I-8 are roughly 5–10 minutes. Downtown is roughly 15–20 minutes. UTC is roughly 15–20 minutes. Sorrento Valley is roughly 20–25 minutes.",
    nearbyComparisons: [
      { name: "Pacific Beach", slug: "pacific-beach", note: "Broader beach town with Garnet Avenue corridor" },
      { name: "Mission Bay", slug: "mission-bay", note: "Bay-front recreation and calmer water access" },
      { name: "Ocean Beach", slug: "ocean-beach", note: "More laid-back local beach community to the south" },
    ],
    faqs: [
      { question: "How does Mission Beach differ from Pacific Beach?", answer: "Mission Beach is a narrow strip between ocean and bay with a continuous boardwalk and Belmont Park. Pacific Beach is a broader neighborhood with Garnet Avenue dining and a larger residential grid inland." },
      { question: "Is Mission Beach good for relocating buyers?", answer: "Mission Beach suits buyers who prioritize beach lifestyle and can accept higher density, seasonal tourism, and limited yard space. Commute-focused buyers often look inland." },
      { question: "What is Belmont Park?", answer: "Belmont Park is a beachfront amusement area with rides, restaurants, and events at the southern end of Mission Beach. It is a local landmark and activity hub." },
    ],
  },

  "mission-bay": {
    slug: "mission-bay",
    heroImage: "/images/neighborhoods/mission-bay-hero.jpg",
    heroImageAlt: "Mission Bay Park sunset, San Diego",
    thumbnail: "/images/neighborhoods/mission-bay-thumb.jpg",
    thumbnailAlt: "Mission Bay waterfront recreation area, San Diego",
    stats: [
      { value: "92109", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Mission Bay Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking bay-front condos with recreation access",
      "Families who want calm water activities over ocean surf",
      "Relocating buyers comparing Crown Point who prefer resort-adjacent living",
      "Water sports enthusiasts and boat owners",
    ],
    housingOverview:
      "Mission Bay housing consists primarily of bay-view and bay-front condos, townhomes, and vacation-oriented properties along the eastern and southern shores of the bay. Unlike Mission Beach's boardwalk strip, Mission Bay developments often sit within resort or marina complexes. Single-family homes are limited to select streets in adjacent pockets like Crown Point.",
    lifestyle:
      "Mission Bay Park offers the largest aquatic recreation area in San Diego with sailing, jet skiing, playgrounds, and picnic areas. SeaWorld and bay-front resorts are nearby. The pace is recreation-focused with less residential neighborhood character than Bay Park or Clairemont.",
    commute:
      "I-5 and I-8 are roughly 5–10 minutes. Downtown is roughly 10–15 minutes. UTC is roughly 15–20 minutes. Kearny Mesa is roughly 10–15 minutes east.",
    nearbyComparisons: [
      { name: "Pacific Beach", slug: "pacific-beach", note: "Ocean beach town with boardwalk and Garnet Avenue" },
      { name: "Crown Point", slug: "crown-point", note: "Canal-side residential peninsula within Mission Bay" },
      { name: "Bay Park", slug: "bay-park", note: "Hillside residential neighborhood east of the bay" },
    ],
    faqs: [
      { question: "How does Mission Bay differ from Mission Beach?", answer: "Mission Bay focuses on bay-front condos and recreation along calm water, while Mission Beach is the narrow ocean boardwalk strip between sea and bay. Mission Bay suits buyers who prioritize bay activities over surf beach access." },
      { question: "Are there family-friendly activities in Mission Bay?", answer: "Mission Bay Park has playgrounds, calm swimming areas, and picnic facilities. The bay's protected water is well suited to families with young children learning water sports." },
      { question: "What housing types exist in Mission Bay?", answer: "Condos and townhomes dominate bay-front inventory. Canal-side single-family homes are more common in Crown Point on the bay's western peninsula." },
    ],
  },

  // ── Tier 3: Bay Park / Point Loma / Urban ───────────────────────────────

  "morena": {
    slug: "morena",
    heroImage: "/images/neighborhoods/morena-hero.jpg",
    heroImageAlt: "Liberty Station promenade near Morena, San Diego",
    thumbnail: "/images/neighborhoods/morena-thumb.jpg",
    thumbnailAlt: "Liberty Station public market area near Morena Boulevard",
    stats: [
      { value: "92110", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Morena Blvd", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers interested in emerging development along Morena Boulevard",
      "Commuters who want central access between Bay Park and Linda Vista",
      "First-time buyers exploring infill condos and townhomes",
      "Relocating buyers comparing Bay Park who want closer trolley access",
    ],
    housingOverview:
      "Morena is an evolving corridor with a mix of older single-family homes, new condo and townhome developments, and commercial infill along Morena Boulevard. Unlike established Bay Park hillside streets, Morena includes active construction and transit-oriented projects near the Tecolote Road trolley station. Housing inventory spans decades with newer product gaining share.",
    lifestyle:
      "Morena Boulevard is transitioning with new restaurants, breweries, and retail joining longtime establishments. Bay Park and Linda Vista amenities are adjacent. Tecolote Canyon and Mission Bay remain a short drive. The area suits buyers comfortable with ongoing change and development activity.",
    commute:
      "The Tecolote Road trolley station provides transit access to downtown and Mission Valley. I-5 and I-8 are roughly 5 minutes. Downtown is roughly 10–15 minutes by car or trolley. UTC is roughly 15–20 minutes.",
    nearbyComparisons: [
      { name: "Bay Park", slug: "bay-park", note: "Established hillside residential with bay views" },
      { name: "Linda Vista", slug: "linda-vista", note: "Adjacent residential area near USD" },
      { name: "Mission Valley", slug: "mission-valley", note: "Central valley floor with major retail centers" },
    ],
    faqs: [
      { question: "How does Morena differ from Bay Park?", answer: "Morena is a developing corridor with new construction and transit access along Morena Boulevard. Bay Park is an established hillside residential area with mature homes and canyon views." },
      { question: "Is Morena good for trolley commuters?", answer: "The Tecolote Road trolley station makes Morena one of the more transit-accessible pockets near Mission Bay. Buyers commuting downtown or to Mission Valley may find this convenient." },
      { question: "What new development is happening in Morena?", answer: "Morena Boulevard has seen condo, townhome, and mixed-use projects in recent years. Buyers should research specific projects and construction timelines near target addresses." },
    ],
  },

  "old-town": {
    slug: "old-town",
    heroImage: "/images/neighborhoods/old-town-hero.jpg",
    heroImageAlt: "Old Town San Diego historic plaza and adobe buildings",
    thumbnail: "/images/neighborhoods/old-town-thumb.jpg",
    thumbnailAlt: "Old Town San Diego State Historic Park streetscape",
    stats: [
      { value: "92110", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Old Town San Diego State Historic Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers drawn to historic San Diego character and State Historic Park proximity",
      "Commuters who want central access near downtown and the trolley",
      "Relocating buyers interested in Mexican heritage dining and tourism-adjacent living",
      "Investors and owner-occupants near the Old Town Transit Center",
    ],
    housingOverview:
      "Old Town San Diego features a mix of historic adobe-influenced homes, condos, and townhomes on the flats at the base of Presidio Hill. Unlike the residential peninsula of Point Loma, Old Town housing is interspersed with state park land, hotels, and commercial tourism uses. Inventory includes both renovated historic properties and newer infill near the transit center.",
    lifestyle:
      "Old Town State Historic Park, Mexican dining on San Diego Avenue, and the Old Town Transit Center define daily life. The area draws tourists but offers walkable dining and transit for residents. Presidio Park and Mission Hills are uphill for additional green space.",
    commute:
      "The Old Town Transit Center connects trolley and bus lines to downtown, Mission Valley, and beyond. I-5 and I-8 intersect nearby. Downtown is roughly 5–10 minutes. The airport is roughly 5 minutes. UTC is roughly 20 minutes north.",
    nearbyComparisons: [
      { name: "Point Loma", slug: "point-loma", note: "Peninsula residential living with Liberty Station" },
      { name: "Mission Hills", slug: "mission-hills", note: "Historic residential streets above Old Town" },
      { name: "Midway District", slug: "midway-district", note: "Redeveloping area near the airport and sports arena" },
    ],
    faqs: [
      { question: "How does Old Town differ from Point Loma?", answer: "Old Town is a historic flatland district with state park land, tourism, and transit at the base of Point Loma peninsula. Point Loma offers peninsula residential living with bay views and Liberty Station." },
      { question: "Is Old Town good for transit commuters?", answer: "The Old Town Transit Center is a major hub with trolley access to downtown, Mission Valley, and other corridors. It suits buyers who want to reduce car dependence." },
      { question: "Does tourism affect Old Town residents?", answer: "Tourism activity is concentrated around the state park and San Diego Avenue. Residential streets off the main corridors are quieter, but buyers should visit at different times to assess noise and parking." },
    ],
  },

  "midway-district": {
    slug: "midway-district",
    heroImage: "/images/neighborhoods/midway-district-hero.jpg",
    heroImageAlt: "Aerial view of San Diego International Airport and Midway area",
    thumbnail: "/images/neighborhoods/midway-district-thumb.jpg",
    thumbnailAlt: "San Diego airport and Liberty Station from above",
    stats: [
      { value: "92110", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Pechanga Arena", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers interested in redevelopment potential near the sports arena",
      "Commuters who want airport proximity and central freeway access",
      "Investors watching the Midway-Pacific Highway corridor transformation",
      "Relocating buyers comparing Mission Valley who want lower entry points",
    ],
    housingOverview:
      "The Midway District is a transitioning area with older commercial buildings, some residential pockets, and active redevelopment plans near Pechanga Arena and the Sports Arena site. Unlike established Point Loma neighborhoods, Midway housing includes a mix of aging apartments, converted units, and new projects. The landscape is evolving rather than settled.",
    lifestyle:
      "Pechanga Arena events, the airport, and commercial corridors define the current character. Liberty Station and Point Loma dining are a short drive west. The area lacks the neighborhood cohesion of Point Loma Heights but offers central access and redevelopment upside for buyers comfortable with change.",
    commute:
      "I-5 and I-8 provide immediate freeway access. San Diego International Airport is roughly 5 minutes. Downtown is roughly 10 minutes. Old Town trolley is roughly 5 minutes. Most central San Diego destinations are within roughly 15–20 minutes.",
    nearbyComparisons: [
      { name: "Point Loma", slug: "point-loma", note: "Established peninsula residential with Liberty Station" },
      { name: "Old Town", slug: "old-town", note: "Historic district with state park and transit hub" },
      { name: "Mission Valley", slug: "mission-valley", note: "Central retail and condo corridor" },
    ],
    faqs: [
      { question: "How does the Midway District differ from Point Loma?", answer: "The Midway District is a commercial and redevelopment zone near the arena and airport, while Point Loma is established peninsula residential living. Midway suits buyers interested in transformation rather than settled neighborhood character." },
      { question: "Is the Midway District good for airport commuters?", answer: "Airport proximity is a primary advantage. Buyers who travel frequently may find the location convenient despite commercial surroundings." },
      { question: "What redevelopment is planned for the Midway District?", answer: "The Sports Arena site and surrounding corridors have seen planning activity for mixed-use development. Buyers should research current project status and timelines for specific areas." },
    ],
  },

  "point-loma-heights": {
    slug: "point-loma-heights",
    heroImage: "/images/neighborhoods/point-loma-heights-hero.jpg",
    heroImageAlt: "Cabrillo National Monument overlooking Point Loma Heights",
    thumbnail: "/images/neighborhoods/point-loma-heights-thumb.jpg",
    thumbnailAlt: "Cabrillo National Monument visitor center on Point Loma",
    stats: [
      { value: "92106", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Liberty Station", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Families relocating who want hillside Point Loma homes with bay views",
      "Buyers seeking single-family homes above the peninsula flats",
      "Military families considering Naval Base Point Loma proximity",
      "Relocating buyers comparing Ocean Beach who want more privacy and views",
    ],
    housingOverview:
      "Point Loma Heights sits on the hills above the peninsula flats with single-family homes ranging from modest ranch-style to view-enhanced custom builds. Unlike Liberty Station's condo inventory or Ocean Beach's flat grid, Heights properties often sit on sloped lots with bay or city sightlines. Streets are quieter and more residential than the commercial corridors below.",
    lifestyle:
      "Heights residents enjoy elevated views and proximity to Liberty Station, Cabrillo National Monument, and Sunset Cliffs. Daily errands route through Liberty Station or Rosecrans Street. The feel is residential and local compared to Old Town's tourism or Midway's commercial activity.",
    commute:
      "I-5 and I-8 are roughly 5–10 minutes downhill. Downtown is roughly 10–15 minutes. Naval Base Point Loma is roughly 10 minutes. The airport is roughly 10–15 minutes with potential aircraft noise at lower elevations.",
    nearbyComparisons: [
      { name: "Point Loma", slug: "point-loma", note: "Full peninsula including Liberty Station and flats" },
      { name: "Ocean Beach", slug: "ocean-beach", note: "Flat beach community with OB Pier and local shops" },
      { name: "Old Town", slug: "old-town", note: "Historic flatland district with transit access" },
    ],
    faqs: [
      { question: "How does Point Loma Heights differ from the Point Loma peninsula flats?", answer: "Point Loma Heights is the elevated residential area with hillside homes and views, while the flats include Liberty Station, bay-front condos, and commercial corridors at sea level." },
      { question: "Are there view homes in Point Loma Heights?", answer: "Yes, bay and city views are common on elevated streets. View quality and orientation vary by block and lot position on the hillside." },
      { question: "Is Point Loma Heights good for military families?", answer: "Naval Base Point Loma is roughly 10 minutes away. The Heights offers residential privacy and family-sized homes convenient to base commutes." },
    ],
  },

  "university-heights": {
    slug: "university-heights",
    heroImage: "/images/neighborhoods/university-heights-hero.jpg",
    heroImageAlt: "University Heights Library on Washington Street, San Diego",
    thumbnail: "/images/neighborhoods/university-heights-thumb.jpg",
    thumbnailAlt: "University Heights neighborhood branch library",
    stats: [
      { value: "92116", label: "ZIP Code" },
      { value: "I-805 · SR-163", label: "Freeway Access" },
      { value: "Trolley Barn Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking walkable urban living between Hillcrest and North Park",
      "Young professionals who want Adams Avenue and University Avenue access",
      "Relocating buyers comparing Normal Heights who want slightly more elevation",
      "First-time buyers interested in character bungalows and duplexes",
    ],
    housingOverview:
      "University Heights features Craftsman bungalows, Spanish Revival homes, duplexes, and newer infill on sloping streets between Hillcrest and North Park. Unlike Hillcrest's condo density, University Heights retains more single-family and duplex character. Adams Avenue and University Avenue provide commercial access without the intensity of Hillcrest's core.",
    lifestyle:
      "Trolley Barn Park, Adams Avenue dining, and proximity to both Hillcrest and North Park define the area. The Trolley Barn Market offers local food vendors. The vibe sits between Hillcrest's established urban village and North Park's trendier scene.",
    commute:
      "SR-163 and I-805 are roughly 5–10 minutes. Downtown is roughly 10 minutes. Hillcrest medical centers are roughly 5 minutes. UTC and Sorrento Valley are roughly 25–30 minutes north.",
    nearbyComparisons: [
      { name: "Hillcrest", slug: "hillcrest", note: "More commercial density and Balboa Park proximity" },
      { name: "North Park", slug: "north-park", note: "Trendier dining scene along 30th Street" },
      { name: "Normal Heights", slug: "normal-heights", note: "Quieter residential with Adams Avenue nearby" },
    ],
    faqs: [
      { question: "How does University Heights differ from Hillcrest?", answer: "University Heights is primarily residential with bungalows and duplexes on sloping streets, while Hillcrest has more commercial density and condo inventory. Both offer walkable access to dining and central San Diego." },
      { question: "Is University Heights walkable?", answer: "Adams Avenue and University Avenue corridors are walkable for dining and errands. Hillcrest and North Park are reachable on foot from many blocks." },
      { question: "What housing types exist in University Heights?", answer: "Craftsman bungalows, duplexes, and Spanish Revival homes dominate, with newer infill on select lots. Condos are less common than in Hillcrest." },
    ],
  },

  "normal-heights": {
    slug: "normal-heights",
    heroImage: "/images/neighborhoods/normal-heights-hero.jpg",
    heroImageAlt: "Normal Heights neighborhood streetscape, San Diego",
    thumbnail: "/images/neighborhoods/normal-heights-thumb.jpg",
    thumbnailAlt: "Residential street in Normal Heights near Adams Avenue",
    stats: [
      { value: "92116", label: "ZIP Code" },
      { value: "SR-163 · I-805", label: "Freeway Access" },
      { value: "Adams Avenue", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want residential quiet with Adams Avenue dining nearby",
      "First-time buyers seeking character homes at urban San Diego price points",
      "Relocating buyers comparing North Park who prefer less nightlife intensity",
      "Families who want central location with neighborhood yard space",
    ],
    housingOverview:
      "Normal Heights offers Craftsman bungalows, ranch homes, and duplexes on flat residential streets between Adams Avenue and El Cajon Boulevard. Unlike North Park's 30th Street corridor intensity, Normal Heights is primarily residential with commercial activity concentrated along Adams Avenue's eastern segment. Lot sizes are generally modest but include usable yards.",
    lifestyle:
      "Adams Avenue provides dining, coffee shops, and the Adams Avenue Street Fair. The area is quieter than North Park's 30th Street scene while sharing access to Morley Field and Balboa Park. Normal Heights suits buyers who want urban proximity without living on a nightlife corridor.",
    commute:
      "SR-163 and I-805 are roughly 5–10 minutes. Downtown is roughly 10–15 minutes. Hillcrest is roughly 5–10 minutes. UTC is roughly 25–30 minutes north.",
    nearbyComparisons: [
      { name: "North Park", slug: "north-park", note: "Trendier 30th Street dining and craft beer scene" },
      { name: "University Heights", slug: "university-heights", note: "Adjacent area between Hillcrest and North Park" },
      { name: "Hillcrest", slug: "hillcrest", note: "Walkable urban village near Balboa Park" },
    ],
    faqs: [
      { question: "How does Normal Heights differ from North Park?", answer: "Normal Heights is a quieter residential area with Adams Avenue dining nearby, while North Park has a denser, trendier commercial core along 30th Street. Normal Heights suits buyers who want urban access with less foot traffic on residential streets." },
      { question: "Is Normal Heights good for first-time buyers?", answer: "Normal Heights can offer character homes at lower entry points than coastal areas. Bungalows and duplexes provide options for buyers entering the urban San Diego market." },
      { question: "What is Adams Avenue like in Normal Heights?", answer: "The Adams Avenue corridor through Normal Heights has local restaurants, shops, and community events including the Adams Avenue Street Fair. It provides walkable dining without North Park's late-night intensity." },
    ],
  },

  "bankers-hill": {
    slug: "bankers-hill",
    heroImage: "/images/neighborhoods/bankers-hill-hero.jpg",
    heroImageAlt: "Balboa Park Botanical Building close-up near Bankers Hill",
    thumbnail: "/images/neighborhoods/bankers-hill-thumb.jpg",
    thumbnailAlt: "Botanical Building lily pond in Balboa Park, San Diego",
    stats: [
      { value: "92101", label: "ZIP Code" },
      { value: "I-5 · SR-163", label: "Freeway Access" },
      { value: "Balboa Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking upscale urban living adjacent to Balboa Park",
      "Professionals working downtown who want a residential hilltop address",
      "Relocating buyers comparing Hillcrest who want closer downtown proximity",
      "Empty nesters interested in historic homes with park access",
    ],
    housingOverview:
      "Bankers Hill features historic mansions, Spanish Revival estates, and high-rise condos on the hill between Balboa Park and downtown. Unlike Hillcrest's mixed commercial-residential grid, Bankers Hill is predominantly residential with larger lot sizes on select streets. Condos in mid-rise and high-rise buildings offer downtown and bay views.",
    lifestyle:
      "Balboa Park is the backyard with museums, trails, and the zoo within walking distance. Fifth Avenue and Fourth Avenue have local dining. The Prado and Spruce Street Suspension Bridge are local landmarks. The pace is upscale residential with park access rather than nightlife-focused.",
    commute:
      "Downtown is roughly 5 minutes downhill. Hillcrest is roughly 5 minutes north. I-5 and SR-163 are roughly 5 minutes. UTC is roughly 20–25 minutes. Walking or biking to downtown is feasible from many addresses.",
    nearbyComparisons: [
      { name: "Hillcrest", slug: "hillcrest", note: "More commercial walkability and dining density" },
      { name: "Balboa Park", slug: "balboa-park", note: "Park-adjacent residential on the park's perimeter" },
      { name: "Little Italy", slug: "little-italy", note: "Waterfront urban village with farmers market" },
    ],
    faqs: [
      { question: "How does Bankers Hill differ from Hillcrest?", answer: "Bankers Hill is an upscale residential hilltop between Balboa Park and downtown with historic estates and high-rise condos. Hillcrest has more commercial density and a walkable village core along University Avenue." },
      { question: "Is Bankers Hill good for downtown commuters?", answer: "Bankers Hill is one of the closest residential neighborhoods to downtown with walkable and bikeable access. It suits buyers who work in the urban core." },
      { question: "Are there condo options in Bankers Hill?", answer: "Yes, high-rise and mid-rise condos offer downtown and bay views. Historic single-family homes are also available on select streets." },
    ],
  },

  "little-italy": {
    slug: "little-italy",
    heroImage: "/images/neighborhoods/little-italy-hero.jpg",
    heroImageAlt: "Little Italy neighborhood street in downtown San Diego",
    thumbnail: "/images/neighborhoods/little-italy-thumb.jpg",
    thumbnailAlt: "Little Italy sign and urban village streetscape",
    stats: [
      { value: "92101", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Little Italy Mercato", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want waterfront urban village living downtown",
      "Professionals seeking walkable dining and farmers market access",
      "Relocating buyers comparing downtown high-rises who prefer neighborhood feel",
      "Empty nesters downsizing to condo living with cultural amenities",
    ],
    housingOverview:
      "Little Italy consists primarily of mid-rise and high-rise condos, lofts, and select townhomes along India Street and the waterfront. Unlike the Gaslamp's hotel and entertainment density, Little Italy maintains a residential village identity with ground-floor dining and the Saturday Mercato farmers market. Newer towers along the waterfront offer bay views.",
    lifestyle:
      "India Street dining, the Mercato farmers market, and waterfront parks define Little Italy's daily rhythm. The neighborhood has a strong Italian heritage identity with modern urban amenities. Pet-friendly patios and walkable errands attract residents who prioritize urban lifestyle.",
    commute:
      "Downtown offices are walkable or a short trolley ride. The County Center/Little Italy trolley station provides regional transit. I-5 is roughly 5 minutes. The airport is roughly 5–10 minutes. UTC is roughly 20–25 minutes north.",
    nearbyComparisons: [
      { name: "Downtown San Diego", slug: "downtown-san-diego", note: "Broader urban core including Gaslamp and East Village" },
      { name: "Bankers Hill", slug: "bankers-hill", note: "Upscale residential hilltop near Balboa Park" },
      { name: "Point Loma", slug: "point-loma", note: "Peninsula living with bay views and Liberty Station" },
    ],
    faqs: [
      { question: "How does Little Italy differ from downtown San Diego?", answer: "Little Italy is a defined urban village with residential condos, India Street dining, and a farmers market. Downtown encompasses the broader Gaslamp, East Village, and high-rise core with more entertainment and office density." },
      { question: "Is Little Italy walkable?", answer: "Little Italy is highly walkable for dining, the farmers market, and waterfront parks. Downtown offices and the waterfront are accessible on foot or by trolley." },
      { question: "Are there condo options in Little Italy?", answer: "Condos and lofts dominate the housing inventory, from historic conversions to newer waterfront towers. Little Italy suits buyers who want urban ownership without single-family maintenance." },
    ],
  },

  "downtown-san-diego": {
    slug: "downtown-san-diego",
    heroImage: "/images/neighborhoods/downtown-san-diego-hero.jpg",
    heroImageAlt: "Gaslamp Quarter historic streetscape, downtown San Diego",
    thumbnail: "/images/neighborhoods/downtown-san-diego-thumb.jpg",
    thumbnailAlt: "Gaslamp Quarter nightlife district, San Diego",
    stats: [
      { value: "92101", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Gaslamp Quarter", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want high-rise urban living in San Diego's urban core",
      "Professionals working downtown who want a walk-to-work lifestyle",
      "Relocating buyers comparing Little Italy who want Gaslamp or East Village access",
      "Investors interested in downtown condo inventory and rental demand",
    ],
    housingOverview:
      "Downtown San Diego encompasses the Gaslamp Quarter, East Village, Columbia District, and Marina with high-rise condos, lofts, and select townhomes. Unlike Little Italy's village scale, downtown includes the tallest residential towers and mixed-use developments near Petco Park and the convention center. Inventory spans historic conversions to new luxury high-rises.",
    lifestyle:
      "Gaslamp dining, Petco Park, the waterfront, and East Village breweries define downtown living. Cultural venues, the convention center, and cruise ship terminal add activity. The pace is urban and active with entertainment options beyond what neighborhood villages like Hillcrest offer.",
    commute:
      "Walk-to-work is the primary commute mode for downtown residents. Trolley and bus lines connect to Mission Valley, Old Town, and border routes. I-5 is roughly 5 minutes. UTC is roughly 20–25 minutes north. Most downtown employment is within walking distance.",
    nearbyComparisons: [
      { name: "Little Italy", slug: "little-italy", note: "Waterfront village with farmers market and India Street" },
      { name: "Bankers Hill", slug: "bankers-hill", note: "Residential hilltop near Balboa Park" },
      { name: "Hillcrest", slug: "hillcrest", note: "Walkable urban village north of downtown" },
    ],
    faqs: [
      { question: "How does downtown San Diego differ from Little Italy?", answer: "Downtown encompasses the full urban core with high-rises, the Gaslamp, East Village, and convention center activity. Little Italy is a smaller, village-scale neighborhood within the downtown area with its own dining identity." },
      { question: "Is downtown San Diego good for relocating professionals?", answer: "Downtown suits professionals who work in the urban core and want walk-to-work convenience. Buyers with north county commutes may find Hillcrest or UTC more practical." },
      { question: "What condo options exist downtown?", answer: "High-rise and mid-rise condos dominate, from entry-level studios to luxury penthouses. East Village and the Marina have seen significant new construction in recent years." },
      { question: "Is downtown walkable?", answer: "Downtown is San Diego's most walkable area for employment, dining, and entertainment. A car is less essential for daily life than in suburban neighborhoods." },
    ],
  },

  "balboa-park": {
    slug: "balboa-park",
    heroImage: "/images/neighborhoods/balboa-park-hero.jpg",
    heroImageAlt: "Balboa Park Botanical Building and lily pond, San Diego",
    thumbnail: "/images/neighborhoods/balboa-park-thumb.jpg",
    thumbnailAlt: "Balboa Park Botanical Building reflected in the lily pond",
    stats: [
      { value: "92101", label: "ZIP Code" },
      { value: "I-805 · SR-163", label: "Freeway Access" },
      { value: "Balboa Park Museums", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want park-adjacent living with museum and trail access",
      "Culture enthusiasts prioritizing Balboa Park as a daily amenity",
      "Relocating buyers comparing Bankers Hill who want park-perimeter addresses",
      "Professionals working at nearby medical centers or downtown",
    ],
    housingOverview:
      "Balboa Park as a search area refers to residential neighborhoods on the park's perimeter in Bankers Hill, Hillcrest, and Golden Hill adjacency. Housing includes historic single-family homes, condos, and apartments on streets that back directly to park trails. Unlike downtown high-rises, park-perimeter homes often offer yards and architectural character with park views.",
    lifestyle:
      "Balboa Park's 1,200 acres provide museums, the zoo, botanical gardens, and trail networks as daily amenities. The Prado, Organ Pavilion, and international cottages host events year-round. Residents in park-adjacent neighborhoods walk to cultural attractions that visitors drive across the county to visit.",
    commute:
      "Downtown is roughly 5–10 minutes. Hillcrest and medical centers are roughly 5 minutes. SR-163 and I-805 provide regional access. UTC is roughly 20–25 minutes north.",
    nearbyComparisons: [
      { name: "Hillcrest", slug: "hillcrest", note: "Walkable urban village directly north of the park" },
      { name: "Bankers Hill", slug: "bankers-hill", note: "Upscale residential hilltop on the park's west side" },
      { name: "Mission Hills", slug: "mission-hills", note: "Historic homes near Presidio Park north of the park" },
    ],
    faqs: [
      { question: "How does living near Balboa Park differ from living in Hillcrest?", answer: "Park-adjacent addresses offer direct trail and museum access with a greener, quieter residential feel. Hillcrest's commercial core along University Avenue is more walkable for daily dining and errands." },
      { question: "Is Balboa Park area good for culture-focused buyers?", answer: "Park-perimeter neighborhoods provide unmatched access to museums, the zoo, gardens, and events. Buyers who prioritize cultural amenities often find this area compelling." },
      { question: "What housing types exist near Balboa Park?", answer: "Historic single-family homes, condos, and apartments line the park perimeter in Bankers Hill, Hillcrest, and adjacent areas. Park-view premiums apply on select streets." },
    ],
  },
};
