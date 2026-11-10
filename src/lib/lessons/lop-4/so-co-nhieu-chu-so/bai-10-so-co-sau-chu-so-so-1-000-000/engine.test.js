import { describe, expect, it } from 'vitest';
import {
  CHALLENGES,
  COLUMNS,
  EMPTY,
  challengeNote,
  clear,
  columnsOf,
  hundredThousands,
  numberOf,
  place,
  reading,
  sumLine,
} from './engine.js';

/** Group spaces as plain spaces. @param {string} t */
const plain = (t) => t.replace(/\u202f/g, ' ');

/** @param {number} n */
const filled = (n) => columnsOf(n).reduce((s, d, i) => place(s, i, d), EMPTY);

describe('the six-column table', () => {
  it('names the columns from trăm nghìn to đơn vị', () => {
    expect(COLUMNS).toEqual(['Trăm nghìn', 'Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị']);
  });

  it('places, replaces and takes out cards', () => {
    const one = place(EMPTY, 0, 4);
    expect(one).toEqual([4, null, null, null, null, null]);
    expect(place(one, 0, 7)[0]).toBe(7);
    expect(clear(one, 0)).toEqual(EMPTY);
    expect(place(EMPTY, 6, 1)).toEqual(EMPTY);
  });

  it('writes a number only when it has six digits', () => {
    expect(numberOf(filled(432516))).toBe(432516);
    expect(numberOf(place(EMPTY, 0, 1))).toBeNull();
    const zeroFirst = [0, 1, 2, 3, 4, 5].reduce((s, d, i) => place(s, i, d), EMPTY);
    expect(numberOf(zeroFirst)).toBeNull();
    expect(reading(zeroFirst)).toContain('khác 0');
    expect(reading(EMPTY)).toBe('Bảng chưa có thẻ nào.');
  });

  it('reads and splits a full table', () => {
    expect(plain(reading(filled(100001)))).toBe(
      '100 001 đọc là: một trăm nghìn không trăm linh một.',
    );
    expect(plain(sumLine(filled(101101)))).toBe('101 101 = 100 000 + 1 000 + 100 + 1');
    expect(sumLine(EMPTY)).toBe('');
  });

  it('checks every challenge without giving the digit away', () => {
    const bad = CHALLENGES.filter((n) => challengeNote(filled(n), n).tone !== 'ok');
    expect(bad).toEqual([]);
    const off = place(EMPTY, 1, 9);
    expect(challengeNote(off, 432516).text).toBe(
      'Thẻ ở cột chục nghìn chưa đúng. Em nghe lại tên số nhé.',
    );
    expect(challengeNote(place(EMPTY, 0, 4), 432516).text).toContain('đều đúng');
  });
});

describe('counting hundred thousands', () => {
  it('reaches one million at the tenth step', () => {
    expect(hundredThousands(3).value).toBe(300000);
    expect(hundredThousands(3).text).toContain('ba trăm nghìn');
    expect(hundredThousands(10).value).toBe(1000000);
    expect(hundredThousands(10).text).toContain('một triệu');
  });
});
