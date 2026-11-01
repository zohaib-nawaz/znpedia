import {
  AlertTriangle,
  BookOpen,
  CircleHelp,
  Code2,
  ListChecks,
  MapPin,
  Route,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import type { AnatomyStep } from "@/lib/landing-content";
import { TONES } from "@/lib/tones";
import { cn } from "@/lib/utils";

const ICONS: Record<AnatomyStep["icon"], LucideIcon> = {
  book: BookOpen,
  help: CircleHelp,
  map: MapPin,
  workflow: Workflow,
  code: Code2,
  alert: AlertTriangle,
  route: Route,
  check: ListChecks,
};

type ChapterAnatomyProps = {
  steps: AnatomyStep[];
};

export function ChapterAnatomy({ steps }: ChapterAnatomyProps) {
  return (
    <section aria-labelledby="anatomy-heading" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          id="anatomy-heading"
          eyebrow="Har chapter ka structure"
          title="Har chapter ek hi tarteeb mein"
          description="Aapko pata hota hai aage kya aayega, is liye dhyan concept par rehta hai, layout par nahi."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon];
            const tone = TONES[step.tone];

            return (
              <li
                key={step.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  tone.hoverBorder,
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset",
                      tone.tile,
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-mono text-2xl font-black text-foreground/10 transition-colors duration-300 group-hover:text-foreground/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
