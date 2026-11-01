import type { CourseMeta } from "@/types/course";
import { getChapterHref } from "@/lib/docs";
import { ActiveLink } from "@/components/active-link";

type DocsSidebarProps = {
  course: CourseMeta;
  className?: string;
  onNavigate?: () => void;
};

export function DocsSidebar({ course, className, onNavigate }: DocsSidebarProps) {
  return (
    <nav className={className} aria-label={`${course.title} chapters`}>
      <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {course.title}
      </p>
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
                    href={getChapterHref(course.slug, chapter.slug)}
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
