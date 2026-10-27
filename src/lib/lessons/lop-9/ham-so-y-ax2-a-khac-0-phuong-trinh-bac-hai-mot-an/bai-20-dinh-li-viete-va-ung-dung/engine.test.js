import { describe, it, expect } from 'vitest';
import { solveQuadratic } from '../_shared/quadratic.js';
import { CHALLENGES, coefficients, equationTex, quickRootNote, vieteTex } from './engine.js';

describe('Viète from the roots', () => {
  it('builds the coefficients', () => {
    expect(coefficients(1, 4, -1)).toEqual({ a: 1, b: -3, c: -4 });
    expect(coefficients(2, 0.5, 3)).toEqual({ a: 2, b: -7, c: 3 });
    expect(equationTex(-1, 2, 3)).toBe('-x^{2} + 5x - 6 = 0');
  });

  it('the built equation has exactly the chosen roots, with S = −b/a and P = c/a', () => {
    for (const a of [1, 2, -1])
      for (let x1 = -5; x1 <= 5; x1 += 0.5)
        for (let x2 = -5; x2 <= 5; x2 += 0.5) {
          const { b, c } = coefficients(a, x1, x2);
          const { roots } = solveQuadratic(a, b, c);
          expect(roots).toEqual([Math.max(x1, x2), Math.min(x1, x2)]);
          expect(Math.abs(-b / a - (x1 + x2))).toBeLessThan(1e-9);
          expect(Math.abs(c / a - x1 * x2)).toBeLessThan(1e-9);
        }
  });

  it('writes the two readings of S and P', () => {
    expect(vieteTex(1, 4, -1)).toEqual([
      'x_1 + x_2 = 4 + (-1) = 3',
      '-\\dfrac{b}{a} = -\\dfrac{-3}{1} = 3',
      'x_1 x_2 = 4 \\cdot (-1) = -4',
      '\\dfrac{c}{a} = \\dfrac{-4}{1} = -4',
    ]);
  });

  it('notices a + b + c = 0 and a − b + c = 0', () => {
    expect(quickRootNote(2, -7, 5)).toContain('x₂ = c/a = 2,5');
    expect(quickRootNote(1, 3, 2)).toContain('x₁ = −1');
    expect(quickRootNote(1, -5, 6)).toBe('');
  });

  it('every challenge is reachable on the half-unit grid', () => {
    for (const ch of CHALLENGES) {
      let ok = false;
      for (let x1 = -5; x1 <= 5; x1 += 0.5)
        for (let x2 = -5; x2 <= 5; x2 += 0.5) if (ch.test(x1, x2)) ok = true;
      expect(ok, ch.text).toBe(true);
    }
  });
});
