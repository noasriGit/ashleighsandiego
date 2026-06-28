import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ListingDetail } from "@/components/idx/ListingDetail";
import { getFeaturedListing } from "@/lib/idx-api";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: PageProps<"/listings/[idxId]/[listingId]">): Promise<Metadata> {
  const { idxId, listingId } = await params;
  const listing = await getFeaturedListing(idxId, listingId);

  if (!listing) {
    return { title: "Listing Not Found" };
  }

  const displayAddr =
    listing.displayAddress !== false ? listing.address : "Address withheld";
  const title = [listing.price, displayAddr, listing.city]
    .filter(Boolean)
    .join(" · ");
  const description = listing.remarks
    ? listing.remarks.slice(0, 160)
    : `View details for ${displayAddr}${listing.city ? `, ${listing.city}` : ""} listed at ${listing.price ?? "—"}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/listings/${idxId}/${listingId}`,
    },
  };
}

export default async function ListingDetailPage({
  params,
}: PageProps<"/listings/[idxId]/[listingId]">) {
  const { idxId, listingId } = await params;
  const listing = await getFeaturedListing(idxId, listingId);

  if (!listing) {
    notFound();
  }

  const displayAddr =
    listing.displayAddress !== false ? listing.address : "Address withheld";

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            [listing.price, displayAddr].filter(Boolean).join(" · "),
            listing.remarks?.slice(0, 160) ??
              `View details for ${displayAddr}.`,
            `/listings/${idxId}/${listingId}`,
          ),
          breadcrumbSchema([
            { name: "Listings", path: "/listings" },
            { name: displayAddr, path: `/listings/${idxId}/${listingId}` },
          ]),
        ]}
      />
      <ListingDetail listing={listing} />
    </>
  );
}
