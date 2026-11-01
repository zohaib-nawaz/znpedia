import type { ChapterLevel, ChapterPosition, CourseMeta } from "@/types/course";

export const CHAPTER_LEVELS: ChapterLevel[] = ["Beginner", "Intermediate", "Advanced"];

const WORDS_PER_MINUTE = 200;

export type CatalogStats = {
  courseCount: number;
  chapterCount: number;
};

export type LevelCount = {
  level: ChapterLevel;
  count: number;
};

export function getCatalogStats(courses: CourseMeta[]): CatalogStats {
  return {
    courseCount: courses.length,
    chapterCount: courses.reduce((sum, course) => sum + course.chapters.length, 0),
  };
}

export function countChaptersByLevel(course: CourseMeta): LevelCount[] {
  return CHAPTER_LEVELS.map((level) => ({
    level,
    count: course.chapters.filter((chapter) => chapter.level === level).length,
  })).filter((entry) => entry.count > 0);
}

export function getChapterPosition(
  course: CourseMeta,
  chapterSlug: string
): ChapterPosition | null {
  const index = course.chapters.findIndex((chapter) => chapter.slug === chapterSlug);
  const section = course.sections.find((entry) =>
    entry.chapters.some((chapter) => chapter.slug === chapterSlug)
  );
  if (index === -1 || !section) {
    return null;
  }

  return {
    number: index + 1,
    total: course.chapters.length,
    sectionTitle: section.title,
  };
}

export function estimateReadingMinutes(source: string): number {
  const words = source
    .replace(/^---[\s\S]*?---/, "")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function toHours(minutes: number): number {
  return Math.max(1, Math.round(minutes / 60));
}

export type CourseCardData = {
  course: CourseMeta;
  levels: LevelCount[];
  hours: number;
};

export function buildCourseCards(
  courses: CourseMeta[],
  readingMinutes: (course: CourseMeta) => number
): CourseCardData[] {
  return courses.map((course) => ({
    course,
    levels: countChaptersByLevel(course),
    hours: toHours(readingMinutes(course)),
  }));
}

export function withChapterCounts<T extends { courseSlug: string }>(
  steps: T[],
  courses: CourseMeta[]
): (T & { chapterCount: number })[] {
  return steps.flatMap((step) => {
    const course = courses.find((entry) => entry.slug === step.courseSlug);
    if (!course) {
      return [];
    }

    return [{ ...step, chapterCount: course.chapters.length }];
  });
}

export type NumberedSection = {
  title: string;
  chapters: (CourseMeta["chapters"][number] & { number: number })[];
};

export function numberSections(course: CourseMeta): NumberedSection[] {
  const numbers = new Map(course.chapters.map((chapter, index) => [chapter.slug, index + 1]));

  return course.sections.map((section) => ({
    title: section.title,
    chapters: section.chapters.flatMap((chapter) => {
      const number = numbers.get(chapter.slug);
      if (!number) {
        return [];
      }

      return [{ ...chapter, number }];
    }),
  }));
}
