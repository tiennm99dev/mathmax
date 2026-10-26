import { describe, it, expect } from 'vitest';
import {
  DATA_SETS,
  KIND_BINS,
  KIND_CARDS,
  METHOD_BINS,
  METHOD_CARDS,
  checkFlags,
} from './engine.js';

describe('sorting decks', () => {
  it('put every card in an existing bin and fill every bin', () => {
    for (const [cards, bins] of /** @type {const} */ ([
      [METHOD_CARDS, METHOD_BINS],
      [KIND_CARDS, KIND_BINS],
    ])) {
      const ids = new Set(bins.map((b) => b.id));
      for (const c of cards) expect(ids.has(c.bin)).toBe(true);
      for (const b of bins) expect(cards.some((c) => c.bin === b.id)).toBe(true);
      expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
    }
  });
});

describe('checkFlags', () => {
  const set = DATA_SETS[0];

  it('every data set hides at least one wrong value among right ones', () => {
    for (const s of DATA_SETS) {
      const bad = s.values.filter((v) => v.bad).length;
      expect(bad).toBeGreaterThan(0);
      expect(bad).toBeLessThan(s.values.length);
    }
  });

  it('is done only when exactly the wrong values are flagged', () => {
    const bad = set.values.flatMap((v, i) => (v.bad ? [i] : []));
    expect(checkFlags(set, bad)).toMatchObject({ done: true, missed: [], extra: [] });
    expect(checkFlags(set, []).missed).toEqual(bad);
    const r = checkFlags(set, [0, bad[0]]);
    expect(r).toMatchObject({ found: [bad[0]], extra: [0], done: false, total: bad.length });
  });
});
