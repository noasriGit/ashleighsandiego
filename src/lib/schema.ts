import { siteConfig } from "@/data/site-config";

/**
 * Stable @id anchors so every schema block below refers to the *same* WebSite,
 * RealEstateAgent, and LocalBusiness entities instead of emitting disconnected
 * duplicate objects on every page (docs/seo-rebuild-plan.md; SEO Wave 2, Phase 9).
 */
export const SCHEMA_IDS = {
  website: `${siteConfig.url}/#website`,
  agent: `${siteConfig.url}/#agent`,
  business: `${siteConfig.url}/#business`,
} as const;

function agentSameAs(): string[] {
  return [...siteConfig.sameAs, ...(siteConfig.agent.profileUrl ? [siteConfig.agent.profileUrl] : [])];
}

export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": SCHEMA_IDS.agent,
    name: siteConfig.agent.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.agent.email,
    telephone: siteConfig.agent.phone,
    sameAs: agentSameAs(),
    areaServed: {
      "@type": "City",
      name: "San Diego",
      containedInPlace: { "@type": "State", name: "California" },
    },
    memberOf: { "@id": SCHEMA_IDS.business },
  };
}

/**
 * Extended agent schema for the two agent-selection pages (§9.9 of the plan).
 * Adds knowsAbout/areaServed detail beyond the base schema used sitewide.
 */
export function agentServiceSchema(options: {
  areaServed: string[];
  knowsAbout: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": SCHEMA_IDS.agent,
    name: siteConfig.agent.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.agent.email,
    telephone: siteConfig.agent.phone,
    sameAs: agentSameAs(),
    areaServed: options.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    knowsAbout: options.knowsAbout,
    memberOf: { "@id": SCHEMA_IDS.business },
  };
}

/**
 * Brokerage/local-business entity. `address` intentionally omits a street address
 * until the exact SERHANT. San Diego office address is confirmed (see the TODO on
 * `siteConfig.brokerage`) — do not fabricate a street address here.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SCHEMA_IDS.business,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    ...(siteConfig.brokerage.url.length > 0 ? { sameAs: [siteConfig.brokerage.url] } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
    },
    employee: { "@id": SCHEMA_IDS.agent },
  };
}

export function webPageSchema(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: { "@id": SCHEMA_IDS.website },
  };
}

/** WebSite schema with a stable @id, for the homepage only. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": SCHEMA_IDS.business },
  };
}

/** Long-form guide pages (§9.2–9.5, 9.13). Stronger entity type than bare WebPage. */
export function articleSchema(options: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: `${siteConfig.url}${options.path}`,
    author: { "@id": SCHEMA_IDS.agent },
    publisher: { "@id": SCHEMA_IDS.business },
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
  };
}

/** Condo/luxury hub pages (§9.10–9.12). */
export function collectionPageSchema(options: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.title,
    description: options.description,
    url: `${siteConfig.url}${options.path}`,
    isPartOf: { "@id": SCHEMA_IDS.website },
  };
}

/** Ordered lists of districts, buildings, or neighborhoods within a hub page. */
export function itemListSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { url: `${siteConfig.url}${item.path}` } : {}),
    })),
  };
}

/** Sequenced processes, e.g. the moving-to-san-diego timeline. */
export function howToSchema(options: {
  name: string;
  description: string;
  steps: { title: string; description: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.name,
    description: options.description,
    step: options.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    })),
  };
}

export function aboutPageSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${siteConfig.url}${path}`,
    mainEntity: { "@id": SCHEMA_IDS.agent },
  };
}

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        ...(item.path ? { item: `${siteConfig.url}${item.path}` } : {}),
      })),
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
