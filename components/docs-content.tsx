import { ChevronDown } from "lucide-react";

import { TableOfContents } from "@/components/table-of-contents";
import type { TocHeading } from "@/types/course";
import { cn } from "@/lib/utils";

type DocsContentProps = {
  title: string;
  meta?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  toc: TocHeading[];
  tocLabel: string;
};

export function DocsContent({
  title,
  meta,
  description,
  children,
  toc,
  tocLabel,
}: DocsContentProps) {
  const hasToc = toc.length > 0;

  const renderDescription = () => {
    if (!description) {
      return null;
    }

    return <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>;
  };

  const renderMobileToc = () => {
    if (!hasToc) {
      return null;
    }

    return (
      <details className="group mb-8 rounded-lg border border-border bg-muted/30 xl:hidden [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-foreground">
          {tocLabel}
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="px-4 pb-4">
          <TableOfContents headings={toc} label={tocLabel} />
        </div>
      </details>
    );
  };

  const renderAside = () => {
    if (!hasToc) {
      return null;
    }

    return (
      <aside className="hidden w-48 shrink-0 self-stretch border-l border-border pl-5 xl:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto py-2">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {tocLabel}
          </p>
          <TableOfContents headings={toc} label={tocLabel} />
        </div>
      </aside>
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 lg:pl-8 lg:pr-4">
      <div className="flex w-full flex-col gap-7 xl:w-fit xl:max-w-full xl:flex-row xl:items-stretch xl:gap-10">
        <article className="min-w-0 w-full max-w-4xl">
          <header className="mb-6 pb-2">
            {meta}
            <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {renderDescription()}
          </header>
          {renderMobileToc()}
          <div
            className={cn(
              "docs-prose text-[15px] leading-7 text-foreground/90",
              "[&_h2]:mt-9 [&_h2]:scroll-mt-24 [&_h2]:text-[17px] [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2:first-child]:mt-0",
              "[&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:pl-3 [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-foreground",
              "[&_h2+p]:pl-3 [&_h3+p]:pl-6",
              "[&_p]:my-3.5 [&_strong]:font-semibold [&_strong]:text-foreground",
              "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-foreground/80",
              "[&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-muted/60 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:text-[13px] [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-foreground",
            )}
          >
            {children}
          </div>
        </article>
        {renderAside()}
      </div>
    </div>
  );
}
