import { describe, expect, it } from 'vitest';
import {
  COLS,
  GOALS,
  LINE_BINS,
  LINE_CARDS,
  LINE_FIGURES,
  ROWS,
  allDots,
  dot,
  inLine,
  isSlanted,
  middleOf,
  nearestFree,
  stepDot,
  trioText,
} from './engine.js';

/** @param {import('./engine.js').Trio} t */
const points = (t) => [t.A, t.B, t.C];

describe('three points on the dot board', () => {
  it('has a dot for every column and row', () => {
    expect(allDots()).toHaveLength(COLS * ROWS);
  });

  it('tells collinear points and the one in the middle', () => {
    const row = { A: dot(1, 2), B: dot(3, 2), C: dot(5, 2) };
    expect(inLine(row)).toBe(true);
    expect(middleOf(row)).toBe('B');
    const slant = { A: dot(4, 0), B: dot(0, 4), C: dot(2, 2) };
    expect(inLine(slant)).toBe(true);
    expect(middleOf(slant)).toBe('C');
    expect(isSlanted(slant)).toBe(true);
    const off = { A: dot(1, 1), B: dot(3, 1), C: dot(4, 3) };
    expect(inLine(off)).toBe(false);
    expect(middleOf(off)).toBeNull();
    expect(trioText(off)).toContain('không thẳng hàng');
    expect(trioText(slant)).toContain('Điểm C ở giữa');
  });

  it('never lands a point on another point or off the board', () => {
    const taken = [dot(0, 0), dot(1, 0)];
    expect(nearestFree({ x: 0, y: 0 }, taken)).toEqual(dot(0, 1));
    expect(nearestFree({ x: 999, y: 999 }, taken)).toEqual(dot(COLS - 1, ROWS - 1));
    expect(stepDot(dot(0, 0), -1, 0, [])).toEqual(dot(0, 0));
    expect(stepDot(dot(0, 0), 1, 0, [dot(1, 0)])).toEqual(dot(0, 0));
    expect(stepDot(dot(0, 0), 0, 1, [dot(1, 0)])).toEqual(dot(0, 1));
  });

  it('starts every task unmet, on free dots, and every task can be met', () => {
    const solved = {
      'thang-hang': { A: dot(1, 1), B: dot(3, 1), C: dot(4, 1) },
      'khong-thang-hang': { A: dot(1, 2), B: dot(3, 2), C: dot(5, 1) },
      'o-giua': { A: dot(1, 3), B: dot(3, 3), C: dot(5, 3) },
      'duong-xien': { A: dot(1, 1), B: dot(2, 2), C: dot(3, 3) },
    };
    const bad = [];
    for (const g of GOALS) {
      if (g.met(g.start)) bad.push(`${g.id} starts met`);
      const keys = new Set(points(g.start).map((p) => `${p.x},${p.y}`));
      if (keys.size !== 3) bad.push(`${g.id} overlaps`);
      if (!g.met(solved[/** @type {keyof typeof solved} */ (g.id)])) bad.push(`${g.id} unsolved`);
    }
    expect(bad).toEqual([]);
  });
});

describe('sorting segments, lines and curves', () => {
  it('sends each card to the bin its drawing shows', () => {
    const bad = [];
    for (const card of LINE_CARDS) {
      const f = LINE_FIGURES[card.id];
      const bin = f.curves ? 'cong' : f.lines ? 'thang' : 'doan';
      if (card.bin !== bin) bad.push(card.id);
      if (!LINE_BINS.some((b) => b.id === card.bin)) bad.push(card.id);
    }
    expect(bad).toEqual([]);
    expect(LINE_CARDS).toHaveLength(6);
  });
});
