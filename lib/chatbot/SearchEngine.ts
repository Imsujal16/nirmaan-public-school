import type { KnowledgeEntry, SearchHit } from './types';

const synonymMap: Record<string, string[]> = {
  bus: ['transport', 'route', 'pickup', 'van'],
  van: ['transport', 'bus', 'pickup'],
  fee: ['fees', 'cost', 'charges', 'payment'],
  cost: ['fees', 'charges', 'payment'],
  computer: ['lab', 'technology', 'smart classroom'],
  science: ['lab', 'inquiry-based science', 'academics'],
  principal: ['headmaster', 'head teacher', 'leadership'],
  headmaster: ['principal', 'leadership'],
  sports: ['ground', 'games', 'athletics'],
  ground: ['sports', 'games'],
  photos: ['gallery', 'images'],
  pictures: ['gallery', 'photos'],
  timings: ['office hours', 'time'],
  admission: ['apply', 'enroll', 'admissions'],
  transport: ['bus', 'van', 'route', 'pickup', 'commute', 'facility']
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with', 'tell', 'me', 'about', 'what', 'how', 'do', 'you', 'can', 'i', 'my', 'we', 'our', 'have', 'has', 'had', 'am', 'did', 'does', 'please', 'show'
]);

function tokenize(value: string) {
  return normalize(value)
    .split(' ')
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return matrix[a.length][b.length];
}

function fuzzyMatch(queryToken: string, candidate: string) {
  if (queryToken.length < 4 || candidate.length < 4) return false;
  const distance = levenshtein(queryToken, candidate);
  return distance <= Math.max(1, Math.floor(Math.min(queryToken.length, candidate.length) * 0.25));
}

function expandTokens(tokens: string[]) {
  const expanded = new Set(tokens);
  tokens.forEach((token) => {
    (synonymMap[token] || []).forEach((synonym) => tokenize(synonym).forEach((item) => expanded.add(item)));
  });
  return [...expanded];
}

export class SearchEngine {
  private entries: KnowledgeEntry[];

  constructor(entries: KnowledgeEntry[]) {
    this.entries = entries;
  }

  search(query: string): SearchHit[] {
    const normalizedQuery = normalize(query);
    const queryTokens = tokenize(query);
    const expandedTokens = expandTokens(queryTokens);

    return this.entries
      .map((entry) => {
        const haystack = normalize([
          entry.title,
          entry.intent,
          entry.summary,
          ...entry.details,
          ...entry.keywords,
          ...entry.aliases
        ].join(' '));
        const candidateTokens = tokenize(haystack);
        const reasons: string[] = [];
        let score = 0;

        for (const alias of entry.aliases) {
          if (normalizedQuery.includes(normalize(alias))) {
            score += 14;
            reasons.push(`alias:${alias}`);
          }
        }

        for (const keyword of entry.keywords) {
          const normalizedKeyword = normalize(keyword);
          if (normalizedQuery.includes(normalizedKeyword)) {
            score += normalizedKeyword.includes(' ') ? 12 : 7;
            reasons.push(`keyword:${keyword}`);
          }
        }

        for (const token of expandedTokens) {
          if (candidateTokens.includes(token)) {
            score += queryTokens.includes(token) ? 4 : 2;
          } else if (candidateTokens.some((candidate) => fuzzyMatch(token, candidate))) {
            score += 1.5;
          }
        }

        return { entry, score, reasons };
      })
      .filter((hit) => hit.score > 0)
      .sort((a, b) => b.score - a.score);
  }
}
