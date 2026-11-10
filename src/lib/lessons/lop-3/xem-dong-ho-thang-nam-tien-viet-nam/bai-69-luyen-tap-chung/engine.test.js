import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, buildRound } from './engine.js';

describe('the mixed practice round', () => {
  it('asks one question of each part of the chapter', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (JSON.stringify(kinds) !== JSON.stringify(Object.keys(KIND_LABELS).sort())) bad.push(seed);
      for (const q of round) if (!optionText(q.options[q.answer])) bad.push(q);
    }
    expect(bad).toEqual([]);
  });

  it('rebuilds the same round from the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});
