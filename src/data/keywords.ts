import type { KeywordMapping } from "./keywords-types";
import { phase1GuideKeywords } from "./community-guide-keywords.generated";

export type { KeywordMapping };

export const keywordMappings: KeywordMapping[] = [
  // Relocation
  { keyword: "moving to San Diego", page: "/relocating-to-san-diego", intent: "relocation" },
  { keyword: "relocating to San Diego", page: "/relocating-to-san-diego", intent: "relocation" },
  { keyword: "San Diego relocation realtor", page: "/relocating-to-san-diego", intent: "relocation" },
  { keyword: "San Diego relocation real estate agent", page: "/relocating-to-san-diego", intent: "relocation" },
  { keyword: "best neighborhoods near La Jolla", page: "/neighborhoods", intent: "relocation" },
  { keyword: "where to live near La Jolla", page: "/neighborhoods", intent: "relocation" },
  // La Jolla
  { keyword: "moving to La Jolla", page: "/moving-to-la-jolla", intent: "relocation" },
  { keyword: "relocating to La Jolla", page: "/moving-to-la-jolla", intent: "relocation" },
  { keyword: "living in La Jolla", page: "/neighborhoods/la-jolla", intent: "community-guide" },
  { keyword: "La Jolla relocation realtor", page: "/moving-to-la-jolla", intent: "relocation" },
  { keyword: "La Jolla homes for sale", page: "/search-homes", intent: "homes-for-sale" },
  // Military
  { keyword: "military relocation San Diego", page: "/military-va-relocation-san-diego", intent: "military" },
  { keyword: "PCS to San Diego", page: "/military-va-relocation-san-diego", intent: "military" },
  { keyword: "VA loan realtor San Diego", page: "/military-va-relocation-san-diego", intent: "military" },
  { keyword: "homes near Naval Base San Diego", page: "/military-va-relocation-san-diego", intent: "military" },
  { keyword: "homes near MCAS Miramar", page: "/military-va-relocation-san-diego", intent: "military" },
  // First-time buyer
  { keyword: "first time home buyer San Diego", page: "/first-time-home-buyer-san-diego", intent: "first-time-buyer" },
  { keyword: "how to buy a house in San Diego", page: "/first-time-home-buyer-san-diego", intent: "first-time-buyer" },
  { keyword: "affordable condos near La Jolla", page: "/first-time-home-buyer-san-diego", intent: "first-time-buyer" },
  // Community guides
  { keyword: "living in Pacific Beach", page: "/neighborhoods/pacific-beach", intent: "community-guide" },
  { keyword: "living in Del Mar", page: "/neighborhoods/del-mar", intent: "community-guide" },
  { keyword: "living in Point Loma", page: "/neighborhoods/point-loma", intent: "community-guide" },
  { keyword: "University City homes for sale", page: "/search-homes", intent: "homes-for-sale" },
  { keyword: "Pacific Beach homes for sale", page: "/search-homes", intent: "homes-for-sale" },
  // Phase 1 community guides (generated — npm run keywords:generate-community)
  ...phase1GuideKeywords,

  // 15-cluster rebuild (docs/seo-rebuild-plan.md §3-4)
  { keyword: "san diego neighborhoods", page: "/", intent: "relocation" },
  { keyword: "best neighborhoods in san diego", page: "/", intent: "relocation" },
  { keyword: "where to live in san diego", page: "/", intent: "relocation" },
  { keyword: "san diego neighborhood map", page: "/san-diego-neighborhood-map", intent: "relocation" },
  { keyword: "map of san diego neighborhoods", page: "/san-diego-neighborhood-map", intent: "relocation" },
  { keyword: "moving to san diego", page: "/moving-to-san-diego", intent: "relocation" },
  { keyword: "relocating to san diego", page: "/moving-to-san-diego", intent: "relocation" },
  { keyword: "san diego relocation guide", page: "/moving-to-san-diego", intent: "relocation" },
  { keyword: "living in san diego", page: "/living-in-san-diego", intent: "relocation" },
  { keyword: "what is it like living in san diego", page: "/living-in-san-diego", intent: "relocation" },
  { keyword: "pros and cons of living in san diego", page: "/living-in-san-diego", intent: "relocation" },
  { keyword: "military realtor san diego", page: "/military-realtor-san-diego", intent: "military" },
  { keyword: "PCS to san diego", page: "/military-realtor-san-diego", intent: "military" },
  { keyword: "VA loan realtor san diego", page: "/military-realtor-san-diego", intent: "military" },
  { keyword: "la jolla neighborhoods", page: "/la-jolla-neighborhoods", intent: "community-guide" },
  { keyword: "moving to la jolla", page: "/la-jolla-neighborhoods", intent: "relocation" },
  { keyword: "la jolla real estate agent", page: "/la-jolla-real-estate-agent", intent: "relocation" },
  { keyword: "best realtor in la jolla", page: "/la-jolla-real-estate-agent", intent: "relocation" },
  { keyword: "affordable neighborhoods san diego", page: "/affordable-neighborhoods-san-diego", intent: "relocation" },
  { keyword: "cheapest places to live in san diego", page: "/affordable-neighborhoods-san-diego", intent: "relocation" },
  { keyword: "san diego suburbs", page: "/san-diego-suburbs", intent: "relocation" },
  { keyword: "best suburbs of san diego", page: "/san-diego-suburbs", intent: "relocation" },
  { keyword: "cities near san diego", page: "/cities-near-san-diego", intent: "relocation" },
  { keyword: "towns near san diego", page: "/cities-near-san-diego", intent: "relocation" },
  { keyword: "san diego condos for sale", page: "/san-diego-condos-for-sale", intent: "homes-for-sale" },
  { keyword: "condos for sale in san diego", page: "/san-diego-condos-for-sale", intent: "homes-for-sale" },
  { keyword: "downtown san diego condos for sale", page: "/downtown-san-diego-condos-for-sale", intent: "homes-for-sale" },
  { keyword: "la jolla condos for sale", page: "/la-jolla-condos-for-sale", intent: "homes-for-sale" },
  { keyword: "del mar new luxury homes", page: "/del-mar-new-luxury-homes", intent: "homes-for-sale" },
  { keyword: "new construction del mar", page: "/del-mar-new-luxury-homes", intent: "homes-for-sale" },
  { keyword: "la jolla vs del mar", page: "/la-jolla-vs-del-mar", intent: "comparison" },
];

export function getKeywordsForPage(path: string): string[] {
  return keywordMappings.filter((k) => k.page === path).map((k) => k.keyword);
}
