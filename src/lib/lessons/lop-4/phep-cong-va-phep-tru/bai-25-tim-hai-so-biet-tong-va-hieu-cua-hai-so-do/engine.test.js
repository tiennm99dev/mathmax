import { describe, expect, it } from 'vitest';
import { PROBLEMS, feedback, solve, working } from './engine.js';

describe('sum and difference', () => {
  it('find two whole numbers with that sum and difference', () => {
    const bad = PROBLEMS.filter(({ sum, diff }) => {
      const { small, big } = solve(sum, diff);
      return !Number.isInteger(small) || small <= 0 || small + big !== sum || big - small !== diff;
    });
    expect(bad).toEqual([]);
  });

  it('show the working the book way', () => {
    expect(working(70, 10)).toEqual([
      'Hai lần số bé: 70 − 10 = 60.',
      'Số bé: 60 : 2 = 30.',
      'Số lớn: 30 + 10 = 40.',
    ]);
  });

  it('say how far the bars are from the sum', () => {
    expect(feedback(70, 10, 25)).toEqual({
      tone: 'info',
      text: 'Hai số cộng lại được 60, còn thiếu 10 so với tổng 70.',
    });
    expect(feedback(70, 10, 32).tone).toBe('warn');
    expect(feedback(70, 10, 30).tone).toBe('ok');
  });
});
