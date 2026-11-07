import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/route";

type TermsPageProps = {
  params: LocaleParams;
};

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale, dict } = await resolveLocale(params);

  return {
    title: dict.meta.termsTitle,
    description: dict.meta.termsDescription,
    alternates: {
      canonical: localizePath(locale, "/terms"),
      languages: buildLanguageAlternates("/terms"),
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale, dict } = await resolveLocale(params);

  return (
    <LegalPage
      locale={locale}
      dict={dict}
      title={dict.meta.termsTitle}
      intro={dict.legal.termsIntro}
      sections={dict.legal.terms}
      chapterCount={getCatalogStats(getAllCourses(locale)).chapterCount}
    />
  );
}
