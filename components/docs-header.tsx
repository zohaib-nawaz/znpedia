import Link from "next/link";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import type { CourseMeta } from "@/types/course";

type DocsHeaderProps = {
  course: CourseMeta;
};

export function DocsHeader({ course }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex h-14 items-center gap-3 px-3 sm:px-5 lg:px-6">
        <MobileSidebar course={course} />
        <div className="hidden sm:block">
          <SiteLogo />
        </div>
        <span className="hidden h-5 w-px bg-border sm:block" aria-hidden />
        <Link
          href={`/courses/${course.slug}`}
          className="min-w-0 truncate text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
        >
          {course.title}
        </Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          <Link
            href="/courses"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Courses
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            About
          </Link>
        </nav>
        <div className="ml-auto md:ml-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
