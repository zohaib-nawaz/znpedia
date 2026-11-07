import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { SearchDialog } from "@/components/search/search-dialog";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCourseHref } from "@/lib/docs";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/ur";
import { localizePath } from "@/lib/i18n/paths";
import type { CourseMeta } from "@/types/course";

type DocsHeaderProps = {
  course: CourseMeta;
  locale: Locale;
  dict: Dictionary;
};

export function DocsHeader({ course, locale, dict }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex h-14 items-center gap-3 px-3 sm:px-5 lg:px-6">
        <MobileSidebar
          course={course}
          locale={locale}
          labels={{
            menu: dict.nav.menu,
            close: dict.nav.closeMenu,
            overview: dict.nav.courseOverview,
          }}
        />
        <div className="hidden sm:block">
          <SiteLogo href={localizePath(locale, "/")} />
        </div>
        <span className="hidden h-5 w-px bg-border sm:block" aria-hidden />
        <Link
          href={getCourseHref(locale, course.slug)}
          className="min-w-0 truncate text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
        >
          {course.title}
        </Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          <Link
            href={localizePath(locale, "/courses")}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {dict.nav.courses}
          </Link>
          <Link
            href={localizePath(locale, "/about")}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {dict.nav.about}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <SearchDialog locale={locale} labels={dict.search} />
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
          <ThemeToggle labels={dict.theme} />
        </div>
      </div>
    </header>
  );
}
