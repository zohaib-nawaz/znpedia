import { getAllCourses, getChapterFrontmatter } from "@/lib/courses";
import { getChapterHref } from "@/lib/docs";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import type { SearchEntry } from "@/lib/search";
import type { ChapterFrontmatter } from "@/types/course";

type SearchIndexContext = {
  params: Promise<{ lang: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function describe(frontmatter: ChapterFrontmatter): Pick<SearchEntry, "description" | "keywords"> {
  if (!frontmatter.description || !frontmatter.keywords) {
    return { description: "", keywords: [] };
  }

  return { description: frontmatter.description, keywords: frontmatter.keywords };
}

function buildIndex(locale: Locale): SearchEntry[] {
  return getAllCourses(locale).flatMap((course) =>
    course.sections.flatMap((section) =>
      section.chapters.map((chapter) => ({
        href: getChapterHref(course.slug, chapter.slug, locale),
        title: chapter.title,
        courseTitle: course.title,
        sectionTitle: section.title,
        ...describe(getChapterFrontmatter(course.slug, chapter.slug, locale)),
      }))
    )
  );
}

export async function GET(_request: Request, { params }: SearchIndexContext) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(buildIndex(lang));
}
