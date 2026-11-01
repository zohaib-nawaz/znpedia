import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Layers } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LevelBadge } from "@/components/level-badge";
import { LevelBar } from "@/components/level-bar";
import type { LevelShare, NumberedSection } from "@/lib/catalog";
import type { CourseTheme } from "@/lib/course-themes";
import { getChapterHref } from "@/lib/docs";
import { getCourseBadge } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import type { CourseMeta } from "@/types/course";

type CourseOverviewProps = {
  course: CourseMeta;
  sections: NumberedSection[];
  shares: LevelShare[];
  hours: number;
  startHref: string;
  theme: CourseTheme;
};

export function CourseOverview({
  course,
  sections,
  shares,
  hours,
  startHref,
  theme,
}: CourseOverviewProps) {
  const stats = [
    { icon: BookOpen, label: "Chapters", value: String(course.chapters.length) },
    { icon: Layers, label: "Sections", value: String(course.sections.length) },
    { icon: Clock, label: "Parhai", value: `~${hours} ghante` },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumbs items={[{ label: "Courses", href: "/courses" }, { label: course.title }]} />
      <header className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent",
            theme.wash,
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl",
            theme.glow,
          )}
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-mono text-lg font-black shadow-lg",
                theme.tile,
              )}
              aria-hidden
            >
              {getCourseBadge(course)}
            </span>
            <div>
              <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", theme.text)}>
                Course
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {course.title}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {course.description}
          </p>
          <dl className="mt-6 grid max-w-md grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse rounded-xl border border-border bg-background/60 px-3 py-2.5 backdrop-blur"
              >
                <dt className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <stat.icon className="h-3 w-3" aria-hidden />
                  {stat.label}
                </dt>
                <dd className="text-base font-bold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 max-w-md">
            <LevelBar shares={shares} />
          </div>
          <Link
            href={startHref}
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-opacity duration-200 hover:opacity-90"
          >
            Course shuru karein
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </header>
      <div className="mt-12 space-y-10">
        {sections.map((section, sectionIndex) => (
          <section key={section.title} aria-labelledby={`section-${sectionIndex}`}>
            <h2
              id={`section-${sectionIndex}`}
              className="flex items-center gap-3 text-lg font-semibold text-foreground"
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold",
                  theme.tile,
                )}
              >
                {sectionIndex + 1}
              </span>
              {section.title}
              <span className="text-xs font-normal text-muted-foreground">
                {section.chapters.length} chapters
              </span>
            </h2>
            <ol className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {section.chapters.map((chapter) => (
                <li key={chapter.slug}>
                  <Link
                    href={getChapterHref(course.slug, chapter.slug)}
                    className="group flex items-center gap-4 px-4 py-3.5 transition-colors duration-200 hover:bg-muted/50"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[11px] tabular-nums text-muted-foreground transition-colors duration-200 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                      {chapter.number}
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {chapter.title}
                    </span>
                    {renderLevel(chapter.level)}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
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
