import Link from "next/link";

import { ActiveLink } from "@/components/active-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SearchDialog } from "@/components/search/search-dialog";
import { SiteLogo } from "@/components/site-logo";
import { SiteMobileNav } from "@/components/site-mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/ur";
import { localizePath } from "@/lib/i18n/paths";
import { buildPrimaryNav } from "@/lib/site-nav";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const links = buildPrimaryNav(locale, dict.nav);
  const start = {
    label: dict.nav.startLearning,
    href: localizePath(locale, "/courses/javascript/introduction"),
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <SiteLogo href={localizePath(locale, "/")} />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <ActiveLink
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                activeClassName="font-medium text-foreground"
              >
                {link.label}
              </ActiveLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <SearchDialog locale={locale} labels={dict.search} />
          <Link
            href={start.href}
            className="hidden rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90 xl:inline-flex"
          >
            {start.label}
          </Link>
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
          <ThemeToggle labels={dict.theme} />
          <SiteMobileNav
            links={links}
            start={start}
            labels={{ open: dict.nav.openMenu, close: dict.nav.closeMenu }}
          />
        </div>
      </div>
    </header>
  );
}
