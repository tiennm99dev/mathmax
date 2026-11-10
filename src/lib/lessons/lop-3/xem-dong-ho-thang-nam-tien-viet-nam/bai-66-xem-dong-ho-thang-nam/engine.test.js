import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, START, TARGETS, buildRound, clockAdvice } from './engine.js';

describe('setting the clock', () => {
  it('says when the clock is right, with the kém reading', () => {
    expect(clockAdvice(8 * 60 + 32, 8 * 60 + 32)).toEqual({
      ok: true,
      text: 'Đúng rồi! Đồng hồ chỉ 8 giờ 32 phút.',
    });
    expect(clockAdvice(4 * 60 + 55, 16 * 60 + 55).text).toBe(
      'Đúng rồi! Đồng hồ chỉ 4 giờ 55 phút, hay 5 giờ kém 5 phút.',
    );
  });

  it('points at the hand that is wrong', () => {
    expect(clockAdvice(8 * 60 + 32, 5 * 60 + 32).text).toContain(
      'Em quay kim ngắn ở giữa số 8 và số 9',
    );
    expect(clockAdvice(8 * 60 + 32, 8 * 60 + 10).text).toContain(
      'kim dài chỉ vạch nhỏ thứ 2 sau số 6',
    );
    expect(clockAdvice(8 * 60 + 32, START).text).toContain('Đồng hồ đang chỉ 7 giờ.');
  });

  it('never starts on a target', () => {
    expect(TARGETS.every((t) => !clockAdvice(t, START).ok)).toBe(true);
  });
});

describe('the practice round', () => {
  it('asks eight questions of the lesson parts', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const round = buildRound(seed);
      if (round.length !== 8) bad.push(seed);
      for (const q of round) {
        if (!q.kind || !(q.kind in KIND_LABELS) || !optionText(q.options[q.answer])) bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });
});
