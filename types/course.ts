export type ChapterLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseChapter = {
  slug: string;
  title: string;
  level?: ChapterLevel;
};

export type CourseSection = {
  title: string;
  chapters: CourseChapter[];
};

export type CourseMeta = {
  title: string;
  slug: string;
  description: string;
  sections: CourseSection[];
  chapters: CourseChapter[];
  badge?: string;
  order?: number;
};

export type CourseMetaFile = Omit<CourseMeta, "chapters">;

export type ChapterPosition = {
  number: number;
  total: number;
  sectionTitle: string;
};

export type ChapterFrontmatter = {
  title?: string;
  description?: string;
  keywords?: string[];
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
