import { describe, it, expect } from 'vitest';
import {
  CARD_SHAPES,
  placeInHalf,
  placedOutlines,
  polygonArea,
  roomReport,
  windowsNeeded,
} from './engine.js';

describe('classroom light index', () => {
  it('passes a 9 m × 6 m room with one door and four windows', () => {
    const r = roomReport(9, 6, [
      { width: 1.2, height: 2.2, count: 1 },
      { width: 1.4, height: 1.5, count: 4 },
    ]);
    expect(r.floor).toBe(54);
    expect(r.parts).toEqual([2.64, 8.4]);
    expect(r.open).toBe(11.04);
    expect(r.index).toBeCloseTo(20.444, 3);
    expect(r.ok).toBe(true);
  });

  it('fails the same room with only three windows', () => {
    const r = roomReport(9, 6, [
      { width: 1.2, height: 2.2, count: 1 },
      { width: 1.4, height: 1.5, count: 3 },
    ]);
    expect(r.open).toBe(8.94);
    expect(r.index).toBeCloseTo(16.556, 3);
    expect(r.ok).toBe(false);
  });

  it('counts exactly 20 as meeting the standard', () => {
    expect(roomReport(10, 5, [{ width: 2, height: 2.5, count: 2 }]).ok).toBe(true);
  });

  it('finds how many extra windows a dark room needs', () => {
    expect(windowsNeeded(54, 8.94, 2.1)).toBe(1);
    expect(windowsNeeded(48, 5.6, 1.5)).toBe(3);
    expect(windowsNeeded(54, 11.04, 2.1)).toBe(0);
  });
});

describe('card designer', () => {
  it('stores each area matching its outline', () => {
    for (const s of Object.values(CARD_SHAPES)) {
      const pts = s.pts.map(([x, y]) => ({ x, y }));
      expect(polygonArea(pts), s.name).toBeCloseTo(s.area, 9);
    }
  });

  it('keeps a shape inside the left half', () => {
    const s = CARD_SHAPES['chu-nhat'];
    expect(placeInHalf(s, 7.3, -2, 8, 12)).toEqual({ x: 5, y: 0 });
    expect(placeInHalf(s, 2.26, 3.74, 8, 12)).toEqual({ x: 2.5, y: 3.5 });
  });

  it('mirrors a shape across the fold line with the same area', () => {
    const { left, right } = placedOutlines(CARD_SHAPES['binh-hanh'], 1, 2, 8);
    expect(right[0]).toEqual({ x: 14, y: 2 });
    expect(polygonArea(right)).toBeCloseTo(polygonArea(left), 9);
  });
});
