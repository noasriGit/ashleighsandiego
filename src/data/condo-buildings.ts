/**
 * Building-level condo data for the /san-diego-condos-for-sale hub and its two
 * district pages. Per docs/seo-rebuild-plan.md §9.10-9.12: this building-level
 * depth is the differentiation lever that lets a low-DR site compete against
 * portal-dominated SERPs for condo keywords — Zillow/Redfin show unit listings,
 * not building-by-building buyer guidance.
 */

export type CondoBuilding = {
  slug: string;
  name: string;
  district: "downtown" | "la-jolla";
  neighborhood: string;
  yearBuilt: string;
  stories: string;
  note: string;
};

export const condoBuildings: CondoBuilding[] = [
  {
    slug: "electra",
    name: "Electra",
    district: "downtown",
    neighborhood: "Marina District",
    yearBuilt: "2006",
    stories: "58",
    note: "Repurposed San Diego Gas & Electric headquarters with bay-view units and a rooftop pool deck.",
  },
  {
    slug: "harbor-club",
    name: "Harbor Club",
    district: "downtown",
    neighborhood: "Marina District",
    yearBuilt: "1992",
    stories: "40",
    note: "Twin-tower complex near the Convention Center with some of downtown's largest floor plans.",
  },
  {
    slug: "meridian",
    name: "Meridian",
    district: "downtown",
    neighborhood: "Marina District",
    yearBuilt: "1985",
    stories: "31",
    note: "One of downtown's original luxury towers, full-service with a private park and tennis court.",
  },
  {
    slug: "pinnacle-on-the-park",
    name: "Pinnacle on the Park",
    district: "downtown",
    neighborhood: "East Village",
    yearBuilt: "2007",
    stories: "36",
    note: "Faces Petco Park; end units get game-day skyline and field views.",
  },
  {
    slug: "the-legend",
    name: "The Legend",
    district: "downtown",
    neighborhood: "East Village",
    yearBuilt: "2005",
    stories: "16",
    note: "Loft-style floor plans with concrete ceilings, popular with buyers wanting an industrial aesthetic.",
  },
  {
    slug: "aria",
    name: "Aria",
    district: "downtown",
    neighborhood: "Cortez Hill",
    yearBuilt: "2007",
    stories: "22",
    note: "Boutique building on the Cortez Hill bluff with city and partial bay views, lower HOA than the Marina towers.",
  },
  {
    slug: "the-mark",
    name: "The Mark",
    district: "downtown",
    neighborhood: "Core/Columbia District",
    yearBuilt: "2007",
    stories: "41",
    note: "Central Core location within walking distance of Horton Plaza Park and the Gaslamp.",
  },
  {
    slug: "villa-la-jolla",
    name: "Villa La Jolla",
    district: "la-jolla",
    neighborhood: "La Jolla Village",
    yearBuilt: "1970s (renovated)",
    stories: "2-3",
    note: "Garden-style complex near UTC and I-5, one of the more accessible entry points to a La Jolla address.",
  },
  {
    slug: "seascape-shores",
    name: "Seascape Shores",
    district: "la-jolla",
    neighborhood: "La Jolla Shores",
    yearBuilt: "1970s",
    stories: "3-4",
    note: "Steps from La Jolla Shores Beach; limited inventory and long hold times among owners.",
  },
  {
    slug: "bird-rock-terrace",
    name: "Bird Rock Terrace",
    district: "la-jolla",
    neighborhood: "Bird Rock",
    yearBuilt: "1980s",
    stories: "2-3",
    note: "Small-scale condo cluster near Bird Rock Avenue's local shops, fewer units than Village buildings.",
  },
  {
    slug: "the-shores",
    name: "The Shores",
    district: "la-jolla",
    neighborhood: "La Jolla Village",
    yearBuilt: "1960s (renovated)",
    stories: "4",
    note: "Prospect Street proximity with ocean-view units on upper floors; smaller unit counts keep turnover low.",
  },
];

export function getCondosByDistrict(district: CondoBuilding["district"]): CondoBuilding[] {
  return condoBuildings.filter((b) => b.district === district);
}
