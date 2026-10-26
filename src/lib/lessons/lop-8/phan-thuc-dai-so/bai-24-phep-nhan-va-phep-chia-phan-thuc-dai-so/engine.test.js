import { describe, expect, it } from 'vitest';
import { numberText } from '#lib/core/decimal.js';
import { CARDS, combine, flip, originalAt } from './engine.js';
import { cancelAll, productTex, ratioAt, ratioTex, standing } from '../_shared/factors.js';

describe('fraction cards', () => {
  it('stand for the fractions printed in the lesson', () => {
    expect(CARDS.map((c) => ratioTex(c.top, c.bottom))).toEqual([
      '\\dfrac{(x - 1)(x + 1)}{2x}',
      '\\dfrac{4x}{x + 1}',
      '\\dfrac{x - 1}{x + 3}',
      '\\dfrac{3(x + 3)}{x^{2}}',
    ]);
  });

  it('multiply and reduce A · B to 2(x − 1)', () => {
    const c = combine(CARDS[0], 'mul', CARDS[1]);
    const { topOut, bottomOut } = cancelAll(c.top, c.bottom);
    expect(ratioTex(standing(c.top, topOut), standing(c.bottom, bottomOut))).toBe('2(x - 1)');
  });

  it('divide by turning the second card over', () => {
    expect(flip(CARDS[2])).toEqual({ top: CARDS[2].bottom, bottom: CARDS[2].top });
    const c = combine(CARDS[0], 'div', CARDS[2]);
    const { topOut, bottomOut } = cancelAll(c.top, c.bottom);
    expect(productTex(standing(c.top, topOut))).toBe('(x + 1)(x + 3)');
    expect(productTex(standing(c.bottom, bottomOut))).toBe('2x');
  });

  it('agree with the original expression wherever it is defined', () => {
    for (const a of CARDS) {
      for (const b of CARDS) {
        for (const op of /** @type {const} */ (['mul', 'div'])) {
          const c = combine(a, op, b);
          for (let v = -5; v <= 5; v += 0.5) {
            const want = originalAt(a, op, b, v);
            if (want === null) continue;
            expect(ratioAt(c.top, c.bottom, v)).toBeCloseTo(want, 9);
          }
        }
      }
    }
  });

  it('give the reduced fraction exactly the value of the original, so both print alike', () => {
    for (const a of CARDS) {
      for (const b of CARDS) {
        for (const op of /** @type {const} */ (['mul', 'div'])) {
          const c = combine(a, op, b);
          const { topOut, bottomOut } = cancelAll(c.top, c.bottom);
          for (let v = -5; v <= 5; v += 0.5) {
            const want = originalAt(a, op, b, v);
            if (want === null) continue;
            const got = ratioAt(standing(c.top, topOut), standing(c.bottom, bottomOut), v);
            expect(numberText(/** @type {number} */ (got))).toBe(numberText(want));
            expect(numberText(want).length).toBeLessThan(12);
          }
        }
      }
    }
  });

  it('leave a division undefined where the divisor is 0', () => {
    expect(originalAt(CARDS[0], 'div', CARDS[2], 1)).toBeNull();
    expect(originalAt(CARDS[0], 'mul', CARDS[2], 1)).toBe(0);
  });
});
