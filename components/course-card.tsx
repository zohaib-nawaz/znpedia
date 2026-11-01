import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

import { LevelBadge } from "@/components/level-badge";
import type { LevelCount } from "@/lib/catalog";
import { getCourseBadge } from "@/lib/docs-config";
import type { CourseMeta } from "@/types/course";

type CourseCardProps = {
  course: CourseMeta;
  levels: LevelCount[];
  hours: number;
};

export function CourseCard({ course, levels, hours }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-accent/50 hover:bg-muted/30"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft font-mono text-sm font-bold text-accent"
          aria-hidden
        >
          {getCourseBadge(course)}
        </span>
        <ArrowRight
          className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {course.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {levels.map((entry) => (
          <LevelBadge key={entry.level} level={entry.level} count={entry.count} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          {course.chapters.length} chapters
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          ~{hours} ghante parhai
        </span>
      </div>
    </Link>
  );
}
