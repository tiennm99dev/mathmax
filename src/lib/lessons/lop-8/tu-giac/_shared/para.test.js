import { describe, it, expect } from 'vitest';
import { formatFixed } from '#lib/core/number-format.js';
import {
  RANGE,
  diagonalAngle,
  diagonals,
  kindOf,
  paraPoints,
  polarFromPointer,
  sideFromPointer,
  splitAtA,
} from './para.js';
import { angleAt, dist } from '#lib/geom-engine/plane.js';
import { UNIT } from './quad.js';

const A = { x: 100, y: 200 };

/** Every setting the widgets allow. */
function* settings() {
  for (let a = RANGE.aMin; a <= RANGE.aMax; a++) {
    for (let b = RANGE.bMin; b <= RANGE.bMax; b++) {
      for (let deg = RANGE.degMin; deg <= RANGE.degMax; deg++) yield { a, b, deg };
    }
  }
}

describe('the parallelogram from its settings', () => {
  it('has the asked sides and angle, and opposite sides equal', () => {
    for (const p of settings()) {
      const { B, C, D } = paraPoints(A, p);
      expect(dist(A, B) / UNIT).toBeCloseTo(p.a, 9);
      expect(dist(A, D) / UNIT).toBeCloseTo(p.b, 9);
      expect(dist(C, D) / UNIT).toBeCloseTo(p.a, 9);
      expect(dist(B, C) / UNIT).toBeCloseTo(p.b, 9);
      expect(angleAt(A, B, D)).toBeCloseTo(p.deg, 9);
    }
  });

  it('gives diagonal lengths that match the drawing', () => {
    for (const p of settings()) {
      const { B, C, D } = paraPoints(A, p);
      const { ac, bd } = diagonals(p);
      expect(ac).toBeCloseTo(dist(A, C) / UNIT, 9);
      expect(bd).toBeCloseTo(dist(B, D) / UNIT, 9);
    }
  });

  it('measures the angle between the diagonals and the parts of Â', () => {
    for (const p of settings()) {
      const { B, C, D } = paraPoints(A, p);
      const O = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
      const at = angleAt(O, A, B);
      expect(diagonalAngle(p)).toBeCloseTo(Math.min(at, 180 - at), 6);
      const { cab, cad } = splitAtA(p);
      expect(cab).toBeCloseTo(angleAt(A, B, C), 6);
      expect(cad).toBeCloseTo(angleAt(A, C, D), 6);
    }
  });
});

describe('special shapes print differently from ordinary ones', () => {
  it('equal printed diagonals (two decimals) only in a rectangle', () => {
    for (const p of settings()) {
      const { ac, bd } = diagonals(p);
      expect(formatFixed(ac, 2) === formatFixed(bd, 2), JSON.stringify(p)).toBe(kindOf(p).rect);
    }
  });

  it('a printed right angle between the diagonals only in a rhombus', () => {
    for (const p of settings()) {
      expect(Math.round(diagonalAngle(p)) === 90, JSON.stringify(p)).toBe(kindOf(p).rhombus);
    }
  });

  it('equal printed parts of Â only in a rhombus', () => {
    for (const p of settings()) {
      if (kindOf(p).rhombus) continue;
      const { cab } = splitAtA(p);
      const shown = Math.round(cab);
      expect(shown * 2 === p.deg, JSON.stringify(p)).toBe(false);
    }
  });
});

describe('pointer settings', () => {
  it('rounds AB to whole units within range', () => {
    expect(sideFromPointer(A, { x: A.x + 5.4 * UNIT, y: 0 })).toBe(5);
    expect(sideFromPointer(A, { x: A.x - 50, y: 0 })).toBe(RANGE.aMin);
    expect(sideFromPointer(A, { x: A.x + 99 * UNIT, y: 0 })).toBe(RANGE.aMax);
  });

  it('rounds AD and Â, and snaps near a right angle', () => {
    const at = (/** @type {number} */ r, /** @type {number} */ deg) => ({
      x: A.x + r * UNIT * Math.cos((deg * Math.PI) / 180),
      y: A.y - r * UNIT * Math.sin((deg * Math.PI) / 180),
    });
    expect(polarFromPointer(A, at(5.2, 70.4))).toEqual({ b: 5, deg: 70 });
    expect(polarFromPointer(A, at(6, 92.5))).toEqual({ b: 6, deg: 90 });
    expect(polarFromPointer(A, at(6, 95))).toEqual({ b: 6, deg: 95 });
    expect(polarFromPointer(A, at(6, 10))).toEqual({ b: 6, deg: RANGE.degMin });
    expect(polarFromPointer(A, at(4, -100)).deg).toBe(RANGE.degMax);
    expect(polarFromPointer(A, at(40, 100)).b).toBe(RANGE.bMax);
  });
});
