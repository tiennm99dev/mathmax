import { describe, it, expect } from 'vitest';
import {
  addText,
  addWords,
  capitalReading,
  clampInt,
  compareReason,
  compareSign,
  freshInt,
  placeText,
  readNumber,
  readings,
  relatedSubtractions,
  sticksWords,
  subText,
  subWords,
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
    expect(capitalReading(5)).toBe('Năm');
  });

  it('writes a number outside 0 to 100 in digits', () => {
    expect(readNumber(101)).toBe('101');
    expect(readNumber(-1)).toBe('-1');
    expect(readNumber(2.5)).toBe('2.5');
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

describe('counting sticks in words', () => {
  it('names bundles and loose sticks', () => {
    expect(sticksWords(41)).toBe('4 chục và 1 que rời');
    expect(sticksWords(70)).toBe('7 chục');
    expect(sticksWords(5)).toBe('5 que rời');
  });
});

describe('addition and subtraction text', () => {
  it('prints and reads an addition', () => {
    expect(addText(3, 2)).toBe('3 + 2 = 5');
    expect(addWords(3, 2)).toBe('ba cộng hai bằng năm');
    expect(addWords(20, 15)).toBe('hai mươi cộng mười lăm bằng ba mươi lăm');
  });

  it('prints and reads a subtraction with the book minus sign', () => {
    expect(subText(5, 2)).toBe('5 − 2 = 3');
    expect(subWords(4, 4)).toBe('bốn trừ bốn bằng không');
  });

  it('lists the subtractions that undo an addition', () => {
    expect(relatedSubtractions(3, 2)).toEqual(['5 − 2 = 3', '5 − 3 = 2']);
    expect(relatedSubtractions(4, 4)).toEqual(['8 − 4 = 4']);
  });
});

describe('whole-number helpers', () => {
  it('clamps whole numbers', () => {
    expect(clampInt(12, 0, 10)).toBe(10);
    expect(clampInt(-1, 0, 10)).toBe(0);
  });

  it('picks a fresh number in range', () => {
    const bad = [];
    for (let prev = 6; prev <= 10; prev++) {
      for (const r of [0, 0.3, 0.7, 0.999999]) {
        const n = freshInt(6, 10, prev, () => r);
        if (n === prev || n < 6 || n > 10) bad.push([prev, r, n]);
      }
    }
    expect(bad).toEqual([]);
    expect(freshInt(3, 3, 3)).toBe(3);
  });
});
