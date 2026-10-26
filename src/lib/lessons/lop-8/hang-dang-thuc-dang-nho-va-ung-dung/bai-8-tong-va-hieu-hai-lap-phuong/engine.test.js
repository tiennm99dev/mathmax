import { describe, it, expect } from 'vitest';
import { LEFT, RIGHT, expand, leftValue, matches, rightValue, witness } from './engine.js';

describe('sum and difference of cubes cards', () => {
  it('gives every left card exactly one matching product', () => {
    for (const left of LEFT) {
      expect(RIGHT.filter((r) => matches(left, r))).toHaveLength(1);
    }
  });

  it('pairs each card with its product form', () => {
    /** @param {string} l @param {string} r */
    const ok = (l, r) =>
      matches(
        /** @type {import('./engine.js').LeftCard} */ (LEFT.find((c) => c.id === l)),
        /** @type {import('./engine.js').RightCard} */ (RIGHT.find((c) => c.id === r)),
      );
    expect(ok('l1', 'r2')).toBe(true);
    expect(ok('l2', 'r7')).toBe(true);
    expect(ok('l3', 'r4')).toBe(true);
    expect(ok('l4', 'r6')).toBe(true);
    expect(ok('l1', 'r5')).toBe(false);
  });

  it('expands the sign-slip products to something else', () => {
    // (x + 2)(x² + 2x + 4) = x³ + 4x² + 8x + 8
    expect(expand(RIGHT[4])).toEqual([8, 8, 4, 1]);
  });

  it('agrees with the values of the expressions it writes', () => {
    for (const x of [-2, 0, 1, 3]) {
      expect(leftValue(LEFT[0], x)).toBe(x ** 3 + 8);
      expect(rightValue(RIGHT[1], x)).toEqual({
        first: x + 2,
        second: x * x - 2 * x + 4,
        value: (x + 2) * (x * x - 2 * x + 4),
      });
    }
  });

  it('finds a value of x that tells two different cards apart', () => {
    for (const left of LEFT) {
      for (const right of RIGHT) {
        const w = witness(left, right);
        if (matches(left, right)) expect(w).toBeNull();
        else {
          expect(w).not.toBeNull();
          expect(leftValue(left, /** @type {number} */ (w))).not.toBe(
            rightValue(right, /** @type {number} */ (w)).value,
          );
        }
      }
    }
  });
});
