import type { NextConfig } from "next";
import { getPathRedirects } from "./src/data/routes";

const SITE_DOMAIN = "sdcommunities.com";
const LEGACY_DOMAIN = "sandiegorelocationhomeguide.com";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.realtyfeed.com",
      },
    ],
  },
  async redirects() {
    // Chain-free path redirects for the 15-cluster rebuild (docs/seo-rebuild-plan.md §13),
    // sourced from src/data/routes.ts so the registry stays the single source of truth.
    const pathRedirects = getPathRedirects().map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));

    return [
      ...pathRedirects,
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${SITE_DOMAIN}` }],
        destination: `https://${SITE_DOMAIN}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: LEGACY_DOMAIN }],
        destination: `https://${SITE_DOMAIN}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${LEGACY_DOMAIN}` }],
        destination: `https://${SITE_DOMAIN}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
