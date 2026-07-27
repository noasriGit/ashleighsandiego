import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { StatBand } from "@/components/ui/StatBand";
import { FeatureHighlight } from "@/components/ui/FeatureHighlight";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { agentServiceSchema, faqSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "La Jolla Real Estate Agent | Buyer's Agent for La Jolla Homes",
  description:
    "Work with a La Jolla-focused buyer's agent. Local subarea knowledge, condo and luxury home experience, and a no-pressure strategy call.",
  path: "/la-jolla-real-estate-agent",
  keywords: getKeywordsForPage("/la-jolla-real-estate-agent"),
});

const whyItems = [
  { title: "Subarea Fluency", description: "The Cove, Shores, Village, Bird Rock, Muirlands, Mount Soledad, Windansea, and Torrey Pines each get evaluated on their own terms, not treated as one ZIP code." },
  { title: "Condo & Building Knowledge", description: "HOA structures, building age, and unit-mix differences across La Jolla's condo inventory, not just square footage." },
  { title: "Buyer-Side Focus", description: "Representation focused on your priorities: budget, commute, and lifestyle fit, not just closing the fastest deal." },
  { title: "Brokerage Backing", description: `Affiliated with ${siteConfig.brokerage.name}, with access to the full local MLS and off-market network.` },
];

const processFaqs = [
  {
    question: "Do you only work with La Jolla buyers?",
    answer: "La Jolla and the surrounding coastal communities are a primary focus, but the same buyer's-agent representation covers San Diego neighborhoods county-wide.",
  },
  {
    question: "How does buyer's agent representation work in La Jolla?",
    answer: "As your buyer's agent, representation is focused on your interests throughout the search, showings, offer, and closing process. There's no cost to you as the buyer in most transactions, compensation is typically arranged through the transaction structure.",
  },
  {
    question: "Can you help me compare La Jolla to Del Mar or other coastal areas?",
    answer: "Yes. See the La Jolla vs Del Mar comparison guide, or ask directly on a strategy call for a comparison tailored to your budget and priorities.",
  },
];

export default async function LaJollaAgentPage() {
  const searchConfig = getIdxSearchConfig("la-jolla");
  const browseUrl = getIdxBrowseUrl("la-jolla");
  const [listings, liveCount] = await Promise.all([
    getCommunityListings("la-jolla", 6),
    getSavedSearchCount(searchConfig.savedSearchId),
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "La Jolla Real Estate Agent",
            "Buyer's agent representation for La Jolla home purchases.",
            "/la-jolla-real-estate-agent",
          ),
          breadcrumbSchema([{ name: "La Jolla Real Estate Agent", path: "/la-jolla-real-estate-agent" }]),
          agentServiceSchema({
            areaServed: ["La Jolla", "Bird Rock", "La Jolla Shores", "La Jolla Village"],
            knowsAbout: ["La Jolla condos", "Coastal luxury homes", "Buyer representation"],
          }),
          faqSchema(processFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "La Jolla Real Estate Agent" }]} />
      </div>

      <PageHero
        kicker="Buyer Representation"
        headline="A La Jolla Real Estate Agent Who Works for You"
        subheadline="Local subarea knowledge, condo and luxury home experience, and buyer-side representation from first search to closing."
        primaryCta={{ label: "Book a Buyer Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Compare La Jolla Subareas", href: "/la-jolla-neighborhoods" }}
        heroImage={marketingHeroes.movingToLaJolla.src}
        heroImageAlt={marketingHeroes.movingToLaJolla.alt}
      />

      <StatBand
        stats={[
          { value: "8", label: "La Jolla Subareas Covered" },
          { value: "DRE", label: `#${siteConfig.agent.dreNumber}` },
          { value: "SERHANT.", label: "Brokerage Affiliation" },
          { value: "Free", label: "Strategy Calls" },
        ]}
      />

      <Section kicker="Why Work Locally">
        <h2 className="heading-section text-cabernet">What Local Representation Actually Gets You</h2>
        <div className="mt-8">
          <FeatureHighlight columns={2} items={whyItems} />
        </div>
      </Section>

      <Section variant="sand" kicker="The Agent">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-2xl lg:w-full">
            <Image
              src={siteConfig.agent.photo}
              alt={siteConfig.agent.name}
              fill
              sizes="(max-width: 1024px) 160px, 220px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="heading-card text-cabernet">{siteConfig.agent.name}</h3>
            <p className="mt-2 max-w-2xl text-espresso/90">{siteConfig.agent.bio}</p>
            <Link href="/about" className="mt-4 inline-block text-cabernet hover:underline">
              Read more about the approach behind this site →
            </Link>
          </div>
        </div>
      </Section>

      <CommunityListings
        title="Current La Jolla Listings"
        description="A sample of current homes for sale in La Jolla and nearby coastal communities."
        slug="la-jolla"
        listings={listings}
        count={liveCount}
        viewAllUrl={browseUrl ?? undefined}
        variant="pearl"
      />

      <Section kicker="Get Started">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card accent="cabernet">
            <h3 className="heading-card text-cabernet">1. Strategy Call</h3>
            <p className="mt-2 text-sm text-espresso/90">Discuss budget, timeline, and subarea preferences.</p>
          </Card>
          <Card accent="cabernet">
            <h3 className="heading-card text-cabernet">2. Custom Search</h3>
            <p className="mt-2 text-sm text-espresso/90">Get matched listings, including off-market opportunities.</p>
          </Card>
          <Card accent="cabernet">
            <h3 className="heading-card text-cabernet">3. Tour & Offer</h3>
            <p className="mt-2 text-sm text-espresso/90">Tour efficiently and negotiate with local market context.</p>
          </Card>
        </div>
      </Section>

      <Section variant="sand">
        <FaqSection faqs={processFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "La Jolla Neighborhoods", description: "Compare all 8 La Jolla subareas.", href: "/la-jolla-neighborhoods" },
          { title: "La Jolla Condos for Sale", description: "Building-by-building condo guide.", href: "/la-jolla-condos-for-sale" },
          { title: "About", description: "More on the agent and the approach behind this site.", href: "/about" },
        ]}
      />

      <CTABanner
        headline="Ready to Start Your La Jolla Search?"
        description="Book a free strategy call, no pressure, just local guidance."
        ctaLabel="Book a Buyer Strategy Call"
      />
    </>
  );
}
