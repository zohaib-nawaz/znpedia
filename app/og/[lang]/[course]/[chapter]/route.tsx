import { findChapter, getAllCourses, getCourseMeta } from "@/lib/courses";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { renderOgImage } from "@/lib/og-image";

type OgRouteContext = {
  params: Promise<{ lang: string; course: string; chapter: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllCourses().flatMap((course) =>
      course.chapters.map((chapter) => ({ lang, course: course.slug, chapter: chapter.slug }))
    )
  );
}

export async function GET(_request: Request, { params }: OgRouteContext) {
  const { lang, course: courseSlug, chapter: chapterSlug } = await params;
  if (!isLocale(lang)) {
    return new Response("Not found", { status: 404 });
  }

  const course = getCourseMeta(courseSlug, lang);
  if (!course) {
    return new Response("Not found", { status: 404 });
  }

  const chapter = findChapter(course, chapterSlug);
  if (!chapter) {
    return new Response("Not found", { status: 404 });
  }

  const { meta } = getDictionary(lang);

  return renderOgImage({
    eyebrow: course.title,
    title: chapter.title,
    subtitle: meta.ogChapterSubtitle,
    tagline: meta.ogTagline,
  });
}
