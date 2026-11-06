import type { NextConfig } from "next";

const LOCALE_COOKIE = "NEXT_LOCALE";
const DEFAULT_LOCALE = "ur";
const LEGACY_PATHS = ["/courses", "/courses/:path*", "/about", "/privacy", "/terms"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "cookie", key: LOCALE_COOKIE, value: "en" }],
        destination: "/en",
        permanent: false,
      },
      {
        source: "/",
        destination: `/${DEFAULT_LOCALE}`,
        permanent: false,
      },
      ...LEGACY_PATHS.map((source) => ({
        source,
        destination: `/${DEFAULT_LOCALE}${source}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
