import { describe, expect, it } from 'vitest';
import { toMinutes } from '#lib/units-engine/clock.js';
import { TARGETS, judgeClock, readFeedback, targetHour } from './engine.js';

describe('whole-hour clock game', () => {
  it('asks every hour from 1 to 12 once per cycle, never twice in a row', () => {
    expect([...TARGETS].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const bad = [];
    for (let r = 0; r < 30; r++) if (targetHour(r) === targetHour(r + 1)) bad.push(r);
    expect(bad).toEqual([]);
  });

  it('accepts the hour in the morning or the afternoon', () => {
    expect(judgeClock(toMinutes(3, 0), 3).state).toBe('right');
    expect(judgeClock(toMinutes(15, 0), 3).state).toBe('right');
    expect(judgeClock(toMinutes(0, 0), 12).state).toBe('right');
    expect(judgeClock(toMinutes(12, 0), 12).state).toBe('right');
  });

  it('points at the minute hand first, then the hour hand', () => {
    expect(judgeClock(toMinutes(3, 25), 3).state).toBe('minute');
    const wrong = judgeClock(toMinutes(5, 0), 3);
    expect(wrong.state).toBe('hour');
    expect(wrong.text).toContain('5 giờ');
    expect(wrong.text).toContain('số 3');
  });

  it('explains a pick of 12 as reading the long hand', () => {
    expect(readFeedback(4, 4)).toContain('Đúng rồi');
    expect(readFeedback(12, 4)).toContain('kim dài');
    expect(readFeedback(5, 4)).toContain('Chưa đúng');
  });
});
