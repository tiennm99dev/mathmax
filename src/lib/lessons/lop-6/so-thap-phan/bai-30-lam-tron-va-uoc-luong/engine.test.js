import { describe, it, expect } from 'vitest';
import {
  PLACES,
  PRESETS,
  digitAt,
  digitCells,
  explain,
  neighbours,
  placeText,
  roundAt,
  toThousandths,
} from './engine.js';

const [TRAM, CHUC, DON_VI, PHAN_MUOI, PHAN_TRAM] = PLACES;

describe('roundAt', () => {
  it('follows the book examples', () => {
    expect(placeText(roundAt(24037, PHAN_MUOI.u), PHAN_MUOI)).toBe('24,0');
    expect(placeText(roundAt(3142, PHAN_TRAM.u), PHAN_TRAM)).toBe('3,14');
    expect(placeText(roundAt(479633000, 1000000), { name: '', u: 1000000, d: 0 })).toBe('480 000');
    expect(placeText(roundAt(232142, DON_VI.u), DON_VI)).toBe('232');
  });

  it('rounds a negative number through its opposite', () => {
    expect(placeText(roundAt(-23567, PHAN_MUOI.u), PHAN_MUOI)).toBe('−23,6');
    expect(placeText(roundAt(-1250, PHAN_MUOI.u), PHAN_MUOI)).toBe('−1,3');
    expect(roundAt(-1249, PHAN_MUOI.u)).toBe(-1200);
  });

  it('carries through nines', () => {
    expect(placeText(roundAt(99960, PHAN_MUOI.u), PHAN_MUOI)).toBe('100,0');
    expect(placeText(roundAt(1950000, TRAM.u), TRAM)).toBe('2 000');
  });

  it('always lands on the nearer mark, halves going away from 0', () => {
    // A sweep of values in thousandths, plus every place around every mark
    // from −3 to 3 units: on the mark, just past it, either side of the half
    // and just before the next mark. Failures are collected so the loop does
    // not pay for thousands of assertions.
    /** @type {string[]} */
    const bad = [];
    for (const p of PLACES) {
      const half = p.u / 2;
      /** @type {number[]} */
      const values = [];
      for (let v = -30000; v <= 30000; v += 7) values.push(v);
      for (let k = -3; k <= 3; k++) {
        for (const off of [0, 1, half - 1, half, half + 1, p.u - 1]) values.push(k * p.u + off);
      }
      for (const v of values) {
        const [lo, hi] = neighbours(v, p.u);
        const r = roundAt(v, p.u);
        const ok =
          lo <= v &&
          hi > lo &&
          (r === lo || r === hi) &&
          Math.abs(r - v) * 2 <= p.u &&
          (Math.abs(r - v) * 2 !== p.u || Math.abs(r) > Math.abs(v));
        if (!ok) bad.push(`${v} at ${p.name} gave ${r}`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('digits', () => {
  it('reads digits by place', () => {
    expect(digitAt(24037, -1)).toBe(0);
    expect(digitAt(24037, -2)).toBe(3);
    expect(digitAt(-479633000, 5)).toBe(4);
  });

  it('tags each written digit with its power of ten', () => {
    expect(digitCells(-23567, 1)).toEqual([
      { ch: '−', pow: null },
      { ch: '2', pow: 1 },
      { ch: '3', pow: 0 },
      { ch: ',', pow: null },
      { ch: '5', pow: -1 },
      { ch: '6', pow: -2 },
      { ch: '7', pow: -3 },
    ]);
    expect(
      digitCells(2000, 2)
        .map((c) => c.ch)
        .join(''),
    ).toBe('2,00');
    expect(
      digitCells(479633000, 0)
        .map((c) => c.ch)
        .join(''),
    ).toBe('479 633');
  });
});

describe('explain', () => {
  it('names the digit and the one on its right', () => {
    const e = explain(24037, PHAN_MUOI);
    expect(e).toMatchObject({ digit: 0, next: 3, up: false, result: '24,0' });
    expect(e.steps.at(-1)).toBe('Kết quả: 24,037 ≈ 24,0.');
  });

  it('starts negative numbers from the opposite', () => {
    const e = explain(-23567, PHAN_MUOI);
    expect(e.steps[0]).toContain('số đối');
    expect(e.result).toBe('−23,6');
  });

  it('turns integer digits on the right into zeros', () => {
    const e = explain(479633000, CHUC);
    expect(e.result).toBe('479 630');
    expect(e.steps.join(' ')).toContain('chữ số 0');
  });

  it('works for every preset and place', () => {
    for (const v of PRESETS)
      for (const p of PLACES) expect(explain(v, p).steps.length).toBeGreaterThan(2);
  });
});

describe('toThousandths', () => {
  it('accepts up to three decimals', () => {
    expect(toThousandths(24.037)).toEqual({ v: 24037 });
    expect(toThousandths(-3.5)).toEqual({ v: -3500 });
    expect(toThousandths(1.2345)).toHaveProperty('error');
    expect(toThousandths(null)).toHaveProperty('error');
    expect(toThousandths(2e6)).toHaveProperty('error');
  });
});
