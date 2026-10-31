import { describe, it, expect } from 'vitest';
import {
  add3,
  clampPitch,
  cross3,
  dot3,
  drawOrder,
  facesViewer,
  mul3,
  sub3,
  turnByKey,
  viewPoint,
  wrapYaw,
} from './solid.js';

/** @typedef {import('./solid.js').Face} Face */

/** The unit cube on the ground, corners counter-clockwise seen from outside. */
function cube() {
  const p = (/** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ z) => ({
    x,
    y,
    z,
  });
  /** @type {Face[]} */
  const faces = [
    {
      id: 'bottom',
      kind: 'bottom',
      index: -1,
      pts: [p(0, 0, 0), p(0, 1, 0), p(1, 1, 0), p(1, 0, 0)],
    },
    { id: 'top', kind: 'top', index: -1, pts: [p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)] },
    { id: 'side-0', kind: 'side', index: 0, pts: [p(0, 0, 0), p(1, 0, 0), p(1, 0, 1), p(0, 0, 1)] },
    { id: 'side-1', kind: 'side', index: 1, pts: [p(1, 0, 0), p(1, 1, 0), p(1, 1, 1), p(1, 0, 1)] },
    { id: 'side-2', kind: 'side', index: 2, pts: [p(1, 1, 0), p(0, 1, 0), p(0, 1, 1), p(1, 1, 1)] },
    { id: 'side-3', kind: 'side', index: 3, pts: [p(0, 1, 0), p(0, 0, 0), p(0, 0, 1), p(0, 1, 1)] },
  ];
  return faces;
}

describe('vector arithmetic', () => {
  const a = { x: 1, y: 2, z: 3 };
  const b = { x: -2, y: 0, z: 5 };
  it('adds, subtracts and scales', () => {
    expect(add3(a, b)).toEqual({ x: -1, y: 2, z: 8 });
    expect(sub3(a, b)).toEqual({ x: 3, y: 2, z: -2 });
    expect(mul3(a, 2)).toEqual({ x: 2, y: 4, z: 6 });
  });
  it('gives a cross product perpendicular to both', () => {
    const c = cross3(a, b);
    expect(dot3(c, a)).toBe(0);
    expect(dot3(c, b)).toBe(0);
    expect(cross3({ x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 })).toEqual({ x: 0, y: 0, z: 1 });
  });
});

describe('view', () => {
  it('maps up to screen up and +y away from the viewer with no turn or tilt', () => {
    const v = viewPoint({ x: 1, y: 2, z: 3 }, { yaw: 0, pitch: 0 });
    expect(v.x).toBeCloseTo(1, 12);
    expect(v.y).toBeCloseTo(-3, 12);
    expect(v.depth).toBeCloseTo(-2, 12);
  });

  it('sees the front, one side and the top of a cube from front right above', () => {
    const view = { yaw: -30, pitch: 25 };
    const seen = Object.fromEntries(cube().map((f) => [f.id, facesViewer(f.pts, view)]));
    expect(seen).toEqual({
      bottom: false,
      top: true,
      'side-0': true,
      'side-1': true,
      'side-2': false,
      'side-3': false,
    });
  });

  it('draws far faces first and ends on a front face', () => {
    const order = drawOrder(cube(), { yaw: -30, pitch: 25 }, (p) => ({ x: 2 * p.x, y: 2 * p.y }));
    for (let i = 1; i < order.length; i++) {
      expect(order[i].depth).toBeGreaterThanOrEqual(order[i - 1].depth);
    }
    expect(order.at(-1)?.front).toBe(true);
    expect(order[0].screen).toHaveLength(4);
  });
});

describe('view controls', () => {
  it('keeps the tilt in range, with an optional lower limit', () => {
    expect(clampPitch(95)).toBe(80);
    expect(clampPitch(-20)).toBe(-5);
    expect(clampPitch(-20, -10)).toBe(-10);
    expect(clampPitch(30)).toBe(30);
  });

  it('wraps the turn into [−180, 180)', () => {
    expect(wrapYaw(190)).toBe(-170);
    expect(wrapYaw(-190)).toBe(170);
    expect(wrapYaw(180)).toBe(-180);
  });

  it('turns by arrow keys, faster with Shift, and ignores other keys', () => {
    expect(turnByKey({ yaw: 0, pitch: 20 }, 'ArrowLeft', false)).toEqual({ yaw: 10, pitch: 20 });
    expect(turnByKey({ yaw: 0, pitch: 20 }, 'ArrowRight', true)).toEqual({ yaw: -30, pitch: 20 });
    expect(turnByKey({ yaw: 0, pitch: 75 }, 'ArrowUp', false)).toEqual({ yaw: 0, pitch: 80 });
    expect(turnByKey({ yaw: 0, pitch: -3 }, 'ArrowDown', false, -10)).toEqual({
      yaw: 0,
      pitch: -10,
    });
    expect(turnByKey({ yaw: 0, pitch: 20 }, 'Enter', false)).toBeNull();
  });
});
