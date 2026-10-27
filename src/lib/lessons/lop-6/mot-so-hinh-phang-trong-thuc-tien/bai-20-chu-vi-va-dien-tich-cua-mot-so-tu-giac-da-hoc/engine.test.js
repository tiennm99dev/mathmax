import { describe, it, expect } from 'vitest';
import { polygonArea } from '#lib/geom-engine/plane.js';
import { bounds, parallelogramPieces, rhombusPieces, trapezoidPieces } from './engine.js';

/** @param {import('./engine.js').Piece[]} pieces */
const total = (pieces) => pieces.reduce((s, p) => s + polygonArea(p.pts), 0);

const STEPS = [0, 0.25, 0.5, 0.75, 1];

describe('parallelogram to rectangle', () => {
  it('keeps the area a·h at every moment', () => {
    for (const t of STEPS) expect(total(parallelogramPieces(6, 4, 2, t))).toBeCloseTo(24, 9);
  });
  it('ends as a rectangle a wide and h high', () => {
    const b = bounds(parallelogramPieces(6, 4, 2, 1));
    expect(b.maxX - b.minX).toBeCloseTo(6, 9);
    expect(b.maxY - b.minY).toBeCloseTo(4, 9);
    // The pieces exactly fill their bounding box, so they form that rectangle.
    expect(total(parallelogramPieces(6, 4, 2, 1))).toBeCloseTo(6 * 4, 9);
  });
});

describe('rhombus to rectangle', () => {
  it('keeps the area m·n/2 at every moment', () => {
    for (const t of STEPS) expect(total(rhombusPieces(8, 6, t))).toBeCloseTo(24, 9);
  });
  it('ends as a rectangle m by n/2', () => {
    const b = bounds(rhombusPieces(8, 6, 1));
    expect(b.maxX - b.minX).toBeCloseTo(8, 9);
    expect(b.maxY - b.minY).toBeCloseTo(3, 9);
    expect(b.minY).toBeCloseTo(0, 9);
  });
});

describe('two trapezoids make a parallelogram', () => {
  it('each copy has area (a + b)·h / 2', () => {
    for (const t of STEPS) {
      const [still, copy] = trapezoidPieces(7, 3, 4, t);
      expect(polygonArea(still.pts)).toBeCloseTo(20, 9);
      expect(polygonArea(copy.pts)).toBeCloseTo(20, 9);
    }
  });
  it('the half-turned copy completes a parallelogram with base a + b', () => {
    const [still, copy] = trapezoidPieces(7, 3, 4, 1);
    // The copy's corners land on the trapezoid's B and C and extend the bases.
    const [A, B, C] = still.pts;
    const pts = copy.pts;
    expect(pts[1].x).toBeCloseTo(C.x, 9);
    expect(pts[1].y).toBeCloseTo(C.y, 9);
    expect(pts[2].x).toBeCloseTo(B.x, 9);
    expect(pts[2].y).toBeCloseTo(B.y, 9);
    expect(pts[3].x - A.x).toBeCloseTo(7 + 3, 9);
    expect(pts[3].y).toBeCloseTo(0, 9);
  });
});
