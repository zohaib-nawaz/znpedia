"use client";

import { Menu, SquarePen } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { AssistantMessage } from "@/components/assistant/assistant-message";
import { AssistantSidebar } from "@/components/assistant/assistant-sidebar";
import { Composer } from "@/components/assistant/composer";
import { EmptyState } from "@/components/assistant/empty-state";
import { HowItWorksDialog } from "@/components/assistant/how-it-works-dialog";
import { MobileDrawer } from "@/components/assistant/mobile-drawer";
import { ScopePicker } from "@/components/assistant/scope-picker";
import { useAssistantChat } from "@/components/assistant/use-assistant-chat";
import { UserMessage } from "@/components/assistant/user-message";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { ChatMessage } from "@/lib/assistant/conversations";
import { pickSuggestions, resolveScope } from "@/lib/assistant/scope";
import type { AssistantScope, ScopeCourse } from "@/lib/assistant/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/ur";

type AssistantAppProps = {
  locale: Locale;
  courses: ScopeCourse[];
  initialScope: AssistantScope;
  homeHref: string;
  labels: Dictionary["assistant"];
  codeLabels: { copyCode: string; copied: string };
  themeLabels: Dictionary["theme"];
  languageLabel: string;
};

function useAutoScroll(dependency: unknown) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [dependency]);

  return endRef;
}

function scopeName(courses: ScopeCourse[], scope: AssistantScope): string | null {
  const resolved = resolveScope(courses, scope);
  if (!resolved.course) {
    return null;
  }

  if (!resolved.chapterTitle) {
    return resolved.course.title;
  }

  return `${resolved.course.title} › ${resolved.chapterTitle}`;
}

export function AssistantApp(props: AssistantAppProps) {
  const { locale, courses, initialScope, homeHref, labels, codeLabels } = props;
  const chat = useAssistantChat({ locale, initialScope });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const messages = chat.active.messages;
  const lastMessage = messages[messages.length - 1];
  const endRef = useAutoScroll(`${messages.length}:${lastMessage?.content.length}`);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const closeSidebarAnd = useCallback((action: () => void) => {
    action();
    setSidebarOpen(false);
  }, []);

  const messageLabels = {
    ...labels,
    copyCode: codeLabels.copyCode,
    copiedCode: codeLabels.copied,
  };

  function renderMessage(message: ChatMessage, index: number) {
    if (message.role === "user") {
      return <UserMessage key={message.id} content={message.content} label={labels.you} />;
    }

    return (
      <AssistantMessage
        key={message.id}
        message={message}
        isLast={index === messages.length - 1}
        labels={messageLabels}
        onRetry={chat.retry}
      />
    );
  }

  function renderThread() {
    if (messages.length === 0) {
      return (
        <EmptyState
          greeting={labels.greeting}
          body={labels.greetingBody}
          scopeName={scopeName(courses, chat.active.scope)}
          suggestions={pickSuggestions(
            labels.suggestions,
            resolveScope(courses, chat.active.scope)
          )}
          disabled={chat.isStreaming}
          onPick={chat.send}
        />
      );
    }

    return (
      <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6">
        {messages.map(renderMessage)}
        <div ref={endRef} />
      </div>
    );
  }

  const sidebar = (
    <AssistantSidebar
      conversations={chat.conversations}
      activeId={chat.active.id}
      homeHref={homeHref}
      disabled={chat.isStreaming}
      labels={labels}
      onNewChat={() => closeSidebarAnd(chat.newChat)}
      onSelect={(id) => closeSidebarAnd(() => chat.selectChat(id))}
      onDelete={chat.deleteChat}
      onShowHowItWorks={() => closeSidebarAnd(() => dialogRef.current?.showModal())}
    />
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside className="hidden w-[272px] shrink-0 md:block">{sidebar}</aside>
      <MobileDrawer open={sidebarOpen} closeLabel={labels.closeSidebar} onClose={closeSidebar}>
        {sidebar}
      </MobileDrawer>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3 sm:px-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label={labels.openSidebar}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
          <ScopePicker
            courses={courses}
            scope={chat.active.scope}
            disabled={chat.isStreaming}
            labels={labels}
            onChange={chat.setScope}
          />
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={chat.newChat}
              disabled={chat.isStreaming}
              aria-label={labels.newChat}
              title={labels.newChat}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
            >
              <SquarePen className="h-4 w-4" aria-hidden />
            </button>
            <div className="hidden sm:block">
              <LanguageSwitcher locale={locale} label={props.languageLabel} />
            </div>
            <ThemeToggle labels={props.themeLabels} />
          </div>
        </header>
        <main id="main-content" className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <h1 className="sr-only">{labels.title}</h1>
          {renderThread()}
        </main>
        <Composer
          isStreaming={chat.isStreaming}
          labels={labels}
          onSend={chat.send}
          onStop={chat.stop}
        />
      </div>
      <HowItWorksDialog labels={labels} dialogRef={dialogRef} />
    </div>
  );
}
