"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { DocsSidebar } from "@/components/docs-sidebar";
import type { CourseMeta } from "@/types/course";

type MobileSidebarProps = {
  course: CourseMeta;
};

export function MobileSidebar({ course }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground"
        aria-expanded={open}
        aria-controls="mobile-docs-sidebar"
      >
        <Menu className="h-4 w-4" aria-hidden />
        Menu
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-50 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside
            id="mobile-docs-sidebar"
            className="fixed inset-y-0 left-0 z-50 flex w-[min(100%,280px)] flex-col border-r border-border bg-background shadow-lg"
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <span className="text-sm font-semibold">{course.title}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <DocsSidebar course={course} onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
