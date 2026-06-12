export const LIFESTYLE_TAGS = [
  "Coastal",
  "Close to UCSD/UTC",
  "Commute-friendly",
  "More affordable nearby",
  "Nightlife/walkability",
  "Family-oriented",
  "Military/commute considerations",
] as const;

export type LifestyleTag = (typeof LIFESTYLE_TAGS)[number];

export type CommunityTier = 1 | 2 | 3;

export type Community = {
  slug: string;
  name: string;
  tagline: string;
  tier: CommunityTier;
  lifestyles: LifestyleTag[];
  hasGuide: boolean;
  parentSlug?: string;
};

export const launchCommunitySlugs = [
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

export const communities: Community[] = [
  // Tier 1 — launch guides
  { slug: "la-jolla", name: "La Jolla", tagline: "Coastal village living with ocean views, UCSD proximity, and upscale amenities.", tier: 1, lifestyles: ["Coastal", "Close to UCSD/UTC", "Family-oriented"], hasGuide: true },
  { slug: "pacific-beach", name: "Pacific Beach", tagline: "Beach-town energy with boardwalk access and a younger, active vibe.", tier: 1, lifestyles: ["Coastal", "Nightlife/walkability"], hasGuide: true },
  { slug: "university-city", name: "University City / UTC", tagline: "Central location near UCSD, biotech corridor, and Westfield UTC.", tier: 1, lifestyles: ["Close to UCSD/UTC", "Commute-friendly", "Family-oriented"], hasGuide: true },
  { slug: "clairemont", name: "Clairemont", tagline: "Established central neighborhoods with more space and value.", tier: 1, lifestyles: ["Commute-friendly", "More affordable nearby", "Family-oriented"], hasGuide: true },
  { slug: "mission-valley", name: "Mission Valley", tagline: "Central hub with freeway access, shopping, and condo options.", tier: 1, lifestyles: ["Commute-friendly", "More affordable nearby"], hasGuide: true },
  { slug: "del-mar", name: "Del Mar", tagline: "Upscale coastal community known for the Del Mar Fairgrounds and village charm.", tier: 1, lifestyles: ["Coastal", "Family-oriented"], hasGuide: true },
  { slug: "carmel-valley", name: "Carmel Valley", tagline: "Master-planned suburban feel with top schools and family amenities.", tier: 1, lifestyles: ["Family-oriented", "Close to UCSD/UTC", "Commute-friendly"], hasGuide: true },
  { slug: "point-loma", name: "Point Loma", tagline: "Peninsula living with bay views, Liberty Station, and a relaxed coastal feel.", tier: 1, lifestyles: ["Coastal", "Military/commute considerations", "Family-oriented"], hasGuide: true },
  { slug: "sorrento-valley", name: "Sorrento Valley / Sorrento Mesa", tagline: "Biotech and tech corridor with newer condos and townhomes.", tier: 1, lifestyles: ["Close to UCSD/UTC", "Commute-friendly"], hasGuide: true },
  // Tier 2 — launch guides
  { slug: "bay-park", name: "Bay Park", tagline: "Hillside views and bay breezes between Clairemont and Mission Bay.", tier: 2, lifestyles: ["More affordable nearby", "Family-oriented"], hasGuide: true },
  { slug: "ocean-beach", name: "Ocean Beach", tagline: "Laid-back beach community with a strong local identity.", tier: 2, lifestyles: ["Coastal", "Nightlife/walkability"], hasGuide: true },
  { slug: "hillcrest", name: "Hillcrest", tagline: "Walkable urban village near Balboa Park with dining and nightlife.", tier: 2, lifestyles: ["Nightlife/walkability", "Commute-friendly"], hasGuide: true },
  { slug: "north-park", name: "North Park", tagline: "Trendy, walkable neighborhood popular with young professionals.", tier: 2, lifestyles: ["Nightlife/walkability", "More affordable nearby"], hasGuide: true },
  // Tier 2 — metadata only
  { slug: "bay-ho", name: "Bay Ho", tagline: "Quiet residential pocket near Mission Bay.", tier: 2, lifestyles: ["Family-oriented", "More affordable nearby"], hasGuide: false, parentSlug: "bay-park" },
  { slug: "north-clairemont", name: "North Clairemont", tagline: "Residential area with canyon views and central access.", tier: 2, lifestyles: ["Commute-friendly", "More affordable nearby"], hasGuide: false, parentSlug: "clairemont" },
  { slug: "kearny-mesa", name: "Kearny Mesa", tagline: "Commercial and residential hub with diverse dining.", tier: 2, lifestyles: ["Commute-friendly"], hasGuide: false, parentSlug: "clairemont" },
  { slug: "linda-vista", name: "Linda Vista", tagline: "Diverse community near USD and Mission Valley.", tier: 2, lifestyles: ["More affordable nearby", "Commute-friendly"], hasGuide: false, parentSlug: "mission-valley" },
  { slug: "mission-hills", name: "Mission Hills", tagline: "Historic homes and tree-lined streets near downtown.", tier: 2, lifestyles: ["Nightlife/walkability"], hasGuide: false, parentSlug: "hillcrest" },
  { slug: "torrey-pines", name: "Torrey Pines", tagline: "Scenic coastal bluffs and golf course area.", tier: 2, lifestyles: ["Coastal", "Close to UCSD/UTC"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "del-mar-heights", name: "Del Mar Heights", tagline: "Residential hills above Del Mar with canyon views.", tier: 2, lifestyles: ["Family-oriented", "Coastal"], hasGuide: false, parentSlug: "del-mar" },
  { slug: "torrey-hills", name: "Torrey Hills", tagline: "Family-friendly area between Carmel Valley and Torrey Pines.", tier: 2, lifestyles: ["Family-oriented", "Close to UCSD/UTC"], hasGuide: false, parentSlug: "carmel-valley" },
  { slug: "civita", name: "Civita", tagline: "Newer master-planned community in Mission Valley.", tier: 2, lifestyles: ["Family-oriented", "Commute-friendly"], hasGuide: false, parentSlug: "mission-valley" },
  { slug: "serra-mesa", name: "Serra Mesa", tagline: "Central location near SDSU and Mission Valley.", tier: 2, lifestyles: ["Commute-friendly", "More affordable nearby"], hasGuide: false, parentSlug: "mission-valley" },
  // Tier 3 — grouped under parents
  { slug: "la-jolla-cove", name: "La Jolla Cove", tagline: "Iconic cove area with sea lions and coastal dining.", tier: 3, lifestyles: ["Coastal"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "la-jolla-shores", name: "La Jolla Shores", tagline: "Family-friendly beach with kayak rentals and calm waters.", tier: 3, lifestyles: ["Coastal", "Family-oriented"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "la-jolla-village", name: "La Jolla Village", tagline: "Shopping and dining hub of La Jolla.", tier: 3, lifestyles: ["Coastal", "Nightlife/walkability"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "bird-rock", name: "Bird Rock", tagline: "Coastal neighborhood south of La Jolla with local shops.", tier: 3, lifestyles: ["Coastal", "Family-oriented"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "muirlands", name: "Muirlands", tagline: "Hillside La Jolla enclave with canyon and ocean views.", tier: 3, lifestyles: ["Coastal", "Family-oriented"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "mount-soledad", name: "Mount Soledad", tagline: "Elevated La Jolla area with panoramic views.", tier: 3, lifestyles: ["Coastal", "Family-oriented"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "windansea", name: "Windansea", tagline: "Surf culture and rocky coastline in La Jolla.", tier: 3, lifestyles: ["Coastal"], hasGuide: false, parentSlug: "la-jolla" },
  { slug: "crown-point", name: "Crown Point", tagline: "Canal-side living in Pacific Beach.", tier: 3, lifestyles: ["Coastal", "Nightlife/walkability"], hasGuide: false, parentSlug: "pacific-beach" },
  { slug: "mission-beach", name: "Mission Beach", tagline: "Classic boardwalk beach town between PB and Belmont Park.", tier: 3, lifestyles: ["Coastal", "Nightlife/walkability"], hasGuide: false, parentSlug: "pacific-beach" },
  { slug: "mission-bay", name: "Mission Bay", tagline: "Waterfront recreation and bay-side condos.", tier: 3, lifestyles: ["Coastal", "Family-oriented"], hasGuide: false, parentSlug: "pacific-beach" },
  { slug: "morena", name: "Morena", tagline: "Emerging area near Bay Park and Linda Vista.", tier: 3, lifestyles: ["More affordable nearby", "Commute-friendly"], hasGuide: false, parentSlug: "bay-park" },
  { slug: "old-town", name: "Old Town San Diego", tagline: "Historic district with Mexican heritage and tourism.", tier: 3, lifestyles: ["Nightlife/walkability", "Commute-friendly"], hasGuide: false, parentSlug: "point-loma" },
  { slug: "midway-district", name: "Midway District", tagline: "Redeveloping area near the airport and sports arena.", tier: 3, lifestyles: ["Commute-friendly", "More affordable nearby"], hasGuide: false, parentSlug: "point-loma" },
  { slug: "point-loma-heights", name: "Point Loma Heights", tagline: "Residential hills above Point Loma peninsula.", tier: 3, lifestyles: ["Coastal", "Family-oriented"], hasGuide: false, parentSlug: "point-loma" },
  { slug: "university-heights", name: "University Heights", tagline: "Walkable neighborhood between Hillcrest and North Park.", tier: 3, lifestyles: ["Nightlife/walkability"], hasGuide: false, parentSlug: "hillcrest" },
  { slug: "normal-heights", name: "Normal Heights", tagline: "Residential area with Adams Avenue dining nearby.", tier: 3, lifestyles: ["Nightlife/walkability", "More affordable nearby"], hasGuide: false, parentSlug: "north-park" },
  { slug: "bankers-hill", name: "Bankers Hill", tagline: "Upscale urban living near Balboa Park.", tier: 3, lifestyles: ["Nightlife/walkability", "Commute-friendly"], hasGuide: false, parentSlug: "hillcrest" },
  { slug: "little-italy", name: "Little Italy", tagline: "Waterfront urban village with farmers market and dining.", tier: 3, lifestyles: ["Nightlife/walkability", "Commute-friendly"], hasGuide: false, parentSlug: "downtown-san-diego" },
  { slug: "downtown-san-diego", name: "Downtown San Diego", tagline: "Urban high-rise living in the Gaslamp and East Village.", tier: 3, lifestyles: ["Nightlife/walkability", "Commute-friendly"], hasGuide: false, parentSlug: "hillcrest" },
  { slug: "balboa-park", name: "Balboa Park", tagline: "Cultural heart of San Diego surrounded by residential neighborhoods.", tier: 3, lifestyles: ["Nightlife/walkability"], hasGuide: false, parentSlug: "hillcrest" },
];

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}

export function getLaunchCommunities(): Community[] {
  return communities.filter((c) => c.hasGuide);
}

export function getRelatedCommunities(slug: string, limit = 3): Community[] {
  const current = getCommunityBySlug(slug);
  if (!current) return [];

  return communities
    .filter(
      (c) =>
        c.slug !== slug &&
        c.hasGuide &&
        c.lifestyles.some((l) => current.lifestyles.includes(l)),
    )
    .slice(0, limit);
}
