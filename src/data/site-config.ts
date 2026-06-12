export const siteConfig = {
  name: "San Diego Relocation Home Guide",
  tagline:
    "Neighborhood guidance, relocation resources, and home search support for buyers moving to San Diego.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandiegorelocationhomeguide.com",
  description:
    "Moving to San Diego? Get clear neighborhood guidance, home search tools, and a step-by-step buyer plan before you start touring homes.",

  agent: {
    name: "[Agent Name]",
    dreNumber: "[DRE Number]",
    email: "[agent@email.com]",
    phone: "[(555) 555-5555]",
    photo: "/images/agent-placeholder.jpg",
  },

  brokerage: {
    name: "Berkshire Hathaway HomeServices California Properties",
    licenseNumber: "[Brokerage License Number if required]",
    officeAddress: "[Office Address if required]",
  },

  // Agent-level operating note (shown alongside the required BHHS franchise disclaimer).
  disclaimer:
    "This website is independently operated by [Agent Name], California DRE #[DRE Number], a sales professional affiliated with Berkshire Hathaway HomeServices California Properties. All information is deemed reliable but not guaranteed. Not intended as legal, tax, lending, or financial advice. If your home is currently listed with a Broker, this is not intended as a solicitation.",

  // BHHS-required franchise disclaimer (HomeServices of America-owned variant).
  // {year} is replaced at render time. Source: brand-guidelines.ts
  franchiseDisclaimer:
    "©{year} BHH Affiliates, LLC. An independently operated subsidiary of HomeServices of America, Inc., a Berkshire Hathaway affiliate, and a franchisee of BHH Affiliates, LLC. Berkshire Hathaway HomeServices and the Berkshire Hathaway HomeServices symbol are registered service marks of Columbia Insurance Company, a Berkshire Hathaway affiliate. Equal Housing Opportunity.",

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
    { label: "Relocating to San Diego", href: "/relocating-to-san-diego" },
    { label: "Moving to La Jolla", href: "/moving-to-la-jolla" },
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Search Homes", href: "/search-homes" },
    { label: "Military / VA", href: "/military-va-relocation-san-diego" },
    { label: "First-Time Buyers", href: "/first-time-home-buyer-san-diego" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
