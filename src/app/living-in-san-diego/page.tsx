import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { SplitSection } from "@/components/ui/SplitSection";
import { StatBand } from "@/components/ui/StatBand";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { FeatureHighlight } from "@/components/ui/FeatureHighlight";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, articleSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Living in San Diego | What Day-to-Day Life Is Actually Like",
  description:
    "What is it really like living in San Diego? Weather, cost of living, commute reality, and citywide safety data, beyond the tourist-brochure version.",
  path: "/living-in-san-diego",
  keywords: getKeywordsForPage("/living-in-san-diego"),
});

const lifestyleItems = [
  { title: "Weather", description: "Mild year-round temperatures (low-to-mid 70s°F most months) with minimal rain, June gloom marine-layer mornings are common near the coast." },
  { title: "Cost of Living", description: "Housing is the largest cost driver; groceries, utilities, and healthcare run moderately above the national average." },
  { title: "Commute Reality", description: "I-5, I-805, and I-15 carry the bulk of north-south traffic; peak commute times can add 20-40 minutes versus off-peak." },
  { title: "Outdoor Access", description: "70+ miles of coastline, canyon trail networks, and year-round outdoor recreation shape daily routines more than in most U.S. cities." },
];

const prosCons = [
  { title: "What People Underestimate", description: "June gloom (overcast mornings, May–July), the cost of car ownership without a strong transit backbone, and how spread out the region is, \"San Diego\" covers 18 incorporated cities across a large county." },
  { title: "What People Overestimate", description: "How far a given salary goes. Coastal housing costs offset the mild climate for many household budgets, inland and suburb comparisons matter." },
];

export default function LivingInSanDiegoPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Living in San Diego",
            "An honest look at day-to-day life in San Diego: weather, cost of living, commute, and safety data.",
            "/living-in-san-diego",
          ),
          breadcrumbSchema([{ name: "Living in San Diego", path: "/living-in-san-diego" }]),
          articleSchema({
            title: "Living in San Diego: What Day-to-Day Life Is Actually Like",
            description: "Weather, cost of living, commute reality, and citywide safety data for people considering a move to San Diego.",
            path: "/living-in-san-diego",
          }),
          faqSchema(livingFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Living in San Diego" }]} />
      </div>

      <PageHero
        kicker="The Honest Version"
        headline="What Is It Actually Like Living in San Diego?"
        subheadline="Beyond the postcard: weather patterns, real cost of living, commute reality, and citywide safety data for people deciding whether to move here."
        primaryCta={{ label: "Compare Neighborhoods", href: "/" }}
        secondaryCta={{ label: "See the Moving Process", href: "/moving-to-san-diego" }}
        heroImage={marketingHeroes.neighborhoods.src}
        heroImageAlt={marketingHeroes.neighborhoods.alt}
      />

      <StatBand
        variant="espresso"
        stats={[
          { value: "70°F", label: "Avg. High, Year-Round" },
          { value: "70+ mi", label: "Coastline" },
          { value: "18", label: "Incorporated Cities in the County" },
          { value: "260+", label: "Sunny Days/Year (typical)" },
        ]}
      />

      <Section kicker="Daily Life">
        <h2 className="heading-section text-cabernet">Four Things That Shape Daily Life Here</h2>
        <div className="mt-8">
          <FeatureHighlight columns={2} items={lifestyleItems} />
        </div>
      </Section>

      <SplitSection
        id="safety"
        variant="sand"
        kicker="Citywide Data"
        heading="Is San Diego Safe? What the Data Actually Shows"
        body={[
          "San Diego is generally ranked among the safer large U.S. cities: FBI Uniform Crime Reporting (UCR) data has consistently placed San Diego's violent crime rate below the national average for cities of comparable population, though rates vary by category and change year to year.",
          "This is citywide data, not a neighborhood-by-neighborhood ranking. Crime patterns vary significantly by specific block and time of day within any large city, and marketing-style \"best neighborhood rankings by crime rate\" often rely on inconsistent, self-reported, or outdated data. For a specific address, request current crime-mapping data from the San Diego Police Department or SANDAG rather than relying on a blog ranking.",
        ]}
      >
        <CalloutBlock type="tip" label="How to research this yourself">
          The San Diego Police Department publishes crime statistics by police-division boundary,
          and SANDAG (the regional planning agency) publishes county-wide criminal justice data.
          Both are more current and more granular than most third-party neighborhood-ranking sites.
        </CalloutBlock>
      </SplitSection>

      <Section kicker="Trade-offs">
        <h2 className="heading-section text-cabernet">What People Get Wrong Before Moving Here</h2>
        <div className="mt-8">
          <FeatureHighlight columns={2} items={prosCons} />
        </div>
        <p className="mt-8 text-espresso/90">
          Ready to compare specific areas? Start with{" "}
          <Link href="/" className="text-cabernet hover:underline">San Diego Neighborhoods</Link>{" "}
          or see the step-by-step{" "}
          <Link href="/moving-to-san-diego" className="text-cabernet hover:underline">buying process</Link>.
        </p>
      </Section>

      <Section variant="sand">
        <FaqSection faqs={livingFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "Moving to San Diego", description: "The step-by-step process, from first search to closing.", href: "/moving-to-san-diego" },
          { title: "San Diego Suburbs", description: "For buyers who want more space or a quieter pace nearby.", href: "/san-diego-suburbs" },
          { title: "San Diego Neighborhood Map", description: "Explore every community on an interactive map.", href: "/san-diego-neighborhood-map" },
        ]}
      />

      <CTABanner
        headline="Ready to See Which Neighborhood Fits?"
        description="Book a free strategy call to compare areas based on your commute, budget, and lifestyle."
      />
    </>
  );
}

const livingFaqs = [
  {
    question: "Is San Diego actually sunny year-round?",
    answer:
      "Most of the year, yes, but coastal areas get \"June gloom,\" a marine layer that keeps mornings overcast from roughly May through July. Inland neighborhoods clear up faster and get more sun overall.",
  },
  {
    question: "Is San Diego a safe city?",
    answer:
      "FBI UCR data has generally placed San Diego's violent crime rate below the national average for large cities, though this varies by year and category. This is citywide data, not a neighborhood ranking, request current police-division crime data for a specific address.",
  },
  {
    question: "What is the cost of living like compared to other California cities?",
    answer:
      "San Diego is generally less expensive than the San Francisco Bay Area but more expensive than most inland California cities. Housing is the largest driver; day-to-day costs like groceries and utilities run moderately above the national average.",
  },
  {
    question: "Do I need a car in San Diego?",
    answer:
      "For most neighborhoods, yes. San Diego has trolley and bus service, but coverage and frequency are limited outside downtown and a few corridors. Walkable neighborhoods like Hillcrest, North Park, and parts of downtown reduce but don't eliminate the need for a car.",
  },
];
