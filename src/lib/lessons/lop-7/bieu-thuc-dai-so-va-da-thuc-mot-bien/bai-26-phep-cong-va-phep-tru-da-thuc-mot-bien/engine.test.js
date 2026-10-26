import { describe, it, expect } from 'vitest';
import { add, collect, sub } from '#lib/algebra-engine/polynomial.js';
import { PAIRS, columnTex, columns } from './engine.js';

/** Result coefficients, by degree, from the columns. */
const fromColumns = (/** @type {import('./engine.js').Column[]} */ cols) =>
  collect(cols.map((c) => ({ c: c.r, e: c.e })));

describe('column addition and subtraction', () => {
  it('agrees with adding and subtracting the polynomials', () => {
    for (const { p, q } of PAIRS) {
      expect(fromColumns(columns(p, q, '+'))).toEqual(add(collect(p), collect(q)));
      expect(fromColumns(columns(p, q, '-'))).toEqual(sub(collect(p), collect(q)));
    }
  });

  it('finds the cancelling x³ column of the first pair', () => {
    const cols = columns(PAIRS[0].p, PAIRS[0].q, '+');
    expect(cols.map((c) => c.e)).toEqual([3, 2, 1, 0]);
    expect(cols[0]).toEqual({ e: 3, a: 2, b: -2, r: 0 });
    expect(fromColumns(cols)).toEqual([3, 5, -2]); // −2x² + 5x + 3
    expect(fromColumns(columns(PAIRS[0].p, PAIRS[0].q, '-'))).toEqual([-5, 5, -4, 4]);
  });

  it('works the second pair as in the lesson', () => {
    expect(fromColumns(columns(PAIRS[1].p, PAIRS[1].q, '+'))).toEqual([-3, 0, 4, -2, 1]);
    expect(fromColumns(columns(PAIRS[1].p, PAIRS[1].q, '-'))).toEqual([5, -4, 2, 2, 1]);
  });

  it('writes one column with brackets around negatives', () => {
    expect(columnTex({ e: 2, a: -3, b: 1, r: -2 }, '+')).toBe('(-3x^{2}) + x^{2} = -2x^{2}');
    expect(columnTex({ e: 3, a: 2, b: -2, r: 4 }, '-')).toBe('2x^{3} - (-2x^{3}) = 4x^{3}');
    expect(columnTex({ e: 1, a: 5, b: 0, r: 5 }, '-')).toBe('5x - 0 = 5x');
    expect(columnTex({ e: 3, a: 2, b: -2, r: 0 }, '+')).toBe('2x^{3} + (-2x^{3}) = 0');
  });
});
