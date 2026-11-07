import { ChevronDown } from "lucide-react";

import { SectionHeading, type SectionCopy } from "@/components/landing/section-heading";
import type { FaqItem } from "@/lib/landing-content";

type FaqProps = {
  items: FaqItem[];
  copy: SectionCopy;
};

export function Faq({ items, copy }: FaqProps) {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          id="faq-heading"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((item) => (
            <details key={item.question} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-foreground">
                {item.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
