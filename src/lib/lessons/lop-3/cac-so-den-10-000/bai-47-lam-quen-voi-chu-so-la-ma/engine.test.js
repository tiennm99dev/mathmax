import { describe, expect, it } from 'vitest';
import { toRoman } from '../_shared/numbers-to-10000.js';
import { HOURS, MAX_LETTERS, TARGETS, addLetter, romanWhy, rowNote, wrongWay } from './engine.js';

describe('laying letters', () => {
  it('adds letters up to a limit', () => {
    expect(addLetter('X', 'I')).toBe('XI');
    expect(addLetter('I'.repeat(MAX_LETTERS), 'I')).toHaveLength(MAX_LETTERS);
  });

  it('fits every target', () => {
    expect(TARGETS.filter((n) => toRoman(n).length > MAX_LETTERS)).toEqual([]);
  });

  it('numbers the clock I to XII', () => {
    expect(HOURS.map((h) => h.roman)).toEqual([
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
      'XI',
      'XII',
    ]);
  });
});

describe('checking a row', () => {
  it('says why a row is written the wrong way', () => {
    expect(wrongWay('IIII')).toContain('bốn lần');
    expect(wrongWay('VV')).toContain('V chỉ viết một lần');
    expect(wrongWay('VX')).toContain('bên trái X');
    expect(wrongWay('IIX')).toContain('một chữ I');
    expect(wrongWay('IXX')).not.toBe('');
    expect(wrongWay('XIV')).toBe('');
  });

  it('gives the live line', () => {
    expect(rowNote('', 4).tone).toBe('info');
    const right = rowNote('IV', 4);
    expect(right.tone).toBe('ok');
    expect(right.text).toContain('3 que diêm');
    expect(rowNote('VI', 4).text).toContain('VI là số 6, lớn hơn');
    expect(rowNote('III', 4).text).toContain('còn bé hơn');
    expect(rowNote('IIII', 4).tone).toBe('warn');
  });
});

describe('explaining a numeral', () => {
  it('adds and takes away', () => {
    expect(romanWhy(4)).toBe('IV: I đứng bên trái V nên IV = 5 − 1 = 4.');
    expect(romanWhy(9)).toBe('IX: I đứng bên trái X nên IX = 10 − 1 = 9.');
    expect(romanWhy(7)).toBe('VII = 5 + 1 + 1 = 7.');
    expect(romanWhy(14)).toBe('XIV = 10 + IV = 10 + 4 = 14.');
    expect(romanWhy(20)).toBe('XX = 10 + 10 = 20.');
    expect(romanWhy(10)).toBe('X là 10.');
  });
});
