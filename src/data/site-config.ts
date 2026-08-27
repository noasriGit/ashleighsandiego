/** Production apex domain (no protocol, no www). */
export const SITE_DOMAIN = "sdcommunities.com";

/** IDX Broker search host (sdcommunities.idxbroker.com). */
export const IDX_SEARCH_DOMAIN = "sdcommunities.idxbroker.com";

/** San Diego MLS feed id on sdcommunities.idxbroker.com (listings use idxID d010). */
export const IDX_MLS_ID = "d010";

export const siteConfig = {
  name: "SDCommunities",
  tagline:
    "The San Diego neighborhood guide, compare communities, commutes, and home prices before you search for a home.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_DOMAIN}`,
  description:
    "Compare San Diego neighborhoods by commute, budget, and lifestyle, then connect with a local buyer's agent to search homes with confidence.",

  agent: {
    name: "Ashleigh Dodero",
    dreNumber: "02351643",
    email: "ashleigh@serhant.com",
    phone: "703-229-2810",
    photo: "/images/hero2.JPG",
    bio: "Independent buyer guidance for relocating, military/VA, and first-time buyers across the La Jolla area and coastal San Diego.",
    // TODO: confirm a canonical Ashleigh Dodero agent profile URL (e.g. serhant.com agent
    // page) once published, so `sameAs` on the RealEstateAgent schema can include it.
    profileUrl: "",
    instagram: {
      handle: "@ashleighdodero_realestate",
      url: "https://www.instagram.com/ashleighdodero_realestate/",
    },
  },

  // TODO: confirm exact Serhant San Diego office street address, suite, and ZIP before
  // deploy (currently city/state-only; do not fabricate a street address). Once confirmed,
  // this should map directly onto the PostalAddress in localBusinessSchema().
  brokerage: {
    name: "SERHANT.",
    // TODO: confirm the brokerage's California license number (separate from the agent's
    // individual DRE #02351643) before publishing it in schema.
    licenseNumber: "",
    officeAddress: "San Diego, California",
    // TODO: confirm the correct SERHANT. corporate/brand URL to reference from schema
    // (e.g. https://www.serhant.com) once approved for this site.
    url: "",
    logo: "/images/serhant-logo.png",
    logoWhite: "/images/serhant-logo-white.jpeg",
  },

  /**
   * Social/profile URLs eligible for schema `sameAs`. Only include profiles that are
   * live and controlled by this agent/brokerage — never fabricate a URL to fill a slot.
   */
  sameAs: ["https://www.instagram.com/ashleighdodero_realestate/"],

  // Agent-level operating note (shown alongside the required Serhant disclosure).
  disclaimer:
    "This website is independently operated by Ashleigh Dodero, California DRE #02351643, a sales professional affiliated with SERHANT. All information is deemed reliable but not guaranteed. Not intended as legal, tax, lending, or financial advice. If your home is currently listed with a Broker, this is not intended as a solicitation.",

  // TODO: replace with Serhant's official required disclosure copy once confirmed.
  // {year} is replaced at render time. Source: brand-guidelines.ts
  franchiseDisclaimer:
    "©{year} SERHANT. All rights reserved. SERHANT. and the SERHANT. logo are trademarks of Serhant LLC. Equal Housing Opportunity.",

  // Required SDMLS IDX disclaimer, show on the IDX homepage and any page displaying SDMLS data.
  // {year} is replaced at render time via getSdmlsIdxDisclaimer().
  sdmlsIdxDisclaimer:
    "This information is deemed reliable but not guaranteed. You should rely on this information only to decide whether or not to further investigate a particular property. BEFORE MAKING ANY OTHER DECISION, YOU SHOULD PERSONALLY INVESTIGATE THE FACTS (e.g., square footage and lot size) with the assistance of an appropriate professional. You may use this information only to identify properties you may be interested in investigating further. All uses except for personal, noncommercial use in accordance with the foregoing purpose are prohibited. Redistribution or copying of this information, any photographs, or video tours is strictly prohibited. This information is derived from the Internet Data Exchange (IDX) service provided by San Diego MLS. Displayed property listings may be held by a brokerage firm other than the broker and/or agent responsible for this display. The information, photographs, video tours, and the compilation from which they are derived are protected by copyright. Compilation © {year} San Diego MLS.",

  ctas: {
    strategyCall: "Book a Free Buyer Strategy Call",
    searchHomes: "Search San Diego Homes",
    relocationChecklist: "Get the Relocation Checklist",
    customSearch: "Request a Custom Home Search",
    compareNeighborhoods: "Compare Neighborhoods",
  },

  geo: {
    center: "La Jolla Beach",
    radiusMiles: 12,
  },

  // Primary nav favors indexable pages so sitewide link equity isn't spent on
  // noindexed pages (docs/seo-rebuild-plan.md; SEO Wave 2, Phase 8). Noindexed
  // pages (e.g. Condos, Suburbs) stay reachable via footer and contextual links
  // instead of primary navigation until they're upgraded and indexed.
  nav: [
    { label: "Neighborhoods", href: "/san-diego-neighborhood-map" },
    { label: "Moving to San Diego", shortLabel: "Moving Here", href: "/moving-to-san-diego" },
    { label: "La Jolla", href: "/la-jolla-neighborhoods" },
    { label: "Military / VA", shortLabel: "Military", href: "/military-realtor-san-diego" },
    { label: "About", href: "/about" },
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
