import { describe, expect, it } from 'vitest';
import { PUZZLES, bracketText, feedback, pairsOf, roundWord, solved, swap } from './engine.js';

/**
 * Every order of four terms reachable by swaps.
 * @param {readonly number[]} terms
 * @returns {number[][]}
 */
function orders(terms) {
  if (terms.length <= 1) return [[...terms]];
  return terms.flatMap((t, i) =>
    orders([...terms.slice(0, i), ...terms.slice(i + 1)]).map((rest) => [t, ...rest]),
  );
}

describe('rounding pairs', () => {
  it('names round numbers', () => {
    expect([200, 4000, 70, 73, 0].map(roundWord)).toEqual([
      'tròn trăm',
      'tròn nghìn',
      'tròn chục',
      '',
      '',
    ]);
  });

  it('start unsolved and have an order that pairs two round sums', () => {
    const bad = PUZZLES.filter((p) => solved(p) || !orders(p).some(solved));
    expect(bad).toEqual([]);
  });

  it('keep the total whatever the order', () => {
    const totals = PUZZLES.map(
      (p) => new Set(orders(p).map((o) => pairsOf(o)[0].sum + pairsOf(o)[1].sum)).size,
    );
    expect(totals.every((n) => n === 1)).toBe(true);
  });

  it('swap two places and say the result', () => {
    const terms = swap(PUZZLES[0], 1, 2);
    expect(terms).toEqual([98, 2, 46, 54]);
    expect(solved(terms)).toBe(true);
    expect(bracketText(terms)).toBe('(98 + 2) + (46 + 54)');
    expect(feedback(terms)).toContain('= 100 + 100 = 200');
    expect(feedback(PUZZLES[0])).toContain('Tổng vẫn là 200');
  });
});
