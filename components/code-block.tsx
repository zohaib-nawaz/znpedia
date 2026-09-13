"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type CodeBlockProps = React.ComponentPropsWithoutRef<"pre">;

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const code = preRef.current?.querySelector("code");
    const text = code?.textContent ?? preRef.current?.textContent ?? "";
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group relative my-5">
      <button
        type="button"
        onClick={onCopy}
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
      </button>
      <pre
        ref={preRef}
        className={`overflow-x-auto rounded-md bg-muted/40 p-4 pl-5 text-[14px] leading-relaxed text-foreground/90 [tab-size:2] ${className ?? ""}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
