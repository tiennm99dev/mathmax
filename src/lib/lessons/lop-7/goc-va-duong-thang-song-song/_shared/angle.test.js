import { describe, it, expect } from 'vitest';
import {
  along,
  bisectorDir,
  degText,
  directionTo,
  intersect,
  measure,
  norm,
  sectorPath,
} from './angle.js';
import { PAIRS, angleAt, lineDir, raysOf } from './transversal.js';

describe('angle helpers', () => {
  it('normalises and measures angles between rays', () => {
    expect(norm(-30)).toBe(330);
    expect(measure(0, 245)).toBe(115);
    expect(measure(350, 10)).toBe(20);
    expect(measure(0, 180)).toBe(180);
  });

  it('finds directions and points along them in SVG coordinates', () => {
    const o = { x: 100, y: 100 };
    const p = along(o, 50, 90);
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(50);
    expect(directionTo(o, { x: 100, y: 150 })).toBeCloseTo(270);
  });

  it('bisects the smaller turn between two rays', () => {
    expect(bisectorDir(0, 80)).toBe(40);
    expect(bisectorDir(80, 0)).toBe(40);
    expect(bisectorDir(350, 30)).toBe(10);
  });

  it('intersects lines and reports parallel ones', () => {
    const m = intersect({ x: 0, y: 0 }, 0, { x: 10, y: 10 }, 90);
    expect(m?.x).toBeCloseTo(10);
    expect(m?.y).toBeCloseTo(0);
    expect(intersect({ x: 0, y: 0 }, 20, { x: 0, y: 50 }, 200)).toBeNull();
  });

  it('writes degrees with a decimal comma', () => {
    expect(degText(47)).toBe('47°');
    expect(degText(32.5)).toBe('32,5°');
    expect(sectorPath({ x: 0, y: 0 }, 0, 0, 10)).toBe('');
  });
});

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
