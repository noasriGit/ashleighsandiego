import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCondosByDistrict } from "@/data/condo-buildings";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "La Jolla Condos for Sale | Building-by-Building Guide",
  description:
    "Compare Villa La Jolla, Seascape Shores, Bird Rock Terrace, and The Shores, La Jolla's condo buildings by neighborhood, age, and unit count.",
  path: "/la-jolla-condos-for-sale",
  keywords: getKeywordsForPage("/la-jolla-condos-for-sale"),
});

const laJollaCondoFaqs = [
  {
    question: "Are La Jolla condos a good alternative to single-family homes?",
    answer: "Yes, especially for buyers priced out of La Jolla's single-family market. Condo buildings offer a lower-maintenance entry point to a La Jolla address, though inventory turns over slowly and unit counts are small compared to downtown towers.",
  },
  {
    question: "Which La Jolla condo buildings are closest to the beach?",
    answer: "Seascape Shores sits steps from La Jolla Shores Beach, and The Shores is on Prospect Street near the Village and coastline. Villa La Jolla and Bird Rock Terrace are set back from the water but closer to UTC and local shops, respectively.",
  },
  {
    question: "Why does La Jolla have fewer condo buildings than downtown?",
    answer: "La Jolla's zoning and terrain favor lower-density, smaller-scale buildings rather than downtown-style high-rises, which keeps unit counts and turnover low.",
  },
];

export default async function LaJollaCondosPage() {
  const buildings = getCondosByDistrict("la-jolla");
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
            "La Jolla Condos for Sale",
            "Building-by-building guide to La Jolla condo buildings.",
            "/la-jolla-condos-for-sale",
          ),
          breadcrumbSchema([
            { name: "San Diego Condos for Sale", path: "/san-diego-condos-for-sale" },
            { name: "La Jolla Condos", path: "/la-jolla-condos-for-sale" },
          ]),
          itemListSchema(buildings.map((b) => ({ name: b.name }))),
          faqSchema(laJollaCondoFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "San Diego Condos for Sale", href: "/san-diego-condos-for-sale" },
            { label: "La Jolla Condos" },
          ]}
        />
      </div>

      <PageHero
        kicker="La Jolla Condo Buildings"
        headline="La Jolla Condos for Sale, Building by Building"
        subheadline="Smaller-scale buildings across La Jolla Village, La Jolla Shores, and Bird Rock, compared by age, unit count, and location."
        primaryCta={{ label: "Book a La Jolla Condo Call", href: "/contact" }}
        secondaryCta={{ label: "See All Condo Districts", href: "/san-diego-condos-for-sale" }}
        heroImage={marketingHeroes.movingToLaJolla.src}
        heroImageAlt={marketingHeroes.movingToLaJolla.alt}
      />

      <Section kicker="Condo Buildings">
        <div className="grid gap-6 sm:grid-cols-2">
          {buildings.map((b) => (
            <Card key={b.slug} accent="cabernet">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-cabernet">{b.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
                  {b.yearBuilt} · {b.stories} stories
                </span>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-espresso/50">{b.neighborhood}</p>
              <p className="mt-2 text-sm leading-relaxed text-espresso/90">{b.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CommunityListings
        title="Current La Jolla Condo Listings"
        description="A sample of current La Jolla condos for sale."
        slug="la-jolla"
        listings={listings}
        count={liveCount}
        viewAllUrl={browseUrl ?? undefined}
        variant="sand"
      />

      <Section variant="pearl">
        <FaqSection faqs={laJollaCondoFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "All Condo Districts", description: "Compare downtown, La Jolla, and Mission Valley.", href: "/san-diego-condos-for-sale" },
          { title: "La Jolla Neighborhoods", description: "Compare all 8 La Jolla subareas.", href: "/la-jolla-neighborhoods" },
          { title: "La Jolla Real Estate Agent", description: "Work with a La Jolla-focused buyer's agent.", href: "/la-jolla-real-estate-agent" },
        ]}
      />

      <CTABanner
        headline="Ready to Tour La Jolla Condo Buildings?"
        description="Book a free strategy call to compare buildings and fit."
        ctaLabel="Book a La Jolla Condo Call"
      />
    </>
  );
}
