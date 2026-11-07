import { CourseCard } from "@/components/course-card";
import { JsonLd } from "@/components/json-ld";
import { ChapterAnatomy } from "@/components/landing/chapter-anatomy";
import { CtaBand } from "@/components/landing/cta-band";
import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { LearningPath } from "@/components/landing/learning-path";
import { SectionHeading } from "@/components/landing/section-heading";
import { ValueProps } from "@/components/landing/value-props";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildCourseCards, getCatalogStats, withChapterCounts } from "@/lib/catalog";
import { getCourseTheme } from "@/lib/course-themes";
import { getAllCourses, getCourseReadingMinutes } from "@/lib/courses";
import { getCourseHref } from "@/lib/docs";
import { localizePath } from "@/lib/i18n/paths";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/route";
import { buildChapterAnatomy, buildLearningPath, buildValueProps } from "@/lib/landing-content";
import { buildCourseListJsonLd, buildFaqJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

type HomePageProps = {
  params: LocaleParams;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale, dict } = await resolveLocale(params);
  const courses = getAllCourses(locale);
  const stats = getCatalogStats(courses);
  const startHref = localizePath(locale, "/courses/javascript/introduction");
  const pathEntries = withChapterCounts(buildLearningPath(dict), courses).map((entry) => ({
    ...entry,
    href: getCourseHref(locale, entry.courseSlug),
  }));

  return (
    <>
      <JsonLd
        data={[
          buildWebsiteJsonLd(locale, dict.meta.siteDescription),
          buildCourseListJsonLd(courses, locale),
          buildFaqJsonLd(dict.faq),
        ]}
      />
      <SiteHeader locale={locale} dict={dict} />
      <main id="main-content" className="flex-1">
        <Hero
          copy={dict.hero}
          badge={dict.hero.badge(stats.chapterCount, stats.courseCount)}
          startHref={startHref}
          coursesHref={localizePath(locale, "/courses")}
          stats={[
            { value: String(stats.courseCount), label: dict.hero.stats.courses },
            { value: String(stats.chapterCount), label: dict.hero.stats.chapters },
            { value: dict.hero.stats.freeValue, label: dict.hero.stats.freeLabel },
            { value: dict.hero.stats.signupValue, label: dict.hero.stats.signupLabel },
          ]}
        />
        <section aria-labelledby="courses-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            id="courses-heading"
            eyebrow={dict.home.coursesEyebrow}
            title={dict.home.coursesTitle}
            description={dict.home.coursesDescription}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
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
        <ChapterAnatomy
          steps={buildChapterAnatomy(dict)}
          copy={{
            eyebrow: dict.home.anatomyEyebrow,
            title: dict.home.anatomyTitle,
            description: dict.home.anatomyDescription,
          }}
        />
        <LearningPath
          entries={pathEntries}
          chapterLabel={dict.card.chapters}
          copy={{
            eyebrow: dict.home.pathEyebrow,
            title: dict.home.pathTitle,
            description: dict.home.pathDescription,
          }}
        />
        <ValueProps
          items={buildValueProps(dict)}
          copy={{
            eyebrow: dict.home.whyEyebrow,
            title: dict.home.whyTitle,
            description: dict.home.whyDescription,
          }}
        />
        <Faq
          items={dict.faq}
          copy={{
            eyebrow: dict.home.faqEyebrow,
            title: dict.home.faqTitle,
            description: dict.home.faqDescription,
          }}
        />
        <CtaBand
          title={dict.home.cta.title}
          body={dict.home.cta.body}
          primary={{ label: dict.home.cta.primary, href: startHref }}
          secondary={{ label: dict.home.cta.secondary, href: getCourseHref(locale, "best-practices") }}
        />
      </main>
      <SiteFooter locale={locale} dict={dict} chapterCount={stats.chapterCount} />
    </>
  );
}
