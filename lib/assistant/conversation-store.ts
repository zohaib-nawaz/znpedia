import {
  loadConversations,
  saveConversations,
  type Conversation,
} from "@/lib/assistant/conversations";

type Listener = () => void;

const SAVE_DELAY_MS = 400;
const EMPTY: Conversation[] = [];

const cache = new Map<string, Conversation[]>();
const listeners = new Set<Listener>();
const pendingSaves = new Map<string, number>();

function scheduleSave(locale: string) {
  const pending = pendingSaves.get(locale);
  if (pending !== undefined) {
    window.clearTimeout(pending);
  }

  const timer = window.setTimeout(() => {
    pendingSaves.delete(locale);
    saveConversations(locale, getConversationsSnapshot(locale));
  }, SAVE_DELAY_MS);
  pendingSaves.set(locale, timer);
}

export function subscribeConversations(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getConversationsSnapshot(locale: string): Conversation[] {
  const cached = cache.get(locale);
  if (cached) {
    return cached;
  }

  const loaded = loadConversations(locale);
  cache.set(locale, loaded);
  return loaded;
}

export function getServerConversationsSnapshot(): Conversation[] {
  return EMPTY;
}

export function updateConversations(
  locale: string,
  update: (current: Conversation[]) => Conversation[]
) {
  cache.set(locale, update(getConversationsSnapshot(locale)));
  scheduleSave(locale);
  for (const listener of listeners) {
    listener();
  }
}
