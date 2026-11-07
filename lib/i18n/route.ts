import "server-only";

import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

export type LocaleParams = Promise<{ lang: string }>;

export type LocaleContext = {
  locale: Locale;
  dict: Dictionary;
};

export async function resolveLocale(params: Promise<{ lang: string }>): Promise<LocaleContext> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  return { locale: lang, dict: getDictionary(lang) };
}
