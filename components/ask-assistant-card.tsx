import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type AskAssistantCardProps = {
  title: string;
  body: string;
  cta: string;
  href: string;
};

export function AskAssistantCard({ title, body, cta, href }: AskAssistantCardProps) {
  return (
    <aside className="dark relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-5 text-zinc-100 shadow-lg sm:p-6">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg shadow-accent/30">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-base font-semibold text-white">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">{body}</p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
        >
          {cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
