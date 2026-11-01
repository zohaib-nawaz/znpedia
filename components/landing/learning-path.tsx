import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";

export type LearningPathEntry = {
  courseSlug: string;
  title: string;
  outcome: string;
  chapterCount: number;
};

type LearningPathProps = {
  entries: LearningPathEntry[];
};

export function LearningPath({ entries }: LearningPathProps) {
  return (
    <section
      id="learning-path"
      aria-labelledby="path-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6"
    >
      <SectionHeading
        id="path-heading"
        eyebrow="Learning path"
        title="Kis tarteeb mein parhein"
        description="Har course pichle wale par khara hai. Jo aata hai woh skip karein, jo nahi aata wahan se shuru karein."
      />
      <ol className="mt-10 grid gap-4 md:grid-cols-4">
        {entries.map((entry, index) => (
          <li key={entry.courseSlug} className="relative">
            <Link
              href={`/courses/${entry.courseSlug}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-200 hover:border-accent/50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{entry.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {entry.outcome}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                {entry.chapterCount} chapters
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
