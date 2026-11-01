import type { AdjacentChapter, CourseChapter, CourseMeta } from "@/types/course";

export function getChapterHref(courseSlug: string, chapterSlug: string): string {
  return `/courses/${courseSlug}/${chapterSlug}`;
}

function toAdjacent(
  course: CourseMeta,
  chapter: CourseChapter | undefined
): AdjacentChapter {
  if (!chapter) {
    return null;
  }
  return {
    slug: chapter.slug,
    title: chapter.title,
    href: getChapterHref(course.slug, chapter.slug),
  };
}

export function getAdjacentChapters(
  course: CourseMeta,
  currentSlug: string
): { previous: AdjacentChapter; next: AdjacentChapter } {
  const index = course.chapters.findIndex((chapter) => chapter.slug === currentSlug);
  if (index === -1) {
    return { previous: null, next: null };
  }
  return {
    previous: toAdjacent(course, course.chapters[index - 1]),
    next: toAdjacent(course, course.chapters[index + 1]),
  };
}

export function getDefaultChapterSlug(course: CourseMeta): string {
  return course.chapters[0]?.slug ?? "introduction";
}
