import type { CourseMeta } from "@/types/course";
import { getChapterHref, getCourseHref } from "@/lib/docs";
import type { Locale } from "@/lib/i18n/config";
import { ActiveLink } from "@/components/active-link";

type DocsSidebarProps = {
  course: CourseMeta;
  locale: Locale;
  overviewLabel: string;
  className?: string;
  onNavigate?: () => void;
};

export function DocsSidebar({
  course,
  locale,
  overviewLabel,
  className,
  onNavigate,
}: DocsSidebarProps) {
  return (
    <nav className={className} aria-label={`${course.title} chapters`}>
      <ActiveLink
        href={getCourseHref(locale, course.slug)}
        onClick={onNavigate}
        className="mb-4 block rounded-md px-2 py-1.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        activeClassName="bg-muted text-foreground"
      >
        {overviewLabel}
      </ActiveLink>
      <div className="space-y-5">
        {course.sections.map((section) => (
          <div key={section.title}>
            <p className="mb-1.5 px-2 text-[12px] font-semibold text-foreground">
              {section.title}
            </p>
            <ul className="ml-2 space-y-0.5 border-l border-border pl-2">
              {section.chapters.map((chapter) => (
                <li key={chapter.slug}>
                  <ActiveLink
                    href={getChapterHref(course.slug, chapter.slug, locale)}
                    onClick={onNavigate}
                    className="block rounded-md px-2 py-1.5 text-[13.5px] leading-snug text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    activeClassName="bg-muted font-medium text-foreground"
                  >
                    {chapter.title}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
