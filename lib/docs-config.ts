import type { TocHeading } from "@/types/course";

/** Shared documentation UI settings (all courses / chapters). */
export const docsConfig = {
  toc: {
    label: "On this page",
    /** Markdown heading levels shown in the right TOC (`##` = 2). */
    levels: [2],
  },
} as const;

export function filterTocHeadings(headings: TocHeading[]): TocHeading[] {
  const allowed = new Set<number>(docsConfig.toc.levels);
  return headings.filter((heading) => allowed.has(heading.level));
}

export function getCourseBadge(course: {
  title: string;
  slug: string;
  badge?: string;
}): string {
  if (course.badge?.trim()) {
    return course.badge.trim();
  }
  const words = course.title.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return course.title.slice(0, 2).toUpperCase();
}
