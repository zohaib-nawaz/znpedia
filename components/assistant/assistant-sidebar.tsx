"use client";

import Link from "next/link";
import { ArrowLeft, Info, MessageSquare, SquarePen, Trash2 } from "lucide-react";

import type { Conversation } from "@/lib/assistant/conversations";
import { cn } from "@/lib/utils";

type SidebarLabels = {
  newChat: string;
  history: string;
  emptyHistory: string;
  deleteChat: string;
  backToSite: string;
  howItWorks: string;
};

type AssistantSidebarProps = {
  conversations: Conversation[];
  activeId: string;
  homeHref: string;
  disabled: boolean;
  labels: SidebarLabels;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onShowHowItWorks: () => void;
};

function renderHistory(props: AssistantSidebarProps) {
  const { conversations, activeId, disabled, labels, onSelect, onDelete } = props;
  if (conversations.length === 0) {
    return <p className="px-3 py-2 text-sm leading-relaxed text-zinc-500">{labels.emptyHistory}</p>;
  }

  return (
    <ul className="space-y-0.5">
      {conversations.map((conversation) => (
        <li key={conversation.id} className="group relative">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect(conversation.id)}
            aria-current={conversation.id === activeId}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2.5 rounded-lg py-2 pl-3 pr-9 text-left text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed",
              conversation.id === activeId && "bg-white/10 text-white"
            )}
          >
            <MessageSquare className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            <span className="truncate">{conversation.title}</span>
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onDelete(conversation.id)}
            aria-label={`${labels.deleteChat}: ${conversation.title}`}
            className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-zinc-500 opacity-100 transition-opacity hover:bg-white/10 hover:text-rose-300 focus-visible:opacity-100 disabled:cursor-not-allowed sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function AssistantSidebar(props: AssistantSidebarProps) {
  const { homeHref, disabled, labels, onNewChat, onShowHowItWorks } = props;

  return (
    <div className="dark flex h-full flex-col bg-zinc-950 text-zinc-100">
      <div className="flex items-center gap-2 p-3">
        <Link
          href={homeHref}
          className="flex h-9 flex-1 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-[13px] font-bold text-accent-foreground"
            aria-hidden
          >
            Zn
          </span>
          ZnPedia
        </Link>
      </div>
      <div className="px-3">
        <button
          type="button"
          onClick={onNewChat}
          disabled={disabled}
          className="flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 px-3 text-sm font-medium text-white transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SquarePen className="h-4 w-4" aria-hidden />
          {labels.newChat}
        </button>
      </div>
      <nav aria-label={labels.history} className="mt-5 min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {labels.history}
        </p>
        {renderHistory(props)}
      </nav>
      <div className="space-y-0.5 border-t border-white/10 p-3">
        <button
          type="button"
          onClick={onShowHowItWorks}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Info className="h-4 w-4" aria-hidden />
          {labels.howItWorks}
        </button>
        <Link
          href={homeHref}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {labels.backToSite}
        </Link>
      </div>
    </div>
  );
}
