import { redirect, notFound } from "next/navigation";

import { courseExists, getCourseMeta } from "@/lib/courses";
import { getDefaultChapterSlug } from "@/lib/docs";

type CourseIndexPageProps = {
  params: Promise<{ course: string }>;
};

export default async function CourseIndexPage({ params }: CourseIndexPageProps) {
  const { course: courseSlug } = await params;

  if (!courseExists(courseSlug)) {
    notFound();
  }

  const course = getCourseMeta(courseSlug);
  if (!course) {
    notFound();
  }

  const firstChapter = getDefaultChapterSlug(course);
  redirect(`/courses/${courseSlug}/${firstChapter}`);
}
