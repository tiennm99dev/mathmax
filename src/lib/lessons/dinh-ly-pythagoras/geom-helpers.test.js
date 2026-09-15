import { describe, it, expect } from 'vitest';
import {
  squareA,
  squareB,
  squareC,
  altitudeFoot,
  shearATarget,
  shearBTarget,
  morphSquareA,
  morphSquareB,
} from './geom-helpers.js';

// Layout constants mirrored from the lesson page.
const VIEW = 520;
const APEX_Y = 200;
const FOOT_X = 320;
const LEG_MIN = 40;
const LEG_MAX = 150;

/**
 * Shoelace area of a closed polygon.
 * @param {{x: number, y: number}[]} pts @returns {number}
 */
function area(pts) {
  let sum = 0;
  for (let i = 0; i < pts.length; i++) {
    const q = pts[(i + 1) % pts.length];
    sum += pts[i].x * q.y - q.x * pts[i].y;
  }
  return Math.abs(sum) / 2;
}

/**
 * Build the whole figure for a given right-angle vertex.
 * @param {{x: number, y: number}} R
 */
function figure(R) {
  const A = { x: R.x, y: APEX_Y };
  const H = { x: FOOT_X, y: R.y };
  const a = R.y - APEX_Y;
  const b = FOOT_X - R.x;
  const c = Math.hypot(a, b);
  return { A, H, a, b, c, F: altitudeFoot(A, H, a, c) };
}

/**
 * Same set of vertices, allowing for rotation and reversal of the cycle.
 * @param {{x: number, y: number}[]} p @param {{x: number, y: number}[]} q
 */
function sameVertices(p, q) {
  const key = (/** @type {{x: number, y: number}[]} */ pts) =>
    pts
      .map((v) => `${v.x.toFixed(6)},${v.y.toFixed(6)}`)
      .sort()
      .join('|');
  return key(p) === key(q);
}

const CORNERS = [
  { x: FOOT_X - LEG_MAX, y: APEX_Y + LEG_MAX },
  { x: FOOT_X - LEG_MIN, y: APEX_Y + LEG_MAX },
  { x: FOOT_X - LEG_MAX, y: APEX_Y + LEG_MIN },
  { x: FOOT_X - LEG_MIN, y: APEX_Y + LEG_MIN },
  { x: 200, y: 320 },
];

describe('morphSquareA / morphSquareB — area is preserved', () => {
  it('square a keeps area a² at every step of the morph', () => {
    for (const R of CORNERS) {
      const { A, H, a, b } = figure(R);
      for (let t = 0; t <= 1.00001; t += 0.02) {
        expect(area(morphSquareA(A, R, H, a, b, t))).toBeCloseTo(a * a, 6);
      }
    }
  });

  it('square b keeps area b² at every step of the morph', () => {
    for (const R of CORNERS) {
      const { H, a, b } = figure(R);
      for (let t = 0; t <= 1.00001; t += 0.02) {
        expect(area(morphSquareB(R, H, a, b, t))).toBeCloseTo(b * b, 6);
      }
    }
  });

  it('starts on the leg squares and ends on the hypotenuse rectangles', () => {
    for (const R of CORNERS) {
      const { A, H, a, b, c, F } = figure(R);

      expect(sameVertices(morphSquareA(A, R, H, a, b, 0), squareA(A, R))).toBe(true);
      expect(sameVertices(morphSquareB(R, H, a, b, 0), squareB(R, H))).toBe(true);

      expect(sameVertices(morphSquareA(A, R, H, a, b, 1), shearATarget(A, F, a, b, c))).toBe(true);
      expect(sameVertices(morphSquareB(R, H, a, b, 1), shearBTarget(F, H, a, b, c))).toBe(true);
    }
  });

  it('the two rectangles together fill the square on the hypotenuse', () => {
    for (const R of CORNERS) {
      const { A, H, a, b, c, F } = figure(R);
      const total = area(shearATarget(A, F, a, b, c)) + area(shearBTarget(F, H, a, b, c));
      expect(total).toBeCloseTo(area(squareC(A, H, a, b, c)), 6);
      expect(total).toBeCloseTo(a * a + b * b, 6);
    }
  });
});

describe('layout stays on canvas', () => {
  it('every polygon fits the viewBox for any reachable R, throughout the morph', () => {
    for (const R of CORNERS) {
      const { A, H, a, b, c, F } = figure(R);
      const polys = [
        squareA(A, R),
        squareB(R, H),
        squareC(A, H, a, b, c),
        shearATarget(A, F, a, b, c),
        shearBTarget(F, H, a, b, c),
      ];
      for (let t = 0; t <= 1.00001; t += 0.05) {
        polys.push(morphSquareA(A, R, H, a, b, t), morphSquareB(R, H, a, b, t));
      }
      for (const poly of polys) {
        for (const p of poly) {
          expect(p.x).toBeGreaterThanOrEqual(0);
          expect(p.x).toBeLessThanOrEqual(VIEW);
          expect(p.y).toBeGreaterThanOrEqual(0);
          expect(p.y).toBeLessThanOrEqual(VIEW);
        }
      }
    }
  });
});
