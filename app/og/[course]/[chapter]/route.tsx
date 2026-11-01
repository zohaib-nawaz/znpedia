import { findChapter, getAllCourses, getCourseMeta } from "@/lib/courses";
import { renderOgImage } from "@/lib/og-image";

type OgRouteContext = {
  params: Promise<{ course: string; chapter: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCourses().flatMap((course) =>
    course.chapters.map((chapter) => ({ course: course.slug, chapter: chapter.slug }))
  );
}

export async function GET(_request: Request, { params }: OgRouteContext) {
  const { course: courseSlug, chapter: chapterSlug } = await params;
  const course = getCourseMeta(courseSlug);
  const chapter = course ? findChapter(course, chapterSlug) : null;

  if (!course || !chapter) {
    return new Response("Not found", { status: 404 });
  }

  return renderOgImage({
    eyebrow: course.title,
    title: chapter.title,
    subtitle: "Roman Urdu mein seekhein: definition, examples, mistakes aur revision.",
  });
}
