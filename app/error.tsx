"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main id="main-content" className="flex flex-1 items-center">
      <div className="mx-auto w-full max-w-xl px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-sm font-semibold text-accent">Error</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Kuch ghalat ho gaya
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Yeh page abhi load nahi ho saka. Dobara try karein, ya home par wapas jayein.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Dobara try karein
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
