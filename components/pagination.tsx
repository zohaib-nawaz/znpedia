import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { AdjacentChapter } from "@/types/course";

type PaginationProps = {
  previous: AdjacentChapter;
  next: AdjacentChapter;
};

export function Pagination({ previous, next }: PaginationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      className="mt-6 grid gap-3 pt-2 sm:grid-cols-2"
      aria-label="Chapter navigation"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group flex flex-col rounded-md bg-muted/25 p-3 transition-colors hover:bg-muted/40"
        >
          <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            <ChevronLeft className="h-3 w-3" aria-hidden />
            Previous
          </span>
          <span className="mt-1 text-[14px] font-semibold text-foreground">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div aria-hidden />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col rounded-md bg-muted/25 p-3 text-right transition-colors hover:bg-muted/40 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Next
            <ChevronRight className="h-3 w-3" aria-hidden />
          </span>
          <span className="mt-1 text-[14px] font-semibold text-foreground">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
