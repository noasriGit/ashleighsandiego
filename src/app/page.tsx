import { Section } from "@/components/ui/Section";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { StatBand } from "@/components/ui/StatBand";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { CommunityCard } from "@/components/community/CommunityCard";
import { Hero } from "@/components/marketing/Hero";
import { CTABanner } from "@/components/marketing/CTABanner";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";
import { getLaunchCommunities } from "@/data/communities";
import { communityContent } from "@/data/community-content";
import { getHomeStatBandStats } from "@/data/home-stats";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { homeFaqs } from "@/data/faqs";
import { generatePageMetadata } from "@/lib/metadata";
import {
  realEstateAgentSchema,
  localBusinessSchema,
  webSiteSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";

const LeadMagnet = dynamic(
  () => import("@/components/marketing/LeadMagnet").then((mod) => mod.LeadMagnet),
);

const FaqSection = dynamic(
  () => import("@/components/marketing/FaqSection").then((mod) => mod.FaqSection),
);

export const metadata = generatePageMetadata({
  title: "San Diego Neighborhoods | Compare Communities Before You Buy",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "San Diego neighborhoods",
    "best neighborhoods in San Diego",
    "where to live in San Diego",
    "moving to San Diego",
    "San Diego relocation realtor",
  ],
});

const regionGroups = [
  {
    label: "Coastal",
    items: [
      { name: "La Jolla", href: "/la-jolla-neighborhoods" },
      { name: "Pacific Beach", href: "/neighborhoods/pacific-beach" },
      { name: "Del Mar", href: "/neighborhoods/del-mar" },
      { name: "Point Loma", href: "/neighborhoods/point-loma" },
      { name: "Ocean Beach", href: "/neighborhoods/ocean-beach" },
    ],
  },
  {
    label: "Central",
    items: [
      { name: "University City / UTC", href: "/neighborhoods/university-city" },
      { name: "Hillcrest", href: "/neighborhoods/hillcrest" },
      { name: "North Park", href: "/neighborhoods/north-park" },
      { name: "Bay Park", href: "/neighborhoods/bay-park" },
      { name: "Mission Valley", href: "/neighborhoods/mission-valley" },
    ],
  },
  {
    label: "Inland",
    items: [
      { name: "Clairemont", href: "/neighborhoods/clairemont" },
      { name: "Carmel Valley", href: "/neighborhoods/carmel-valley" },
      { name: "Sorrento Valley", href: "/neighborhoods/sorrento-valley" },
    ],
  },
];

const commuteGroups = [
  { name: "Biotech / UCSD / Sorrento Valley", description: "University City, Sorrento Valley, Carmel Valley", href: "/neighborhoods/university-city" },
  { name: "Urban & Walkable Living", description: "Hillcrest, North Park, and Mission Valley", href: "/neighborhoods" },
  { name: "Military Installations", description: "Point Loma, Clairemont, Mission Valley near the bases", href: "/military-realtor-san-diego" },
  { name: "Remote / Flexible Commute", description: "Coastal lifestyle first: La Jolla, Del Mar, Point Loma", href: "/la-jolla-neighborhoods" },
];

const housingTypeGroups = [
  { name: "Condos & Townhomes", description: "Mission Valley and University City near UTC", href: "/neighborhoods/mission-valley" },
  { name: "New Construction & Master-Planned", description: "Carmel Valley and Del Mar communities", href: "/neighborhoods/carmel-valley" },
  { name: "Value Single-Family Homes", description: "Clairemont and central San Diego neighborhoods", href: "/neighborhoods/clairemont" },
  { name: "Coastal Living", description: "La Jolla, Point Loma, and Ocean Beach", href: "/la-jolla-neighborhoods" },
];

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
          webSiteSchema(),
          webPageSchema(
            "San Diego Neighborhoods",
            siteConfig.description,
            "/",
          ),
          faqSchema(homeFaqs),
        ]}
      />

      <Hero
        kicker="SERHANT."
        headline="San Diego Neighborhoods, Compared for Buyers."
        subheadline="Curated San Diego neighborhood guides across the coast, central San Diego, and inland communities, grouped so you can shortlist an area by commute, budget, and lifestyle before you tour a single home."
        primaryCta={{ label: "Find My Neighborhood", href: "#find-neighborhood" }}
        secondaryCta={{ label: "Browse Neighborhood Guides", href: "/neighborhoods" }}
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

      <StatBand stats={getHomeStatBandStats()} />

      <Section id="find-neighborhood" kicker="Find Your Neighborhood">
        <h2 className="heading-section text-cabernet">Browse by Commute, Housing Type, or Region</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Pick the filter that matches how you actually make decisions. Every path leads to a
          buyer-focused guide, not just a list of ZIP codes.
        </p>
        <div className="mt-8">
          <Tabs
            ariaLabel="Browse San Diego neighborhoods"
            tabs={[
              {
                label: "By Region",
                content: (
                  <div className="grid gap-6 sm:grid-cols-3">
                    {regionGroups.map((group) => (
                      <div key={group.label}>
                        <p className="kicker mb-3">{group.label}</p>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item.name}>
                              <Link href={item.href} className="text-espresso hover:text-cabernet hover:underline">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                label: "By Commute",
                content: (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {commuteGroups.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <Card hover accent="cabernet" className="h-full">
                          <h3 className="heading-card text-cabernet">{item.name}</h3>
                          <p className="mt-1 text-sm text-espresso/80">{item.description}</p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ),
              },
              {
                label: "By Housing Type",
                content: (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {housingTypeGroups.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <Card hover accent="cabernet" className="h-full">
                          <h3 className="heading-card text-cabernet">{item.name}</h3>
                          <p className="mt-1 text-sm text-espresso/80">{item.description}</p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section variant="sand" kicker="Start Here">
        <h2 className="heading-section text-cabernet">Where Are You in Your Search?</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Choose the path that fits your situation. Each guide is tailored to your priorities: commute, budget, schools, and lifestyle.
        </p>
        <div className="mt-10">
          <BentoGrid
            items={[
              {
                title: "Moving to San Diego",
                description:
                  "Relocating from out of area? Get a step-by-step buyer plan before you start touring.",
                href: "/moving-to-san-diego",
                eyebrow: "Start here",
                span: "feature",
                highlight: true,
                imageSrc: "/images/san-diego-dawn-early-morning-with-palm-tree-silhouette.jpg",
                imageAlt: "San Diego dawn with palm tree silhouettes",
              },
              {
                title: "Military / VA Buyers",
                description:
                  "PCS orders to San Diego? Understand neighborhoods, base commutes, and the buyer process.",
                href: "/military-realtor-san-diego",
                eyebrow: "PCS",
              },
              {
                title: "First-Time Home Buyers",
                description:
                  "New to the process? Get a clear rundown of financing, offers, and closing in San Diego.",
                href: "/first-time-home-buyer-san-diego",
                eyebrow: "Buyer basics",
              },
              {
                title: "La Jolla Neighborhoods",
                description:
                  "8 distinct subareas, from the Village to Bird Rock to Muirlands, compared side by side.",
                href: "/la-jolla-neighborhoods",
                eyebrow: "Coastal",
              },
              {
                title: "Explore All Neighborhoods",
                description:
                  "Browse every San Diego community guide by region, commute, and housing type.",
                href: "/neighborhoods",
                eyebrow: "Full directory",
                span: "wide",
              },
            ]}
          />
        </div>
      </Section>

      <Section kicker="Featured Communities">
        <h2 className="heading-section text-cabernet">
          Popular Neighborhood Guides
        </h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Detailed guides to San Diego neighborhoods, covering housing stock, lifestyle, and commute.
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
              Hi, I&apos;m {siteConfig.agent.name}. I help buyers understand San Diego neighborhoods, compare
              areas across the county, and build a clear home-buying plan.
            </p>
            <p className="mt-4 leading-relaxed text-espresso/90">
              Whether you&apos;re moving for military orders, a new job, or a lifestyle change, I&apos;m here to
              provide guidance, resources, and responsive support throughout your search.
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
            <Button href="/about" variant="outline" className="mt-6 self-start">
              More About Our Approach
            </Button>
          </div>
        </div>
      </Section>

      <CommunityListings
        title="Featured San Diego Listings"
        description="A sample of current homes for sale across San Diego."
        listings={generalListings}
        count={generalCount}
        viewAllUrl={getIdxBrowseUrl() ?? undefined}
        variant="pearl"
      />

      <Section variant="sand">
        <FaqSection faqs={homeFaqs} />
      </Section>

      <CTABanner
        headline="Ready to Build Your San Diego Buyer Plan?"
        description="Book a free strategy call to discuss neighborhoods, budget, and your relocation timeline."
      />
    </>
  );
}
