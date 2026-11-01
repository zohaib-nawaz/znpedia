import type { CourseChapter, CourseMeta } from "@/types/course";
import { getChapterHref } from "@/lib/docs";
import { absoluteUrl, siteConfig } from "@/lib/site";

type JsonLd = Record<string, unknown>;

type BreadcrumbEntry = {
  name: string;
  path: string;
};

export function buildWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "ur-Latn",
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

function buildCourseNode(course: CourseMeta): JsonLd {
  return {
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/courses/${course.slug}`),
    inLanguage: "ur-Latn",
    isAccessibleForFree: true,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
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

export function buildCourseListJsonLd(courses: CourseMeta[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildCourseNode(course),
    })),
  };
}

type ChapterArticleInput = {
  course: CourseMeta;
  chapter: CourseChapter;
  description: string;
  keywords: string[];
  dateModified?: Date;
};

export function buildChapterArticleJsonLd({
  course,
  chapter,
  description,
  keywords,
  dateModified,
}: ChapterArticleInput): JsonLd {
  const url = absoluteUrl(getChapterHref(course.slug, chapter.slug));
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: chapter.title,
    description,
    image: absoluteUrl(getChapterOgImagePath(course.slug, chapter.slug)),
    url,
    mainEntityOfPage: url,
    inLanguage: "ur-Latn",
    keywords: keywords.join(", "),
    learningResourceType: "Tutorial",
    isAccessibleForFree: true,
    ...(dateModified ? { dateModified: dateModified.toISOString() } : {}),
    isPartOf: buildCourseNode(course),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function getChapterOgImagePath(courseSlug: string, chapterSlug: string): string {
  return `/og/${courseSlug}/${chapterSlug}`;
}

export function buildChapterKeywords(
  course: CourseMeta,
  chapter: CourseChapter,
  frontmatterKeywords: string[] = []
): string[] {
  const base = [
    `${course.title} ${chapter.title}`,
    `${chapter.title} in Urdu`,
    `${course.title} in Roman Urdu`,
  ];
  return Array.from(new Set([...frontmatterKeywords, ...base]));
}
