import Link from "next/link";

import { CourseCard } from "@/components/course-card";
import { SiteHeader } from "@/components/site-header";
import { getAllCourses } from "@/lib/courses";

export default function HomePage() {
  const courses = getAllCourses();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Course Documentation
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Learn development through structured courses
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Documentation-style learning paths for JavaScript, React, and
              Next.js. Browse chapters, read at your pace, and extend content
              through Markdown and MDX.
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
        ZnPedia — documentation-first course platform
      </footer>
    </>
  );
}
