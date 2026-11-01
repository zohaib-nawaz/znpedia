import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseOverview } from "@/components/course-overview";
import { JsonLd } from "@/components/json-ld";
import { countChaptersByLevel, numberSections, shareLevels, toHours } from "@/lib/catalog";
import { getCourseTheme } from "@/lib/course-themes";
import { getCourseMeta, getCourseReadingMinutes } from "@/lib/courses";
import { getChapterHref, getDefaultChapterSlug } from "@/lib/docs";
import { buildBreadcrumbJsonLd, buildCourseListJsonLd } from "@/lib/seo";

type CourseIndexPageProps = {
  params: Promise<{ course: string }>;
};

export async function generateMetadata({ params }: CourseIndexPageProps): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getCourseMeta(courseSlug);
  if (!course) {
    return { title: "Not found" };
  }

  const title = `${course.title} Course Roman Urdu mein`;

  return {
    title,
    description: course.description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: { title, description: course.description, url: `/courses/${course.slug}` },
  };
}

export default async function CourseIndexPage({ params }: CourseIndexPageProps) {
  const { course: courseSlug } = await params;
  const course = getCourseMeta(courseSlug);
  if (!course) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          buildCourseListJsonLd([course]),
          buildBreadcrumbJsonLd([
            { name: "Courses", path: "/courses" },
            { name: course.title, path: `/courses/${course.slug}` },
          ]),
        ]}
      />
      <CourseOverview
        course={course}
        sections={numberSections(course)}
        shares={shareLevels(countChaptersByLevel(course))}
        theme={getCourseTheme(course.slug)}
        hours={toHours(getCourseReadingMinutes(course))}
        startHref={getChapterHref(course.slug, getDefaultChapterSlug(course))}
      />
    </>
  );
}
