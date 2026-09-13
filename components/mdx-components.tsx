import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import { CompareTable } from "@/components/mdx-compare-table";
import { Flow } from "@/components/mdx-flow";
import { Mistake } from "@/components/mdx-mistake";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  Callout,
  CompareTable,
  Flow,
  Mistake,
  pre: (props) => <CodeBlock {...props} />,
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
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "py-2 pr-5 align-top text-[15px] leading-relaxed text-foreground/90 last:pr-0",
        className
      )}
      {...props}
    />
  ),
  tr: (props) => <tr className="align-top" {...props} />,
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-3.5 list-disc space-y-2 pl-6 text-[15px] leading-relaxed marker:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-3.5 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed marker:text-muted-foreground",
        className
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
        className
      )}
      {...props}
    />
  ),
};
