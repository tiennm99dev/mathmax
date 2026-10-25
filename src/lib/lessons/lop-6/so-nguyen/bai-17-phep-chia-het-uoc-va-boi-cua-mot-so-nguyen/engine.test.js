import { describe, it, expect } from 'vitest';
import {
  DIVISOR_CHOICES,
  MULTIPLE_CHOICES,
  MULTIPLE_LIMIT,
  explain,
  isTarget,
  positiveDivisors,
  progress,
  reach,
  setText,
  targets,
  withOpposites,
} from './engine.js';

describe('divisor mode', () => {
  it('finds both the positive and the negative divisors', () => {
    expect(targets('uoc', -12)).toEqual([-12, -6, -4, -3, -2, -1, 1, 2, 3, 4, 6, 12]);
    expect(targets('uoc', 13)).toEqual([-13, -1, 1, 13]);
    expect(targets('uoc', -1)).toEqual([-1, 1]);
  });

  it('has twice as many divisors as positive divisors, symmetric about 0', () => {
    for (const a of DIVISOR_CHOICES) {
      const all = targets('uoc', a);
      expect(all.length).toBe(2 * positiveDivisors(a).length);
      for (const d of all) expect(all).toContain(-d);
      expect(Math.max(...all)).toBe(reach('uoc', a));
    }
  });

  it('never counts 0 as a divisor', () => {
    expect(isTarget('uoc', 12, 0)).toBe(false);
    expect(explain('uoc', 12, 0)).toContain('không là ước');
  });

  it('explains a divisor with its quotient and a non-divisor with the remainder test', () => {
    expect(explain('uoc', -18, 6)).toBe(
      '−18 = 6 · (−3), nên −18 : 6 = −3. Vậy 6 là một ước của −18.',
    );
    expect(explain('uoc', -18, -9)).toContain('−18 : (−9) = 2');
    expect(explain('uoc', 20, -3)).toContain('20 không chia hết cho 3');
  });

  it('writes the finished set', () => {
    expect(setText('uoc', -1)).toBe('Ư(−1) = {−1; 1}');
  });
});

describe('multiple mode', () => {
  it('lists the multiples between the limits, 0 included', () => {
    expect(targets('boi', -10)).toEqual([-30, -20, -10, 0, 10, 20, 30]);
    for (const b of MULTIPLE_CHOICES) {
      const all = targets('boi', b);
      expect(all).toContain(0);
      expect(all.length).toBe(2 * Math.floor(MULTIPLE_LIMIT / Math.abs(b)) + 1);
    }
  });

  it('explains a multiple as b times an integer', () => {
    expect(explain('boi', -4, 12)).toBe('12 = (−4) · (−3), nên 12 là một bội của −4.');
    expect(explain('boi', 7, 0)).toContain('0 là bội của mọi số nguyên khác 0');
    expect(explain('boi', 5, -13)).toContain('không là bội');
  });
});

describe('withOpposites and progress', () => {
  it('mirrors the found integers and reports completion', () => {
    const found = withOpposites([1, 2, 3, 6]);
    expect([...found].sort((x, y) => x - y)).toEqual([-6, -3, -2, -1, 1, 2, 3, 6]);
    expect(progress('uoc', 6, found)).toBe('Hoàn thành! Ư(6) = {−6; −3; −2; −1; 1; 2; 3; 6}.');
    expect(progress('uoc', 6, new Set([1, 5]))).toBe('Em đã tìm được 1 trên 8 ước của 6.');
  });
});
