import { describe, it, expect } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import { circumcircle, incircle, touchPoints } from './centers.js';

describe('circumcircle', () => {
  it('puts the centre of a right triangle at the midpoint of the hypotenuse', () => {
    const c = circumcircle({ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 0, y: 8 });
    expect(c?.center.x).toBeCloseTo(3);
    expect(c?.center.y).toBeCloseTo(4);
    expect(c?.radius).toBeCloseTo(5);
  });

  it('is equidistant from the three vertices', () => {
    const A = { x: 13, y: 2 };
    const B = { x: -4, y: 7 };
    const C = { x: 3, y: -9 };
    const c = circumcircle(A, B, C);
    if (!c) throw new Error('no circle');
    expect(dist(c.center, B)).toBeCloseTo(c.radius);
    expect(dist(c.center, C)).toBeCloseTo(c.radius);
  });

  it('gives R = a√3/3 for an equilateral triangle', () => {
    const c = circumcircle({ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 3, y: 3 * Math.sqrt(3) });
    expect(c?.radius).toBeCloseTo((6 * Math.sqrt(3)) / 3);
  });

  it('is null for collinear points', () => {
    expect(circumcircle({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 })).toBeNull();
  });
});

describe('incircle', () => {
  it('has r = 2 for the 6-8-10 right triangle', () => {
    const c = incircle({ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 0, y: 8 });
    expect(c?.radius).toBeCloseTo(2);
    expect(c?.center.x).toBeCloseTo(2);
    expect(c?.center.y).toBeCloseTo(2);
  });

  it('gives r = a√3/6 and the same centre as the circumcircle for an equilateral triangle', () => {
    const A = { x: 0, y: 0 };
    const B = { x: 6, y: 0 };
    const C = { x: 3, y: 3 * Math.sqrt(3) };
    const i = incircle(A, B, C);
    const o = circumcircle(A, B, C);
    expect(i?.radius).toBeCloseTo(Math.sqrt(3));
    expect(i?.center.x).toBeCloseTo(/** @type {number} */ (o?.center.x));
    expect(i?.center.y).toBeCloseTo(/** @type {number} */ (o?.center.y));
  });

  it('touches each side at distance r from the centre', () => {
    const A = { x: 1, y: 9 };
    const B = { x: -5, y: -2 };
    const C = { x: 8, y: 0 };
    const i = incircle(A, B, C);
    if (!i) throw new Error('no circle');
    for (const T of touchPoints(A, B, C, i.center)) {
      expect(dist(T, i.center)).toBeCloseTo(i.radius);
    }
  });

  it('is null for a flat triangle', () => {
    expect(incircle({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 })).toBeNull();
  });
});
