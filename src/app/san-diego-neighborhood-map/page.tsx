import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { NeighborhoodsExplorer } from "@/components/community/NeighborhoodsExplorer";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { communities, getLaunchCommunities } from "@/data/communities";
import { marketingHeroes } from "@/data/page-images";
import { generatePageMetadata } from "@/lib/metadata";
import { getKeywordsForPage } from "@/data/keywords";
import { webPageSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "San Diego Neighborhood Map | Interactive Community Guide",
  description:
    "Explore an interactive map of San Diego neighborhoods. Filter by lifestyle, coastal to inland, then open a buyer's guide for any community.",
  path: "/san-diego-neighborhood-map",
  keywords: getKeywordsForPage("/san-diego-neighborhood-map"),
});

const launchCommunities = getLaunchCommunities();
const byLetter = launchCommunities
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .reduce<Record<string, typeof launchCommunities>>((acc, c) => {
    const letter = c.name[0]!.toUpperCase();
    acc[letter] = acc[letter] ? [...acc[letter], c] : [c];
    return acc;
  }, {});

export default function NeighborhoodMapPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "San Diego Neighborhood Map",
            "Interactive map and A-Z directory of San Diego neighborhoods.",
            "/san-diego-neighborhood-map",
          ),
          breadcrumbSchema([{ name: "Neighborhood Map", path: "/san-diego-neighborhood-map" }]),
          itemListSchema(
            launchCommunities.map((c) => ({ name: c.name, path: `/neighborhoods/${c.slug}` })),
          ),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Neighborhood Map" }]} />
      </div>

      <PageHero
        kicker="Interactive Map"
        headline="San Diego Neighborhood Map"
        subheadline="Hover or tap a zone to preview a community, filter by lifestyle, then open a full buyer's guide. Boundaries are marketing approximations, not legal or MLS-defined lines."
        primaryCta={{ label: "Compare All Neighborhoods", href: "/" }}
        secondaryCta={{ label: "Search Homes", href: "/search-homes" }}
        heroImage={marketingHeroes.neighborhoods.src}
        heroImageAlt={marketingHeroes.neighborhoods.alt}
      />

      <Section kicker="Explore">
        <NeighborhoodsExplorer communities={communities} />
      </Section>

      {/* Server-rendered A-Z fallback: the map above loads client-side (ssr:false),
          so this list keeps every neighborhood link crawlable without JavaScript. */}
      <Section variant="sand" kicker="Full Directory">
        <h2 className="heading-section text-cabernet">Every Neighborhood, A–Z</h2>
        <p className="mt-2 max-w-2xl text-espresso/90">
          Browse the same guides in a plain{" "}
          <Link href="/neighborhoods" className="text-cabernet hover:underline">
            neighborhood directory
          </Link>
          .
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(byLetter)
            .sort()
            .map((letter) => (
              <div key={letter}>
                <p className="kicker mb-2">{letter}</p>
                <ul className="space-y-2">
                  {byLetter[letter]!.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/neighborhoods/${c.slug}`} className="text-espresso hover:text-cabernet hover:underline">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </Section>

      <CTABanner
        headline="Not Sure Which Neighborhood Fits?"
        description="Book a free strategy call to compare areas based on your commute, budget, and lifestyle."
      />
    </>
  );
}
