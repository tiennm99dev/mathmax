import { describe, it, expect } from 'vitest';
import { formatFixed } from '#lib/core/number-format.js';
import { B, C, HALF, LIMITS, M, angleA, apexFromPointer, apexPoint, stepApex } from './engine.js';
import { angleAt, dist } from '#lib/geom-engine/plane.js';
import { UNIT } from '../_shared/quad.js';

describe('the median to the hypotenuse', () => {
  it('puts A at the asked distance from the midpoint of BC', () => {
    expect(dist(B, M)).toBe(dist(M, C));
    const A = apexPoint({ tenths: 63, dir: 70 });
    expect(dist(A, M) / UNIT).toBeCloseTo(6.3, 9);
  });

  it('gives a right angle at A exactly when MA = BC : 2, and a printed one never otherwise', () => {
    for (let tenths = LIMITS.tenthsMin; tenths <= LIMITS.tenthsMax; tenths++) {
      for (let dir = LIMITS.dirMin; dir <= LIMITS.dirMax; dir++) {
        const apex = { tenths, dir };
        const shown = Math.round(angleA(apex));
        expect(shown === 90, JSON.stringify(apex)).toBe(tenths === HALF * 10);
        expect(angleA(apex)).toBeCloseTo(angleAt(apexPoint(apex), B, C), 9);
        // The printed MA matches BC : 2 only on the circle.
        expect(formatFixed(tenths / 10, 1) === '5,0').toBe(tenths === 50);
      }
    }
  });

  it('reads and steps the apex within its limits', () => {
    const near = { x: M.x, y: M.y - 5.1 * UNIT };
    expect(apexFromPointer(near)).toEqual({ tenths: 50, dir: 90 });
    const off = { x: M.x, y: M.y - 5.3 * UNIT };
    expect(apexFromPointer(off)).toEqual({ tenths: 53, dir: 90 });
    expect(apexFromPointer({ x: M.x + 300, y: M.y + 40 }).dir).toBe(LIMITS.dirMin);
    expect(stepApex({ tenths: 50, dir: 90 }, 0, -1, false)).toEqual({ tenths: 51, dir: 90 });
    expect(stepApex({ tenths: 50, dir: 90 }, 1, 0, true)).toEqual({ tenths: 50, dir: 85 });
    expect(stepApex({ tenths: 80, dir: 155 }, -1, -1, true)).toEqual({ tenths: 80, dir: 155 });
  });
});
