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
    "An interactive map of San Diego neighborhoods and communities. Explore coastal, central, and inland areas, filter by lifestyle, then open a buyer's guide for any zone.",
  path: "/san-diego-neighborhood-map",
  keywords: getKeywordsForPage("/san-diego-neighborhood-map"),
});

const featuredGuideLinks = [
  { name: "La Jolla", slug: "la-jolla", note: "Coastal village anchor for the north-county side of the map." },
  { name: "Mission Valley", slug: "mission-valley", note: "Central freeway hub linking coastal and inland zones." },
  { name: "Hillcrest", slug: "hillcrest", note: "Walkable urban village bordering Balboa Park." },
  { name: "Pacific Beach", slug: "pacific-beach", note: "Boardwalk beach town between La Jolla and Mission Bay." },
  { name: "Point Loma", slug: "point-loma", note: "Peninsula separating San Diego Bay from the open ocean." },
  { name: "University City", slug: "university-city", note: "UTC shopping and biotech corridor east of La Jolla." },
];

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

      <Section kicker="How the Map Reads">
        <h2 className="heading-section text-cabernet">How San Diego&apos;s Regions Relate Geographically</h2>
        <div className="mt-4 max-w-2xl space-y-4 text-espresso/90">
          <p>
            San Diego&apos;s neighborhoods generally fall into three geographic bands. The{" "}
            <strong>coastal band</strong> (La Jolla, Pacific Beach, Ocean Beach, Point Loma, Del Mar)
            runs along the Pacific from north to south. The <strong>central band</strong> (Hillcrest,
            North Park, Mission Valley, Bay Park, University City) sits inland of the coast, connected
            by I-5, I-805, SR-163, and the trolley Green and Orange Lines. The <strong>inland band</strong>{" "}
            (Clairemont, Carmel Valley, Sorrento Valley) fills in the mesas and valleys east of the
            central corridor, with I-15 and I-805 providing the main freeway spine.
          </p>
          <p>
            Mission Valley sits roughly at the geographic center of the map, where I-8 crosses I-805 and
            I-15, which is a large part of why it functions as a commute hub between the coastal and
            inland bands. Hillcrest and North Park sit just south of Mission Valley along SR-163, closer
            to Balboa Park and downtown. Use the map below to see how a specific community sits relative
            to these bands before you compare commute and lifestyle trade-offs.
          </p>
        </div>
      </Section>

      <Section variant="sand" kicker="Explore">
        <NeighborhoodsExplorer communities={communities} />
      </Section>

      <Section kicker="Start With a Guide">
        <h2 className="heading-section text-cabernet">Jump Into a Neighborhood Guide</h2>
        <p className="mt-3 max-w-2xl text-espresso/90">
          The map above is built for exploration, every zone links to a full buyer&apos;s guide with
          housing, lifestyle, and commute detail. These are the guides buyers start with most often:
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuideLinks.map((item) => (
            <Link
              key={item.slug}
              href={`/neighborhoods/${item.slug}`}
              className="group flex flex-col rounded-xl border border-surface-muted border-t-2 border-t-transparent bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-t-cabernet hover:shadow-lg"
            >
              <h3 className="heading-card text-cabernet">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/80">{item.note}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-cabernet">
                View guide &rarr;
              </span>
            </Link>
          ))}
        </div>
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
