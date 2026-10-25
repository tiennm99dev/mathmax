import { describe, it, expect } from 'vitest';
import { GROUP, fmt, powText, readNatural, sup } from './format.js';

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
