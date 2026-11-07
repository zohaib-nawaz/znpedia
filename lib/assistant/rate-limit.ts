import { ASSISTANT_LIMITS } from "@/lib/assistant/config";

const hits = new Map<string, number[]>();

function prune(now: number) {
  for (const [key, times] of hits) {
    const recent = times.filter((time) => now - time < ASSISTANT_LIMITS.windowMs);
    if (recent.length === 0) {
      hits.delete(key);
      continue;
    }

    hits.set(key, recent);
  }
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "anonymous";
}

export function takeRateLimitSlot(key: string, now: number = Date.now()): boolean {
  prune(now);
  const times = hits.get(key);
  if (!times) {
    hits.set(key, [now]);
    return true;
  }

  if (times.length >= ASSISTANT_LIMITS.requestsPerWindow) {
    return false;
  }

  times.push(now);
  return true;
}
