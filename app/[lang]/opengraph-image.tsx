import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type OgImageProps = {
  params: Promise<{ lang: string }>;
};

export default async function OpengraphImage({ params }: OgImageProps) {
  const { lang } = await params;
  const { meta, hero } = getDictionary(isLocale(lang) ? lang : defaultLocale);

  return renderOgImage({
    eyebrow: hero.highlights[0],
    title: "JavaScript, React & Next.js",
    subtitle: meta.siteDescription,
    tagline: meta.ogTagline,
  });
}
