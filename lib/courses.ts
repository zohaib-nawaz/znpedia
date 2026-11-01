import fs from "fs";
import path from "path";

import type { CourseChapter, CourseMeta, CourseMetaFile } from "@/types/course";

const CONTENT_DIR = path.join(process.cwd(), "content/courses");

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

export function getCourseMeta(slug: string): CourseMeta | null {
  const metaPath = path.join(CONTENT_DIR, slug, "meta.json");
  if (!fs.existsSync(metaPath)) {
    return null;
  }
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as CourseMetaFile;
  return {
    ...meta,
    slug,
    chapters: meta.sections.flatMap((section) => section.chapters),
  };
}

export function getAllCourses(): CourseMeta[] {
  return getAllCourseSlugs()
    .map((slug) => getCourseMeta(slug))
    .filter((course): course is CourseMeta => course !== null);
}

export function courseExists(slug: string): boolean {
  return getCourseMeta(slug) !== null;
}

export function findChapter(
  course: CourseMeta,
  chapterSlug: string
): CourseChapter | null {
  return course.chapters.find((chapter) => chapter.slug === chapterSlug) ?? null;
}

export function getChapterPath(courseSlug: string, chapterSlug: string): string {
  return path.join(CONTENT_DIR, courseSlug, `${chapterSlug}.mdx`);
}

export function chapterExists(courseSlug: string, chapterSlug: string): boolean {
  return fs.existsSync(getChapterPath(courseSlug, chapterSlug));
}

export function getChapterLastModified(
  courseSlug: string,
  chapterSlug: string
): Date | undefined {
  const filePath = getChapterPath(courseSlug, chapterSlug);
  return fs.existsSync(filePath) ? fs.statSync(filePath).mtime : undefined;
}
