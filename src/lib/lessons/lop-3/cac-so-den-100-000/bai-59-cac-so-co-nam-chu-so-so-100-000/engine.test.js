import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import { readTo100000 } from '../_shared/numbers-to-100000.js';
import {
  CHALLENGES,
  EMPTY,
  challengeNote,
  clear,
  columnsOf,
  isFull,
  numberOf,
  place,
  reading,
  sumLine,
} from './engine.js';

describe('the table', () => {
  it('places, replaces and takes out cards', () => {
    const one = place(EMPTY, 0, 4);
    expect(one).toEqual([4, null, null, null, null]);
    expect(place(one, 0, 7)[0]).toBe(7);
    expect(clear(one, 0)).toEqual(EMPTY);
    expect(place(EMPTY, 5, 1)).toEqual(EMPTY);
    expect(place(EMPTY, 0, 10)).toEqual(EMPTY);
  });

  it('writes a number only when every column has a card', () => {
    expect(numberOf(EMPTY)).toBeNull();
    expect(isFull([4, 2, 3, 1, 6])).toBe(true);
    expect(numberOf([4, 2, 3, 1, 6])).toBe(42316);
    expect(columnsOf(70040)).toEqual([7, 0, 0, 4, 0]);
  });
});

describe('reading the table', () => {
  it('reads a number of five digits with its sum', () => {
    expect(reading([2, 4, 1, 0, 5])).toBe(
      `${fmt(24105)} đọc là: hai mươi tư nghìn một trăm linh năm.`,
    );
    expect(sumLine([2, 4, 1, 0, 5])).toBe(`${fmt(24105)} = ${fmt(20000)} + ${fmt(4000)} + 100 + 5`);
  });

  it('counts empty columns and refuses a leading zero', () => {
    expect(reading(EMPTY)).toContain('chưa có');
    expect(reading([1, null, 2, null, 3])).toBe('Còn 2 cột chưa có thẻ.');
    expect(reading([0, 4, 1, 0, 5])).toContain('khác 0');
    expect(sumLine([0, 4, 1, 0, 5])).toBe('');
  });
});

describe('building the number asked for', () => {
  it('says when the number is right', () => {
    expect(challengeNote([4, 2, 3, 1, 6], 42316).tone).toBe('ok');
  });

  it('names a wrong column without its digit', () => {
    const note = challengeNote([4, 2, 3, 6, 1], 42316);
    expect(note.tone).toBe('info');
    expect(note.text).toContain('cột Chục chưa đúng');
    expect(challengeNote([4, 2, null, null, null], 42316).text).toContain('cột còn trống');
  });

  it('asks only numbers of five digits with a reading', () => {
    const bad = CHALLENGES.filter((n) => n < 10000 || n > 99999 || readTo100000(n) === String(n));
    expect(bad).toEqual([]);
  });
});
