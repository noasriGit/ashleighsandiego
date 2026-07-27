import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { priceBands } from "@/data/price-bands";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Affordable Neighborhoods in San Diego | Price-Banded Guide",
  description:
    "Where does your San Diego home-buying budget actually go? Compare neighborhoods by price band, from entry-level condos to value single-family homes.",
  path: "/affordable-neighborhoods-san-diego",
  keywords: getKeywordsForPage("/affordable-neighborhoods-san-diego"),
});

const affordabilityFaqs = [
  {
    question: "What is the most affordable area to buy a home near San Diego?",
    answer: "Within the City of San Diego, Clairemont, North Clairemont, Serra Mesa, and Mission Valley condos tend to offer the most affordable entry points. County-wide, suburbs like El Cajon, Santee, and La Mesa offer more square footage per dollar, see San Diego Suburbs for details.",
  },
  {
    question: "Are condos a good way to buy more affordably in San Diego?",
    answer: "Condos and townhomes generally have lower purchase prices than single-family homes in the same area, but HOA dues add to your monthly cost. Factor the full monthly payment, not just the purchase price, into your comparison.",
  },
  {
    question: "Should I compare San Diego suburbs if I'm on a budget?",
    answer: "Yes. Suburbs and inland North County and East County cities generally offer more space per dollar than City of San Diego coastal neighborhoods. See San Diego Suburbs and Cities Near San Diego for county-wide options.",
  },
];

export default function AffordableNeighborhoodsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Affordable Neighborhoods in San Diego",
            "Price-banded guide to San Diego neighborhoods for budget-focused buyers.",
            "/affordable-neighborhoods-san-diego",
          ),
          breadcrumbSchema([{ name: "Affordable Neighborhoods", path: "/affordable-neighborhoods-san-diego" }]),
          itemListSchema(priceBands.map((b) => ({ name: b.label }))),
          faqSchema(affordabilityFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Affordable Neighborhoods" }]} />
      </div>

      <PageHero
        kicker="Price-Positioning Guide"
        headline="Affordable Neighborhoods in San Diego, by Price Band"
        subheadline="No single answer fits every budget. Compare housing stock and neighborhoods by realistic price range, from entry-level condos to value single-family homes."
        primaryCta={{ label: "Book a Budget Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "See San Diego Suburbs", href: "/san-diego-suburbs" }}
        heroImage={marketingHeroes.firstTimeBuyer.src}
        heroImageAlt={marketingHeroes.firstTimeBuyer.alt}
      />

      <Section kicker="Price Bands">
        <p className="max-w-2xl text-espresso/90">
          Ranges below are approximate and change with market conditions, use them as a starting
          point for a conversation, not a guarantee. Every band lists City of San Diego
          neighborhoods only; for county-wide options at similar or lower price points, see{" "}
          <Link href="/san-diego-suburbs" className="text-cabernet hover:underline">San Diego Suburbs</Link>.
        </p>
        <div className="mt-10 space-y-8">
          {priceBands.map((band) => (
            <Card key={band.id} accent="cabernet" className="overflow-hidden">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="heading-card text-cabernet">{band.label}</h2>
                <span className="text-sm font-semibold text-espresso/70">{band.approxRange}</span>
              </div>
              <p className="mt-1 text-sm text-espresso/70">{band.housingTypes}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {band.communities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/neighborhoods/${c.slug}`}
                    className="rounded-full bg-rose px-3 py-1 text-sm font-medium text-espresso hover:bg-blush/40"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-espresso/80">{band.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="sand">
        <CalloutBlock type="tip">
          Getting pre-approved before you tour clarifies which price band is actually realistic for
          your budget, and strengthens your offer once you find the right home.
        </CalloutBlock>
        <div className="mt-12">
          <IdxSearchModule
            title="Search Homes by Budget"
            description="Browse available homes across San Diego's price bands."
          />
        </div>
      </Section>

      <Section variant="pearl">
        <FaqSection faqs={affordabilityFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "San Diego Neighborhoods", description: "Compare all San Diego neighborhoods from the homepage.", href: "/" },
          { title: "San Diego Suburbs", description: "County-wide options for buyers who want more space per dollar.", href: "/san-diego-suburbs" },
          { title: "Moving to San Diego", description: "The full step-by-step relocation process.", href: "/moving-to-san-diego" },
        ]}
      />

      <CTABanner
        headline="Not Sure What Your Budget Buys?"
        description="Book a free strategy call to map your budget to realistic neighborhoods."
        ctaLabel="Book a Budget Strategy Call"
      />
    </>
  );
}
