import { describe, it, expect } from 'vitest';
import { PRODUCTS, cells, factors, likeGroups, product } from './engine.js';
import { evalPoly, monoText, polyText } from '../_shared/poly.js';

describe('area model', () => {
  it('fills every cell with a row term times a column term', () => {
    const { a, b } = factors(PRODUCTS[2]);
    const list = cells(a, b);
    expect(list).toHaveLength(6);
    expect(list.map((c) => monoText(c.p))).toEqual(['2x²', '2xy', '8x', '−3xy', '−3y²', '−12y']);
  });

  it('colours like products together', () => {
    const { a, b } = factors(PRODUCTS[2]);
    expect(likeGroups(cells(a, b))).toEqual([-1, 0, -1, 0, -1, -1]);
    const r = factors(PRODUCTS[3]);
    // x²y and xy² each appear twice and cancel.
    expect(likeGroups(cells(r.a, r.b))).toEqual([-1, 0, 1, 0, 1, -1]);
  });

  it('gives the products the lesson states', () => {
    expect(PRODUCTS.map((p) => polyText(product(p)))).toEqual([
      '6x³ − 10x²y + 2x',
      'x² + xy − 2y²',
      '2x² − xy + 8x − 3y² − 12y',
      'x³ + y³',
    ]);
  });

  it('matches the product of the values at sample points', () => {
    for (const item of PRODUCTS) {
      const { a, b } = factors(item);
      for (const v of [
        { x: 3, y: -2 },
        { x: -1, y: 5 },
      ]) {
        expect(evalPoly(product(item), v)).toBe(evalPoly(a, v) * evalPoly(b, v));
      }
    }
  });
});
