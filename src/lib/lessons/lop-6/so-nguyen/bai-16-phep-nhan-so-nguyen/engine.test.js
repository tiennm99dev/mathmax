import { describe, it, expect } from 'vitest';
import { COLS, ROWS, STEPS, isOpen, reason, signRule, stepCaption } from './engine.js';

describe('isOpen', () => {
  it('starts with the natural quadrant and ends with every cell', () => {
    for (const a of ROWS) {
      for (const b of COLS) {
        expect(isOpen(a, b, 0)).toBe(a >= 0 && b >= 0);
        expect(isOpen(a, b, STEPS)).toBe(true);
      }
    }
  });

  it('opens one more column, then one more row, per step', () => {
    expect(isOpen(3, -1, 1)).toBe(true);
    expect(isOpen(3, -2, 1)).toBe(false);
    expect(isOpen(-1, 2, 4)).toBe(false);
    expect(isOpen(-1, 2, 5)).toBe(true);
    expect(isOpen(-2, -3, 5)).toBe(false);
    const count = (/** @type {number} */ s) =>
      ROWS.flatMap((a) => COLS.filter((b) => isOpen(a, b, s))).length;
    for (let s = 1; s <= STEPS; s++) expect(count(s)).toBeGreaterThan(count(s - 1));
  });

  it('only opens a cell when the cells it is derived from are open', () => {
    for (let s = 0; s <= STEPS; s++) {
      for (const a of ROWS) {
        for (const b of COLS) {
          if (isOpen(a, b, s) && a < 0) expect(isOpen(a + 1, b, s)).toBe(true);
        }
      }
    }
  });
});

describe('reason', () => {
  it('ends with the true product', () => {
    for (const a of ROWS) {
      for (const b of COLS) {
        const p = a * b;
        const text = p < 0 ? `−${-p}` : String(p);
        expect(reason(a, b), `${a}·${b}`).toMatch(new RegExp(`= ${text}( \\(|,|\\.)`));
      }
    }
  });

  it('writes a repeated sum and a column pattern', () => {
    expect(reason(3, -2)).toBe('3 · (−2) = (−2) + (−2) + (−2) = −6.');
    expect(reason(-2, -3)).toBe(
      'Trong cột b = −3: (−1) · (−3) = 3; a giảm 1 thì tích giảm đi (−3), nên (−2) · (−3) = 3 − (−3) = 6.',
    );
  });
});

describe('signRule and stepCaption', () => {
  it('states the sign of the product', () => {
    expect(signRule(-2, -3)).toMatch(/tích dương/);
    expect(signRule(-2, 3)).toMatch(/tích âm/);
    expect(signRule(0, -3)).toMatch(/bằng 0/);
    expect(stepCaption(0)).toMatch(/tự nhiên/);
    expect(stepCaption(1)).toMatch(/= −3\.$/);
    expect(stepCaption(6)).toMatch(/\(−2\) · \(−2\) = 4\.$/);
  });
});
