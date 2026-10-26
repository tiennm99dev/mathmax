import { describe, it, expect } from 'vitest';
import { BOX, placeVertex, readings } from './engine.js';

const B = { x: 60, y: 180 };
const C = { x: 340, y: 180 };

describe('angle-sum board', () => {
  it('snaps a vertex to the grid and keeps it in the box', () => {
    expect(placeVertex({ x: 203, y: 57 }, { x: 200, y: 60 }, B, C)).toEqual({ x: 200, y: 60 });
    expect(placeVertex({ x: 999, y: -40 }, { x: 200, y: 60 }, B, C)).toEqual({
      x: BOX.maxX,
      y: BOX.minY,
    });
  });

  it('refuses a position that flattens the triangle', () => {
    const now = { x: 200, y: 60 };
    expect(placeVertex({ x: 200, y: 180 }, now, B, C)).toBe(now);
    expect(placeVertex({ x: 200, y: 170 }, now, B, C)).toBe(now);
  });

  it('reads whole angles that add up to 180 and an exterior angle equal to A + B', () => {
    for (const a of [
      { x: 200, y: 40 },
      { x: 90, y: 50 },
      { x: 330, y: 170 },
      { x: 40, y: 40 },
    ]) {
      const r = readings(a, B, C);
      expect(r.A + r.B + r.C).toBe(180);
      expect(r.exterior).toBe(r.A + r.B);
    }
  });

  it('names the kind of triangle', () => {
    expect(readings({ x: 60, y: 40 }, B, C).kind).toBe('vuông');
    expect(readings({ x: 200, y: 30 }, B, C).kind).toBe('nhọn');
    expect(readings({ x: 30, y: 150 }, B, C).kind).toBe('tù');
  });
});
