import { describe, expect, it } from 'vitest';
import { CHALLENGES, angleWithOx, crossing, relation, xIntercept } from './engine.js';

describe('two lines', () => {
  it('classifies by slope and intercept', () => {
    expect(relation({ a: 2, b: 1 }, { a: 2, b: -3 })).toBe('song-song');
    expect(relation({ a: 2, b: 1 }, { a: 2, b: 1 })).toBe('trung');
    expect(relation({ a: 2, b: 1 }, { a: -1, b: 1 })).toBe('cat');
  });

  it('finds the crossing point', () => {
    expect(crossing({ a: 2, b: 1 }, { a: -1, b: 4 })).toEqual({ x: 1, y: 3 });
    expect(crossing({ a: 2, b: 1 }, { a: 2, b: 4 })).toBeNull();
  });

  it('measures the angle with Ox', () => {
    expect(angleWithOx(1)).toBeCloseTo(45, 9);
    expect(angleWithOx(-1)).toBeCloseTo(135, 9);
    expect(angleWithOx(0)).toBeNull();
    expect(/** @type {number} */ (angleWithOx(3))).toBeGreaterThan(
      /** @type {number} */ (angleWithOx(1)),
    );
    expect(xIntercept({ a: 2, b: -4 })).toBe(2);
  });

  it('every challenge can be met with slider values', () => {
    const vals = [];
    for (let v = -8; v <= 8; v++) vals.push(v / 2);
    for (const c of CHALLENGES) {
      let ok = false;
      for (const a of vals)
        for (const b of [-2, 0, 1, 2, 3])
          for (const a2 of vals)
            for (const b2 of [-2, 0, 1, 2, 3, 4, 5])
              if (c.test({ a, b }, { a: a2, b: b2 })) ok = true;
      expect(ok, c.text).toBe(true);
    }
  });
});
