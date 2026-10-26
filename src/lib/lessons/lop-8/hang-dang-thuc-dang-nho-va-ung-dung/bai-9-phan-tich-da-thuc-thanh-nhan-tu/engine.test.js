import { describe, it, expect } from 'vitest';
import { PUZZLES, arrange, factorTex, groupingTex, polyTex, solutions } from './engine.js';

describe('area tiles for x² + px + q', () => {
  it('makes a rectangle only when the corner holds every unit square', () => {
    const puzzle = { p: 5, q: 6 };
    expect(arrange(puzzle, 2)).toMatchObject({ n: 3, corner: 6, status: 'ok' });
    expect(arrange(puzzle, 1)).toMatchObject({ n: 4, corner: 4, status: 'short', leftover: 2 });
    expect(arrange(puzzle, 0)).toMatchObject({ n: 5, corner: 0, status: 'short', leftover: 6 });
    expect(arrange({ p: 3, q: 0 }, 1)).toMatchObject({ status: 'over', missing: 2 });
  });

  it('keeps m between 0 and p', () => {
    expect(arrange({ p: 4, q: 4 }, 9).m).toBe(4);
    expect(arrange({ p: 4, q: 4 }, -1).m).toBe(0);
  });

  it('gives every puzzle a rectangle whose sides multiply back to it', () => {
    for (const pz of PUZZLES) {
      const sols = solutions(pz);
      expect(sols.length).toBeGreaterThan(0);
      for (const [m, n] of sols) {
        // (x + m)(x + n) = x² + (m + n)x + mn
        expect(m + n).toBe(pz.p);
        expect(m * n).toBe(pz.q);
      }
    }
  });

  it('writes the polynomial, the factors and the grouping', () => {
    expect(polyTex({ p: 5, q: 6 })).toBe('x^2 + 5x + 6');
    expect(polyTex({ p: 3, q: 0 })).toBe('x^2 + 3x');
    expect(factorTex(2, 3)).toBe('(x + 2)(x + 3)');
    expect(factorTex(2, 2)).toBe('(x + 2)^2');
    expect(factorTex(0, 3)).toBe('x(x + 3)');
    expect(factorTex(3, 0)).toBe('x(x + 3)');
    expect(groupingTex(2, 3).join(' ')).toContain('x(x + 2) + 3(x + 2)');
    expect(groupingTex(3, 1).join(' ')).toContain('x(x + 3) + (x + 3)');
    expect(groupingTex(0, 3)[0]).toContain('x(x + 3)');
  });
});
