export type CourseMeta = {
  title: string;
  slug: string;
  description: string;
  chapters: string[];
  /** Optional short label on course cards (defaults from title). */
  badge?: string;
};

export type ChapterFrontmatter = {
  title?: string;
  description?: string;
};

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

export type AdjacentChapter = {
  slug: string;
  title: string;
  href: string;
} | null;
