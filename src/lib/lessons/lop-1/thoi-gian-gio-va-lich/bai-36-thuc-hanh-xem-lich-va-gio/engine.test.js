import { describe, expect, it } from 'vitest';
import { toMinutes } from '#lib/units-engine/clock.js';
import { ROUTINES } from '../_shared/time.js';
import {
  MISSIONS,
  MONTH_LENGTH,
  checkRoutine,
  missionFeedback,
  missionOf,
  sheetSentences,
  weekdayOn,
} from './engine.js';

describe('daily schedule on the clock', () => {
  it('accepts each routine on its own hour, morning or evening on the dial', () => {
    const bad = [];
    for (const r of ROUTINES) {
      if (!checkRoutine(toMinutes(r.hour, 0), r).ok) bad.push(r.id);
      if (!checkRoutine(toMinutes((r.hour + 12) % 24, 0), r).ok) bad.push(r.id);
      if (checkRoutine(toMinutes(r.hour + 1, 0), r).ok) bad.push(r.id);
      if (checkRoutine(toMinutes(r.hour, 30), r).ok) bad.push(r.id);
    }
    expect(bad).toEqual([]);
  });

  it('tells which hour the clock shows and which is needed', () => {
    const sleep = ROUTINES.find((r) => r.id === 'sleep');
    if (!sleep) throw new Error('missing routine');
    expect(checkRoutine(toMinutes(8, 0), sleep).text).toBe(
      'Đồng hồ đang chỉ 8 giờ. Đi ngủ lúc 9 giờ tối: kim ngắn chỉ số 9.',
    );
    expect(checkRoutine(toMinutes(21, 0), sleep).text).toBe('Đúng rồi! Đi ngủ lúc 9 giờ tối.');
  });
});

describe('tear-off calendar of May', () => {
  it('starts on a thứ Sáu and has 31 pages', () => {
    expect(MONTH_LENGTH).toBe(31);
    expect(weekdayOn(1)).toBe(4);
    expect(weekdayOn(3)).toBe(6);
    expect(weekdayOn(31)).toBe(6);
  });

  it('reads a page and the next one, across the end of the month', () => {
    expect(sheetSentences(1)).toEqual([
      'Tờ lịch ghi: thứ Sáu, ngày 1 tháng 5.',
      'Tờ sau là thứ Bảy, ngày 2 tháng 5.',
    ]);
    expect(sheetSentences(31)[1]).toBe('Tờ sau là thứ Hai, ngày 1 tháng 6.');
  });

  it('knows the weekday of every mission date, each a different day', () => {
    /** @type {Record<number, number>} */
    const want = { 10: 6, 19: 1, 6: 2, 23: 5, 15: 4, 28: 3 };
    const bad = MISSIONS.filter(
      (d) => weekdayOn(d) !== want[d] || !missionFeedback(d, want[d]).startsWith('Đúng'),
    );
    expect(bad).toEqual([]);
    expect(new Set(MISSIONS.map(weekdayOn)).size).toBe(MISSIONS.length);
    expect(missionOf(MISSIONS.length)).toBe(MISSIONS[0]);
    expect(missionFeedback(10, 0)).toContain('Chưa đúng');
  });
});
