import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading, type SectionCopy } from "@/components/landing/section-heading";
import { getCourseTheme } from "@/lib/course-themes";
import { cn } from "@/lib/utils";

export type LearningPathEntry = {
  courseSlug: string;
  title: string;
  outcome: string;
  chapterCount: number;
  href: string;
};

type LearningPathProps = {
  entries: LearningPathEntry[];
  copy: SectionCopy;
  chapterLabel: (count: number) => string;
};

export function LearningPath({ entries, copy, chapterLabel }: LearningPathProps) {
  return (
    <section
      id="learning-path"
      aria-labelledby="path-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6"
    >
      <SectionHeading
          id="path-heading"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
      <ol className="relative mt-12 grid gap-4 md:grid-cols-4">
        <span
          className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.1rem] hidden h-0.5 bg-gradient-to-r from-amber-400 via-sky-400 via-60% to-emerald-500 opacity-60 md:block"
          aria-hidden
        />
        {entries.map((entry, index) => {
          const theme = getCourseTheme(entry.courseSlug);

          return (
            <li key={entry.courseSlug} className="relative">
              <Link
                href={entry.href}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  theme.hoverBorder,
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent opacity-70",
                    theme.wash,
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-black shadow-lg ring-4 ring-background",
                    theme.tile,
                  )}
                >
                  {index + 1}
                </span>
                <h3 className="relative mt-4 text-base font-bold text-foreground">{entry.title}</h3>
                <p className="relative mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {entry.outcome}
                </p>
                <span
                  className={cn(
                    "relative mt-5 inline-flex items-center gap-1 text-xs font-semibold",
                    theme.text,
                  )}
                >
                  {chapterLabel(entry.chapterCount)}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
