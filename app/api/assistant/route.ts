import { isAssistantConfigured, prepareAnswer, streamAnswer } from "@/lib/assistant/answer";
import { getClientKey, takeRateLimitSlot } from "@/lib/assistant/rate-limit";
import { parseAssistantRequest } from "@/lib/assistant/request";
import type { AssistantErrorCode, AssistantStreamEvent } from "@/lib/assistant/types";
import { isLocale, type Locale } from "@/lib/i18n/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const STATUS: Record<AssistantErrorCode, number> = {
  not_configured: 503,
  rate_limited: 429,
  invalid_request: 400,
  refused: 200,
  busy: 503,
  failed: 500,
};

function errorResponse(code: AssistantErrorCode) {
  return Response.json({ type: "error", code }, { status: STATUS[code] });
}

async function readBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function readLocale(body: unknown): Locale | null {
  if (typeof body !== "object" || body === null || !("locale" in body)) {
    return null;
  }

  const { locale } = body as { locale: unknown };
  if (typeof locale !== "string" || !isLocale(locale)) {
    return null;
  }

  return locale;
}

function toNdjson(events: AsyncGenerator<AssistantStreamEvent>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await events.next();
      if (done) {
        controller.close();
        return;
      }

      controller.enqueue(encoder.encode(`${JSON.stringify(value)}\n`));
    },
    async cancel() {
      await events.return(undefined);
    },
  });
}

export async function POST(request: Request) {
  if (!isAssistantConfigured()) {
    return errorResponse("not_configured");
  }

  const body = await readBody(request);
  const locale = readLocale(body);
  const parsed = parseAssistantRequest(body);
  if (!locale || !parsed) {
    return errorResponse("invalid_request");
  }

  if (!takeRateLimitSlot(getClientKey(request))) {
    return errorResponse("rate_limited");
  }

  const prepared = prepareAnswer(locale, parsed);

  return new Response(toNdjson(streamAnswer(prepared, request.signal)), {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
