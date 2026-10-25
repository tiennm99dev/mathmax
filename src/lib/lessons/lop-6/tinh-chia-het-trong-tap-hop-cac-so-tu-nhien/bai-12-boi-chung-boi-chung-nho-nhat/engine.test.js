import { describe, it, expect } from 'vitest';
import { lcm } from '#lib/numtheory-engine/index.js';
import { HORIZON, lightsAt, timelineLength, togetherUpTo } from './engine.js';

describe('lightsAt', () => {
  it('turns each light on at its multiples', () => {
    expect(lightsAt(12, 4, 6)).toEqual({ a: true, b: true });
    expect(lightsAt(8, 4, 6)).toEqual({ a: true, b: false });
    expect(lightsAt(7, 4, 6)).toEqual({ a: false, b: false });
  });
});

describe('togetherUpTo', () => {
  it('first flashes together at BCNN and then at its multiples', () => {
    expect(togetherUpTo(6, 8, 100)).toEqual([24, 48, 72, 96]);
    for (let a = 2; a <= 12; a++) {
      for (let b = 2; b <= 12; b++) {
        const m = lcm(a, b);
        const seen = togetherUpTo(a, b, HORIZON);
        expect(seen[0]).toBe(m);
        expect(seen.every((t) => t % m === 0)).toBe(true);
      }
    }
  });
});

describe('timelineLength', () => {
  it('shows the first meeting for every pair of periods up to 12', () => {
    expect(timelineLength(2, 3)).toBe(24);
    expect(timelineLength(6, 8)).toBe(48);
    expect(timelineLength(11, 12)).toBe(HORIZON);
    for (let a = 2; a <= 12; a++) {
      for (let b = 2; b <= 12; b++) expect(timelineLength(a, b)).toBeGreaterThanOrEqual(lcm(a, b));
    }
  });
});
