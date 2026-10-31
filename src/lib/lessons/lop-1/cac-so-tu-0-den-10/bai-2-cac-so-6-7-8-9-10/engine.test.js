import { describe, it, expect } from 'vitest';
import {
  CELLS,
  NEW_NUMBERS,
  countDots,
  emptyFrame,
  freeMessage,
  targetMessage,
  toggleCell,
} from './engine.js';

describe('ten-frame engine', () => {
  it('starts empty and toggles one cell at a time', () => {
    let f = emptyFrame();
    expect(f).toHaveLength(CELLS);
    expect(countDots(f)).toBe(0);
    f = toggleCell(f, 3);
    f = toggleCell(f, 7);
    expect(countDots(f)).toBe(2);
    f = toggleCell(f, 3);
    expect(countDots(f)).toBe(1);
    expect(f[7]).toBe(true);
  });

  it('fills to ten', () => {
    let f = emptyFrame();
    for (let i = 0; i < CELLS; i++) f = toggleCell(f, i);
    expect(countDots(f)).toBe(10);
  });

  it('teaches the numbers 6 to 10', () => {
    expect(NEW_NUMBERS).toEqual([6, 7, 8, 9, 10]);
  });

  it('reads the number in free play', () => {
    expect(freeMessage(7)).toContain('"bảy"');
    expect(freeMessage(7)).toContain('là 8');
    expect(freeMessage(10)).toContain('mười');
    expect(freeMessage(0)).toContain('số 0');
  });

  it('says how many to add or remove', () => {
    expect(targetMessage(5, 8)).toContain('thêm 3');
    expect(targetMessage(10, 6)).toContain('bớt 4');
    expect(targetMessage(9, 9)).toContain('"chín"');
  });
});
