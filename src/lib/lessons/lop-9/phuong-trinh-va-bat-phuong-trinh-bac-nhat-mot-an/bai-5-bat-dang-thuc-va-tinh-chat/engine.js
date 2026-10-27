/**
 * The number balance of the lesson: two pans hold the two sides of an
 * inequality and the side with the larger number sinks. The learner adds
 * the same number to both sides or multiplies both sides by the same number,
 * predicts the new sign first, and sees the beam keep or reverse its tilt.
 */

import { intText, operand } from '#lib/core/number-format.js';

/** @typedef {'<' | '=' | '>'} Relation */
/** @typedef {'cong' | 'nhan'} Operation */
/** @typedef {{ a: number, b: number }} Sides */

/** Largest size a side may reach, so the numbers stay readable. */
export const LIMIT = 9999;

/**
 * The sign between a and b.
 * @param {number} a
 * @param {number} b
 * @returns {Relation}
 */
export function relation(a, b) {
  if (a < b) return '<';
  if (a > b) return '>';
  return '=';
}

/**
 * The opposite sign; '=' stays '='.
 * @param {Relation} r
 * @returns {Relation}
 */
export function flip(r) {
  if (r === '<') return '>';
  if (r === '>') return '<';
  return '=';
}

/**
 * Both sides after the operation.
 * @param {Sides} s
 * @param {Operation} op
 * @param {number} k
 * @returns {Sides}
 */
export function apply(s, op, k) {
  return op === 'cong' ? { a: s.a + k, b: s.b + k } : { a: s.a * k, b: s.b * k };
}

/**
 * Whether the result stays within the readable range.
 * @param {Sides} s
 * @param {Operation} op
 * @param {number} k
 */
export function fits(s, op, k) {
  const t = apply(s, op, k);
  return Math.abs(t.a) <= LIMIT && Math.abs(t.b) <= LIMIT;
}

/**
 * The sign the properties predict after the operation: adding keeps it,
 * multiplying by a positive number keeps it, multiplying by a negative
 * number reverses it, multiplying by 0 makes both sides 0.
 * @param {Relation} r
 * @param {Operation} op
 * @param {number} k
 * @returns {Relation}
 */
export function expected(r, op, k) {
  if (op === 'cong' || k > 0) return r;
  if (k < 0) return flip(r);
  return '=';
}

/**
 * The beam angle in degrees (SVG, clockwise positive): the larger side sinks.
 * @param {Relation} r
 */
export function tilt(r) {
  if (r === '>') return -12;
  if (r === '<') return 12;
  return 0;
}

/**
 * Plain-text name of the operation: 'Cộng −3 vào hai vế', 'Nhân hai vế với 2'.
 * @param {Operation} op
 * @param {number} k
 */
export function operationText(op, k) {
  return op === 'cong' ? `Cộng ${intText(k)} vào hai vế` : `Nhân hai vế với ${intText(k)}`;
}

/**
 * How one side is computed, as plain text: '5 + (−3)', '(−4) · 2'.
 * @param {number} v
 * @param {Operation} op
 * @param {number} k
 */
export function sideText(v, op, k) {
  return op === 'cong' ? `${intText(v)} + ${operand(k)}` : `${operand(v)} · ${operand(k)}`;
}

/**
 * An inequality between two numbers as plain text, with the book's minus.
 * @param {Sides} s
 */
export function inequalityText(s) {
  return `${intText(s.a)} ${relation(s.a, s.b)} ${intText(s.b)}`;
}

/**
 * Why the sign came out as it did, as plain text.
 * @param {Relation} before
 * @param {Operation} op
 * @param {number} k
 */
export function ruleText(before, op, k) {
  if (before === '=') return 'Hai vế bằng nhau thì sau phép biến đổi vẫn bằng nhau.';
  if (op === 'cong') {
    return 'Cộng cùng một số vào hai vế, ta được bất đẳng thức cùng chiều.';
  }
  if (k > 0) return 'Nhân hai vế với cùng một số dương, ta được bất đẳng thức cùng chiều.';
  if (k < 0) {
    return 'Nhân hai vế với cùng một số âm, ta được bất đẳng thức ngược chiều: chiều nghiêng của cân đảo ngược.';
  }
  return 'Nhân hai vế với 0 thì hai vế đều bằng 0: không còn là bất đẳng thức.';
}

/**
 * The whole step for the history list:
 * '2 < 5 → Nhân hai vế với −2: −4 > −10 (đổi chiều)'.
 * @param {Sides} s
 * @param {Operation} op
 * @param {number} k
 */
export function stepText(s, op, k) {
  const before = relation(s.a, s.b);
  const t = apply(s, op, k);
  const after = relation(t.a, t.b);
  const note = before === after ? 'giữ chiều' : after === '=' ? 'thành đẳng thức' : 'đổi chiều';
  return `${inequalityText(s)} → ${operationText(op, k)}: ${inequalityText(t)} (${note})`;
}
