import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";
import type { CourseMeta } from "@/types/course";

type DocsHeaderProps = {
  course: CourseMeta;
};

export function DocsHeader({ course }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-12 items-center gap-2 px-3 sm:px-5 lg:px-6">
        <MobileSidebar course={course} />
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            href="/courses"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Courses
          </Link>
          <span className="hidden text-muted-foreground sm:inline">/</span>
          <span className="truncate text-sm font-medium text-foreground">
            {course.title}
          </span>
        </div>
        <div className="relative hidden max-w-xs flex-1 md:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search docs…"
            disabled
            aria-label="Search documentation (coming soon)"
            className="h-8 w-full rounded-md border border-border bg-muted/30 pl-8 pr-2 text-[13px] text-muted-foreground placeholder:text-muted-foreground/70"
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
