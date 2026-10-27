/**
 * Equations with the unknown in the denominator, for the step-by-step solver
 * widget. Every equation has the shape
 *
 *   x / (x − a) − c / (x − b) = n / ((x − a)(x − b)),   a ≠ b,
 *
 * so the condition is x ≠ a and x ≠ b, and clearing the common denominator
 * (x − a)(x − b) gives x(x − b) − c(x − a) = n, that is
 * x² − (b + c)x + (ca − n) = 0. The generator picks the two roots r1, r2 of
 * that product equation first (c = r1 + r2 − b, n = ca − r1·r2), and often
 * makes one of them equal to a or b, so the learner meets a value that
 * clearing the denominators lets in but the condition throws out.
 */

import { int } from '#lib/core/drill.js';
import { MINUS, intText } from '#lib/core/number-format.js';
import { factorTex, factorText } from '../_shared/linear-text.js';

/**
 * @typedef {object} Problem
 * @property {number} a first excluded value (denominator x − a)
 * @property {number} b second excluded value (denominator x − b)
 * @property {number} c numerator of the second fraction
 * @property {number} n numerator of the right side
 * @property {[number, number]} roots the roots of the product equation, smaller first
 */

/** Largest excluded value or root size the generator uses. */
export const SPAN = 6;

/**
 * Builds a problem from its excluded values and the roots of the cleared
 * equation, or null when it would be degenerate (equal denominators, a zero
 * numerator, a double root).
 * @param {number} a
 * @param {number} b
 * @param {number} r1
 * @param {number} r2
 * @returns {Problem | null}
 */
export function build(a, b, r1, r2) {
  if (a === b || r1 === r2) return null;
  const c = r1 + r2 - b;
  const n = c * a - r1 * r2;
  if (c === 0 || n === 0) return null;
  return { a, b, c, n, roots: r1 < r2 ? [r1, r2] : [r2, r1] };
}

/**
 * A random problem; in about two cases out of three one root breaks the
 * condition.
 * @param {() => number} rand
 * @returns {Problem}
 */
export function makeProblem(rand) {
  for (;;) {
    // a ≠ 0 keeps the first fraction from reading x/x.
    const a = int(rand, -5, 5);
    const b = int(rand, -5, 5);
    if (a === 0) continue;
    const r1 = rand() < 0.67 ? (rand() < 0.5 ? a : b) : int(rand, -SPAN, SPAN);
    const r2 = int(rand, -SPAN, SPAN);
    const p = build(a, b, r1, r2);
    if (p && Math.abs(p.c) <= 9 && Math.abs(p.n) <= 40) return p;
  }
}

/**
 * The excluded values, smaller first.
 * @param {Problem} p
 */
export function excluded(p) {
  return p.a < p.b ? [p.a, p.b] : [p.b, p.a];
}

/**
 * Whether a candidate value is a solution: it must keep every denominator
 * non-zero.
 * @param {Problem} p
 * @param {number} x
 */
export function isAllowed(p, x) {
  return x !== p.a && x !== p.b;
}

/**
 * The solutions that survive the condition.
 * @param {Problem} p
 */
export function solutions(p) {
  return p.roots.filter((r) => isAllowed(p, r));
}

/**
 * Whether the chosen values are exactly the excluded ones.
 * @param {Problem} p
 * @param {Iterable<number>} chosen
 */
export function conditionMatches(p, chosen) {
  const set = new Set(chosen);
  return set.size === 2 && set.has(p.a) && set.has(p.b);
}

/**
 * The equation as TeX.
 * @param {Problem} p
 */
export function equationTex(p) {
  const sign = p.c < 0 ? '+' : '-';
  return `\\frac{x}{${factorTex(p.a)}} ${sign} \\frac{${Math.abs(p.c)}}{${factorTex(p.b)}} = ${p.n < 0 ? '-' : ''}\\frac{${Math.abs(p.n)}}{${productTex(p.a, p.b)}}`;
}

/**
 * The equation as linear text for screen readers.
 * @param {Problem} p
 */
export function equationText(p) {
  const sign = p.c < 0 ? '+' : MINUS;
  return `x/${wrap(factorText(p.a))} ${sign} ${Math.abs(p.c)}/${wrap(factorText(p.b))} = ${intText(p.n)}/(${productText(p.a, p.b)})`;
}

/**
 * The condition, as TeX: 'x \ne 2 \text{ và } x \ne -3'.
 * @param {Problem} p
 */
export function conditionTex(p) {
  const [u, v] = excluded(p);
  return `x \\ne ${u} \\text{ và } x \\ne ${v}`;
}

/**
 * The steps from clearing the denominators to the product equation, as TeX.
 * @param {Problem} p
 */
export function clearingTex(p) {
  const sign = p.c < 0 ? '+' : '-';
  const [r1, r2] = p.roots;
  const k = r1 * r2;
  return [
    `\\text{MTC: } ${productTex(p.a, p.b)}`,
    `${timesX(p.b, '-')} ${sign} ${scaled(Math.abs(p.c), p.a, '-')} = ${p.n}`,
    `x^2 ${quadTail(-(r1 + r2), k)} = 0`,
    `${productTex(r1, r2)} = 0`,
  ];
}

/**
 * The tail `+ βx + γ` of a monic quadratic, as TeX.
 * @param {number} beta
 * @param {number} gamma
 */
function quadTail(beta, gamma) {
  let out = '';
  if (beta !== 0) out += ` ${beta < 0 ? '-' : '+'} ${Math.abs(beta) === 1 ? '' : Math.abs(beta)}x`;
  if (gamma !== 0) out += ` ${gamma < 0 ? '-' : '+'} ${Math.abs(gamma)}`;
  return out.trimStart();
}

/**
 * Why a candidate is kept or thrown out, as plain text.
 * @param {Problem} p
 * @param {number} x
 */
export function reason(p, x) {
  if (x === p.a) {
    return `x = ${intText(x)} làm mẫu ${factorText(p.a)} bằng 0, không thoả mãn ĐKXĐ: loại.`;
  }
  if (x === p.b) {
    return `x = ${intText(x)} làm mẫu ${factorText(p.b)} bằng 0, không thoả mãn ĐKXĐ: loại.`;
  }
  return `x = ${intText(x)} khác ${intText(p.a)} và ${intText(p.b)}, thoả mãn ĐKXĐ: nhận.`;
}

/**
 * The conclusion, as plain text.
 * @param {Problem} p
 */
export function conclusion(p) {
  const s = solutions(p);
  if (s.length === 0) return 'Cả hai giá trị đều bị loại: phương trình vô nghiệm.';
  if (s.length === 1) return `Phương trình có một nghiệm x = ${intText(s[0])}.`;
  return `Phương trình có hai nghiệm x = ${intText(s[0])} và x = ${intText(s[1])}.`;
}

/**
 * The cleared equation's left side `x(x − b) − c(x − a)` as plain text, for
 * the aria label of the steps.
 * @param {Problem} p
 */
export function clearedText(p) {
  const sign = p.c < 0 ? '+' : MINUS;
  return `${timesX(p.b, MINUS)} ${sign} ${scaled(Math.abs(p.c), p.a, MINUS)} = ${intText(p.n)}`;
}

/**
 * The product (x − u)(x − v) as TeX; a factor x loses its brackets and comes
 * first: 'x(x - 2)', '(x + 1)(x - 3)'.
 * @param {number} u
 * @param {number} v
 */
export function productTex(u, v) {
  if (u === 0) return `x(${factorTex(v)})`;
  if (v === 0) return `x(${factorTex(u)})`;
  return `(${factorTex(u)})(${factorTex(v)})`;
}

/**
 * The product (x − u)(x − v) as plain text.
 * @param {number} u
 * @param {number} v
 */
export function productText(u, v) {
  if (u === 0) return `x(${factorText(v)})`;
  if (v === 0) return `x(${factorText(u)})`;
  return `(${factorText(u)})(${factorText(v)})`;
}

/**
 * x(x − b), written x² when b = 0.
 * @param {number} b
 * @param {string} minus
 */
function timesX(b, minus) {
  if (b === 0) return minus === '-' ? 'x^2' : 'x²';
  return `x(${minus === '-' ? factorTex(b) : factorText(b)})`;
}

/**
 * k(x − a), written kx when a = 0.
 * @param {number} k positive
 * @param {number} a
 * @param {string} minus
 */
function scaled(k, a, minus) {
  const head = k === 1 ? '' : String(k);
  if (a === 0) return `${head}x`;
  return `${head}(${minus === '-' ? factorTex(a) : factorText(a)})`;
}

/**
 * A denominator in brackets, unless it is the bare x.
 * @param {string} f
 */
function wrap(f) {
  return f === 'x' ? f : `(${f})`;
}
