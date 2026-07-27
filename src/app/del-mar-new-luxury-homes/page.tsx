import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Del Mar New Construction & Luxury Homes for Sale",
  description:
    "New construction developments and luxury resale in Del Mar and Del Mar Heights, coastal permitting, private inventory, and a high-touch buyer process.",
  path: "/del-mar-new-luxury-homes",
  keywords: getKeywordsForPage("/del-mar-new-luxury-homes"),
});

const delMarFaqs = [
  {
    question: "Is there new construction available in Del Mar?",
    answer: "New construction in Del Mar is limited by geography and coastal-permitting restrictions, most new inventory comes from infill rebuilds and select development projects rather than large master-planned communities. Availability changes frequently; a consultation is the fastest way to see what's currently in the pipeline.",
  },
  {
    question: "What makes buying luxury property in Del Mar different?",
    answer: "Coastal bluff and flood-zone considerations, California Coastal Commission permitting on rebuilds and additions, and a high share of off-market or quietly-marketed listings mean the process looks different from a typical resale transaction.",
  },
  {
    question: "Del Mar Village or Del Mar Heights, which is right for a luxury buyer?",
    answer: "Del Mar Village offers walkable, beach-adjacent living near the racetrack and downtown shops. Del Mar Heights sits above the village with canyon and ocean-glimpse views, generally larger lots, and a quieter residential feel.",
  },
];

export default async function DelMarLuxuryPage() {
  const searchConfig = getIdxSearchConfig("del-mar");
  const browseUrl = getIdxBrowseUrl("del-mar");
  const [listings, liveCount] = await Promise.all([
    getCommunityListings("del-mar", 6),
    getSavedSearchCount(searchConfig.savedSearchId),
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Del Mar New Construction & Luxury Homes",
            "New construction and luxury resale guidance for Del Mar and Del Mar Heights.",
            "/del-mar-new-luxury-homes",
          ),
          breadcrumbSchema([{ name: "Del Mar New & Luxury Homes", path: "/del-mar-new-luxury-homes" }]),
          collectionPageSchema({
            title: "Del Mar New Construction & Luxury Homes",
            description: "New construction and luxury resale guidance for Del Mar.",
            path: "/del-mar-new-luxury-homes",
          }),
          faqSchema(delMarFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Del Mar New & Luxury Homes" }]} />
      </div>

      <PageHero
        kicker="Coastal New Construction & Luxury"
        headline="Del Mar New Construction & Luxury Homes"
        subheadline="A private, high-touch process for new-construction and luxury resale buyers in Del Mar and Del Mar Heights."
        primaryCta={{ label: "Request a Private Consultation", href: "/contact" }}
        secondaryCta={{ label: "Compare La Jolla vs Del Mar", href: "/la-jolla-vs-del-mar" }}
        heroImage={marketingHeroes.relocating.src}
        heroImageAlt={marketingHeroes.relocating.alt}
      />

      <Section kicker="New Construction">
        <h2 className="heading-section text-cabernet">New Construction in Del Mar</h2>
        <p className="mt-4 max-w-2xl text-espresso/90">
          Large-scale new-construction communities are rare in Del Mar due to limited buildable land
          and coastal-permitting constraints. Most new inventory comes from individual infill
          rebuilds, select builder projects, and occasional small developments as they clear the
          California           Coastal Commission review process. Timelines vary widely by project and permit
          stage.
        </p>
        <p className="mt-4 max-w-2xl text-espresso/90">
          For neighborhood-level detail, see the{" "}
          <Link href="/neighborhoods/del-mar" className="text-cabernet hover:underline">Del Mar</Link> and{" "}
          <Link href="/neighborhoods/del-mar-heights" className="text-cabernet hover:underline">Del Mar Heights</Link>{" "}
          guides.
        </p>
      </Section>

      <Section variant="sand">
        <h2 className="heading-section text-cabernet">Luxury Resale</h2>
        <p className="mt-4 max-w-2xl text-espresso/90">
          Luxury resale spans architectural styles from classic beach cottages to contemporary
          bluff-top estates, with price tiers driven heavily by ocean proximity, lot size, and view
          exposure. A meaningful share of high-end inventory moves through private or quietly-marketed
          channels before it ever reaches a public listing.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Card accent="cabernet">
            <h3 className="font-serif text-lg font-semibold text-cabernet">Del Mar Village</h3>
            <p className="mt-2 text-sm text-espresso/90">Walkable, beach-adjacent, near the racetrack and downtown shops.</p>
          </Card>
          <Card accent="cabernet">
            <h3 className="font-serif text-lg font-semibold text-cabernet">Del Mar Heights</h3>
            <p className="mt-2 text-sm text-espresso/90">Elevated canyon and ocean-glimpse views, larger residential lots.</p>
          </Card>
          <Card accent="cabernet">
            <h3 className="font-serif text-lg font-semibold text-cabernet">Beach Colony</h3>
            <p className="mt-2 text-sm text-espresso/90">Del Mar&apos;s most direct beachfront enclave, limited and closely held inventory.</p>
          </Card>
        </div>
      </Section>

      <Section>
        <CalloutBlock type="tip">
          Coastal bluff and flood-zone status, along with Coastal Commission permitting history, can
          materially affect a property&apos;s rebuild or addition potential, worth confirming early in due
          diligence.
        </CalloutBlock>
      </Section>

      <CommunityListings
        title="Current Del Mar Listings"
        description="A sample of current homes for sale in Del Mar and Del Mar Heights."
        slug="del-mar"
        listings={listings}
        count={liveCount}
        viewAllUrl={browseUrl ?? undefined}
        variant="pearl"
      />

      <Section variant="sand">
        <FaqSection faqs={delMarFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "La Jolla vs Del Mar", description: "A side-by-side comparison for buyers deciding between the two.", href: "/la-jolla-vs-del-mar" },
          { title: "La Jolla Neighborhoods", description: "Compare all 8 La Jolla subareas.", href: "/la-jolla-neighborhoods" },
          { title: "La Jolla Real Estate Agent", description: "Buyer's agent representation for coastal San Diego.", href: "/la-jolla-real-estate-agent" },
        ]}
      />

      <CTABanner
        headline="Considering Del Mar?"
        description="Request a private consultation to discuss current new-construction and luxury inventory."
        ctaLabel="Request a Private Consultation"
      />
    </>
  );
}
