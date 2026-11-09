import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import {
  compareWhy5,
  digitsOf5,
  placesText5,
  readTo100000,
  roundTo,
  roundWhy,
  roundingDigit,
  sumParts5,
  sumText5,
} from './numbers-to-100000.js';

describe('reading numbers to 100 000', () => {
  it('reads the book examples', () => {
    expect(readTo100000(42316)).toBe('bốn mươi hai nghìn ba trăm mười sáu');
    expect(readTo100000(24105)).toBe('hai mươi tư nghìn một trăm linh năm');
    expect(readTo100000(70040)).toBe('bảy mươi nghìn không trăm bốn mươi');
    expect(readTo100000(31005)).toBe('ba mươi mốt nghìn không trăm linh năm');
    expect(readTo100000(15000)).toBe('mười lăm nghìn');
    expect(readTo100000(10000)).toBe('mười nghìn');
    expect(readTo100000(99999)).toBe('chín mươi chín nghìn chín trăm chín mươi chín');
    expect(readTo100000(100000)).toBe('một trăm nghìn');
    expect(readTo100000(5072)).toBe('năm nghìn không trăm bảy mươi hai');
    expect(readTo100000(321)).toBe('ba trăm hai mươi mốt');
  });

  it('writes other values in digits', () => {
    expect(readTo100000(100001)).toBe('100001');
    expect(readTo100000(2.5)).toBe('2.5');
  });
});

describe('places', () => {
  it('splits every number and adds it back up', () => {
    const bad = [];
    for (let n = 0; n <= 100000; n += 137) {
      const d = digitsOf5(n);
      const back = d.tenThousands * 10000 + d.thousands * 1000 + d.hundreds * 100 + d.tens * 10;
      if (back + d.ones !== n) bad.push(n);
      if (sumParts5(n).reduce((s, v) => s + v, 0) !== n) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('writes places and sums', () => {
    expect(placesText5(42316)).toBe('4 chục nghìn, 2 nghìn, 3 trăm, 1 chục, 6 đơn vị');
    expect(sumText5(45321)).toBe(`${fmt(45321)} = ${fmt(40000)} + ${fmt(5000)} + 300 + 20 + 1`);
    expect(sumText5(60008)).toBe(`${fmt(60008)} = ${fmt(60000)} + 8`);
    expect(sumText5(30000)).toBe(fmt(30000));
  });
});

describe('comparing', () => {
  it('explains by digit count, then place by place', () => {
    expect(compareWhy5(9999, 10000)).toContain('ít chữ số hơn');
    expect(compareWhy5(100000, 99999)).toContain('sáu chữ số');
    expect(compareWhy5(76200, 76199)).toContain(
      'Hàng chục nghìn, hàng nghìn giống nhau. Ở hàng trăm: 2 lớn hơn 1.',
    );
    expect(compareWhy5(58000, 85000)).toContain('Ở hàng chục nghìn: 5 bé hơn 8.');
    expect(compareWhy5(24680, 24680)).toContain('=');
    expect(compareWhy5(3456, 3465)).toContain('Hàng nghìn, hàng trăm giống nhau. Ở hàng chục');
  });
});

describe('rounding', () => {
  it('follows the book examples', () => {
    expect(roundTo(65341, 1000)).toBe(65000);
    expect(roundTo(10501, 1000)).toBe(11000);
    expect(roundTo(9805, 1000)).toBe(10000);
    expect(roundTo(82134, 10000)).toBe(80000);
    expect(roundTo(55712, 10000)).toBe(60000);
    expect(roundTo(46000, 10000)).toBe(50000);
    expect(roundTo(80304, 1000)).toBe(80000);
    expect(roundTo(61500, 1000)).toBe(62000);
    expect(roundTo(95000, 10000)).toBe(100000);
  });

  it('names the deciding digit', () => {
    expect(roundingDigit(65341, 1000)).toBe(3);
    expect(roundingDigit(55712, 10000)).toBe(5);
    expect(roundWhy(65341, 1000)).toContain('3 < 5 nên làm tròn xuống');
    expect(roundWhy(55712, 10000)).toContain('5 không bé hơn 5 nên làm tròn lên');
    expect(roundWhy(55712, 10000)).toContain('Chữ số hàng nghìn');
    expect(roundWhy(42000, 1000)).toContain('giữ nguyên');
  });
});
