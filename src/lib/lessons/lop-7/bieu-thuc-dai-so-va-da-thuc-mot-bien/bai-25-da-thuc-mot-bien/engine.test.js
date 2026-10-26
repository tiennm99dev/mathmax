import { describe, it, expect } from 'vitest';
import { evaluate } from '../_shared/poly.js';
import {
  PRESETS,
  ROOT_PRESETS,
  cardsOf,
  hasLikeTerms,
  isArranged,
  likeOf,
  merge,
  move,
  readout,
} from './engine.js';

describe('term cards', () => {
  it('merges like terms and drops a zero sum', () => {
    const cards = cardsOf(PRESETS[1].terms); // 2x³ − 3x² − x − 2x³ + 7
    expect(likeOf(cards, 0)).toBe(3);
    const merged = merge(cards, 0);
    expect(merged.map((c) => c.e)).toEqual([2, 1, 0]);
    expect(hasLikeTerms(merged)).toBe(false);
  });

  it('keeps the sum in the place of the chosen card', () => {
    const cards = cardsOf(PRESETS[0].terms); // −3x² − 12 + x⁵ + x² − 2x⁴
    const merged = merge(cards, 3);
    expect(merged.map((c) => [c.c, c.e])).toEqual([
      [-12, 0],
      [1, 5],
      [-2, 2],
      [-2, 4],
    ]);
    expect(merge(merged, 0)).toBe(merged);
  });

  it('checks the descending order and reads the coefficients', () => {
    let cards = merge(cardsOf(PRESETS[0].terms), 0);
    expect(isArranged(cards)).toBe(false);
    // −2x² − 12 + x⁵ − 2x⁴ → x⁵ − 2x⁴ − 2x² − 12
    cards = move(cards, 2, -1);
    cards = move(cards, 1, -1);
    cards = move(cards, 3, -1);
    cards = move(cards, 2, -1);
    expect(cards.map((c) => c.e)).toEqual([5, 4, 2, 0]);
    expect(isArranged(cards)).toBe(true);
    expect(readout(cards)).toEqual({ degree: 5, lead: 1, free: -12 });
    expect(move(cards, 0, -1)).toBe(cards);
  });

  it('reads the third preset after collecting', () => {
    const r = readout(cardsOf(PRESETS[2].terms));
    expect(r).toEqual({ degree: 3, lead: 4, free: -1 });
  });
});

describe('root presets', () => {
  it('lists exactly the roots found on the slider grid', () => {
    for (const { p, roots } of ROOT_PRESETS) {
      const found = [];
      for (let k = -6; k <= 6; k++) if (evaluate(p, k / 2) === 0) found.push(k / 2);
      expect(found).toEqual(roots);
    }
  });
});
