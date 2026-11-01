"use client";

import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useSearchIndex } from "@/components/search/use-search-index";
import { searchEntries, type SearchHit } from "@/lib/search";
import { cn } from "@/lib/utils";

const SUGGESTIONS = ["closures", "useEffect", "server actions", "promises", "migrations", "use cache"];

export function SearchDialog() {
  const router = useRouter();
  const { entries, status, load } = useSearchIndex();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = useMemo(() => searchEntries(entries, query), [entries, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    load();
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, load]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const go = (hit: SearchHit) => {
    close();
    router.push(hit.href);
  };

  const onInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, hits.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Enter" && hits[activeIndex]) {
      go(hits[activeIndex]);
    }
  };

  const renderTrigger = () => (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Search chapters"
      >
        <Search className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-56 cursor-pointer items-center gap-2 rounded-md border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground lg:inline-flex"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span className="flex-1 text-left">Search chapters...</span>
        <kbd className="rounded border border-border bg-background px-1.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>
    </>
  );

  const renderSuggestions = () => (
    <div className="p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Try searching
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setQuery(suggestion);
              setActiveIndex(0);
              inputRef.current?.focus();
            }}
            className="cursor-pointer rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );

  const renderMessage = (message: string) => (
    <p className="px-4 py-10 text-center text-sm text-muted-foreground">{message}</p>
  );

  const renderHits = () => (
    <ul id="search-results" role="listbox" aria-label="Search results" className="max-h-[60vh] overflow-y-auto p-2">
      {hits.map((hit, index) => (
        <li key={hit.href} role="option" aria-selected={index === activeIndex}>
          <button
            type="button"
            onClick={() => go(hit)}
            onMouseEnter={() => setActiveIndex(index)}
            className={cn(
              "flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left",
              index === activeIndex && "bg-muted"
            )}
          >
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">{hit.title}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {hit.courseTitle} · {hit.sectionTitle}
              </span>
            </span>
            {renderEnterHint(index === activeIndex)}
          </button>
        </li>
      ))}
    </ul>
  );

  const renderBody = () => {
    if (status === "error") {
      return renderMessage("Search load nahi ho saka. Page refresh karke dobara try karein.");
    }
    if (status !== "ready") {
      return renderMessage("Loading...");
    }
    if (!query.trim()) {
      return renderSuggestions();
    }
    if (hits.length === 0) {
      return renderMessage(`"${query}" ke liye koi chapter nahi mila.`);
    }

    return renderHits();
  };

  const renderDialog = () => {
    if (!open) {
      return null;
    }

    return createPortal(
      <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
        <button
          type="button"
          className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
          aria-label="Close search"
          onClick={close}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search chapters"
          className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Chapter, topic ya keyword likhein..."
              className="h-14 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              role="combobox"
              aria-expanded={hits.length > 0}
              aria-controls="search-results"
              aria-autocomplete="list"
            />
            <button
              type="button"
              onClick={close}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
              aria-label="Close search"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          {renderBody()}
          <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
            <span>↑↓ select</span>
            <span>Enter open</span>
            <span>Esc close</span>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {renderTrigger()}
      {renderDialog()}
    </>
  );
}

function renderEnterHint(isActive: boolean) {
  if (!isActive) {
    return null;
  }

  return <CornerDownLeft className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />;
}
