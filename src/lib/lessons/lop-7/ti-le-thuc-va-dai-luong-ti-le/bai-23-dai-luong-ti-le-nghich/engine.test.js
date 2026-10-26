import { describe, it, expect } from 'vitest';
import { equals, fraction, mul } from '#lib/fraction-engine/index.js';
import {
  AREAS,
  SIDE_MAX,
  change,
  lengthFraction,
  lengthRange,
  snapLength,
  widthFor,
} from './engine.js';

describe('rectangle of fixed area', () => {
  it('keeps x · y equal to the area for every allowed length', () => {
    for (const area of AREAS) {
      const { min, max } = lengthRange(area);
      for (let x = min; x <= max; x += 0.5) {
        const y = widthFor(area, x);
        expect(equals(mul(lengthFraction(x), y), fraction(area))).toBe(true);
        expect(y.n / y.d).toBeLessThanOrEqual(SIDE_MAX);
      }
    }
  });

  it('snaps lengths to halves inside the range', () => {
    expect(lengthRange(36)).toEqual({ min: 3, max: 12 });
    expect(snapLength(24, 3.3)).toBe(3.5);
    expect(snapLength(24, 0.2)).toBe(2);
    expect(snapLength(12, 40)).toBe(12);
    expect(widthFor(24, 3.5)).toEqual(fraction(48, 7));
  });

  it('divides the width by the factor the length is multiplied by', () => {
    const { lengthFactor, widthFactor } = change(24, 4, 6);
    expect(lengthFactor).toEqual(fraction(3, 2));
    expect(widthFactor).toEqual(fraction(2, 3));
    expect(equals(mul(lengthFactor, widthFactor), fraction(1))).toBe(true);
  });
});
