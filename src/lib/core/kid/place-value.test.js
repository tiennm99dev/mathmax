import { describe, expect, it } from 'vitest';
import {
  compareWhy,
  decidingPlace,
  placesOf,
  placesText,
  readTo1000,
  sumParts,
  sumText,
  valueOf,
} from './place-value.js';

describe('reading numbers to 1000', () => {
  it('reads the numbers the way the book does', () => {
    const cases = /** @type {Array<[number, string]>} */ ([
      [100, 'một trăm'],
      [243, 'hai trăm bốn mươi ba'],
      [235, 'hai trăm ba mươi lăm'],
      [724, 'bảy trăm hai mươi tư'],
      [251, 'hai trăm năm mươi mốt'],
      [310, 'ba trăm mười'],
      [411, 'bốn trăm mười một'],
      [315, 'ba trăm mười lăm'],
      [560, 'năm trăm sáu mươi'],
      [205, 'hai trăm linh năm'],
      [107, 'một trăm linh bảy'],
      [803, 'tám trăm linh ba'],
      [1000, 'một nghìn'],
      [35, 'ba mươi lăm'],
    ]);
    expect(cases.filter(([n, words]) => readTo1000(n) !== words)).toEqual([]);
  });
});

describe('places of a number', () => {
  it('splits a number into hundreds, tens and ones', () => {
    expect(placesOf(345)).toEqual({ hundreds: 3, tens: 4, ones: 5 });
    expect(placesOf(1000)).toEqual({ hundreds: 10, tens: 0, ones: 0 });
    expect(placesText(205)).toBe('2 trăm, 0 chục, 5 đơn vị');
  });

  it('leaves zero places out of the sum', () => {
    expect(sumParts(814)).toEqual([800, 10, 4]);
    expect(sumParts(408)).toEqual([400, 8]);
    expect(sumParts(840)).toEqual([800, 40]);
    expect(sumParts(600)).toEqual([600]);
  });
});

describe('comparing numbers', () => {
  it('starts from the hundreds', () => {
    expect(compareWhy(700, 900)).toBe('7 trăm bé hơn 9 trăm. Vậy 700 < 900.');
    expect(compareWhy(520, 250)).toBe('5 trăm lớn hơn 2 trăm. Vậy 520 > 250.');
  });

  it('moves on to the tens when the hundreds match', () => {
    expect(compareWhy(160, 190)).toBe('Hàng trăm bằng nhau. 6 chục bé hơn 9 chục. Vậy 160 < 190.');
  });

  it('says when the numbers are the same', () => {
    expect(compareWhy(400, 400)).toBe('Hai số giống nhau ở mọi hàng. Vậy 400 = 400.');
  });
});

describe('numbers to 1 000', () => {
  it('reads numbers the way the book does', () => {
    expect(readTo1000(243)).toBe('hai trăm bốn mươi ba');
    expect(readTo1000(205)).toBe('hai trăm linh năm');
    expect(readTo1000(310)).toBe('ba trăm mười');
    expect(readTo1000(515)).toBe('năm trăm mười lăm');
    expect(readTo1000(124)).toBe('một trăm hai mươi tư');
    expect(readTo1000(541)).toBe('năm trăm bốn mươi mốt');
    expect(readTo1000(600)).toBe('sáu trăm');
    expect(readTo1000(1000)).toBe('một nghìn');
  });

  it('splits a number into places and back', () => {
    const bad = [];
    for (let n = 0; n < 1000; n++) {
      if (valueOf(placesOf(n)) !== n) bad.push(n);
      if (n > 0 && sumParts(n).reduce((s, v) => s + v, 0) !== n) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('writes the sum of places', () => {
    expect(sumText(538)).toBe('538 = 500 + 30 + 8');
    expect(sumText(307)).toBe('307 = 300 + 7');
    expect(sumText(640)).toBe('640 = 600 + 40');
    expect(sumText(300)).toBe('300');
  });

  it('finds the place that decides a comparison', () => {
    expect(decidingPlace(505, 550)).toBe('tens');
    expect(decidingPlace(399, 401)).toBe('hundreds');
    expect(decidingPlace(738, 737)).toBe('ones');
    expect(decidingPlace(475, 475)).toBeNull();
  });

  it('says why a comparison holds', () => {
    expect(compareWhy(505, 550)).toBe('Hàng trăm bằng nhau. 0 chục bé hơn 5 chục. Vậy 505 < 550.');
    expect(compareWhy(401, 399)).toBe('4 trăm lớn hơn 3 trăm. Vậy 401 > 399.');
    expect(compareWhy(475, 475)).toBe('Hai số giống nhau ở mọi hàng. Vậy 475 = 475.');
  });
});

describe('comparing by the count of digits', () => {
  it('settles a three-digit against a two-digit number first when asked', () => {
    expect(compareWhy(105, 98, { byDigits: true })).toBe(
      '105 có ba chữ số, 98 có hai chữ số. Vậy 105 > 98.',
    );
    expect(compareWhy(98, 105)).toBe('0 trăm bé hơn 1 trăm. Vậy 98 < 105.');
    expect(compareWhy(160, 190, { byDigits: true })).toBe(
      'Hàng trăm bằng nhau. 6 chục bé hơn 9 chục. Vậy 160 < 190.',
    );
  });
});
