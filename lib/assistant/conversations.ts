import type {
  AssistantErrorCode,
  AssistantScope,
  AssistantSource,
  AssistantTurn,
} from "@/lib/assistant/types";

export type ClientErrorCode = AssistantErrorCode | "network";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources: AssistantSource[];
  status: "streaming" | "done" | "error";
  error?: ClientErrorCode;
};

export type Conversation = {
  id: string;
  title: string;
  scope: AssistantScope;
  messages: ChatMessage[];
  updatedAt: number;
};

const MAX_CONVERSATIONS = 30;
const TITLE_LENGTH = 60;

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createConversation(scope: AssistantScope): Conversation {
  return { id: createId(), title: "", scope, messages: [], updatedAt: Date.now() };
}

export function titleFromQuestion(question: string): string {
  const singleLine = question.replace(/\s+/g, " ").trim();
  if (singleLine.length <= TITLE_LENGTH) {
    return singleLine;
  }

  return `${singleLine.slice(0, TITLE_LENGTH - 1)}…`;
}

export function createUserMessage(content: string): ChatMessage {
  return { id: createId(), role: "user", content, sources: [], status: "done" };
}

export function createAssistantMessage(): ChatMessage {
  return { id: createId(), role: "assistant", content: "", sources: [], status: "streaming" };
}

export function toTurns(messages: ChatMessage[]): AssistantTurn[] {
  const turns: AssistantTurn[] = [];
  for (let index = 0; index < messages.length - 1; index += 1) {
    const question = messages[index];
    const answer = messages[index + 1];
    if (question.role !== "user" || answer.role !== "assistant") {
      continue;
    }

    if (answer.status !== "done" || !answer.content) {
      continue;
    }

    turns.push({ role: "user", content: question.content });
    turns.push({ role: "assistant", content: answer.content });
  }

  return turns;
}

export function sortConversations(conversations: Conversation[]): Conversation[] {
  return [...conversations]
    .filter((conversation) => conversation.messages.length > 0)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_CONVERSATIONS);
}

function storageKey(locale: string): string {
  return `znpedia.assistant.${locale}.v1`;
}

function isConversation(value: unknown): value is Conversation {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<Conversation>;
  return typeof candidate.id === "string" && Array.isArray(candidate.messages);
}

export function loadConversations(locale: string): Conversation[] {
  try {
    const raw = window.localStorage.getItem(storageKey(locale));
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return sortConversations(parsed.filter(isConversation));
  } catch {
    return [];
  }
}

function settle(message: ChatMessage): ChatMessage {
  if (message.status !== "streaming") {
    return message;
  }

  if (message.content) {
    return { ...message, status: "done" };
  }

  return { ...message, status: "error", error: "failed" };
}

export function saveConversations(locale: string, conversations: Conversation[]) {
  try {
    const settled = sortConversations(conversations).map((conversation) => ({
      ...conversation,
      messages: conversation.messages.map(settle),
    }));
    window.localStorage.setItem(storageKey(locale), JSON.stringify(settled));
  } catch {
    return;
  }
}
