"use client";

import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "@/components/code-block";
import type { CopyCodeLabels } from "@/components/copy-code-button";

type MarkdownAnswerProps = {
  content: string;
  codeLabels: CopyCodeLabels;
};

const PROSE =
  "min-w-0 text-[15px] leading-7 text-foreground/90 [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:marker:text-muted-foreground [&_table]:my-4 [&_table]:w-full [&_table]:text-sm [&_th]:border-b [&_th]:border-border [&_th]:py-1.5 [&_th]:pr-4 [&_th]:text-left [&_td]:border-b [&_td]:border-border/60 [&_td]:py-1.5 [&_td]:pr-4 [&_blockquote]:border-l-2 [&_blockquote]:border-accent/50 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground";

const LINK_CLASS =
  "font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

function renderLink({ href, children }: React.ComponentPropsWithoutRef<"a">) {
  if (href && href.startsWith("/")) {
    return (
      <Link href={href} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={LINK_CLASS} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function renderInlineCode({ className, children }: React.ComponentPropsWithoutRef<"code">) {
  if (className) {
    return <code className={className}>{children}</code>;
  }

  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
      {children}
    </code>
  );
}

function buildComponents(codeLabels: CopyCodeLabels): Components {
  return {
    a: renderLink,
    code: renderInlineCode,
    pre: ({ children, className }) => (
      <CodeBlock className={className} labels={codeLabels}>
        {children}
      </CodeBlock>
    ),
  };
}

export function MarkdownAnswer({ content, codeLabels }: MarkdownAnswerProps) {
  return (
    <div className={PROSE}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(codeLabels)}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
