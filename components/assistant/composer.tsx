"use client";

import { ArrowUp, Square } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";

import { ASSISTANT_LIMITS } from "@/lib/assistant/limits";

type ComposerLabels = {
  placeholder: string;
  send: string;
  stop: string;
  composerHint: string;
  disclaimer: string;
};

type ComposerProps = {
  isStreaming: boolean;
  labels: ComposerLabels;
  onSend: (text: string) => void;
  onStop: () => void;
};

const MAX_HEIGHT = 220;

function resize(textarea: HTMLTextAreaElement | null) {
  if (!textarea) {
    return;
  }

  textarea.style.height = "auto";
  textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;
}

type ComposerActionProps = {
  isStreaming: boolean;
  canSend: boolean;
  labels: ComposerLabels;
  onSubmit: () => void;
  onStop: () => void;
};

function ComposerAction({ isStreaming, canSend, labels, onSubmit, onStop }: ComposerActionProps) {
  const base =
    "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed";
  if (isStreaming) {
    return (
      <button
        type="button"
        onClick={onStop}
        aria-label={labels.stop}
        title={labels.stop}
        className={`${base} bg-foreground text-background hover:opacity-90`}
      >
        <Square className="h-3.5 w-3.5 fill-current" aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={!canSend}
      aria-label={labels.send}
      title={labels.send}
      className={`${base} bg-accent text-accent-foreground hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground`}
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
    </button>
  );
}

export function Composer(props: ComposerProps) {
  const { isStreaming, labels, onSend } = props;
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && !isStreaming;

  const submit = useCallback(() => {
    if (!canSend) {
      return;
    }

    onSend(value);
    setValue("");
    window.requestAnimationFrame(() => resize(textareaRef.current));
  }, [canSend, onSend, value]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
        return;
      }

      event.preventDefault();
      submit();
    },
    [submit]
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="flex items-end gap-2 rounded-[26px] border border-border bg-card p-2 pl-4 shadow-lg shadow-black/5 transition-colors focus-within:border-accent/60 dark:shadow-black/30">
        <label htmlFor="assistant-input" className="sr-only">
          {labels.placeholder}
        </label>
        <textarea
          id="assistant-input"
          ref={textareaRef}
          rows={1}
          value={value}
          maxLength={ASSISTANT_LIMITS.maxMessageChars}
          placeholder={labels.placeholder}
          aria-describedby="assistant-input-hint"
          onChange={(event) => {
            setValue(event.target.value);
            resize(event.target);
          }}
          onKeyDown={onKeyDown}
          className="max-h-[220px] min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-6 text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none"
        />
        <ComposerAction
          isStreaming={isStreaming}
          canSend={canSend}
          labels={labels}
          onSubmit={submit}
          onStop={props.onStop}
        />
      </div>
      <p id="assistant-input-hint" className="mt-2 text-center text-xs text-muted-foreground">
        <span className="hidden sm:inline">{labels.composerHint} · </span>
        {labels.disclaimer}
      </p>
    </div>
  );
}
