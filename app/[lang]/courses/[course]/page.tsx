import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AskAssistantCard } from "@/components/ask-assistant-card";
import { CourseOverview } from "@/components/course-overview";
import { JsonLd } from "@/components/json-ld";
import { getAssistantHref } from "@/lib/assistant/links";
import { countChaptersByLevel, numberSections, shareLevels, toHours } from "@/lib/catalog";
import { getCourseTheme } from "@/lib/course-themes";
import { getCourseMeta, getCourseReadingMinutes } from "@/lib/courses";
import { getChapterHref, getCourseHref, getCoursePath, getDefaultChapterSlug } from "@/lib/docs";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { resolveLocale } from "@/lib/i18n/route";
import { buildBreadcrumbJsonLd, buildCourseListJsonLd } from "@/lib/seo";

type CourseIndexPageProps = {
  params: Promise<{ lang: string; course: string }>;
};

export async function generateMetadata({ params }: CourseIndexPageProps): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const { locale, dict } = await resolveLocale(params);
  const course = getCourseMeta(courseSlug, locale);
  if (!course) {
    return {};
  }

  const title = dict.meta.courseTitle(course.title);
  const href = getCourseHref(locale, course.slug);

  return {
    title,
    description: course.description,
    alternates: {
      canonical: href,
      languages: buildLanguageAlternates(getCoursePath(course.slug)),
    },
    openGraph: { title, description: course.description, url: href },
  };
}

export default async function CourseIndexPage({ params }: CourseIndexPageProps) {
  const { course: courseSlug } = await params;
  const { locale, dict } = await resolveLocale(params);
  const course = getCourseMeta(courseSlug, locale);
  if (!course) {
    notFound();
  }

  const coursesHref = localizePath(locale, "/courses");

  return (
    <>
      <JsonLd
        data={[
          buildCourseListJsonLd([course], locale),
          buildBreadcrumbJsonLd([
            { name: dict.nav.courses, path: coursesHref },
            { name: course.title, path: getCourseHref(locale, course.slug) },
          ]),
        ]}
      />
      <CourseOverview
        course={course}
        locale={locale}
        labels={dict.overview}
        coursesCrumb={{ label: dict.nav.courses, href: coursesHref }}
        sections={numberSections(course)}
        shares={shareLevels(countChaptersByLevel(course))}
        theme={getCourseTheme(course.slug)}
        hours={toHours(getCourseReadingMinutes(course, locale))}
        startHref={getChapterHref(course.slug, getDefaultChapterSlug(course), locale)}
      />
      <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-10">
        <AskAssistantCard
          title={dict.assistant.askTitle}
          body={dict.assistant.askCourseBody}
          cta={dict.assistant.askCta}
          href={getAssistantHref(locale, { course: course.slug })}
        />
      </div>
    </>
  );
}
