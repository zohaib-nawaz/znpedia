import { CopyCodeButton, type CopyCodeLabels } from "@/components/copy-code-button";
import { SyntaxHighlightedCode } from "@/components/syntax/syntax-highlighted-code";
import { extractCode } from "@/lib/syntax/extract-code";
import { displayLanguageLabel } from "@/lib/syntax/language";

type CodeBlockProps = React.ComponentPropsWithoutRef<"pre"> & {
  labels: CopyCodeLabels;
};

export function CodeBlock({ children, className, labels, ...props }: CodeBlockProps) {
  const { code, language } = extractCode(children, className);

  return (
    <div className="group relative my-5 overflow-hidden rounded-md border border-border bg-muted/40">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {displayLanguageLabel(language)}
        </span>
        <CopyCodeButton code={code} labels={labels} />
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
