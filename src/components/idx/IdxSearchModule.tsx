import Script from "next/script";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CustomSearchForm } from "@/components/forms/CustomSearchForm";
import { CommunityIdxSearch } from "@/components/idx/CommunityIdxSearch";
import { ListingCard } from "@/components/idx/ListingCard";
import { getIdxLink, IDX_BASE_URL } from "@/data/idx-links";
import { getIdxSearchConfig } from "@/data/idx-search-config";
import type { IdxListing } from "@/lib/idx-api";

type IdxVariant = "link" | "widget" | "api-preview";

type IdxSearchModuleProps = {
  title?: string;
  description?: string;
  /** Display name passed through to the CustomSearchForm fallback. */
  defaultArea?: string;
  /** Community slug used to resolve a pre-filtered IDX saved search (link variant). */
  communitySlug?: string;
  /**
   * "link" (default): branded CTA to a saved search on the IDX subdomain.
   * "widget": embed the IDX omnibar inline (used on /search-homes).
   * "api-preview": render a mini grid of API listings + "View all" CTA to the subdomain.
   *   Listings are fetched by the parent Server Component and passed via `listings`.
   */
  variant?: IdxVariant;
  /** API listings for the "api-preview" variant (parent fetches; this stays non-async). */
  listings?: IdxListing[];
  /** Live listing count for the "View all" CTA label. */
  count?: number | null;
};

function Heading({ title, description }: { title: string; description: string }) {
  return (
    <>
      <h2 className="heading-section text-cabernet">{title}</h2>
      <p className="mt-2 text-espresso/90">{description}</p>
    </>
  );
}

export function IdxSearchModule({
  title = "Search Homes",
  description = "Browse available homes in the La Jolla area and surrounding San Diego neighborhoods.",
  defaultArea,
  communitySlug,
  variant = "link",
  listings,
  count,
}: IdxSearchModuleProps) {
  const idxEnabled = process.env.NEXT_PUBLIC_IDX_ENABLED === "true";
  const widgetUrl = process.env.NEXT_PUBLIC_IDX_WIDGET_URL;
  const idxLink = idxEnabled ? getIdxLink(communitySlug) : null;

  // Widget variant: embed the IDX omnibar inline, with the form as a secondary path.
  if (idxEnabled && variant === "widget" && widgetUrl) {
    return (
      <div>
        <Heading title={title} description={description} />
        <Card className="mt-6">
          {/* IDX omnibar injects its search UI into this container. The embed script
              comes from IDX Control Panel -> Widgets -> Omnibar. */}
          <div id="idxStartFrame" className="min-h-[64px]" />
          <Script src={widgetUrl} strategy="afterInteractive" />
        </Card>
        <div className="mt-10">
          <p className="text-sm font-medium text-espresso">
            Prefer a curated list instead of searching yourself?
          </p>
          <div className="mt-4">
            <CustomSearchForm defaultArea={defaultArea} />
          </div>
        </div>
      </div>
    );
  }

  // API-preview variant: inline grid of live featured listings + "View all" CTA. Falls back
  // to the link variant below when no listings were returned.
  if (idxEnabled && idxLink && variant === "api-preview" && listings && listings.length > 0) {
    const viewAllLabel =
      typeof count === "number" && count > 0
        ? `View all ${count.toLocaleString()} homes`
        : idxLink.label
          ? `Browse ${idxLink.label}`
          : "Browse all listings";
    const searchConfig = communitySlug ? getIdxSearchConfig(communitySlug) : null;
    const showCommunitySearch =
      communitySlug && searchConfig && searchConfig.zipCodes.length > 0 && IDX_BASE_URL;

    return (
      <div>
        <Heading title={title} description={description} />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} size="compact" />
          ))}
        </div>
        <Button href={idxLink.href} className="mt-8">
          {viewAllLabel}
        </Button>
        {showCommunitySearch && (
          <CommunityIdxSearch
            communityName={defaultArea ?? searchConfig.label.replace(/ homes$/, "")}
            config={searchConfig}
            idxBaseUrl={IDX_BASE_URL}
          />
        )}
        <div className="mt-10">
          <p className="text-sm font-medium text-espresso">
            Want us to do the searching for you?
          </p>
          <div className="mt-4">
            <CustomSearchForm defaultArea={defaultArea} />
          </div>
        </div>
      </div>
    );
  }

  // Link variant: community-filtered search form + CTA to the IDX subdomain.
  if (idxEnabled && idxLink) {
    const browseLabel = idxLink.label ? `Browse ${idxLink.label}` : "Browse listings";
    const searchConfig = communitySlug ? getIdxSearchConfig(communitySlug) : null;
    const showCommunitySearch =
      communitySlug && searchConfig && searchConfig.zipCodes.length > 0 && IDX_BASE_URL;

    return (
      <div>
        <Heading title={title} description={description} />
        {showCommunitySearch ? (
          <CommunityIdxSearch
            communityName={defaultArea ?? searchConfig.label.replace(/ homes$/, "")}
            config={searchConfig}
            idxBaseUrl={IDX_BASE_URL}
          />
        ) : (
          <Card className="mt-6 border-t-2 border-t-cabernet bg-rose/30">
            <h3 className="heading-card text-cabernet">Search live MLS listings</h3>
            <p className="mt-2 text-sm text-espresso/90">
              View current homes for sale with maps, photos, and the option to save searches
              and get new-listing alerts.
            </p>
            <Button href={idxLink.href} className="mt-4">
              {browseLabel}
            </Button>
          </Card>
        )}
        {showCommunitySearch && (
          <Button href={idxLink.href} variant="outline" className="mt-4">
            {browseLabel}
          </Button>
        )}
        <div className="mt-10">
          <p className="text-sm font-medium text-espresso">
            Want us to do the searching for you?
          </p>
          <div className="mt-4">
            <CustomSearchForm defaultArea={defaultArea} />
          </div>
        </div>
      </div>
    );
  }

  // Fallback: IDX disabled or not configured.
  return (
    <div>
      <Heading title={title} description={description} />
      <div className="mt-6">
        <Card className="border-dashed border-cabernet/30 bg-rose/30">
          <p className="text-sm text-espresso/80">
            Live home search will be available here once IDX is connected. In the meantime, request a custom search and we&apos;ll send matching listings.
          </p>
        </Card>
        <div className="mt-6">
          <CustomSearchForm defaultArea={defaultArea} />
        </div>
      </div>
    </div>
  );
}
