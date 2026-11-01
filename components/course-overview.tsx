import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Layers } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LevelBadge } from "@/components/level-badge";
import type { LevelCount, NumberedSection } from "@/lib/catalog";
import { getChapterHref } from "@/lib/docs";
import type { CourseMeta } from "@/types/course";

type CourseOverviewProps = {
  course: CourseMeta;
  sections: NumberedSection[];
  levels: LevelCount[];
  hours: number;
  startHref: string;
};

export function CourseOverview({ course, sections, levels, hours, startHref }: CourseOverviewProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumbs
        items={[
          { label: "Courses", href: "/courses" },
          { label: course.title },
        ]}
      />
      <header className="mt-6 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Course</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {course.description}
        </p>
        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Chapters</dt>
            <dd>{course.chapters.length} chapters</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Layers className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Sections</dt>
            <dd>{course.sections.length} sections</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Reading time</dt>
            <dd>~{hours} ghante parhai</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {levels.map((entry) => (
            <LevelBadge key={entry.level} level={entry.level} count={entry.count} />
          ))}
        </div>
        <Link
          href={startHref}
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
        >
          Course shuru karein
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </header>
      <div className="mt-10 space-y-10">
        {sections.map((section, sectionIndex) => (
          <section key={section.title} aria-labelledby={`section-${sectionIndex}`}>
            <h2
              id={`section-${sectionIndex}`}
              className="flex items-baseline gap-3 text-lg font-semibold text-foreground"
            >
              <span className="font-mono text-xs text-accent">
                {String(sectionIndex + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h2>
            <ol className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
              {section.chapters.map((chapter) => (
                  <li key={chapter.slug}>
                    <Link
                      href={getChapterHref(course.slug, chapter.slug)}
                      className="group flex items-center gap-4 px-4 py-3.5 transition-colors duration-200 hover:bg-muted/40"
                    >
                      <span className="w-6 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
                        {chapter.number}
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground">
                        {chapter.title}
                      </span>
                      {renderLevel(chapter.level)}
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden
                      />
                    </Link>
                  </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

function renderLevel(level: CourseMeta["chapters"][number]["level"]) {
  if (!level) {
    return null;
  }

  return (
    <span className="hidden sm:inline-flex">
      <LevelBadge level={level} />
    </span>
  );
}
