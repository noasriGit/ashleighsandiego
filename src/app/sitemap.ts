import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { launchCommunitySlugs } from "@/data/communities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/relocating-to-san-diego",
    "/moving-to-la-jolla",
    "/military-va-relocation-san-diego",
    "/first-time-home-buyer-san-diego",
    "/neighborhoods",
    "/search-homes",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/accessibility",
  ];

  const communityPages = launchCommunitySlugs.map(
    (slug) => `/neighborhoods/${slug}`,
  );

  const allPages = [...staticPages, ...communityPages];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.includes("neighborhoods/") ? 0.8 : 0.9,
  }));
}
