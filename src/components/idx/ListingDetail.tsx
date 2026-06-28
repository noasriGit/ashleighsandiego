import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getSdmlsIdxDisclaimer, siteConfig } from "@/data/site-config";
import type { IdxListing } from "@/lib/idx-api";

const ListingGallery = dynamic(
  () => import("@/components/idx/ListingGallery").then((mod) => mod.ListingGallery),
);

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
  const sdmlsDisclaimer = getSdmlsIdxDisclaimer();

  const specs: SpecItem[] = [
    listing.beds ? { label: "Bedrooms", value: listing.beds } : null,
    listing.fullBaths
      ? { label: "Full Baths", value: listing.fullBaths }
      : listing.baths
        ? { label: "Bathrooms", value: listing.baths }
        : null,
    listing.partialBaths ? { label: "Half Baths", value: listing.partialBaths } : null,
    listing.sqft
      ? {
          label: "Square Feet",
          value: Number(listing.sqft.replace(/[^0-9]/g, "")).toLocaleString(),
        }
      : null,
    listing.acres ? { label: "Lot Acres", value: listing.acres } : null,
    listing.yearBuilt ? { label: "Year Built", value: listing.yearBuilt } : null,
    listing.propertyType ? { label: "Property Type", value: listing.propertyType } : null,
    listing.county ? { label: "County", value: listing.county } : null,
  ].filter((s): s is SpecItem => s !== null);

  const images = listing.allImages ?? (listing.imageUrl ? [listing.imageUrl] : []);
  const hasMap = Boolean(listing.latitude && listing.longitude);
  const additionalDetails: SpecItem[] = [
    listing.status ? { label: "Status", value: listing.status } : null,
    listing.city ? { label: "City", value: listing.city } : null,
    listing.state ? { label: "State", value: listing.state } : null,
    listing.zipcode ? { label: "ZIP", value: listing.zipcode } : null,
    listing.listingAgentId ? { label: "Listing Agent ID", value: listing.listingAgentId } : null,
    listing.listingOfficeId ? { label: "Listing Office ID", value: listing.listingOfficeId } : null,
  ].filter((item): item is SpecItem => item !== null);

  return (
    <article className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
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

      <ListingGallery images={images} address={displayAddr} />

      <section className="mt-7 rounded-2xl border border-dove/30 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            {listing.price && (
              <p className="text-4xl font-semibold text-cabernet sm:text-5xl">{listing.price}</p>
            )}
            <h1 className="mt-2 text-2xl font-medium text-espresso sm:text-3xl">{displayAddr}</h1>
            {locationLine && <p className="mt-1 text-base text-espresso/75">{locationLine}</p>}
          </div>
          {listing.status && (
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${statusBadgeClass(listing.status)}`}
            >
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()}
            </span>
          )}
        </div>
        {specs.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {specs.map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-dove/30 bg-pearl p-3 text-center">
                <p className="text-base font-semibold text-espresso">{value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-espresso/65">{label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {listing.remarks && (
            <Card className="bg-white p-6">
              <h2 className="heading-card text-cabernet">About This Home</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-espresso/90">
                {listing.remarks}
              </p>
            </Card>
          )}

          {additionalDetails.length > 0 && (
            <Card className="bg-white p-6">
              <h2 className="heading-card text-cabernet">Additional Details</h2>
              <div className="mt-4 grid gap-2">
                {additionalDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-dove/20 py-2 text-sm last:border-b-0"
                  >
                    <span className="text-espresso/70">{label}</span>
                    <span className="font-medium text-espresso">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {hasMap && (
            <Card className="bg-white p-6">
              <h2 className="heading-card text-cabernet">Location</h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-dove/30">
                <iframe
                  title={`Map showing location of ${displayAddr}`}
                  src={buildMapUrl(listing.latitude!, listing.longitude!)}
                  width="100%"
                  height="360"
                  className="block"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-2 text-xs text-espresso/55">
                Map data by{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-cabernet"
                >
                  OpenStreetMap
                </a>{" "}
                contributors.
              </p>
            </Card>
          )}

          {listing.detailUrl && (
            <Card className="bg-white p-6">
              <a
                href={listing.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cabernet underline hover:text-cabernet/80"
              >
                View full MLS record on our search portal
              </a>
            </Card>
          )}
        </div>

        <aside className="space-y-4">
          <Card accent="cabernet" elevated className="sticky top-24">
            <h2 className="heading-card text-cabernet">Interested in This Home?</h2>
            <p className="mt-2 text-sm text-espresso/80">
              Book a free buyer strategy call to review this listing, compare nearby homes, and
              map out your strongest offer approach.
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
            <div className="mt-4 space-y-1 border-t border-dove/30 pt-4 text-xs text-espresso/60">
              <p>{siteConfig.agent.name}</p>
              <p>{siteConfig.brokerage.name}</p>
              {siteConfig.agent.dreNumber && <p>DRE #{siteConfig.agent.dreNumber}</p>}
            </div>
          </Card>
        </aside>
      </div>

      <footer className="mt-12 space-y-2 border-t border-dove/30 pt-6 text-xs leading-relaxed text-espresso/55">
        <p>{franchiseText}</p>
        <p>{siteConfig.disclaimer}</p>
        <p>{sdmlsDisclaimer}</p>
      </footer>
    </article>
  );
}
