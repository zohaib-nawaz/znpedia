import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, localeInfo, locales } from "@/lib/i18n/config";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }

  const { meta } = getDictionary(lang);

  return {
    title: {
      default: meta.siteTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.siteDescription,
    keywords: meta.keywords,
    alternates: {
      canonical: localizePath(lang, "/"),
      languages: buildLanguageAlternates("/"),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: meta.siteTitle,
      description: meta.siteDescription,
      locale: localeInfo[lang].ogLocale,
      url: localizePath(lang, "/"),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.siteTitle,
      description: meta.siteDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const { nav } = getDictionary(lang);

  return (
    <div lang={localeInfo[lang].htmlLang} className="flex min-h-full flex-1 flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
      >
        {nav.skipToContent}
      </a>
      {children}
    </div>
  );
}
