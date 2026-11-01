import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { toMinutes } from '#lib/units-engine/clock.js';
import { TARGETS, buildClockRound, checkTarget, walkMessage } from './engine.js';

describe('setting a clock to a named time', () => {
  it('accepts the morning position for an afternoon time', () => {
    const r = checkTarget(toMinutes(3, 0), toMinutes(15, 0));
    expect(r.ok).toBe(true);
    expect(r.text).toContain('15 giờ còn gọi là 3 giờ chiều');
  });

  it('points at the hand that is wrong', () => {
    expect(checkTarget(toMinutes(8, 0), toMinutes(8, 30)).text).toContain('kim dài chỉ số 6');
    expect(checkTarget(toMinutes(4, 15), toMinutes(14, 15)).text).toContain('ở giữa số 2 và số 3');
    expect(checkTarget(toMinutes(5, 0), toMinutes(20, 0)).text).toContain('chỉ số 8');
  });

  it('names each target so it matches its time', () => {
    const wrong = TARGETS.filter((t) => !checkTarget(t.minutes, t.minutes).ok);
    expect(wrong).toEqual([]);
    expect(TARGETS.map((t) => t.minutes)).toEqual([
      15 * 60,
      8 * 60 + 30,
      20 * 60,
      14 * 60 + 15,
      21 * 60 + 30,
      17 * 60 + 15,
    ]);
  });
});

describe('the walk of the minute hand', () => {
  it('counts five minutes per number and sixty per lap', () => {
    expect(walkMessage(15)).toBe('Kim dài chỉ số 3: đã đi 15 phút.');
    expect(walkMessage(60)).toContain('1 giờ = 60 phút');
  });
});

describe('the round of clocks', () => {
  it('has one right reading in each question, for many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildClockRound(seed)) {
        const hour = Math.floor(/** @type {number} */ (q.visual) / 60) || 12;
        const minutes = /** @type {number} */ (q.visual) % 60;
        const texts = q.options.map(optionText);
        const expected =
          minutes === 0
            ? [`${hour} giờ`]
            : minutes === 15
              ? [`${hour} giờ 15 phút`]
              : [`${hour} giờ 30 phút`, `${hour} giờ rưỡi`];
        if (!expected.includes(texts[q.answer])) bad.push(q.solution);
        if (new Set(texts).size !== texts.length) bad.push(texts.join('/'));
        if (texts.length < 3) bad.push(texts.join('/'));
      }
    }
    expect(bad).toEqual([]);
  });

  it('is the same for the same seed', () => {
    expect(buildClockRound(1)).toEqual(buildClockRound(1));
  });
});
