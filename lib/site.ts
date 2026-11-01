export const siteConfig = {
  name: "ZnPedia",
  title: "ZnPedia: JavaScript, React aur Next.js Roman Urdu mein",
  description:
    "JavaScript, React aur Next.js ko Roman Urdu mein seekhein. Har topic ek chhota, structured chapter: definition, examples, common mistakes aur quick revision.",
  locale: "en_US",
  keywords: [
    "JavaScript in Urdu",
    "React in Urdu",
    "Next.js in Urdu",
    "Roman Urdu programming",
    "learn web development",
    "JavaScript tutorial",
    "React tutorial",
    "Next.js tutorial",
  ],
} as const;

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export function getSiteUrl(): string {
  return resolveSiteUrl().replace(/\/$/, "");
}

export function absoluteUrl(pathname: string): string {
  return `${getSiteUrl()}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
