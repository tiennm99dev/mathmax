/**
 * Addition and subtraction without carrying within 100, set out in columns
 * the way the grade 1 book does it: write the numbers so that ones sit under
 * ones and tens under tens, then work the ones column first and the tens
 * column second ("1 cộng 5 bằng 6, viết 6. Hạ 4, viết 4."). Also builds
 * random no-carry problems for the widgets. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { MINUS } from '#lib/core/number-format.js';

/** @typedef {'+' | '-'} Op */
/** @typedef {'ones' | 'tens'} Place */

/**
 * One column of a column calculation.
 * @typedef {{
 *   place: Place;
 *   top: number | null;
 *   bottom: number | null;
 *   digit: number;
 *   ask: string;
 *   hint: string;
 *   text: string;
 * }} ColumnStep
 */

/** Kinds of problem in this chapter, one per theory lesson. */
export const KINDS = /** @type {const} */ (['add-one', 'add-two', 'sub-one', 'sub-two']);

/** @typedef {typeof KINDS[number]} Kind */

/**
 * The sign as the book prints it: "+" or "−".
 * @param {Op} op
 */
export function signOf(op) {
  return op === '+' ? '+' : MINUS;
}

/**
 * The word for the sign, as read aloud: "cộng" or "trừ".
 * @param {Op} op
 */
export function signWord(op) {
  return op === '+' ? 'cộng' : 'trừ';
}

/**
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function resultOf(a, b, op) {
  return op === '+' ? a + b : a - b;
}

/**
 * "41 + 5" or "76 − 5".
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function exprText(a, b, op) {
  return `${a} ${signOf(op)} ${b}`;
}

/**
 * "41 + 5 = 46" or "76 − 5 = 71".
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function equationText(a, b, op) {
  return `${exprText(a, b, op)} = ${resultOf(a, b, op)}`;
}

/**
 * Whether a calculation stays in 0..99 and needs no carrying or borrowing:
 * the ones add up to at most 9, or the top ones digit is at least the bottom
 * one.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function isNoCarry(a, b, op) {
  if (![a, b].every((n) => Number.isInteger(n) && n >= 0 && n <= 99)) return false;
  if (op === '+') return a + b <= 99 && (a % 10) + (b % 10) <= 9;
  return a >= b && a % 10 >= b % 10;
}

/**
 * The tens digit of a number, or null when it has no tens digit (0 to 9).
 * @param {number} n
 */
function tensDigit(n) {
  return n >= 10 ? Math.floor(n / 10) : null;
}

/**
 * The two columns of a no-carry calculation of two numbers whose result has
 * two digits: the ones first, then the tens. A tens column with one digit
 * only is "hạ" (brought down).
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {[ColumnStep, ColumnStep]}
 */
export function columnSteps(a, b, op) {
  const word = signWord(op);
  const r = resultOf(a, b, op);
  const ta = tensDigit(a);
  const tb = tensDigit(b);
  const [ua, ub, ur] = [a % 10, b % 10, r % 10];
  const tr = Math.floor(r / 10);
  /** @type {ColumnStep} */
  const ones = {
    place: 'ones',
    top: ua,
    bottom: ub,
    digit: ur,
    ask: `Hàng đơn vị: ${ua} ${word} ${ub} bằng mấy?`,
    hint:
      ub === 0
        ? `${op === '+' ? 'Cộng với 0' : 'Trừ đi 0'} thì số không thay đổi.`
        : op === '+'
          ? `Em đếm thêm: từ ${ua} đếm thêm ${ub}.`
          : `Em nghĩ: ${ub} cộng mấy thì bằng ${ua}?`,
    text: `${ua} ${word} ${ub} bằng ${ur}, viết ${ur}.`,
  };
  /** @type {ColumnStep} */
  const tens =
    ta !== null && tb !== null
      ? {
          place: 'tens',
          top: ta,
          bottom: tb,
          digit: tr,
          ask: `Hàng chục: ${ta} ${word} ${tb} bằng mấy?`,
          hint:
            op === '+'
              ? `Em cộng hai chữ số ở hàng chục: từ ${ta} đếm thêm ${tb}.`
              : `Em lấy chữ số hàng chục ở trên trừ chữ số hàng chục ở dưới: ${tb} cộng mấy thì bằng ${ta}?`,
          text: `${ta} ${word} ${tb} bằng ${tr}, viết ${tr}.`,
        }
      : {
          place: 'tens',
          top: ta,
          bottom: tb,
          digit: tr,
          ask: 'Hàng chục chỉ có một chữ số. Em hạ chữ số nào xuống?',
          hint: 'Hàng chục không có gì để cộng hay trừ. Em viết lại chữ số ở hàng chục.',
          text: `Hạ ${tr}, viết ${tr}.`,
        };
  return [ones, tens];
}

/**
 * A random no-carry problem of a kind whose result has two digits:
 * - `add-one`: a two-digit number plus a one-digit number (41 + 5);
 * - `add-two`: two two-digit numbers (21 + 14);
 * - `sub-one`: a two-digit number minus a one-digit number (76 − 5);
 * - `sub-two`: two two-digit numbers (76 − 34).
 * @param {() => number} rand
 * @param {Kind} kind
 * @returns {{ a: number, b: number, op: Op }}
 */
export function makeProblem(rand, kind) {
  if (kind === 'add-one') {
    const ua = int(rand, 0, 8);
    return { a: int(rand, 1, 9) * 10 + ua, b: int(rand, 1, 9 - ua), op: '+' };
  }
  if (kind === 'add-two') {
    const ta = int(rand, 1, 8);
    const ua = int(rand, 0, 9);
    return {
      a: ta * 10 + ua,
      b: int(rand, 1, 9 - ta) * 10 + int(rand, 0, 9 - ua),
      op: '+',
    };
  }
  if (kind === 'sub-one') {
    const ua = int(rand, 1, 9);
    return { a: int(rand, 1, 9) * 10 + ua, b: int(rand, 1, ua), op: '-' };
  }
  const ta = int(rand, 2, 9);
  const ua = int(rand, 0, 9);
  return { a: ta * 10 + ua, b: int(rand, 1, ta - 1) * 10 + int(rand, 0, ua), op: '-' };
}

/**
 * A new problem of a kind that differs from the previous one.
 * @param {() => number} rand
 * @param {Kind} kind
 * @param {{ a: number, b: number }} [previous]
 */
export function freshProblem(rand, kind, previous) {
  for (let i = 0; i < 20; i++) {
    const p = makeProblem(rand, kind);
    if (!previous || p.a !== previous.a || p.b !== previous.b) return p;
  }
  return makeProblem(rand, kind);
}
