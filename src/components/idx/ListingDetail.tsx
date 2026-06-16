import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ListingGallery } from "@/components/idx/ListingGallery";
import { siteConfig } from "@/data/site-config";
import type { IdxListing } from "@/lib/idx-api";

type ListingDetailProps = {
  listing: IdxListing;
};

type SpecItem = {
  label: string;
  value: string;
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  sold: "bg-gray-100 text-gray-700",
  closed: "bg-gray-100 text-gray-700",
};

function statusBadgeClass(status?: string): string {
  const key = (status ?? "").toLowerCase();
  return statusColors[key] ?? "bg-rose/40 text-espresso";
}

function buildLocationLine(listing: IdxListing): string {
  const parts: string[] = [];
  if (listing.city) parts.push(listing.city);
  if (listing.state) parts.push(listing.state);
  if (listing.zipcode) parts.push(listing.zipcode);
  return parts.join(", ");
}

function buildMapUrl(lat: string, lon: string): string {
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  const delta = 0.008;
  const bbox = [lonNum - delta, latNum - delta, lonNum + delta, latNum + delta]
    .map((n) => n.toFixed(6))
    .join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latNum}%2C${lonNum}`;
}

export function ListingDetail({ listing }: ListingDetailProps) {
  const displayAddr =
    listing.displayAddress !== false
      ? listing.address
      : "Address withheld per MLS rules";

  const locationLine = buildLocationLine(listing);
  const year = new Date().getFullYear();
  const franchiseText = siteConfig.franchiseDisclaimer.replace("{year}", String(year));

  const specs: SpecItem[] = [
    listing.beds ? { label: "Beds", value: listing.beds } : null,
    listing.fullBaths
      ? { label: "Full baths", value: listing.fullBaths }
      : listing.baths
        ? { label: "Baths", value: listing.baths }
        : null,
    listing.partialBaths ? { label: "Half baths", value: listing.partialBaths } : null,
    listing.sqft ? { label: "Sq ft", value: Number(listing.sqft.replace(/[^0-9]/g, "")).toLocaleString() } : null,
    listing.acres ? { label: "Lot acres", value: listing.acres } : null,
    listing.yearBuilt ? { label: "Year built", value: listing.yearBuilt } : null,
    listing.propertyType ? { label: "Type", value: listing.propertyType } : null,
    listing.county ? { label: "County", value: listing.county } : null,
  ].filter((s): s is SpecItem => s !== null);

  const images = listing.allImages ?? (listing.imageUrl ? [listing.imageUrl] : []);
  const hasMap = Boolean(listing.latitude && listing.longitude);

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-cabernet">Home</Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <Link href="/search-homes" className="hover:text-cabernet">Search Homes</Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <span className="text-espresso">{displayAddr}</span>
          </li>
        </ol>
      </nav>

      {/* Gallery */}
      <ListingGallery images={images} address={displayAddr} />

      {/* Main content: detail + sidebar CTA */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* ── Left: listing details ── */}
        <div>
          {/* Price + status + address */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              {listing.price && (
                <p className="text-3xl font-semibold text-cabernet sm:text-4xl">
                  {listing.price}
                </p>
              )}
              <h1 className="mt-1 text-xl font-medium text-espresso sm:text-2xl">
                {displayAddr}
              </h1>
              {locationLine && (
                <p className="mt-0.5 text-base text-espresso/70">{locationLine}</p>
              )}
            </div>
            {listing.status && (
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${statusBadgeClass(listing.status)}`}
              >
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()}
              </span>
            )}
          </div>

          {/* Specs grid */}
          {specs.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-dove/30 bg-pearl p-5 sm:grid-cols-3 lg:grid-cols-4">
              {specs.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-base font-semibold text-espresso">{value}</p>
                  <p className="text-xs text-espresso/60">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Remarks */}
          {listing.remarks && (
            <div className="mt-8">
              <h2 className="heading-card text-cabernet">About This Home</h2>
              <p className="mt-3 leading-relaxed text-espresso/90 whitespace-pre-line">
                {listing.remarks}
              </p>
            </div>
          )}

          {/* Map */}
          {hasMap && (
            <div className="mt-8">
              <h2 className="heading-card text-cabernet">Location</h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-dove/30">
                <iframe
                  title={`Map showing location of ${displayAddr}`}
                  src={buildMapUrl(listing.latitude!, listing.longitude!)}
                  width="100%"
                  height="320"
                  className="block"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-1 text-xs text-espresso/50">
                Map data ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-cabernet"
                >
                  OpenStreetMap
                </a>{" "}
                contributors
              </p>
            </div>
          )}

          {/* Attribution + IDX link */}
          {listing.detailUrl && (
            <div className="mt-8">
              <a
                href={listing.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cabernet underline hover:text-cabernet/80"
              >
                View full MLS record on our search portal ↗
              </a>
            </div>
          )}
        </div>

        {/* ── Right: CTA sidebar ── */}
        <aside className="space-y-4">
          <Card accent="cabernet" elevated className="sticky top-24">
            <h2 className="heading-card text-cabernet">Interested in This Home?</h2>
            <p className="mt-2 text-sm text-espresso/80">
              Book a free strategy call to discuss this listing, get a comparative market
              analysis, or schedule a tour.
            </p>
            <Button href="/contact" className="mt-4 w-full">
              {siteConfig.ctas.strategyCall}
            </Button>
            {siteConfig.agent.phone && (
              <p className="mt-3 text-center text-sm text-espresso/70">
                Or call{" "}
                <a
                  href={`tel:${siteConfig.agent.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-medium text-cabernet hover:underline"
                >
                  {siteConfig.agent.phone}
                </a>
              </p>
            )}
            <div className="mt-4 border-t border-dove/30 pt-4 text-xs text-espresso/60 space-y-1">
              <p>{siteConfig.agent.name}</p>
              <p>{siteConfig.brokerage.name}</p>
              {siteConfig.agent.dreNumber && (
                <p>DRE #{siteConfig.agent.dreNumber}</p>
              )}
            </div>
          </Card>
        </aside>
      </div>

      {/* Disclaimers */}
      <footer className="mt-12 space-y-2 border-t border-dove/30 pt-6 text-xs text-espresso/55 leading-relaxed">
        {listing.listingAgentId && (
          <p>Listing agent ID: {listing.listingAgentId}.</p>
        )}
        <p>{franchiseText}</p>
        <p>{siteConfig.disclaimer}</p>
      </footer>
    </article>
  );
}
