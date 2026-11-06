import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/route";

type PrivacyPageProps = {
  params: LocaleParams;
};

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale, dict } = await resolveLocale(params);

  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    alternates: {
      canonical: localizePath(locale, "/privacy"),
      languages: buildLanguageAlternates("/privacy"),
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale, dict } = await resolveLocale(params);

  return (
    <LegalPage
      locale={locale}
      dict={dict}
      title={dict.meta.privacyTitle}
      intro={dict.legal.privacyIntro}
      sections={dict.legal.privacy}
      chapterCount={getCatalogStats(getAllCourses(locale)).chapterCount}
    />
  );
}
