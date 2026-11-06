import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { getChapterHref, getDefaultChapterSlug } from "@/lib/docs";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/paths";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  const locale = defaultLocale;
  const dict = getDictionary(locale);
  const courses = getAllCourses(locale);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main id="main-content" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
          <p className="font-mono text-sm font-semibold text-accent">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Yeh page nahi mila
          </h1>
          <p className="mt-1 text-lg font-medium text-muted-foreground" lang="en">
            Page not found
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Link purana ho sakta hai ya chapter ka naam badal gaya ho. Neeche se kisi course par
            jayein.
          </p>
          <ul className="mx-auto mt-10 grid max-w-lg gap-3 text-left sm:grid-cols-2">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link
                  href={getChapterHref(course.slug, getDefaultChapterSlug(course), locale)}
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
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={localizePath("ur", "/")}
              className="inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
            >
              Home par wapas
            </Link>
            <Link
              href={localizePath("en", "/")}
              lang="en"
              className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
            >
              English home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter
        locale={locale}
        dict={dict}
        chapterCount={getCatalogStats(courses).chapterCount}
      />
    </>
  );
}
