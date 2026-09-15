import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { Section } from "@/components/ui/Section";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { getCommunityListings, getSavedSearchCount } from "@/lib/idx-api";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Mission Valley Condos for Sale | San Diego",
  description:
    "Browse Mission Valley condos for sale and compare East versus West, HOA considerations, parking, financing and current San Diego listings.",
  path: "/mission-valley-condos-for-sale",
  keywords: getKeywordsForPage("/mission-valley-condos-for-sale"),
  absoluteTitle: true,
});

const namedCondoCommunities = [
  { name: "Civita", note: "Master-planned community mixing condos, townhomes, and limited single-family product around shared parks; generally newer construction than the rest of the valley floor." },
  { name: "Escala", note: "A well-known Mission Valley condo development. Verify current HOA financials, reserve study, and building age directly, as with any condo purchase." },
  { name: "Mission Gate", note: "Established condo community near the Fashion Valley/I-8 corridor; confirm current HOA dues and parking assignment with your agent before touring." },
  { name: "The Lido", note: "Condo community in Mission Valley. Treat named-building searches as a starting point and confirm current listing status and HOA details directly." },
  { name: "RiverScene", note: "Condo community along the Mission Valley river corridor; ask specifically about flood-zone status and any river-adjacent HOA requirements." },
  { name: "Rancho Mission Villas", note: "Townhome/condo community in Mission Valley; compare unit size and HOA structure against Civita and other newer product." },
];

const dueDiligenceItems = [
  "HOA budget & reserve study: Ask for the current HOA budget, most recent reserve study, and any pending special assessments before writing an offer. Reserve strength varies significantly by building age and management company.",
  "Special assessments: Confirm whether the HOA has approved or is considering a special assessment. This is a standard question your agent should ask on every condo offer, not just in Mission Valley.",
  "Parking & storage: Confirm deeded or assigned parking and storage in writing. Some Mission Valley buildings assign one space per unit, others assign none, and this varies building by building.",
  "FHA/VA financing: Ask your lender whether a specific building carries current FHA or VA approval before touring. Non-approved buildings can rule out certain loan types.",
  "Building age: Building age varies widely across the valley floor. Ask for the exact year built and any major system replacements (roof, plumbing, elevators) rather than assuming based on the community name alone.",
  "Flood-zone due diligence: Mission Valley follows the San Diego River corridor. Ask your agent and lender about the FEMA flood-zone designation for a specific address, this varies parcel by parcel.",
];

const condoFaqs = [
  {
    question: "What should I check before buying a condo in Mission Valley?",
    answer: "Review the HOA budget and reserve study, ask about any pending special assessments, confirm parking and storage assignments, and check whether the building is FHA/VA-approved if you need that financing. Building age varies significantly across the valley, so ask for the specific year built rather than assuming.",
  },
  {
    question: "What is the difference between Mission Valley East and Mission Valley West for condo buyers?",
    answer: "Mission Valley West sits closer to Fashion Valley, Hazard Center, and the western trolley stations. Mission Valley East (toward Camino del Rio) includes Civita, Rancho Mission Villas, and the corridor closer to SDSU and I-15. Ask your agent which side better fits your commute before narrowing your condo search.",
  },
  {
    question: "Are Mission Valley condos a good value compared to other San Diego condo areas?",
    answer: "Mission Valley is generally considered one of the more accessible condo markets within San Diego city limits, with strong freeway (I-8, I-805, I-15) and trolley access. Compare specific buildings' HOA dues and reserve health directly rather than assuming affordability based on location alone.",
  },
  {
    question: "What is Civita and how does it differ from older Mission Valley condos?",
    answer: "Civita is a newer master-planned community within Mission Valley with a mix of condos, townhomes, and limited single-family product built around shared parks and a rec center. It's generally newer construction than legacy condo towers elsewhere in the valley, which can mean different HOA amenities and fee structures.",
  },
];

export default async function MissionValleyCondosPage() {
  const searchConfig = getIdxSearchConfig("mission-valley");
  const browseUrl = getIdxBrowseUrl("mission-valley");
  const [liveCount, listings] = await Promise.all([
    getSavedSearchCount(searchConfig.savedSearchId),
    getCommunityListings("mission-valley", 6),
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Mission Valley Condos for Sale San Diego",
            "Current Mission Valley condo inventory and condo-specific buying considerations.",
            "/mission-valley-condos-for-sale",
          ),
          breadcrumbSchema([
            { name: "San Diego Condos for Sale", path: "/san-diego-condos-for-sale" },
            { name: "Mission Valley Condos", path: "/mission-valley-condos-for-sale" },
          ]),
          collectionPageSchema({
            title: "Mission Valley Condos for Sale",
            description: "Current condo inventory and condo-specific buying considerations for Mission Valley, San Diego.",
            path: "/mission-valley-condos-for-sale",
          }),
          faqSchema(condoFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "San Diego Condos for Sale", href: "/san-diego-condos-for-sale" },
            { label: "Mission Valley Condos" },
          ]}
        />
      </div>

      <PageHero
        kicker="Condo Buyer's Guide"
        headline="Mission Valley Condos for Sale, San Diego"
        subheadline="Current condo inventory across Mission Valley, plus the HOA, parking, financing, and building-age questions to ask before you offer. For the full neighborhood picture, see the Mission Valley guide."
        primaryCta={{ label: "Search Mission Valley Condos", href: "#search" }}
        secondaryCta={{ label: "Mission Valley Neighborhood Guide", href: "/neighborhoods/mission-valley" }}
        heroImage="/images/neighborhoods/mission-valley-hero.jpg"
        heroImageAlt="Mission Valley freeway corridor and hills, San Diego"
      />

      <Section kicker="What This Page Covers">
        <p className="max-w-2xl text-espresso/90">
          This page is focused on Mission Valley condo inventory and condo-specific buying
          considerations. For a broader look at the neighborhood, commute, and lifestyle, see the{" "}
          <Link href="/neighborhoods/mission-valley" className="text-cabernet hover:underline">
            Mission Valley neighborhood guide
          </Link>
          .
        </p>
      </Section>

      <CommunityListings
        id="search"
        title="Current Mission Valley Condo Listings"
        description="A sample of current Mission Valley condos for sale."
        slug="mission-valley"
        listings={listings}
        count={liveCount}
        viewAllUrl={browseUrl ?? undefined}
        variant="sand"
      />

      <Section kicker="Using Live Inventory">
        <h2 className="heading-section text-cabernet">How to Use This Live Inventory</h2>
        <p className="mt-4 max-w-2xl text-espresso/90">
          As of September 2026, the listings above are a live sample of Mission Valley condo
          inventory. Counts, photos, and status change as homes go pending or new units list. Use
          this page to compare buildings and East versus West location, then confirm HOA documents,
          parking, and financing on a specific unit before you offer. This sample is not a complete
          market census and does not include pricing statistics.
        </p>
        <h3 className="heading-card mt-8 text-cabernet">Condo Versus Townhome Considerations</h3>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Many Mission Valley complexes mix condos and townhomes. Condos typically share more
          building systems and a denser HOA structure. Townhomes may include a private entrance or
          limited outdoor space, but they still require the same reserve, parking, and financing due
          diligence. Confirm the legal property type on the listing and in the HOA documents, not
          just the marketing label.
        </p>
      </Section>

      <Section kicker="Mission Valley Condo Overview">
        <h2 className="heading-section text-cabernet">Mission Valley Condo Overview</h2>
        <p className="mt-4 max-w-2xl text-espresso/90">
          Condos make up the bulk of Mission Valley&apos;s for-sale inventory, spanning older mid-rise
          buildings from the 1980s through recent new-construction mid-rises, along the San Diego River
          corridor. Freeway access (I-8, I-805, I-15) and trolley stops throughout the valley make it a
          common landing spot for buyers commuting to job centers outside the immediate area, at the
          tradeoff of a more car-dependent, less walkable layout than downtown or coastal districts.
        </p>
        <h3 className="heading-card mt-8 text-cabernet">Mission Valley East vs. Mission Valley West</h3>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Mission Valley West sits closer to Fashion Valley, Hazard Center, and the western trolley
          stations. Mission Valley East (toward Camino del Rio) includes Civita, Rancho Mission Villas,
          and the corridor closer to SDSU and I-15. Ask your agent which side better fits your commute
          and lifestyle before narrowing a condo search, the two sides have different building ages and
          HOA structures.
        </p>
      </Section>

      <Section variant="sand" kicker="Named Communities">
        <h2 className="heading-section text-cabernet">Mission Valley Condo Communities to Know</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          These are named condo and townhome communities buyers frequently ask about in Mission Valley.
          Confirm current HOA, pricing, and availability directly, this list is a starting point for
          your search, not a substitute for live listing data.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {namedCondoCommunities.map((item) => (
            <div key={item.name} className="rounded-xl border border-surface-muted bg-white p-6 shadow-sm">
              <p className="font-semibold text-espresso">{item.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-espresso/80">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Buyer Due Diligence">
        <h2 className="heading-section text-cabernet">Condo Due-Diligence Considerations</h2>
        <ul className="mt-6 max-w-2xl space-y-4">
          {dueDiligenceItems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-espresso/90">
              <span className="mt-1 text-cabernet" aria-hidden="true">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
        <CalloutBlock type="tip" className="mt-10 max-w-2xl">
          Ask your lender early whether a specific building is FHA- or VA-approved, non-approved
          buildings can rule out certain loan types before you fall in love with a unit.
        </CalloutBlock>
      </Section>

      <Section variant="pearl">
        <IdxSearchModule
          title="Search San Diego Condos"
          description="Browse current condo listings across Mission Valley and other San Diego condo districts."
          communitySlug="mission-valley"
          defaultArea="Mission Valley"
        />
      </Section>

      <Section>
        <FaqSection faqs={condoFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "Mission Valley Neighborhood Guide", description: "Housing, lifestyle, and commute for the full neighborhood.", href: "/neighborhoods/mission-valley" },
          { title: "San Diego Condos for Sale", description: "Compare condo districts across San Diego.", href: "/san-diego-condos-for-sale" },
          { title: "San Diego Neighborhoods", description: "Compare all San Diego neighborhoods from the homepage.", href: "/" },
        ]}
      />

      <CTABanner
        headline="Ready to Compare Mission Valley Condo Buildings?"
        description="Book a free strategy call to narrow down buildings, HOA fit, and financing options."
        ctaLabel="Book a Condo Strategy Call"
      />
    </>
  );
}
