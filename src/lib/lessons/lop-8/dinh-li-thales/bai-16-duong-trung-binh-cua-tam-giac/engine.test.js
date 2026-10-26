import { describe, it, expect } from 'vitest';
import { COLS, LINES, ROWS, keepsTriangle, midline, midpoints, snapCell } from './engine.js';

/** @typedef {'MN' | 'NP' | 'MP'} LineId */
const IDS = /** @type {LineId[]} */ (Object.keys(LINES));

/** A spread of grid triangles, including obtuse and right ones. */
function* triangles() {
  const B = { x: 1, y: 7 };
  const C = { x: 11, y: 7 };
  for (let x = 0; x <= COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const A = { x, y };
      if (keepsTriangle(A, B, C)) yield { A, B, C };
    }
  }
  yield { A: { x: 0, y: 0 }, B: { x: 12, y: 3 }, C: { x: 5, y: 8 } };
}

describe('the midline model', () => {
  it('makes every midline parallel to its side and half as long', () => {
    for (const t of triangles()) {
      for (const id of IDS) {
        const m = midline(t, id);
        expect(m.parallel).toBe(true);
        expect(2 * m.length).toBeCloseTo(m.side, 9);
        expect(m.angleMid).toBeCloseTo(m.angleSide, 9);
      }
    }
  });

  it('names the right ends for each midline', () => {
    const t = { A: { x: 2, y: 0 }, B: { x: 0, y: 6 }, C: { x: 10, y: 6 } };
    const { M, N, P } = midpoints(t);
    expect(midline(t, 'MN').p).toEqual(M);
    expect(midline(t, 'MN').q).toEqual(N);
    expect(midline(t, 'NP').p).toEqual(N);
    expect(midline(t, 'NP').q).toEqual(P);
    expect(midline(t, 'MP').p).toEqual(M);
    expect(midline(t, 'MP').q).toEqual(P);
    expect(midline(t, 'MN').side).toBe(10);
    expect(midline(t, 'MN').length).toBe(5);
  });

  it('snaps to the grid and refuses a flat triangle', () => {
    expect(snapCell({ x: 3.4, y: 7.6 })).toEqual({ x: 3, y: 8 });
    expect(snapCell({ x: -2, y: 20 })).toEqual({ x: 0, y: ROWS });
    expect(keepsTriangle({ x: 5, y: 7 }, { x: 1, y: 7 }, { x: 11, y: 7 })).toBe(false);
    expect(keepsTriangle({ x: 5, y: 2 }, { x: 1, y: 7 }, { x: 11, y: 7 })).toBe(true);
  });
});
