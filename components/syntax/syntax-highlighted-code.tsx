import { normalizeSyntaxLanguage } from "@/lib/syntax/language";
import { highlightTokens, type SyntaxToken } from "@/lib/syntax/tokenize";

type SyntaxHighlightedCodeProps = {
  code: string;
  language?: string | null;
};

function renderToken(token: SyntaxToken, index: number) {
  if (!token.kind) {
    return token.text;
  }

  return (
    <span className={`syntax-${token.kind}`} key={`${index}-${token.kind}`}>
      {token.text}
    </span>
  );
}

export function SyntaxHighlightedCode({ code, language }: SyntaxHighlightedCodeProps) {
  const normalized = normalizeSyntaxLanguage(language);
  const tokens = highlightTokens(code, normalized);

  return (
    <code className="syntax-highlighted" data-language={normalized}>
      {tokens.map(renderToken)}
    </code>
  );
}
