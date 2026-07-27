/**
 * Price-positioning data for /affordable-neighborhoods-san-diego (docs/seo-rebuild-plan.md §9.9).
 * Bands describe housing stock and objective price positioning only — no
 * demographic or "who lives there" framing (Fair Housing safeguard, §15).
 */

export type PriceBand = {
  id: string;
  label: string;
  approxRange: string;
  housingTypes: string;
  communities: { name: string; slug: string }[];
  note: string;
};

export const priceBands: PriceBand[] = [
  {
    id: "entry-condo",
    label: "Entry-Level Condos & Townhomes",
    approxRange: "Roughly $500K–$750K",
    housingTypes: "1-2 bedroom condos and townhomes",
    communities: [
      { name: "Mission Valley", slug: "mission-valley" },
      { name: "Linda Vista", slug: "linda-vista" },
      { name: "Kearny Mesa", slug: "kearny-mesa" },
    ],
    note: "Condo HOA dues offset some of the lower purchase price — factor them into your monthly budget comparison.",
  },
  {
    id: "value-single-family",
    label: "Value Single-Family Homes",
    approxRange: "Roughly $750K–$1M",
    housingTypes: "2-3 bedroom single-family homes, smaller lots",
    communities: [
      { name: "Clairemont", slug: "clairemont" },
      { name: "North Clairemont", slug: "north-clairemont" },
      { name: "Serra Mesa", slug: "serra-mesa" },
      { name: "Bay Ho", slug: "bay-ho" },
    ],
    note: "This band gets the most competition from first-time and move-up buyers alike — pre-approval before touring matters most here.",
  },
  {
    id: "central-mid",
    label: "Central Mid-Range",
    approxRange: "Roughly $900K–$1.3M",
    housingTypes: "3-4 bedroom single-family homes and larger townhomes",
    communities: [
      { name: "North Park", slug: "north-park" },
      { name: "Normal Heights", slug: "normal-heights" },
      { name: "Bay Park", slug: "bay-park" },
      { name: "University City", slug: "university-city" },
    ],
    note: "Walkability and commute access, rather than beach proximity, drive pricing in this band.",
  },
  {
    id: "coastal-entry",
    label: "Coastal Entry Points",
    approxRange: "Roughly $900K–$1.5M",
    housingTypes: "Condos and smaller single-family homes near the coast",
    communities: [
      { name: "Ocean Beach", slug: "ocean-beach" },
      { name: "Pacific Beach", slug: "pacific-beach" },
      { name: "Mission Beach", slug: "mission-beach" },
    ],
    note: "These are the most affordable ways to buy within a few blocks of the water, inventory turns over quickly.",
  },
  {
    id: "coastal-premium",
    label: "Coastal & Premium",
    approxRange: "$1.5M and up",
    housingTypes: "Single-family homes and luxury condos",
    communities: [
      { name: "La Jolla", slug: "la-jolla" },
      { name: "Del Mar", slug: "del-mar" },
      { name: "Point Loma", slug: "point-loma" },
    ],
    note: "See our dedicated condo and luxury guides for building- and street-level detail in this band.",
  },
];
