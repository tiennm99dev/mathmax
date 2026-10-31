import { describe, it, expect } from 'vitest';
import { viewPoint } from '#lib/geom-engine/solid.js';
import {
  capVolume,
  coneMeasures,
  coneOutline,
  cylinderMeasures,
  num,
  piText,
  rim,
  rimRuns,
  screenArea,
  sectionRadius,
  sphereMeasures,
  splitStrips,
  sweptStrips,
  unionPath,
} from './round-solids.js';

const VIEW = { yaw: 0, pitch: 20 };

/** Area of a 3D quad (or triangle when two corners meet). @param {import('#lib/geom-engine/solid.js').P3[]} q */
function area3(q) {
  /** @param {import('#lib/geom-engine/solid.js').P3} a @param {import('#lib/geom-engine/solid.js').P3} b @param {import('#lib/geom-engine/solid.js').P3} c */
  const tri = (a, b, c) => {
    const u = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const v = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    return Math.hypot(u.y * v.z - u.z * v.y, u.z * v.x - u.x * v.z, u.x * v.y - u.y * v.x) / 2;
  };
  return tri(q[0], q[1], q[2]) + tri(q[0], q[2], q[3]);
}

describe('measures', () => {
  it('follows the book formulas for the cylinder', () => {
    const m = cylinderMeasures(3, 10);
    expect(m.k).toEqual({ lateral: 60, base: 9, total: 78, volume: 90 });
    expect(m.volume).toBeCloseTo(90 * Math.PI, 9);
    expect(m.circumference).toBeCloseTo(6 * Math.PI, 9);
  });

  it('follows the book formulas for the cone', () => {
    const m = coneMeasures(6, 8);
    expect(m.l).toBe(10);
    expect(m.k.lateral).toBe(60);
    expect(m.k.total).toBe(96);
    expect(m.k.volume).toBe(96);
    expect(m.angle).toBe(216);
  });

  it('follows the book formulas for the sphere', () => {
    const m = sphereMeasures(3);
    expect(m.k.area).toBe(36);
    expect(m.k.volume).toBe(36);
    expect(m.volume).toBeCloseTo(36 * Math.PI, 9);
  });

  it('cuts circles and caps from a sphere', () => {
    expect(sectionRadius(5, 3)).toBe(4);
    expect(sectionRadius(5, 0)).toBe(5);
    expect(sectionRadius(5, 6)).toBe(0);
    expect(capVolume(3, 6)).toBeCloseTo(sphereMeasures(3).volume, 9);
    expect(capVolume(3, 3)).toBeCloseTo(sphereMeasures(3).volume / 2, 9);
    expect(capVolume(3, -1)).toBe(0);
  });
});

describe('text', () => {
  it('writes multiples of π', () => {
    expect(piText(60)).toBe('60π');
    expect(piText(32 / 3)).toBe('32π/3');
    expect(piText(1)).toBe('π');
    expect(piText(0)).toBe('0');
    expect(piText(Math.SQRT2)).toBe('1,41π');
  });

  it('rounds measures with a decimal comma', () => {
    expect(num(188.4955)).toBe('188,5');
    expect(num(12)).toBe('12');
  });
});

describe('drawing', () => {
  it('sweeps a cylinder side whose strips add up to about 2πrh', () => {
    const strips = sweptStrips(3, 0, 3, 5, 0, 360, 180);
    const total = strips.reduce((s, q) => s + area3(q), 0);
    expect(total).toBeCloseTo(2 * Math.PI * 15, 1);
  });

  it('sweeps a cone side whose strips add up to about πrl', () => {
    const strips = sweptStrips(6, 0, 0, 8, 0, 360, 180);
    const total = strips.reduce((s, q) => s + area3(q), 0);
    expect(total).toBeCloseTo(60 * Math.PI, 0);
  });

  it('shows half of a whole cylinder side to the viewer', () => {
    const { front, back } = splitStrips(sweptStrips(3, 0, 3, 5, 0, 360, 72), VIEW);
    expect(front.length).toBe(36);
    expect(back.length).toBe(36);
  });

  it('splits a full rim into a near half and a far half', () => {
    const runs = rimRuns(rim(3, 0, 0, 360, 72), VIEW);
    const near = runs.filter((r) => r.front);
    expect(near.length).toBe(1);
    // The near run holds the points at angles 180° to 360° (y ≤ 0).
    expect(near[0].pts.every((p) => p.y <= 1e-9)).toBe(true);
  });

  it('orients every polygon the same way in a union path', () => {
    const square = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(screenArea(square)).toBe(1);
    expect(unionPath([[...square].reverse()])).toBe(unionPath([square]));
  });

  it('finds where the outline of a cone touches its base', () => {
    const t = coneOutline(3, 8, VIEW);
    expect(t).not.toBeNull();
    if (!t) return;
    // Seen from the front, the outline touches on both sides of the axis,
    // a little in front of the widest points (0° and 180°).
    const right = viewPoint(rim(3, 0, t[0], t[0], 1)[0], VIEW);
    const left = viewPoint(rim(3, 0, t[1], t[1], 1)[0], VIEW);
    expect(right.x).toBeGreaterThan(2.5);
    expect(left.x).toBeLessThan(-2.5);
    expect(coneOutline(6, 0.5, { yaw: 0, pitch: 80 })).toBeNull();
  });
});
