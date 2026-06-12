import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { ContentSections } from "@/components/marketing/ContentSections";
import { Timeline } from "@/components/marketing/Timeline";
import { FaqSection } from "@/components/marketing/FaqSection";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { FeatureHighlight } from "@/components/ui/FeatureHighlight";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { firstTimeBuyerFaqs, firstTimeBuyerRoadmapSteps } from "@/data/faqs";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "First-Time Home Buyer San Diego | Buyer's Guide",
  description:
    "First time buying in San Diego? Learn about affordability, property types, pre-approval, and neighborhoods near La Jolla before you tour homes.",
  path: "/first-time-home-buyer-san-diego",
  keywords: getKeywordsForPage("/first-time-home-buyer-san-diego"),
});

const sections = [
  {
    id: "affordability",
    kicker: "Reality Check",
    title: "San Diego Affordability Challenges",
    content:
      "San Diego's median home prices exceed national averages, and coastal neighborhoods near La Jolla command significant premiums. First-time buyers often look at condos and townhomes in University City, Mission Valley, or Clairemont for lower entry points.\n\nUnderstanding what your budget buys in each area prevents frustration during your search.",
  },
  {
    id: "preapproval",
    kicker: "Financing",
    title: "Down Payment & Preapproval Basics",
    content:
      "Down payment requirements vary by loan type — conventional, FHA, and VA each have different guidelines. Getting pre-approved clarifies your budget and shows sellers you're a serious buyer.\n\nWe can connect you with lender partners for an introduction. Your lender will explain options based on your credit, income, and savings.",
  },
  {
    id: "before-touring",
    kicker: "Tour Smart",
    title: "What to Know Before Touring",
    content:
      "Tour with a plan — not just open houses. Focus on neighborhoods that match your commute, budget, and lifestyle. Visit at different times of day. Research school boundaries if applicable.\n\nFirst-time buyers who clarify priorities before touring save time and reduce decision fatigue.",
  },
];

const propertyTypes = [
  { title: "Condos", description: "Lower maintenance, HOA fees, often best entry price in urban/central areas." },
  { title: "Townhomes", description: "More space than condos, shared walls, moderate HOA in many communities." },
  { title: "Single-Family", description: "Yards and privacy, higher price points, more common in Clairemont and Bay Park." },
  { title: "Affordable Areas", description: "Mission Valley, Clairemont, and North Park offer first-time buyer options." },
];

export default function FirstTimeBuyerPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "First-Time Home Buyer San Diego",
            "Guide for first-time homebuyers in San Diego.",
            "/first-time-home-buyer-san-diego",
          ),
          breadcrumbSchema([
            { name: "First-Time Home Buyer", path: "/first-time-home-buyer-san-diego" },
          ]),
          faqSchema(firstTimeBuyerFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "First-Time Home Buyer" }]} />
      </div>

      <PageHero
        kicker="First-Time Buyers"
        headline="First-Time Home Buyer Guide for San Diego"
        subheadline="Understand affordability, property types, and neighborhoods before you start touring — whether you're relocating or buying locally."
        primaryCta={{ label: "Book a Buyer Readiness Call", href: "/contact" }}
        secondaryCta={{ label: "Explore Neighborhoods", href: "/neighborhoods" }}
      />

      <Timeline
        kicker="Step by Step"
        title="First-Time Buyer Roadmap"
        intro="Buying your first home is less stressful with a clear sequence. Here's the path we walk first-time buyers through."
        steps={firstTimeBuyerRoadmapSteps}
      />

      <Section variant="sand" kicker="Know Your Options">
        <h2 className="heading-section text-cabernet">Property Types &amp; Affordable Areas</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Property type shapes both your price and your lifestyle. Here&apos;s how the main options compare for first-time buyers.
        </p>
        <div className="mt-8">
          <FeatureHighlight items={propertyTypes} />
        </div>
        <p className="mt-8 text-espresso/90">
          Explore affordable nearby options:{" "}
          <Link href="/neighborhoods/mission-valley" className="text-cabernet hover:underline">Mission Valley</Link>,{" "}
          <Link href="/neighborhoods/clairemont" className="text-cabernet hover:underline">Clairemont</Link>,{" "}
          <Link href="/neighborhoods/north-park" className="text-cabernet hover:underline">North Park</Link>.
        </p>
      </Section>

      <ContentSections sections={sections} />

      <Section variant="pearl">
        <CalloutBlock type="tip">
          Budget beyond the down payment. Plan for closing costs, inspections, and the first few
          months of ownership. A lender and a clear neighborhood plan help you avoid surprises.
        </CalloutBlock>
      </Section>

      <Section variant="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <LeadMagnet
            title="First-Time Buyer Readiness Checklist"
            description="Free checklist covering budget, pre-approval, neighborhood research, and tour prep."
            leadType="first-time-checklist"
            checklistItems={[
              "Review budget with a lender",
              "Choose target neighborhoods",
              "Understand property types and HOA costs",
              "Plan strategic home tours",
              "Learn offer and contingency basics",
            ]}
          />
          <FaqSection faqs={firstTimeBuyerFaqs} />
        </div>
      </Section>

      <CTABanner
        headline="Book a Buyer Readiness Call"
        description="Discuss your budget, target neighborhoods, and first-time buyer questions."
        ctaLabel="Book a Buyer Readiness Call"
      />
    </>
  );
}
