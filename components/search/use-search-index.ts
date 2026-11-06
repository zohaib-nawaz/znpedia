"use client";

import { useCallback, useState } from "react";

import type { Locale } from "@/lib/i18n/config";
import type { SearchEntry } from "@/lib/search";

const cachedIndexes = new Map<Locale, Promise<SearchEntry[]>>();

function fetchIndex(locale: Locale): Promise<SearchEntry[]> {
  const cached = cachedIndexes.get(locale);
  if (cached) {
    return cached;
  }

  const request = fetch(`/${locale}/search-index.json`).then((response) => {
    if (!response.ok) {
      cachedIndexes.delete(locale);
      throw new Error(`Search index failed with ${response.status}`);
    }

    return response.json() as Promise<SearchEntry[]>;
  });
  cachedIndexes.set(locale, request);

  return request;
}

export function useSearchIndex(locale: Locale) {
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const load = useCallback(() => {
    if (status === "loading" || status === "ready") {
      return;
    }

    setStatus("loading");
    fetchIndex(locale)
      .then((index) => {
        setEntries(index);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [status, locale]);

  return { entries, status, load };
}
