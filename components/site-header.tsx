import Link from "next/link";

import { ActiveLink } from "@/components/active-link";
import { SearchDialog } from "@/components/search/search-dialog";
import { SiteLogo } from "@/components/site-logo";
import { SiteMobileNav } from "@/components/site-mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNav } from "@/lib/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <SiteLogo />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {primaryNav.map((link) => (
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
          <SearchDialog />
          <Link
            href="/courses/javascript/introduction"
            className="hidden rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-accent-foreground transition-opacity duration-200 hover:opacity-90 xl:inline-flex"
          >
            Start learning
          </Link>
          <ThemeToggle />
          <SiteMobileNav links={primaryNav} />
        </div>
      </div>
    </header>
  );
}
