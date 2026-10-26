import { describe, it, expect } from 'vitest';
import { divideTerm, longDivide, numberDivide } from './long-division.js';

describe('dividing terms', () => {
  it('divides coefficients and subtracts exponents', () => {
    expect(divideTerm({ c: 12, e: 3 }, { c: 4, e: 1 })).toEqual({ c: 3, e: 2 });
    expect(divideTerm({ c: -1, e: 6 }, { c: 0.5, e: 2 })).toEqual({ c: -2, e: 4 });
    expect(divideTerm({ c: 3, e: 7 }, { c: 1, e: 4 })).toEqual({ c: 3, e: 3 });
  });

  it('refuses a lower power', () => {
    expect(divideTerm({ c: 21, e: 1 }, { c: 3, e: 2 })).toBeNull();
  });
});

describe('polynomial long division', () => {
  it('divides exactly: the opening problem', () => {
    const d = longDivide([-2, 6, -3, -3, 2], [-2, 0, 1]);
    expect(d.quotient).toEqual([1, -3, 2]); // 2x² − 3x + 1
    expect(d.remainder).toEqual([]);
    expect(d.rounds).toHaveLength(3);
  });

  it('keeps a remainder of lower degree', () => {
    const d = longDivide([7, -1, -3, 5], [1, 0, 1]);
    expect(d.quotient).toEqual([-3, 5]); // 5x − 3
    expect(d.remainder).toEqual([10, -6]); // −6x + 10
    expect(d.rounds[0].rest).toEqual([7, -6, -3]); // −3x² − 6x + 7
  });

  it('finds the quotient and remainder of 3x⁴ − 6x − 5 by x² + 3x − 1', () => {
    const d = longDivide([-5, -6, 0, 0, 3], [-1, 3, 1]);
    expect(d.quotient).toEqual([30, -9, 3]);
    expect(d.remainder).toEqual([25, -105]);
  });

  it('divides by a monomial with a decimal coefficient', () => {
    const d = longDivide([0, 0, 0, -2, 5, 0, -1], [0, 0, 0.5]);
    expect(d.quotient).toEqual([0, -4, 10, 0, -2]);
    expect(d.remainder).toEqual([]);
  });

  it('gives quotient 0 when the dividend has a lower degree', () => {
    const d = longDivide([-4, 21], [0, 0, 3]);
    expect(d.quotient).toEqual([]);
    expect(d.remainder).toEqual([-4, 21]);
  });
});

describe('number long division', () => {
  it('divides 3192 by 12 in three rounds', () => {
    const d = numberDivide(3192, 12);
    expect(d.quotient).toBe(266);
    expect(d.rounds.map((r) => r.partial)).toEqual([31, 79, 72]);
    expect(d.remainder).toBe(0);
  });

  it('writes a zero digit when the partial is too small', () => {
    const d = numberDivide(612, 6);
    expect(d.rounds.map((r) => r.digit)).toEqual([1, 0, 2]);
  });
});
