import type { Metadata } from "next";

import { AssistantApp } from "@/components/assistant/assistant-app";
import { getCatalog } from "@/lib/assistant/content-index";
import { sanitizeScope } from "@/lib/assistant/scope";
import type { CatalogCourse, ScopeCourse } from "@/lib/assistant/types";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/route";

type SearchValue = string | string[] | undefined;

type AssistantPageProps = {
  params: LocaleParams;
  searchParams: Promise<Record<string, SearchValue>>;
};

function firstValue(value: SearchValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function toScopeCourses(catalog: CatalogCourse[]): ScopeCourse[] {
  return catalog.map(({ slug, title, sections }) => ({ slug, title, sections }));
}

export async function generateMetadata({ params }: AssistantPageProps): Promise<Metadata> {
  const { locale, dict } = await resolveLocale(params);

  return {
    title: dict.meta.assistantTitle,
    description: dict.meta.assistantDescription,
    alternates: {
      canonical: localizePath(locale, "/assistant"),
      languages: buildLanguageAlternates("/assistant"),
    },
  };
}

export default async function AssistantPage({ params, searchParams }: AssistantPageProps) {
  const { locale, dict } = await resolveLocale(params);
  const query = await searchParams;
  const courses = toScopeCourses(getCatalog(locale));
  const initialScope = sanitizeScope(courses, {
    course: firstValue(query.course),
    chapter: firstValue(query.chapter),
  });

  return (
    <AssistantApp
      key={`${initialScope.course}:${initialScope.chapter}`}
      locale={locale}
      courses={courses}
      initialScope={initialScope}
      homeHref={localizePath(locale, "/")}
      labels={dict.assistant}
      codeLabels={{ copyCode: dict.chapter.copyCode, copied: dict.chapter.copied }}
      themeLabels={dict.theme}
      languageLabel={dict.nav.language}
    />
  );
}
