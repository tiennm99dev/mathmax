import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import { readTo10000 } from '../_shared/numbers-to-10000.js';
import {
  CHALLENGES,
  EMPTY,
  add,
  canMerge,
  challengeNote,
  columnToMerge,
  merge,
  mergeText,
  numberOf,
  reading,
  remove,
} from './engine.js';

describe('the table', () => {
  it('adds and removes blocks', () => {
    const one = add(EMPTY, 'thousands');
    expect(one.table.thousands).toBe(1);
    expect(one.refused).toBe('');
    expect(remove(one.table, 'thousands')).toEqual(EMPTY);
    expect(remove(EMPTY, 'ones')).toEqual(EMPTY);
  });

  it('stops a column at ten blocks', () => {
    const full = { ...EMPTY, tens: 10 };
    const result = add(full, 'tens');
    expect(result.table).toEqual(full);
    expect(result.refused).toContain('ghép');
  });

  it('never goes past 10 000', () => {
    const top = { ...EMPTY, thousands: 10 };
    expect(add(top, 'ones').refused).toContain(fmt(10000));
    expect(add({ ...EMPTY, thousands: 9, hundreds: 9 }, 'thousands').refused).not.toBe('');
  });

  it('puts ten blocks together into one of the place above', () => {
    const t = { ...EMPTY, thousands: 2, hundreds: 10 };
    expect(canMerge(t, 'hundreds')).toBe(true);
    expect(columnToMerge(t)?.key).toBe('hundreds');
    const merged = merge(t, 'hundreds');
    expect(merged).toEqual({ ...EMPTY, thousands: 3 });
    expect(numberOf(merged)).toBe(numberOf(t));
    expect(canMerge({ ...EMPTY, thousands: 10 }, 'thousands')).toBe(false);
    expect(merge(EMPTY, 'ones')).toEqual(EMPTY);
    expect(mergeText('hundreds')).toBe('Ghép 10 tấm trăm thành 1 khối nghìn');
  });
});

describe('reading the table', () => {
  it('reads a number of four digits', () => {
    expect(reading({ thousands: 3, hundreds: 0, tens: 6, ones: 7 })).toBe(
      `${fmt(3067)} đọc là: ba nghìn không trăm sáu mươi bảy.`,
    );
    expect(reading({ ...EMPTY, thousands: 10 })).toContain('mười nghìn');
    expect(reading(EMPTY)).toContain('chưa có');
  });

  it('asks to put a full column together before writing', () => {
    expect(reading({ ...EMPTY, ones: 10 })).toContain('10 đơn vị = 1 chục');
  });
});

describe('building the number asked for', () => {
  it('says when the number is right', () => {
    const note = challengeNote({ thousands: 2, hundreds: 9, tens: 4, ones: 5 }, 2945);
    expect(note.tone).toBe('ok');
    expect(challengeNote({ ...EMPTY, thousands: 10 }, 10000).tone).toBe('ok');
  });

  it('waits for a full column to be put together', () => {
    const note = challengeNote({ thousands: 9, hundreds: 10, tens: 0, ones: 0 }, 10000);
    expect(note.tone).toBe('info');
    expect(note.text).toContain('ghép');
  });

  it('names the first column that is off', () => {
    expect(challengeNote({ thousands: 1, hundreds: 9, tens: 4, ones: 5 }, 2945).text).toContain(
      'Cột Nghìn còn thiếu',
    );
    expect(challengeNote({ thousands: 5, hundreds: 1, tens: 7, ones: 2 }, 5072).text).toContain(
      'Cột Trăm đang thừa',
    );
  });

  it('asks only numbers with a reading, up to 10 000', () => {
    const bad = CHALLENGES.filter((n) => n < 1000 || n > 10000 || readTo10000(n) === String(n));
    expect(bad).toEqual([]);
  });
});
