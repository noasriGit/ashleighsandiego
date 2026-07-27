import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { ContentSections } from "@/components/marketing/ContentSections";
import { Timeline } from "@/components/marketing/Timeline";
import { FaqSection } from "@/components/marketing/FaqSection";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import { CTABanner } from "@/components/marketing/CTABanner";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { CommunityListings } from "@/components/idx/CommunityListings";
import { getSavedSearchCount } from "@/lib/idx-api";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { CalloutBlock } from "@/components/ui/CalloutBlock";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { marketingHeroes } from "@/data/page-images";
import { relocationFaqs, buyerRoadmapSteps } from "@/data/faqs";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { faqSchema, webPageSchema, breadcrumbSchema, howToSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Moving to San Diego | Step-by-Step Relocation Guide",
  description:
    "Moving to San Diego? Get a clear process for choosing a neighborhood, budgeting, and buying a home, from your first search to closing day.",
  path: "/moving-to-san-diego",
  keywords: getKeywordsForPage("/moving-to-san-diego"),
});

const sections = [
  {
    id: "choose-area",
    kicker: "Step One",
    title: "How to Choose the Right Area",
    content:
      "Start with your non-negotiables: commute distance, budget, and lifestyle priorities. If you work in Sorrento Valley or UTC, University City and Carmel Valley are worth a look. If beach lifestyle is the priority, compare La Jolla, Pacific Beach, and Del Mar. If budget is the main constraint, Clairemont, Mission Valley, and the county suburbs offer more space per dollar.\n\nOur neighborhood comparison tools help you weigh these trade-offs before you invest time touring homes.",
  },
  {
    id: "budget-commute",
    kicker: "Money & Time",
    title: "Budget and Commute Considerations",
    content:
      "San Diego home prices vary significantly by neighborhood and by distance from the coast. Coastal areas command premiums; inland neighborhoods and county suburbs offer more space for the same budget. Factor in commute time to your employer, toll roads, and traffic patterns on I-5, I-805, and I-15.\n\nGetting pre-approved early helps you focus on realistic neighborhoods instead of falling in love with areas outside your budget.",
  },
  {
    id: "out-of-area",
    kicker: "Buying Remotely",
    title: "Process for Out-of-Area Buyers",
    content:
      "Buying from out of state adds complexity: virtual tours, timing your visit, and understanding local market norms. We help out-of-area buyers shortlist neighborhoods, plan an efficient tour trip, and navigate offers remotely when needed.\n\nA strategy call before your first visit helps you make the most of your time on the ground in San Diego.",
  },
];

const howToSteps = buyerRoadmapSteps.map((s) => ({ title: s.title, description: s.description }));

export default async function MovingToSanDiegoPage() {
  const browseUrl = getIdxBrowseUrl();
  const liveCount = await getSavedSearchCount(getIdxSearchConfig().savedSearchId);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Moving to San Diego",
            "Step-by-step relocation guide for buyers moving to San Diego.",
            "/moving-to-san-diego",
          ),
          breadcrumbSchema([{ name: "Moving to San Diego", path: "/moving-to-san-diego" }]),
          faqSchema(relocationFaqs),
          howToSchema({
            name: "How to Move to San Diego",
            description: "A six-step process for relocating and buying a home in San Diego.",
            steps: howToSteps,
          }),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Moving to San Diego" }]} />
      </div>

      <PageHero
        kicker="Relocation Guide"
        headline="Moving to San Diego? Here's the Step-by-Step Process."
        subheadline="Compare neighborhoods, understand budget and commute trade-offs, and build a buyer plan before you start touring homes."
        primaryCta={{ label: "Book a Relocation Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Compare Neighborhoods", href: "/" }}
        heroImage={marketingHeroes.relocating.src}
        heroImageAlt={marketingHeroes.relocating.alt}
      />

      <StatBand
        stats={[
          { value: "43+", label: "Neighborhood Guides" },
          { value: "6", label: "Buyer-Journey Steps" },
          { value: "Coastal", label: "to Inland Options" },
          { value: "County-Wide", label: "Suburb Coverage" },
        ]}
      />

      <Timeline
        kicker="Your Journey"
        title="From First Search to Move-In Day"
        intro="Relocating is smoother with a plan. Here's how buyers typically move from exploring neighborhoods to closing on the right home."
        steps={buyerRoadmapSteps}
      />

      <ContentSections sections={sections} />

      <Section variant="sand" kicker="Where People Land">
        <h2 className="heading-section text-cabernet">Popular Starting Points by Priority</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          Most relocating buyers start with one of these paths. See{" "}
          <Link href="/" className="text-cabernet hover:underline">San Diego Neighborhoods</Link> for
          the full comparison, or jump straight to a focused guide:
        </p>
        <ul className="mt-6 space-y-3 text-espresso/90">
          <li>
            Want the coast? Start with{" "}
            <Link href="/la-jolla-neighborhoods" className="text-cabernet hover:underline">La Jolla Neighborhoods</Link>{" "}
            or{" "}
            <Link href="/del-mar-new-luxury-homes" className="text-cabernet hover:underline">Del Mar</Link>.
          </li>
          <li>
            Watching your budget? See{" "}
            <Link href="/affordable-neighborhoods-san-diego" className="text-cabernet hover:underline">
              Affordable Neighborhoods
            </Link>.
          </li>
          <li>
            Want more space or a quieter pace? Compare{" "}
            <Link href="/san-diego-suburbs" className="text-cabernet hover:underline">San Diego Suburbs</Link>.
          </li>
          <li>
            PCS orders in hand? Go straight to{" "}
            <Link href="/military-realtor-san-diego" className="text-cabernet hover:underline">
              Military &amp; VA Relocation
            </Link>.
          </li>
        </ul>
      </Section>

      <CommunityListings
        title="Featured San Diego Relocation Homes"
        description="A sample of current homes for sale across neighborhoods popular with relocating buyers."
        limit={6}
        variant="pearl"
        viewAllUrl={browseUrl ?? undefined}
        count={liveCount}
      />

      <Section variant="sand">
        <CalloutBlock type="tip">
          Rent first or buy right away? Both work. If your timeline is tight or you already know the
          area, buying with a clear plan saves money. If you&apos;re unsure, a short rental lets you
          test commutes and neighborhoods before committing.
        </CalloutBlock>
        <div className="mt-12">
          <IdxSearchModule
            title="Search San Diego Relocation Homes"
            description="Browse available homes in neighborhoods popular with relocating buyers."
          />
        </div>
      </Section>

      <Section variant="pearl">
        <div className="grid gap-10 lg:grid-cols-2">
          <LeadMagnet
            title="San Diego Relocation Buyer Checklist"
            description="Free checklist for relocating buyers: neighborhood research, budget planning, and pre-tour prep."
            leadType="relocation-checklist"
            checklistItems={[
              "Define commute and lifestyle priorities",
              "Research neighborhoods within your budget",
              "Get pre-approved before touring",
              "Plan your out-of-area visit strategy",
            ]}
          />
          <FaqSection faqs={relocationFaqs} />
        </div>
      </Section>

      <RelatedPages
        items={[
          { title: "Living in San Diego", description: "What day-to-day life is actually like, beyond the buyer process.", href: "/living-in-san-diego" },
          { title: "Military & VA Relocation", description: "PCS-specific guidance for buyers moving on orders.", href: "/military-realtor-san-diego" },
          { title: "Affordable Neighborhoods", description: "Where budget-focused buyers are finding value right now.", href: "/affordable-neighborhoods-san-diego" },
        ]}
      />

      <CTABanner
        headline="Book a Free Relocation Strategy Call"
        description="Discuss your move timeline, budget, and neighborhood options with a local buyer's agent."
        ctaLabel="Book a Relocation Strategy Call"
      />
    </>
  );
}
