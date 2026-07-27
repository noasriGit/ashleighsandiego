import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /**
   * When true, emits `robots: { index: false, follow: true }`.
   * `follow` is intentional and required — these pages carry internal links
   * that route equity to the indexable cluster pages. See docs/seo-rebuild-plan.md §12.
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

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    ...(noindex && {
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
