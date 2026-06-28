import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/marketing/CTABanner";
import { FaqSection } from "@/components/marketing/FaqSection";
import { PageHero } from "@/components/marketing/PageHero";
import { CommunityIdxSearch } from "@/components/idx/CommunityIdxSearch";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { IDX_BASE_URL, isIdxPublicEnabled } from "@/data/idx-links";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { ComparisonCards } from "@/components/community/ComparisonCards";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCommunityBySlug,
  getRelatedCommunities,
  launchCommunitySlugs,
} from "@/data/communities";
import { getCommunityContent } from "@/data/community-content";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";
import type { LifestyleTag } from "@/data/communities";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Dark, brand-only gradients (white hero text stays readable) keyed to a
// community's primary lifestyle, so each guide leads with its own identity.
const heroGradient: Record<LifestyleTag, string> = {
  Coastal: "bg-gradient-to-br from-cabernet via-earth to-espresso",
  "Close to UCSD/UTC": "bg-gradient-to-br from-espresso via-cabernet to-cabernet",
  "Commute-friendly": "bg-gradient-to-br from-earth via-espresso to-espresso",
  "More affordable nearby": "bg-gradient-to-br from-espresso via-earth to-cabernet",
  "Nightlife/walkability": "bg-gradient-to-tr from-cabernet via-cabernet to-espresso",
  "Family-oriented": "bg-gradient-to-br from-earth via-cabernet to-espresso",
  "Military/commute considerations": "bg-gradient-to-br from-espresso via-cabernet to-earth",
};

export async function generateStaticParams() {
  return launchCommunitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) return {};

  const path = `/neighborhoods/${slug}`;
  return generatePageMetadata({
    title: `Living in ${community.name}: A Buyer's Guide`,
    description: `${community.tagline} Guide for relocating buyers considering ${community.name}, San Diego.`,
    path,
    keywords: getKeywordsForPage(path),
  });
}

const TOC_ITEMS = [
  { id: "overview", label: "Who It's For" },
  { id: "housing", label: "Housing" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "commute", label: "Commute" },
  { id: "compare", label: "Compare Nearby" },
  { id: "faqs", label: "FAQs" },
];

export default async function CommunityPage({ params }: PageProps) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  const content = getCommunityContent(slug);

  if (!community?.hasGuide || !content) {
    notFound();
  }

  const related = getRelatedCommunities(slug);
  const path = `/neighborhoods/${slug}`;

  // Live listing count + API featured listings for this community (fetched in parallel).
  const searchConfig = getIdxSearchConfig(slug);
  const browseUrl = getIdxBrowseUrl(slug);
  const [liveCount, listings] = await Promise.all([
    getSavedSearchCount(searchConfig.savedSearchId),
    getCommunityListings(slug, 6),
  ]);

  const stats =
    content.stats && content.stats.length > 0
      ? typeof liveCount === "number"
        ? [...content.stats, { value: liveCount.toLocaleString(), label: "Active Listings" }]
        : content.stats
      : [];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            `Living in ${community.name}: A Buyer's Guide`,
            community.tagline,
            path,
          ),
          breadcrumbSchema([
            { name: "Neighborhoods", path: "/neighborhoods" },
            { name: community.name, path },
          ]),
          faqSchema(content.faqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Neighborhoods", href: "/neighborhoods" },
            { label: community.name },
          ]}
        />
      </div>

      <PageHero
        kicker="Neighborhood Guide"
        headline={`Living in ${community.name}`}
        subheadline={`${community.tagline} This guide helps relocating buyers understand whether ${community.name} fits your lifestyle, commute, and budget before you start touring homes.`}
        heroImage={content.heroImage}
        heroImageAlt={content.heroImageAlt ?? `${community.name}, San Diego`}
        gradientClassName={heroGradient[community.lifestyles[0]]}
        badges={community.lifestyles}
        primaryCta={{ label: `Search Homes in ${community.name}`, href: "#search" }}
        secondaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
      />

      {stats.length > 0 && (
        <StatBand
          stats={stats}
          variant={community.tier === 1 ? "espresso" : "cabernet"}
        />
      )}

      <Section>
        <div className="grid gap-10 lg:grid-cols-[200px_1fr] xl:gap-16">
          <aside className="hidden lg:block">
            <nav className="sidebar-sticky" aria-label="On this page">
              <p className="kicker mb-4">On this page</p>
              <ul className="space-y-3 text-sm">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="text-espresso/70 transition-colors hover:text-cabernet"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="max-w-3xl">
            <section id="overview" className="scroll-mt-28">
              <h2 className="heading-section text-cabernet">Who {community.name} Is Good For</h2>
              <ul className="mt-6 space-y-3">
                {content.whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-espresso/90">
                    <span className="mt-1 text-cabernet" aria-hidden="true">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="housing" className="mt-14 scroll-mt-28">
              <h2 className="heading-section text-cabernet">Housing Overview</h2>
              <p className="mt-4 leading-relaxed text-espresso/90">{content.housingOverview}</p>
            </section>

            <CalloutBlock type="tip" className="mt-10">
              Inventory and pricing vary by subarea. Tour with a clear budget and a short list of
              must-haves so you can move quickly when the right home appears.
            </CalloutBlock>

            <section id="lifestyle" className="mt-14 scroll-mt-28">
              <h2 className="heading-section text-cabernet">Lifestyle &amp; Amenities</h2>
              <p className="mt-4 leading-relaxed text-espresso/90">{content.lifestyle}</p>
            </section>

            <section id="commute" className="mt-14 scroll-mt-28">
              <h2 className="heading-section text-cabernet">Commute Considerations</h2>
              <p className="mt-4 leading-relaxed text-espresso/90">{content.commute}</p>
            </section>
          </div>
        </div>
      </Section>

      <Section id="compare" variant="sand" kicker="Compare Nearby">
        <h2 className="heading-section text-cabernet">Nearby Areas to Compare</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Weigh {community.name} against neighboring communities with different price points, commutes, and lifestyles.
        </p>
        <div className="mt-8">
          <ComparisonCards comparisons={content.nearbyComparisons} />
        </div>
      </Section>

      <CommunityListings
        communityName={community.name}
        slug={slug}
        listings={listings}
        count={liveCount}
        viewAllUrl={browseUrl ?? undefined}
        variant="sand"
      />

      {isIdxPublicEnabled() &&
        searchConfig.zipCodes.length > 0 &&
        IDX_BASE_URL && (
          <Section id="search" variant="pearl">
            <CommunityIdxSearch
              communityName={community.name}
              config={searchConfig}
              idxBaseUrl={IDX_BASE_URL}
              className="mt-0"
            />
          </Section>
        )}

      <Section id="faqs">
        <FaqSection faqs={content.faqs} />
      </Section>

      {related.length > 0 && (
        <Section variant="sand" kicker="Keep Exploring">
          <h2 className="heading-section text-cabernet">Related Neighborhoods</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((c) => (
              <Link key={c.slug} href={`/neighborhoods/${c.slug}`}>
                <Card hover accent="cabernet">
                  <h3 className="heading-card text-cabernet">{c.name}</h3>
                  <p className="mt-1 text-sm text-espresso/80">{c.tagline}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABanner
        headline={`Need Help Narrowing Your Search in ${community.name}?`}
        description="Book a free strategy call to discuss whether this neighborhood fits your relocation plan."
      />
    </>
  );
}
