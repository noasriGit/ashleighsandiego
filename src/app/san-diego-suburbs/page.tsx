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
import { getSuburbs } from "@/data/suburbs";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "San Diego Suburbs | Guide to Close-In Communities Outside the City",
  description:
    "Coronado, La Mesa, Santee, Poway, Encinitas, and Solana Beach compared: distance from downtown, price positioning, and who each suburb fits best.",
  path: "/san-diego-suburbs",
  keywords: getKeywordsForPage("/san-diego-suburbs"),
});

const suburbFaqs = [
  {
    question: "What is the difference between a San Diego suburb and a neighborhood?",
    answer: "San Diego neighborhoods, like La Jolla or North Park, are part of the City of San Diego itself. Suburbs like Coronado, La Mesa, and Poway are separate incorporated cities with their own governments, schools, and services, located near but outside city limits.",
  },
  {
    question: "What is the best San Diego suburb for families?",
    answer: "It depends on priorities like commute, schools, and lot size. Poway and La Mesa are commonly compared for inland value, while Coronado and Solana Beach are compared for coastal access. A strategy call can narrow this down based on your specific budget and commute.",
  },
  {
    question: "Are San Diego suburbs more affordable than the city?",
    answer: "Generally, inland suburbs like La Mesa, Santee, and Poway offer more square footage per dollar than coastal City of San Diego neighborhoods. Coastal suburbs like Coronado and Solana Beach can be just as expensive, or more, than City of San Diego coastal areas.",
  },
];

export default function SanDiegoSuburbsPage() {
  const suburbs = getSuburbs();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "San Diego Suburbs",
            "Guide to close-in San Diego County suburbs outside the City of San Diego.",
            "/san-diego-suburbs",
          ),
          breadcrumbSchema([{ name: "San Diego Suburbs", path: "/san-diego-suburbs" }]),
          itemListSchema(suburbs.map((s) => ({ name: s.name }))),
          faqSchema(suburbFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "San Diego Suburbs" }]} />
      </div>

      <PageHero
        kicker="County-Wide Guide"
        headline="San Diego Suburbs: A Guide to Communities Outside the City"
        subheadline="Coronado, La Mesa, Santee, Poway, Encinitas, and Solana Beach compared side by side, so you can weigh commute, price, and lifestyle before you start touring."
        primaryCta={{ label: "Book a Suburb Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "See Larger Cities Nearby", href: "/cities-near-san-diego" }}
        heroImage={marketingHeroes.relocating.src}
        heroImageAlt={marketingHeroes.relocating.alt}
      />

      <Section kicker="Compare Suburbs">
        <div className="grid gap-6 sm:grid-cols-2">
          {suburbs.map((s) => (
            <Card key={s.slug} accent="cabernet">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="heading-card text-cabernet">{s.name}</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
                  {s.distanceFromDowntown}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-espresso/90">{s.description}</p>
              <p className="mt-3 text-sm font-medium text-cabernet">{s.goodFor}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="sand">
        <p className="max-w-2xl text-espresso/90">
          Looking for larger incorporated cities like Carlsbad, Oceanside, Chula Vista, or Escondido?
          See{" "}
          <Link href="/cities-near-san-diego" className="text-cabernet hover:underline">
            Cities Near San Diego
          </Link>
          . Looking for neighborhoods within San Diego city limits? Start with the{" "}
          <Link href="/san-diego-neighborhood-map" className="text-cabernet hover:underline">
            San Diego Neighborhood Map
          </Link>
          .
        </p>
        <div className="mt-12">
          <IdxSearchModule
            title="Search Homes in San Diego Suburbs"
            description="Browse available listings across San Diego County suburbs."
          />
        </div>
      </Section>

      <Section variant="pearl">
        <FaqSection faqs={suburbFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "San Diego Neighborhoods", description: "Compare all San Diego neighborhoods from the homepage.", href: "/" },
          { title: "Cities Near San Diego", description: "Larger incorporated cities across the county.", href: "/cities-near-san-diego" },
          { title: "Affordable Neighborhoods", description: "Price-banded guide across the city and county.", href: "/affordable-neighborhoods-san-diego" },
        ]}
      />

      <CTABanner
        headline="Not Sure Which Suburb Fits?"
        description="Book a free strategy call to compare suburbs against your budget and commute."
        ctaLabel="Book a Suburb Strategy Call"
      />
    </>
  );
}
