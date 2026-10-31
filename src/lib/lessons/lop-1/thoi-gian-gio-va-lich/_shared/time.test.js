import { describe, expect, it } from 'vitest';
import {
  ROUTINES,
  WEEKDAYS,
  dayAfter,
  dayTitle,
  dialHour,
  hourOfDay,
  hourOptions,
  isWholeHour,
  weekdayOf,
} from './time.js';

describe('days of the week', () => {
  it('has seven days from thứ Hai to Chủ nhật', () => {
    expect(WEEKDAYS).toHaveLength(7);
    expect(WEEKDAYS[0]).toBe('thứ Hai');
    expect(WEEKDAYS[6]).toBe('Chủ nhật');
  });

  it('wraps from Chủ nhật to thứ Hai and back', () => {
    expect(dayAfter(6)).toBe(0);
    expect(dayAfter(0, -1)).toBe(6);
    expect(dayAfter(2, 7)).toBe(2);
    expect(dayTitle(3)).toBe('Thứ Năm');
    expect(dayTitle(6)).toBe('Chủ nhật');
  });

  it('finds the weekday of a date from the first day of the month', () => {
    // A month that starts on a thứ Tư: the 8th is a thứ Tư again, the 5th a Chủ nhật.
    expect(weekdayOf(1, 2)).toBe(2);
    expect(weekdayOf(8, 2)).toBe(2);
    expect(weekdayOf(5, 2)).toBe(6);
  });
});

describe('whole hours on the dial', () => {
  it('reads the hour hand from 1 to 12', () => {
    expect(dialHour(0)).toBe(12);
    expect(dialHour(3 * 60)).toBe(3);
    expect(dialHour(12 * 60)).toBe(12);
    expect(dialHour(21 * 60)).toBe(9);
    expect(isWholeHour(9 * 60)).toBe(true);
    expect(isWholeHour(9 * 60 + 5)).toBe(false);
  });

  it('offers three different hours including the right one', () => {
    const bad = [];
    for (let h = 1; h <= 12; h++) {
      const o = hourOptions(h);
      if (o.length !== 3 || new Set(o).size !== 3 || !o.includes(h)) bad.push(h);
      if (o.some((v) => v < 1 || v > 12)) bad.push(h);
    }
    expect(bad).toEqual([]);
  });
});

describe('a school day', () => {
  it('says each routine time with the part of the day', () => {
    expect(ROUTINES.map((r) => hourOfDay(r.hour))).toEqual([
      '6 giờ sáng',
      '7 giờ sáng',
      '11 giờ trưa',
      '5 giờ chiều',
      '7 giờ tối',
      '9 giờ tối',
    ]);
  });
});
