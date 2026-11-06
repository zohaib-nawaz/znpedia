import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { estimateReadingMinutes } from "@/lib/catalog";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import type {
  ChapterFrontmatter,
  ChapterSource,
  CourseChapter,
  CourseMeta,
  CourseMetaFile,
} from "@/types/course";

const CONTENT_DIR = path.join(process.cwd(), "content/courses");

const UNORDERED = Number.MAX_SAFE_INTEGER;

export function getCoursesContentDir(): string {
  return CONTENT_DIR;
}

export function getAllCourseSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function localizeDescription(meta: CourseMetaFile, locale: Locale): string {
  const translation = meta.i18n?.[locale];
  if (locale === defaultLocale || !translation) {
    return meta.description;
  }

  return translation.description;
}

export function getCourseMeta(slug: string, locale: Locale = defaultLocale): CourseMeta | null {
  const metaPath = path.join(CONTENT_DIR, slug, "meta.json");
  if (!fs.existsSync(metaPath)) {
    return null;
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as CourseMetaFile;

  return {
    title: meta.title,
    slug,
    description: localizeDescription(meta, locale),
    badge: meta.badge,
    order: meta.order,
    sections: meta.sections,
    chapters: meta.sections.flatMap((section) => section.chapters),
  };
}

export function getAllCourses(locale: Locale = defaultLocale): CourseMeta[] {
  return getAllCourseSlugs()
    .map((slug) => getCourseMeta(slug, locale))
    .filter((course): course is CourseMeta => course !== null)
    .sort((a, b) => (a.order ?? UNORDERED) - (b.order ?? UNORDERED));
}

export function courseExists(slug: string): boolean {
  return getCourseMeta(slug) !== null;
}

export function findChapter(course: CourseMeta, chapterSlug: string): CourseChapter | null {
  return course.chapters.find((chapter) => chapter.slug === chapterSlug) ?? null;
}

export function getChapterPath(
  courseSlug: string,
  chapterSlug: string,
  locale: Locale = defaultLocale
): string {
  if (locale === defaultLocale) {
    return path.join(CONTENT_DIR, courseSlug, `${chapterSlug}.mdx`);
  }

  return path.join(CONTENT_DIR, courseSlug, `${chapterSlug}.${locale}.mdx`);
}

export function chapterExists(courseSlug: string, chapterSlug: string): boolean {
  return fs.existsSync(getChapterPath(courseSlug, chapterSlug));
}

export function isChapterTranslated(
  courseSlug: string,
  chapterSlug: string,
  locale: Locale
): boolean {
  return fs.existsSync(getChapterPath(courseSlug, chapterSlug, locale));
}

export function resolveChapterSource(
  courseSlug: string,
  chapterSlug: string,
  locale: Locale
): ChapterSource {
  if (isChapterTranslated(courseSlug, chapterSlug, locale)) {
    return { filePath: getChapterPath(courseSlug, chapterSlug, locale), isFallback: false };
  }

  return {
    filePath: getChapterPath(courseSlug, chapterSlug),
    isFallback: locale !== defaultLocale,
  };
}

export function getChapterLastModified(
  courseSlug: string,
  chapterSlug: string,
  locale: Locale = defaultLocale
): Date | undefined {
  const { filePath } = resolveChapterSource(courseSlug, chapterSlug, locale);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return fs.statSync(filePath).mtime;
}

export function getCourseReadingMinutes(
  course: CourseMeta,
  locale: Locale = defaultLocale
): number {
  return course.chapters
    .map((chapter) => resolveChapterSource(course.slug, chapter.slug, locale).filePath)
    .filter((filePath) => fs.existsSync(filePath))
    .reduce((sum, filePath) => sum + estimateReadingMinutes(fs.readFileSync(filePath, "utf8")), 0);
}

export function getChapterFrontmatter(
  courseSlug: string,
  chapterSlug: string,
  locale: Locale = defaultLocale
): ChapterFrontmatter {
  const { filePath } = resolveChapterSource(courseSlug, chapterSlug, locale);
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return matter(fs.readFileSync(filePath, "utf8")).data as ChapterFrontmatter;
}
