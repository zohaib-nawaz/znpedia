import {
  Code2,
  Languages,
  Layers,
  Route,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import type { ValueProp } from "@/lib/landing-content";

const ICONS: Record<ValueProp["icon"], LucideIcon> = {
  languages: Languages,
  layers: Layers,
  code: Code2,
  shield: ShieldCheck,
  route: Route,
  sparkles: Sparkles,
};

type ValuePropsProps = {
  items: ValueProp[];
};

export function ValueProps({ items }: ValuePropsProps) {
  return (
    <section
      aria-labelledby="why-heading"
      className="dark surface-inverse relative overflow-hidden"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_100%_0%,black,transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          id="why-heading"
          eyebrow="Kyun ZnPedia"
          title="Seekhna aasaan, content kaam ka"
          description="Bikhre tutorials ki jagah ek tarteeb, apni zabaan mein, aaj ke tools ke saath."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = ICONS[item.icon];

            return (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur transition-colors duration-200 hover:border-accent/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
