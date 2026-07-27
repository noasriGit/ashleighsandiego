/**
 * Serhant brand reference for this site's color palette, typography, and
 * required legal disclosures.
 *
 * TODO: replace the placeholder hex values, disclosure copy, and logo rules
 * below with the official Serhant ID Lab brand guide once received. Official
 * logo assets must come from Serhant, do not recreate the logo.
 */

export const brandGuidelines = {
  source: {
    document: "Serhant Brand Guide (placeholder, pending official guide)",
    contact: "Serhant ID Lab",
  },

  /** Core brand colors. TODO: confirm exact hex values from the Serhant brand guide. */
  colors: {
    serhantBlue: {
      name: "Serhant Blue",
      hex: "#001a72",
      rgb: { r: 0, g: 26, b: 114 },
      usage: "Primary brand color. Buttons, links, headings, CTAs.",
    },
    navy: {
      name: "Navy",
      hex: "#0A1128",
      rgb: { r: 10, g: 17, b: 40 },
      usage: "Body text, dark surfaces.",
    },
    slate: {
      name: "Slate",
      hex: "#3D5A80",
      rgb: { r: 61, g: 90, b: 128 },
      usage: "Secondary accents, muted text.",
    },
    silver: {
      name: "Silver",
      hex: "#A9B4C4",
      rgb: { r: 169, g: 180, b: 196 },
      usage: "Borders, dividers.",
    },
    cloud: {
      name: "Cloud",
      hex: "#F4F6FA",
      rgb: { r: 244, g: 246, b: 250 },
      usage: "Page background.",
    },
    mist: {
      name: "Mist",
      hex: "#E4EAF5",
      rgb: { r: 228, g: 234, b: 245 },
      usage: "Cards, soft fills.",
    },
    sky: {
      name: "Sky",
      hex: "#7C93C7",
      rgb: { r: 124, g: 147, b: 199 },
      usage: "Accent highlights.",
    },
    white: { name: "White", hex: "#FFFFFF" },
    black: { name: "Black", hex: "#000000" },
  },

  typography: {
    primary: {
      display: {
        family: "Marcellus",
        googleFontsUrl: "https://fonts.google.com/specimen/Marcellus",
        weights: [400],
        usage: "Headlines and emphasis. Sentence case only, not all caps.",
      },
      body: {
        family: "Manrope",
        googleFontsUrl: "https://fonts.google.com/specimen/Manrope",
        weights: [200, 300, 400, 500, 600, 700, 800],
        usage: "Body copy, subheads, captions, links, numbers.",
      },
    },
    substitute: {
      family: "Arial",
      weights: [400, 700],
      usage: "Only when brand fonts are unavailable (e.g. email).",
    },
  },

  logo: {
    // TODO: confirm allowed colorways and clear-space rules once the Serhant logo files arrive.
    mustUseOfficialLogo: true,
    misuse: [
      "Do not add effects to the logo.",
      "Do not use unapproved colors on the lockup.",
      "Do not change proportions or stretch the logo.",
      "Do not typeset the logo, use official vector files.",
      "Do not animate, use as wallpaper, or watermark.",
    ],
  },

  naming: {
    companyName: "SERHANT.",
    companyNameInCopy:
      "Use full brand name SERHANT. in first reference; subsequent references may shorten to Serhant.",
  },

  // TODO: replace with Serhant's official required legal disclosure copy once confirmed.
  disclaimers: {
    franchise:
      "©[YEAR] SERHANT. All rights reserved. SERHANT. and the SERHANT. logo are trademarks of Serhant LLC. Equal Housing Opportunity.",
    additional:
      "Information not verified or guaranteed. If your home is currently listed with a Broker, this is not intended as a solicitation.",
    usage: [
      "Use the full disclaimer whenever space allows.",
      "Required at minimum on the website homepage and any page displaying MLS data.",
    ],
  },

  web: {
    requirements: [
      "Company logo on homepage (minimum).",
      "Full disclaimer on homepage (minimum).",
      "Adhere to brand color palette, typography, and visual style.",
      "All links must work; all images must load.",
    ],
  },
} as const;

/**
 * CSS custom property names, values are defined in src/app/globals.css
 * and wired through Tailwind @theme inline.
 */
export const brandCssTokens = {
  colors: {
    cabernet: "--serhant-blue",
    espresso: "--serhant-navy",
    earth: "--serhant-slate",
    dove: "--serhant-silver",
    pearl: "--serhant-cloud",
    rose: "--serhant-mist",
    blush: "--serhant-sky",
    black: "--serhant-black",
    white: "--serhant-white",
    neutralTint: "--serhant-neutral-tint",
  },
  fonts: {
    display: "--font-marcellus",
    body: "--font-manrope",
  },
} as const;

export type BrandGuidelines = typeof brandGuidelines;
