export type CourseChapter = {
  slug: string;
  title: string;
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
};

export type CourseMetaFile = Omit<CourseMeta, "chapters">;

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
