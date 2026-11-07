import type { AssistantStreamEvent, AssistantTurn, AssistantScope } from "@/lib/assistant/types";

export const ASSISTANT_ENDPOINT = "/api/assistant";

type StreamRequest = {
  locale: string;
  scope: AssistantScope;
  messages: AssistantTurn[];
  signal: AbortSignal;
};

function parseLine(line: string): AssistantStreamEvent | null {
  if (!line.trim()) {
    return null;
  }

  try {
    return JSON.parse(line) as AssistantStreamEvent;
  } catch {
    return null;
  }
}

async function readErrorEvent(response: Response): Promise<AssistantStreamEvent> {
  try {
    const body = (await response.json()) as AssistantStreamEvent;
    if (body.type === "error") {
      return body;
    }
  } catch {
    return { type: "error", code: "failed" };
  }

  return { type: "error", code: "failed" };
}

export async function* requestAnswer({
  locale,
  scope,
  messages,
  signal,
}: StreamRequest): AsyncGenerator<AssistantStreamEvent> {
  const response = await fetch(ASSISTANT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ locale, scope, messages }),
    signal,
  });

  if (!response.ok || !response.body) {
    yield await readErrorEvent(response);
    return;
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const event = parseLine(line);
      if (event) {
        yield event;
      }
    }
  }

  const tail = parseLine(buffer);
  if (tail) {
    yield tail;
  }
}
