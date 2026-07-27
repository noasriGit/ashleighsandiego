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
  title: "Downtown San Diego Condos for Sale | Building-by-Building Guide",
  description:
    "Compare Electra, Harbor Club, Meridian, Pinnacle on the Park, The Legend, Aria, and The Mark, downtown San Diego's condo towers, building by building.",
  path: "/downtown-san-diego-condos-for-sale",
  keywords: getKeywordsForPage("/downtown-san-diego-condos-for-sale"),
});

const downtownCondoFaqs = [
  {
    question: "Which downtown San Diego condo building has the lowest HOA dues?",
    answer: "Smaller boutique buildings without full amenity packages, like Aria, generally run lower HOA dues than full-service towers with doormen and resort-style pools, like Electra or Harbor Club.",
  },
  {
    question: "Are downtown San Diego condos walkable?",
    answer: "Yes. Most downtown buildings are within walking distance of the Gaslamp Quarter, Petco Park, or the Embarcadero, and several sit on or near trolley lines.",
  },
  {
    question: "What's the difference between Marina District and East Village condo buildings?",
    answer: "Marina District buildings tend to be older, larger-scale towers with bay views and higher HOA dues. East Village buildings are newer and closer to Petco Park, with more loft-style and mid-rise options.",
  },
];

export default async function DowntownCondosPage() {
  const buildings = getCondosByDistrict("downtown");
  const searchConfig = getIdxSearchConfig("downtown-san-diego");
  const browseUrl = getIdxBrowseUrl("downtown-san-diego");
  const [listings, liveCount] = await Promise.all([
    getCommunityListings("downtown-san-diego", 6),
    getSavedSearchCount(searchConfig.savedSearchId),
  ]);

  const byNeighborhood = buildings.reduce<Record<string, typeof buildings>>((acc, b) => {
    (acc[b.neighborhood] ??= []).push(b);
    return acc;
  }, {});

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Downtown San Diego Condos for Sale",
            "Building-by-building guide to downtown San Diego condo towers.",
            "/downtown-san-diego-condos-for-sale",
          ),
          breadcrumbSchema([
            { name: "San Diego Condos for Sale", path: "/san-diego-condos-for-sale" },
            { name: "Downtown Condos", path: "/downtown-san-diego-condos-for-sale" },
          ]),
          itemListSchema(buildings.map((b) => ({ name: b.name }))),
          faqSchema(downtownCondoFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "San Diego Condos for Sale", href: "/san-diego-condos-for-sale" },
            { label: "Downtown Condos" },
          ]}
        />
      </div>

      <PageHero
        kicker="Downtown Condo Buildings"
        headline="Downtown San Diego Condos for Sale, Building by Building"
        subheadline="From Marina District towers to East Village lofts, compare year built, stories, and what actually differentiates each building before you tour."
        primaryCta={{ label: "Book a Downtown Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "See All Condo Districts", href: "/san-diego-condos-for-sale" }}
        heroImage={marketingHeroes.firstTimeBuyer.src}
        heroImageAlt={marketingHeroes.firstTimeBuyer.alt}
      />

      <Section kicker="Buildings by Sub-District">
        {Object.entries(byNeighborhood).map(([neighborhood, group]) => (
          <div key={neighborhood} className="mb-10 last:mb-0">
            <h2 className="heading-card text-cabernet">{neighborhood}</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {group.map((b) => (
                <Card key={b.slug} accent="cabernet">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-cabernet">{b.name}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
                      {b.yearBuilt} · {b.stories} stories
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-espresso/90">{b.note}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <CommunityListings
        title="Current Downtown Condo Listings"
        description="A sample of current downtown San Diego condos for sale."
        slug="downtown"
        listings={listings}
        count={liveCount}
        viewAllUrl={browseUrl ?? undefined}
        variant="sand"
      />

      <Section variant="pearl">
        <FaqSection faqs={downtownCondoFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "San Diego Neighborhoods", description: "Compare all San Diego neighborhoods from the homepage.", href: "/" },
          { title: "All Condo Districts", description: "Compare downtown, La Jolla, and Mission Valley.", href: "/san-diego-condos-for-sale" },
          { title: "La Jolla Condos for Sale", description: "Building-by-building La Jolla condo guide.", href: "/la-jolla-condos-for-sale" },
        ]}
      />

      <CTABanner
        headline="Ready to Tour Downtown Buildings?"
        description="Book a free strategy call to compare buildings and HOA fit."
        ctaLabel="Book a Downtown Strategy Call"
      />
    </>
  );
}
