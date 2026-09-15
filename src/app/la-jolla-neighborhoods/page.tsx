import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { Section } from "@/components/ui/Section";
import { SplitSection } from "@/components/ui/SplitSection";
import { StatBand } from "@/components/ui/StatBand";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { laJollaFaqs } from "@/data/faqs";
import { communities } from "@/data/communities";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { marketingHeroes, splitSections } from "@/data/page-images";
import { faqSchema, webPageSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "La Jolla Neighborhoods | Subarea Guide for Buyers",
  description:
    "La Jolla isn't one neighborhood. Compare all 8 La Jolla subareas, from the Village to Bird Rock to Muirlands, before you search for homes.",
  path: "/la-jolla-neighborhoods",
  keywords: getKeywordsForPage("/la-jolla-neighborhoods"),
});

const subareaSlugs = communities.filter((c) => c.slug === "la-jolla" || c.parentSlug === "la-jolla").map((c) => c.slug);
const subareas = communities.filter((c) => subareaSlugs.includes(c.slug));

export default async function LaJollaNeighborhoodsPage() {
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
            "La Jolla Neighborhoods",
            "Subarea guide to all 8 La Jolla neighborhoods for relocating buyers.",
            "/la-jolla-neighborhoods",
          ),
          breadcrumbSchema([{ name: "La Jolla Neighborhoods", path: "/la-jolla-neighborhoods" }]),
          itemListSchema(subareas.map((c) => ({ name: c.name, path: `/neighborhoods/${c.slug}` }))),
          faqSchema(laJollaFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "La Jolla Neighborhoods" }]} />
      </div>

      <PageHero
        kicker="Coastal Living"
        headline="La Jolla Neighborhoods: The 8 Subareas Compared"
        subheadline="La Jolla isn't one uniform village. Compare the Cove, Shores, Village, Bird Rock, Muirlands, Mount Soledad, Windansea, and Torrey Pines before you start touring homes."
        primaryCta={{ label: "Book a La Jolla Buyer Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Search La Jolla Homes", href: "/la-jolla-condos-for-sale" }}
        heroImage={marketingHeroes.movingToLaJolla.src}
        heroImageAlt={marketingHeroes.movingToLaJolla.alt}
        size="display"
      />

      <StatBand
        stats={[
          { value: "8", label: "Distinct Subareas" },
          { value: "92037", label: "Primary ZIP Code" },
          { value: "UCSD · Scripps", label: "Nearby Anchors" },
          { value: "Condos", label: "to Luxury Homes" },
        ]}
      />

      <Section kicker="Know the Map">
        <h2 className="heading-section text-cabernet">Every La Jolla Subarea, Compared</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          This page compares La Jolla&apos;s named neighborhoods, Village, Shores, Bird Rock,
          Muirlands, and the rest, so you can see how housing stock and daily routines differ by
          pocket. For daily life, commute context, and whether La Jolla fits as a whole, start with
          the{" "}
          <Link href="/neighborhoods/la-jolla" className="text-cabernet hover:underline">
            La Jolla living guide
          </Link>
          . Each subarea card below is a starting point, not a second copy of that living guide.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subareas.map((c) => (
            <Link
              key={c.slug}
              href={`/neighborhoods/${c.slug}`}
              className="group flex flex-col rounded-xl border border-surface-muted border-t-2 border-t-transparent bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-t-cabernet hover:shadow-lg"
            >
              <h3 className="heading-card text-cabernet">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/80">{c.tagline}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-cabernet">
                View guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <SplitSection
        id="village"
        variant="sand"
        kicker="The Village"
        heading="What It's Like Living Near La Jolla"
        body={[
          "La Jolla is one of San Diego's most recognizable coastal communities, known for ocean views, the Cove, upscale dining, and proximity to UCSD and Scripps. Living here means access to beaches, coastal trails, and a village atmosphere that's distinct from downtown or beach towns like Pacific Beach.",
          "Relocating buyers often choose La Jolla for schools, biotech and healthcare proximity, and the coastal lifestyle, but budget and subarea preferences matter significantly.",
        ]}
        imageSrc={splitSections["moving-to-la-jolla/village"].src}
        imageAlt={splitSections["moving-to-la-jolla/village"].alt}
        imagePosition="right"
      />

      <SplitSection
        id="housing"
        kicker="Housing"
        heading="Housing Types Across La Jolla"
        body={[
          "La Jolla offers condos, townhomes, and single-family homes, including luxury ocean-view properties. Condos and townhomes in the Village can be entry points for buyers who want the La Jolla address. Single-family homes on the hillsides in Muirlands and Mount Soledad command premium prices.",
          "Inventory is limited and competitive. See our dedicated condo guide for building-level detail, or compare La Jolla against Del Mar if you're weighing both.",
        ]}
        imageSrc={splitSections["moving-to-la-jolla/housing"].src}
        imageAlt={splitSections["moving-to-la-jolla/housing"].alt}
        imagePosition="left"
      />

      <Section variant="pearl">
        <CalloutBlock type="quote" label="Why buyers choose La Jolla">
          A coastal village with world-class research, strong schools, and ocean trails, La Jolla
          rewards buyers who match the right subarea to their budget and lifestyle.
        </CalloutBlock>
      </Section>

      <CommunityListings
        title="Featured La Jolla Homes"
        description="A sample of current listings in La Jolla and nearby coastal communities."
        slug="la-jolla"
        limit={3}
        variant="sand"
        viewAllUrl={browseUrl ?? undefined}
        count={liveCount}
      />

      <Section variant="pearl">
        <IdxSearchModule
          title="Search La Jolla Homes for Sale"
          description="Browse available homes in La Jolla and nearby coastal communities."
          defaultArea="La Jolla"
          communitySlug="la-jolla"
          variant={listings.length > 0 ? "api-preview" : "link"}
          listings={listings}
        />
      </Section>

      <Section variant="sand">
        <FaqSection faqs={laJollaFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "San Diego Neighborhoods", description: "Compare all San Diego neighborhoods from the homepage.", href: "/" },
          { title: "La Jolla Real Estate Agent", description: "Work directly with a La Jolla-focused buyer's agent.", href: "/la-jolla-real-estate-agent" },
          { title: "La Jolla Condos for Sale", description: "Building-by-building guide to La Jolla condo living.", href: "/la-jolla-condos-for-sale" },
          { title: "La Jolla vs Del Mar", description: "Comparing San Diego's two premier coastal villages.", href: "/la-jolla-vs-del-mar" },
        ]}
      />

      <CTABanner
        headline="Ready to Explore La Jolla Neighborhoods?"
        description="Book a free strategy call to discuss subareas, budget, and your relocation timeline."
        ctaLabel="Book a La Jolla Strategy Call"
      />
    </>
  );
}
