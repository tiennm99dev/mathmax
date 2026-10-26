import { describe, it, expect } from 'vitest';
import { fraction } from '#lib/fraction-engine/index.js';
import { intText, readInteger, readValue, termText, valueTex, valueText } from './numbers.js';

describe('integers', () => {
  it('writes the book minus and brackets negative terms', () => {
    expect(intText(-12)).toBe('−12');
    expect(intText(7)).toBe('7');
    expect(termText(-3)).toBe('(−3)');
    expect(termText(3)).toBe('3');
  });

  it('reads signed integers and rejects the rest', () => {
    expect(readInteger(' −15 ')).toBe(-15);
    expect(readInteger('-4')).toBe(-4);
    expect(readInteger('+8')).toBe(8);
    expect(readInteger('2,5')).toBeNull();
    expect(readInteger('')).toBeNull();
    expect(readInteger('x')).toBeNull();
  });
});

describe('rational values', () => {
  it('reads integers, decimals and fractions exactly', () => {
    expect(readValue('2,5')).toEqual(fraction(5, 2));
    expect(readValue('-0.75')).toEqual(fraction(-3, 4));
    expect(readValue('−6/8')).toEqual(fraction(-3, 4));
    expect(readValue('12')).toEqual(fraction(12));
    expect(readValue('3/0')).toBeNull();
    expect(readValue('1,2,3')).toBeNull();
    expect(readValue('')).toBeNull();
  });

  it('writes a finite decimal with a comma and a repeating one as a fraction', () => {
    expect(valueText(fraction(5, 2))).toBe('2,5');
    expect(valueText(fraction(-3, 4))).toBe('−0,75');
    expect(valueText(fraction(10, 6))).toBe('5/3');
    expect(valueText(fraction(-8, 4))).toBe('−2');
    expect(valueTex(fraction(-5, 2))).toBe('-2{,}5');
    expect(valueTex(fraction(5, 6))).toBe('\\frac{5}{6}');
    expect(valueTex(fraction(-5, 6))).toBe('-\\frac{5}{6}');
  });
});
