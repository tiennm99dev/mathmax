import { describe, it, expect } from 'vitest';
import {
  expansion,
  fromRoman,
  groupDigits,
  placeValues,
  romanParts,
  romanValue,
  toRoman,
} from './engine.js';

describe('decimal system', () => {
  it('groups digits in threes from the right', () => {
    expect(groupDigits(15712314)).toBe('15 712 314');
    expect(groupDigits(999)).toBe('999');
    expect(groupDigits(1000)).toBe('1 000');
  });

  it('gives each digit its place and value', () => {
    const p = placeValues(2375041);
    expect(p[2]).toEqual({ digit: 7, power: 4, place: 'chục nghìn', value: 70000 });
    expect(p.reduce((s, x) => s + x.value, 0)).toBe(2375041);
  });

  it('writes the decimal structure with every digit', () => {
    expect(expansion(4851)).toBe('4 × 1 000 + 8 × 100 + 5 × 10 + 1');
    expect(expansion(7)).toBe('7');
    expect(expansion(205)).toBe('2 × 100 + 0 × 10 + 5');
  });
});

describe('Roman numerals', () => {
  it('matches the textbook table from 1 to 30', () => {
    const table = (
      'I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX XX ' +
      'XXI XXII XXIII XXIV XXV XXVI XXVII XXVIII XXIX XXX'
    ).split(' ');
    expect(Array.from({ length: 30 }, (_, i) => toRoman(i + 1))).toEqual(table);
  });

  it('splits a numeral into components whose values add up', () => {
    expect(romanParts(24)).toEqual(['X', 'X', 'IV']);
    for (let n = 1; n <= 30; n++) {
      expect(romanParts(n).reduce((s, p) => s + romanValue(p), 0)).toBe(n);
    }
  });

  it('has no numeral for 0 or numbers above 30', () => {
    expect(toRoman(0)).toBe('');
    expect(toRoman(31)).toBe('');
  });

  it('reads correct numerals and rejects wrong ones', () => {
    expect(fromRoman('xxix')).toBe(29);
    expect(fromRoman('IIII')).toBeNull();
    expect(fromRoman('VV')).toBeNull();
    expect(fromRoman('XXXI')).toBeNull();
  });
});
