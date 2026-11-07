"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import { requestAnswer } from "@/lib/assistant/client-stream";
import {
  getConversationsSnapshot,
  getServerConversationsSnapshot,
  subscribeConversations,
  updateConversations,
} from "@/lib/assistant/conversation-store";
import {
  createAssistantMessage,
  createConversation,
  createUserMessage,
  titleFromQuestion,
  toTurns,
  type ChatMessage,
  type ClientErrorCode,
  type Conversation,
} from "@/lib/assistant/conversations";
import type { AssistantScope, AssistantStreamEvent } from "@/lib/assistant/types";

type UseAssistantChatInput = {
  locale: string;
  initialScope: AssistantScope;
};

type MessagePatch = Partial<Pick<ChatMessage, "content" | "sources" | "status" | "error">>;

function applyEvent(message: ChatMessage, event: AssistantStreamEvent): MessagePatch {
  if (event.type === "sources") {
    return { sources: event.sources };
  }

  if (event.type === "text") {
    return { content: message.content + event.text };
  }

  if (event.type === "error") {
    return { status: "error", error: event.code };
  }

  return { status: "done" };
}

export function useAssistantChat({ locale, initialScope }: UseAssistantChatInput) {
  const conversations = useSyncExternalStore(
    subscribeConversations,
    () => getConversationsSnapshot(locale),
    getServerConversationsSnapshot
  );
  const setConversations = useCallback(
    (update: (current: Conversation[]) => Conversation[]) => updateConversations(locale, update),
    [locale]
  );
  const [draft, setDraft] = useState<Conversation>(() => createConversation(initialScope));
  const [activeId, setActiveId] = useState<string>(draft.id);
  const [isStreaming, setIsStreaming] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const active = useMemo(() => {
    const found = conversations.find((conversation) => conversation.id === activeId);
    if (found) {
      return found;
    }

    return draft;
  }, [activeId, conversations, draft]);

  const updateConversation = useCallback(
    (id: string, update: (conversation: Conversation) => Conversation) => {
      setConversations((current) =>
        current.map((conversation) => {
          if (conversation.id !== id) {
            return conversation;
          }

          return update(conversation);
        })
      );
    },
    [setConversations]
  );

  const patchMessage = useCallback(
    (conversationId: string, messageId: string, patch: (message: ChatMessage) => MessagePatch) => {
      updateConversation(conversationId, (conversation) => ({
        ...conversation,
        updatedAt: Date.now(),
        messages: conversation.messages.map((message) => {
          if (message.id !== messageId) {
            return message;
          }

          return { ...message, ...patch(message) };
        }),
      }));
    },
    [updateConversation]
  );

  const failMessage = useCallback(
    (conversationId: string, messageId: string, code: ClientErrorCode) => {
      patchMessage(conversationId, messageId, () => ({ status: "error", error: code }));
    },
    [patchMessage]
  );

  const runAnswer = useCallback(
    async (conversation: Conversation, question: string) => {
      const userMessage = createUserMessage(question);
      const answer = createAssistantMessage();
      const turns = [
        ...toTurns(conversation.messages),
        { role: "user" as const, content: question },
      ];
      const next: Conversation = {
        ...conversation,
        title: conversation.title || titleFromQuestion(question),
        messages: [...conversation.messages, userMessage, answer],
        updatedAt: Date.now(),
      };

      setConversations((current) => [next, ...current.filter((item) => item.id !== next.id)]);
      setActiveId(next.id);
      setIsStreaming(true);

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const events = requestAnswer({
          locale,
          scope: conversation.scope,
          messages: turns,
          signal: controller.signal,
        });
        for await (const event of events) {
          patchMessage(next.id, answer.id, (message) => applyEvent(message, event));
        }

        patchMessage(next.id, answer.id, (message) => {
          if (message.status !== "streaming") {
            return {};
          }

          return { status: "done" };
        });
      } catch {
        if (controller.signal.aborted) {
          patchMessage(next.id, answer.id, (message) => {
            if (message.content) {
              return { status: "done" };
            }

            return { status: "error", error: "failed" };
          });
          return;
        }

        failMessage(next.id, answer.id, "network");
      } finally {
        controllerRef.current = null;
        setIsStreaming(false);
      }
    },
    [failMessage, locale, patchMessage, setConversations]
  );

  const send = useCallback(
    (text: string) => {
      const question = text.trim();
      if (!question || isStreaming) {
        return;
      }

      void runAnswer(active, question);
    },
    [active, isStreaming, runAnswer]
  );

  const retry = useCallback(() => {
    const messages = active.messages;
    const question = messages[messages.length - 2];
    if (isStreaming || !question || question.role !== "user") {
      return;
    }

    void runAnswer({ ...active, messages: messages.slice(0, -2) }, question.content);
  }, [active, isStreaming, runAnswer]);

  const stop = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  const newChat = useCallback(() => {
    if (isStreaming) {
      return;
    }

    const fresh = createConversation(active.scope);
    setDraft(fresh);
    setActiveId(fresh.id);
  }, [active.scope, isStreaming]);

  const selectChat = useCallback(
    (id: string) => {
      if (isStreaming) {
        return;
      }

      setActiveId(id);
    },
    [isStreaming]
  );

  const deleteChat = useCallback(
    (id: string) => {
      if (isStreaming) {
        return;
      }

      setConversations((current) => current.filter((conversation) => conversation.id !== id));
      if (id === activeId) {
        const fresh = createConversation(active.scope);
        setDraft(fresh);
        setActiveId(fresh.id);
      }
    },
    [active.scope, activeId, isStreaming, setConversations]
  );

  const setScope = useCallback(
    (scope: AssistantScope) => {
      if (active.id === draft.id) {
        setDraft((current) => ({ ...current, scope }));
        return;
      }

      updateConversation(active.id, (conversation) => ({ ...conversation, scope }));
    },
    [active.id, draft.id, updateConversation]
  );

  return {
    conversations,
    active,
    isStreaming,
    send,
    retry,
    stop,
    newChat,
    selectChat,
    deleteChat,
    setScope,
  };
}
