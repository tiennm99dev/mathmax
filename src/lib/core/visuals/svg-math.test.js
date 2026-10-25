import { describe, expect, it } from 'vitest';
import {
  PALETTE,
  angleOf,
  clamp,
  colorAt,
  hopPath,
  linear,
  planeScale,
  polar,
  sectorPath,
  snap,
} from './svg-math.js';

describe('snap and clamp', () => {
  it('rounds to the step without float tails', () => {
    expect(snap(0.30000000000000004, 0.1)).toBe(0.3);
    expect(snap(7.4, 5)).toBe(5);
    expect(snap(7.6, 5)).toBe(10);
    expect(snap(3.2, 2, 1)).toBe(3);
    expect(snap(3.3, 0)).toBe(3.3);
  });

  it('clamps', () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
  });
});

describe('linear', () => {
  it('maps and inverts, including a flipped axis', () => {
    const s = linear(0, 10, 300, 100);
    expect(s.map(0)).toBe(300);
    expect(s.map(5)).toBe(200);
    expect(s.invert(100)).toBe(10);
  });

  it('survives an empty domain', () => {
    const s = linear(4, 4, 0, 100);
    expect(s.map(4)).toBe(0);
    expect(s.invert(50)).toBe(4);
  });
});

describe('planeScale', () => {
  it('matches the classic 20-unit square plane', () => {
    const p = planeScale();
    expect(p.unit).toBe(18);
    expect(p.height).toBe(420);
    expect(p.mx(-10)).toBe(30);
    expect(p.my(10)).toBe(30);
    expect(p.mx(0)).toBe(210);
    expect(p.toX(p.mx(3))).toBeCloseTo(3);
    expect(p.toY(p.my(-4))).toBeCloseTo(-4);
    expect(p.gridX).toHaveLength(21);
  });

  it('keeps units square for a wide range', () => {
    const p = planeScale({ xMin: 0, xMax: 10, yMin: 0, yMax: 5, width: 340, pad: 20 });
    expect(p.unit).toBe(30);
    expect(p.height).toBe(190);
    expect(p.gridY).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe('polar geometry', () => {
  it('measures clockwise from 12 o’clock', () => {
    const top = polar(0, 0, 10, 0);
    expect(top.x).toBeCloseTo(0);
    expect(top.y).toBeCloseTo(-10);
    const right = polar(0, 0, 10, 90);
    expect(right.x).toBeCloseTo(10);
    expect(right.y).toBeCloseTo(0);
    expect(angleOf(0, 0, { x: 10, y: 0 })).toBeCloseTo(90);
    expect(angleOf(0, 0, { x: 0, y: 10 })).toBeCloseTo(180);
    expect(angleOf(0, 0, { x: -10, y: 0 })).toBeCloseTo(270);
  });

  it('draws sectors, full circles and nothing for empty slices', () => {
    expect(sectorPath(0, 0, 10, 0, 90)).toMatch(/^M 0 0 L .* A 10 10 0 0 1 /);
    expect(sectorPath(0, 0, 10, 0, 270)).toMatch(/A 10 10 0 1 1 /);
    expect(sectorPath(0, 0, 10, 0, 360).match(/A /g)).toHaveLength(2);
    expect(sectorPath(0, 0, 10, 40, 40)).toBe('');
  });

  it('draws a hop arc above the baseline', () => {
    expect(hopPath(0, 10, 50, 8)).toBe('M 0 50 Q 5 34 10 50');
  });
});

describe('palette', () => {
  it('cycles colours', () => {
    expect(colorAt(0)).toBe(PALETTE[0]);
    expect(colorAt(PALETTE.length)).toBe(PALETTE[0]);
    expect(colorAt(-1)).toBe(PALETTE[PALETTE.length - 1]);
  });
});
