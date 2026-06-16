import type { NextConfig } from "next";

const SITE_DOMAIN = "sdcommunities.com";
const LEGACY_DOMAIN = "sandiegorelocationhomeguide.com";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
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
