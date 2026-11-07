import { ArrowUpRight, Sparkles } from "lucide-react";

type EmptyStateProps = {
  greeting: string;
  body: string;
  scopeName: string | null;
  suggestions: string[];
  disabled: boolean;
  onPick: (text: string) => void;
};

function renderScopeBadge(scopeName: string | null) {
  if (!scopeName) {
    return null;
  }

  return (
    <span className="mt-4 inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
      {scopeName}
    </span>
  );
}

export function EmptyState({
  greeting,
  body,
  scopeName,
  suggestions,
  disabled,
  onPick,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/25">
        <Sparkles className="h-7 w-7" aria-hidden />
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {greeting}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{body}</p>
      {renderScopeBadge(scopeName)}
      <ul className="mt-8 grid w-full gap-3 text-left sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onPick(suggestion)}
              className="group flex h-full w-full cursor-pointer items-start justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-left text-sm leading-relaxed text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{suggestion}</span>
              <ArrowUpRight
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
