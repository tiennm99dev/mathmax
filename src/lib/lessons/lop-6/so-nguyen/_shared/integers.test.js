import { describe, it, expect } from 'vitest';
import { intText, kindOf, operand, readInteger } from './integers.js';

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

describe('kindOf', () => {
  it('names the sign of an integer', () => {
    expect(kindOf(3)).toBe('số nguyên dương');
    expect(kindOf(-3)).toBe('số nguyên âm');
    expect(kindOf(0)).toMatch(/^số 0/);
  });
});
