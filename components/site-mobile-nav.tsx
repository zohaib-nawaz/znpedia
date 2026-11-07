"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { NavLink } from "@/lib/site-nav";

type SiteMobileNavProps = {
  links: NavLink[];
  start: NavLink;
  labels: {
    open: string;
    close: string;
  };
};

export function SiteMobileNav({ links, start, labels }: SiteMobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const renderPanel = () => {
    if (!open) {
      return null;
    }

    return createPortal(
      <div id="site-mobile-nav" className="fixed inset-x-0 top-14 bottom-0 z-50 overflow-y-auto bg-background">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={start.href}
            onClick={close}
            className="mt-4 rounded-lg bg-accent px-4 py-3 text-center text-base font-semibold text-accent-foreground"
          >
            {start.label}
          </Link>
        </nav>
      </div>,
      document.body
    );
  };

  const renderIcon = () => {
    if (open) {
      return <X className="h-4 w-4" aria-hidden />;
    }

    return <Menu className="h-4 w-4" aria-hidden />;
  };

  const describe = () => {
    if (open) {
      return labels.close;
    }

    return labels.open;
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground"
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        aria-label={describe()}
      >
        {renderIcon()}
      </button>
      {renderPanel()}
    </div>
  );
}
