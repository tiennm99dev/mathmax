import { describe, it, expect } from 'vitest';
import { product, quotient, tiles } from './engine.js';

describe('product', () => {
  it('multiplies numerators and denominators, then reduces', () => {
    expect(product(2, 3, 3, 4)).toEqual({ raw: { n: 6, d: 12 }, simple: { n: 1, d: 2 } });
    expect(product(-3, 5, 10, 7).simple).toEqual({ n: -6, d: 7 });
  });
});

describe('quotient', () => {
  it('multiplies by the reciprocal', () => {
    expect(quotient(3, 4, 1, 8)).toEqual({ raw: { n: 24, d: 4 }, simple: { n: 6, d: 1 } });
    expect(quotient(2, 3, -4, 9).simple).toEqual({ n: -3, d: 2 });
  });

  it('refuses to divide by zero', () => {
    expect(() => quotient(1, 2, 0, 3)).toThrow();
  });
});

describe('tiles', () => {
  it('fits 6 copies of 1/8 in 3/4', () => {
    const t = tiles(3, 4, 1, 8);
    expect(t.length).toBe(6);
    expect(t.every((x) => x.part === 1)).toBe(true);
  });

  it('ends with a part tile when the quotient is not whole', () => {
    // 1/2 : 1/3 = 3/2: one full third and half of another
    const t = tiles(1, 2, 1, 3);
    expect(t.length).toBe(2);
    expect(t[1].part).toBe(1 / 2);
    expect(t[1].to).toBe(1 / 2);
  });

  it('adds up to the quotient for every small case', () => {
    for (let b = 2; b <= 6; b++)
      for (let a = 1; a <= 2 * b; a++)
        for (let d = 2; d <= 6; d++)
          for (let c = 1; c <= d; c++) {
            const count = tiles(a, b, c, d).reduce((s, x) => s + x.part, 0);
            expect(count).toBeCloseTo((a * d) / (b * c), 10);
          }
  });
});
