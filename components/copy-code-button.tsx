"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

export type CopyCodeLabels = {
  copyCode: string;
  copied: string;
};

type CopyCodeButtonProps = {
  code: string;
  labels: CopyCodeLabels;
};

function renderIcon(copied: boolean) {
  if (copied) {
    return <Check className="h-4 w-4" aria-hidden />;
  }

  return <Copy className="h-4 w-4" aria-hidden />;
}

export function CopyCodeButton({ code, labels }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  const label = copied ? labels.copied : labels.copyCode;

  return (
    <button
      type="button"
      onClick={onCopy}
      disabled={!code}
      className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
      aria-label={label}
    >
      {renderIcon(copied)}
    </button>
  );
}
