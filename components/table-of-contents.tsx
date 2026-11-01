"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "@/types/course";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: TocHeading[];
  label: string;
};

const ACTIVATION_OFFSET = 120;

function pickActive(elements: HTMLElement[]): string | null {
  const passed = elements.filter(
    (element) => element.getBoundingClientRect().top <= ACTIVATION_OFFSET
  );
  if (passed.length === 0) {
    return elements[0]?.id ?? null;
  }

  return passed[passed.length - 1].id;
}

function useActiveHeading(idList: string): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = idList
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) {
      return;
    }

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActiveId(pickActive(elements)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [idList]);

  return activeId;
}

function currentMarker(isActive: boolean): "location" | undefined {
  if (!isActive) {
    return undefined;
  }

  return "location";
}

export function TableOfContents({ headings, label }: TableOfContentsProps) {
  const activeId = useActiveHeading(headings.map((heading) => heading.id).join(" "));

  return (
    <nav aria-label={label}>
      <ul className="space-y-1 border-l border-border text-[13px] leading-relaxed">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={currentMarker(heading.id === activeId)}
              className={cn(
                "-ml-px block border-l-2 border-transparent py-1 pl-3 text-muted-foreground transition-colors duration-200 hover:text-foreground",
                heading.id === activeId && "border-accent font-medium text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
