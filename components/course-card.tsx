import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

import { getCourseBadge } from "@/lib/docs-config";
import type { CourseMeta } from "@/types/course";

type CourseCardProps = {
  course: CourseMeta;
};

export function CourseCard({ course }: CourseCardProps) {
  const badge = getCourseBadge(course);
  const chapterCount = course.chapters.length;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40 hover:bg-muted/30"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-sm font-semibold text-accent"
          aria-hidden
        >
          {badge}
        </span>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">{course.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {course.description}
      </p>
      <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5" aria-hidden />
        {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}
      </p>
    </Link>
  );
}
