import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CourseCard } from "@/components/course-card";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/landing/cta-band";
import { LearningPath } from "@/components/landing/learning-path";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildCourseCards, getCatalogStats, withChapterCounts } from "@/lib/catalog";
import { getAllCourses, getCourseReadingMinutes } from "@/lib/courses";
import { learningPath } from "@/lib/landing-content";
import { buildBreadcrumbJsonLd, buildCourseListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Courses: JavaScript, React, Next.js aur Best Practices",
  description:
    "ZnPedia ke tamam free courses: JavaScript, React, Next.js aur Best Practices, Roman Urdu mein chhote structured chapters ke saath.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  const courses = getAllCourses();
  const stats = getCatalogStats(courses);

  return (
    <>
      <JsonLd
        data={[
          buildCourseListJsonLd(courses),
          buildBreadcrumbJsonLd([{ name: "Courses", path: "/courses" }]),
        ]}
      />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Courses" }]} />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Saare courses
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {stats.courseCount} courses, {stats.chapterCount} chapters. Har course sections mein
              bata hua hai aur har chapter par uska level likha hai, taake aap sahi jagah se
              shuru kar sakein.
            </p>
          </div>
        </section>
        <section aria-label="Course list" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
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
        <LearningPath entries={withChapterCounts(learningPath, courses)} />
        <CtaBand
          title="Pata nahi kahan se shuru karein?"
          body="Programming nayi hai to JavaScript Introduction parhein. React aata hai to Best Practices course aapke liye hai."
          primary={{ label: "JavaScript Introduction", href: "/courses/javascript/introduction" }}
          secondary={{ label: "Best Practices", href: "/courses/best-practices" }}
        />
      </main>
      <SiteFooter chapterCount={stats.chapterCount} />
    </>
  );
}
