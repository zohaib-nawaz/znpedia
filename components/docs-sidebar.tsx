import type { CourseMeta } from "@/types/course";
import { slugToTitle } from "@/lib/utils";
import { ActiveLink } from "@/components/active-link";

type DocsSidebarProps = {
  course: CourseMeta;
  className?: string;
  onNavigate?: () => void;
};

export function DocsSidebar({ course, className, onNavigate }: DocsSidebarProps) {
  const base = `/courses/${course.slug}`;

  return (
    <nav className={className} aria-label={`${course.title} chapters`}>
      <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {course.title}
      </p>
      <ul className="ml-2 space-y-0.5 border-l border-border pl-2">
        {course.chapters.map((chapter) => {
          const href = `${base}/${chapter}`;
          return (
            <li key={chapter}>
              <ActiveLink
                href={href}
                onClick={onNavigate}
                className="block rounded-md px-2 py-2 text-[14px] leading-snug text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeClassName="bg-muted font-medium text-foreground"
              >
                {slugToTitle(chapter)}
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
