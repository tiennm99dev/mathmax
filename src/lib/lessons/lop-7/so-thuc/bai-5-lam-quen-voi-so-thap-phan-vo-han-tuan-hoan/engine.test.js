import { describe, it, expect } from 'vitest';
import {
  PRESETS,
  ROUNDING_NUMBERS,
  checkRounding,
  divisionRows,
  finiteReason,
  roundingCase,
} from './engine.js';
import { PRECISIONS } from '#lib/core/decimal.js';

describe('division rows', () => {
  it('shows each remainder with a zero brought down', () => {
    const rows = divisionRows(5, 11);
    expect(rows.map((r) => [r.dividend, r.digit, r.after])).toEqual([
      [50, 4, 6],
      [60, 5, 5],
    ]);
    expect(rows.every((r) => r.inPeriod)).toBe(true);
    expect(rows[1].repeats).toBe(true);
  });

  it('keeps the digits before the period out of it', () => {
    const rows = divisionRows(7, 12);
    expect(rows.map((r) => r.digit)).toEqual([5, 8, 3]);
    expect(rows.map((r) => r.inPeriod)).toEqual([false, false, true]);
  });

  it('ends on a zero remainder for a finite decimal', () => {
    const rows = divisionRows(3, 20);
    expect(rows.map((r) => r.digit)).toEqual([1, 5]);
    expect(rows.at(-1)?.after).toBe(0);
    expect(rows.some((r) => r.repeats || r.inPeriod)).toBe(false);
  });

  it('works for every preset', () => {
    for (const [p, q] of PRESETS) {
      const rows = divisionRows(p, q);
      let value = Math.floor(p / q);
      rows.forEach((r, i) => (value += r.digit / 10 ** (i + 1)));
      // The digits shown so far fall short of p/q by less than one unit of the last place.
      const gap = p / q - value;
      expect(gap).toBeGreaterThanOrEqual(-1e-12);
      expect(gap).toBeLessThan(10 ** -rows.length);
    }
  });
});

describe('finite or repeating', () => {
  it('explains by the prime factors of the lowest-terms denominator', () => {
    expect(finiteReason(3, 20).finite).toBe(true);
    expect(finiteReason(5, 11).finite).toBe(false);
    expect(finiteReason(9, 30).finite).toBe(true);
    expect(finiteReason(9, 30).text).toContain('3/10');
    expect(finiteReason(14, 35).finite).toBe(true);
    expect(finiteReason(6, 3).finite).toBe(true);
  });
});

describe('rounding widget', () => {
  it('rounds 2/3 to every precision', () => {
    expect(PRECISIONS.map((_, i) => roundingCase(2, 3, i).answerText)).toEqual([
      '1',
      '0,7',
      '0,67',
      '0,667',
    ]);
  });

  it('rounds negatives the same way as their opposites', () => {
    const c = roundingCase(-1, 6, 1);
    expect(c.answerText).toBe('−0,2');
    expect(c.next).toBe('6');
    expect(c.up).toBe(true);
  });

  it('keeps the rounding error within the precision', () => {
    ROUNDING_NUMBERS.forEach(([p, q]) => {
      PRECISIONS.forEach((pr, i) => {
        const c = roundingCase(p, q, i);
        expect(Math.abs(p / q - c.answer)).toBeLessThanOrEqual(5 / 10 ** (pr.places + 1) + 1e-12);
      });
    });
  });

  it('checks typed answers', () => {
    expect(checkRounding('0,67', 0.67)).toBe('right');
    expect(checkRounding('0.67', 0.67)).toBe('right');
    expect(checkRounding('0,66', 0.67)).toBe('wrong');
    expect(checkRounding('abc', 0.67)).toBe('invalid');
  });
});
