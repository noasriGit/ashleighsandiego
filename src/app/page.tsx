import { Section } from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { StatBand } from "@/components/ui/StatBand";
import { SplitSection } from "@/components/ui/SplitSection";
import { CommunityCard } from "@/components/community/CommunityCard";
import { Hero } from "@/components/marketing/Hero";
import { Timeline } from "@/components/marketing/Timeline";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { FaqSection } from "@/components/marketing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";
import { getLaunchCommunities } from "@/data/communities";
import { communityContent } from "@/data/community-content";
import { splitSections } from "@/data/page-images";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { homeFaqs, buyerRoadmapSteps } from "@/data/faqs";
import { generatePageMetadata } from "@/lib/metadata";
import {
  realEstateAgentSchema,
  localBusinessSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "San Diego Relocation Home Guide | Neighborhood Guidance & Home Search",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "moving to San Diego",
    "relocating to San Diego",
    "La Jolla homes",
    "San Diego neighborhoods",
    "San Diego relocation realtor",
  ],
});

export default async function HomePage() {
  const featuredCommunities = getLaunchCommunities().filter((c) => c.tier === 1).slice(0, 6);

  const generalSearch = getIdxSearchConfig();
  const [generalCount, generalListings] = await Promise.all([
    getSavedSearchCount(generalSearch.savedSearchId),
    getCommunityListings(undefined, 6),
  ]);

  return (
    <>
      <JsonLd
        data={[
          realEstateAgentSchema(),
          localBusinessSchema(),
          webPageSchema(
            "San Diego Relocation Home Guide",
            siteConfig.description,
            "/",
          ),
          faqSchema(homeFaqs),
        ]}
      />

      <Hero
        kicker="Berkshire Hathaway HomeServices California Properties"
        headline="Moving to San Diego? Start With a Clear Home-Buying Plan."
        subheadline="Neighborhood guidance, relocation resources, and home search support for buyers moving to San Diego — including first-time buyers, military/VA buyers, and out-of-area movers."
        primaryCta={{ label: siteConfig.ctas.strategyCall, href: "/contact" }}
        secondaryCta={{ label: siteConfig.ctas.searchHomes, href: "/search-homes" }}
        backgroundImage="/images/hero1.jpg"
        backgroundImageAlt="San Diego coastal homes and neighborhoods"
        backgroundImageFit="cover"
        backgroundImagePosition="object-top"
        backgroundImagePanX={-8}
        fullViewport
        layout="right"
        size="display"
        mobileContactCard
      />

      <StatBand
        stats={[
          { value: "13", label: "Neighborhood Guides" },
          { value: `${siteConfig.geo.radiusMiles}-mile`, label: "Radius from La Jolla" },
          { value: "5", label: "Buyer Paths" },
          { value: "1", label: "Local Guide" },
        ]}
      />

      <Section kicker="Find Your Path">
        <h2 className="heading-section text-cabernet">Where Are You in Your Move?</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Choose the path that fits your situation. Each guide is tailored to your priorities — commute, budget, schools, and lifestyle.
        </p>
        <div className="mt-10">
          <BentoGrid
            items={[
              {
                title: "Relocating to San Diego",
                description:
                  "Moving from out of area? Get neighborhood guidance and a step-by-step buyer plan before you start touring.",
                href: "/relocating-to-san-diego",
                eyebrow: "Start here",
                span: "feature",
                highlight: true,
                imageSrc: "/images/san-diego-dawn-early-morning-with-palm-tree-silhouette.jpg",
                imageAlt: "San Diego dawn with palm tree silhouettes",
              },
              {
                title: "Military / VA Buyers",
                description:
                  "PCS orders to San Diego? Understand neighborhoods, base commutes, and the buyer process for military families.",
                href: "/military-va-relocation-san-diego",
                eyebrow: "PCS",
              },
              {
                title: "First-Time Homebuyers",
                description:
                  "New to buying? Learn about San Diego affordability, property types, and what to know before touring.",
                href: "/first-time-home-buyer-san-diego",
                eyebrow: "New buyers",
              },
              {
                title: "Comparing Neighborhoods",
                description:
                  "Not sure which community fits? Explore guides for La Jolla, Pacific Beach, UTC, Del Mar, and more.",
                href: "/neighborhoods",
                eyebrow: "Explore",
              },
              {
                title: "Professionals Moving for Work",
                description:
                  "Biotech, healthcare, or university role? Find neighborhoods that match your commute and lifestyle.",
                href: "/neighborhoods",
                eyebrow: "Career move",
                span: "wide",
              },
            ]}
          />
        </div>
      </Section>

      <Section variant="sand" kicker="Featured Communities">
        <h2 className="heading-section text-cabernet">
          Neighborhood Guides Near La Jolla
        </h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Explore buyer guides for communities within a {siteConfig.geo.radiusMiles}-mile radius of {siteConfig.geo.center}.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCommunities.map((community) => {
            const content = communityContent[community.slug];
            return (
              <CommunityCard
                key={community.slug}
                community={community}
                thumbnail={content?.thumbnail}
                thumbnailAlt={content?.thumbnailAlt}
              />
            );
          })}
        </div>
        <Button href="/neighborhoods" variant="outline" className="mt-8">
          {siteConfig.ctas.compareNeighborhoods}
        </Button>
      </Section>

      <Timeline
        kicker="Your Roadmap"
        title="Your Relocation Buyer Roadmap"
        intro="A clear plan helps you compare neighborhoods, understand your budget, and tour homes with confidence."
        steps={buyerRoadmapSteps}
      />

      <SplitSection
        id="military-va"
        variant="sand"
        kicker="Military & VA"
        heading="Military & VA Relocation Support"
        body={[
          "PCS orders to San Diego bring unique timing and location considerations. We help military buyers understand neighborhoods near Naval Base San Diego, MCAS Miramar, Naval Base Point Loma, and NAS North Island — without making the entire site military-only.",
          "Consult a licensed lender for VA loan eligibility and financing advice. We focus on neighborhood education, home search, and buyer guidance.",
        ]}
        cta={{ label: "Build Your PCS Buyer Plan", href: "/military-va-relocation-san-diego" }}
        imageSrc={splitSections["home/military-va"].src}
        imageAlt={splitSections["home/military-va"].alt}
        imagePosition="right"
      />

      <SplitSection
        id="first-time-buyer"
        kicker="First-Time Buyers"
        heading="First-Time Buyer Support"
        body={[
          "Buying your first home in San Diego comes with unique challenges — affordability, property types, and competitive markets. We help first-time buyers understand neighborhoods, get pre-approved, and tour with a plan.",
          "Whether you're relocating or buying locally, a clear roadmap helps you avoid costly mistakes.",
        ]}
        cta={{ label: "First-Time Buyer Guide", href: "/first-time-home-buyer-san-diego" }}
        imageSrc={splitSections["home/first-time-buyer"].src}
        imageAlt={splitSections["home/first-time-buyer"].alt}
        imagePosition="left"
      />

      <Section
        variant="espresso"
        backgroundImage="/images/lajolla.jpg"
        backgroundImageAlt="Aerial view of La Jolla coastline, beach, and Pacific Ocean"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker mb-3 text-white/70">Coverage Area</p>
            <h2 className="text-white">
              {siteConfig.geo.radiusMiles}-Mile Radius from {siteConfig.geo.center}
            </h2>
            <p className="mt-4 max-w-xl text-white/85 leading-relaxed">
              Our guides cover coastal, central, and inland communities within approximately {siteConfig.geo.radiusMiles} miles of La Jolla — from Del Mar to Point Loma, UTC to North Park.
            </p>
            <Button
              href="/neighborhoods"
              variant="secondary"
              className="mt-8"
            >
              {siteConfig.ctas.compareNeighborhoods}
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-white/20 bg-white/5" />
              <span className="absolute inset-8 rounded-full border border-white/25 bg-white/5" />
              <span className="absolute inset-16 rounded-full border border-white/30 bg-white/10" />
              <span className="relative flex flex-col items-center gap-1 text-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="text-sm font-medium text-white">{siteConfig.geo.center}</span>
                <span className="text-xs text-white/70">{siteConfig.geo.radiusMiles}-mile radius</span>
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <LeadMagnet
            title="San Diego Relocation Buyer Checklist"
            description="Get our free checklist covering neighborhood research, budget planning, and what to do before touring homes."
            leadType="relocation-checklist"
            checklistItems={[
              "Define commute and lifestyle priorities",
              "Research neighborhoods within your budget",
              "Get pre-approved before touring",
              "Plan your out-of-area visit strategy",
              "Understand San Diego property types",
            ]}
          />
          <div className="flex flex-col justify-center">
            <p className="kicker mb-3">Your Local Guide</p>
            <h2 className="heading-section text-cabernet">Guidance From a Local Buyer Specialist</h2>
            <p className="mt-4 leading-relaxed text-espresso/90">
              Hi, I&apos;m {siteConfig.agent.name}. I help relocating buyers understand San Diego neighborhoods, compare areas near La Jolla, and build a clear home-buying plan.
            </p>
            <p className="mt-4 leading-relaxed text-espresso/90">
              Whether you&apos;re moving for military orders, a new job, or a lifestyle change — I&apos;m here to provide guidance, resources, and responsive support throughout your search.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-cabernet/20">
                <Image
                  src={siteConfig.agent.photo}
                  alt={siteConfig.agent.name}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </div>
              <div className="text-sm text-espresso/80">
                <p className="font-semibold text-espresso">{siteConfig.agent.name}</p>
                <p>California DRE #{siteConfig.agent.dreNumber}</p>
                <p>{siteConfig.brokerage.name}</p>
                <p className="mt-1">
                  <Link href={`tel:${siteConfig.agent.phone.replace(/[^0-9+]/g, "")}`} className="text-cabernet hover:underline">
                    {siteConfig.agent.phone}
                  </Link>
                </p>
              </div>
            </div>
            <Button href="/contact" className="mt-6 self-start">
              {siteConfig.ctas.strategyCall}
            </Button>
          </div>
        </div>
      </Section>

      <CommunityListings
        title="Featured San Diego Listings"
        description="A sample of current homes for sale near La Jolla and across San Diego."
        listings={generalListings}
        count={generalCount}
        viewAllUrl={getIdxBrowseUrl() ?? undefined}
        variant="sand"
      />

      <Section id="search" variant="pearl">
        <IdxSearchModule
          title="Search Homes Near La Jolla"
          description="Browse available homes within the La Jolla area and surrounding San Diego neighborhoods."
          variant={generalListings.length > 0 ? "api-preview" : "link"}
          listings={generalListings}
          count={generalCount}
        />
      </Section>

      <Section>
        <FaqSection faqs={homeFaqs} />
      </Section>

      <CTABanner
        headline="Ready to Build Your San Diego Buyer Plan?"
        description="Book a free strategy call to discuss neighborhoods, budget, and your relocation timeline."
      />
    </>
  );
}
