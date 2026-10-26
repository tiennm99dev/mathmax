import { describe, it, expect } from 'vitest';
import { BOX, placeA, placeM, readings } from './engine.js';

describe('perpendicular and oblique board', () => {
  it('keeps A above d and M on d, on the half-unit grid', () => {
    expect(placeA({ x: 1.3, y: -2 })).toEqual({ x: 1.5, y: BOX.minY });
    expect(placeA({ x: -9, y: 3.74 })).toEqual({ x: BOX.minX, y: 3.5 });
    expect(placeM({ x: 2.2, y: 4 })).toEqual({ x: 2, y: 0 });
  });

  it('makes the perpendicular the shortest segment from A to d', () => {
    for (let ax = BOX.minX; ax <= BOX.maxX; ax += 0.5)
      for (let ay = BOX.minY; ay <= BOX.maxY; ay += 0.5)
        for (let mx = BOX.minX; mx <= BOX.maxX; mx += 0.5) {
          const r = readings({ x: ax, y: ay }, { x: mx, y: 0 });
          if (r.atH) expect(r.AM).toBe(r.AH);
          else expect(r.AM).toBeGreaterThan(r.AH);
        }
  });

  it('reads the acute angles of the right triangle AHM', () => {
    const r = readings({ x: 0, y: 3 }, { x: 3, y: 0 });
    expect(r.AM).toBeCloseTo(Math.sqrt(18), 12);
    expect(r.atM).toBeCloseTo(45, 9);
    expect(r.atA).toBeCloseTo(45, 9);
    expect(readings({ x: 1, y: 2 }, { x: 1, y: 0 }).atM).toBe(90);
  });
});
