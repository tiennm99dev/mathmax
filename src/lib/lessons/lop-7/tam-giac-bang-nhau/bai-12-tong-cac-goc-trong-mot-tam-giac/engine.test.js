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

  it('never reads 90° for an angle that is only close to right', () => {
    // At B the sides go to (-340, -70) and (-10, 50): the angle is about 90,3°.
    const r = readings({ x: 30, y: 30 }, { x: 370, y: 100 }, { x: 360, y: 150 });
    expect(r.B).toBe(91);
    expect(r.A + r.B + r.C).toBe(180);
    expect(r.kind).toBe('tù');
  });

  it('reads 90° exactly when the grid angle is right, and never otherwise', () => {
    const b = { x: 100, y: 180 };
    const c = { x: 250, y: 110 };
    const stay = { x: 0, y: 0 };
    let right = 0;
    let checked = 0;
    for (let x = 30; x <= 370; x += 10) {
      for (let y = 30; y <= 190; y += 10) {
        const a = { x, y };
        if (placeVertex(a, stay, b, c) === stay) continue;
        const r = readings(a, b, c);
        checked++;
        if (r.kind === 'vuông') right++;
        expect(r.A + r.B + r.C).toBe(180);
        expect([r.A, r.B, r.C].includes(90)).toBe(r.kind === 'vuông');
      }
    }
    expect(checked).toBeGreaterThan(100);
    expect(right).toBeGreaterThan(0);
  });
});
