import { describe, it, expect } from 'vitest';
import { THEOREMS, checkProof, move, scrambled } from './engine.js';

describe('proof builder', () => {
  it('accepts the book order with the right reasons for every theorem', () => {
    for (const t of THEOREMS) {
      const order = t.steps.map((_, i) => i);
      const chosen = t.steps.map((s) => s.reason);
      expect(checkProof(t, order, chosen).done).toBe(true);
      for (const s of t.steps) {
        expect(s.reason).toBeLessThan(t.reasons.length);
        for (const u of s.uses) expect(u).toBeLessThan(t.steps.indexOf(s));
      }
    }
  });

  it('accepts independent facts in either order', () => {
    const t = THEOREMS[0];
    const chosen = t.steps.map((s) => s.reason);
    expect(checkProof(t, [1, 0, 2, 3], chosen).done).toBe(true);
  });

  it('flags a step placed before the facts it uses, and a wrong reason', () => {
    const t = THEOREMS[0];
    const chosen = t.steps.map((s) => s.reason);
    const early = checkProof(t, [2, 0, 1, 3], chosen);
    expect(early.placeOk).toBe(false);
    expect(early.lines[0].placeOk).toBe(false);
    const wrong = [...chosen];
    wrong[3] = 3;
    const r = checkProof(t, [0, 1, 2, 3], wrong);
    expect(r.placeOk).toBe(true);
    expect(r.reasonsOk).toBe(false);
    expect(r.lines[3].reasonOk).toBe(false);
  });

  it('demands the conclusion last', () => {
    const t = THEOREMS[1];
    const chosen = t.steps.map((s) => s.reason);
    expect(checkProof(t, [0, 1, 2, 3, 4, 5], chosen).done).toBe(true);
    expect(checkProof(t, [3, 2, 1, 0, 4, 5], chosen).done).toBe(true);
  });

  it('scrambles into a permutation that is not the book order', () => {
    for (const n of [4, 5, 6]) {
      const s = scrambled(n);
      expect([...s].sort()).toEqual(Array.from({ length: n }, (_, i) => i));
      expect(s).not.toEqual(Array.from({ length: n }, (_, i) => i));
    }
  });

  it('moves a line up and down within bounds', () => {
    expect(move([0, 1, 2], 1, -1)).toEqual([1, 0, 2]);
    expect(move([0, 1, 2], 2, 1)).toEqual([0, 1, 2]);
  });
});
