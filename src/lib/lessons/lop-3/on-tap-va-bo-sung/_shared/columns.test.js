import { describe, expect, it } from 'vitest';
import { resultOf } from '#lib/core/kid/column.js';
import { carryCount, columnSteps, columnWords, forgotCarry, VALUES } from './columns.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */

describe('column calculations', () => {
  it('reads a carry the way the book does', () => {
    expect(columnWords(146, 29, '+')).toBe(
      '6 cộng 9 bằng 15, viết 5, nhớ 1. 4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7. Hạ 1, viết 1. Vậy 146 + 29 = 175.',
    );
    expect(columnWords(394, 158, '-')).toBe(
      '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1. 5 thêm 1 bằng 6, 9 trừ 6 bằng 3, viết 3. 3 trừ 1 bằng 2, viết 2. Vậy 394 − 158 = 236.',
    );
  });

  it('leaves out a leading zero of a difference', () => {
    const steps = columnSteps(216, 132, '-');
    expect(steps.map((s) => s.digit)).toEqual([4, 8, 0]);
    expect(steps.map((s) => s.blank)).toEqual([false, false, true]);
    expect(columnWords(216, 132, '-')).toContain(
      '1 thêm 1 bằng 2, 2 trừ 2 bằng 0, không cần viết.',
    );
  });

  it('writes the carried 1 in a new column', () => {
    const steps = columnSteps(85, 41, '+');
    expect(steps.map((s) => s.digit)).toEqual([6, 2, 1]);
    expect(steps[2].text).toBe('Không còn chữ số nào, viết 1 đã nhớ.');
  });

  it('gets every result right, digit by digit', () => {
    const bad = [];
    for (let a = 1; a < 1000; a += 7) {
      for (let b = 1; b < 1000; b += 13) {
        for (const op of /** @type {Op[]} */ (['+', '-'])) {
          const r = resultOf(a, b, op);
          if (r < 0 || r > 999) continue;
          const value = columnSteps(a, b, op).reduce(
            (s, step) => s + (step.blank ? 0 : step.digit * VALUES[step.index]),
            0,
          );
          if (value !== r) bad.push([a, b, op]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('counts carries and the slip of forgetting one', () => {
    expect(carryCount(135, 48, '+')).toBe(1);
    expect(carryCount(435, 352, '+')).toBe(0);
    expect(carryCount(537, 361, '-')).toBe(1);
    expect(forgotCarry(135, 48, '+')).toBe(173);
    expect(forgotCarry(394, 158, '-')).toBe(246);
    expect(forgotCarry(435, 352, '+')).toBeNull();
  });

  it('never gives the digit away in what it asks', () => {
    const steps = columnSteps(394, 158, '-');
    expect(steps[0].ask).not.toContain('viết 6');
    expect(steps[0].hint).not.toContain('bằng 6');
  });
});
