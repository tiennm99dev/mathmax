import { describe, it, expect } from 'vitest';
import { mul } from '../_shared/poly.js';
import { PRODUCTS, cellTex, grid, productTex, sumCells, timesTerm } from './engine.js';

describe('multiplication grid', () => {
  it('multiplies two terms', () => {
    expect(timesTerm({ c: -3, e: 2 }, { c: 2, e: 1 })).toEqual({ c: -6, e: 3 });
  });

  it('adds up to the product for every preset', () => {
    for (const { p, q } of PRODUCTS) {
      expect(sumCells(grid(p, q).cells)).toEqual(mul(p, q));
    }
  });

  it('lays out (2x + 3)(x − 1)', () => {
    const g = grid([3, 2], [-1, 1]);
    expect(g.cells).toEqual([
      [
        { c: 2, e: 2 },
        { c: -2, e: 1 },
      ],
      [
        { c: 3, e: 1 },
        { c: -3, e: 0 },
      ],
    ]);
    expect(sumCells(g.cells)).toEqual([-3, 1, 2]); // 2x² + x − 3
  });

  it('cancels the middle terms of (x − 2)(x² + 2x + 4)', () => {
    expect(sumCells(grid([-2, 1], [4, 2, 1]).cells)).toEqual([-8, 0, 0, 1]);
  });

  it('writes one cell', () => {
    expect(cellTex({ c: 2, e: 1 }, { c: -1, e: 1 })).toBe('2x \\cdot (-x) = -2x^{2}');
    expect(cellTex({ c: -2, e: 0 }, { c: 4, e: 0 })).toBe('(-2) \\cdot 4 = -8');
  });

  it('writes the product', () => {
    expect(productTex([0, 2], [5, -1, 3])).toBe('2x \\cdot (3x^{2} - x + 5)');
    expect(productTex([3, 2], [-1, 1])).toBe('(2x + 3)(x - 1)');
  });
});
