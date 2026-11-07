import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

import { LevelBar } from "@/components/level-bar";
import type { LevelShare } from "@/lib/catalog";
import type { CourseTheme } from "@/lib/course-themes";
import { getCourseBadge } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import type { CourseMeta } from "@/types/course";

type CourseCardLabels = {
  chapters: (count: number) => string;
  sections: (count: number) => string;
  hours: (hours: number) => string;
  start: string;
};

type CourseCardProps = {
  course: CourseMeta;
  href: string;
  labels: CourseCardLabels;
  shares: LevelShare[];
  hours: number;
  theme: CourseTheme;
  headingLevel?: "h2" | "h3";
};

export function CourseCard({
  course,
  href,
  labels,
  shares,
  hours,
  theme,
  headingLevel = "h3",
}: CourseCardProps) {
  const badge = getCourseBadge(course);
  const Heading = headingLevel;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40",
        theme.hoverBorder,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent",
          theme.wash,
        )}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-3 -top-6 select-none font-mono text-[120px] font-black leading-none text-foreground/[0.04]"
        aria-hidden
      >
        {badge}
      </span>
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl font-mono text-base font-black shadow-lg",
              theme.tile,
            )}
            aria-hidden
          >
            {badge}
          </span>
          <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
            {labels.sections(course.sections.length)}
          </span>
        </div>
        <Heading className="mt-5 text-xl font-bold tracking-tight text-foreground">
          {course.title}
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>
        <div className="mt-6">
          <LevelBar shares={shares} />
        </div>
      </div>
      <div className="relative flex items-center gap-4 border-t border-border bg-muted/30 px-6 py-3.5 text-xs font-medium text-muted-foreground sm:px-7">
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          {labels.chapters(course.chapters.length)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {labels.hours(hours)}
        </span>
        <span className={cn("ml-auto inline-flex items-center gap-1 font-semibold", theme.text)}>
          {labels.start}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
