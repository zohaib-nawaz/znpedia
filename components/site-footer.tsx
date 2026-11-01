import Link from "next/link";

import { SiteLogo } from "@/components/site-logo";
import { footerGroups } from "@/lib/site-nav";

type SiteFooterProps = {
  chapterCount: number;
};

export function SiteFooter({ chapterCount }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <SiteLogo />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            JavaScript, React, Next.js aur best practices, Roman Urdu mein.{" "}
            {chapterCount} chhote chapters, bilkul free.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
            <ul className="mt-3 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} ZnPedia. Free learning for every developer.</p>
          <p>Roman Urdu mein web development</p>
        </div>
      </div>
    </footer>
  );
}
