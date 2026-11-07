import { ASSISTANT_LIMITS } from "@/lib/assistant/config";
import type { AssistantRequest, AssistantScope, AssistantTurn } from "@/lib/assistant/types";

const SLUG = /^[a-z0-9-]{1,80}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseSlug(value: unknown): string | undefined {
  if (typeof value !== "string" || !SLUG.test(value)) {
    return undefined;
  }

  return value;
}

function parseScope(value: unknown): AssistantScope {
  if (!isRecord(value)) {
    return {};
  }

  const course = parseSlug(value.course);
  if (!course) {
    return {};
  }

  return { course, chapter: parseSlug(value.chapter) };
}

function parseTurn(value: unknown): AssistantTurn | null {
  if (!isRecord(value)) {
    return null;
  }

  const { role, content } = value;
  if (role !== "user" && role !== "assistant") {
    return null;
  }

  if (typeof content !== "string") {
    return null;
  }

  const trimmed = content.trim();
  if (!trimmed || trimmed.length > ASSISTANT_LIMITS.maxMessageChars * 4) {
    return null;
  }

  return { role, content: trimmed };
}

function isAlternating(turns: AssistantTurn[]): boolean {
  return turns.every((turn, index) => turn.role === (index % 2 === 0 ? "user" : "assistant"));
}

export function parseAssistantRequest(body: unknown): AssistantRequest | null {
  if (!isRecord(body) || !Array.isArray(body.messages)) {
    return null;
  }

  const turns = body.messages.slice(-ASSISTANT_LIMITS.maxTurns).map(parseTurn);
  if (turns.length === 0 || turns.some((turn) => turn === null)) {
    return null;
  }

  const messages = turns as AssistantTurn[];
  const trimmed = messages[0].role === "assistant" ? messages.slice(1) : messages;
  const last = trimmed[trimmed.length - 1];
  if (!last || last.role !== "user" || last.content.length > ASSISTANT_LIMITS.maxMessageChars) {
    return null;
  }

  const total = trimmed.reduce((sum, turn) => sum + turn.content.length, 0);
  if (total > ASSISTANT_LIMITS.maxTotalChars || !isAlternating(trimmed)) {
    return null;
  }

  return { scope: parseScope(body.scope), messages: trimmed };
}
