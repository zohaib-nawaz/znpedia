import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { ChapterPreview } from "@/components/landing/chapter-preview";
import type { Dictionary } from "@/lib/i18n/dictionaries/ur";

type HeroStat = {
  value: string;
  label: string;
};

type HeroProps = {
  badge: string;
  stats: HeroStat[];
  startHref: string;
  coursesHref: string;
  copy: Dictionary["hero"];
};

export function Hero({ badge, stats, startHref, coursesHref, copy }: HeroProps) {
  return (
    <section className="dark surface-inverse relative overflow-hidden">
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {badge}
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground [text-wrap:balance] sm:text-5xl lg:text-6xl">
            {copy.titleStart} <span className="text-accent">{copy.titleAccent}</span> {copy.titleEnd}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground [text-wrap:pretty]">
            {copy.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={startHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
            >
              {copy.primary}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={coursesHref}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card/60 px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
            >
              {copy.secondary}
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {copy.highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ChapterPreview labels={copy.preview} />
      </div>
      <div className="relative border-t border-border">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse border-border px-2 py-6 text-center md:border-l md:first:border-l-0"
            >
              <dt className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
