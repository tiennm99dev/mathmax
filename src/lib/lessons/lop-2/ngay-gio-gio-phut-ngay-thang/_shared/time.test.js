import { describe, expect, it } from 'vitest';
import { toMinutes } from '#lib/units-engine/clock.js';
import {
  DAY_PARTS,
  daysIn,
  dayClockText,
  handsText,
  monthRows,
  namesOf,
  partOf,
  partText,
  sameOnDial,
  weekdayOf,
} from './time.js';

describe('parts of the day', () => {
  it('counts each of the 24 hours once', () => {
    const hours = DAY_PARTS.flatMap((p) => p.hours).sort((a, b) => a - b);
    expect(hours).toEqual(Array.from({ length: 24 }, (_, i) => i + 1));
  });

  it('names the book hours', () => {
    expect(partOf(toMinutes(10, 0))).toBe('sáng');
    expect(partOf(toMinutes(12, 0))).toBe('trưa');
    expect(partOf(toMinutes(18, 0))).toBe('chiều');
    expect(partOf(toMinutes(18, 30))).toBe('tối');
    expect(partOf(toMinutes(21, 30))).toBe('tối');
    expect(partOf(toMinutes(22, 0))).toBe('đêm');
    expect(partOf(0)).toBe('đêm');
  });
});

describe('saying a time', () => {
  it('gives both names of an afternoon time', () => {
    expect(namesOf(toMinutes(13, 0))).toEqual(['13 giờ', '1 giờ chiều']);
    expect(namesOf(toMinutes(15, 30))).toEqual([
      '15 giờ 30 phút',
      '3 giờ 30 phút chiều',
      '3 giờ rưỡi chiều',
    ]);
  });

  it('keeps one count for a morning time', () => {
    expect(namesOf(toMinutes(8, 15))).toEqual(['8 giờ 15 phút sáng']);
  });

  it('reads a quarter to the next hour', () => {
    expect(namesOf(toMinutes(8, 45))).toContain('9 giờ kém 15 phút sáng');
    expect(namesOf(toMinutes(23, 45))).toContain('12 giờ kém 15 phút đêm');
  });

  it('calls midnight 24 giờ or 12 giờ đêm', () => {
    expect(dayClockText(0)).toBe('24 giờ');
    expect(partText(0)).toBe('12 giờ đêm');
  });

  it('describes the hands without naming the time', () => {
    expect(handsText(toMinutes(4, 0))).toBe('kim ngắn chỉ số 4, kim dài chỉ số 12');
    expect(handsText(toMinutes(16, 15))).toBe('kim ngắn ở giữa số 4 và số 5, kim dài chỉ số 3');
    expect(handsText(toMinutes(12, 30))).toBe('kim ngắn ở giữa số 12 và số 1, kim dài chỉ số 6');
  });

  it('sees morning and afternoon as one position on the dial', () => {
    expect(sameOnDial(toMinutes(15, 0), toMinutes(3, 0))).toBe(true);
    expect(sameOnDial(toMinutes(15, 0), toMinutes(4, 0))).toBe(false);
  });
});

describe('calendar sheets', () => {
  it('agree with a real common-year calendar on every date', () => {
    const wrong = [];
    for (let month = 1; month <= 12; month++) {
      expect(daysIn(month)).toBe(new Date(Date.UTC(2022, month, 0)).getUTCDate());
      for (let date = 1; date <= daysIn(month); date++) {
        const real = (new Date(Date.UTC(2022, month - 1, date)).getUTCDay() + 6) % 7;
        if (weekdayOf(month, date) !== real) wrong.push(`${date}/${month}`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('places each date under its weekday', () => {
    const wrong = [];
    for (let month = 1; month <= 12; month++) {
      const rows = monthRows(month);
      const dates = rows.flat().filter((d) => d !== null);
      if (dates.length !== daysIn(month)) wrong.push(month);
      for (const row of rows) {
        if (row.length !== 7) wrong.push(month);
        row.forEach((d, col) => {
          if (d !== null && weekdayOf(month, d) !== col) wrong.push(`${d}/${month}`);
        });
      }
    }
    expect(wrong).toEqual([]);
  });
});
