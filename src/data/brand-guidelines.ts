/**
 * Berkshire Hathaway HomeServices brand guidelines distilled from
 * `public/Brand Guide.pdf` (Updated Jul 2025, 106 pages).
 *
 * Use this file as the implementation reference for colors, typography,
 * disclaimers, and compliance rules on this site. Official logo assets
 * must be downloaded from the REsource Center, do not recreate logos.
 */

export const brandGuidelines = {
  source: {
    document: "Berkshire Hathaway HomeServices Brand Guidelines",
    updated: "Jul 2025",
    pages: 106,
    pdfPath: "/Brand Guide.pdf",
    contact: "GlobalBranding@HSFranchise.com",
  },

  /** Core brand colors shared across all themes. */
  colors: {
    /** Primary brand color, warm, bold, unique. Logo colorway option. */
    cabernet: {
      name: "Cabernet",
      hex: "#670038",
      rgb: { r: 103, g: 0, b: 56 },
      cmyk: { c: 42, m: 100, y: 51, k: 44 },
      usage: "Main brand color in Traditional, Vibrant, and Calm themes; accent in Modern theme.",
      note: "No acceptable Pantone (PMS) match exists for Cabernet.",
    },
    black: {
      name: "Black",
      hex: "#000000",
      rgb: { r: 0, g: 0, b: 0 },
      cmyk: { c: 0, m: 0, y: 0, k: 100 },
      usage: "Logo colorway; main color in Modern theme; functional text color in Vibrant/Calm.",
    },
    white: {
      name: "White",
      hex: "#FFFFFF",
      rgb: { r: 255, g: 255, b: 255 },
      cmyk: { c: 0, m: 0, y: 0, k: 0 },
      usage: "Logo colorway; supported color across themes.",
    },
    blackTint5: {
      name: "5% Black Tint",
      hex: "#F2F2F2",
      rgb: { r: 242, g: 242, b: 242 },
      cmyk: { c: 0, m: 0, y: 0, k: 5 },
      usage: "Neutral tint, mainly background color.",
    },
  },

  /**
   * Five themed palettes for marketing and websites.
   * Tints should be used sparingly, mainly as solid backgrounds behind darker text.
   */
  colorThemes: {
    traditional: {
      name: "Traditional",
      description:
        "Inspired by brand heritage. Cabernet is main; Espresso, Earth, Dove complement it. Blush, Rosé, Pearl are accents.",
      colors: {
        cabernet: "#670038",
        espresso: { hex: "#2A2223", rgb: { r: 42, g: 34, b: 35 }, cmyk: { c: 66, m: 68, y: 64, k: 71 } },
        earth: { hex: "#72595E", rgb: { r: 114, g: 89, b: 94 }, cmyk: { c: 50, m: 58, y: 47, k: 17 } },
        dove: { hex: "#AA979C", rgb: { r: 170, g: 151, b: 156 }, cmyk: { c: 36, m: 40, y: 32, k: 1 } },
        pearl: { hex: "#F5F1F2", rgb: { r: 245, g: 241, b: 242 }, cmyk: { c: 3, m: 4, y: 2, k: 0 } },
        rose: { hex: "#ECE3E5", rgb: { r: 236, g: 227, b: 229 }, cmyk: { c: 6, m: 9, y: 5, k: 0 } },
        blush: { hex: "#C299AF", rgb: { r: 194, g: 153, b: 175 }, cmyk: { c: 24, m: 43, y: 16, k: 0 } },
        white: "#FFFFFF",
        blackTint5: "#F2F2F2",
      },
    },
    modern: {
      name: "Modern",
      description: "Black and White are main colors; Cabernet is accent only. Includes 5% black tint.",
      colors: {
        cabernet: "#670038",
        black: "#000000",
        white: "#FFFFFF",
        blackTint5: "#F2F2F2",
      },
    },
    vibrant: {
      name: "Vibrant",
      description: "Cabernet main, supported by Spruce, Cobalt, White. Black for text only.",
      colors: {
        cabernet: "#670038",
        black: "#000000",
        white: "#FFFFFF",
        blackTint5: "#F2F2F2",
        spruce: { hex: "#004B45", rgb: { r: 0, g: 75, b: 69 }, cmyk: { c: 91, m: 48, y: 66, k: 42 } },
        cobalt: { hex: "#005D7D", rgb: { r: 0, g: 93, b: 125 }, cmyk: { c: 94, m: 58, y: 34, k: 13 } },
        spruceTint40: { hex: "#99B7B4", rgb: { r: 153, g: 183, b: 180 } },
        cobaltTint40: { hex: "#99BECB", rgb: { r: 153, g: 190, b: 203 } },
        spruceTint10: { hex: "#E6EDEC", rgb: { r: 230, g: 237, b: 236 } },
        cobaltTint10: { hex: "#E4EEF1", rgb: { r: 228, g: 238, b: 241 } },
      },
    },
    calm: {
      name: "Calm",
      description: "Cabernet main, supported by Fern, Sky, White. Black for text only.",
      colors: {
        cabernet: "#670038",
        black: "#000000",
        white: "#FFFFFF",
        blackTint5: "#F2F2F2",
        fern: { hex: "#8AA954", rgb: { r: 138, g: 169, b: 82 }, cmyk: { c: 51, m: 18, y: 86, k: 1 } },
        sky: { hex: "#BAD8E1", rgb: { r: 186, g: 216, b: 225 }, cmyk: { c: 26, m: 5, y: 8, k: 0 } },
        fernTint40: { hex: "#D0DCBA", rgb: { r: 208, g: 220, b: 186 } },
        skyTint40: { hex: "#E8F0F2", rgb: { r: 232, g: 240, b: 242 } },
        fernTint20: { hex: "#E8EDDD", rgb: { r: 232, g: 237, b: 221 } },
        skyTint20: { hex: "#F1F7F9", rgb: { r: 241, g: 247, b: 249 } },
      },
    },
    blackAndWhite: {
      name: "Black & White",
      description: "Removes Cabernet and tints from the Modern palette.",
      colors: {
        black: "#000000",
        white: "#FFFFFF",
      },
    },
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
        italicNote:
          "Manrope has no italic variant; applications may faux-italicize. In InDesign, skew 12°.",
      },
    },
    substitute: {
      family: "Arial",
      weights: [400, 700],
      usage: "Only when brand fonts are unavailable (e.g. email).",
    },
    /** Website headline scale from Brand Guidelines §6.0 */
    headlineStyles: [
      { element: "title", font: "Manrope", weight: 800, case: "uppercase", sizePx: 12, lineHeight: "150%" },
      { element: "h1", font: "Marcellus", weight: 400, case: "sentence", sizePx: 57, lineHeight: "130%" },
      { element: "h2", font: "Marcellus", weight: 400, case: "sentence", sizePx: 76, lineHeight: "120%" },
      { element: "h3", font: "Marcellus", weight: 400, case: "sentence", sizePx: 43, lineHeight: "130%" },
      { element: "h3-serif", font: "Marcellus", weight: 400, case: "sentence", sizePx: 32, lineHeight: "130%" },
      { element: "h4", font: "Manrope", weight: 600, case: "sentence", sizePx: 32, lineHeight: "130%" },
      { element: "h5", font: "Manrope", weight: 700, case: "sentence", sizePx: 24, lineHeight: "130%" },
      { element: "h6", font: "Manrope", weight: 800, case: "sentence", sizePx: 18, lineHeight: "130%" },
    ],
    printDefaults: {
      businessCardName: { font: "Marcellus", weight: 400, sizePt: 10 },
      businessCardBody: { font: "Manrope", weight: 500, sizePt: 7 },
      letterheadBody: { font: "Manrope", weight: 300, sizePt: 10 },
      letterheadAddress: { font: "Manrope", weight: 600, sizePt: 8 },
    },
    pairingRules: [
      "Marcellus for larger headlines; Manrope for smaller headlines and body.",
      "Marcellus: sentence case only, never uppercase.",
      "Subheads may pair Marcellus headline with Manrope Extrabold uppercase subhead.",
    ],
  },

  logo: {
    allowedColors: ["cabernet", "black", "white"],
    mustUseCompanyLogo: true,
    clearSpace:
      "Minimum clear space equal to the height and width of the 'H' in HATHAWAY on all sides.",
    minimumSize: {
      globalLogo: { inches: 0.3, pixels: 22 },
      primarySecondaryCompanyLogo: { inches: 0.3, pixels: 22 },
      tertiaryCompanyLogo: { inches: 0.1667, pixels: 12 },
      qualitySeal: { inches: 1, pixels: 72 },
    },
    misuse: [
      "Do not add effects to the logo.",
      "Do not use non-approved colors or multiple colors on the lockup.",
      "Do not use unapproved typefaces or alter sizing/distance relationships.",
      "Do not change proportions or stretch the logo.",
      "Do not typeset the logo, use official vector (.eps) files.",
      "Do not animate, use as wallpaper, or watermark.",
      "Do not incorporate into another logo or graphic.",
    ],
    hierarchy: [
      "Primary company logo is default.",
      "Secondary when space is limited.",
      "Tertiary only when height space is severely limited.",
    ],
    qualitySeal: {
      mustAppearWithCompanyLogo: true,
      placement: "Upright, perfectly aligned, never tilted or overlapping frame edges.",
    },
  },

  naming: {
    fullNameRequired:
      "Never separate 'Berkshire Hathaway' and 'HomeServices' or use them independently.",
    bhhsAbbreviation:
      "BHHS only in Quality Seal and internal documents, never in marketing/advertising except approved domain names.",
    companyNameInCopy:
      "Use full company name once in copy; subsequent references may shorten to company name only.",
    buffettReferences:
      "References to Warren Buffett or Berkshire Hathaway Inc. (outside BHHS) require HomeServices of America permission.",
    noVariance: "No variance from Brand Guidelines terms is permissible.",
  },

  tagline: {
    phrase: "Good to know",
    registered: "Good to know.®",
    rules: [
      "Tagline form: capital G, period, registered trademark symbol.",
      "Conversational use may be lowercase within a sentence.",
      "Under logo: space equal to 2× the height of the 'H' in HATHAWAY.",
      "Approved hashtag: #goodtoknow",
      "Prohibited in domain names.",
      "Never sarcastic; do not alter phrasing.",
    ],
  },

  disclaimers: {
    usIndependentFranchisee: {
      full: "©[YEAR] BHH Affiliates, LLC. An independently owned and operated franchisee of BHH Affiliates, LLC. Berkshire Hathaway HomeServices and the Berkshire Hathaway HomeServices symbol are registered service marks of Columbia Insurance Company, a Berkshire Hathaway affiliate. Equal Housing Opportunity.",
      shortOption1: "An independently owned and operated franchisee of BHH Affiliates, LLC",
      shortOption2:
        "An independently owned and operated franchisee of BHH Affiliates, LLC. Equal Housing Opportunity.",
    },
    usHomeServicesOfAmerica: {
      full: "©[YEAR] BHH Affiliates, LLC. An independently operated subsidiary of HomeServices of America, Inc., a Berkshire Hathaway affiliate, and a franchisee of BHH Affiliates, LLC. Berkshire Hathaway HomeServices and the Berkshire Hathaway HomeServices symbol are registered service marks of Columbia Insurance Company, a Berkshire Hathaway affiliate. Equal Housing Opportunity.",
      shortOption1: "An independently operated franchisee of BHH Affiliates, LLC",
      shortOption2: "An independently operated franchisee of BHH Affiliates, LLC. Equal Housing Opportunity.",
    },
    oneLine: "A member of the franchise system of BHH Affiliates, LLC",
    additional:
      "Information not verified or guaranteed. If your home is currently listed with a Broker, this is not intended as a solicitation.",
    usage: [
      "Use full disclaimer whenever space allows.",
      "One-line disclaimer for yard signs, business cards, and materials smaller than quarter-page.",
      "Entire disclaimer (including copyright) required at minimum on website homepage.",
    ],
  },

  web: {
    requirements: [
      "Company logo on homepage (minimum).",
      "Full disclaimer on homepage (minimum).",
      "Cabernet RGB for digital: R:103, G:0, B:56.",
      "Adhere to brand color palette, typography, and visual style.",
      "All links must work; all images must load.",
    ],
    commonErrors: [
      "Using global logo instead of company logo.",
      "Incorrect logo format, font, size, or color.",
      "Insufficient clear space around logo.",
      "Using 'Berkshire' or 'HomeServices' alone in generic reference.",
      "Missing or partial disclaimer.",
      "Animated logo, wallpaper, or watermark usage.",
      "Quoting Berkshire Hathaway Inc. or HomeServices of America statistics.",
      "Generic misuse of REALTOR® mark.",
    ],
    personalLogoRule:
      "Personal logos/slogans may not be larger than company logo; must be at least X-height away from company logo.",
    domainNames: {
      allowed: ["Berkshire Hathaway HomeServices", "BHHS in domain with approval"],
      prohibited: ["Other abbreviations", "Good to know.® in domain"],
      approvalRequired: "GlobalBranding@HSFranchise.com",
      salesProfessionalDomains:
        "Individual agents may not register domains containing BHHS or Berkshire Hathaway HomeServices.",
    },
  },

  social: {
    rules: [
      "Keep company and personal pages separate.",
      "Full company name on page; never use BHHS acronym (except REthink Council handle exception).",
      "Company logo recommended on static posts; use Marketing REsource templates.",
      "Stories/Reels: do not place logo where platform UI may cover it.",
      "Profile: if company logo is cut off, use Quality Seal or yard sign graphic instead.",
    ],
    approvedHashtags: [
      "#goodtoknow",
      "#RealEstatesForeverBrand",
      "#ForeverBrand",
      "#ForeverAgent",
      "#YourForeverAgent",
      "#ForEveryone",
    ],
    hashtagNote: "Do not modify approved hashtags; add local/market-relevant hashtags as needed.",
  },

  photography: {
    rules: [
      "Premium, authentic feel, never contrived or generic stock.",
      "Aspirational yet attainable; lived-in but not messy.",
      "People: candid emotions; avoid direct camera gaze.",
      "Use only with owner permission; never download without rights.",
    ],
  },

  aiImagery: {
    rules: [
      "Use with extreme discretion; never replace real property/people photography.",
      "Label as AI-generated when required.",
      "Do not represent actual properties, people, or places.",
      "Must align with brand palette, typography, and premium feel.",
      "Respect copyright, privacy, and IP rights.",
    ],
  },

  video: {
    rules: [
      "Always say full company name on audio.",
      "Company logo recommended as bumper.",
      "BHHS disclaimer at end in legible typeface.",
      "No Warren Buffett references or imagery.",
      "Never say or display 'BHHS', use full Berkshire Hathaway HomeServices.",
    ],
  },
} as const;

/**
 * CSS custom property names, values are defined in src/app/globals.css
 * and wired through Tailwind @theme inline.
 */
export const brandCssTokens = {
  colors: {
    cabernet: "--bhhs-cabernet",
    espresso: "--bhhs-espresso",
    earth: "--bhhs-earth",
    dove: "--bhhs-dove",
    pearl: "--bhhs-pearl",
    rose: "--bhhs-rose",
    blush: "--bhhs-blush",
    black: "--bhhs-black",
    white: "--bhhs-white",
    neutralTint: "--bhhs-neutral-tint",
  },
  fonts: {
    display: "--font-marcellus",
    body: "--font-manrope",
  },
} as const;

export type BrandGuidelines = typeof brandGuidelines;
