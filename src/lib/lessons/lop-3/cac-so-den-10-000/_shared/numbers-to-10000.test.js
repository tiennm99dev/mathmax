import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import {
  compareWhy4,
  decidingPlace4,
  digitsOf,
  fromRoman,
  placesText4,
  readTo10000,
  romanSum,
  roundTo,
  roundWhy,
  roundingDigit,
  sticksOf,
  sumText4,
  toRoman,
  valueOfDigits,
} from './numbers-to-10000.js';

describe('reading numbers to 10 000', () => {
  it('reads the book examples', () => {
    expect(readTo10000(3674)).toBe('ba nghìn sáu trăm bảy mươi tư');
    expect(readTo10000(3067)).toBe('ba nghìn không trăm sáu mươi bảy');
    expect(readTo10000(4007)).toBe('bốn nghìn không trăm linh bảy');
    expect(readTo10000(8640)).toBe('tám nghìn sáu trăm bốn mươi');
    expect(readTo10000(6302)).toBe('sáu nghìn ba trăm linh hai');
    expect(readTo10000(8060)).toBe('tám nghìn không trăm sáu mươi');
    expect(readTo10000(5072)).toBe('năm nghìn không trăm bảy mươi hai');
    expect(readTo10000(2945)).toBe('hai nghìn chín trăm bốn mươi lăm');
    expect(readTo10000(1015)).toBe('một nghìn không trăm mười lăm');
    expect(readTo10000(7000)).toBe('bảy nghìn');
    expect(readTo10000(10000)).toBe('mười nghìn');
    expect(readTo10000(321)).toBe('ba trăm hai mươi mốt');
  });

  it('writes other values in digits', () => {
    expect(readTo10000(10001)).toBe('10001');
    expect(readTo10000(2.5)).toBe('2.5');
  });
});

describe('places', () => {
  it('splits and rebuilds every number', () => {
    const bad = [];
    for (let n = 0; n <= 10000; n += 37) if (valueOfDigits(digitsOf(n)) !== n) bad.push(n);
    expect(bad).toEqual([]);
  });

  it('writes places and sums', () => {
    expect(placesText4(3067)).toBe('3 nghìn, 0 trăm, 6 chục, 7 đơn vị');
    expect(sumText4(3892)).toBe(`${fmt(3892)} = ${fmt(3000)} + 800 + 90 + 2`);
    expect(sumText4(6008)).toBe(`${fmt(6008)} = ${fmt(6000)} + 8`);
    expect(sumText4(4000)).toBe(fmt(4000));
  });
});

describe('comparing', () => {
  it('finds the place that decides', () => {
    expect(decidingPlace4(3456, 3465)).toBe('tens');
    expect(decidingPlace4(5094, 5940)).toBe('hundreds');
    expect(decidingPlace4(999, 1000)).toBeNull();
  });

  it('explains by digit count, then place by place', () => {
    expect(compareWhy4(999, 1000)).toContain('ít chữ số hơn');
    expect(compareWhy4(999, 1000)).toContain(`999 < ${fmt(1000)}`);
    expect(compareWhy4(3456, 3465)).toContain(
      'Hàng nghìn, trăm giống nhau. Ở hàng chục: 5 bé hơn 6.',
    );
    expect(compareWhy4(7812, 2999)).toContain('Ở hàng nghìn: 7 lớn hơn 2.');
    expect(compareWhy4(2468, 2468)).toContain('=');
    expect(compareWhy4(456, 465)).toContain('Hàng trăm giống nhau. Ở hàng chục');
  });
});

describe('rounding', () => {
  it('follows the book examples', () => {
    expect(roundTo(2826, 10)).toBe(2830);
    expect(roundTo(2823, 10)).toBe(2820);
    expect(roundTo(3064, 10)).toBe(3060);
    expect(roundTo(3256, 100)).toBe(3300);
    expect(roundTo(3524, 100)).toBe(3500);
    expect(roundTo(3064, 100)).toBe(3100);
    expect(roundTo(5247, 100)).toBe(5200);
    expect(roundTo(9995, 10)).toBe(10000);
    expect(roundTo(9950, 100)).toBe(10000);
  });

  it('names the deciding digit', () => {
    expect(roundingDigit(3256, 100)).toBe(5);
    expect(roundingDigit(3256, 10)).toBe(6);
    expect(roundWhy(3064, 10)).toContain('4 < 5 nên làm tròn xuống');
    expect(roundWhy(3256, 100)).toContain('5 không bé hơn 5 nên làm tròn lên');
    expect(roundWhy(3250, 10)).toContain('giữ nguyên');
  });
});

describe('Roman numerals', () => {
  it('writes 1 to 20 the book way', () => {
    expect([1, 4, 5, 6, 9, 10, 13, 14, 17, 19, 20].map(toRoman)).toEqual([
      'I',
      'IV',
      'V',
      'VI',
      'IX',
      'X',
      'XIII',
      'XIV',
      'XVII',
      'XIX',
      'XX',
    ]);
  });

  it('reads only well-written numerals', () => {
    const bad = [];
    for (let n = 1; n <= 20; n++) if (fromRoman(toRoman(n)) !== n) bad.push(n);
    expect(bad).toEqual([]);
    expect(['IIII', 'VV', 'IIV', 'VX', 'XIIII', ''].map(fromRoman)).toEqual([
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  it('adds and takes away letters', () => {
    expect(romanSum('IV')).toBe(4);
    expect(romanSum('XIX')).toBe(19);
    expect(romanSum('IIII')).toBe(4);
    expect(romanSum('')).toBe(0);
  });

  it('counts matchsticks', () => {
    expect(sticksOf('VIII')).toBe(5);
    expect(sticksOf('XIII')).toBe(5);
  });
});
