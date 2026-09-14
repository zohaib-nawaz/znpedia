"use client";

import { useMemo } from "react";

import { normalizeSyntaxLanguage } from "@/lib/syntax/language";
import { highlightTokens } from "@/lib/syntax/tokenize";

type SyntaxHighlightedCodeProps = {
  code: string;
  language?: string | null;
};

export function SyntaxHighlightedCode({
  code,
  language,
}: SyntaxHighlightedCodeProps) {
  const normalized = normalizeSyntaxLanguage(language);
  const tokens = useMemo(
    () => highlightTokens(code, normalized),
    [code, normalized],
  );

  return (
    <code className="syntax-highlighted" data-language={normalized}>
      {tokens.map((token, index) =>
        token.kind ? (
          <span
            className={`syntax-${token.kind}`}
            key={`${index}-${token.kind}`}
          >
            {token.text}
          </span>
        ) : (
          token.text
        ),
      )}
    </code>
  );
}
