import { getAllCourses, getChapterFrontmatter } from "@/lib/courses";
import { getChapterHref } from "@/lib/docs";
import type { SearchEntry } from "@/lib/search";
import type { ChapterFrontmatter } from "@/types/course";

export const dynamic = "force-static";

function describe(frontmatter: ChapterFrontmatter): Pick<SearchEntry, "description" | "keywords"> {
  if (!frontmatter.description || !frontmatter.keywords) {
    return { description: "", keywords: [] };
  }

  return { description: frontmatter.description, keywords: frontmatter.keywords };
}

export function GET() {
  const entries: SearchEntry[] = getAllCourses().flatMap((course) =>
    course.sections.flatMap((section) =>
      section.chapters.map((chapter) => ({
        href: getChapterHref(course.slug, chapter.slug),
        title: chapter.title,
        courseTitle: course.title,
        sectionTitle: section.title,
        ...describe(getChapterFrontmatter(course.slug, chapter.slug)),
      }))
    )
  );

  return Response.json(entries);
}
