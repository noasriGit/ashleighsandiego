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
  const compact = size === "compact";
  const imageRatio = compact ? "aspect-[4/3]" : "aspect-video";
  const bodyPadding = compact ? "p-4" : "p-5";
  const priceSize = compact ? "text-xl" : "text-2xl";

  const displayAddr =
    listing.displayAddress !== false ? listing.address : "Address withheld";
  const locationLine = [listing.city, listing.state, listing.zipcode]
    .filter(Boolean)
    .join(", ");
  const imageCount = listing.allImages?.length ?? (listing.imageUrl ? 1 : 0);
  const statusLabel = listing.status
    ? listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()
    : undefined;
  const specs = [
    listing.beds && `${listing.beds} Beds`,
    listing.baths && `${listing.baths} Baths`,
    listing.sqft && `${Number(listing.sqft.replace(/[^0-9]/g, "")).toLocaleString()} Sq Ft`,
  ].filter(Boolean);

  const inner = (
    <Card
      hover
      className="group overflow-hidden border border-dove/35 bg-white p-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-cabernet/40"
    >
      <div className={`relative ${imageRatio} overflow-hidden bg-rose/30`}>
        {listing.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- external MLS image host, varies per listing
          <img
            src={listing.imageUrl}
            alt={displayAddr}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-espresso/55">
            No photo available
          </div>
        )}

        {statusLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-cabernet shadow-sm backdrop-blur">
            {statusLabel}
          </span>
        )}

        {imageCount > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-espresso/75 px-2.5 py-1 text-xs font-medium text-white">
            {imageCount} photos
          </span>
        )}
      </div>

      <div className={bodyPadding}>
        {listing.price && (
          <p className={`${priceSize} font-semibold leading-tight text-cabernet`}>{listing.price}</p>
        )}
        <p className="mt-2 line-clamp-2 text-sm font-medium text-espresso">{displayAddr}</p>
        {locationLine && (
          <p className="mt-1 text-xs uppercase tracking-wide text-espresso/60">{locationLine}</p>
        )}

        {specs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {specs.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-dove/35 bg-pearl px-2.5 py-1 text-xs font-medium text-espresso/85"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {!listing.price && !locationLine && specs.length === 0 && (
          <p className="mt-3 text-sm text-espresso/65">
            View listing details and current market status.
          </p>
        )}
      </div>
    </Card>
  );

  const linkLabel = [
    listing.price,
    displayAddr,
    locationLine || listing.city,
    specs.length > 0 ? specs.join(", ") : undefined,
  ]
    .filter(Boolean)
    .join(" — ");

  if (listing.isOnSite && listing.idxId && listing.listingId) {
    return (
      <Link
        href={`/listings/${listing.idxId}/${listing.listingId}`}
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2"
        aria-label={`View listing: ${linkLabel}`}
      >
        {inner}
      </Link>
    );
  }

  if (listing.detailUrl) {
    return (
      <a
        href={listing.detailUrl}
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2"
        aria-label={`View listing on search site: ${linkLabel}`}
      >
        {inner}
      </a>
    );
  }

  return inner;
}
