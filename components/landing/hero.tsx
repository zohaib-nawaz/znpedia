import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroStat = {
  value: string;
  label: string;
};

type HeroProps = {
  stats: HeroStat[];
  startHref: string;
};

export function Hero({ stats, startHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--accent-soft),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            React 19.2 aur Next.js 16 ke saath updated
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground [text-wrap:balance] sm:text-5xl lg:text-6xl">
            Web development seekhein, <span className="text-accent">Roman Urdu</span> mein
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground [text-wrap:pretty]">
            JavaScript se Next.js aur production-grade best practices tak. Har topic ek
            chhota, focused chapter: definition, code example, common mistakes aur quick
            revision.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={startHref}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
            >
              Pehla chapter parhein
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-11 items-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
            >
              Saare courses dekhein
            </Link>
          </div>
        </div>
        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background px-4 py-5 text-center">
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-bold tracking-tight text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
