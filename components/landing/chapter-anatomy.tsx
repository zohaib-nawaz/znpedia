import { SectionHeading } from "@/components/landing/section-heading";
import type { AnatomyStep } from "@/lib/landing-content";

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
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-5">
              <span className="font-mono text-xs font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
