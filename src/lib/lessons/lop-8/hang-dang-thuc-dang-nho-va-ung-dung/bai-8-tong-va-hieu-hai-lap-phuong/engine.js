/**
 * Cards for the matching game of "Tổng và hiệu hai lập phương": each sum or
 * difference of two cubes has one product form that equals it, next to
 * look-alike products with a wrong sign. Polynomials in x are coefficient
 * arrays, lowest degree first, so a match is checked exactly by multiplying
 * out, and a single value of x can show that two cards differ.
 */

import { evaluate, mul } from '#lib/algebra-engine/polynomial.js';

/** @typedef {{ id: string, tex: string, poly: number[] }} LeftCard */
/** @typedef {{ id: string, tex: string, factors: [number[], number[]] }} RightCard */

/** @type {LeftCard[]} */
export const LEFT = [
  { id: 'l1', tex: 'x^3 + 8', poly: [8, 0, 0, 1] },
  { id: 'l2', tex: 'x^3 - 27', poly: [-27, 0, 0, 1] },
  { id: 'l3', tex: '8x^3 + 1', poly: [1, 0, 0, 8] },
  { id: 'l4', tex: '64 - x^3', poly: [64, 0, 0, -1] },
];

/** Product forms in a fixed mixed order: four right, four with a sign slip. */
/** @type {RightCard[]} */
export const RIGHT = [
  {
    id: 'r1',
    tex: '(x - 3)(x^2 - 3x + 9)',
    factors: [
      [-3, 1],
      [9, -3, 1],
    ],
  },
  {
    id: 'r2',
    tex: '(x + 2)(x^2 - 2x + 4)',
    factors: [
      [2, 1],
      [4, -2, 1],
    ],
  },
  {
    id: 'r3',
    tex: '(4 - x)(16 - 4x + x^2)',
    factors: [
      [4, -1],
      [16, -4, 1],
    ],
  },
  {
    id: 'r4',
    tex: '(2x + 1)(4x^2 - 2x + 1)',
    factors: [
      [1, 2],
      [1, -2, 4],
    ],
  },
  {
    id: 'r5',
    tex: '(x + 2)(x^2 + 2x + 4)',
    factors: [
      [2, 1],
      [4, 2, 1],
    ],
  },
  {
    id: 'r6',
    tex: '(4 - x)(16 + 4x + x^2)',
    factors: [
      [4, -1],
      [16, 4, 1],
    ],
  },
  {
    id: 'r7',
    tex: '(x - 3)(x^2 + 3x + 9)',
    factors: [
      [-3, 1],
      [9, 3, 1],
    ],
  },
  {
    id: 'r8',
    tex: '(2x + 1)(4x^2 + 2x + 1)',
    factors: [
      [1, 2],
      [1, 2, 4],
    ],
  },
];

/**
 * The product of a right card, multiplied out.
 * @param {RightCard} card
 */
export const expand = (card) => mul(card.factors[0], card.factors[1]);

/**
 * Value of a left card at x.
 * @param {LeftCard} card
 * @param {number} x
 */
export const leftValue = (card, x) => evaluate(card.poly, x);

/**
 * Value of a right card at x, factor by factor.
 * @param {RightCard} card
 * @param {number} x
 * @returns {{ first: number, second: number, value: number }}
 */
export function rightValue(card, x) {
  const first = evaluate(card.factors[0], x);
  const second = evaluate(card.factors[1], x);
  return { first, second, value: first * second };
}

/**
 * Whether the two cards are equal for every x (same coefficients).
 * @param {LeftCard} left
 * @param {RightCard} right
 */
export function matches(left, right) {
  const p = expand(right);
  return p.length === left.poly.length && p.every((c, i) => c === left.poly[i]);
}

/**
 * A small integer x at which two different cards take different values, so a
 * learner can see the mismatch; null when they are equal.
 * @param {LeftCard} left
 * @param {RightCard} right
 * @returns {number | null}
 */
export function witness(left, right) {
  if (matches(left, right)) return null;
  for (const x of [1, -1, 2, -2, 3, -3, 0]) {
    if (leftValue(left, x) !== rightValue(right, x).value) return x;
  }
  // Two different cubics cannot agree at seven points.
  return null;
}
