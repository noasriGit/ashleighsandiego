/** Production apex domain (no protocol, no www). */
export const SITE_DOMAIN = "sdcommunities.com";

/** Branded IDX search subdomain host. */
export const IDX_SEARCH_DOMAIN = `search.${SITE_DOMAIN}`;

export const siteConfig = {
  name: "San Diego Relocation Home Guide",
  tagline:
    "Neighborhood guidance, relocation resources, and home search support for buyers moving to San Diego.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_DOMAIN}`,
  description:
    "Moving to San Diego? Get clear neighborhood guidance, home search tools, and a step-by-step buyer plan before you start touring homes.",

  agent: {
    name: "Ashleigh Dodero",
    dreNumber: "02351643",
    email: "AshleighDodero@bhhscal.com",
    phone: "703-229-2810",
    photo: "/images/hero2.JPG",
    bio: "Independent buyer guidance for relocating, military/VA, and first-time buyers across the La Jolla area and coastal San Diego.",
    instagram: {
      handle: "@ashleighdodero_realestate",
      url: "https://www.instagram.com/ashleighdodero_realestate/",
    },
  },

  brokerage: {
    name: "Berkshire Hathaway HomeServices California Properties",
    licenseNumber: "",
    officeAddress: "1299 Prospect St, La Jolla, California 92037",
  },

  // Agent-level operating note (shown alongside the required BHHS franchise disclaimer).
  disclaimer:
    "This website is independently operated by Ashleigh Dodero, California DRE #02351643, a sales professional affiliated with Berkshire Hathaway HomeServices California Properties. All information is deemed reliable but not guaranteed. Not intended as legal, tax, lending, or financial advice. If your home is currently listed with a Broker, this is not intended as a solicitation.",

  // BHHS-required franchise disclaimer (HomeServices of America-owned variant).
  // {year} is replaced at render time. Source: brand-guidelines.ts
  franchiseDisclaimer:
    "©{year} BHH Affiliates, LLC. An independently operated subsidiary of HomeServices of America, Inc., a Berkshire Hathaway affiliate, and a franchisee of BHH Affiliates, LLC. Berkshire Hathaway HomeServices and the Berkshire Hathaway HomeServices symbol are registered service marks of Columbia Insurance Company, a Berkshire Hathaway affiliate. Equal Housing Opportunity.",

  // Required SDMLS IDX disclaimer, show on the IDX homepage and any page displaying SDMLS data.
  // {year} is replaced at render time via getSdmlsIdxDisclaimer().
  sdmlsIdxDisclaimer:
    "This information is deemed reliable but not guaranteed. You should rely on this information only to decide whether or not to further investigate a particular property. BEFORE MAKING ANY OTHER DECISION, YOU SHOULD PERSONALLY INVESTIGATE THE FACTS (e.g., square footage and lot size) with the assistance of an appropriate professional. You may use this information only to identify properties you may be interested in investigating further. All uses except for personal, noncommercial use in accordance with the foregoing purpose are prohibited. Redistribution or copying of this information, any photographs, or video tours is strictly prohibited. This information is derived from the Internet Data Exchange (IDX) service provided by San Diego MLS. Displayed property listings may be held by a brokerage firm other than the broker and/or agent responsible for this display. The information, photographs, video tours, and the compilation from which they are derived are protected by copyright. Compilation © {year} San Diego MLS.",

  ctas: {
    strategyCall: "Book a Free Buyer Strategy Call",
    searchHomes: "Search Homes Near La Jolla",
    relocationChecklist: "Get the Relocation Checklist",
    customSearch: "Request a Custom Home Search",
    compareNeighborhoods: "Compare Neighborhoods",
  },

  geo: {
    center: "La Jolla Beach",
    radiusMiles: 12,
  },

  nav: [
    { label: "Relocating to San Diego", shortLabel: "Relocating", href: "/relocating-to-san-diego" },
    { label: "Moving to La Jolla", shortLabel: "La Jolla", href: "/moving-to-la-jolla" },
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Search Homes", href: "/search-homes" },
    { label: "Military / VA", href: "/military-va-relocation-san-diego" },
    { label: "First-Time Buyers", shortLabel: "First-Time Buyers", href: "/first-time-home-buyer-san-diego" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export function getSdmlsIdxDisclaimer(): string {
  return siteConfig.sdmlsIdxDisclaimer.replace(
    "{year}",
    String(new Date().getFullYear()),
  );
}
