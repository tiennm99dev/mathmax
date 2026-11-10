import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { WEEKDAYS } from '#lib/core/kid/time.js';
import { daysIn, weekdayOf } from '../_shared/time.js';
import { checkMission, checkWeekday, makeMission } from './engine.js';

describe('the birthday weekday', () => {
  it('checks the weekday against the calendar sheet', () => {
    const w = weekdayOf(6, 15);
    expect(checkWeekday(6, 15, w).ok).toBe(true);
    expect(checkWeekday(6, 15, w).text).toContain(WEEKDAYS[w]);
    expect(checkWeekday(6, 15, (w + 1) % 7)).toEqual({
      ok: false,
      text: 'Chưa đúng. Em tìm ngày 15 trên tờ lịch tháng 6, rồi nhìn lên chữ ở đầu cột.',
    });
  });
});

describe('the calendar missions', () => {
  it('have answers that the sheet confirms', () => {
    const rand = rng(67);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const m = makeMission(rand);
      if (m.kind === 'weekday') {
        const date = Number(/ngày (\d+) tháng/.exec(m.prompt)?.[1]);
        if (weekdayOf(m.month, date) !== m.answer) bad.push(m);
        continue;
      }
      if (m.answer < 1 || m.answer > daysIn(m.month)) bad.push(m);
      const nth = /vào (.+) (đầu tiên|cuối cùng) của tháng/.exec(m.prompt);
      if (nth) {
        const w = WEEKDAYS.indexOf(/** @type {any} */ (nth[1]));
        const sameDay = (/** @type {number} */ d) => weekdayOf(m.month, d) === w;
        const ok =
          sameDay(m.answer) &&
          (nth[2] === 'đầu tiên' ? m.answer <= 7 : m.answer + 7 > daysIn(m.month));
        if (!ok) bad.push(m);
      }
      const later = /ngày (\d+) tháng \d+\. (\d+) ngày nữa/.exec(m.prompt);
      if (later && Number(later[1]) + Number(later[2]) !== m.answer) bad.push(m);
      if (!nth && !later) bad.push(m);
    }
    expect(bad).toEqual([]);
  });

  it('praises the right answer and helps after a wrong one', () => {
    const m = makeMission(rng(5));
    expect(checkMission(m, m.answer).ok).toBe(true);
    const wrong = m.kind === 'weekday' ? (m.answer + 1) % 7 : m.answer === 1 ? 2 : m.answer - 1;
    expect(checkMission(m, wrong).ok).toBe(false);
  });
});
