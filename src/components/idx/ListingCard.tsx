import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { IdxListing } from "@/lib/idx-api";

type ListingCardSize = "default" | "compact";

type ListingCardProps = {
  listing: IdxListing;
  /** "default" for full-width grids; "compact" for the search-module preview grid. */
  size?: ListingCardSize;
};

// Shared listing card used by CommunityListings and the IdxSearchModule preview grid, so
// the card design stays identical across every IDX surface.
//
// Link routing:
//   listing.isOnSite === true  → Next.js <Link> to /listings/[idxId]/[listingId]
//                                 (featured listing with full on-site detail page)
//   listing.isOnSite === false → <a href={detailUrl}> to the branded subdomain
//                                 (savedlinks result or supplemental listing)
export function ListingCard({ listing, size = "default" }: ListingCardProps) {
  const specs = [
    listing.beds && `${listing.beds} bd`,
    listing.baths && `${listing.baths} ba`,
    listing.sqft && `${listing.sqft} sqft`,
  ].filter(Boolean);

  const compact = size === "compact";
  const imageHeight = compact ? "h-40" : "h-48";
  const bodyPadding = compact ? "p-4" : "p-5";
  const priceSize = compact ? "text-base" : "text-lg";

  const displayAddr =
    listing.displayAddress !== false ? listing.address : "Address withheld";

  const inner = (
    <Card hover className="overflow-hidden p-0">
      {listing.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- external MLS image host, varies per listing
        <img
          src={listing.imageUrl}
          alt={displayAddr}
          className={`${imageHeight} w-full object-cover`}
          loading="lazy"
        />
      ) : (
        <div
          className={`flex ${imageHeight} w-full items-center justify-center bg-rose/40 text-sm text-espresso/50`}
        >
          No photo available
        </div>
      )}
      <div className={bodyPadding}>
        {listing.price && (
          <p className={`${priceSize} font-semibold text-cabernet`}>{listing.price}</p>
        )}
        <p className="mt-1 text-sm text-espresso">{displayAddr}</p>
        {listing.city && <p className="text-sm text-espresso/70">{listing.city}</p>}
        {specs.length > 0 && (
          <p className="mt-2 text-sm text-espresso/80">{specs.join(" \u00b7 ")}</p>
        )}
      </div>
    </Card>
  );

  // On-site featured listing: use Next.js Link for client-side navigation.
  if (listing.isOnSite && listing.idxId && listing.listingId) {
    return (
      <Link href={`/listings/${listing.idxId}/${listing.listingId}`} className="block">
        {inner}
      </Link>
    );
  }

  // Savedlinks / non-featured listing: external link to the branded subdomain.
  if (listing.detailUrl) {
    return (
      <a href={listing.detailUrl} className="block">
        {inner}
      </a>
    );
  }

  return inner;
}
