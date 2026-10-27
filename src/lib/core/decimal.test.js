import { describe, it, expect } from 'vitest';
import {
  answerText,
  decimalTex,
  decimalText,
  digitAt,
  digitsText,
  expand,
  isFiniteDecimal,
  isSquare,
  numberText,
  primeFactors,
  readNumber,
  roundFraction,
  roundSqrt,
  scaledText,
  scaledValue,
  sqrtFloor,
} from './decimal.js';
import { GROUP } from './number-format.js';

describe('expand', () => {
  it('finds the remainders and the period of a repeating decimal', () => {
    const e = expand(5, 11);
    expect(e.whole).toBe(0);
    expect(e.digits).toEqual([4, 5]);
    expect(e.remainders).toEqual([5, 6]);
    expect(e.start).toBe(0);
    expect(e.period).toBe(2);
  });

  it('separates the digits before the period', () => {
    const e = expand(1, 6);
    expect(e.digits).toEqual([1, 6]);
    expect(e.start).toBe(1);
    expect(e.period).toBe(1);
  });

  it('stops on a zero remainder for a finite decimal', () => {
    const e = expand(-13, 8);
    expect(e.negative).toBe(true);
    expect(e.whole).toBe(1);
    expect(e.digits).toEqual([6, 2, 5]);
    expect(e.period).toBe(0);
  });

  it('rejects a zero or fractional denominator', () => {
    expect(() => expand(1, 0)).toThrow();
    expect(() => expand(1.5, 2)).toThrow();
  });
});

describe('decimal text', () => {
  it('writes the period in brackets with a decimal comma', () => {
    expect(decimalText(5, 11)).toBe('0,(45)');
    expect(decimalText(-1, 6)).toBe('−0,1(6)');
    expect(decimalText(1, 7)).toBe('0,(142857)');
    expect(decimalText(5, 4)).toBe('1,25');
    expect(decimalText(6, 3)).toBe('2');
    expect(decimalText(0, 5)).toBe('0');
    expect(decimalText(1, 11)).toBe('0,(09)');
    expect(decimalTex(-1, 6)).toBe('-0{,}1(6)');
  });

  it('writes the digits out in full', () => {
    expect(digitsText(5, 11, 6)).toBe('0,454545');
    expect(digitsText(-1, 3, 4)).toBe('−0,3333');
  });

  it('agrees with floating point on many fractions', () => {
    for (let q = 1; q <= 60; q++) {
      for (let p = -70; p <= 70; p++) {
        const value = p / q;
        let built = 0;
        for (let n = 1; n <= 12; n++) built += digitAt(p, q, n) / 10 ** n;
        const e = expand(p, q);
        expect((e.whole + built) * (e.negative ? -1 : 1)).toBeCloseTo(value, 10);
      }
    }
  });
});

describe('finite decimals', () => {
  it('match denominators with only the prime factors 2 and 5', () => {
    for (let q = 1; q <= 200; q++) {
      for (const p of [1, 3, 7, 12]) {
        let g = p;
        let d = q;
        for (let k = 2; k <= Math.min(p, q); k++) {
          while (g % k === 0 && d % k === 0) {
            g /= k;
            d /= k;
          }
        }
        const only25 = primeFactors(d).every((f) => f === 2 || f === 5);
        expect(isFiniteDecimal(p, q)).toBe(d === 1 || only25);
      }
    }
  });

  it('lists prime factors once each', () => {
    expect(primeFactors(12)).toEqual([2, 3]);
    expect(primeFactors(40)).toEqual([2, 5]);
    expect(primeFactors(97)).toEqual([97]);
  });
});

describe('rounding', () => {
  it('rounds by the next digit', () => {
    expect(roundFraction(5, 11, 2)).toBe(45);
    expect(roundFraction(5, 11, 1)).toBe(5);
    expect(roundFraction(2, 3, 2)).toBe(67);
    expect(roundFraction(-2, 3, 1)).toBe(-7);
    expect(roundFraction(1, 8, 2)).toBe(13);
    expect(roundFraction(7, 2, 0)).toBe(4);
    expect(roundFraction(35, 9, 0)).toBe(4);
  });

  it('writes a scaled integer with its places', () => {
    expect(scaledText(45, 2)).toBe('0,45');
    expect(scaledText(-3, 1)).toBe('−0,3');
    expect(scaledText(250, 2)).toBe('2,50');
    expect(scaledText(7, 0)).toBe('7');
    expect(scaledValue(141, 2)).toBe(1.41);
  });
});

describe('square roots', () => {
  it('finds exact floors of square roots', () => {
    expect(sqrtFloor(2, 3)).toBe(1414);
    expect(sqrtFloor(3, 4)).toBe(17320);
    expect(sqrtFloor(49, 2)).toBe(700);
    expect(sqrtFloor(1000, 4)).toBe(316227);
  });

  it('rounds square roots by the next digit', () => {
    expect(roundSqrt(2, 2)).toBe(141);
    expect(roundSqrt(3, 2)).toBe(173);
    expect(roundSqrt(5, 3)).toBe(2236);
    expect(roundSqrt(8, 1)).toBe(28);
    expect(roundSqrt(10, 2)).toBe(316);
  });

  it('knows perfect squares', () => {
    expect(isSquare(0)).toBe(true);
    expect(isSquare(81)).toBe(true);
    expect(isSquare(50)).toBe(false);
  });
});

describe('reading and writing answers', () => {
  it('reads integers, fractions and decimals', () => {
    expect(readNumber('−7')).toBe(-7);
    expect(readNumber('3/-4')).toBe(-0.75);
    expect(readNumber('0,75')).toBe(0.75);
    expect(readNumber(' 1.41 ')).toBe(1.41);
    expect(readNumber('2/3')).toBe(2 / 3);
    expect(readNumber('1/0')).toBeNull();
    expect(readNumber('abc')).toBeNull();
    expect(readNumber('')).toBeNull();
  });

  it('gives the same double for equal numbers', () => {
    expect(readNumber('0,450')).toBe(scaledValue(45, 2));
    expect(readNumber('9/20')).toBe(0.45);
  });

  it('writes finite decimals with a comma and other values as fractions', () => {
    expect(numberText(-2.5)).toBe('−2,5');
    expect(numberText(0.45)).toBe('0,45');
    expect(numberText(7)).toBe('7');
    expect(numberText(2 / 3)).toBe('2/3');
    expect(numberText(-5 / 6)).toBe('−5/6');
  });
});

describe('answerText', () => {
  it('groups natural numbers and writes other answers with a decimal comma', () => {
    expect(answerText(12000)).toBe(`12${GROUP}000`);
    expect(answerText(7.5)).toBe('7,5');
    expect(answerText(-2)).toBe('−2');
  });
});
