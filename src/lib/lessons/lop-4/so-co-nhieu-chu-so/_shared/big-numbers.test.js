import { describe, expect, it } from 'vitest';
import {
  classParts,
  compareWhy,
  digitAt,
  digitsOf,
  firstDiff,
  readBig,
  readPart,
  roundTo,
  roundWhy,
  sumText,
  valueAt,
} from './big-numbers.js';

/** Group spaces as plain spaces, so expectations stay readable. @param {string} t */
const plain = (t) => t.replace(/\u202f/g, ' ');

describe('reading big numbers', () => {
  it('reads six-digit numbers and one million', () => {
    expect(readBig(432516)).toBe('bốn trăm ba mươi hai nghìn năm trăm mười sáu');
    expect(readBig(106100)).toBe('một trăm linh sáu nghìn một trăm');
    expect(readBig(100001)).toBe('một trăm nghìn không trăm linh một');
    expect(readBig(750000)).toBe('bảy trăm năm mươi nghìn');
    expect(readBig(1000000)).toBe('một triệu');
    expect(readBig(61034)).toBe('sáu mươi mốt nghìn không trăm ba mươi tư');
  });

  it('reads numbers of the millions class', () => {
    expect(readBig(126476461)).toBe(
      'một trăm hai mươi sáu triệu bốn trăm bảy mươi sáu nghìn bốn trăm sáu mươi mốt',
    );
    expect(readBig(109140903)).toBe(
      'một trăm linh chín triệu một trăm bốn mươi nghìn chín trăm linh ba',
    );
    expect(readBig(304028102)).toBe(
      'ba trăm linh bốn triệu không trăm hai mươi tám nghìn một trăm linh hai',
    );
    expect(readBig(2000001)).toBe('hai triệu không trăm linh một');
    expect(readBig(5000300)).toBe('năm triệu ba trăm');
    expect(readBig(97338579)).toBe(
      'chín mươi bảy triệu ba trăm ba mươi tám nghìn năm trăm bảy mươi chín',
    );
    expect(readBig(0)).toBe('không');
  });

  it('splits a number into classes', () => {
    expect(classParts(304028102)).toEqual([
      { cls: 2, value: 304, text: '304' },
      { cls: 1, value: 28, text: '028' },
      { cls: 0, value: 102, text: '102' },
    ]);
    expect(classParts(3045302).map((p) => p.text)).toEqual(['3', '045', '302']);
    expect(readPart(3045302, 1)).toBe('không trăm bốn mươi lăm nghìn');
    expect(readPart(2000001, 1)).toBe('');
  });
});

describe('places and values', () => {
  it('finds digits and their values', () => {
    expect(digitsOf(653720).map((d) => d.digit)).toEqual([6, 5, 3, 7, 2, 0]);
    expect(digitAt(63782910, 4)).toBe(8);
    expect(valueAt(653720, 4)).toBe(50000);
  });

  it('writes the sum of places', () => {
    expect(plain(sumText(882936))).toBe('882 936 = 800 000 + 80 000 + 2 000 + 900 + 30 + 6');
    expect(plain(sumText(109140903))).toBe(
      '109 140 903 = 100 000 000 + 9 000 000 + 100 000 + 40 000 + 900 + 3',
    );
    expect(plain(sumText(1000000))).toBe('1 000 000');
  });
});

describe('rounding', () => {
  it('rounds the book numbers to hundred thousands', () => {
    const cases = [
      [18490000, 18500000],
      [2125000, 2100000],
      [2890000, 2900000],
      [3121023, 3100000],
      [3272353, 3300000],
      [3386097, 3400000],
      [3254964, 3300000],
      [1167900, 1200000],
      [1916800, 1900000],
      [3365200, 3400000],
      [190001, 200000],
      [149000, 100000],
      [250001, 300000],
      [960000, 1000000],
    ];
    const bad = cases.filter(([n, r]) => roundTo(n, 100000) !== r);
    expect(bad).toEqual([]);
  });

  it('rounds to ten thousands and explains why', () => {
    expect(roundTo(189835388, 10000)).toBe(189840000);
    expect(roundTo(5122381, 10000)).toBe(5120000);
    expect(plain(roundWhy(3272353, 100000))).toBe(
      'Chữ số hàng chục nghìn là 7, 7 > 5 nên làm tròn lên: làm tròn đến hàng trăm nghìn được 3 300 000.',
    );
    expect(plain(roundWhy(2150000, 100000))).toContain('5 = 5 nên làm tròn lên');
  });
});

describe('comparing', () => {
  it('finds the first place that differs', () => {
    expect(firstDiff(693251, 693500)).toBe(2);
    expect(firstDiff(99999, 100000)).toBeNull();
    expect(firstDiff(5, 5)).toBeNull();
  });

  it('explains the comparison', () => {
    expect(plain(compareWhy(99999, 100000))).toBe(
      '99 999 có 5 chữ số, 100 000 có 6 chữ số. Vậy 99 999 < 100 000.',
    );
    expect(plain(compareWhy(693251, 693500))).toBe(
      'Hai số cùng có 6 chữ số. Các hàng bên trái giống nhau. Ở hàng trăm: 2 bé hơn 5. Vậy 693 251 < 693 500.',
    );
    expect(plain(compareWhy(700000, 699999))).toContain('Ở hàng trăm nghìn: 7 lớn hơn 6.');
  });
});
