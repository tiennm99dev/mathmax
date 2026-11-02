import { describe, expect, it } from 'vitest';
import { angleAt, dist } from '#lib/geom-engine/plane.js';
import {
  COLS,
  FLOWER_RADIUS,
  ROWS,
  draftMessage,
  draftOf,
  flower,
  isComplete,
  placeSecond,
  progressMessage,
  secondSide,
  tally,
  toBoard,
  toGrid,
} from './engine.js';

const at = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('the set square', () => {
  it('always gives a right angle with two equal sides, on the board', () => {
    const bad = [];
    for (const corner of [at(0, 0), at(7, 6), at(14, 12), at(3, 11)]) {
      for (const p of [at(5, 5), at(0, 3), at(10, 1), at(14, 6)]) {
        if (p.x === corner.x && p.y === corner.y) continue;
        const q = secondSide(corner, p);
        if (!q) continue;
        if (q.x < 0 || q.y < 0 || q.x > COLS || q.y > ROWS) bad.push('off the board');
        if (Math.abs(angleAt(corner, p, q) - 90) > 1e-6) bad.push('not right');
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives nothing while the two handles sit together', () => {
    expect(draftOf('goc', at(4, 4), at(4, 4))).toBeNull();
  });

  it('gives nothing when no turn fits on the board', () => {
    expect(secondSide(at(7, 6), at(7, 0))).not.toBeNull();
    expect(secondSide(at(0, 6), at(14, 6))).toBeNull();
  });
});

describe('the compass', () => {
  it('opens along the row of its centre', () => {
    expect(placeSecond('tron', at(5, 5), at(8, 2))).toEqual(at(8, 5));
  });

  it('draws with a radius of whole cells', () => {
    expect(draftOf('tron', at(5, 5), at(8, 5))).toEqual({
      kind: 'tron',
      centre: at(5, 5),
      radius: 3,
    });
    expect(draftOf('tron', at(5, 5), at(5, 5))).toBeNull();
  });

  it('says the diameter is twice the radius', () => {
    expect(draftMessage('tron', draftOf('tron', at(5, 5), at(8, 5)))).toContain('đường kính 6 ô');
  });
});

describe('rectangles and squares', () => {
  it('keeps a square square, and on the board', () => {
    const bad = [];
    for (const a of [at(1, 1), at(13, 11), at(7, 6)]) {
      for (const b of [at(0, 0), at(14, 12), at(14, 0), at(0, 12), at(9, 7)]) {
        const c = placeSecond('vuong', a, b);
        if (Math.abs(c.x - a.x) !== Math.abs(c.y - a.y)) bad.push(`not square ${a.x},${a.y}`);
        if (c.x < 0 || c.y < 0 || c.x > COLS || c.y > ROWS) bad.push('off the board');
      }
    }
    expect(bad).toEqual([]);
  });

  it('calls a rectangle with equal sides a square', () => {
    expect(draftOf('chu-nhat', at(1, 1), at(5, 5))?.kind).toBe('vuong');
    expect(draftOf('chu-nhat', at(1, 1), at(6, 4))?.kind).toBe('chu-nhat');
    expect(draftOf('chu-nhat', at(1, 1), at(1, 5))).toBeNull();
  });

  it('works from any two opposite corners', () => {
    expect(draftOf('chu-nhat', at(6, 4), at(1, 1))).toEqual({
      kind: 'chu-nhat',
      left: 1,
      top: 1,
      width: 5,
      height: 3,
    });
  });
});

describe('the flower', () => {
  it('follows the book: each centre lies on the other two circles', () => {
    const circles = flower();
    const centres = circles.map((c) => (c.kind === 'tron' ? c.centre : at(0, 0)));
    const near = (/** @type {number} */ v) => Math.abs(v - FLOWER_RADIUS) < 1e-9;
    expect(near(dist(centres[0], centres[1]))).toBe(true);
    expect(near(dist(centres[0], centres[2]))).toBe(true);
    expect(near(dist(centres[1], centres[2]))).toBe(true);
  });

  it('fits on the board', () => {
    const bad = flower().filter(
      (c) =>
        c.kind === 'tron' &&
        (c.centre.x - c.radius < 0 ||
          c.centre.x + c.radius > COLS ||
          c.centre.y - c.radius < 0 ||
          c.centre.y + c.radius > ROWS),
    );
    expect(bad).toEqual([]);
  });
});

describe('the tally', () => {
  const corner = draftOf('goc', at(2, 2), at(5, 2));
  const circle = draftOf('tron', at(2, 2), at(4, 2));
  const rectangle = draftOf('chu-nhat', at(2, 2), at(6, 4));
  const square = draftOf('vuong', at(2, 2), at(4, 4));

  it('counts what was drawn and names what is missing', () => {
    const items = /** @type {import('./engine.js').Item[]} */ ([corner, circle, circle]);
    expect(tally(items)).toEqual({ goc: 1, tron: 2, 'chu-nhat': 0, vuong: 0 });
    expect(progressMessage(items)).toContain('Còn thiếu: hình chữ nhật, hình vuông');
    expect(isComplete(items)).toBe(false);
  });

  it('is complete with one of each', () => {
    const items = /** @type {import('./engine.js').Item[]} */ ([corner, circle, rectangle, square]);
    expect(isComplete(items)).toBe(true);
    expect(progressMessage(items)).not.toContain('Còn thiếu');
  });
});

describe('the grid', () => {
  it('snaps to it and stays on it', () => {
    expect(toGrid(toBoard(at(3, 2)))).toEqual(at(3, 2));
    expect(toGrid(at(-99, 9999))).toEqual(at(0, ROWS));
  });
});
