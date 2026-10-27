import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  build,
  clearedText,
  clearingTex,
  conclusion,
  conditionMatches,
  conditionTex,
  equationTex,
  equationText,
  excluded,
  isAllowed,
  makeProblem,
  productTex,
  reason,
  solutions,
} from './engine.js';

/**
 * Whether x satisfies the original equation, checked with exact integers:
 * x/(x − a) − c/(x − b) = n/((x − a)(x − b)).
 * @param {import('./engine.js').Problem} p
 * @param {number} x
 */
function satisfies(p, x) {
  const da = x - p.a;
  const db = x - p.b;
  if (da === 0 || db === 0) return false;
  return x * db - p.c * da === p.n;
}

describe('equations with the unknown in the denominator', () => {
  it('builds a problem with one rejected root', () => {
    const p = build(2, -1, 2, 4);
    if (!p) throw new Error('expected a problem');
    expect(p).toEqual({ a: 2, b: -1, c: 7, n: 6, roots: [2, 4] });
    expect(solutions(p)).toEqual([4]);
    expect(isAllowed(p, 2)).toBe(false);
    expect(reason(p, 2)).toBe('x = 2 làm mẫu x − 2 bằng 0, không thoả mãn ĐKXĐ: loại.');
    expect(reason(p, 4)).toBe('x = 4 khác 2 và −1, thoả mãn ĐKXĐ: nhận.');
    expect(conclusion(p)).toBe('Phương trình có một nghiệm x = 4.');
    expect(conditionTex(p)).toBe('x \\ne -1 \\text{ và } x \\ne 2');
    expect(equationTex(p)).toBe('\\frac{x}{x - 2} - \\frac{7}{x + 1} = \\frac{6}{(x - 2)(x + 1)}');
  });

  it('refuses degenerate problems', () => {
    expect(build(1, 1, 2, 3)).toBeNull();
    expect(build(1, 2, 3, 3)).toBeNull();
    // c = r1 + r2 − b = 0
    expect(build(1, 5, 2, 3)).toBeNull();
  });

  it('writes signs and a bare x the book way', () => {
    const p = build(2, 0, -1, 4);
    if (!p) throw new Error('expected a problem');
    expect(p).toEqual({ a: 2, b: 0, c: 3, n: 10, roots: [-1, 4] });
    expect(equationTex(p)).toBe('\\frac{x}{x - 2} - \\frac{3}{x} = \\frac{10}{x(x - 2)}');
    expect(equationText(p)).toBe('x/(x − 2) − 3/x = 10/(x(x − 2))');
    expect(clearingTex(p)).toEqual([
      '\\text{MTC: } x(x - 2)',
      'x^2 - 3(x - 2) = 10',
      'x^2 - 3x - 4 = 0',
      '(x + 1)(x - 4) = 0',
    ]);
    expect(clearedText(p)).toBe('x² − 3(x − 2) = 10');
    const q = build(3, 1, -2, 1);
    if (!q) throw new Error('expected a problem');
    // c = −2 + 1 − 1 = −2, n = −6 + 2 = −4
    expect(equationTex(q)).toBe('\\frac{x}{x - 3} + \\frac{2}{x - 1} = -\\frac{4}{(x - 3)(x - 1)}');
    expect(productTex(0, 5)).toBe('x(x - 5)');
  });

  it('generates problems whose kept roots solve the equation and whose thrown-out roots do not', () => {
    const rand = rng(99);
    let rejected = 0;
    let empty = 0;
    for (let i = 0; i < 2000; i++) {
      const p = makeProblem(rand);
      expect(p.a).not.toBe(p.b);
      expect(p.a).not.toBe(0);
      expect(p.c).not.toBe(0);
      expect(p.n).not.toBe(0);
      // The cleared equation x² − (b + c)x + (ca − n) = 0 has exactly the two roots.
      for (const r of p.roots) {
        expect(r * r - (p.b + p.c) * r + (p.c * p.a - p.n)).toBe(0);
      }
      for (const r of p.roots) {
        expect(satisfies(p, r)).toBe(isAllowed(p, r));
      }
      // No other integer in a wide range solves it.
      const sol = solutions(p);
      for (let x = -30; x <= 30; x++) {
        expect(satisfies(p, x)).toBe(sol.includes(x));
      }
      expect(conditionMatches(p, excluded(p))).toBe(true);
      expect(conditionMatches(p, [p.a])).toBe(false);
      if (sol.length < 2) rejected++;
      if (sol.length === 0) empty++;
    }
    expect(rejected).toBeGreaterThan(800);
    expect(empty).toBeGreaterThan(0);
  });

  it('concludes with no solution when both roots break the condition', () => {
    const p = build(4, -2, 4, -2);
    if (!p) throw new Error('expected a problem');
    expect(solutions(p)).toEqual([]);
    expect(conclusion(p)).toBe('Cả hai giá trị đều bị loại: phương trình vô nghiệm.');
  });
});
