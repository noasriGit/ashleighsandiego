import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ListingDetail } from "@/components/idx/ListingDetail";
import { getFeaturedListing } from "@/lib/idx-api";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/seo/JsonLd";

type PageProps = {
  params: Promise<{ idxId: string; listingId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { idxId, listingId } = await params;
  const listing = await getFeaturedListing(idxId, listingId);

  if (!listing) {
    return {
      title: "Listing Not Found",
      description: "This listing is not currently in our featured set.",
      robots: { index: false },
    };
  }

  const displayAddr =
    listing.displayAddress !== false ? listing.address : "San Diego Home";
  const title = [listing.price, displayAddr, listing.city]
    .filter(Boolean)
    .join(" — ");
  const description = [
    listing.price && `Listed at ${listing.price}.`,
    listing.beds && `${listing.beds} bed`,
    listing.baths && `${listing.baths} bath`,
    listing.sqft && `${listing.sqft} sq ft.`,
    listing.city && `Located in ${listing.city}, San Diego.`,
  ]
    .filter(Boolean)
    .join(" ");

  const url = `${siteConfig.url}/listings/${idxId}/${listingId}`;
  const ogImage = listing.imageUrl
    ? [{ url: listing.imageUrl, alt: displayAddr }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: ogImage,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage?.map((i) => i.url),
    },
  };
}

function listingSchema(
  listing: NonNullable<Awaited<ReturnType<typeof getFeaturedListing>>>,
  idxId: string,
  listingId: string,
) {
  const displayAddr =
    listing.displayAddress !== false ? listing.address : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: displayAddr ?? "San Diego Home",
    url: `${siteConfig.url}/listings/${idxId}/${listingId}`,
    ...(listing.price && {
      offers: {
        "@type": "Offer",
        price: listing.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }),
    ...(displayAddr && {
      address: {
        "@type": "PostalAddress",
        streetAddress: displayAddr,
        addressLocality: listing.city ?? "San Diego",
        addressRegion: listing.state ?? "CA",
        postalCode: listing.zipcode,
        addressCountry: "US",
      },
    }),
    ...(listing.imageUrl && { image: listing.allImages ?? [listing.imageUrl] }),
    ...(listing.remarks && { description: listing.remarks }),
  };
}

/** Soft-not-found: listing exists in MLS but is not in the agent's featured set. */
function ListingNotOnSite({
  idxId,
  listingId,
}: {
  idxId: string;
  listingId: string;
}) {
  const baseUrl = (process.env.NEXT_PUBLIC_IDX_BASE_URL ?? "").replace(/\/$/, "");
  const subdomainUrl = baseUrl
    ? `${baseUrl}/idx/details/listing/${idxId}/${listingId}`
    : null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="kicker mb-4">Listing Detail</p>
      <h1 className="heading-section text-cabernet">
        This Listing Isn&apos;t in Our Featured Set
      </h1>
      <p className="mt-4 text-espresso/80">
        This home may still be active on the MLS. Use the link below to view it on our
        full search portal, or contact us to get details directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {subdomainUrl && (
          <Button href={subdomainUrl}>
            View on Our Search Portal
          </Button>
        )}
        <Button href="/search-homes" variant="outline">
          Search All Homes
        </Button>
        <Button href="/contact" variant="outline">
          Contact Us
        </Button>
      </div>
      <p className="mt-8 text-xs text-espresso/50">
        Listing ID: {idxId}/{listingId}
      </p>
      <nav className="mt-6">
        <Link href="/" className="text-sm text-cabernet hover:underline">
          ← Back to Home
        </Link>
      </nav>
    </main>
  );
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { idxId, listingId } = await params;
  const listing = await getFeaturedListing(idxId, listingId);

  if (!listing) {
    return <ListingNotOnSite idxId={idxId} listingId={listingId} />;
  }

  return (
    <>
      <JsonLd data={listingSchema(listing, idxId, listingId)} />
      <main>
        <ListingDetail listing={listing} />
      </main>
    </>
  );
}
