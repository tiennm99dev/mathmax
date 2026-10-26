import { describe, it, expect } from 'vitest';
import {
  angleAt,
  diagonalPoint,
  isConvex,
  quadAngles,
  roundToTotal,
  splitAlongDiagonal,
  splittingSide,
  units,
  UNIT,
} from './quad.js';

const square = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 0, y: 100 },
];

describe('angleAt', () => {
  it('measures right, straight and acute angles', () => {
    expect(angleAt({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(90);
    expect(angleAt({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 })).toBeCloseTo(180);
    expect(angleAt({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 })).toBeCloseTo(45);
  });
});

describe('quadAngles', () => {
  it('adds up to 360° for convex quadrilaterals', () => {
    const quads = [
      square,
      [
        { x: 90, y: 70 },
        { x: 300, y: 50 },
        { x: 340, y: 240 },
        { x: 60, y: 220 },
      ],
      [
        { x: 10, y: 10 },
        { x: 200, y: 40 },
        { x: 150, y: 90 },
        { x: 30, y: 120 },
      ],
    ];
    for (const q of quads) {
      expect(isConvex(q)).toBe(true);
      expect(quadAngles(q).reduce((s, a) => s + a, 0)).toBeCloseTo(360, 9);
    }
  });
});

describe('splittingSide', () => {
  it('finds no splitting side on a convex quadrilateral', () => {
    expect(splittingSide(square)).toBe(-1);
  });
  it('finds the side whose line separates the other two vertices of a dart', () => {
    const dart = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 30, y: 30 },
      { x: 0, y: 100 },
    ];
    const i = splittingSide(dart);
    expect(i).toBeGreaterThanOrEqual(0);
    expect(isConvex(dart)).toBe(false);
  });
  it('treats a crossed quadrilateral and collinear vertices as not convex', () => {
    const bow = [square[0], square[2], square[1], square[3]];
    expect(isConvex(bow)).toBe(false);
    const flat = [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 80 },
    ];
    expect(isConvex(flat)).toBe(false);
  });
});

describe('roundToTotal', () => {
  it('keeps the total and stays within one of each value', () => {
    const values = [70.4, 109.4, 90.4, 89.8];
    const out = roundToTotal(values, 360);
    expect(out.reduce((s, v) => s + v, 0)).toBe(360);
    out.forEach((v, i) => expect(Math.abs(v - values[i])).toBeLessThan(1));
  });
  it('leaves whole numbers alone', () => {
    expect(roundToTotal([90, 90, 90, 90], 360)).toEqual([90, 90, 90, 90]);
  });
});

describe('splitAlongDiagonal', () => {
  it('splits so each triangle prints 180° and parts add up to the printed angle', () => {
    const q = [
      { x: 90, y: 70 },
      { x: 300, y: 50 },
      { x: 340, y: 240 },
      { x: 60, y: 220 },
    ];
    const shown = roundToTotal(quadAngles(q), 360);
    for (const i of /** @type {const} */ ([0, 1])) {
      const { p, r } = splitAlongDiagonal(q, shown, i);
      expect(p[0] + shown[i + 1] + r[0]).toBe(180);
      expect(p[1] + shown[(i + 3) % 4] + r[1]).toBe(180);
      expect(p[0] + p[1]).toBe(shown[i]);
      expect(r[0] + r[1]).toBe(shown[i + 2]);
      p.concat(r).forEach((v) => expect(v).toBeGreaterThan(0));
    }
  });
});

describe('diagonalPoint', () => {
  it('meets at the centre of a parallelogram', () => {
    const A = { x: 0, y: 0 };
    const B = { x: 100, y: 0 };
    const C = { x: 140, y: 60 };
    const D = { x: 40, y: 60 };
    expect(diagonalPoint(A, B, C, D)).toEqual({ x: 70, y: 30 });
  });
  it('returns null for parallel lines', () => {
    const p = { x: 0, y: 0 };
    expect(diagonalPoint(p, { x: 0, y: 5 }, { x: 10, y: 0 }, { x: 10, y: 5 })).toBe(null);
  });
});

describe('units', () => {
  it('rounds to one decimal place of a printed unit', () => {
    expect(units(UNIT * 3.46)).toBe(3.5);
    expect(units(UNIT * 2)).toBe(2);
  });
});
