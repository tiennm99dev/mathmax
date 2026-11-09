import { describe, expect, it } from 'vitest';
import { fmt } from '#lib/core/number-format.js';
import { roundTo } from '../_shared/numbers-to-100000.js';
import {
  BOOK_NUMBERS,
  START,
  fineStep,
  positionText,
  roundingHop,
  shiftWindow,
  windowFor,
} from './engine.js';

describe('pieces of the line', () => {
  it('holds the number between two round marks', () => {
    expect(windowFor(65341, 1000)).toEqual({ lo: 65000, hi: 66000, mid: 65500 });
    expect(windowFor(82134, 10000)).toEqual({ lo: 80000, hi: 90000, mid: 85000 });
    expect(windowFor(46000, 10000).lo).toBe(40000);
    expect(windowFor(100000, 10000)).toEqual({ lo: 90000, hi: 100000, mid: 95000 });
    expect(fineStep(1000)).toBe(10);
  });

  it('moves along the line and stops at its ends', () => {
    expect(shiftWindow(65000, 1000, 1)).toBe(66000);
    expect(shiftWindow(0, 1000, -1)).toBe(0);
    expect(shiftWindow(90000, 10000, 1)).toBe(90000);
  });

  it('keeps every number of the book on its piece of line', () => {
    const bad = [];
    for (const unit of /** @type {const} */ ([1000, 10000])) {
      for (const n of [START[unit], ...BOOK_NUMBERS[unit]]) {
        const w = windowFor(n, unit);
        if (n < w.lo || n > w.hi) bad.push(n);
        if (![w.lo, w.hi].includes(roundTo(n, unit))) bad.push(n);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('what the line says', () => {
  it('names the nearer mark and the halfway point', () => {
    expect(positionText(65341, 1000)).toContain(`gần ${fmt(65000)} hơn`);
    expect(positionText(55712, 10000)).toContain(`gần ${fmt(60000)} hơn`);
    expect(positionText(65500, 1000)).toContain('đúng ở giữa');
    expect(positionText(46000, 1000)).toContain('ngay trên mốc');
  });

  it('draws the arrow to the rounded mark', () => {
    expect(roundingHop(65341, 1000)).toEqual({ from: 65341, to: 65000, label: fmt(65000) });
    expect(roundingHop(65500, 1000)?.to).toBe(66000);
    expect(roundingHop(65000, 1000)).toBeNull();
  });
});
