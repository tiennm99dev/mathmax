/**
 * Places and classes of a number of up to six digits: lớp đơn vị (đơn vị,
 * chục, trăm) and lớp nghìn (nghìn, chục nghìn, trăm nghìn). The child taps
 * a digit to learn its place, class and value, and answers rounds that ask
 * for a digit by place, by class or by value. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { CLASS_NAMES, PLACE_NAMES, classOf, digitAt, valueAt } from '../_shared/big-numbers.js';

/**
 * A round: tap the digit at a place, any digit of a class, or the digit
 * worth a value.
 * @typedef {{ n: number, ask: 'place', exp: number }
 *   | { n: number, ask: 'class', cls: number }
 *   | { n: number, ask: 'value', value: number }} Round
 */

/** @type {Round[]} */
export const ROUNDS = [
  { n: 653720, ask: 'place', exp: 4 },
  { n: 653720, ask: 'class', cls: 0 },
  { n: 321458, ask: 'value', value: 300000 },
  { n: 470169, ask: 'place', exp: 2 },
  { n: 470169, ask: 'class', cls: 1 },
  { n: 805246, ask: 'value', value: 5000 },
  { n: 912375, ask: 'place', exp: 3 },
  { n: 538602, ask: 'value', value: 600 },
];

/**
 * The question of a round.
 * @param {Round} round
 */
export function question(round) {
  if (round.ask === 'place') return `Em chạm chữ số ở hàng ${PLACE_NAMES[round.exp]}.`;
  if (round.ask === 'class') return `Em chạm một chữ số thuộc lớp ${CLASS_NAMES[round.cls]}.`;
  return `Em chạm chữ số có giá trị ${fmt(round.value)}.`;
}

/**
 * Whether a tapped place answers the round.
 * @param {Round} round
 * @param {number} exp the tapped place
 */
export function answers(round, exp) {
  if (exp < 0 || exp >= String(round.n).length) return false;
  if (round.ask === 'place') return exp === round.exp;
  if (round.ask === 'class') return classOf(exp) === round.cls;
  return valueAt(round.n, exp) === round.value;
}

/**
 * What the child learns about a tapped digit: "Chữ số 5 ở hàng chục nghìn,
 * thuộc lớp nghìn. Giá trị của chữ số 5 là 50 000."
 * @param {number} n
 * @param {number} exp
 */
export function digitInfo(n, exp) {
  const d = digitAt(n, exp);
  return `Chữ số ${d} ở hàng ${PLACE_NAMES[exp]}, thuộc lớp ${CLASS_NAMES[classOf(exp)]}. Giá trị của chữ số ${d} là ${fmt(valueAt(n, exp))}.`;
}

/**
 * The feedback after a tap.
 * @param {Round} round
 * @param {number} exp
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function tapNote(round, exp) {
  const info = digitInfo(round.n, exp);
  if (answers(round, exp)) return { tone: 'ok', text: `Đúng rồi! ${info}` };
  let nudge = 'Em thử chữ số khác nhé.';
  if (round.ask === 'place') nudge = 'Em đếm hàng từ phải sang trái: đơn vị, chục, trăm, nghìn...';
  if (round.ask === 'class') nudge = 'Mỗi lớp có ba hàng. Lớp đơn vị là ba chữ số bên phải.';
  if (round.ask === 'value') nudge = 'Em xem chữ số ở hàng nào thì có giá trị đó.';
  return { tone: 'warn', text: `${info} ${nudge}` };
}

/**
 * The digits of a round's number grouped by class from the left, each with
 * its place: 653 720 gives [[6, 5, 3], [7, 2, 0]] with places 5 to 0.
 * @param {number} n
 * @returns {{ cls: number, digits: { digit: number, exp: number }[] }[]}
 */
export function groups(n) {
  const len = String(n).length;
  /** @type {{ cls: number, digits: { digit: number, exp: number }[] }[]} */
  const out = [];
  for (let exp = len - 1; exp >= 0; exp--) {
    const cls = classOf(exp);
    if (out.length === 0 || out[out.length - 1].cls !== cls) out.push({ cls, digits: [] });
    out[out.length - 1].digits.push({ digit: digitAt(n, exp), exp });
  }
  return out;
}
