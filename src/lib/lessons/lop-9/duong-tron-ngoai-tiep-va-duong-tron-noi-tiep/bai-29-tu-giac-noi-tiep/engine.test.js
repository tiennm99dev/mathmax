import { describe, it, expect } from 'vitest';
import { analyseQuad, snapToCircle } from './engine.js';

const on = (/** @type {number} */ deg, r = 100) => ({
  x: 200 + r * Math.cos((deg * Math.PI) / 180),
  y: 200 + r * Math.sin((deg * Math.PI) / 180),
});

describe('analyseQuad', () => {
  it('finds opposite angles adding to 180° for four points on a circle', () => {
    const q = analyseQuad(on(200), on(130), on(20), on(290));
    expect(q.convex).toBe(true);
    expect(q.sumAC).toBeCloseTo(180);
    expect(q.sumBD).toBeCloseTo(180);
    expect(q.cyclic).toBe(true);
    expect(q.offset).toBeCloseTo(0);
  });

  it('reports D inside the circle when ∠B + ∠D exceeds 180°', () => {
    const q = analyseQuad(on(200), on(130), on(20), on(290, 70));
    expect(q.cyclic).toBe(false);
    expect(q.offset).toBeLessThan(0);
    expect(q.sumBD).toBeGreaterThan(180);
    expect(q.sumAC + q.sumBD).toBeCloseTo(360);
  });

  it('reports D outside the circle when ∠B + ∠D is under 180°', () => {
    const q = analyseQuad(on(200), on(130), on(20), on(290, 140));
    expect(q.offset).toBeGreaterThan(0);
    expect(q.sumBD).toBeLessThan(180);
  });

  it('never calls a non-convex quadrilateral cyclic', () => {
    const q = analyseQuad({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 8, y: 2 });
    expect(q.convex).toBe(false);
    expect(q.cyclic).toBe(false);
  });

  it('accepts a rectangle as cyclic', () => {
    const q = analyseQuad({ x: 0, y: 0 }, { x: 80, y: 0 }, { x: 80, y: 60 }, { x: 0, y: 60 });
    expect(q.cyclic).toBe(true);
    expect(q.circle?.radius).toBeCloseTo(50);
  });
});

describe('snapToCircle', () => {
  it('moves D onto the circle and makes the quadrilateral cyclic', () => {
    const [A, B, C] = [on(200), on(130), on(20)];
    const P = snapToCircle(A, B, C, on(290, 60));
    if (!P) throw new Error('no snap');
    expect(analyseQuad(A, B, C, P).cyclic).toBe(true);
  });

  it('refuses when the result would not be convex', () => {
    const [A, B, C] = [on(200), on(130), on(20)];
    expect(snapToCircle(A, B, C, on(160, 50))).toBeNull();
  });
});
