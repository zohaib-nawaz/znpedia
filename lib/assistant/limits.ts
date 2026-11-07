export const ASSISTANT_LIMITS = {
  maxTurns: 24,
  maxMessageChars: 4000,
  maxTotalChars: 32000,
  maxOutputTokens: 8192,
  retrievedChunks: 8,
  chunkChars: 4000,
  scopedChapterChars: 24000,
  requestsPerWindow: 20,
  windowMs: 10 * 60 * 1000,
} as const;
