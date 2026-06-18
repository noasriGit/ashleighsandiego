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
import { FeatureHighlight } from "@/components/ui/FeatureHighlight";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { laJollaFaqs } from "@/data/faqs";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { marketingHeroes, splitSections } from "@/data/page-images";
import { faqSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Moving to La Jolla | Relocation Guide for Buyers",
  description:
    "Relocating to La Jolla? Learn about neighborhoods, housing types, lifestyle, schools, and commute before you search for La Jolla homes.",
  path: "/moving-to-la-jolla",
  keywords: getKeywordsForPage("/moving-to-la-jolla"),
});

const subareas = [
  { title: "La Jolla Shores", description: "Family-friendly beach, calm waters, kayak rentals." },
  { title: "La Jolla Village", description: "Walkable dining, shopping, and condo options." },
  { title: "Bird Rock", description: "Local shops and restaurants south of the Village." },
  { title: "Muirlands & Mount Soledad", description: "Hillside homes with canyon and ocean views." },
];

export default async function MovingToLaJollaPage() {
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
            "Moving to La Jolla",
            "Relocation guide for buyers moving to La Jolla, San Diego.",
            "/moving-to-la-jolla",
          ),
          breadcrumbSchema([{ name: "Moving to La Jolla", path: "/moving-to-la-jolla" }]),
          faqSchema(laJollaFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Moving to La Jolla" }]} />
      </div>

      <PageHero
        kicker="Coastal Living"
        headline="Your Guide to Relocating Near La Jolla"
        subheadline="Understand La Jolla neighborhoods, housing types, and lifestyle before you start touring homes."
        primaryCta={{ label: "Book a La Jolla Buyer Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Search La Jolla Homes", href: "/search-homes" }}
        heroImage={marketingHeroes.movingToLaJolla.src}
        heroImageAlt={marketingHeroes.movingToLaJolla.alt}
        size="display"
      />

      <SplitSection
        id="village"
        kicker="The Village"
        heading="What It's Like Living Near La Jolla"
        body={[
          "La Jolla is one of San Diego's most recognizable coastal communities, known for ocean views, the Cove, upscale dining, and proximity to UCSD and Scripps. Living here means access to beaches, coastal trails, and a village atmosphere that's distinct from downtown or beach towns like Pacific Beach.",
          "Relocating buyers often choose La Jolla for schools, biotech/healthcare proximity, and the coastal lifestyle, but budget and subarea preferences matter significantly.",
        ]}
        imageSrc={splitSections["moving-to-la-jolla/village"].src}
        imageAlt={splitSections["moving-to-la-jolla/village"].alt}
        imagePosition="right"
      />

      <SplitSection
        id="subareas"
        variant="sand"
        kicker="Know the Map"
        heading="La Jolla Neighborhoods & Subareas"
        body={[
          "La Jolla isn't one uniform area. La Jolla Shores offers family-friendly beach access. Bird Rock has a local village feel south of the main Village. The Village itself is walkable with condos and dining. Muirlands and Mount Soledad provide hillside views. Windansea is known for surf culture.",
          "Understanding these subareas helps you target your search, a condo in the Village feels very different from a home in La Jolla Shores.",
        ]}
        imageSrc={splitSections["moving-to-la-jolla/subareas"].src}
        imageAlt={splitSections["moving-to-la-jolla/subareas"].alt}
        imagePosition="left"
      />

      <Section variant="pearl">
        <CalloutBlock type="quote" label="Why buyers choose La Jolla">
          A coastal village with world-class research, top schools, and ocean trails, La Jolla
          rewards buyers who match the right subarea to their budget and lifestyle.
        </CalloutBlock>
      </Section>

      <StatBand
        stats={[
          { value: "6+", label: "Distinct Subareas" },
          { value: "Coastal", label: "Village Lifestyle" },
          { value: "UCSD", label: "& Scripps Nearby" },
          { value: "Condos", label: "to Luxury Homes" },
        ]}
      />

      <SplitSection
        id="housing"
        kicker="Housing"
        heading="Housing Types in La Jolla"
        body={[
          "La Jolla offers condos, townhomes, and single-family homes, including luxury ocean-view properties. Condos and townhomes in the Village can be entry points for buyers who want the La Jolla address. Single-family homes on the hillsides command premium prices.",
          "Inventory is limited and competitive. Having a clear budget and property type preference before searching saves time.",
        ]}
        imageSrc={splitSections["moving-to-la-jolla/housing"].src}
        imageAlt={splitSections["moving-to-la-jolla/housing"].alt}
        imagePosition="right"
      />

      <SplitSection
        id="lifestyle"
        variant="sand"
        kicker="Daily Life"
        heading="Lifestyle: Beach, Dining, Schools & UCSD"
        body={[
          "La Jolla's lifestyle centers on the coast, beaches, kayaking, coastal hiking, and outdoor dining. UCSD and Scripps Health bring academic and medical community energy. Schools are a major draw for relocating families.",
          "The pace is quieter and more upscale than Pacific Beach. Dining ranges from casual to fine. Balboa Park and downtown are accessible but not walkable from most La Jolla addresses.",
        ]}
        imageSrc={splitSections["moving-to-la-jolla/lifestyle"].src}
        imageAlt={splitSections["moving-to-la-jolla/lifestyle"].alt}
        imagePosition="left"
      />

      <Section kicker="At a Glance">
        <h2 className="heading-section text-cabernet">La Jolla Subareas</h2>
        <div className="mt-8">
          <FeatureHighlight columns={2} items={subareas} />
        </div>
        <p className="mt-8 text-espresso/90">
          Read the full guide:{" "}
          <Link href="/neighborhoods/la-jolla" className="text-cabernet hover:underline">
            Living in La Jolla
          </Link>
        </p>
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

      <CTABanner
        headline="Ready to Explore La Jolla Neighborhoods?"
        description="Book a free strategy call to discuss subareas, budget, and your relocation timeline."
        ctaLabel="Book a La Jolla Strategy Call"
      />
    </>
  );
}
