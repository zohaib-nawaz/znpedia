"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

type MobileDrawerProps = {
  open: boolean;
  closeLabel: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function MobileDrawer({ open, closeLabel, onClose, children }: MobileDrawerProps) {
  const backdropTabIndex = open ? 0 : -1;

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        open && "pointer-events-auto",
        !open && "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={backdropTabIndex}
        aria-label={closeLabel}
        onClick={onClose}
        className={cn(
          "absolute inset-0 cursor-default bg-black/60 transition-opacity",
          open && "opacity-100",
          !open && "opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-[85%] max-w-[300px] shadow-2xl transition-transform duration-200",
          open && "translate-x-0",
          !open && "-translate-x-full"
        )}
        inert={!open}
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-2 top-3.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
