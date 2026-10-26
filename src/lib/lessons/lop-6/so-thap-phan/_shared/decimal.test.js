import { describe, it, expect } from 'vitest';
import {
  decStr,
  decValue,
  decimalFraction,
  decimalsOf,
  readDecimal,
  valueText,
} from './decimal.js';

describe('decStr', () => {
  it('writes the book way', () => {
    expect(decStr(1250, 3)).toBe('1,25');
    expect(decStr(-5, 2)).toBe('−0,05');
    expect(decStr(240, 1, true)).toBe('24,0');
    expect(decStr(1234567, 1)).toBe('123 456,7');
    expect(decStr(0, 3)).toBe('0');
    expect(decStr(7, 0)).toBe('7');
  });

  it('refuses a non-integer', () => {
    expect(() => decStr(1.5, 1)).toThrow();
  });
});

describe('reading and values', () => {
  it('agrees with what a learner types', () => {
    for (const [n, k] of [
      [35, 1],
      [-125, 2],
      [3142, 3],
      [7, 1],
      [-30, 2],
      [1001, 3],
    ]) {
      expect(readDecimal(decStr(n, k))).toBe(decValue(n, k));
    }
    expect(readDecimal('3.5')).toBe(3.5);
    expect(readDecimal('-0,25')).toBe(-0.25);
    expect(readDecimal('2 cm')).toBeNull();
    expect(readDecimal('abc')).toBeNull();
  });

  it('writes number values with at most six decimals', () => {
    expect(valueText(0.1 + 0.2)).toBe('0,3');
    expect(valueText(-12.5)).toBe('−12,5');
  });

  it('finds the decimal fraction', () => {
    expect(decimalsOf(1250, 3)).toBe(2);
    expect(decimalFraction(1250, 3)).toEqual({ num: 125, den: 100 });
    expect(decimalFraction(-3000, 3)).toEqual({ num: -3, den: 1 });
  });
});
