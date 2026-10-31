import { describe, expect, it } from 'vitest';
import { dayAfter } from '../_shared/time.js';
import { answerFeedback, dayAngle, daySentences, questionOf, roleOf, turnTo } from './engine.js';

describe('week wheel', () => {
  it('turns the short way and puts the chosen day on top', () => {
    const bad = [];
    for (let turn = -10; turn <= 10; turn++) {
      for (let day = 0; day < 7; day++) {
        const next = turnTo(turn, day);
        const turns = dayAngle(day, next) / 360;
        if (Math.abs(next - turn) > 3 || Math.abs(turns - Math.round(turns)) > 1e-9)
          bad.push({ turn, day, next });
      }
    }
    expect(bad).toEqual([]);
  });

  it('marks yesterday, today and tomorrow across the week end', () => {
    expect(roleOf(6, 0)).toBe('yesterday');
    expect(roleOf(0, 0)).toBe('today');
    expect(roleOf(1, 0)).toBe('tomorrow');
    expect(roleOf(3, 0)).toBe(null);
    expect(daySentences(6)).toEqual([
      'Hôm qua là thứ Bảy.',
      'Hôm nay là Chủ nhật.',
      'Ngày mai là thứ Hai.',
    ]);
  });

  it('asks about every day, with the answer next to today', () => {
    const todays = new Set();
    const bad = [];
    for (let r = 0; r < 14; r++) {
      const q = questionOf(r);
      todays.add(q.today);
      const want = dayAfter(q.today, q.ask === 'tomorrow' ? 1 : -1);
      if (q.answer !== want) bad.push(r);
    }
    expect(bad).toEqual([]);
    expect(todays.size).toBe(7);
    const q = questionOf(0);
    expect(q.prompt).toBe('Hôm nay là thứ Ba. Ngày mai là thứ mấy?');
    expect(answerFeedback(q, 2)).toBe('Đúng rồi! Ngày mai là thứ Tư.');
    expect(answerFeedback(q, 1)).toContain('hôm nay');
    expect(answerFeedback(q, 5)).toContain('ngay sau');
  });
});
