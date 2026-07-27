import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { ContentSections } from "@/components/marketing/ContentSections";
import { FaqSection } from "@/components/marketing/FaqSection";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { getSavedSearchCount } from "@/lib/idx-api";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { SplitSection } from "@/components/ui/SplitSection";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { Tabs } from "@/components/ui/Tabs";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";
import { marketingHeroes, splitSections } from "@/data/page-images";
import { militaryFaqs } from "@/data/faqs";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { agentServiceSchema, faqSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Military Realtor San Diego | PCS & VA Buyer Guide",
  description:
    "PCS to San Diego? Work with a military-focused realtor for neighborhood guidance near Naval Base San Diego, MCAS Miramar, Point Loma, and NAS North Island.",
  path: "/military-realtor-san-diego",
  keywords: getKeywordsForPage("/military-realtor-san-diego"),
});

const sections = [
  {
    id: "pcs-overview",
    kicker: "PCS Basics",
    title: "PCS & Military Relocation Overview",
    content:
      "Receiving PCS orders to San Diego is a significant move, and the city offers diverse neighborhoods with very different commutes to major installations. Naval Base San Diego, MCAS Miramar, Naval Base Point Loma, and NAS North Island each have distinct geographic considerations.\n\nAs your military realtor, I help buyers understand neighborhoods, commute patterns, and the home-buying process end to end.",
  },
  {
    id: "neighborhoods",
    kicker: "Where to Look",
    title: "Neighborhoods to Consider",
    content:
      "Military buyers often evaluate Point Loma, Clairemont, Mission Valley, Pacific Beach, and La Jolla-area communities depending on duty station and BAH. Coastal areas offer lifestyle benefits; inland areas and county suburbs often provide more space per dollar.\n\nFactor your BAH rate, family size, and school needs into neighborhood selection.",
  },
];

const baseTabs = [
  {
    label: "Naval Base San Diego",
    bases: "Central and western neighborhoods are popular for the 32nd Street area.",
    neighborhoods: "Point Loma, Ocean Beach, Mission Valley",
    note: "Central freeway access via I-5 and I-15 keeps commutes manageable from several directions.",
  },
  {
    label: "Naval Base Point Loma",
    bases: "Peninsula living keeps the commute short with bay and ocean views.",
    neighborhoods: "Point Loma, Ocean Beach, Liberty Station",
    note: "Living on the peninsula means minimal commute and a relaxed coastal feel.",
  },
  {
    label: "NAS North Island",
    bases: "Coronado and the Point Loma peninsula offer the shortest commutes.",
    neighborhoods: "Point Loma, Coronado",
    note: "Bridge access shapes the daily commute, factor timing into your search.",
  },
  {
    label: "MCAS Miramar",
    bases: "Inland and central neighborhoods provide the easiest access.",
    neighborhoods: "Clairemont, Kearny Mesa, UTC, Sorrento Valley",
    note: "Inland areas often deliver more home and yard for your BAH budget.",
  },
];

export default async function MilitaryRealtorPage() {
  const browseUrl = getIdxBrowseUrl("_military");
  const liveCount = await getSavedSearchCount(getIdxSearchConfig("_military").savedSearchId);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Military Realtor San Diego",
            "PCS and VA buyer guide for military relocation to San Diego.",
            "/military-realtor-san-diego",
          ),
          breadcrumbSchema([
            { name: "Military Realtor San Diego", path: "/military-realtor-san-diego" },
          ]),
          agentServiceSchema({
            areaServed: ["Point Loma", "Clairemont", "Mission Valley", "San Diego"],
            knowsAbout: ["PCS relocation", "VA loans", "Military housing allowance (BAH)"],
          }),
          faqSchema(militaryFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Military Realtor San Diego" }]} />
      </div>

      <PageHero
        kicker="Military / VA Buyers"
        headline="PCS to San Diego? Build Your Military Buyer Plan."
        subheadline="Neighborhood guidance for military and VA buyers: commute to bases, housing options, and buyer support without the hard sell."
        primaryCta={{ label: "Build Your PCS Buyer Plan", href: "/contact" }}
        secondaryCta={{ label: siteConfig.ctas.searchHomes, href: "/search-homes" }}
        heroImage={marketingHeroes.militaryVa.src}
        heroImageAlt={marketingHeroes.militaryVa.alt}
      />

      <StatBand
        variant="espresso"
        stats={[
          { value: "4", label: "Major Installations" },
          { value: "43+", label: "Neighborhood Guides" },
          { value: "Coastal", label: "& Inland Options" },
          { value: "VA", label: "Buyer Friendly" },
        ]}
      />

      <Section kicker="By Duty Station">
        <h2 className="heading-section text-cabernet">Neighborhoods Near Major Installations</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Commute is the biggest factor for most PCS buyers. Select your installation to see which neighborhoods buyers commonly consider.
        </p>
        <div className="mt-8">
          <Tabs
            ariaLabel="Military base neighborhoods"
            tabs={baseTabs.map((base) => ({
              label: base.label,
              content: (
                <div className="max-w-2xl">
                  <p className="leading-relaxed text-espresso/90">{base.bases}</p>
                  <dl className="mt-6 space-y-4">
                    <div>
                      <dt className="kicker mb-1">Common Neighborhoods</dt>
                      <dd className="text-espresso">{base.neighborhoods}</dd>
                    </div>
                    <div>
                      <dt className="kicker mb-1">Commute Note</dt>
                      <dd className="text-espresso/90">{base.note}</dd>
                    </div>
                  </dl>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      <SplitSection
        id="va-buyer-education"
        variant="sand"
        kicker="VA Loans"
        heading="VA Buyer Education"
        body={[
          "VA loans offer significant benefits for eligible military buyers, but eligibility, entitlement, and terms depend on your service history and lender guidelines. As your military realtor, I guide you through the home search and purchase process.",
          "For VA loan eligibility, funding fees, and financing advice, consult a licensed VA-approved lender. I can provide lender introductions upon request.",
        ]}
        imageSrc={splitSections["military-va-relocation-san-diego/va-buyer-education"].src}
        imageAlt={splitSections["military-va-relocation-san-diego/va-buyer-education"].alt}
        imagePosition="right"
      >
        <CalloutBlock type="tip" label="Important">
          Consult a licensed lender for VA loan eligibility and financing advice. I provide home
          search and buyer guidance, not lending or legal advice.
        </CalloutBlock>
      </SplitSection>

      <ContentSections sections={sections} />

      <CommunityListings
        title="Featured Homes Near San Diego Bases"
        description="A sample of current listings in neighborhoods popular with military buyers."
        slug="_military"
        limit={6}
        variant="sand"
        viewAllUrl={browseUrl ?? undefined}
        count={liveCount}
      />

      <Section variant="pearl">
        <IdxSearchModule
          title="Search Homes Near San Diego Military Bases"
          description="Browse available homes in neighborhoods popular with military buyers."
          communitySlug="_military"
        />
      </Section>

      <Section variant="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <LeadMagnet
            title="San Diego Military / VA Buyer Checklist"
            description="Free checklist for PCS buyers: base commute, BAH planning, and pre-tour prep."
            leadType="military-checklist"
            checklistItems={[
              "Identify commute to your duty station",
              "Review BAH rate and housing budget",
              "Research schools if applicable",
              "Get pre-approved with a VA-approved lender",
              "Plan house-hunting trip timing",
            ]}
          />
          <div>
            <FaqSection faqs={militaryFaqs} />
            <p className="mt-6 text-sm text-espresso/80">
              Also explore:{" "}
              <Link href="/neighborhoods/point-loma" className="text-cabernet hover:underline">Point Loma</Link>,{" "}
              <Link href="/neighborhoods/clairemont" className="text-cabernet hover:underline">Clairemont</Link>,{" "}
              <Link href="/neighborhoods/mission-valley" className="text-cabernet hover:underline">Mission Valley</Link>.
            </p>
          </div>
        </div>
      </Section>

      <RelatedPages
        items={[
          { title: "San Diego Neighborhoods", description: "Compare all San Diego neighborhoods from the homepage.", href: "/" },
          { title: "Moving to San Diego", description: "The general relocation process, for context beyond PCS specifics.", href: "/moving-to-san-diego" },
          { title: "Affordable Neighborhoods", description: "Where BAH budgets stretch furthest.", href: "/affordable-neighborhoods-san-diego" },
        ]}
      />

      <CTABanner
        headline="Build Your San Diego PCS Buyer Plan"
        description="Book a free strategy call to discuss base commute, neighborhoods, and your timeline."
        ctaLabel="Build Your PCS Buyer Plan"
      />
    </>
  );
}
