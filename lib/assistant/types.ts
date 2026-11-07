export type AssistantScope = {
  course?: string;
  chapter?: string;
};

export type AssistantRole = "user" | "assistant";

export type AssistantTurn = {
  role: AssistantRole;
  content: string;
};

export type AssistantSource = {
  id: string;
  title: string;
  courseTitle: string;
  heading: string;
  href: string;
};

export type AssistantErrorCode =
  "not_configured" | "rate_limited" | "invalid_request" | "refused" | "busy" | "failed";

export type AssistantStreamEvent =
  | { type: "sources"; sources: AssistantSource[] }
  | { type: "text"; text: string }
  | { type: "error"; code: AssistantErrorCode }
  | { type: "done" };

export type AssistantRequest = {
  scope: AssistantScope;
  messages: AssistantTurn[];
};

export type ContentChunk = {
  id: string;
  courseSlug: string;
  courseTitle: string;
  chapterSlug: string;
  chapterTitle: string;
  sectionTitle: string;
  heading: string;
  href: string;
  keywords: string[];
  text: string;
};

export type CatalogChapter = {
  slug: string;
  title: string;
};

export type CatalogSection = {
  title: string;
  chapters: CatalogChapter[];
};

export type CatalogCourse = {
  slug: string;
  title: string;
  description: string;
  sections: CatalogSection[];
};

export type ScopeCourse = Omit<CatalogCourse, "description">;
