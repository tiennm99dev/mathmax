import { describe, it, expect } from 'vitest';
import {
  along,
  bisectorDir,
  ccwSides,
  degText,
  directionTo,
  insidePath,
  intersect,
  measure,
  norm,
  rightMarkPath,
  sectorPath,
} from './angle-math.js';

describe('angle helpers', () => {
  it('normalises and measures angles between rays', () => {
    expect(norm(-30)).toBe(330);
    expect(measure(0, 245)).toBe(115);
    expect(measure(350, 10)).toBe(20);
    expect(measure(0, 180)).toBe(180);
  });

  it('finds directions and points along them in SVG coordinates', () => {
    const o = { x: 100, y: 100 };
    const p = along(o, 50, 90);
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(50);
    expect(directionTo(o, { x: 100, y: 150 })).toBeCloseTo(270);
  });

  it('bisects the smaller turn between two rays', () => {
    expect(bisectorDir(0, 80)).toBe(40);
    expect(bisectorDir(80, 0)).toBe(40);
    expect(bisectorDir(350, 30)).toBe(10);
  });

  it('intersects lines and reports parallel ones', () => {
    const m = intersect({ x: 0, y: 0 }, 0, { x: 10, y: 10 }, 90);
    expect(m?.x).toBeCloseTo(10);
    expect(m?.y).toBeCloseTo(0);
    expect(intersect({ x: 0, y: 0 }, 20, { x: 0, y: 50 }, 200)).toBeNull();
  });

  it('writes degrees with a decimal comma', () => {
    expect(degText(47)).toBe('47°');
    expect(degText(32.5)).toBe('32,5°');
    expect(sectorPath({ x: 0, y: 0 }, 0, 0, 10)).toBe('');
  });

  it('orders the sides counter-clockwise and draws the inside and the right mark', () => {
    expect(ccwSides(300, 30)).toEqual({ from: 300, to: 30, sweep: 90 });
    expect(insidePath({ x: 0, y: 0 }, 0, 180)).toBe('');
    expect(insidePath({ x: 0, y: 0 }, 0, 90, 10)).toMatch(/^M 0 0 L 10 0 L /);
    const mark = rightMarkPath({ x: 0, y: 0 }, 0, 90, 10);
    expect(mark.startsWith('M 10 0 L 10 ')).toBe(true);
  });
});
