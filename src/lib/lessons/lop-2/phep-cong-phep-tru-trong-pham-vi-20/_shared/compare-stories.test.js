import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  PAIRS,
  compareHint,
  comparePrompt,
  compareResult,
  compareSolution,
  newCompareStory,
} from './compare-stories.js';

describe('more-than and fewer-than stories', () => {
  it('sets out the solution the book way', () => {
    const s = /** @type {const} */ ({ pair: 0, kind: 'nhieu', a: 6, k: 2 });
    expect(comparePrompt(s)).toBe(
      'Mai hái được 6 bông hoa. Việt hái được nhiều hơn Mai 2 bông hoa. Hỏi Việt hái được bao nhiêu bông hoa?',
    );
    expect(compareSolution(s)).toEqual([
      'Số bông hoa Việt hái được là:',
      '6 + 2 = 8 (bông)',
      'Đáp số: 8 bông hoa.',
    ]);
    const t = /** @type {const} */ ({ pair: 2, kind: 'it', a: 12, k: 4 });
    expect(compareResult(t)).toBe(8);
    expect(compareSolution(t)[1]).toBe('12 − 4 = 8 (con)');
    expect(compareHint(t)).toContain('phép trừ');
  });

  it('keeps stories within 20, switches kind and changes pair', () => {
    const rand = rng(3);
    const bad = [];
    /** @type {import('./compare-stories.js').CompareStory | undefined} */
    let prev;
    for (let i = 0; i < 200; i++) {
      const s = newCompareStory(rand, prev);
      const c = compareResult(s);
      if (c < 1 || c > 20 || s.a > 20 || s.k < 1 || s.k > 5) bad.push(s);
      if (prev && (s.kind === prev.kind || s.pair === prev.pair)) bad.push(['repeat', s]);
      if (s.pair < 0 || s.pair >= PAIRS.length) bad.push(s);
      prev = s;
    }
    expect(bad).toEqual([]);
  });
});
