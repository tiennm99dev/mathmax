import { describe, it, expect } from 'vitest';
import {
  blockCopies,
  expansion,
  isSquare,
  power,
  powerLine,
  productModel,
  quotientModel,
} from './engine.js';

describe('power and expansion', () => {
  it('multiplies n equal factors', () => {
    expect(power(2, 10)).toBe(1024);
    expect(power(3, 4)).toBe(81);
    expect(power(7, 1)).toBe(7);
    expect(power(5, 0)).toBe(1);
    expect(expansion(2, 4)).toBe('2 · 2 · 2 · 2');
    expect(expansion(2, 0)).toBe('1');
  });

  it('leaves 0⁰ and negative exponents undefined', () => {
    expect(() => power(0, 0)).toThrow(RangeError);
    expect(() => power(2, -1)).toThrow(RangeError);
  });

  it('writes one line of the machine', () => {
    expect(powerLine(2, 4)).toBe('2⁴ = 2 · 2 · 2 · 2 = 16');
    expect(powerLine(3, 1)).toBe('3¹ = 3');
    expect(powerLine(3, 0)).toBe('3⁰ = 1 (quy ước)');
  });
});

describe('blockCopies', () => {
  it('splits aⁿ blocks into a copies of aⁿ⁻¹', () => {
    expect(blockCopies(2, 3)).toEqual([0, 0, 0, 0, 1, 1, 1, 1]);
    const c = blockCopies(3, 2);
    expect(c).toHaveLength(9);
    expect(c.filter((x) => x === 2)).toHaveLength(3);
    expect(blockCopies(2, 0)).toEqual([0]);
  });
});

describe('product and quotient of powers', () => {
  it('adds exponents when multiplying', () => {
    for (let m = 0; m <= 5; m++) {
      for (let n = 0; n <= 5; n++) {
        const p = productModel(3, m, n);
        expect(p.left * p.right).toBe(p.value);
        expect(p.factors).toHaveLength(m + n);
      }
    }
    expect(productModel(2, 3, 2).equation).toBe('2³ · 2² = 2⁵');
  });

  it('subtracts exponents when dividing', () => {
    const q = quotientModel(2, 5, 2);
    expect(q.exponent).toBe(3);
    expect(q.value).toBe(8);
    expect(q.factors.filter((f) => f === 'cancelled')).toHaveLength(2);
    expect(quotientModel(3, 4, 4).value).toBe(1);
    expect(() => quotientModel(2, 2, 3)).toThrow(RangeError);
    expect(() => quotientModel(0, 2, 1)).toThrow(RangeError);
  });
});

describe('isSquare', () => {
  it('recognises perfect squares', () => {
    expect([0, 1, 4, 9, 16, 100, 144].every(isSquare)).toBe(true);
    expect([2, 3, 8, 15, 99].some(isSquare)).toBe(false);
  });
});
