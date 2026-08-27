import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
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
  title: "San Diego Condos for Sale | Downtown, La Jolla & Mission Valley",
  description:
    "A buyer's guide to San Diego condos, downtown high-rises, La Jolla Village units, and Mission Valley complexes, with HOA, parking, and building-age guidance.",
  path: "/san-diego-condos-for-sale",
  keywords: getKeywordsForPage("/san-diego-condos-for-sale"),
});

const condoFaqs = [
  {
    question: "What should I check before buying a condo in San Diego?",
    answer: "Review the HOA budget and reserve study, ask about any pending special assessments, confirm parking and storage assignments, and check whether the building is FHA/VA-approved if you need that financing.",
  },
  {
    question: "Are HOA dues high in San Diego condo buildings?",
    answer: "Dues vary widely by building age, amenities, and staffing. Full-service downtown high-rises with doormen and pools generally run higher than smaller, self-managed buildings in La Jolla or Mission Valley.",
  },
  {
    question: "Is Mission Valley a good area for condos?",
    answer: "Mission Valley offers some of the city's most affordable condo pricing, with easy freeway and trolley access, at the tradeoff of a less walkable, more car-dependent environment than downtown or La Jolla.",
  },
];

export default function SanDiegoCondosHubPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "San Diego Condos for Sale",
            "Buyer's guide to San Diego condo districts: downtown, La Jolla, and Mission Valley.",
            "/san-diego-condos-for-sale",
          ),
          breadcrumbSchema([{ name: "San Diego Condos for Sale", path: "/san-diego-condos-for-sale" }]),
          collectionPageSchema({
            title: "San Diego Condos for Sale",
            description: "Buyer's guide to San Diego condo districts.",
            path: "/san-diego-condos-for-sale",
          }),
          faqSchema(condoFaqs),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "San Diego Condos for Sale" }]} />
      </div>

      <PageHero
        kicker="Condo Buyer's Guide"
        headline="San Diego Condos for Sale, by District"
        subheadline="Downtown high-rises, La Jolla Village units, and Mission Valley complexes each have very different HOA structures, parking rules, and building ages. Start with your district."
        primaryCta={{ label: "Book a Condo Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Downtown Condo Guide", href: "/downtown-san-diego-condos-for-sale" }}
        heroImage={marketingHeroes.firstTimeBuyer.src}
        heroImageAlt={marketingHeroes.firstTimeBuyer.alt}
      />

      <Section kicker="Condo Districts">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card accent="cabernet">
            <h2 className="heading-card text-cabernet">Downtown San Diego</h2>
            <p className="mt-2 text-sm leading-relaxed text-espresso/90">
              High-rise towers across the Marina District, East Village, Cortez Hill, and Core/Columbia,
              full-service buildings with amenities, walkable to the Gaslamp and the bay.
            </p>
            <Link href="/downtown-san-diego-condos-for-sale" className="mt-3 inline-block text-sm font-semibold text-cabernet hover:underline">
              See Downtown Condo Buildings →
            </Link>
          </Card>
          <Card accent="cabernet">
            <h2 className="heading-card text-cabernet">La Jolla</h2>
            <p className="mt-2 text-sm leading-relaxed text-espresso/90">
              Smaller-scale buildings in La Jolla Village, La Jolla Shores, and Bird Rock, lower unit
              counts, longer hold times, and premium coastal pricing.
            </p>
            <Link href="/la-jolla-condos-for-sale" className="mt-3 inline-block text-sm font-semibold text-cabernet hover:underline">
              See La Jolla Condo Buildings →
            </Link>
          </Card>
          <Card accent="cabernet">
            <h2 className="heading-card text-cabernet">Mission Valley</h2>
            <p className="mt-2 text-sm leading-relaxed text-espresso/90">
              The most freeway- and trolley-connected condo district, mid-rise buildings along the San
              Diego River corridor from the 1980s through recent construction.
            </p>
            <Link href="/mission-valley-condos-for-sale" className="mt-3 inline-block text-sm font-semibold text-cabernet hover:underline">
              See Mission Valley Condos →
            </Link>
          </Card>
        </div>
      </Section>

      <Section variant="sand" kicker="Compare Districts">
        <h2 className="heading-section text-cabernet">Comparing San Diego Condo Districts</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Every district has different building types, walkability, and HOA complexity. This is a
          general comparison to help you pick a starting district, always confirm specifics
          building-by-building.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-surface-muted text-espresso/70">
                <th className="py-3 pr-4 font-semibold">District</th>
                <th className="py-3 pr-4 font-semibold">Typical Building Type</th>
                <th className="py-3 pr-4 font-semibold">Walkability Context</th>
                <th className="py-3 pr-4 font-semibold">Commute Character</th>
                <th className="py-3 font-semibold">General HOA Complexity</th>
              </tr>
            </thead>
            <tbody className="text-espresso/90">
              <tr className="border-b border-surface-muted">
                <td className="py-3 pr-4 font-semibold">Downtown</td>
                <td className="py-3 pr-4">High-rise towers, full-service</td>
                <td className="py-3 pr-4">Walkable to Gaslamp, Petco Park, bay</td>
                <td className="py-3 pr-4">Trolley-connected; less freeway-dependent</td>
                <td className="py-3">Higher, staffed amenity buildings</td>
              </tr>
              <tr className="border-b border-surface-muted">
                <td className="py-3 pr-4 font-semibold">La Jolla</td>
                <td className="py-3 pr-4">Small-scale, low-rise buildings</td>
                <td className="py-3 pr-4">Walkable within the Village; car-dependent elsewhere</td>
                <td className="py-3 pr-4">Freeway-dependent (I-5)</td>
                <td className="py-3">Varies; smaller HOAs, fewer units</td>
              </tr>
              <tr className="border-b border-surface-muted">
                <td className="py-3 pr-4 font-semibold">Mission Valley</td>
                <td className="py-3 pr-4">Mid-rise, mixed building ages</td>
                <td className="py-3 pr-4">Car-dependent; some trolley-adjacent pockets</td>
                <td className="py-3 pr-4">Freeway hub (I-8, I-805, I-15) plus trolley</td>
                <td className="py-3">Varies widely by building age</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">University City / UTC</td>
                <td className="py-3 pr-4">Mid-rise and garden-style</td>
                <td className="py-3 pr-4">Walkable near Westfield UTC; car-dependent elsewhere</td>
                <td className="py-3 pr-4">Central freeway access (I-5, I-805), near UCSD/biotech</td>
                <td className="py-3">Varies; newer buildings often carry higher dues</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-espresso/60">
          General characteristics only, not a substitute for building-specific HOA and financial
          documents. Confirm current dues, reserves, and parking for any specific unit before offering.
        </p>
      </Section>

      <Section kicker="University City / UTC">
        <h2 className="heading-section text-cabernet">University City / UTC Condos</h2>
        <p className="mt-4 max-w-2xl text-espresso/90">
          University City and UTC combine newer mid-rise and garden-style condo product with proximity
          to Westfield UTC, UC San Diego, and the Sorrento Valley biotech corridor. It&apos;s a common
          alternative for buyers who want central freeway access without Mission Valley&apos;s
          river-corridor building age range.
        </p>
        <Link href="/neighborhoods/university-city" className="mt-3 inline-block text-sm font-semibold text-cabernet hover:underline">
          More on University City as a neighborhood →
        </Link>
      </Section>

      <Section variant="sand" id="mission-valley" className="scroll-mt-24">
        <h2 className="heading-section text-cabernet">Mission Valley Condos</h2>
        <p className="mt-4 max-w-2xl text-espresso/90">
          Mission Valley is one of the more affordable condo markets within San Diego city limits, with
          complexes built along the San Diego River corridor from the 1980s through recent
          new-construction mid-rises. Freeway access (I-8, I-15) and trolley stops throughout the valley
          make it a common landing spot for buyers commuting to job centers outside the immediate area,
          at the tradeoff of a more car-dependent, less walkable layout than downtown or coastal
          districts.
        </p>
        <p className="mt-4 max-w-2xl text-espresso/90">
          Named communities buyers frequently ask about include Civita, Escala, Mission Gate, The
          Lido, and RiverScene, each with its own HOA structure, building age, and site plan worth
          comparing individually.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/mission-valley-condos-for-sale" className="text-sm font-semibold text-cabernet hover:underline">
            See Mission Valley Condos for Sale →
          </Link>
          <Link href="/neighborhoods/mission-valley" className="text-sm font-semibold text-cabernet hover:underline">
            More on Mission Valley as a neighborhood →
          </Link>
        </div>
      </Section>

      <Section variant="pearl">
        <CalloutBlock type="tip">
          Ask your lender early whether a specific building is FHA- or VA-approved, non-approved
          buildings can rule out certain loan types before you fall in love with a unit.
        </CalloutBlock>
        <div className="mt-12">
          <IdxSearchModule
            title="Search San Diego Condos"
            description="Browse current condo listings across downtown, La Jolla, and Mission Valley."
          />
        </div>
      </Section>

      <Section>
        <FaqSection faqs={condoFaqs} />
      </Section>

      <RelatedPages
        items={[
          { title: "Mission Valley Condos for Sale", description: "Current Mission Valley condo inventory and buying considerations.", href: "/mission-valley-condos-for-sale" },
          { title: "Downtown Condos for Sale", description: "Building-by-building downtown high-rise guide.", href: "/downtown-san-diego-condos-for-sale" },
          { title: "La Jolla Condos for Sale", description: "Building-by-building La Jolla condo guide.", href: "/la-jolla-condos-for-sale" },
        ]}
      />

      <CTABanner
        headline="Ready to Compare Condo Buildings?"
        description="Book a free strategy call to narrow down districts, buildings, and HOA fit."
        ctaLabel="Book a Condo Strategy Call"
      />
    </>
  );
}
