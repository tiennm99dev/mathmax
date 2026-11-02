/**
 * Addition and subtraction with carrying ("có nhớ") within 100, set out in
 * columns the way the grade 2 book reads them:
 *
 * - 35 + 7: "5 cộng 7 bằng 12, viết 2, nhớ 1. 3 thêm 1 bằng 4, viết 4."
 * - 36 + 28: "6 cộng 8 bằng 14, viết 4, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng
 *   6, viết 6."
 * - 42 − 7: "2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 4 trừ 1
 *   bằng 3, viết 3."
 * - 62 − 37: "2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 3 thêm
 *   1 bằng 4, 6 trừ 4 bằng 2, viết 2."
 *
 * Also builds random carrying problems for the widgets and drills, on top of
 * `column.js`, which holds what carrying and no-carrying share. Pure and
 * DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { equationText, resultOf } from './column.js';
import { numberOptions } from './quiz.js';

/** @typedef {import('./column.js').Op} Op */
/** @typedef {import('./column.js').Kind} Kind */

/**
 * One column of a carrying calculation.
 * @typedef {{
 *   place: 'ones' | 'tens';
 *   digit: number;
 *   ask: string;
 *   hint: string;
 *   text: string;
 * }} CarryStep
 */

/**
 * Whether a calculation of a two-digit number with a one- or two-digit
 * number needs carrying, and its result stays a two-digit number (10 to 99).
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function isCarry(a, b, op) {
  if (![a, b].every((n) => Number.isInteger(n) && n >= 1 && n <= 99) || a < 10) return false;
  const r = resultOf(a, b, op);
  if (r < 10 || r > 99) return false;
  return op === '+' ? (a % 10) + (b % 10) >= 10 : a % 10 < b % 10;
}

/**
 * The two columns of a carrying calculation, ones first, in the book's words.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {[CarryStep, CarryStep]}
 */
export function carrySteps(a, b, op) {
  const [ta, ua] = [Math.floor(a / 10), a % 10];
  const [tb, ub] = [Math.floor(b / 10), b % 10];
  const r = resultOf(a, b, op);
  const [tr, ur] = [Math.floor(r / 10), r % 10];
  if (op === '+') {
    const s = ua + ub;
    /** @type {CarryStep} */
    const ones = {
      place: 'ones',
      digit: ur,
      ask: `Hàng đơn vị: ${ua} cộng ${ub} bằng mấy? Em viết chữ số nào?`,
      hint: `${ua} + ${ub} được 10 hoặc hơn. Em viết chữ số đơn vị của kết quả, nhớ 1 chục.`,
      text: `${ua} cộng ${ub} bằng ${s}, viết ${ur}, nhớ 1.`,
    };
    /** @type {CarryStep} */
    const tens =
      tb > 0
        ? {
            place: 'tens',
            digit: tr,
            ask: `Hàng chục: ${ta} cộng ${tb}, thêm 1 nhớ. Em viết mấy?`,
            hint: `${ta} + ${tb} = ${ta + tb}. Đừng quên thêm 1 đã nhớ.`,
            text: `${ta} cộng ${tb} bằng ${ta + tb}, thêm 1 bằng ${tr}, viết ${tr}.`,
          }
        : {
            place: 'tens',
            digit: tr,
            ask: `Hàng chục: ${ta} thêm 1 nhớ. Em viết mấy?`,
            hint: `Hàng chục có ${ta}. Em thêm 1 đã nhớ.`,
            text: `${ta} thêm 1 bằng ${tr}, viết ${tr}.`,
          };
    return [ones, tens];
  }
  /** @type {CarryStep} */
  const ones = {
    place: 'ones',
    digit: ur,
    ask: `Hàng đơn vị: ${ua} không trừ được ${ub}. Lấy ${10 + ua} trừ ${ub} bằng mấy?`,
    hint: `Em mượn 1 chục: ${ua} thành ${10 + ua}. Em nghĩ: ${ub} cộng mấy bằng ${10 + ua}?`,
    text: `${ua} không trừ được ${ub}, lấy ${10 + ua} trừ ${ub} bằng ${ur}, viết ${ur}, nhớ 1.`,
  };
  /** @type {CarryStep} */
  const tens =
    tb > 0
      ? {
          place: 'tens',
          digit: tr,
          ask: `Hàng chục: ${tb} thêm 1 nhớ là ${tb + 1}. ${ta} trừ ${tb + 1} bằng mấy?`,
          hint: `Em trừ ${ta} cho ${tb + 1}: ${tb + 1} cộng mấy bằng ${ta}?`,
          text: `${tb} thêm 1 bằng ${tb + 1}, ${ta} trừ ${tb + 1} bằng ${tr}, viết ${tr}.`,
        }
      : {
          place: 'tens',
          digit: tr,
          ask: `Hàng chục: ${ta} trừ 1 nhớ bằng mấy?`,
          hint: `Em đã mượn 1 chục, nên hàng chục bớt đi 1.`,
          text: `${ta} trừ 1 bằng ${tr}, viết ${tr}.`,
        };
  return [ones, tens];
}

/**
 * The whole column reading, then the equation: "5 cộng 7 bằng 12, viết 2,
 * nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 35 + 7 = 42."
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function carryText(a, b, op) {
  const [ones, tens] = carrySteps(a, b, op);
  return `${ones.text} ${tens.text} Vậy ${equationText(a, b, op)}.`;
}

/**
 * The sign of a kind of problem.
 * @param {Kind} kind
 * @returns {Op}
 */
export function opOf(kind) {
  return kind.startsWith('add') ? '+' : '-';
}

/**
 * A random carrying problem whose result has two digits:
 * - `add-one`: a two-digit number plus a one-digit number (35 + 7);
 * - `add-two`: two two-digit numbers (36 + 28);
 * - `sub-one`: a two-digit number minus a one-digit number (42 − 7);
 * - `sub-two`: two two-digit numbers (62 − 37).
 * @param {() => number} rand
 * @param {Kind} kind
 * @returns {{ a: number, b: number, op: Op }}
 */
export function makeCarry(rand, kind) {
  if (kind === 'add-one') {
    const ua = int(rand, 2, 9);
    return { a: int(rand, 1, 8) * 10 + ua, b: int(rand, 10 - ua, 9), op: '+' };
  }
  if (kind === 'add-two') {
    const ua = int(rand, 1, 9);
    const ta = int(rand, 1, 7);
    return {
      a: ta * 10 + ua,
      b: int(rand, 1, 8 - ta) * 10 + int(rand, 10 - ua, 9),
      op: '+',
    };
  }
  if (kind === 'sub-one') {
    const ua = int(rand, 0, 8);
    return { a: int(rand, 2, 9) * 10 + ua, b: int(rand, ua + 1, 9), op: '-' };
  }
  const ta = int(rand, 3, 9);
  const ua = int(rand, 0, 8);
  return { a: ta * 10 + ua, b: int(rand, 1, ta - 2) * 10 + int(rand, ua + 1, 9), op: '-' };
}

/**
 * A new carrying problem of a kind that differs from the previous one.
 * @param {() => number} rand
 * @param {Kind} kind
 * @param {{ a: number, b: number }} [previous]
 */
export function freshCarry(rand, kind, previous) {
  for (let i = 0; i < 20; i++) {
    const p = makeCarry(rand, kind);
    if (!previous || p.a !== previous.a || p.b !== previous.b) return p;
  }
  return makeCarry(rand, kind);
}

/**
 * Answer options for a carrying sum: two numbers near it, the slip of
 * forgetting the carry (35 + 7 written 32) and the sum, in increasing order.
 * @param {() => number} rand
 * @param {number} right the sum
 */
export function sumOptions(rand, right) {
  const near = numberOptions(rand, right, right - 3, Math.min(99, right + 3))
    .options.map(Number)
    .filter((v) => v !== right)
    .slice(0, 2);
  const values = [...near, right - 10, right].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * Answer options for a carrying difference: two numbers near it, a slip and the
 * difference, in increasing order. By default the slip forgets the carry in the
 * tens column (62 − 37 written 35); pass another when the lesson has its own.
 * @param {() => number} rand
 * @param {number} right the difference
 * @param {number} [slip]
 */
export function differenceOptions(rand, right, slip = right + 10) {
  const near = numberOptions(rand, right, right - 3, right + 3)
    .options.map(Number)
    .filter((v) => v !== right && v !== slip)
    .slice(0, 2);
  const values = [...near, slip, right].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}
