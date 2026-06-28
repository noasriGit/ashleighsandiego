import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ListingCard } from "@/components/idx/ListingCard";
import { getCommunityListings, type IdxListing } from "@/lib/idx-api";

type SectionVariant = "default" | "sand" | "pearl";

type CommunityListingsProps = {
  /** Optional anchor id for in-page navigation (e.g. hero "Search Homes" CTA). */
  id?: string;
  /**
   * Community slug for idx-search-config lookup. Omit for the general featured set.
   * Used to fetch listings when `listings` is not pre-fetched.
   */
  slug?: string;
  /**
   * Human-readable community name (e.g. "La Jolla") used to build dynamic title copy
   * when `title` is omitted. Ignored when `title` is provided explicitly.
   */
  communityName?: string;
  /** Override the auto-generated section title. */
  title?: string;
  description?: string;
  limit?: number;
  /** Pre-fetched listings (avoids a duplicate API call when the parent already fetched). */
  listings?: IdxListing[];
  /** Background variant of the wrapping section. */
  variant?: SectionVariant;
  /** Subdomain saved-search URL for the "View all" browse CTA. */
  viewAllUrl?: string;
  /** Live listing count (from getSavedLinkCount) shown in the CTA label. */
  count?: number | null;
};

/**
 * Determine whether all listings in the set came from /clients/savedlinks/{id}/results.
 * When true, copy reads "Homes in {community}" (real MLS data up to 250 listings).
 * When false, copy reads "Featured listings" (agent's own featured set).
 */
function isFromSavedLinks(listings: IdxListing[]): boolean {
  return listings.length > 0 && listings.every((l) => !l.isOnSite);
}

// Server Component. Renders nothing (no section at all) when the API returns no listings
// or is not configured, so consuming pages degrade gracefully.
export async function CommunityListings({
  id,
  title,
  description,
  slug,
  communityName,
  limit = 6,
  listings: prefetchedListings,
  variant = "sand",
  viewAllUrl,
  count,
}: CommunityListingsProps) {
  const listings =
    prefetchedListings ?? (await getCommunityListings(slug, limit));

  if (listings.length === 0) return null;

  // Auto-title: use savedlinks-aware copy when no explicit title is given.
  const fromSavedLinks = isFromSavedLinks(listings);
  const resolvedTitle =
    title ??
    (fromSavedLinks
      ? communityName
        ? `Homes in ${communityName}`
        : "Active Listings"
      : communityName
        ? `Featured Listings in ${communityName}`
        : "Featured Listings");

  // Auto-description for savedlinks results (real MLS data, not just featured).
  const resolvedDescription =
    description ??
    (fromSavedLinks && communityName
      ? `Current homes for sale in ${communityName} from the MLS.`
      : undefined);

  const viewAllLabel =
    typeof count === "number" && count > 0
      ? `View all ${count.toLocaleString()} homes`
      : "View all homes";

  return (
    <Section id={id} variant={variant}>
      <h2 className="heading-section text-cabernet">{resolvedTitle}</h2>
      {resolvedDescription && (
        <p className="mt-2 text-espresso/90">{resolvedDescription}</p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {viewAllUrl && (
        <Button href={viewAllUrl} variant="outline" className="mt-8">
          {viewAllLabel}
        </Button>
      )}
    </Section>
  );
}
