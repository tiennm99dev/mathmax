/**
 * The balance for the transposition rule: an equation whose two sides are
 * sums of terms, one of them the unknown x. Moving a number to the other
 * side with its sign changed keeps both sides equal (the scale stays level);
 * moving it without changing the sign tips the scale.
 */

import { add, compare, fraction } from '#lib/fraction-engine/index.js';
import { decText, fracText, texDec, texFrac } from '../_shared/rational.js';

/** @typedef {import('../_shared/rational.js').Fraction} Fraction */

/**
 * A term: the unknown x, or a signed number written as a fraction or a
 * decimal.
 * @typedef {{ x: true } | { v: Fraction, form: 'frac' | 'dec' }} Term
 */

/**
 * @typedef {object} Equation
 * @property {Term[]} left
 * @property {Term[]} right
 */

/**
 * @param {Term} t
 * @returns {t is { x: true }}
 */
export const isX = (t) => 'x' in t;

/**
 * Value of one side when x has the value `x`.
 * @param {Term[]} side
 * @param {Fraction} x
 * @returns {Fraction}
 */
export function sideValue(side, x) {
  return side.reduce((acc, t) => add(acc, isX(t) ? x : t.v), fraction(0, 1));
}

/**
 * The solution of an equation in this form (x appears once with
 * coefficient 1): x = (numbers on the other side) − (numbers on its side).
 * @param {Equation} e
 */
export function solution(e) {
  const xLeft = e.left.some(isX);
  const own = xLeft ? e.left : e.right;
  const other = xLeft ? e.right : e.left;
  const nums = (/** @type {Term[]} */ s) =>
    s.reduce((acc, t) => (isX(t) ? acc : add(acc, t.v)), fraction(0, 1));
  return add(nums(other), fraction(-nums(own).n, nums(own).d));
}

/**
 * Difference left − right at the true solution: 0 when the scale is level.
 * @param {Equation} e
 * @param {Fraction} x
 */
export function tilt(e, x) {
  const l = sideValue(e.left, x);
  const r = sideValue(e.right, x);
  return add(l, fraction(-r.n, r.d));
}

/**
 * True when the scale is level for x.
 * @param {Equation} e
 * @param {Fraction} x
 */
export function balanced(e, x) {
  return compare(sideValue(e.left, x), sideValue(e.right, x)) === 0;
}

/**
 * Moves term `i` of `side` to the end of the other side. With `flip` its
 * sign changes, as the transposition rule says; without, it keeps its
 * sign (the classic mistake). The unknown cannot be moved.
 * @param {Equation} e
 * @param {'left' | 'right'} side
 * @param {number} i
 * @param {boolean} flip
 * @returns {Equation}
 */
export function move(e, side, i, flip) {
  const from = e[side];
  const t = from[i];
  if (!t || isX(t)) return e;
  const moved = flip ? { v: fraction(-t.v.n, t.v.d), form: t.form } : t;
  const rest = from.filter((_, j) => j !== i);
  const other = side === 'left' ? 'right' : 'left';
  /** @type {Term[]} */
  const zero = [{ v: fraction(0, 1), form: 'frac' }];
  const next = {
    [side]: rest.length ? rest : zero,
    [other]: [...e[other].filter((x) => isX(x) || x.v.n !== 0), moved],
  };
  return /** @type {Equation} */ (next);
}

/**
 * True when x stands alone on its side: only the other side is left to
 * simplify.
 * @param {Equation} e
 */
export function isolated(e) {
  const own = e.left.some(isX) ? e.left : e.right;
  return own.length === 1;
}

/**
 * Plain text of a number term's size, without its sign.
 * @param {{ v: Fraction, form: 'frac' | 'dec' }} t
 */
const sizeText = (t) => {
  const abs = fraction(Math.abs(t.v.n), t.v.d);
  return t.form === 'dec' ? decText(abs) : fracText(abs);
};

/**
 * TeX of a number term's size, without its sign.
 * @param {{ v: Fraction, form: 'frac' | 'dec' }} t
 */
const sizeTex = (t) => {
  const abs = fraction(Math.abs(t.v.n), t.v.d);
  return t.form === 'dec' ? texDec(abs) : texFrac(abs);
};

/**
 * One term as it appears in a sum: '+ 3/4', '− 2,5', or the first term
 * without a plus sign.
 * @param {Term} t
 * @param {boolean} first
 */
export function termText(t, first) {
  if (isX(t)) return first ? 'x' : '+ x';
  const neg = t.v.n < 0;
  if (first) return `${neg ? '−' : ''}${sizeText(t)}`;
  return `${neg ? '−' : '+'} ${sizeText(t)}`;
}

/**
 * TeX of one side.
 * @param {Term[]} side
 */
export function sideTex(side) {
  return side
    .map((t, i) => {
      if (isX(t)) return i === 0 ? 'x' : '+ x';
      const neg = t.v.n < 0;
      if (i === 0) return `${neg ? '-' : ''}${sizeTex(t)}`;
      return `${neg ? '-' : '+'} ${sizeTex(t)}`;
    })
    .join(' ');
}

/**
 * TeX of the equation.
 * @param {Equation} e
 */
export function equationTex(e) {
  return `${sideTex(e.left)} = ${sideTex(e.right)}`;
}

/**
 * @param {number} n @param {number} d @param {'frac' | 'dec'} [form]
 * @returns {Term}
 */
const num = (n, d, form = 'frac') => ({ v: fraction(n, d), form });
/** @type {Term} */
const X = { x: true };

/** @type {Equation[]} */
export const EQUATIONS = [
  { left: [X, num(3, 4)], right: [num(1, 2)] },
  { left: [X, num(-5, 2, 'dec')], right: [num(-1, 1)] },
  { left: [num(2, 3), X], right: [num(1, 6)] },
  { left: [X, num(-1, 4), num(1, 2)], right: [num(3, 4)] },
  { left: [num(-6, 5, 'dec')], right: [X, num(4, 5, 'dec')] },
  { left: [X, num(5, 6)], right: [num(-1, 3), num(1, 2)] },
];
