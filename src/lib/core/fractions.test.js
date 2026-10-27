import { describe, it, expect } from 'vitest';
import {
  countOrProbabilityText,
  fracOperand,
  fracText,
  lowestTerms,
  mixedText,
  probabilityText,
  ratioTex,
  ratioText,
  readFraction,
  readProbability,
  texFrac,
  texOperand,
  toFraction,
  valueText,
} from './fractions.js';
import { GROUP } from './number-format.js';

describe('fracText and fracOperand', () => {
  it('puts the sign on the numerator with a true minus sign', () => {
    expect(fracText(3, 4)).toBe('3/4');
    expect(fracText(3, -4)).toBe('−3/4');
    expect(fracText(-3, -4)).toBe('3/4');
    expect(fracText(-6, 1)).toBe('−6');
    expect(fracText(0, 5)).toBe('0/5');
    expect(fracOperand(-3, 4)).toBe('(−3/4)');
    expect(fracOperand(3, 4)).toBe('3/4');
  });

  it('writes mixed numbers for positive fractions above 1', () => {
    expect(mixedText(7, 4)).toBe('1 3/4');
    expect(mixedText(34, 8)).toBe('4 1/4');
    expect(mixedText(3, 4)).toBe('3/4');
    expect(mixedText(8, 4)).toBe('2');
  });

  it('writes TeX with the sign on the numerator', () => {
    expect(texFrac(3, -4)).toBe('\\frac{-3}{4}');
    expect(texFrac(10, 1)).toBe('10');
    expect(texOperand(-1, 2)).toBe('\\left(\\frac{-1}{2}\\right)');
  });
});

describe('toFraction and valueText', () => {
  it('recovers the simplest fraction from its value', () => {
    expect(toFraction(2 / 3)).toEqual({ n: 2, d: 3 });
    expect(toFraction(-35 / 72)).toEqual({ n: -35, d: 72 });
    expect(valueText(-7 / 12)).toBe('−7/12');
    expect(valueText(5)).toBe('5');
    expect(valueText(0)).toBe('0');
  });
});

describe('readFraction', () => {
  it('reads fractions, integers and comma decimals', () => {
    expect(readFraction('3/4')).toBe(3 / 4);
    expect(readFraction(' −3 / 4 ')).toBe(-3 / 4);
    expect(readFraction('3/-4')).toBe(-3 / 4);
    expect(readFraction('-3/-4')).toBe(3 / 4);
    expect(readFraction('-5')).toBe(-5);
    expect(readFraction('0,75')).toBe(3 / 4);
    expect(readFraction('0/7')).toBe(0);
  });

  it('gives equal fractions the same value', () => {
    expect(readFraction('4/6')).toBe(2 / 3);
    expect(readFraction('-10/24')).toBe(-5 / 12);
  });

  it('rejects mixed numbers, zero denominators and words', () => {
    expect(readFraction('1 3/4')).toBeNull();
    expect(readFraction('3/0')).toBeNull();
    expect(readFraction('')).toBeNull();
    expect(readFraction('ba phần tư')).toBeNull();
    expect(readFraction('3 4')).toBeNull();
  });
});

describe('probabilities', () => {
  it('reads fractions, whole numbers and decimals', () => {
    expect(readProbability('2/6')).toBe(1 / 3);
    expect(readProbability(' 1 / 3 ')).toBe(1 / 3);
    expect(readProbability('0,4')).toBe(2 / 5);
    expect(readProbability('0.25')).toBe(1 / 4);
    expect(readProbability('1/0')).toBeNull();
    expect(readProbability('một nửa')).toBeNull();
  });

  it('writes a probability as its simplest fraction', () => {
    expect(probabilityText(2 / 6)).toBe('1/3');
    expect(probabilityText(0)).toBe('0');
    expect(probabilityText(1)).toBe('1');
    expect(probabilityText(7 / 19)).toBe('7/19');
  });
});

describe('ratios', () => {
  it('reduces a pair to lowest terms', () => {
    expect(lowestTerms(4, 12)).toEqual([1, 3]);
    expect(lowestTerms(5, 7)).toEqual([5, 7]);
    expect(lowestTerms(0, 5)).toEqual([0, 1]);
  });

  it('writes a ratio with its lowest terms when they differ', () => {
    expect(ratioText(6, 20)).toBe('6/20 = 3/10');
    expect(ratioText(6, 6)).toBe('6/6 = 1');
    expect(ratioText(0, 5)).toBe('0/5 = 0');
    expect(ratioText(3, 7)).toBe('3/7');
  });

  it('writes the ratio and its lowest terms as TeX', () => {
    expect(ratioTex(8, 4)).toBe('\\dfrac{8}{4} = 2');
    expect(ratioTex(6, 4)).toBe('\\dfrac{6}{4} = \\dfrac{3}{2}');
    expect(ratioTex(3, 4)).toBe('\\dfrac{3}{4}');
  });
});

describe('countOrProbabilityText', () => {
  it('groups counts and writes probabilities as fractions', () => {
    expect(countOrProbabilityText(1500)).toBe(`1${GROUP}500`);
    expect(countOrProbabilityText(0.25)).toBe('1/4');
  });
});
