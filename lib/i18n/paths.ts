import { defaultLocale, isLocale, localeInfo, locales, type Locale } from "@/lib/i18n/config";

export function localizePath(locale: Locale, path: string): string {
  if (path === "/" || path === "") {
    return `/${locale}`;
  }
  if (path.startsWith("/#")) {
    return `/${locale}${path.slice(1)}`;
  }

  return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (!first || !isLocale(first)) {
    return { locale: defaultLocale, path: pathname || "/" };
  }

  return { locale: first, path: `/${rest.join("/")}` };
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return localizePath(target, splitLocale(pathname).path);
}

export function localizeContentHref(locale: Locale, href: string): string {
  if (!href.startsWith("/courses")) {
    return href;
  }

  return localizePath(locale, href);
}

export function buildLanguageAlternates(
  path: string,
  available: readonly Locale[] = locales
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of available) {
    languages[localeInfo[locale].hreflang] = localizePath(locale, path);
  }
  languages["x-default"] = localizePath(defaultLocale, path);

  return languages;
}
