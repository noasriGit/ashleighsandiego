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
import { siteConfig } from "@/data/site-config";
import { faqSchema, webPageSchema, breadcrumbSchema, articleSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Living in San Diego | What Day-to-Day Life Is Actually Like",
  description:
    "What is it really like living in San Diego? Weather, cost of living, commute reality, and citywide safety data, beyond the tourist-brochure version.",
  path: "/living-in-san-diego",
  keywords: getKeywordsForPage("/living-in-san-diego"),
});

const REVIEWED_BY = siteConfig.agent.name;
const PUBLISHED_AT = "2026-06-01";
const LAST_UPDATED = "2026-08-01";

const pageSources = [
  { label: "FBI Uniform Crime Reporting (UCR) Program" },
  { label: "San Diego Police Department crime statistics", url: "https://www.sandiego.gov/police/services/statistics" },
  { label: "SANDAG (San Diego Association of Governments)", url: "https://www.sandag.org" },
  { label: "National Weather Service San Diego", url: "https://www.weather.gov/sgx/" },
  { label: "San Diego Metropolitan Transit System (MTS)", url: "https://www.sdmts.com" },
];

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
            datePublished: PUBLISHED_AT,
            dateModified: LAST_UPDATED,
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

      <Section>
        <p className="max-w-2xl text-sm text-espresso/70">
          Reviewed by {REVIEWED_BY} · Published {PUBLISHED_AT} · Last updated {LAST_UPDATED}
        </p>
        <p className="mt-3 max-w-2xl text-espresso/90">
          This page covers what daily life in San Diego is actually like: weather, cost of living,
          transportation, and neighborhood-type trade-offs. If you&apos;re earlier in the process and
          want the step-by-step relocation and buying timeline instead, see{" "}
          <Link href="/moving-to-san-diego" className="text-cabernet hover:underline">Moving to San Diego</Link>.
        </p>
      </Section>

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

      <Section variant="sand" kicker="Coastal vs. Inland">
        <h2 className="heading-section text-cabernet">Coastal vs. Inland: What Actually Changes Day to Day</h2>
        <div className="mt-4 max-w-2xl space-y-4 text-espresso/90">
          <p>
            Coastal neighborhoods like La Jolla, Pacific Beach, and Ocean Beach get more marine-layer
            cloud cover in the mornings (June gloom season runs roughly May through July) and generally
            cooler temperatures than inland areas a few miles east. Inland and central neighborhoods
            like Clairemont, Mission Valley, and Carmel Valley tend to clear up earlier and run warmer,
            with more direct freeway access and larger, more affordable homes on average.
          </p>
          <p>
            The trade-off is largely about drive time and lifestyle, not just temperature: coastal
            living usually means less car dependence for daily errands in walkable pockets, while
            inland areas trade beach proximity for more space and generally easier parking.
          </p>
        </div>
      </Section>

      <Section kicker="Compare by Neighborhood Type">
        <h2 className="heading-section text-cabernet">Which Neighborhood Type Fits Your Daily Life</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          &ldquo;Living in San Diego&rdquo; looks different depending on the neighborhood type you
          choose. A few starting points:
        </p>
        <ul className="mt-6 max-w-2xl space-y-3 text-espresso/90">
          <li>
            <Link href="/neighborhoods/hillcrest" className="text-cabernet hover:underline">Hillcrest</Link>{" "}
            and{" "}
            <Link href="/neighborhoods/north-park" className="text-cabernet hover:underline">North Park</Link>{" "}
            for walkable, urban daily life with less car dependence.
          </li>
          <li>
            <Link href="/neighborhoods/mission-valley" className="text-cabernet hover:underline">Mission Valley</Link>{" "}
            for a central, freeway- and trolley-connected commute hub.
          </li>
          <li>
            <Link href="/la-jolla-neighborhoods" className="text-cabernet hover:underline">La Jolla</Link>{" "}
            and{" "}
            <Link href="/neighborhoods/del-mar" className="text-cabernet hover:underline">Del Mar</Link>{" "}
            for coastal daily life with beach access as a daily-life factor, not just a weekend trip.
          </li>
          <li>
            <Link href="/neighborhoods/clairemont" className="text-cabernet hover:underline">Clairemont</Link>{" "}
            and{" "}
            <Link href="/neighborhoods/carmel-valley" className="text-cabernet hover:underline">Carmel Valley</Link>{" "}
            for more space and yard on a given budget, with a more car-dependent daily routine.
          </li>
        </ul>
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

      <Section>
        <div className="max-w-2xl text-sm text-espresso/80">
          <p className="font-semibold text-espresso">Sources</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {pageSources.map((source) => (
              <li key={source.label}>
                {source.url ? (
                  <a href={source.url} className="text-cabernet hover:underline" target="_blank" rel="noopener noreferrer">
                    {source.label}
                  </a>
                ) : (
                  source.label
                )}
              </li>
            ))}
          </ul>
        </div>
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
