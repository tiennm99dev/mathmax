import { describe, expect, it } from 'vitest';
import {
  add,
  commonDenominator,
  compare,
  div,
  equals,
  expand,
  format,
  fraction,
  fromDecimal,
  fromMixed,
  isSimplest,
  mul,
  simplify,
  sub,
  toMixed,
  toNumber,
  toTex,
} from './fraction.js';

describe('fraction', () => {
  it('keeps the denominator positive without reducing', () => {
    expect(fraction(2, 4)).toEqual({ n: 2, d: 4 });
    expect(fraction(3, -4)).toEqual({ n: -3, d: 4 });
    expect(fraction(-3, -4)).toEqual({ n: 3, d: 4 });
    expect(fraction(5)).toEqual({ n: 5, d: 1 });
  });

  it('rejects a zero denominator and non-integers', () => {
    expect(() => fraction(1, 0)).toThrow();
    expect(() => fraction(1.5, 2)).toThrow();
  });
});

describe('simplify and equality', () => {
  it('reduces to lowest terms', () => {
    expect(simplify(fraction(6, 8))).toEqual({ n: 3, d: 4 });
    expect(simplify(fraction(0, 5))).toEqual({ n: 0, d: 1 });
    expect(simplify(fraction(-10, 4))).toEqual({ n: -5, d: 2 });
  });

  it('knows lowest terms', () => {
    expect(isSimplest(fraction(3, 4))).toBe(true);
    expect(isSimplest(fraction(2, 4))).toBe(false);
  });

  it('treats equivalent fractions as equal', () => {
    expect(equals(fraction(1, 2), fraction(3, 6))).toBe(true);
    expect(equals(fraction(1, 2), fraction(2, 3))).toBe(false);
    expect(equals(expand(fraction(2, 3), 4), fraction(8, 12))).toBe(true);
  });

  it('orders fractions', () => {
    expect(compare(fraction(1, 3), fraction(1, 2))).toBe(-1);
    expect(compare(fraction(3, 4), fraction(2, 3))).toBe(1);
    expect(compare(fraction(2, 4), fraction(1, 2))).toBe(0);
    expect(compare(fraction(-1, 2), fraction(1, 3))).toBe(-1);
  });

  it('rewrites over the least common denominator', () => {
    expect(commonDenominator(fraction(1, 4), fraction(1, 6))).toEqual([
      { n: 3, d: 12 },
      { n: 2, d: 12 },
    ]);
  });
});

describe('arithmetic', () => {
  it('adds and subtracts in lowest terms', () => {
    expect(add(fraction(1, 4), fraction(1, 6))).toEqual({ n: 5, d: 12 });
    expect(add(fraction(1, 2), fraction(1, 2))).toEqual({ n: 1, d: 1 });
    expect(sub(fraction(1, 2), fraction(3, 4))).toEqual({ n: -1, d: 4 });
  });

  it('multiplies and divides in lowest terms', () => {
    expect(mul(fraction(2, 3), fraction(3, 4))).toEqual({ n: 1, d: 2 });
    expect(div(fraction(2, 3), fraction(4, 9))).toEqual({ n: 3, d: 2 });
    expect(div(fraction(1, 2), fraction(-1, 4))).toEqual({ n: -2, d: 1 });
    expect(() => div(fraction(1, 2), fraction(0, 3))).toThrow();
  });

  it('converts to a number', () => {
    expect(toNumber(fraction(3, 4))).toBe(0.75);
  });
});

describe('mixed numbers', () => {
  it('splits an improper fraction', () => {
    expect(toMixed(fraction(7, 3))).toEqual({ whole: 2, n: 1, d: 3 });
    expect(toMixed(fraction(-7, 3))).toEqual({ whole: -2, n: 1, d: 3 });
    expect(toMixed(fraction(-3, 4))).toEqual({ whole: 0, n: -3, d: 4 });
    expect(toMixed(fraction(8, 4))).toEqual({ whole: 2, n: 0, d: 1 });
  });

  it('round-trips through fromMixed', () => {
    for (const f of [fraction(7, 3), fraction(-7, 3), fraction(5, 2), fraction(1, 5)]) {
      const m = toMixed(f);
      const back = m.whole === 0 ? fraction(m.n, m.d) : fromMixed(m.whole, m.n, m.d);
      expect(equals(back, f)).toBe(true);
    }
  });
});

describe('fromDecimal', () => {
  it('turns finite decimals into reduced fractions', () => {
    expect(fromDecimal(0.75)).toEqual({ n: 3, d: 4 });
    expect(fromDecimal('3,25')).toEqual({ n: 13, d: 4 });
    expect(fromDecimal(-2.5)).toEqual({ n: -5, d: 2 });
    expect(fromDecimal(4)).toEqual({ n: 4, d: 1 });
    expect(fromDecimal('.5')).toEqual({ n: 1, d: 2 });
  });

  it('rejects text that is not a decimal', () => {
    expect(() => fromDecimal('1/2')).toThrow();
    expect(() => fromDecimal('')).toThrow();
  });
});

describe('formatting', () => {
  it('writes plain text and TeX', () => {
    expect(format(fraction(3, 4))).toBe('3/4');
    expect(format(fraction(-3, 4))).toBe('−3/4');
    expect(format(fraction(5, 1))).toBe('5');
    expect(toTex(fraction(3, 4))).toBe('\\frac{3}{4}');
    expect(toTex(fraction(-3, 4))).toBe('-\\frac{3}{4}');
  });
});
