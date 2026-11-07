import { Children, isValidElement, type ReactNode } from "react";

export type ExtractedCode = {
  code: string;
  language: string | null;
};

function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

function getLanguage(className?: string): string | null {
  if (!className) {
    return null;
  }

  const match = className.match(/language-([\w-]+)/);
  return match?.[1] ?? null;
}

function trimTrailingNewline(code: string): string {
  if (code.endsWith("\n")) {
    return code.slice(0, -1);
  }

  return code;
}

export function extractCode(children: ReactNode, className?: string): ExtractedCode {
  const child = Children.toArray(children)[0];
  const ownLanguage = getLanguage(className);

  if (isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    return {
      code: trimTrailingNewline(getNodeText(child.props.children)),
      language: ownLanguage ?? getLanguage(child.props.className),
    };
  }

  return { code: trimTrailingNewline(getNodeText(children)), language: ownLanguage };
}
