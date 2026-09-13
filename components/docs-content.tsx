import { docsConfig } from "@/lib/docs-config";
import type { TocHeading } from "@/types/course";
import { cn } from "@/lib/utils";

type DocsContentProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  toc: TocHeading[];
};

export function DocsContent({
  title,
  description,
  children,
  toc,
}: DocsContentProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 lg:pl-8 lg:pr-4">
      <div className="flex w-full flex-col gap-7 xl:w-fit xl:max-w-full xl:flex-row xl:items-stretch xl:gap-10">
      <article className="min-w-0 w-full max-w-4xl">
        <header className="mb-6 pb-2">
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </header>
        <div
          className={cn(
            "docs-prose text-[15px] leading-7 text-foreground/90",
            "[&_h2]:mt-9 [&_h2]:scroll-mt-24 [&_h2]:text-[17px] [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2:first-child]:mt-0",
            "[&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:pl-3 [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-foreground",
            "[&_h2+p]:pl-3 [&_h3+p]:pl-6",
            "[&_p]:my-3.5 [&_strong]:font-semibold [&_strong]:text-foreground",
            "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-foreground/80",
            "[&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-muted/60 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:text-[13px] [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-foreground",
            "[&_figure[data-rehype-pretty-code-figure]]:my-0 [&_pre]:my-0 [&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-0"
          )}
        >
          {children}
        </div>
      </article>
      {toc.length > 0 ? (
        <aside
          className="hidden w-40 shrink-0 self-stretch border-l border-border pl-4 min-h-[calc(100vh-3rem)] xl:block xl:w-44"
          aria-label="On this page"
        >
          <div className="sticky top-16 py-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {docsConfig.toc.label}
            </p>
            <ul className="max-h-[calc(100vh-5rem)] space-y-2 overflow-y-auto pl-0 text-[13px] leading-relaxed">
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      ) : null}
      </div>
    </div>
  );
}
