export type SearchEntry = {
  href: string;
  title: string;
  courseTitle: string;
  sectionTitle: string;
  description: string;
  keywords: string[];
};

export type SearchHit = SearchEntry & {
  score: number;
};

const MAX_RESULTS = 12;

const FIELD_WEIGHTS = {
  title: 10,
  keywords: 5,
  section: 3,
  course: 2,
  description: 1,
} as const;

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFKD");
}

function tokenize(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function scoreTerm(entry: SearchEntry, term: string): number {
  const fields: [string, number][] = [
    [entry.title, FIELD_WEIGHTS.title],
    [entry.keywords.join(" "), FIELD_WEIGHTS.keywords],
    [entry.sectionTitle, FIELD_WEIGHTS.section],
    [entry.courseTitle, FIELD_WEIGHTS.course],
    [entry.description, FIELD_WEIGHTS.description],
  ];

  return fields.reduce((sum, [text, weight]) => {
    const haystack = normalize(text);
    if (!haystack.includes(term)) {
      return sum;
    }
    if (haystack.startsWith(term)) {
      return sum + weight * 2;
    }

    return sum + weight;
  }, 0);
}

export function searchEntries(entries: SearchEntry[], query: string): SearchHit[] {
  const terms = tokenize(query);
  if (terms.length === 0) {
    return [];
  }

  return entries
    .flatMap((entry) => {
      const scores = terms.map((term) => scoreTerm(entry, term));
      if (scores.some((score) => score === 0)) {
        return [];
      }

      return [{ ...entry, score: scores.reduce((sum, score) => sum + score, 0) }];
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, MAX_RESULTS);
}
