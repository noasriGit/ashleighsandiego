import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllCitiesAndSuburbs } from "@/data/suburbs";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Cities Near San Diego | Carlsbad, Oceanside, Chula Vista & More",
  description:
    "A county-wide guide to cities near San Diego, Carlsbad, Oceanside, Chula Vista, El Cajon, Escondido, and Vista, compared by distance, price, and lifestyle.",
  path: "/cities-near-san-diego",
  keywords: getKeywordsForPage("/cities-near-san-diego"),
});

const cityFaqs = [
  {
    question: "What are the biggest cities near San Diego?",
    answer: "Chula Vista is the county's second-largest city. Carlsbad, Oceanside, Escondido, El Cajon, and Vista are other major incorporated cities in San Diego County, each with distinct downtown areas and housing stock.",
  },
  {
    question: "Which city near San Diego is best for commuters to downtown?",
    answer: "Chula Vista and El Cajon offer the shortest commutes to downtown San Diego among the larger cities. North County cities like Carlsbad, Oceanside, Escondido, and Vista are 35-40 minutes from downtown but closer to North County job centers.",
  },
  {
    question: "Are cities near San Diego cheaper than the city itself?",
    answer: "Generally, inland cities like El Cajon and Escondido offer more affordable housing than coastal San Diego. Coastal North County cities like Carlsbad can be comparably priced to City of San Diego coastal neighborhoods.",
  },
];

export default function CitiesNearSanDiegoPage() {
  const cities = getAllCitiesAndSuburbs().filter((c) => c.category === "city");

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Cities Near San Diego",
            "Guide to incorporated cities across San Diego County.",
            "/cities-near-san-diego",
          ),
          breadcrumbSchema([{ name: "Cities Near San Diego", path: "/cities-near-san-diego" }]),
          itemListSchema(cities.map((c) => ({ name: c.name }))),
          faqSchema(cityFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cities Near San Diego" }]} />
      </div>

      <PageHero
        kicker="County-Wide Guide"
        headline="Cities Near San Diego: A County-Wide Buyer's Guide"
        subheadline="Carlsbad, Oceanside, Chula Vista, El Cajon, Escondido, and Vista compared by distance, price positioning, and lifestyle fit."
        primaryCta={{ label: "Book a County Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "See Close-In Suburbs", href: "/san-diego-suburbs" }}
        heroImage={marketingHeroes.relocating.src}
        heroImageAlt={marketingHeroes.relocating.alt}
      />

      <Section kicker="Compare Cities">
        <div className="grid gap-6 sm:grid-cols-2">
          {cities.map((c) => (
            <Card key={c.slug} accent="cabernet">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="heading-card text-cabernet">{c.name}</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
                  {c.distanceFromDowntown}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-espresso/90">{c.description}</p>
              <p className="mt-3 text-sm font-medium text-cabernet">{c.goodFor}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="sand">
        <p className="max-w-2xl text-espresso/90">
          Looking for close-in suburbs like Coronado or La Mesa instead? See{" "}
          <Link href="/san-diego-suburbs" className="text-cabernet hover:underline">
            San Diego Suburbs
          </Link>
          . Looking for neighborhoods within San Diego city limits? Start with the{" "}
          <Link href="/san-diego-neighborhood-map" className="text-cabernet hover:underline">
            San Diego Neighborhood Map
          </Link>
          .
        </p>
        <div className="mt-12">
          <IdxSearchModule
            title="Search Homes in Cities Near San Diego"
            description="Browse available listings across San Diego County cities."
          />
        </div>
      </Section>

      <Section variant="pearl">
        <FaqSection faqs={cityFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "San Diego Neighborhoods", description: "Compare all San Diego neighborhoods from the homepage.", href: "/" },
          { title: "San Diego Suburbs", description: "Close-in suburbs cross-shopped with city neighborhoods.", href: "/san-diego-suburbs" },
          { title: "Affordable Neighborhoods", description: "Price-banded guide across the city and county.", href: "/affordable-neighborhoods-san-diego" },
        ]}
      />

      <CTABanner
        headline="Considering a City Outside San Diego?"
        description="Book a free strategy call to compare cities against your budget and commute."
        ctaLabel="Book a County Strategy Call"
      />
    </>
  );
}
