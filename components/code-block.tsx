"use client";

import { Check, Copy } from "lucide-react";
import {
  Children,
  isValidElement,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { SyntaxHighlightedCode } from "@/components/syntax/syntax-highlighted-code";
import { displayLanguageLabel } from "@/lib/syntax/language";

type CodeBlockProps = React.ComponentPropsWithoutRef<"pre">;

function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return "";
}

function getLanguage(className?: string): string | null {
  if (!className) return null;
  const match = className.match(/language-([\w-]+)/);
  return match?.[1] ?? null;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const { code, language } = useMemo(() => {
    const child = Children.toArray(children)[0];
    let lang = getLanguage(className);
    let text = "";

    if (isValidElement<{ className?: string; children?: ReactNode }>(child)) {
      lang = lang ?? getLanguage(child.props.className);
      text = getNodeText(child.props.children);
    } else {
      text = getNodeText(children);
    }

    if (text.endsWith("\n")) text = text.slice(0, -1);
    return { code: text, language: lang };
  }, [children, className]);

  const [copied, setCopied] = useState(false);
  const label = displayLanguageLabel(language);

  const onCopy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard can fail in insecure contexts */
    }
  }, [code]);

  return (
    <div className="group relative my-5 overflow-hidden rounded-md border border-border bg-muted/40">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <button
          type="button"
          onClick={onCopy}
          disabled={!code}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>
      <pre
        className="m-0 overflow-x-auto p-4 font-mono text-[14px] leading-relaxed [tab-size:2]"
        {...props}
      >
        <SyntaxHighlightedCode code={code} language={language} />
      </pre>
    </div>
  );
}
