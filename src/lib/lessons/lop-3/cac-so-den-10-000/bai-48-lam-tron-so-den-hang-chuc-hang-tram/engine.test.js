import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import { roundTo } from '../_shared/numbers-to-10000.js';
import { NUMBERS, along, ballText, guessVerdict, hillHeight, marksAround } from './engine.js';

describe('the hill', () => {
  it('puts the marks around a number', () => {
    expect(marksAround(2826, 10)).toEqual({ lo: 2820, hi: 2830, mid: 2825 });
    expect(marksAround(3256, 100)).toEqual({ lo: 3200, hi: 3300, mid: 3250 });
    expect(marksAround(9995, 10).hi).toBe(10000);
  });

  it('places the ball and the hill', () => {
    expect(along(2826, 10)).toBeCloseTo(0.6);
    expect(hillHeight(0)).toBe(0);
    expect(hillHeight(0.5)).toBe(1);
    expect(hillHeight(1)).toBe(0);
  });

  it('asks only numbers that are not round yet', () => {
    const round = [];
    for (const unit of /** @type {const} */ ([10, 100])) {
      for (const n of NUMBERS[unit]) if (n % unit === 0) round.push(n);
    }
    expect(round).toEqual([]);
  });

  it('rolls every number to a mark around it', () => {
    const bad = [];
    for (const unit of /** @type {const} */ ([10, 100])) {
      for (let n = 1; n <= 9999; n += 7) {
        const { lo, hi } = marksAround(n, unit);
        const r = roundTo(n, unit);
        if (r !== lo && r !== hi) bad.push(n);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('guessing the mark', () => {
  it('accepts the right mark', () => {
    const v = guessVerdict(3064, 10, 3060);
    expect(v.ok).toBe(true);
    expect(v.text).toContain('làm tròn xuống');
  });

  it('rounds the top of the hill up', () => {
    expect(guessVerdict(1255, 10, 1260).ok).toBe(true);
    expect(guessVerdict(850, 100, 800).ok).toBe(false);
  });

  it('describes where the ball is', () => {
    expect(ballText(43, 10)).toContain('gần 40 hơn');
    expect(ballText(850, 100)).toContain('đỉnh dốc');
    expect(ballText(3200, 100)).toContain(`mốc ${fmt(3200)}`);
  });
});
