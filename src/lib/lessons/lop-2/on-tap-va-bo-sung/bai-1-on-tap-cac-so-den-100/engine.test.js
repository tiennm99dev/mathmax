import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  BOARD,
  cellOf,
  mistakeHint,
  moveFocus,
  neighbour,
  pickBlanks,
  placeNote,
  typeDigit,
} from './engine.js';

describe('hundred board', () => {
  it('lays out 1 to 100 in ten rows of ten', () => {
    expect(BOARD).toHaveLength(100);
    expect(cellOf(11)).toEqual({ row: 1, col: 0 });
    expect(cellOf(100)).toEqual({ row: 9, col: 9 });
    expect(neighbour(34, 'down')).toBe(44);
    expect(neighbour(30, 'right')).toBeNull();
    expect(moveFocus(34, 'End')).toBe(40);
    expect(moveFocus(34, 'x')).toBeNull();
  });

  it('hides two-digit numbers that never touch each other', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      for (const k of [6, 12]) {
        const blanks = pickBlanks(rng(seed), k);
        if (blanks.length !== k) bad.push(['size', seed, k]);
        for (const a of blanks) {
          if (a < 11 || a > 99) bad.push(['range', seed, a]);
          for (const d of /** @type {const} */ (['left', 'right', 'up', 'down'])) {
            const m = neighbour(a, d);
            if (m !== null && blanks.includes(m)) bad.push([seed, a, m]);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('typing a number', () => {
  it('keeps two digits and no leading zero', () => {
    expect(typeDigit('', 0)).toBe('');
    expect(typeDigit('', 4)).toBe('4');
    expect(typeDigit('4', 0)).toBe('40');
    expect(typeDigit('40', 5)).toBe('40');
  });

  it('names the mistake without giving the answer', () => {
    expect(mistakeHint('47', 47)).toBeNull();
    expect(mistakeHint('74', 47)).toContain('ngược');
    expect(mistakeHint('48', 47)).toContain('hàng đơn vị');
    expect(mistakeHint('57', 47)).toContain('hàng chục');
    expect(mistakeHint('', 47)).toContain('chạm');
    expect(mistakeHint('12', 47)).toContain('hàng thứ 5');
    expect(mistakeHint('12', 47)).not.toContain('47');
  });

  it('tells what the number is made of', () => {
    expect(placeNote(45)).toBe(
      'Số 45 đọc là "bốn mươi lăm". 45 gồm 4 chục và 5 đơn vị. 45 = 40 + 5.',
    );
    expect(placeNote(70)).toBe('Số 70 đọc là "bảy mươi". 70 gồm 7 chục. 70 là số tròn chục.');
  });
});
