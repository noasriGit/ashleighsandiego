import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ListingCard } from "@/components/idx/ListingCard";
import { getFeaturedListingsPage } from "@/lib/idx-api";
import { communities } from "@/data/communities";
import { getIdxSearchConfig } from "@/data/idx-search-config";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

type PageProps = {
  searchParams: Promise<{ community?: string; page?: string }>;
};

const PAGE_SIZE = 50;

function resolveFilters(communitySlug?: string) {
  if (!communitySlug) return undefined;
  const config = getIdxSearchConfig(communitySlug);
  const hasFilters = config.zipCodes.length > 0 || config.cityIds.length > 0;
  if (!hasFilters) return undefined;
  return { zipCodes: config.zipCodes, cityIds: config.cityIds };
}

function communityLabel(slug?: string): string {
  if (!slug) return "San Diego";
  const community = communities.find((c) => c.slug === slug);
  return community?.name ?? "San Diego";
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { community, page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const label = communityLabel(community);
  const title =
    pageNum > 1
      ? `${label} Homes for Sale — Page ${pageNum}`
      : `${label} Homes for Sale`;
  const description = `Browse featured homes for sale in ${label}, San Diego.${pageNum > 1 ? ` Page ${pageNum}.` : ""} Listing data provided via IDX.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/listings${community ? `?community=${community}` : ""}${pageNum > 1 ? `${community ? "&" : "?"}page=${pageNum}` : ""}`,
    },
    // Paginated interior pages shouldn't be indexed independently.
    ...(pageNum > 1 && { robots: { index: false } }),
  };
}

export default async function ListingsBrowsePage({ searchParams }: PageProps) {
  const { community, page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const offset = (pageNum - 1) * PAGE_SIZE;

  const filters = resolveFilters(community);
  const { listings, total, hasMore } = await getFeaturedListingsPage(
    offset,
    PAGE_SIZE,
    filters,
  );

  const label = communityLabel(community);
  const pageTitle = community ? `${label} Homes for Sale` : "Featured Homes for Sale";

  const communityOptions = communities.filter((c) => c.hasGuide);

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (community) params.set("community", community);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/listings${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            pageTitle,
            `Browse featured listings in ${label}, San Diego.`,
            "/listings",
          ),
          breadcrumbSchema([{ name: "Listings", path: "/listings" }]),
        ]}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-cabernet">Home</Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <span className="text-espresso">Listings</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero band */}
      <Section variant="cabernet" spacing="tight">
        <p className="hero-enter-up hero-enter-up--1 kicker text-white/70">
          Browse homes
        </p>
        <h1 className="hero-enter-up hero-enter-up--2 heading-section">
          {pageTitle}
        </h1>
        {total !== undefined && (
          <p className="hero-enter-up hero-enter-up--3 mt-2 text-white/80">
            {total.toLocaleString()} featured {total === 1 ? "listing" : "listings"}
          </p>
        )}
      </Section>

      <Section spacing="tight">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-espresso">Filter by community:</p>
          <Link
            href="/listings"
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              !community
                ? "bg-cabernet text-white"
                : "bg-rose/50 text-espresso hover:bg-rose"
            }`}
          >
            All areas
          </Link>
          {communityOptions.map((c) => (
            <Link
              key={c.slug}
              href={`/listings?community=${c.slug}`}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                community === c.slug
                  ? "bg-cabernet text-white"
                  : "bg-rose/50 text-espresso hover:bg-rose"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </Section>

      {listings.length === 0 ? (
        <Section>
          <div className="rounded-xl border border-dashed border-dove/50 bg-pearl p-12 text-center">
            <p className="text-espresso/70">
              {community
                ? `No featured listings found in ${label} right now.`
                : "No featured listings available right now."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {community && (
                <Button href="/listings" variant="outline">
                  View all areas
                </Button>
              )}
              <Button href="/search-homes">Search all MLS listings</Button>
            </div>
          </div>
        </Section>
      ) : (
        <>
          <Section>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-between">
              <div>
                {pageNum > 1 && (
                  <Button href={buildPageUrl(pageNum - 1)} variant="outline" size="sm">
                    ← Previous
                  </Button>
                )}
              </div>
              <p className="text-sm text-espresso/60">
                Page {pageNum}
                {total !== undefined &&
                  ` of ${Math.ceil(total / PAGE_SIZE)}`}
              </p>
              <div>
                {hasMore && (
                  <Button href={buildPageUrl(pageNum + 1)} variant="outline" size="sm">
                    Next →
                  </Button>
                )}
              </div>
            </div>
          </Section>

          {/* Full MLS upsell */}
          <Section variant="sand" spacing="tight">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-espresso">
                  These are featured listings only — the full MLS has many more.
                </p>
                <p className="mt-1 text-sm text-espresso/70">
                  Search the complete active inventory with maps, filters, and saved-search
                  alerts on our search portal.
                </p>
              </div>
              <Button href="/search-homes" className="shrink-0">
                Search all MLS listings
              </Button>
            </div>
          </Section>
        </>
      )}
    </>
  );
}
