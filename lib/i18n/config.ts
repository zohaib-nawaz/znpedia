export const locales = ["ur", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ur";

export const LOCALE_COOKIE = "NEXT_LOCALE";

type LocaleInfo = {
  label: string;
  shortLabel: string;
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
};

export const localeInfo: Record<Locale, LocaleInfo> = {
  ur: {
    label: "Roman Urdu",
    shortLabel: "UR",
    htmlLang: "ur-Latn",
    hreflang: "ur",
    ogLocale: "ur_PK",
  },
  en: {
    label: "English",
    shortLabel: "EN",
    htmlLang: "en",
    hreflang: "en",
    ogLocale: "en_US",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
