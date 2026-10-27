import { describe, it, expect } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import {
  CM,
  apexes,
  hexTriangles,
  hexagon,
  snapApex,
  squareCorners,
  triangleStatus,
} from './engine.js';

const A = { x: 100, y: 250 };
const B = { x: 220, y: 250 };

describe('equilateral apex', () => {
  it('is at distance AB from both A and B, one above and one below', () => {
    const [up, down] = apexes(A, B);
    for (const C of [up, down]) {
      expect(dist(C, A)).toBeCloseTo(120, 9);
      expect(dist(C, B)).toBeCloseTo(120, 9);
    }
    expect(up.y).toBeLessThan(A.y);
    expect(down.y).toBeGreaterThan(A.y);
  });

  it('marks C equilateral only on both arcs', () => {
    const [up] = apexes(A, B);
    expect(triangleStatus(A, B, up)).toMatchObject({ onA: true, onB: true, equilateral: true });
    const onlyA = { x: A.x, y: A.y - 120 };
    expect(triangleStatus(A, B, onlyA)).toMatchObject({ onA: true, onB: false });
    expect(triangleStatus(A, B, { x: 160, y: 100 }).equilateral).toBe(false);
    expect(triangleStatus(A, B, up).ab).toBeCloseTo(120 / CM, 9);
  });

  it('snaps a nearby drop onto the apex and leaves far drops alone', () => {
    const [up] = apexes(A, B);
    expect(snapApex(A, B, { x: up.x + 3, y: up.y - 4 })).toEqual(up);
    expect(snapApex(A, B, { x: up.x + 30, y: up.y })).toBeNull();
  });
});

describe('square on AB', () => {
  it('has four equal sides and equal diagonals', () => {
    const [a, b, c, d] = squareCorners(A, 120);
    expect([dist(a, b), dist(b, c), dist(c, d), dist(d, a)]).toEqual([120, 120, 120, 120]);
    expect(dist(a, c)).toBeCloseTo(dist(b, d), 9);
  });
});

describe('hexagon from six equilateral triangles', () => {
  const O = { x: 200, y: 160 };
  it('has six sides equal to the triangle side and main diagonals twice as long', () => {
    const P = hexagon(O, 80);
    for (let i = 0; i < 6; i++) expect(dist(P[i], P[(i + 1) % 6])).toBeCloseTo(80, 9);
    for (let i = 0; i < 3; i++) expect(dist(P[i], P[i + 3])).toBeCloseTo(160, 9);
  });

  it('gives equilateral triangles, at most six', () => {
    expect(hexTriangles(O, 80, 9)).toHaveLength(6);
    expect(hexTriangles(O, 80, 0)).toHaveLength(0);
    for (const [p, q, r] of hexTriangles(O, 80, 6)) {
      expect(dist(p, q)).toBeCloseTo(80, 9);
      expect(dist(q, r)).toBeCloseTo(80, 9);
      expect(dist(r, p)).toBeCloseTo(80, 9);
    }
  });
});
