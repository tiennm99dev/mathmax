import { describe, expect, it } from 'vitest';
import {
  compareWhy,
  decidingPlace,
  placesOf,
  readTo1000,
  sumParts,
  sumText,
  valueOf,
} from './place.js';

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
