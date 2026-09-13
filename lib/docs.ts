import type { AdjacentChapter, CourseMeta } from "@/types/course";
import { slugToTitle } from "@/lib/utils";

export function getChapterTitle(
  course: CourseMeta,
  chapterSlug: string,
  frontmatterTitle?: string
): string {
  if (frontmatterTitle) {
    return frontmatterTitle;
  }
  return slugToTitle(chapterSlug);
}

export function getAdjacentChapters(
  course: CourseMeta,
  currentSlug: string
): { previous: AdjacentChapter; next: AdjacentChapter } {
  const index = course.chapters.indexOf(currentSlug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  const previousSlug = index > 0 ? course.chapters[index - 1] : null;
  const nextSlug =
    index < course.chapters.length - 1 ? course.chapters[index + 1] : null;

  const base = `/courses/${course.slug}`;

  return {
    previous: previousSlug
      ? {
          slug: previousSlug,
          title: slugToTitle(previousSlug),
          href: `${base}/${previousSlug}`,
        }
      : null,
    next: nextSlug
      ? {
          slug: nextSlug,
          title: slugToTitle(nextSlug),
          href: `${base}/${nextSlug}`,
        }
      : null,
  };
}

export function getDefaultChapterSlug(course: CourseMeta): string {
  return course.chapters[0] ?? "introduction";
}
