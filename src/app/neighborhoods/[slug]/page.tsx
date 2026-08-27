import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/marketing/CTABanner";
import { FaqSection } from "@/components/marketing/FaqSection";
import { PageHero } from "@/components/marketing/PageHero";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { ComparisonCards } from "@/components/community/ComparisonCards";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCommunityBySlug,
  getRelatedCommunities,
  getLaunchCommunitySlugs,
} from "@/data/communities";
import { getCommunityContent } from "@/data/community-content";
import { isZipOnlySubarea } from "@/data/community-zips";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { getRobotsForCommunity } from "@/lib/seo-indexability";
import { faqSchema, webPageSchema, breadcrumbSchema, articleSchema } from "@/lib/schema";
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
  "Parks and Recreation Access": "bg-gradient-to-br from-earth via-cabernet to-espresso",
  "Near Military Installations": "bg-gradient-to-br from-espresso via-cabernet to-earth",
};

export async function generateStaticParams() {
  return getLaunchCommunitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) return {};

  const path = `/neighborhoods/${slug}`;
  const robots = getRobotsForCommunity(slug);
  const content = getCommunityContent(slug);
  return generatePageMetadata({
    title: content?.metaTitle ?? `Living in ${community.name}: A Buyer's Guide`,
    description:
      content?.metaDescription ??
      `${community.tagline} Guide for relocating buyers considering ${community.name}, San Diego.`,
    path,
    keywords: getKeywordsForPage(path),
    noindex: Boolean(robots),
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

  const listingsDescription = isZipOnlySubarea(slug)
    ? `Listings are filtered by ZIP code and may include nearby areas beyond ${community.name}. Tour specific blocks and streets with your agent before deciding.`
    : undefined;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            content.metaTitle ?? `Living in ${community.name}: A Buyer's Guide`,
            content.metaDescription ?? community.tagline,
            path,
          ),
          breadcrumbSchema([
            { name: "Neighborhoods", path: "/neighborhoods" },
            { name: community.name, path },
          ]),
          faqSchema(content.faqs),
          ...(content.publishedAt || content.lastSubstantialUpdate
            ? [
                articleSchema({
                  title: content.metaTitle ?? `Living in ${community.name}: A Buyer's Guide`,
                  description: content.metaDescription ?? community.tagline,
                  path,
                  datePublished: content.publishedAt,
                  dateModified: content.lastSubstantialUpdate,
                }),
              ]
            : []),
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
            {content.expertSummary && (
              <CalloutBlock type="quote" label={`From ${content.reviewedBy ?? "our team"}`} className="mb-10">
                {content.expertSummary}
              </CalloutBlock>
            )}

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

              {content.housingBreakdown && content.housingBreakdown.length > 0 && (
                <div className="mt-8 space-y-6">
                  {content.housingBreakdown.map((section) => (
                    <div key={section.title}>
                      <h3 className="heading-card text-cabernet">{section.title}</h3>
                      <p className="mt-2 leading-relaxed text-espresso/90">{section.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {content.namedCommunities && content.namedCommunities.length > 0 && (
                <div className="mt-8">
                  <h3 className="heading-card text-cabernet">Named Communities &amp; Buildings to Know</h3>
                  <p className="mt-2 text-sm text-espresso/80">
                    Confirm current HOA, pricing, and availability details directly, this list is a
                    starting point for your search, not a substitute for live listing data.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {content.namedCommunities.map((item) => (
                      <div key={item.name} className="rounded-xl border border-surface-muted bg-white p-5 shadow-sm">
                        <p className="font-semibold text-espresso">{item.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-espresso/80">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {content.transactionalPage && (
              <CalloutBlock type="tip" className="mt-10">
                <Link href={content.transactionalPage.href} className="font-semibold text-cabernet hover:underline">
                  {content.transactionalPage.label} &rarr;
                </Link>
                <p className="mt-2">{content.transactionalPage.description}</p>
              </CalloutBlock>
            )}

            <CalloutBlock type="tip" className="mt-10">
              Inventory and pricing vary by subarea. Tour with a clear budget and a short list of
              must-haves so you can move quickly when the right home appears.
            </CalloutBlock>

            {content.buyerDueDiligence && content.buyerDueDiligence.length > 0 && (
              <section id="due-diligence" className="mt-14 scroll-mt-28">
                <h2 className="heading-section text-cabernet">Buyer Due-Diligence Considerations</h2>
                <ul className="mt-6 space-y-3">
                  {content.buyerDueDiligence.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-espresso/90">
                      <span className="mt-1 text-cabernet" aria-hidden="true">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section id="lifestyle" className="mt-14 scroll-mt-28">
              <h2 className="heading-section text-cabernet">Lifestyle &amp; Amenities</h2>
              <p className="mt-4 leading-relaxed text-espresso/90">{content.lifestyle}</p>
            </section>

            <section id="commute" className="mt-14 scroll-mt-28">
              <h2 className="heading-section text-cabernet">Commute Considerations</h2>
              <p className="mt-4 leading-relaxed text-espresso/90">{content.commute}</p>

              {content.commuteContext && content.commuteContext.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {content.commuteContext.map((item) => (
                    <li key={item.destination} className="text-espresso/90">
                      <span className="font-semibold text-espresso">{item.destination}: </span>
                      {item.note}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {content.subareas && content.subareas.length > 0 && (
              <section id="subareas" className="mt-14 scroll-mt-28">
                <h2 className="heading-section text-cabernet">{community.name} Subareas</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {content.subareas.map((sub) => (
                    <div key={sub.slug} className="rounded-xl border border-surface-muted bg-white p-5 shadow-sm">
                      <p className="font-semibold text-espresso">{sub.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-espresso/80">{sub.description}</p>
                      <p className="mt-2 text-sm leading-relaxed text-cabernet">{sub.buyingDistinction}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.buyerMisunderstandings && content.buyerMisunderstandings.length > 0 && (
              <CalloutBlock type="tip" label="Common buyer misunderstandings" className="mt-14">
                <ul className="space-y-2">
                  {content.buyerMisunderstandings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CalloutBlock>
            )}
          </div>
        </div>
      </Section>

      <CommunityListings
        id="search"
        communityName={community.name}
        slug={slug}
        listings={listings}
        count={liveCount}
        viewAllUrl={browseUrl ?? undefined}
        description={listingsDescription}
        variant="sand"
      />

      <Section id="compare" variant="sand" kicker="Compare Nearby">
        <h2 className="heading-section text-cabernet">Nearby Areas to Compare</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Weigh {community.name} against neighboring communities with different price points, commutes, and lifestyles.
        </p>
        <div className="mt-8">
          <ComparisonCards comparisons={content.nearbyComparisons} />
        </div>
      </Section>

      <Section id="faqs">
        <FaqSection faqs={content.faqs} />
      </Section>

      {(content.reviewedBy || content.sources) && (
        <Section variant="sand">
          <div className="max-w-3xl text-sm text-espresso/80">
            {content.reviewedBy && (
              <p>
                Reviewed by {content.reviewedBy}
                {content.publishedAt && <> · Published {content.publishedAt}</>}
                {content.lastSubstantialUpdate && <> · Last updated {content.lastSubstantialUpdate}</>}
              </p>
            )}
            {content.sources && content.sources.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-espresso">Sources</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  {content.sources.map((source) => (
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
            )}
          </div>
        </Section>
      )}

      <RelatedPages
        title="Related Neighborhoods"
        items={related.map((c) => ({
          title: c.name,
          description: c.tagline,
          href: `/neighborhoods/${c.slug}`,
        }))}
      />

      <CTABanner
        headline={`Need Help Narrowing Your Search in ${community.name}?`}
        description="Book a free strategy call to discuss whether this neighborhood fits your relocation plan."
      />
    </>
  );
}
