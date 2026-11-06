import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import type { AdjacentChapter, CourseChapter, CourseMeta } from "@/types/course";

export function getCoursePath(courseSlug: string): string {
  return `/courses/${courseSlug}`;
}

export function getChapterPath(courseSlug: string, chapterSlug: string): string {
  return `/courses/${courseSlug}/${chapterSlug}`;
}

export function getCourseHref(locale: Locale, courseSlug: string): string {
  return localizePath(locale, getCoursePath(courseSlug));
}

export function getChapterHref(
  courseSlug: string,
  chapterSlug: string,
  locale: Locale = defaultLocale
): string {
  return localizePath(locale, getChapterPath(courseSlug, chapterSlug));
}

function toAdjacent(
  course: CourseMeta,
  chapter: CourseChapter | undefined,
  locale: Locale
): AdjacentChapter {
  if (!chapter) {
    return null;
  }

  return {
    slug: chapter.slug,
    title: chapter.title,
    href: getChapterHref(course.slug, chapter.slug, locale),
  };
}

export function getAdjacentChapters(
  course: CourseMeta,
  currentSlug: string,
  locale: Locale
): { previous: AdjacentChapter; next: AdjacentChapter } {
  const index = course.chapters.findIndex((chapter) => chapter.slug === currentSlug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: toAdjacent(course, course.chapters[index - 1], locale),
    next: toAdjacent(course, course.chapters[index + 1], locale),
  };
}

export function getDefaultChapterSlug(course: CourseMeta): string {
  return course.chapters[0]?.slug ?? "introduction";
}
