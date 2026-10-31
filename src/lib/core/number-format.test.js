import { describe, it, expect } from 'vitest';
import {
  GROUP,
  intText,
  operand,
  readInteger,
  fmt,
  formatFixed,
  formatNumber,
  hoursText,
  numTex,
  powText,
  readNatural,
  roundToTotal,
  sup,
  texNumber,
} from './number-format.js';

describe('formatNumber', () => {
  it('groups thousands with dots and uses a decimal comma', () => {
    expect(formatNumber(52.9)).toBe('52,9');
    expect(formatNumber(12_345.5)).toBe('12.345,5');
    expect(formatNumber(1_000_000)).toBe('1.000.000');
    expect(formatNumber(-0.25)).toBe('−0,25');
    expect(formatNumber(2 / 3, 2)).toBe('0,67');
    expect(formatNumber(-0.001, 2)).toBe('0');
  });
});

describe('formatFixed', () => {
  it('keeps exactly the asked decimals', () => {
    expect(formatFixed(52.94, 1)).toBe('52,9');
    expect(formatFixed(5, 1)).toBe('5,0');
    expect(formatFixed(22_500, 1)).toBe('22.500,0');
    expect(formatFixed(-1.5, 2)).toBe('−1,50');
    expect(formatFixed(3.4, 0)).toBe('3');
  });
});

describe('texNumber', () => {
  it('braces the decimal comma for TeX', () => {
    expect(texNumber('3,5')).toBe('3{,}5');
    expect(texNumber('22.500,0')).toBe('22.500{,}0');
    expect(texNumber('7')).toBe('7');
  });
});

describe('fmt', () => {
  it('groups digits by threes', () => {
    expect(fmt(7)).toBe('7');
    expect(fmt(999)).toBe('999');
    expect(fmt(2345)).toBe(`2${GROUP}345`);
    expect(fmt(1234567)).toBe(`1${GROUP}234${GROUP}567`);
  });
});

describe('sup and powText', () => {
  it('writes exponents as superscripts', () => {
    expect(sup(0)).toBe('⁰');
    expect(sup(12)).toBe('¹²');
    expect(powText(2, 5)).toBe('2⁵');
    expect(powText('a', 3)).toBe('a³');
  });
});

describe('readNatural', () => {
  it('reads plain and grouped natural numbers', () => {
    expect(readNatural('1024')).toBe(1024);
    expect(readNatural(' 1 024 ')).toBe(1024);
    expect(readNatural(`1${GROUP}024`)).toBe(1024);
    expect(readNatural('1.024')).toBe(1024);
    expect(readNatural('0')).toBe(0);
  });

  it('rejects what is not a natural number', () => {
    expect(readNatural('')).toBeNull();
    expect(readNatural('-3')).toBeNull();
    expect(readNatural('2,5')).toBeNull();
    expect(readNatural('1.02')).toBeNull();
    expect(readNatural('abc')).toBeNull();
  });
});

describe('intText and operand', () => {
  it('prints a true minus sign and brackets negative operands', () => {
    expect(intText(-5)).toBe('−5');
    expect(intText(0)).toBe('0');
    expect(intText(-1234)).toBe('−1\u202f234');
    expect(operand(-5)).toBe('(−5)');
    expect(operand(7)).toBe('7');
  });
});

describe('readInteger', () => {
  it('reads both minus signs, a plus sign and grouped digits', () => {
    expect(readInteger('-5')).toBe(-5);
    expect(readInteger(' −5 ')).toBe(-5);
    expect(readInteger('+12')).toBe(12);
    expect(readInteger('- 12')).toBe(-12);
    expect(readInteger('1 024')).toBe(1024);
    expect(readInteger('-1.024')).toBe(-1024);
    expect(readInteger('-0')).toBe(0);
  });

  it('rejects decimals, words and empty input', () => {
    expect(readInteger('')).toBeNull();
    expect(readInteger('3,5')).toBeNull();
    expect(readInteger('--3')).toBeNull();
    expect(readInteger('âm 3')).toBeNull();
  });
});

describe('roundToTotal', () => {
  it('keeps the total and stays within one of each value', () => {
    const values = [70.4, 109.4, 90.4, 89.8];
    const out = roundToTotal(values, 360);
    expect(out.reduce((s, v) => s + v, 0)).toBe(360);
    out.forEach((v, i) => expect(Math.abs(v - values[i])).toBeLessThan(1));
  });

  it('leaves whole numbers alone and breaks ties in order', () => {
    expect(roundToTotal([90, 90, 90, 90], 360)).toEqual([90, 90, 90, 90]);
    expect(roundToTotal([0.5, 0.5], 1)).toEqual([1, 0]);
  });
});

describe('numTex', () => {
  it('groups thousands with a thin space, as fmt does in text', () => {
    expect(numTex(1296)).toBe('1\\,296');
    expect(numTex(1234567)).toBe('1\\,234\\,567');
    expect(numTex(12345.5)).toBe('12\\,345{,}5');
  });

  it('braces the decimal comma and writes an ASCII minus', () => {
    expect(numTex(2.5)).toBe('2{,}5');
    expect(numTex(-2.5)).toBe('-2{,}5');
    expect(numTex(-1500)).toBe('-1\\,500');
    expect(numTex(37)).toBe('37');
  });

  it('rounds to at most the given decimals', () => {
    expect(numTex(1 / 3, 2)).toBe('0{,}33');
  });
});

describe('hoursText', () => {
  it('writes hours and minutes the book way', () => {
    expect(hoursText(1.2)).toBe('$1$ giờ $12$ phút');
    expect(hoursText(0.5)).toBe('$30$ phút');
    expect(hoursText(4)).toBe('$4$ giờ');
    expect(hoursText(3.75)).toBe('$3$ giờ $45$ phút');
  });
});
