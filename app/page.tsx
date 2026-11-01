import type { Metadata } from "next";

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
import { getAllCourses, getCourseReadingMinutes } from "@/lib/courses";
import { chapterAnatomy, faqItems, learningPath, valueProps } from "@/lib/landing-content";
import { buildCourseListJsonLd, buildFaqJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const courses = getAllCourses();
  const stats = getCatalogStats(courses);

  return (
    <>
      <JsonLd
        data={[buildWebsiteJsonLd(), buildCourseListJsonLd(courses), buildFaqJsonLd(faqItems)]}
      />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero
          badge={`${stats.chapterCount} chapters, ${stats.courseCount} courses, Roman Urdu mein`}
          startHref="/courses/javascript/introduction"
          stats={[
            { value: String(stats.courseCount), label: "Courses" },
            { value: String(stats.chapterCount), label: "Chapters" },
            { value: "Free", label: "Hamesha" },
            { value: "0", label: "Signup zaroori" },
          ]}
        />
        <section aria-labelledby="courses-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            id="courses-heading"
            eyebrow="Courses"
            title="Apna course chunein"
            description="Har course sections mein bata hua hai, aur har chapter par uska level likha hai."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {buildCourseCards(courses, getCourseReadingMinutes).map((card) => (
              <CourseCard
                key={card.course.slug}
                course={card.course}
                levels={card.levels}
                hours={card.hours}
              />
            ))}
          </div>
        </section>
        <ChapterAnatomy steps={chapterAnatomy} />
        <LearningPath entries={withChapterCounts(learningPath, courses)} />
        <ValueProps items={valueProps} />
        <Faq items={faqItems} />
        <CtaBand
          title="Aaj ek chapter, kal ek aur"
          body="Rozana 15 minute kaafi hain. Pehla chapter kholein aur dekhein structure kaise madad karta hai."
          primary={{ label: "JavaScript se shuru karein", href: "/courses/javascript/introduction" }}
          secondary={{ label: "Best Practices dekhein", href: "/courses/best-practices" }}
        />
      </main>
      <SiteFooter chapterCount={stats.chapterCount} />
    </>
  );
}
