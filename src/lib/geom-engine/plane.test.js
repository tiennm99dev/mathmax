import { describe, it, expect } from 'vitest';
import {
  angleAt,
  bisectorFoot,
  cross,
  diagonalPoint,
  dist,
  foot,
  isConvex,
  isParallel,
  labelSpot,
  lerp,
  midpoint,
  polygonArea,
  quadAngles,
  splittingSide,
  triangleFromSides,
} from './plane.js';

const square = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 0, y: 100 },
];

describe('points and angles', () => {
  it('measures right, straight and acute angles at the first point', () => {
    const V = { x: 0, y: 0 };
    expect(angleAt(V, { x: 1, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(90, 9);
    expect(angleAt(V, { x: 1, y: 0 }, { x: -1, y: 0 })).toBeCloseTo(180, 9);
    expect(angleAt(V, { x: 1, y: 0 }, { x: 1, y: 1 })).toBeCloseTo(45, 9);
    expect(angleAt(V, V, { x: 1, y: 1 })).toBe(0);
  });

  it('measures lengths, midpoints and points along a segment', () => {
    expect(dist({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(midpoint({ x: 0, y: 0 }, { x: 4, y: 2 })).toEqual({ x: 2, y: 1 });
    expect(lerp({ x: 0, y: 0 }, { x: 10, y: 20 }, 0.25)).toEqual({ x: 2.5, y: 5 });
  });

  it('finds parallel segments and collinear points', () => {
    const A = { x: 2, y: 8 };
    const B = { x: 0, y: 0 };
    const C = { x: 10, y: 0 };
    expect(isParallel(midpoint(A, B), midpoint(A, C), B, C)).toBe(true);
    expect(isParallel(A, B, B, C)).toBe(false);
    expect(cross(B, C, { x: 5, y: 0 })).toBe(0);
  });

  it('drops a perpendicular onto a line', () => {
    expect(foot({ x: 3, y: 5 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toEqual({ x: 3, y: 0 });
  });
});

describe('triangles', () => {
  it('rejects sides that break the triangle inequality', () => {
    expect(triangleFromSides(2, 3, 5)).toBeNull();
    expect(triangleFromSides(3, 4, 5)).not.toBeNull();
  });

  it('builds a 3-4-5 triangle right-angled at A', () => {
    const t = triangleFromSides(3, 4, 5);
    if (!t) throw new Error('no triangle');
    expect(angleAt(t.A, t.B, t.C)).toBeCloseTo(90, 9);
    expect(t.A.y).toBeLessThan(0);
  });

  it('puts the bisector foot where DB/DC = AB/AC and the angle is halved', () => {
    const t = triangleFromSides(6, 9, 10);
    if (!t) throw new Error('no triangle');
    const D = bisectorFoot(t.A, t.B, t.C);
    expect(dist(D, t.B) / dist(D, t.C)).toBeCloseTo(6 / 9, 9);
    expect(dist(D, t.B)).toBeCloseTo(4, 9);
    expect(angleAt(t.A, t.B, D)).toBeCloseTo(angleAt(t.A, D, t.C), 9);
  });

  it('places a vertex name away from the centroid and inside the board', () => {
    const G = { x: 50, y: 50 };
    expect(labelSpot({ x: 50, y: 20 }, G, 10, 100, 100)).toEqual({ x: 50, y: 12 });
    expect(labelSpot({ x: 80, y: 50 }, G, 10, 100, 100)).toEqual({ x: 88, y: 50 });
    const edge = labelSpot({ x: 0, y: 0 }, G, 20, 100, 100);
    expect(edge.x).toBe(12);
    expect(edge.y).toBe(12);
  });
});

describe('polygons', () => {
  it('computes area by the shoelace formula in either orientation', () => {
    expect(polygonArea(square)).toBe(10000);
    expect(polygonArea([...square].reverse())).toBe(10000);
    expect(polygonArea([square[0], square[1], square[2]])).toBe(5000);
  });

  it('adds the angles of convex quadrilaterals up to 360°', () => {
    const quads = [
      square,
      [
        { x: 90, y: 70 },
        { x: 300, y: 50 },
        { x: 340, y: 240 },
        { x: 60, y: 220 },
      ],
    ];
    for (const q of quads) {
      expect(isConvex(q)).toBe(true);
      expect(quadAngles(q).reduce((s, a) => s + a, 0)).toBeCloseTo(360, 9);
    }
  });

  it('finds the splitting side of a dart and rejects crossed or flat quadrilaterals', () => {
    expect(splittingSide(square)).toBe(-1);
    const dart = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 30, y: 30 },
      { x: 0, y: 100 },
    ];
    expect(splittingSide(dart)).toBeGreaterThanOrEqual(0);
    expect(isConvex(dart)).toBe(false);
    expect(isConvex([square[0], square[2], square[1], square[3]])).toBe(false);
    const flat = [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 80 },
    ];
    expect(isConvex(flat)).toBe(false);
  });

  it('meets the diagonals at the centre of a parallelogram', () => {
    const A = { x: 0, y: 0 };
    const B = { x: 100, y: 0 };
    const C = { x: 140, y: 60 };
    const D = { x: 40, y: 60 };
    expect(diagonalPoint(A, B, C, D)).toEqual({ x: 70, y: 30 });
    const p = { x: 0, y: 0 };
    expect(diagonalPoint(p, { x: 0, y: 5 }, { x: 10, y: 0 }, { x: 10, y: 5 })).toBe(null);
  });
});
