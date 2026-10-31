import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  BOARD,
  PATTERNS,
  cellOf,
  hintFor,
  moveFocus,
  neighbour,
  optionsFor,
  pickBlanks,
  targetCount,
} from './engine.js';

describe('hundred board', () => {
  it('lays out 1 to 100 in ten rows of ten', () => {
    expect(BOARD).toHaveLength(100);
    expect(cellOf(1)).toEqual({ row: 0, col: 0 });
    expect(cellOf(10)).toEqual({ row: 0, col: 9 });
    expect(cellOf(11)).toEqual({ row: 1, col: 0 });
    expect(cellOf(100)).toEqual({ row: 9, col: 9 });
  });

  it('adds 1 to the right and 10 downward, stopping at the edges', () => {
    expect(neighbour(34, 'right')).toBe(35);
    expect(neighbour(34, 'down')).toBe(44);
    expect(neighbour(34, 'up')).toBe(24);
    expect(neighbour(30, 'right')).toBeNull();
    expect(neighbour(31, 'left')).toBeNull();
    expect(neighbour(5, 'up')).toBeNull();
    expect(neighbour(95, 'down')).toBeNull();
  });

  it('moves focus with the arrow keys, Home and End', () => {
    expect(moveFocus(34, 'ArrowDown')).toBe(44);
    expect(moveFocus(34, 'Home')).toBe(31);
    expect(moveFocus(34, 'End')).toBe(40);
    expect(moveFocus(34, 'a')).toBeNull();
  });
});

describe('colouring patterns', () => {
  it('finds the numbers each rule names', () => {
    const found = Object.fromEntries(PATTERNS.map((p) => [p.id, BOARD.filter(p.test)]));
    expect(found['tron-chuc']).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    expect(found['giong-nhau']).toEqual([11, 22, 33, 44, 55, 66, 77, 88, 99]);
    expect(found['don-vi-5']).toEqual([5, 15, 25, 35, 45, 55, 65, 75, 85, 95]);
    expect(found['chuc-6']).toEqual([61, 62, 63, 64, 65, 66, 67, 68, 69, 70]);
    expect(PATTERNS.map(targetCount)).toEqual([9, 9, 10, 10]);
  });

  it('explains a wrong tap', () => {
    expect(PATTERNS[0].why(100)).toContain('ba chữ số');
    expect(PATTERNS[1].why(7)).toContain('một chữ số');
  });
});

describe('missing numbers', () => {
  it('hides numbers that never touch each other', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const blanks = pickBlanks(rng(seed));
      if (blanks.length !== 6) bad.push(['size', seed]);
      for (const a of blanks) {
        for (const b of blanks) {
          if (a === b) continue;
          if (
            ['left', 'right', 'up', 'down'].some(
              (d) => neighbour(a, /** @type {'left'} */ (d)) === b,
            )
          )
            bad.push([seed, a, b]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('offers the answer with a miss by 1 and a miss by 10', () => {
    expect(optionsFor(34)).toEqual([34, 35, 44]);
    expect(optionsFor(99)).toEqual([89, 99, 100]);
    expect(optionsFor(95)).toEqual([85, 95, 96]);
  });

  it('hints from a shown neighbour', () => {
    expect(hintFor(34, [34])).toBe('Ô bên trái là 33. Sang phải một ô là thêm 1.');
    expect(hintFor(41, [41])).toBe('Ô ngay trên là 31. Xuống một ô là thêm 10.');
    expect(hintFor(34, [33, 34])).toContain('Ô ngay trên là 24');
  });
});
