export type KeywordMapping = {
  keyword: string;
  page: string;
  intent: "relocation" | "homes-for-sale" | "community-guide" | "first-time-buyer" | "military" | "comparison";
};

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
];

export function getKeywordsForPage(path: string): string[] {
  return keywordMappings.filter((k) => k.page === path).map((k) => k.keyword);
}
