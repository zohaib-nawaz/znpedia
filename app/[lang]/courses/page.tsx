import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CourseCard } from "@/components/course-card";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/landing/cta-band";
import { LearningPath } from "@/components/landing/learning-path";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildCourseCards, getCatalogStats, withChapterCounts } from "@/lib/catalog";
import { getCourseTheme } from "@/lib/course-themes";
import { getAllCourses, getCourseReadingMinutes } from "@/lib/courses";
import { getChapterHref, getCourseHref } from "@/lib/docs";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/route";
import { buildLearningPath } from "@/lib/landing-content";
import { buildBreadcrumbJsonLd, buildCourseListJsonLd } from "@/lib/seo";

type CoursesPageProps = {
  params: LocaleParams;
};

export async function generateMetadata({ params }: CoursesPageProps): Promise<Metadata> {
  const { locale, dict } = await resolveLocale(params);

  return {
    title: dict.meta.coursesTitle,
    description: dict.meta.coursesDescription,
    alternates: {
      canonical: localizePath(locale, "/courses"),
      languages: buildLanguageAlternates("/courses"),
    },
  };
}

export default async function CoursesPage({ params }: CoursesPageProps) {
  const { locale, dict } = await resolveLocale(params);
  const courses = getAllCourses(locale);
  const stats = getCatalogStats(courses);
  const pathEntries = withChapterCounts(buildLearningPath(dict), courses).map((entry) => ({
    ...entry,
    href: getCourseHref(locale, entry.courseSlug),
  }));

  return (
    <>
      <JsonLd
        data={[
          buildCourseListJsonLd(courses, locale),
          buildBreadcrumbJsonLd([{ name: dict.nav.courses, path: localizePath(locale, "/courses") }]),
        ]}
      />
      <SiteHeader locale={locale} dict={dict} />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <Breadcrumbs
              items={[
                { label: dict.nav.home, href: localizePath(locale, "/") },
                { label: dict.nav.courses },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {dict.courses.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {dict.courses.body(stats.courseCount, stats.chapterCount)}
            </p>
          </div>
        </section>
        <section aria-label={dict.courses.listLabel} className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {buildCourseCards(courses, (course) => getCourseReadingMinutes(course, locale)).map(
              (card) => (
                <CourseCard
                  key={card.course.slug}
                  course={card.course}
                  href={getCourseHref(locale, card.course.slug)}
                  labels={dict.card}
                  shares={card.shares}
                  hours={card.hours}
                  theme={getCourseTheme(card.course.slug)}
                />
              )
            )}
          </div>
        </section>
        <LearningPath
          entries={pathEntries}
          chapterLabel={dict.card.chapters}
          copy={{
            eyebrow: dict.home.pathEyebrow,
            title: dict.home.pathTitle,
            description: dict.home.pathDescription,
          }}
        />
        <CtaBand
          title={dict.courses.cta.title}
          body={dict.courses.cta.body}
          primary={{
            label: dict.courses.cta.primary,
            href: getChapterHref("javascript", "introduction", locale),
          }}
          secondary={{ label: dict.courses.cta.secondary, href: getCourseHref(locale, "best-practices") }}
        />
      </main>
      <SiteFooter locale={locale} dict={dict} chapterCount={stats.chapterCount} />
    </>
  );
}
