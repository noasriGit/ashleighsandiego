import { siteConfig } from "@/data/site-config";

export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.agent.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.agent.email,
    telephone: siteConfig.agent.phone,
    sameAs: [siteConfig.agent.instagram.url],
    areaServed: {
      "@type": "City",
      name: "San Diego",
      containedInPlace: { "@type": "State", name: "California" },
    },
    memberOf: {
      "@type": "Organization",
      name: siteConfig.brokerage.name,
    },
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
    name: siteConfig.agent.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.agent.email,
    telephone: siteConfig.agent.phone,
    sameAs: [siteConfig.agent.instagram.url],
    areaServed: options.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    knowsAbout: options.knowsAbout,
    memberOf: {
      "@type": "Organization",
      name: siteConfig.brokerage.name,
    },
  };
}

// TODO: replace with structured street/city/zip once the Serhant office address is confirmed.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };
}

export function webPageSchema(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };
}

/** WebSite schema with a SearchAction, for the homepage only. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/san-diego-neighborhood-map?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
    author: {
      "@type": "Person",
      name: siteConfig.agent.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brokerage.name,
    },
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
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
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
    mainEntity: {
      "@type": "Person",
      name: siteConfig.agent.name,
      jobTitle: "Real Estate Agent",
      worksFor: {
        "@type": "Organization",
        name: siteConfig.brokerage.name,
      },
    },
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
