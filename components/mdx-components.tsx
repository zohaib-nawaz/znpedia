import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import type { CopyCodeLabels } from "@/components/copy-code-button";
import { HeadingAnchor } from "@/components/heading-anchor";
import { CompareTable } from "@/components/mdx-compare-table";
import { Flow } from "@/components/mdx-flow";
import { Mistake, type MistakeLabels } from "@/components/mdx-mistake";
import type { Locale } from "@/lib/i18n/config";
import { localizeContentHref } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

export type MdxLabels = MistakeLabels &
  CopyCodeLabels & {
    note: string;
    linkToSection: string;
  };

type AnchorProps = React.ComponentPropsWithoutRef<"a">;

function renderAnchor(locale: Locale, { href, ...props }: AnchorProps) {
  if (!href || !href.startsWith("/")) {
    return <a href={href} {...props} />;
  }

  return <Link href={localizeContentHref(locale, href)} {...props} />;
}

export function getMdxComponents(locale: Locale, labels: MdxLabels): MDXComponents {
  return {
    Callout: (props) => <Callout {...props} fallbackTitle={labels.note} />,
    CompareTable,
    Flow,
    Mistake: (props) => <Mistake {...props} labels={labels} />,
    a: (props) => renderAnchor(locale, props),
    pre: (props) => <CodeBlock {...props} labels={labels} />,
    h2: (props) => <HeadingAnchor as="h2" linkLabel={labels.linkToSection} {...props} />,
    h3: (props) => <HeadingAnchor as="h3" linkLabel={labels.linkToSection} {...props} />,
    table: ({ className, ...props }) => (
      <div className="my-5 overflow-x-auto pl-3">
        <table
          className={cn("w-full min-w-[260px] border-collapse text-[15px]", className)}
          {...props}
        />
      </div>
    ),
    thead: (props) => <thead {...props} />,
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "pb-2.5 pr-5 text-left text-[15px] font-semibold leading-snug text-foreground last:pr-0",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "py-2 pr-5 align-top text-[15px] leading-relaxed text-foreground/90 last:pr-0",
          className,
        )}
        {...props}
      />
    ),
    tr: (props) => <tr className="align-top" {...props} />,
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "my-3.5 list-disc space-y-2 pl-6 text-[15px] leading-relaxed marker:text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "my-3.5 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed marker:text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("pl-0.5 text-foreground/90", className)} {...props} />
    ),
    hr: () => null,
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-5 border-none pl-0 text-[15px] not-italic leading-relaxed text-foreground/90",
          className,
        )}
        {...props}
      />
    ),
  };
}
