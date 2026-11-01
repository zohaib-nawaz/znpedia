import type { Metadata } from "next";
import Link from "next/link";

import { CourseCard } from "@/components/course-card";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { getAllCourses } from "@/lib/courses";
import { buildCourseListJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const courses = getAllCourses();

  return (
    <>
      <JsonLd data={[buildWebsiteJsonLd(), buildCourseListJsonLd(courses)]} />
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Course Documentation
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              JavaScript, React aur Next.js Roman Urdu mein seekhein
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Har topic ek chhota, focused chapter: definition, kyun zaroori
              hai, code example, common mistakes aur quick revision. Basics se
              advanced tak, aur phir production-grade best practices, apni
              speed par.
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              View all courses
            </Link>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        ZnPedia: Roman Urdu mein web development
      </footer>
    </>
  );
}
