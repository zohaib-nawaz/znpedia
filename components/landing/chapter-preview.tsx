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

export function ChapterPreview() {
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
            <span className="font-semibold uppercase tracking-[0.12em] text-accent">Functions</span>
            <span aria-hidden>·</span>
            <span>Chapter 16 / 47</span>
            <span aria-hidden>·</span>
            <span>5 min read</span>
          </div>
          <div className="rounded-lg bg-muted/60 px-4 py-3">
            <p className="text-xs font-semibold text-foreground">Short definition</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">
              Closure woh function hai jo apne bahar wale scope ke variables yaad rakhta hai.
            </p>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-[12.5px] leading-relaxed">
            <SyntaxHighlightedCode code={SAMPLE_CODE} language="js" />
          </pre>
          <div className="rounded-lg border border-rose-500/25 px-4 py-3 text-sm">
            <p className="font-semibold text-foreground">
              Galati:{" "}
              <span className="font-normal text-muted-foreground">
                loop mein var ke saath closure
              </span>
            </p>
            <p className="mt-1 text-muted-foreground">
              <span className="font-semibold text-accent">Behtar:</span> let use karein, har
              iteration ka apna scope.
            </p>
          </div>
        </div>
      </figure>
    </div>
  );
}
