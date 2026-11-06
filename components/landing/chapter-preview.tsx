import { SyntaxHighlightedCode } from "@/components/syntax/syntax-highlighted-code";

const SAMPLE_CODE = `function createCounter() {
  let count = 0;

  return () => {
    count += 1;
    return count;
  };
}

const next = createCounter();
next();
next();`;

type ChapterPreviewLabels = {
  section: string;
  position: string;
  readTime: string;
  definitionLabel: string;
  definition: string;
  mistakeLabel: string;
  mistake: string;
  betterLabel: string;
  better: string;
};

type ChapterPreviewProps = {
  labels: ChapterPreviewLabels;
};

export function ChapterPreview({ labels }: ChapterPreviewProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-3xl" aria-hidden />
      <figure className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden />
          <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
            javascript / closures
          </span>
        </div>
        <div className="space-y-4 p-5">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="font-semibold uppercase tracking-[0.12em] text-accent">{labels.section}</span>
            <span aria-hidden>·</span>
            <span>{labels.position}</span>
            <span aria-hidden>·</span>
            <span>{labels.readTime}</span>
          </div>
          <div className="rounded-lg bg-muted/60 px-4 py-3">
            <p className="text-xs font-semibold text-foreground">{labels.definitionLabel}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">
              {labels.definition}
            </p>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-[12.5px] leading-relaxed">
            <SyntaxHighlightedCode code={SAMPLE_CODE} language="js" />
          </pre>
          <div className="rounded-lg border border-rose-500/25 px-4 py-3 text-sm">
            <p className="font-semibold text-foreground">
              {labels.mistakeLabel}{" "}
              <span className="font-normal text-muted-foreground">{labels.mistake}</span>
            </p>
            <p className="mt-1 text-muted-foreground">
              <span className="font-semibold text-accent">{labels.betterLabel}</span> {labels.better}
            </p>
          </div>
        </div>
      </figure>
    </div>
  );
}
