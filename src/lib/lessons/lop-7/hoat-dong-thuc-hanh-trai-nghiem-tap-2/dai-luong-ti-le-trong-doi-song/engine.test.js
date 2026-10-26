import { describe, it, expect } from 'vitest';
import { SITUATIONS, classify, niceMax, rejectX, situation, verdict } from './engine.js';

/** @param {import('./engine.js').Situation} s @param {number[]} xs */
const rows = (s, xs) => xs.map((x) => ({ x, y: s.f(x) }));

describe('situations', () => {
  it('each table of values shows the relation the situation is built on', () => {
    for (const s of SITUATIONS) {
      expect(classify(rows(s, [1, 2.5, 7, 12]))).toBe(s.relation);
      expect(classify(rows(s, [s.start[0], s.start[0] * 3]))).toBe(s.relation);
    }
  });
  it('gives the numbers of the book activities', () => {
    expect(situation('inch').f(1813)).toBeCloseTo(4605.02, 9);
    expect(situation('giam-gia').f(300)).toBeCloseTo(255, 9);
    expect(situation('lai').f(120)).toBeCloseTo(6.72, 9);
    expect(situation('quy-tac-72').f(6)).toBe(12);
    expect(situation('quy-tac-72').f(5.6)).toBeCloseTo(12.857, 3);
    expect(situation('van-toc').f(40)).toBe(3);
    expect(situation('taxi').f(2)).toBe(42);
  });
  it('falls back to the first situation for an unknown id', () => {
    expect(situation('nope').id).toBe('inch');
  });
});

describe('classify', () => {
  it('needs two different values of x', () => {
    expect(classify([])).toBeNull();
    expect(classify([{ x: 2, y: 4 }])).toBeNull();
    expect(
      classify([
        { x: 2, y: 4 },
        { x: 2, y: 4 },
      ]),
    ).toBeNull();
  });
  it('tells the three cases apart', () => {
    expect(
      classify([
        { x: 2, y: 6 },
        { x: 5, y: 15 },
      ]),
    ).toBe('thuan');
    expect(
      classify([
        { x: 2, y: 6 },
        { x: 3, y: 4 },
      ]),
    ).toBe('nghich');
    expect(
      classify([
        { x: 1, y: 27 },
        { x: 2, y: 42 },
      ]),
    ).toBe('khac');
  });
});

describe('rejectX', () => {
  const s = situation('van-toc');
  it('accepts a new positive value in range', () => {
    expect(rejectX(s, 60, [40])).toBe('');
  });
  it('rejects missing, non-positive, too large and repeated values', () => {
    expect(rejectX(s, null, [])).not.toBe('');
    expect(rejectX(s, 0, [])).not.toBe('');
    expect(rejectX(s, 151, [])).not.toBe('');
    expect(rejectX(s, 40, [40])).not.toBe('');
  });
});

describe('verdict', () => {
  const num = (/** @type {number} */ n) => String(n).replace('.', ',');
  it('confirms a right choice with the constant', () => {
    const v = verdict(situation('inch'), 'thuan', num);
    expect(v.ok).toBe(true);
    expect(v.text).toContain('2,54');
    expect(verdict(situation('quy-tac-72'), 'nghich', num).text).toContain('72');
    expect(verdict(situation('taxi'), 'khac', num).text).toContain('12');
  });
  it('points at the right column after a wrong choice', () => {
    const v = verdict(situation('taxi'), 'thuan', num);
    expect(v.ok).toBe(false);
    expect(v.text).toContain('y : x');
  });
});

describe('niceMax', () => {
  it('rounds up to 1, 2 or 5 times a power of ten', () => {
    expect(niceMax(3)).toBe(5);
    expect(niceMax(30.48)).toBe(50);
    expect(niceMax(255)).toBe(500);
    expect(niceMax(12)).toBe(20);
    expect(niceMax(100)).toBe(100);
    expect(niceMax(0)).toBe(1);
  });
});
