import { describe, it, expect } from 'vitest';
import { fraction } from '#lib/fraction-engine/index.js';
import {
  decText,
  fracText,
  isFiniteDecimal,
  readValue,
  readWritten,
  texDec,
  texFrac,
  valueText,
  writtenTex,
} from './rational.js';

describe('rational writing', () => {
  it('puts the sign on the numerator', () => {
    expect(fracText(fraction(3, -4))).toBe('−3/4');
    expect(fracText(fraction(6, 3))).toBe('6/3');
    expect(fracText(fraction(-5, 1))).toBe('−5');
    expect(texFrac(fraction(3, -4))).toBe('\\frac{-3}{4}');
  });

  it('writes decimals with a comma', () => {
    expect(decText(fraction(-3, 4))).toBe('−0,75');
    expect(texDec(fraction(-3, 4))).toBe('-0{,}75');
    expect(writtenTex({ f: fraction(5, 2), form: 'dec' })).toBe('2{,}5');
  });

  it('knows which fractions are finite decimals', () => {
    expect(isFiniteDecimal(fraction(3, 40))).toBe(true);
    expect(isFiniteDecimal(fraction(6, 15))).toBe(true);
    expect(isFiniteDecimal(fraction(1, 3))).toBe(false);
  });

  it('shows an answer as a fraction and its decimal', () => {
    expect(valueText(0.75)).toBe('3/4 = 0,75');
    expect(valueText(-2 / 3)).toBe('−2/3');
    expect(valueText(-2)).toBe('−2');
  });
});

describe('reading learner input', () => {
  it('reads fractions, integers and decimals', () => {
    expect(readWritten('-3/4')).toEqual({ f: { n: -3, d: 4 }, form: 'frac' });
    expect(readWritten('3/-4')?.f).toEqual({ n: -3, d: 4 });
    expect(readWritten('−0,75')).toEqual({ f: { n: -75, d: 100 }, form: 'dec' });
    expect(readWritten('12')?.form).toBe('int');
    expect(readWritten('1/0')).toBeNull();
    expect(readWritten('abc')).toBeNull();
  });

  it('compares equal values as equal numbers', () => {
    expect(readValue('0,75')).toBe(3 / 4);
    expect(readValue('6/8')).toBe(3 / 4);
    expect(readValue('-1.5')).toBe(-3 / 2);
    expect(readValue('0')).toBe(0);
  });
});
