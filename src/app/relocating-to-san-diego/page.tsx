import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { ContentSections } from "@/components/marketing/ContentSections";
import { Timeline } from "@/components/marketing/Timeline";
import { FaqSection } from "@/components/marketing/FaqSection";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { getSavedSearchCount } from "@/lib/idx-api";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { FeatureHighlight } from "@/components/ui/FeatureHighlight";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";
import { marketingHeroes } from "@/data/page-images";
import { relocationFaqs } from "@/data/faqs";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Relocating to San Diego | Neighborhood Guide for Buyers",
  description:
    "Moving to San Diego? Get neighborhood guidance, budget tips, and a step-by-step buyer plan for relocating near La Jolla and coastal San Diego.",
  path: "/relocating-to-san-diego",
  keywords: getKeywordsForPage("/relocating-to-san-diego"),
});

const journeySteps = [
  {
    step: 1,
    title: "Clarify Your Priorities",
    description:
      "Define commute distance, budget, school needs, and lifestyle must-haves before you start searching.",
  },
  {
    step: 2,
    title: "Compare Neighborhoods",
    description:
      "Use our guides to shortlist communities within the La Jolla radius that match your priorities.",
  },
  {
    step: 3,
    title: "Get Pre-Approved",
    description:
      "Work with a lender early so you tour homes in a realistic price range and act with confidence.",
  },
  {
    step: 4,
    title: "Plan Your Visit",
    description:
      "Time your house-hunting trip strategically and line up efficient tours across your shortlist.",
  },
  {
    step: 5,
    title: "Make an Informed Offer",
    description:
      "Navigate offers, contingencies, and negotiations with local market context on your side.",
  },
  {
    step: 6,
    title: "Close & Settle In",
    description:
      "Move through inspections, escrow, and the final steps to your new San Diego home.",
  },
];

const sections = [
  {
    id: "choose-area",
    kicker: "Step One",
    title: "How to Choose the Right Area",
    content:
      "Start with your non-negotiables. If you work in Sorrento Valley or UTC, University City and Carmel Valley may make sense. If beach lifestyle is the priority, compare La Jolla, Pacific Beach, and Del Mar. If budget is the main constraint, Clairemont, Mission Valley, and Bay Park offer more value.\n\nWe help you weigh these trade-offs before you invest time in home tours.",
  },
  {
    id: "lifestyle-breakdown",
    kicker: "The Map",
    title: "La Jolla-Area Lifestyle Breakdown",
    content:
      "The La Jolla area encompasses coastal villages, biotech corridors, and established central neighborhoods. La Jolla itself offers upscale coastal living. Pacific Beach brings beach-town energy. University City and UTC provide central access to UCSD and major employers. Del Mar and Carmel Valley appeal to families seeking top schools.\n\nEach area has a distinct feel, our neighborhood guides help you understand which matches your lifestyle.",
  },
  {
    id: "budget-commute",
    kicker: "Money & Time",
    title: "Budget and Commute Considerations",
    content:
      "San Diego home prices vary significantly by neighborhood. Coastal areas command premiums; inland areas offer more space per dollar. Factor in commute time to your employer, toll roads, and traffic patterns on I-5 and I-805.\n\nGetting pre-approved early helps you focus on realistic neighborhoods rather than falling in love with areas outside your budget.",
  },
  {
    id: "out-of-area",
    kicker: "Buying Remotely",
    title: "Buyer Process for Out-of-Area Buyers",
    content:
      "Buying from out of state adds complexity, virtual tours, timing your visit, and understanding local market norms. We help out-of-area buyers prioritize neighborhoods, plan efficient tour trips, and navigate offers remotely when needed.\n\nA strategy call before your first visit helps you make the most of your time in San Diego.",
  },
];

const lifestyleItems = [
  { title: "Coastal Living", description: "La Jolla, Pacific Beach, Del Mar, Point Loma, beach access and ocean views." },
  { title: "Biotech & UCSD Corridor", description: "University City, Sorrento Valley, Carmel Valley, short commutes to major employers." },
  { title: "Value & Space", description: "Clairemont, Mission Valley, Bay Park, more home and yard for your budget." },
  { title: "Urban Walkability", description: "Hillcrest, North Park, dining, culture, and condo living." },
];

export default async function RelocatingPage() {
  const browseUrl = getIdxBrowseUrl();
  const liveCount = await getSavedSearchCount(getIdxSearchConfig().savedSearchId);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Relocating to San Diego",
            "Neighborhood guidance for buyers relocating to San Diego near La Jolla.",
            "/relocating-to-san-diego",
          ),
          breadcrumbSchema([{ name: "Relocating to San Diego", path: "/relocating-to-san-diego" }]),
          faqSchema(relocationFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Relocating to San Diego" }]} />
      </div>

      <PageHero
        kicker="Relocation Guide"
        headline="Relocating to San Diego? Start With Neighborhood Guidance."
        subheadline="Compare communities near La Jolla, understand budget and commute trade-offs, and build a buyer plan before you tour homes."
        primaryCta={{ label: "Book a Relocation Strategy Call", href: "/contact" }}
        secondaryCta={{ label: siteConfig.ctas.searchHomes, href: "/search-homes" }}
        heroImage={marketingHeroes.relocating.src}
        heroImageAlt={marketingHeroes.relocating.alt}
      />

      <StatBand
        stats={[
          { value: "13", label: "Neighborhood Guides" },
          { value: `${siteConfig.geo.radiusMiles}-mile`, label: "La Jolla Radius" },
          { value: "Coastal", label: "to Inland Options" },
          { value: "5", label: "Buyer Paths" },
        ]}
      />

      <Timeline
        kicker="Your Journey"
        title="From First Search to Move-In Day"
        intro="Relocating is smoother with a plan. Here's how we help buyers move from exploring neighborhoods to closing on the right home."
        steps={journeySteps}
      />

      <ContentSections sections={sections} />

      <Section variant="sand" kicker="Lifestyle Options">
        <h2 className="heading-section text-cabernet">La Jolla-Area Lifestyle Options</h2>
        <div className="mt-8">
          <FeatureHighlight columns={2} items={lifestyleItems} />
        </div>
        <p className="mt-8 text-espresso/90">
          Explore detailed guides:{" "}
          <Link href="/neighborhoods/la-jolla" className="text-cabernet hover:underline">La Jolla</Link>,{" "}
          <Link href="/neighborhoods/pacific-beach" className="text-cabernet hover:underline">Pacific Beach</Link>,{" "}
          <Link href="/neighborhoods/university-city" className="text-cabernet hover:underline">University City</Link>,{" "}
          <Link href="/neighborhoods/del-mar" className="text-cabernet hover:underline">Del Mar</Link>.
        </p>
      </Section>

      <CommunityListings
        title="Featured San Diego Relocation Homes"
        description="A sample of current homes for sale across neighborhoods popular with relocating buyers."
        limit={6}
        variant="sand"
        viewAllUrl={browseUrl ?? undefined}
        count={liveCount}
      />

      <Section variant="pearl">
        <CalloutBlock type="tip">
          Rent first or buy right away? Both work. If your timeline is tight or you already know the
          area, buying with a clear plan saves money. If you&apos;re unsure, a short rental lets you
          test commutes and neighborhoods before committing.
        </CalloutBlock>
        <div className="mt-12">
          <IdxSearchModule
            title="Search San Diego Relocation Homes"
            description="Browse available homes in neighborhoods popular with relocating buyers."
          />
        </div>
      </Section>

      <Section variant="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <LeadMagnet
            title="San Diego Relocation Buyer Checklist"
            description="Free checklist for relocating buyers, neighborhood research, budget planning, and pre-tour prep."
            leadType="relocation-checklist"
            checklistItems={[
              "Define commute and lifestyle priorities",
              "Research neighborhoods within your budget",
              "Get pre-approved before touring",
              "Plan your out-of-area visit strategy",
            ]}
          />
          <FaqSection faqs={relocationFaqs} />
        </div>
      </Section>

      <CTABanner
        headline="Book a Free Relocation Strategy Call"
        description="Discuss your move timeline, budget, and neighborhood options with a local buyer guide."
        ctaLabel="Book a Relocation Strategy Call"
      />
    </>
  );
}
