import { describe, it, expect } from 'vitest';
import {
  GROUP,
  intText,
  operand,
  readInteger,
  fmt,
  formatFixed,
  formatNumber,
  powText,
  readNatural,
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
