import { describe, expect, it } from 'vitest';
import { compareWhy, placesOf, placesText, readTo1000, sumParts } from './place-value.js';

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
