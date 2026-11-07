"use client";

import Link from "next/link";
import { Check, Copy, FileText, RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";

import { MarkdownAnswer } from "@/components/assistant/markdown-answer";
import type { ChatMessage, ClientErrorCode } from "@/lib/assistant/conversations";
import type { AssistantSource } from "@/lib/assistant/types";

export type AssistantMessageLabels = {
  assistantName: string;
  thinking: string;
  sources: string;
  copy: string;
  copied: string;
  retry: string;
  copyCode: string;
  copiedCode: string;
  errors: Record<ClientErrorCode, string>;
};

type AssistantMessageProps = {
  message: ChatMessage;
  isLast: boolean;
  labels: AssistantMessageLabels;
  onRetry: () => void;
};

function renderThinking(message: ChatMessage, label: string) {
  if (message.status !== "streaming" || message.content) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
      <span className="flex gap-1" aria-hidden>
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
      </span>
      {label}
    </div>
  );
}

function renderSources(sources: AssistantSource[], label: string) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {sources.map((source) => (
          <li key={source.id}>
            <Link
              href={source.href}
              className="group inline-flex max-w-72 items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-accent/50"
            >
              <FileText className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
              <span className="truncate font-medium text-foreground">{source.title}</span>
              <span className="shrink-0 text-muted-foreground">{source.courseTitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderError(props: AssistantMessageProps) {
  const { message, isLast, labels, onRetry } = props;
  if (message.status !== "error" || !message.error) {
    return null;
  }

  return (
    <div
      className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm text-rose-700 dark:text-rose-300"
      role="alert"
    >
      <span>{labels.errors[message.error]}</span>
      {renderRetry(isLast, labels.retry, onRetry)}
    </div>
  );
}

function renderRetry(isLast: boolean, label: string, onRetry: () => void) {
  if (!isLast) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md font-semibold underline-offset-2 hover:underline"
    >
      <RotateCcw className="h-3.5 w-3.5" aria-hidden />
      {label}
    </button>
  );
}

function CopyAnswerButton({
  content,
  labels,
}: {
  content: string;
  labels: AssistantMessageLabels;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [content]);
  const label = copied ? labels.copied : labels.copy;
  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}

function renderActions(message: ChatMessage, labels: AssistantMessageLabels) {
  if (message.status !== "done" || !message.content) {
    return null;
  }

  return (
    <div className="mt-2 flex items-center gap-1">
      <CopyAnswerButton content={message.content} labels={labels} />
    </div>
  );
}

function renderContent(message: ChatMessage, labels: AssistantMessageLabels) {
  if (!message.content) {
    return null;
  }

  return (
    <MarkdownAnswer
      content={message.content}
      codeLabels={{ copyCode: labels.copyCode, copied: labels.copiedCode }}
    />
  );
}

export function AssistantMessage(props: AssistantMessageProps) {
  const { message, labels } = props;
  const live = message.status === "streaming" ? "polite" : "off";

  return (
    <article className="flex gap-3 sm:gap-4" aria-label={labels.assistantName}>
      <span
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm"
        aria-hidden
      >
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 pt-1" aria-live={live}>
        {renderThinking(message, labels.thinking)}
        {renderContent(message, labels)}
        {renderError(props)}
        {renderSources(message.sources, labels.sources)}
        {renderActions(message, labels)}
      </div>
    </article>
  );
}
