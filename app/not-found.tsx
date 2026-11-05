import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { getChapterHref, getDefaultChapterSlug } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Page nahi mila",
  robots: { index: false },
};

export default function NotFound() {
  const courses = getAllCourses();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
          <p className="font-mono text-sm font-semibold text-accent">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Yeh page nahi mila
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Link purana ho sakta hai ya chapter ka naam badal gaya ho. Neeche se kisi course par
            jayein.
          </p>
          <ul className="mx-auto mt-10 grid max-w-lg gap-3 text-left sm:grid-cols-2">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link
                  href={getChapterHref(course.slug, getDefaultChapterSlug(course))}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/50"
                >
                  {course.title}
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/"
            className="mt-10 inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
          >
            Home par wapas
          </Link>
        </div>
      </main>
      <SiteFooter chapterCount={getCatalogStats(courses).chapterCount} />
    </>
  );
}
