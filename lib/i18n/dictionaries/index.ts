import "server-only";

import type { Locale } from "@/lib/i18n/config";
import en from "@/lib/i18n/dictionaries/en";
import ur, { type Dictionary } from "@/lib/i18n/dictionaries/ur";

const dictionaries: Record<Locale, Dictionary> = { ur, en };

export type { Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
