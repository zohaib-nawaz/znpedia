import type { AssistantScope, ScopeCourse } from "@/lib/assistant/types";

export type ResolvedScope = {
  course: ScopeCourse | null;
  chapterTitle: string | null;
};

export function resolveScope(courses: ScopeCourse[], scope: AssistantScope): ResolvedScope {
  const course = courses.find((item) => item.slug === scope.course);
  if (!course) {
    return { course: null, chapterTitle: null };
  }

  const chapter = course.sections
    .flatMap((section) => section.chapters)
    .find((item) => item.slug === scope.chapter);
  if (!chapter) {
    return { course, chapterTitle: null };
  }

  return { course, chapterTitle: chapter.title };
}

export function sanitizeScope(courses: ScopeCourse[], scope: AssistantScope): AssistantScope {
  const resolved = resolveScope(courses, scope);
  if (!resolved.course) {
    return {};
  }

  if (!resolved.chapterTitle) {
    return { course: resolved.course.slug };
  }

  return { course: resolved.course.slug, chapter: scope.chapter };
}

export function fillTemplate(template: string, name: string): string {
  return template.replaceAll("{name}", name);
}

export function pickSuggestions(
  suggestions: { general: string[]; course: string[]; chapter: string[] },
  resolved: ResolvedScope
): string[] {
  if (resolved.chapterTitle) {
    const title = resolved.chapterTitle;
    return suggestions.chapter.map((template) => fillTemplate(template, title));
  }

  if (resolved.course) {
    const title = resolved.course.title;
    return suggestions.course.map((template) => fillTemplate(template, title));
  }

  return suggestions.general;
}
