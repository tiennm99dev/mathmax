import { describe, it, expect } from 'vitest';
import {
  capitalReading,
  compareReason,
  compareSign,
  placeText,
  readNumber,
  readings,
  tensOnes,
} from './numbers.js';

describe('reading numbers to 100', () => {
  it('reads numbers the way the book prints them', () => {
    const cases = {
      0: 'không',
      7: 'bảy',
      10: 'mười',
      11: 'mười một',
      14: 'mười bốn',
      15: 'mười lăm',
      20: 'hai mươi',
      21: 'hai mươi mốt',
      24: 'hai mươi tư',
      25: 'hai mươi lăm',
      37: 'ba mươi bảy',
      55: 'năm mươi lăm',
      71: 'bảy mươi mốt',
      90: 'chín mươi',
      99: 'chín mươi chín',
      100: 'một trăm',
    };
    const wrong = Object.entries(cases).filter(([n, w]) => readNumber(Number(n)) !== w);
    expect(wrong).toEqual([]);
  });

  it('also accepts "bốn" for a final 4 after "mươi", but not after "mười"', () => {
    expect(readings(44)).toEqual(['bốn mươi tư', 'bốn mươi bốn']);
    expect(readings(14)).toEqual(['mười bốn']);
    expect(readings(30)).toEqual(['ba mươi']);
  });

  it('capitalises a reading to start a sentence', () => {
    expect(capitalReading(36)).toBe('Ba mươi sáu');
  });
});

describe('tens and ones', () => {
  it('splits a number and writes its parts', () => {
    expect(tensOnes(47)).toEqual({ tens: 4, ones: 7 });
    expect(placeText(4, 7)).toBe('4 chục và 7 đơn vị');
    expect(placeText(3, 0)).toBe('3 chục');
    expect(placeText(0, 6)).toBe('6 đơn vị');
  });
});

describe('comparing two-digit numbers', () => {
  it('agrees with the order of the numbers', () => {
    const bad = [];
    for (let a = 10; a < 100; a += 7) {
      for (let b = 10; b < 100; b += 3) {
        const s = compareSign(a, b);
        const ok = s === '=' ? a === b : s === '>' ? a > b : a < b;
        if (!ok || !compareReason(a, b).endsWith(`${a} ${s} ${b}.`)) bad.push([a, b]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('looks at the tens first, then the ones', () => {
    expect(compareReason(42, 25)).toBe('Hàng chục: 4 chục lớn hơn 2 chục. Vậy 42 > 25.');
    expect(compareReason(36, 39)).toBe(
      'Hàng chục bằng nhau (3 chục). Hàng đơn vị: 6 bé hơn 9. Vậy 36 < 39.',
    );
    expect(compareReason(58, 58)).toContain('58 = 58');
  });
});
