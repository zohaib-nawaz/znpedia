import { ASSISTANT_LIMITS } from "@/lib/assistant/config";
import type { AssistantScope, AssistantTurn, ContentChunk } from "@/lib/assistant/types";

const BM25 = { k1: 1.4, b: 0.75 } as const;

const RANKING = {
  chapters: 4,
  chunksPerChapter: 2,
  titleWeight: 2.5,
  navigationPenalty: 0.25,
} as const;

const NAVIGATION_HEADING = /(pehle aur baad|before and after|aage kya|what next)/i;

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "can", "do", "does", "for", "from", "how",
  "i", "in", "is", "it", "me", "my", "of", "on", "or", "please", "the", "this", "to", "what",
  "when", "where", "which", "why", "with", "you", "your", "vs", "versus", "difference",
  "aur", "bhi", "de", "hai", "hain", "ho", "hota", "hoti", "hote", "ka", "kaise", "kab", "ke",
  "ki", "kis", "ko", "koi", "kya", "kyun", "mein", "mujhe", "na", "nahi", "par", "se", "tak",
  "yeh", "woh", "wala", "wali", "wale", "batao", "bataen", "samjhao", "explain", "tell", "fark",
]);

type IndexedChunk = {
  chunk: ContentChunk;
  terms: Map<string, number>;
  titleTerms: Set<string>;
  length: number;
};

type ScoredChunk = {
  chunk: ContentChunk;
  score: number;
};

type ChapterGroup = {
  key: string;
  score: number;
  chunks: ScoredChunk[];
};

const indexCache = new WeakMap<ContentChunk[], IndexedChunk[]>();

export function tokenize(text: string): string[] {
  const matches = text.toLowerCase().match(/[a-z0-9]+(?:[.-][a-z0-9]+)*/g);
  if (!matches) {
    return [];
  }

  return matches.filter((term) => term.length > 1 && !STOPWORDS.has(term));
}

function countTerms(terms: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const term of terms) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }

  return counts;
}

function indexChunk(chunk: ContentChunk): IndexedChunk {
  const terms = [...tokenize(chunk.heading), ...tokenize(chunk.text)];
  const titleTerms = new Set(tokenize(`${chunk.chapterTitle} ${chunk.keywords.join(" ")}`));

  return { chunk, terms: countTerms(terms), titleTerms, length: terms.length };
}

function getIndex(chunks: ContentChunk[]): IndexedChunk[] {
  const cached = indexCache.get(chunks);
  if (cached) {
    return cached;
  }

  const indexed = chunks.map(indexChunk);
  indexCache.set(chunks, indexed);
  return indexed;
}

function inScope(chunk: ContentChunk, scope: AssistantScope): boolean {
  if (scope.course && chunk.courseSlug !== scope.course) {
    return false;
  }

  return true;
}

function bm25(indexed: IndexedChunk[], queryTerms: string[]): ScoredChunk[] {
  const unique = [...new Set(queryTerms)];
  const averageLength = indexed.reduce((sum, item) => sum + item.length, 0) / indexed.length;
  const documentFrequency = new Map(
    unique.map((term) => [term, indexed.filter((item) => item.terms.has(term)).length])
  );

  return indexed.map(({ chunk, terms, titleTerms, length }) => {
    let score = 0;
    let matched = 0;
    for (const term of unique) {
      const frequency = terms.get(term) ?? 0;
      if (frequency > 0 || titleTerms.has(term)) {
        matched += 1;
      }

      const df = documentFrequency.get(term) ?? 0;
      const idf = Math.log(1 + (indexed.length - df + 0.5) / (df + 0.5));
      const norm = frequency + BM25.k1 * (1 - BM25.b + (BM25.b * length) / averageLength);
      score += idf * ((frequency * (BM25.k1 + 1)) / norm);
      if (titleTerms.has(term)) {
        score += idf * RANKING.titleWeight;
      }
    }

    const penalty = NAVIGATION_HEADING.test(chunk.heading) ? RANKING.navigationPenalty : 1;
    const coverage = (matched / unique.length) ** 2;
    return { chunk, score: score * penalty * coverage };
  });
}

function groupByChapter(scored: ScoredChunk[]): ChapterGroup[] {
  const groups = new Map<string, ChapterGroup>();
  for (const item of scored) {
    const key = `${item.chunk.courseSlug}/${item.chunk.chapterSlug}`;
    const group = groups.get(key);
    if (!group) {
      groups.set(key, { key, score: item.score, chunks: [item] });
      continue;
    }

    group.score = Math.max(group.score, item.score);
    group.chunks.push(item);
  }

  return [...groups.values()];
}

export function buildRetrievalQuery(messages: AssistantTurn[]): string {
  return messages
    .filter((message) => message.role === "user")
    .slice(-2)
    .map((message) => message.content)
    .join(" ");
}

export function retrieveChunks(
  chunks: ContentChunk[],
  scope: AssistantScope,
  query: string,
  limit: number = ASSISTANT_LIMITS.retrievedChunks
): ContentChunk[] {
  const queryTerms = tokenize(query);
  const candidates = getIndex(chunks).filter((item) => inScope(item.chunk, scope));
  if (queryTerms.length === 0 || candidates.length === 0) {
    return [];
  }

  const scored = bm25(candidates, queryTerms).filter((item) => item.score > 0);

  return groupByChapter(scored)
    .sort((a, b) => b.score - a.score)
    .slice(0, RANKING.chapters)
    .flatMap((group) =>
      group.chunks.sort((a, b) => b.score - a.score).slice(0, RANKING.chunksPerChapter)
    )
    .slice(0, limit)
    .map((item) => item.chunk);
}

export function getChapterChunks(chunks: ContentChunk[], scope: AssistantScope): ContentChunk[] {
  if (!scope.course || !scope.chapter) {
    return [];
  }

  return chunks.filter(
    (chunk) => chunk.courseSlug === scope.course && chunk.chapterSlug === scope.chapter
  );
}
