"use client";

import { useCallback, useState } from "react";

import type { SearchEntry } from "@/lib/search";

let cachedIndex: Promise<SearchEntry[]> | null = null;

function fetchIndex(): Promise<SearchEntry[]> {
  if (!cachedIndex) {
    cachedIndex = fetch("/search-index.json").then((response) => {
      if (!response.ok) {
        cachedIndex = null;
        throw new Error(`Search index failed with ${response.status}`);
      }

      return response.json() as Promise<SearchEntry[]>;
    });
  }

  return cachedIndex;
}

export function useSearchIndex() {
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const load = useCallback(() => {
    if (status === "loading" || status === "ready") {
      return;
    }

    setStatus("loading");
    fetchIndex()
      .then((index) => {
        setEntries(index);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [status]);

  return { entries, status, load };
}
