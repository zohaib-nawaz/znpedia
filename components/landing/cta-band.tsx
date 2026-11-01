import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CtaBandProps = {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export function CtaBand({ title, body, primary, secondary }: CtaBandProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="dark surface-inverse relative overflow-hidden rounded-2xl border border-border px-6 py-14 text-center sm:px-12">
        <div
          className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]"
          aria-hidden
        />
        <div
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-2xl font-bold tracking-tight text-foreground [text-wrap:balance] sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {body}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex h-11 items-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
