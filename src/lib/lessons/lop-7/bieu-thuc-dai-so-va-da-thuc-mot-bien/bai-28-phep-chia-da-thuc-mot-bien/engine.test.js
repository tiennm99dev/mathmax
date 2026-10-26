import { describe, it, expect } from 'vitest';
import { add, degree, mul } from '#lib/algebra-engine/polynomial.js';
import { longDivide, numberDivide } from '#lib/algebra-engine/long-division.js';
import { PRESETS, numberNarration, polyNarration, shownIn } from './engine.js';

describe('presets', () => {
  it('satisfies A = B·Q + R with deg R < deg B for every preset', () => {
    for (const { p, q } of PRESETS) {
      const d = longDivide(p, q);
      expect(add(mul(q, d.quotient), d.remainder)).toEqual(p);
      const r = degree(d.remainder);
      expect(r === null || r < /** @type {number} */ (degree(q))).toBe(true);
    }
  });

  it('pairs each preset with a number division of as many rounds', () => {
    for (const { p, q, a, b } of PRESETS) {
      expect(numberDivide(a, b).rounds).toHaveLength(longDivide(p, q).rounds.length);
    }
  });
});

describe('stepping and narration', () => {
  it('shows the actions of a round one at a time', () => {
    expect([0, 1, 2, 3, 4].map((s) => shownIn(s, 0))).toEqual([0, 1, 2, 3, 3]);
    expect(shownIn(4, 1)).toBe(1);
  });

  it('narrates every step without gaps', () => {
    for (const { p, q, a, b } of PRESETS) {
      const pd = longDivide(p, q);
      const nd = numberDivide(a, b);
      for (let s = 1; s <= 3 * pd.rounds.length; s++) {
        expect(polyNarration(pd, q, s)).not.toMatch(/undefined|NaN/);
        expect(numberNarration(nd, b, s)).not.toMatch(/undefined|NaN/);
      }
    }
  });

  it('ends with the quotient and remainder', () => {
    const q = [1, 0, 1];
    const d = longDivide([7, -1, -3, 5], q);
    expect(polyNarration(d, q, 6)).toContain('dư −6x + 10');
    expect(numberNarration(numberDivide(467, 15), 15, 6)).toContain('thương 31, dư 2');
  });
});
