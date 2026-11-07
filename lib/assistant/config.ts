export { ASSISTANT_LIMITS } from "@/lib/assistant/limits";

export const GEMINI_MODEL_PRIORITY = [
  "gemini-3.5-flash",
  "gemini-3-flash",
  "gemini-2.5-flash",
] as const;

export function getGeminiApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    return null;
  }

  return key;
}

export function getGeminiModelChain(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  if (!preferred) {
    return [...GEMINI_MODEL_PRIORITY];
  }

  return [...new Set([preferred, ...GEMINI_MODEL_PRIORITY])];
}
