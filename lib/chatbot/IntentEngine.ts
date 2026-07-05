import type { ChatIntent, SearchHit } from './types';

export class IntentEngine {
  detect(hits: SearchHit[]): ChatIntent {
    if (!hits.length) return 'unknown';
    const intentScores = hits.reduce<Record<string, number>>((acc, hit) => {
      acc[hit.entry.intent] = (acc[hit.entry.intent] || 0) + hit.score;
      return acc;
    }, {});

    const [intent] = Object.entries(intentScores).sort((a, b) => b[1] - a[1])[0];
    return intent as ChatIntent;
  }
}
