import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { IdxSearchModule } from "@/components/idx/IdxSearchModule";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLaunchCommunities } from "@/data/communities";
import { marketingHeroes } from "@/data/page-images";
import { getIdxBrowseUrl, getIdxSearchConfig } from "@/data/idx-search-config";
import { getAllSavedSearchCounts } from "@/lib/idx-api";
import { generatePageMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Search Homes Near La Jolla | San Diego Home Search",
  description:
    "Search homes for sale near La Jolla and surrounding San Diego neighborhoods. Condos, townhomes, and single-family homes within the La Jolla area radius.",
  path: "/search-homes",
  keywords: ["La Jolla homes for sale", "San Diego relocation homes", "homes near La Jolla"],
});

const quickLinks = [
  { label: "Search by Community", href: "/neighborhoods" },
  { label: "Condos & Townhomes", href: "/search-homes" },
  { label: "New Listings", href: "/search-homes" },
  { label: "Request Custom Search", href: "/contact" },
];

export default async function SearchHomesPage() {
  const communities = getLaunchCommunities();
  const counts = await getAllSavedSearchCounts();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Search Homes Near La Jolla",
            "Home search hub for La Jolla area properties.",
            "/search-homes",
          ),
          breadcrumbSchema([{ name: "Search Homes", path: "/search-homes" }]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Search Homes" }]} />
      </div>

      <Hero
        kicker="Home Search"
        headline="Search Homes Near La Jolla"
        subheadline="Browse available homes in La Jolla and surrounding San Diego neighborhoods — or request a custom search tailored to your criteria."
        primaryCta={{ label: "Request a Custom Home Search", href: "/contact" }}
        secondaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        backgroundImage={marketingHeroes.searchHomes.src}
        backgroundImageAlt={marketingHeroes.searchHomes.alt}
      />

      <Section>
        <IdxSearchModule
          variant="widget"
          title="La Jolla Area Home Search"
          description="Search available listings in La Jolla, Pacific Beach, UTC, Del Mar, and nearby communities."
        />
      </Section>

      <Section variant="sand">
        <h2 className="heading-section text-cabernet">Quick Search Links</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-cabernet shadow-sm transition-shadow hover:shadow-md"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Section>

      <Section variant="pearl">
        <h2 className="heading-section text-cabernet">Search by Community</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => {
            const savedSearchId = getIdxSearchConfig(community.slug).savedSearchId;
            const count = savedSearchId ? counts[savedSearchId] : undefined;
            const browseUrl = getIdxBrowseUrl(community.slug);
            return (
              <Link
                key={community.slug}
                href={browseUrl ?? `/neighborhoods/${community.slug}#search`}
              >
                <Card hover accent="cabernet">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="heading-card text-cabernet">{community.name}</h3>
                    {typeof count === "number" && count > 0 && (
                      <span className="shrink-0 rounded-full bg-rose/60 px-2.5 py-1 text-xs font-semibold text-cabernet">
                        {count.toLocaleString()} homes
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-espresso/80">View guide &amp; search homes</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      <CTABanner
        headline="Need Help Narrowing Your Search?"
        description="Tell us your budget, timeline, and preferred areas — we'll send a custom list of matching homes."
        ctaLabel="Request a Custom Home Search"
      />
    </>
  );
}
