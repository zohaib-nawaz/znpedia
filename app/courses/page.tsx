import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CourseCard } from "@/components/course-card";
import { SiteHeader } from "@/components/site-header";
import { getAllCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse all available documentation-style courses on ZnPedia.",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Pick a course to open its documentation layout, sidebar navigation,
          and chapter pages.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </main>
    </>
  );
}
