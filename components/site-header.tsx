import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

type SiteHeaderProps = {
  showCoursesLink?: boolean;
};

export function SiteHeader({ showCoursesLink = true }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1 text-lg font-semibold tracking-tight">
            <span className="text-foreground">Zn</span>
            <span className="text-accent">Pedia</span>
          </Link>
          {showCoursesLink ? (
            <Link
              href="/courses"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
            >
              Courses
            </Link>
          ) : null}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
