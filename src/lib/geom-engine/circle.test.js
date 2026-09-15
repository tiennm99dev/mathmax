import { describe, expect, it } from 'vitest';
import { vec } from './vec.js';
import { angleAtVertex, circle, pointOnCircle, projectToCircle, subtendedArc } from './circle.js';

describe('pointOnCircle', () => {
  it('places 0° at +x', () => {
    const p = pointOnCircle(circle(0, 0, 10), 0);
    expect(p.x).toBeCloseTo(10);
    expect(p.y).toBeCloseTo(0);
  });

  it('places 90° at +y', () => {
    const p = pointOnCircle(circle(0, 0, 10), 90);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(10);
  });
});

describe('projectToCircle', () => {
  it('keeps direction, sets magnitude to radius', () => {
    const c = circle(0, 0, 5);
    const p = projectToCircle(vec(3, 4), c);
    expect(p.x).toBeCloseTo(3);
    expect(p.y).toBeCloseTo(4);
  });

  it('falls back to +x when point is at center', () => {
    const c = circle(0, 0, 5);
    expect(projectToCircle(vec(0, 0), c)).toEqual(vec(5, 0));
  });

  it('projects far points back to the circle', () => {
    const c = circle(0, 0, 5);
    const p = projectToCircle(vec(100, 0), c);
    expect(p).toEqual(vec(5, 0));
  });
});

describe('angleAtVertex', () => {
  it('right angle is 90°', () => {
    expect(angleAtVertex(vec(1, 0), vec(0, 0), vec(0, 1))).toBeCloseTo(90);
  });

  it('straight angle is 180°', () => {
    expect(angleAtVertex(vec(-1, 0), vec(0, 0), vec(1, 0))).toBeCloseTo(180);
  });

  it('returns 0 when vertex coincides with one ray endpoint', () => {
    expect(angleAtVertex(vec(0, 0), vec(0, 0), vec(1, 1))).toBe(0);
  });

  it('inscribed angle theorem — half the central angle', () => {
    const c = circle(0, 0, 10);
    const a = pointOnCircle(c, 0);
    const b = pointOnCircle(c, 120);
    const m = pointOnCircle(c, 250); // any point on the major arc
    const central = angleAtVertex(a, c.center, b);
    const inscribed = angleAtVertex(a, m, b);
    expect(inscribed).toBeCloseTo(central / 2, 1);
  });
});

describe('subtendedArc', () => {
  const c = circle(0, 0, 10);
  const at = (/** @type {number} */ deg) => pointOnCircle(c, deg);

  it('M on the major arc subtends the minor arc', () => {
    // A at 150°, B at 30° — the minor arc AB measures 120°.
    expect(subtendedArc(c, at(150), at(30), at(270))).toBeCloseTo(120);
  });

  it('M on the minor arc subtends the major arc', () => {
    for (const mDeg of [45, 90, 120]) {
      expect(subtendedArc(c, at(150), at(30), at(mDeg))).toBeCloseTo(240);
    }
  });

  it('swapping A and B gives the same arc', () => {
    const arcAB = subtendedArc(c, at(150), at(30), at(270));
    const arcBA = subtendedArc(c, at(30), at(150), at(270));
    expect(arcBA).toBeCloseTo(arcAB);
  });

  it('the inscribed angle is half the subtended arc, everywhere on the circle', () => {
    const a = at(150);
    const b = at(30);
    for (let mDeg = 0; mDeg < 360; mDeg += 7) {
      const m = at(mDeg);
      // Skip the two positions where the inscribed angle is undefined.
      if (Math.abs(mDeg - 150) < 1e-9 || Math.abs(mDeg - 30) < 1e-9) continue;
      expect(angleAtVertex(a, m, b)).toBeCloseTo(subtendedArc(c, a, b, m) / 2, 6);
    }
  });

  it('holds for a second, asymmetric chord', () => {
    const a = at(10);
    const b = at(200);
    for (let mDeg = 0; mDeg < 360; mDeg += 11) {
      const m = at(mDeg);
      if (Math.abs(mDeg - 10) < 1e-9 || Math.abs(mDeg - 200) < 1e-9) continue;
      expect(angleAtVertex(a, m, b)).toBeCloseTo(subtendedArc(c, a, b, m) / 2, 6);
    }
  });
});
