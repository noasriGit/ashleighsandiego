/**
 * County-wide coverage for /san-diego-suburbs and /cities-near-san-diego.
 * Deliberately separate from communities.ts: these are incorporated cities and
 * unincorporated communities OUTSIDE the City of San Diego, so this file must
 * never be merged into (or list overlap with) the City-of-San-Diego neighborhood
 * directory. See docs/seo-rebuild-plan.md §9 (page-type model for county pages).
 */

export type Suburb = {
  slug: string;
  name: string;
  /** "suburb": close-in, commonly cross-shopped against City of San Diego coastal/central areas. */
  /** "city": broader incorporated city, listed on /cities-near-san-diego but not /san-diego-suburbs. */
  category: "suburb" | "city";
  distanceFromDowntown: string;
  description: string;
  goodFor: string;
};

export const suburbs: Suburb[] = [
  {
    slug: "coronado",
    name: "Coronado",
    category: "suburb",
    distanceFromDowntown: "10 minutes (via bridge)",
    description:
      "An island-like peninsula city with the Hotel del Coronado, a walkable Orange Avenue village, and some of the county's highest per-square-foot prices.",
    goodFor: "Buyers who want small-town, low-density coastal living with quick bridge access to downtown.",
  },
  {
    slug: "la-mesa",
    name: "La Mesa",
    category: "suburb",
    distanceFromDowntown: "15 minutes",
    description:
      "An inland city with a historic downtown village, trolley access, and single-family homes at lower price points than coastal San Diego.",
    goodFor: "Buyers who want more square footage and a walkable downtown without coastal pricing.",
  },
  {
    slug: "santee",
    name: "Santee",
    category: "suburb",
    distanceFromDowntown: "20 minutes",
    description:
      "An East County suburb along the San Diego River with newer subdivisions, Santee Lakes recreation, and some of the county's larger lot sizes.",
    goodFor: "Buyers prioritizing lot size and newer construction over commute time.",
  },
  {
    slug: "poway",
    name: "Poway",
    category: "suburb",
    distanceFromDowntown: "25 minutes",
    description:
      "Known locally as \"The City in the Country,\" with horse-property zoning in some pockets, top-rated schools, and a semi-rural feel.",
    goodFor: "Buyers who want acreage, equestrian zoning, or larger single-family lots inland.",
  },
  {
    slug: "encinitas",
    name: "Encinitas",
    category: "suburb",
    distanceFromDowntown: "30 minutes",
    description:
      "A North County coastal city encompassing Cardiff, Leucadia, and Olivenhain, with surf culture, farm-to-table dining, and premium beach pricing.",
    goodFor: "Buyers who want a beach-town feel similar to Encinitas' coastal neighbors, at North County distances.",
  },
  {
    slug: "solana-beach",
    name: "Solana Beach",
    category: "suburb",
    distanceFromDowntown: "25 minutes",
    description:
      "A small coastal city between Del Mar and Encinitas with a Coaster train station, Cedros Design District shopping, and limited inventory.",
    goodFor: "Buyers who want Del Mar-adjacent coastal living with fewer listings and select condo/townhome options.",
  },
  {
    slug: "carlsbad",
    name: "Carlsbad",
    category: "city",
    distanceFromDowntown: "35 minutes",
    description:
      "A North County beach city with four distinct village districts, LEGOLAND, and a mix of new-construction master plans and coastal cottages.",
    goodFor: "Buyers who want newer coastal construction and top-rated schools further north.",
  },
  {
    slug: "oceanside",
    name: "Oceanside",
    category: "city",
    distanceFromDowntown: "40 minutes",
    description:
      "A North County coastal city with the county's longest wooden pier, a growing harbor district, and generally lower price points than Carlsbad or Encinitas.",
    goodFor: "Buyers who want coastal access at the county's most accessible beach-city price points.",
  },
  {
    slug: "chula-vista",
    name: "Chula Vista",
    category: "city",
    distanceFromDowntown: "20 minutes",
    description:
      "The county's second-largest city, spanning older central neighborhoods and newer master-planned communities in Eastlake and Otay Ranch near the border.",
    goodFor: "Buyers who want newer master-planned inventory south of downtown at accessible price points.",
  },
  {
    slug: "el-cajon",
    name: "El Cajon",
    category: "city",
    distanceFromDowntown: "20 minutes",
    description:
      "An East County city in the inland valley with some of the region's most affordable single-family inventory and a diverse, established population base.",
    goodFor: "Buyers prioritizing affordability and square footage over coastal or central-San-Diego proximity.",
  },
  {
    slug: "escondido",
    name: "Escondido",
    category: "city",
    distanceFromDowntown: "35 minutes",
    description:
      "A North County inland city with San Diego Zoo Safari Park nearby, a revitalizing downtown, and a mix of historic and newer subdivisions.",
    goodFor: "Buyers who want inland acreage and lower price points within North County school districts.",
  },
  {
    slug: "vista",
    name: "Vista",
    category: "city",
    distanceFromDowntown: "35 minutes",
    description:
      "A North County inland city bordering Carlsbad and Oceanside, with a mix of older ranch homes and newer infill development.",
    goodFor: "Buyers who want North County access without North County coastal pricing.",
  },
];

export function getSuburbs(): Suburb[] {
  return suburbs.filter((s) => s.category === "suburb");
}

export function getAllCitiesAndSuburbs(): Suburb[] {
  return suburbs;
}
