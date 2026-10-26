import { describe, it, expect } from 'vitest';
import { PAIRS, angleAt, lineDir, raysOf } from './transversal.js';

describe('angles made by a transversal', () => {
  it('numbers the four angles at a vertex consistently', () => {
    expect([1, 2, 3, 4].map((i) => angleAt(/** @type {1|2|3|4} */ (i), 0, 65))).toEqual([
      115, 65, 115, 65,
    ]);
    expect(raysOf(2, 0, 65)).toEqual([0, 65]);
  });

  it('makes every named pair equal (or supplementary) exactly when the lines are parallel', () => {
    for (const g of [40, 65, 110]) {
      for (const [i, j] of [...PAIRS['dong-vi'], ...PAIRS['so-le-trong']]) {
        expect(angleAt(i, 0, g)).toBe(angleAt(j, 0, g));
        expect(angleAt(i, 0, g)).not.toBe(angleAt(j, 12, g));
      }
      for (const [i, j] of PAIRS['trong-cung-phia']) {
        expect(angleAt(i, 0, g) + angleAt(j, 0, g)).toBe(180);
      }
    }
  });
});

describe('line direction from a pointer', () => {
  it('folds the left end onto the right and clamps', () => {
    expect(lineDir(20, 30)).toBe(20);
    expect(lineDir(200, 30)).toBe(20);
    expect(lineDir(350, 30)).toBe(-10);
    expect(lineDir(170, 30)).toBe(-10);
    expect(lineDir(80, 30)).toBe(30);
    expect(lineDir(180, 30)).toBe(0);
  });
});
