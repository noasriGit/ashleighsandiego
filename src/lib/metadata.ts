import type { Metadata } from "next";
import { getRouteByPath } from "@/data/routes";
import { siteConfig } from "@/data/site-config";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /**
   * When true, emits `robots: { index: false, follow: true }`.
   * When omitted, falls back to `routes.ts` indexable flag for the path.
   * `follow` is intentional — noindex pages still pass link equity.
   */
  noindex?: boolean;
};

export function generatePageMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const route = getRouteByPath(path);
  const resolvedNoindex =
    noindex ?? (route !== undefined ? !route.indexable : false);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    ...(resolvedNoindex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
