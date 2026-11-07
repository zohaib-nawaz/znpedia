import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteLogo } from "@/components/site-logo";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/ur";
import { localizePath } from "@/lib/i18n/paths";
import { buildFooterGroups } from "@/lib/site-nav";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
  chapterCount: number;
};

export function SiteFooter({ locale, dict, chapterCount }: SiteFooterProps) {
  return (
    <footer className="dark surface-inverse border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <SiteLogo href={localizePath(locale, "/")} />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {dict.footer.tagline(chapterCount)}
          </p>
          <LanguageSwitcher locale={locale} label={dict.nav.language} className="mt-5" />
        </div>
        {buildFooterGroups(locale, dict).map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
            <ul className="mt-3 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} ZnPedia. {dict.footer.rights}
          </p>
          <p>{dict.footer.motto}</p>
        </div>
      </div>
    </footer>
  );
}
