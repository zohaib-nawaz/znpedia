import type { CourseChapter, CourseMeta } from "@/types/course";
import { getChapterHref, getCourseHref } from "@/lib/docs";
import { localeInfo, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import { absoluteUrl, siteConfig } from "@/lib/site";

type JsonLd = Record<string, unknown>;

type BreadcrumbEntry = {
  name: string;
  path: string;
};

export function buildWebsiteJsonLd(locale: Locale, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(localizePath(locale, "/")),
    description,
    inLanguage: localeInfo[locale].htmlLang,
  };
}

export function buildBreadcrumbJsonLd(entries: BreadcrumbEntry[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

function buildCourseNode(course: CourseMeta, locale: Locale): JsonLd {
  return {
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: absoluteUrl(getCourseHref(locale, course.slug)),
    inLanguage: localeInfo[locale].htmlLang,
    isAccessibleForFree: true,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl(localizePath(locale, "/")),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${course.chapters.length * 15}M`,
    },
    offers: {
      "@type": "Offer",
      category: "Free",
      price: 0,
      priceCurrency: "USD",
    },
  };
}

export function buildCourseListJsonLd(courses: CourseMeta[], locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildCourseNode(course, locale),
    })),
  };
}

type ChapterArticleInput = {
  course: CourseMeta;
  chapter: CourseChapter;
  description: string;
  keywords: string[];
  locale: Locale;
  dateModified?: Date;
};

function describeModified(dateModified: Date | undefined): JsonLd {
  if (!dateModified) {
    return {};
  }

  return { dateModified: dateModified.toISOString() };
}

export function buildChapterArticleJsonLd({
  course,
  chapter,
  description,
  keywords,
  locale,
  dateModified,
}: ChapterArticleInput): JsonLd {
  const url = absoluteUrl(getChapterHref(course.slug, chapter.slug, locale));

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: chapter.title,
    description,
    image: absoluteUrl(getChapterOgImagePath(course.slug, chapter.slug, locale)),
    url,
    mainEntityOfPage: url,
    inLanguage: localeInfo[locale].htmlLang,
    keywords: keywords.join(", "),
    learningResourceType: "Tutorial",
    isAccessibleForFree: true,
    ...describeModified(dateModified),
    isPartOf: buildCourseNode(course, locale),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function getChapterOgImagePath(courseSlug: string, chapterSlug: string, locale: Locale): string {
  return `/og/${locale}/${courseSlug}/${chapterSlug}`;
}

const KEYWORD_SUFFIX: Record<Locale, string[]> = {
  ur: ["in Urdu", "in Roman Urdu"],
  en: ["tutorial", "explained"],
};

export function buildChapterKeywords(
  course: CourseMeta,
  chapter: CourseChapter,
  locale: Locale,
  frontmatterKeywords: string[] = []
): string[] {
  const [first, second] = KEYWORD_SUFFIX[locale];
  const base = [
    `${course.title} ${chapter.title}`,
    `${chapter.title} ${first}`,
    `${course.title} ${second}`,
  ];

  return Array.from(new Set([...frontmatterKeywords, ...base]));
}
