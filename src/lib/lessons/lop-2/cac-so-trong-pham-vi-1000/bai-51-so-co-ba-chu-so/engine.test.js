import { describe, expect, it } from 'vitest';
import { readTo1000 } from '#lib/core/kid/place-value.js';
import {
  CHALLENGES,
  COLUMN_MAX,
  EMPTY,
  challengeNote,
  drop,
  numberOf,
  reading,
  takeOut,
} from './engine.js';

describe('the table', () => {
  it('makes a number from its columns', () => {
    expect(numberOf({ hundreds: 2, tens: 4, ones: 3 })).toBe(243);
    expect(numberOf({ hundreds: 2, tens: 0, ones: 5 })).toBe(205);
  });

  it('takes a block in its own column only', () => {
    const one = drop(EMPTY, 'hundreds', 'hundreds');
    expect(one.table.hundreds).toBe(1);
    expect(one.refused).toBe('');
    const wrong = drop(EMPTY, 'hundreds', 'ones');
    expect(wrong.table).toEqual(EMPTY);
    expect(wrong.refused).toContain('cột Trăm');
  });

  it('stops a column at nine blocks', () => {
    const full = { ...EMPTY, tens: COLUMN_MAX };
    const result = drop(full, 'tens', 'tens');
    expect(result.table).toEqual(full);
    expect(result.refused).toContain('từ 0 đến 9');
  });

  it('takes a block out and never goes below zero', () => {
    expect(takeOut({ ...EMPTY, ones: 2 }, 'ones').ones).toBe(1);
    expect(takeOut(EMPTY, 'ones').ones).toBe(0);
  });

  it('reads what is on the table', () => {
    expect(reading(EMPTY)).toContain('chưa có');
    expect(reading({ hundreds: 2, tens: 0, ones: 5 })).toBe('205 đọc là: hai trăm linh năm.');
  });
});

describe('building the number asked for', () => {
  it('says when the number is right', () => {
    const note = challengeNote({ hundreds: 2, tens: 4, ones: 3 }, 243);
    expect(note.tone).toBe('ok');
    expect(note.text).toContain('hai trăm bốn mươi ba viết là 243');
  });

  it('names the first column that is off', () => {
    expect(challengeNote({ hundreds: 1, tens: 4, ones: 3 }, 243).text).toContain(
      'Cột Trăm còn thiếu',
    );
    expect(challengeNote({ hundreds: 2, tens: 5, ones: 3 }, 243).text).toContain(
      'Cột Chục đang thừa',
    );
    expect(challengeNote({ hundreds: 2, tens: 4, ones: 0 }, 243).text).toContain('Cột Đơn vị');
  });

  it('asks only numbers of three digits with a reading', () => {
    const bad = CHALLENGES.filter((n) => n < 100 || n > 999 || readTo1000(n) === String(n));
    expect(bad).toEqual([]);
  });
});
