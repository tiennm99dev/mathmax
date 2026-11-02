import { describe, expect, it } from 'vitest';
import { WEEKDAYS, weekdayOf } from '#lib/core/kid/time.js';
import { toMinutes } from '#lib/units-engine/clock.js';
import { ACTIVITIES, PLAN_MONTH, WEEK, checkPlacement, planLine, planOf } from './engine.js';

describe('the week of the plan', () => {
  it('runs from thứ Hai to Chủ nhật', () => {
    expect(WEEK.map((d) => weekdayOf(PLAN_MONTH, d))).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('says each activity on the date and time stored for it', () => {
    const wrong = ACTIVITIES.filter((a) => {
      const day = WEEKDAYS[weekdayOf(PLAN_MONTH, a.date)];
      const named = a.when.includes(`ngày ${a.date} tháng ${PLAN_MONTH}`) || a.when.includes(day);
      return !named || !checkPlacement(a, a.date, a.minutes).ok;
    });
    expect(wrong).toEqual([]);
  });
});

describe('placing an activity', () => {
  const football = ACTIVITIES[3];

  it('asks for a date first', () => {
    expect(checkPlacement(football, null, football.minutes).ok).toBe(false);
  });

  it('points at the wrong date, then at the wrong hands', () => {
    expect(checkPlacement(football, 19, football.minutes).text).toContain('thứ Sáu');
    expect(checkPlacement(football, 20, toMinutes(9, 0)).text).toContain(
      'kim ngắn chỉ số 5, kim dài chỉ số 12',
    );
  });

  it('accepts the morning position for an afternoon time', () => {
    expect(checkPlacement(football, 20, toMinutes(5, 0)).ok).toBe(true);
    expect(planLine(football)).toBe('thứ Sáu, ngày 20 tháng 5, 17 giờ');
  });

  it('lists the plan in the order of the week', () => {
    expect(planOf(['grandma', 'read']).map((a) => a.id)).toEqual(['read', 'grandma']);
  });
});
