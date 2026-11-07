import type { MetadataRoute } from "next";

import {
  chapterExists,
  getAllCourses,
  getChapterLastModified,
  isChapterTranslated,
} from "@/lib/courses";
import { getChapterPath, getCoursePath } from "@/lib/docs";
import { defaultLocale, localeInfo, locales, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import { absoluteUrl } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

type PageSpec = {
  path: string;
  priority: number;
  changeFrequency: SitemapEntry["changeFrequency"];
  available?: readonly Locale[];
  lastModified?: (locale: Locale) => Date | undefined;
};

const STATIC_PAGES: PageSpec[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.9, changeFrequency: "weekly" },
  { path: "/assistant", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

function buildAlternates(path: string, available: readonly Locale[]): Record<string, string> {
  return Object.fromEntries(
    available.map((locale) => [localeInfo[locale].hreflang, absoluteUrl(localizePath(locale, path))])
  );
}

function expand(spec: PageSpec): MetadataRoute.Sitemap {
  const available = spec.available ?? locales;

  return available.map((locale) => ({
    url: absoluteUrl(localizePath(locale, spec.path)),
    lastModified: spec.lastModified?.(locale),
    changeFrequency: spec.changeFrequency,
    priority: spec.priority,
    alternates: { languages: buildAlternates(spec.path, available) },
  }));
}

function chapterLocales(courseSlug: string, chapterSlug: string): Locale[] {
  return locales.filter(
    (locale) => locale === defaultLocale || isChapterTranslated(courseSlug, chapterSlug, locale)
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const courses = getAllCourses();

  const coursePages: PageSpec[] = courses.map((course) => ({
    path: getCoursePath(course.slug),
    priority: 0.85,
    changeFrequency: "weekly",
  }));

  const chapterPages: PageSpec[] = courses.flatMap((course) =>
    course.chapters
      .filter((chapter) => chapterExists(course.slug, chapter.slug))
      .map((chapter) => ({
        path: getChapterPath(course.slug, chapter.slug),
        priority: 0.7,
        changeFrequency: "monthly" as const,
        available: chapterLocales(course.slug, chapter.slug),
        lastModified: (locale: Locale) => getChapterLastModified(course.slug, chapter.slug, locale),
      }))
  );

  return [...STATIC_PAGES, ...coursePages, ...chapterPages].flatMap(expand);
}
