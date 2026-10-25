import { describe, it, expect } from 'vitest';
import {
  SHAPES,
  clip,
  halfTurn,
  inSentence,
  isAxis,
  isCenter,
  lineKey,
  reflect,
  rotate,
  sameShape,
} from './symmetry.js';

/**
 * Grid points a widget handle can snap to: every half unit from -4 to 4.
 * @type {import('./symmetry.js').Pt[]}
 */
const GRID = [];
for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) GRID.push({ x: i / 2, y: j / 2 });
const ANGLES = Array.from({ length: 12 }, (_, k) => 15 * k);

/** Every distinct axis the fold widget can reach, by brute force. @param {import('./symmetry.js').Pt[]} P */
function axesFound(P) {
  const keys = new Set();
  for (const p of GRID)
    for (const deg of ANGLES) if (isAxis(P, { p, deg })) keys.add(lineKey({ p, deg }));
  return keys;
}

describe('reflections and turns', () => {
  it('mirrors a point in a line', () => {
    expect(reflect({ x: 2, y: 1 }, { p: { x: 0, y: 0 }, deg: 0 })).toEqual({ x: 2, y: -1 });
    const r = reflect({ x: 2, y: 0 }, { p: { x: 0, y: 0 }, deg: 45 });
    expect(r.x).toBeCloseTo(0);
    expect(r.y).toBeCloseTo(2);
  });

  it('a 180° turn is the point symmetric through the centre', () => {
    const q = { x: 3, y: -1 };
    const c = { x: 1, y: 1 };
    const r = rotate(q, c, 180);
    expect(r.x).toBeCloseTo(halfTurn(q, c).x);
    expect(r.y).toBeCloseTo(halfTurn(q, c).y);
    expect(halfTurn(q, c)).toEqual({ x: -1, y: 3 });
  });

  it('compares shapes by their edges, whatever the starting vertex', () => {
    const sq = SHAPES['hinh-vuong'].points;
    expect(sameShape(sq, [...sq.slice(2), ...sq.slice(0, 2)])).toBe(true);
    expect(sameShape(sq, [...sq].reverse())).toBe(true);
    expect(sameShape(sq, SHAPES['hinh-chu-nhat'].points)).toBe(false);
  });
});

describe('every shape has the axes and centre the lesson states', () => {
  for (const shape of Object.values(SHAPES)) {
    it(`${shape.name}`, () => {
      const found = axesFound(shape.points);
      if (shape.axes === 'vo-so') expect(found.size).toBe(ANGLES.length);
      else expect(found.size).toBe(shape.axes);

      const centers = GRID.filter((c) => isCenter(shape.points, c));
      if (shape.center) expect(centers).toEqual([shape.center]);
      else expect(centers).toEqual([]);
    });
  }

  it('counts the same axis once when found through two of its points', () => {
    expect(lineKey({ p: { x: 0, y: 0 }, deg: 90 })).toBe(lineKey({ p: { x: 0, y: 2 }, deg: 270 }));
    expect(lineKey({ p: { x: 1, y: 1 }, deg: 45 })).toBe(lineKey({ p: { x: -2, y: -2 }, deg: 45 }));
    expect(lineKey({ p: { x: 0, y: 1 }, deg: 0 })).not.toBe(
      lineKey({ p: { x: 0, y: -1 }, deg: 0 }),
    );
  });
});

describe('cutting a shape along a line', () => {
  it('splits a square along a diagonal into two triangles', () => {
    const sq = SHAPES['hinh-vuong'].points;
    const line = { p: { x: 0, y: 0 }, deg: 45 };
    expect(clip(sq, line, 1)).toHaveLength(3);
    expect(clip(sq, line, -1)).toHaveLength(3);
  });

  it('folding the left half of a rectangle onto the right covers it', () => {
    const rect = SHAPES['hinh-chu-nhat'].points;
    const line = { p: { x: 0, y: 0 }, deg: 90 };
    const left = clip(rect, line, 1);
    const right = clip(rect, line, -1);
    expect(
      sameShape(
        left.map((q) => reflect(q, line)),
        right,
      ),
    ).toBe(true);
  });

  it('keeps the whole shape when the line misses it', () => {
    const tri = SHAPES['tam-giac-deu'].points;
    expect(clip(tri, { p: { x: 0, y: 4 }, deg: 0 }, -1)).toHaveLength(3);
    expect(clip(tri, { p: { x: 0, y: 4 }, deg: 0 }, 1)).toHaveLength(0);
  });
});

describe('shape names inside a sentence', () => {
  it('lowers only the first letter, so letter names keep their capital', () => {
    expect(inSentence('Hình vuông')).toBe('hình vuông');
    expect(inSentence('Chữ T')).toBe('chữ T');
  });
});
