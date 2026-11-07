import {
  ApiError,
  FinishReason,
  GoogleGenAI,
  type Content,
  type GenerateContentResponse,
} from "@google/genai";

import { ASSISTANT_LIMITS, getGeminiApiKey, getGeminiModelChain } from "@/lib/assistant/config";
import { getCatalog, getContentChunks } from "@/lib/assistant/content-index";
import { buildGroundedQuestion, buildSystemPrompt } from "@/lib/assistant/prompt";
import { buildRetrievalQuery, getChapterChunks, retrieveChunks } from "@/lib/assistant/retrieval";
import type {
  AssistantErrorCode,
  AssistantRequest,
  AssistantSource,
  AssistantStreamEvent,
  ContentChunk,
} from "@/lib/assistant/types";
import type { Locale } from "@/lib/i18n/config";

const MAX_SOURCES = 5;

const BLOCKED_FINISH_REASONS = new Set<FinishReason>([
  FinishReason.SAFETY,
  FinishReason.PROHIBITED_CONTENT,
  FinishReason.BLOCKLIST,
  FinishReason.SPII,
  FinishReason.RECITATION,
]);

const NEXT_MODEL_STATUSES = new Set([404, 429, 500, 503, 504]);

type PreparedAnswer = {
  system: string;
  contents: Content[];
  sources: AssistantSource[];
};

type ModelAttempt = {
  emitted: boolean;
  blocked: boolean;
};

let client: GoogleGenAI | null = null;

export function isAssistantConfigured(): boolean {
  return getGeminiApiKey() !== null;
}

function getClient(apiKey: string): GoogleGenAI {
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }

  return client;
}

function toSource(chunk: ContentChunk): AssistantSource {
  return {
    id: chunk.id,
    title: chunk.chapterTitle,
    courseTitle: chunk.courseTitle,
    heading: chunk.heading,
    href: chunk.href,
  };
}

function pickSources(chapterChunks: ContentChunk[], retrieved: ContentChunk[]): AssistantSource[] {
  const seen = new Set<string>();
  const ordered = [...chapterChunks.slice(0, 1), ...retrieved];

  return ordered
    .filter((chunk) => {
      const key = `${chunk.courseSlug}/${chunk.chapterSlug}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, MAX_SOURCES)
    .map(toSource);
}

function toContent(role: "user" | "assistant", text: string): Content {
  return { role: role === "assistant" ? "model" : "user", parts: [{ text }] };
}

export function prepareAnswer(locale: Locale, request: AssistantRequest): PreparedAnswer {
  const chunks = getContentChunks(locale);
  const catalog = getCatalog(locale);
  const chapterChunks = getChapterChunks(chunks, request.scope);
  const retrieved = retrieveChunks(chunks, request.scope, buildRetrievalQuery(request.messages));
  const history = request.messages.slice(0, -1);
  const question = request.messages[request.messages.length - 1].content;
  const grounded = buildGroundedQuestion({
    question,
    scope: request.scope,
    catalog,
    chapterChunks,
    retrieved,
  });

  return {
    system: buildSystemPrompt(locale, catalog),
    contents: [
      ...history.map((turn) => toContent(turn.role, turn.content)),
      toContent("user", grounded),
    ],
    sources: pickSources(chapterChunks, retrieved),
  };
}

function isBlocked(chunk: GenerateContentResponse): boolean {
  if (chunk.promptFeedback?.blockReason) {
    return true;
  }

  const reason = chunk.candidates?.[0]?.finishReason;
  if (!reason) {
    return false;
  }

  return BLOCKED_FINISH_REASONS.has(reason);
}

function classifyError(error: unknown): AssistantErrorCode {
  if (!(error instanceof ApiError)) {
    return "failed";
  }

  if (error.status === 400 && /api key/i.test(error.message)) {
    return "not_configured";
  }

  if (error.status === 401 || error.status === 403) {
    return "not_configured";
  }

  if (error.status === 429 || error.status === 503) {
    return "busy";
  }

  return "failed";
}

function shouldTryNextModel(error: unknown, attempt: ModelAttempt): boolean {
  if (attempt.emitted || !(error instanceof ApiError)) {
    return false;
  }

  return NEXT_MODEL_STATUSES.has(error.status);
}

async function* streamFromModel(
  model: string,
  prepared: PreparedAnswer,
  apiKey: string,
  signal: AbortSignal,
  attempt: ModelAttempt
): AsyncGenerator<AssistantStreamEvent> {
  const stream = await getClient(apiKey).models.generateContentStream({
    model,
    contents: prepared.contents,
    config: {
      systemInstruction: prepared.system,
      maxOutputTokens: ASSISTANT_LIMITS.maxOutputTokens,
      abortSignal: signal,
    },
  });

  for await (const chunk of stream) {
    if (isBlocked(chunk)) {
      attempt.blocked = true;
      return;
    }

    const text = chunk.text;
    if (text) {
      attempt.emitted = true;
      yield { type: "text", text };
    }
  }
}

export async function* streamAnswer(
  prepared: PreparedAnswer,
  signal: AbortSignal
): AsyncGenerator<AssistantStreamEvent> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    yield { type: "error", code: "not_configured" };
    return;
  }

  yield { type: "sources", sources: prepared.sources };

  let lastError: unknown = null;
  for (const model of getGeminiModelChain()) {
    const attempt: ModelAttempt = { emitted: false, blocked: false };
    try {
      yield* streamFromModel(model, prepared, apiKey, signal, attempt);
      if (attempt.blocked) {
        yield { type: "error", code: "refused" };
        return;
      }

      yield { type: "done" };
      return;
    } catch (error) {
      if (signal.aborted) {
        return;
      }

      lastError = error;
      if (!shouldTryNextModel(error, attempt)) {
        break;
      }
    }
  }

  console.error("assistant stream failed", lastError);
  yield { type: "error", code: classifyError(lastError) };
}
