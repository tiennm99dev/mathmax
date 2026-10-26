import { describe, it, expect } from 'vitest';
import {
  DIVIDENDS,
  dividend,
  divideMono,
  divisionRows,
  largestVars,
  multiplyBack,
  quotSumTex,
  quotTex,
  quotText,
  quotientOf,
} from './engine.js';
import { collect, mono, parsePoly, polyText } from '../_shared/poly.js';

describe('monomial division', () => {
  it('divides coefficients and subtracts exponents', () => {
    const r = divideMono(mono(12, { x: 4, y: 3 }), mono(-3, { x: 2, y: 1 }));
    expect(r.ok).toBe(true);
    expect(r.quotient).toEqual({ n: -4, d: 1, vars: { x: 2, y: 2 } });
  });

  it('keeps fractional coefficients in lowest terms', () => {
    const r = divideMono(mono(3, { x: 2, y: 1 }), mono(2, { x: 1, y: 1 }));
    expect(r.quotient).toEqual({ n: 3, d: 2, vars: { x: 1 } });
    expect(quotTex(/** @type {any} */ (r.quotient))).toBe('\\frac{3}{2}x');
    expect(quotText(/** @type {any} */ (r.quotient))).toBe('3/2 x');
  });

  it('refuses when a variable of the divisor has a larger exponent', () => {
    const r = divideMono(mono(5, { x: 3 }), mono(1, { x: 1, y: 1 }));
    expect(r.ok).toBe(false);
    expect(r.quotient).toBeNull();
    expect(r.checks).toEqual([
      { name: 'x', top: 3, bottom: 1, ok: true },
      { name: 'y', top: 0, bottom: 1, ok: false },
    ]);
  });

  it('divides anything by a non-zero constant', () => {
    expect(divideMono(mono(-4, { y: 2 }), mono(-2)).quotient).toEqual({
      n: 2,
      d: 1,
      vars: { y: 2 },
    });
    expect(() => divideMono(mono(1, { x: 1 }), mono(0))).toThrow();
  });
});

describe('polynomial division table', () => {
  const cases = [
    { a: 0, b: mono(3, { x: 2, y: 2 }), q: '2x - 3y + 4' },
    { a: 1, b: mono(-2, { x: 2, y: 1 }), q: '3xy - 2y^{2} - x^{2}' },
    { a: 2, b: mono(2, { x: 2, y: 1 }), q: '2x^{2} - 4xy + 1' },
    { a: 3, b: mono(5, { x: 1 }), q: 'x^{2} - 2xy + 3y^{2}' },
  ];

  it('gives the quotients the lesson states and multiplies back to the dividend', () => {
    for (const c of cases) {
      const rows = divisionRows(dividend(c.a), c.b);
      const q = quotientOf(rows);
      expect(q, DIVIDENDS[c.a]).not.toBeNull();
      expect(quotSumTex(/** @type {any} */ (q))).toBe(c.q);
      expect(polyText(multiplyBack(/** @type {any} */ (q), c.b))).toBe(polyText(dividend(c.a)));
    }
  });

  it('is not divisible when one term fails', () => {
    const rows = divisionRows(parsePoly('x^2y + 3x'), mono(1, { x: 1, y: 1 }));
    expect(rows.map((r) => r.ok)).toEqual([true, false]);
    expect(quotientOf(rows)).toBeNull();
  });

  it('finds the divisor of highest degree', () => {
    expect(DIVIDENDS.map((_, i) => largestVars(dividend(i)))).toEqual([
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 0 },
    ]);
    for (let i = 0; i < DIVIDENDS.length; i++) {
      const terms = dividend(i);
      expect(quotientOf(divisionRows(terms, mono(7, largestVars(terms))))).not.toBeNull();
      expect(collect(terms)).toHaveLength(terms.length);
    }
  });
});
