"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALE_COOKIE, localeInfo, locales, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  className?: string;
};

function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}

function currentMarker(isCurrent: boolean): "page" | undefined {
  if (!isCurrent) {
    return undefined;
  }

  return "page";
}

export function LanguageSwitcher({ locale, label, className }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className={cn("inline-flex h-9 items-center rounded-md border border-border p-0.5", className)}
    >
      {locales.map((target) => {
        const isCurrent = target === locale;

        return (
          <Link
            key={target}
            href={switchLocalePath(pathname, target)}
            hrefLang={localeInfo[target].hreflang}
            lang={localeInfo[target].htmlLang}
            onClick={() => rememberLocale(target)}
            aria-current={currentMarker(isCurrent)}
            title={localeInfo[target].label}
            className={cn(
              "inline-flex h-full items-center rounded px-2 text-xs font-semibold transition-colors duration-200",
              isCurrent && "bg-foreground text-background",
              !isCurrent && "text-muted-foreground hover:text-foreground"
            )}
          >
            {localeInfo[target].shortLabel}
          </Link>
        );
      })}
    </nav>
  );
}
