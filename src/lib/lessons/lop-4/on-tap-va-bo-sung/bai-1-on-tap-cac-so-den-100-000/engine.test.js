import { describe, expect, it } from 'vitest';
import { columnsOf, readTo100000, roundTo, sumText } from '../_shared/numbers.js';
import {
  CHALLENGES,
  EMPTY,
  challengeNote,
  clear,
  facts,
  numberOf,
  place,
  reading,
} from './engine.js';

describe('numbers to 100 000', () => {
  it('reads numbers the book way', () => {
    expect(readTo100000(36515)).toBe('ba mươi sáu nghìn năm trăm mười lăm');
    expect(readTo100000(61034)).toBe('sáu mươi mốt nghìn không trăm ba mươi tư');
    expect(readTo100000(20809)).toBe('hai mươi nghìn tám trăm linh chín');
    expect(readTo100000(94005)).toBe('chín mươi tư nghìn không trăm linh năm');
    expect(readTo100000(7941)).toBe('bảy nghìn chín trăm bốn mươi mốt');
    expect(readTo100000(100000)).toBe('một trăm nghìn');
  });

  it('splits a number into its places', () => {
    expect(columnsOf(86209)).toEqual([8, 6, 2, 0, 9]);
    expect(sumText(33471)).toBe('33 471 = 30 000 + 3 000 + 400 + 70 + 1');
    expect(sumText(50738)).toBe('50 738 = 50 000 + 700 + 30 + 8');
    expect(sumText(40000)).toBe('40 000');
  });

  it('rounds to thousands and ten thousands', () => {
    expect(roundTo(12967, 1000)).toBe(13000);
    expect(roundTo(83407, 1000)).toBe(83000);
    expect(roundTo(83500, 1000)).toBe(84000);
    expect(roundTo(45000, 10000)).toBe(50000);
    expect(roundTo(44999, 10000)).toBe(40000);
    expect(roundTo(96041, 10000)).toBe(100000);
  });
});

describe('the table', () => {
  it('places, replaces and takes out cards', () => {
    const one = place(EMPTY, 0, 4);
    expect(one).toEqual([4, null, null, null, null]);
    expect(place(one, 0, 7)[0]).toBe(7);
    expect(clear(one, 0)).toEqual(EMPTY);
    expect(place(EMPTY, 5, 1)).toEqual(EMPTY);
  });

  it('writes a number only when it has five digits', () => {
    expect(numberOf(EMPTY)).toBeNull();
    expect(numberOf([0, 2, 3, 1, 6])).toBeNull();
    expect(numberOf([3, 6, 5, 1, 5])).toBe(36515);
    expect(reading([0, 2, 3, 1, 6])).toMatch(/phải khác 0/);
    expect(reading([3, 6, 5, 1, 5])).toBe('36 515 đọc là: ba mươi sáu nghìn năm trăm mười lăm.');
  });

  it('tells the sum and the roundings of a full table', () => {
    expect(facts([1, 2, 9, 6, 7])).toEqual([
      '12 967 = 10 000 + 2 000 + 900 + 60 + 7',
      'Chữ số hàng trăm là 9, 9 ≥ 5 nên làm tròn lên: làm tròn đến hàng nghìn được 13 000.',
      'Chữ số hàng nghìn là 2, 2 < 5 nên làm tròn xuống: làm tròn đến hàng chục nghìn được 10 000.',
    ]);
    expect(facts([1, 2, null, 6, 7])).toEqual([]);
  });

  it('checks every challenge without giving a digit away', () => {
    const wrong = [];
    for (const n of CHALLENGES) {
      if (n < 10000 || n > 99999) wrong.push(n);
      if (challengeNote(/** @type {number[]} */ (columnsOf(n)), n).tone !== 'ok') wrong.push(n);
    }
    expect(wrong).toEqual([]);
    const note = challengeNote([3, 5, null, null, null], 36515);
    expect(note.text).toBe('Thẻ ở cột Nghìn chưa đúng. Em nghe lại tên số nhé.');
  });
});
