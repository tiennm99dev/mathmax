import { describe, it, expect } from 'vitest';
import { planeScale } from '#lib/core/visuals/svg-math.js';
import {
  curvePath,
  discriminant,
  isPerfectSquare,
  quadTex,
  quadText,
  solveQuadratic,
  texOperand,
} from './quadratic.js';

describe('solveQuadratic', () => {
  it('finds two distinct roots, larger first', () => {
    expect(solveQuadratic(1, -5, 6)).toEqual({ delta: 1, count: 2, roots: [3, 2] });
    expect(solveQuadratic(-2, 0, 8)).toEqual({ delta: 64, count: 2, roots: [2, -2] });
  });

  it('finds a double root', () => {
    expect(solveQuadratic(4, -4, 1)).toEqual({ delta: 0, count: 1, roots: [0.5, 0.5] });
  });

  it('reports no real root when Δ < 0', () => {
    expect(solveQuadratic(1, 1, 1)).toEqual({ delta: -3, count: 0, roots: [] });
  });

  it('every root satisfies the equation', () => {
    for (let a = -3; a <= 3; a += 0.5) {
      if (a === 0) continue;
      for (let b = -6; b <= 6; b++) {
        for (let c = -6; c <= 6; c++) {
          for (const x of solveQuadratic(a, b, c).roots) {
            expect(Math.abs(a * x * x + b * x + c)).toBeLessThan(1e-6);
          }
        }
      }
    }
  });

  it('refuses a = 0', () => {
    expect(() => solveQuadratic(0, 1, 1)).toThrow();
  });
});

describe('writers', () => {
  it('writes the equation the book way', () => {
    expect(quadTex(2, -5, 3)).toBe('2x^{2} - 5x + 3');
    expect(quadTex(-1, 0, 4)).toBe('-x^{2} + 4');
    expect(quadText(1, -1, 0)).toBe('x² − x');
    expect(texOperand(-3)).toBe('(-3)');
    expect(texOperand(2.5)).toBe('2{,}5');
  });

  it('computes Δ and recognises squares', () => {
    expect(discriminant(1, -2, -3)).toBe(16);
    expect(isPerfectSquare(16)).toBe(true);
    expect(isPerfectSquare(17)).toBe(false);
    expect(isPerfectSquare(-4)).toBe(false);
  });
});

describe('curvePath', () => {
  it('breaks the path where the curve leaves the plane', () => {
    const plane = planeScale({ xMin: -5, xMax: 5, yMin: -5, yMax: 5 });
    const d = curvePath((x) => 3 * x * x, plane);
    expect(d.startsWith('M')).toBe(true);
    expect(d.split('M').length - 1).toBe(1);
    const flat = curvePath((x) => x, plane);
    expect(flat.split('M').length - 1).toBe(1);
  });
});
