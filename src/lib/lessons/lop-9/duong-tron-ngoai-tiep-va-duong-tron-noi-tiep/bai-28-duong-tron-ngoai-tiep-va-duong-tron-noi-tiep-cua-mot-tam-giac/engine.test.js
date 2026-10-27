import { describe, it, expect } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import { analyse, equilateral, oppositeSide } from './engine.js';

describe('analyse', () => {
  it('finds a right angle and its hypotenuse', () => {
    const r = analyse({ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 0, y: 8 });
    expect(r.kind).toBe('vuong');
    expect(r.largest).toBe('A');
    expect(oppositeSide(r.largest)).toBe('BC');
    expect(r.outer?.radius).toBeCloseTo(5);
    expect(r.inner?.radius).toBeCloseTo(2);
  });

  it('tells acute from obtuse', () => {
    expect(analyse({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 7 }).kind).toBe('nhon');
    expect(analyse({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 2, y: 2 }).kind).toBe('tu');
  });

  it('recognises an equilateral triangle, where R = 2r', () => {
    const [A, B, C] = equilateral({ x: 200, y: 180 }, 120);
    const r = analyse(A, B, C);
    expect(r.equilateral).toBe(true);
    expect(r.kind).toBe('nhon');
    expect(r.outer?.radius).toBeCloseTo(120);
    expect(r.inner?.radius).toBeCloseTo(60);
    expect(dist(A, B)).toBeCloseTo(120 * Math.sqrt(3));
  });

  it('does not call a scalene triangle equilateral', () => {
    expect(analyse({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 7 }).equilateral).toBe(false);
  });
});
