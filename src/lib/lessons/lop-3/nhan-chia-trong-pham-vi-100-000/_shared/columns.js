/**
 * Multiplying a five-digit number by a digit and dividing a five-digit number
 * by a digit, in columns, the way the grade 3 book reads them:
 *
 * - 31 504 × 3: "3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 0 bằng 0, thêm 1
 *   bằng 1, viết 1. …"
 * - 21 684 : 4: "21 chia 4 được 5, viết 5; 5 nhân 4 bằng 20; 21 trừ 20 bằng
 *   1. Hạ 6, được 16. …"
 *
 * Also what the board shows after each digit a learner writes, random tasks of
 * each case and answer options built from the slips children make. Pure and
 * DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { int } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {{ a: number, b: number }} Task */

/** The name of each column, from the ones. */
export const PLACE_NAMES = /** @type {const} */ (['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn']);

/** How many columns the board has: the results stay within 99 999. */
export const COLUMNS = 5;

/** The largest result a drawn task may have. */
export const LIMIT = 99999;

/** The largest number an answer option may show: the top of the chapter's range. */
const MAX_OPTION = 100000;

/**
 * The digits of a number, ones first.
 * @param {number} n
 */
export const digitsOf = (n) => String(n).split('').reverse().map(Number);

/**
 * The multiplication with its result: "31 504 × 3 = 94 512".
 * @param {number} a
 * @param {number} b
 */
export const mulText = (a, b) => `${fmt(a)} × ${b} = ${fmt(a * b)}`;

/**
 * One column of a multiplication, ones first.
 * @typedef {object} Step
 * @property {number} col 0 for the ones, 1 for the tens, …
 * @property {number} top the digit of the five-digit number
 * @property {number} bottom the one-digit factor
 * @property {number} carryIn what the column before carried over
 * @property {number} carryOut what this column carries over
 * @property {number} plain what the column gives with the carry forgotten
 * @property {number} digit what is written (all of it in the last column)
 * @property {string} say how the book says it, without the final full stop
 */

/**
 * The columns of a multiplication `a × b`, `b` a digit, ones first. The last
 * column writes its whole result.
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
export function mulSteps(a, b) {
  const da = digitsOf(a);
  let carryIn = 0;
  return da.map((top, col) => {
    const product = b * top;
    const total = product + carryIn;
    const last = col === da.length - 1;
    const digit = last ? total : total % 10;
    const carryOut = last ? 0 : Math.floor(total / 10);
    const added = carryIn > 0 ? `, thêm ${carryIn} bằng ${total}` : '';
    const nudge = carryOut > 0 ? `, nhớ ${carryOut}` : '';
    const say = `${b} nhân ${top} bằng ${product}${added}, viết ${digit}${nudge}`;
    /** @type {Step} */
    const step = {
      col,
      top,
      bottom: b,
      carryIn,
      carryOut,
      plain: last ? product : product % 10,
      digit,
      say,
    };
    carryIn = carryOut;
    return step;
  });
}

/**
 * The whole multiplication in words, then the equation.
 * @param {number} a
 * @param {number} b
 */
export function mulWords(a, b) {
  const says = mulSteps(a, b).map((s) => `${s.say}.`);
  return `${says.join(' ')} Vậy ${mulText(a, b)}.`;
}

/**
 * How many columns carry over.
 * @param {number} a
 * @param {number} b
 */
export const carriesOf = (a, b) => mulSteps(a, b).filter((s) => s.carryOut > 0).length;

/**
 * The product with every carry forgotten, the slip children make most.
 * @param {number} a
 * @param {number} b
 */
export const noCarry = (a, b) => mulSteps(a, b).reduce((sum, s) => sum + s.plain * 10 ** s.col, 0);

/**
 * What the board shows after the first `done` digits, every array ones first:
 * the digits written, the small carries above the column they go to, and the
 * column being worked on.
 * @typedef {{
 *   written: string[];
 *   carries: number[];
 *   active: number | null;
 *   finished: number;
 * }} Sheet
 */

/**
 * The board after `done` digits are written. `finished` counts the columns
 * done, from the ones.
 * @param {number} a
 * @param {number} b
 * @param {number} done
 * @returns {Sheet}
 */
export function sheetAt(a, b, done) {
  const steps = mulSteps(a, b);
  const size = Math.max(COLUMNS, steps.length + 1);
  const written = Array.from({ length: size }, () => '');
  const carries = Array.from({ length: size }, () => 0);
  for (const step of steps.slice(0, done)) {
    written[step.col] = String(step.digit);
    if (step.carryOut > 0) carries[step.col + 1] = step.carryOut;
  }
  const active = steps[done]?.col ?? null;
  return { written, carries, active, finished: Math.min(done, steps.length) };
}

/**
 * What the board asks for next.
 * @param {Step} step
 */
export function askFor({ col, top, bottom, carryIn }) {
  const added = carryIn > 0 ? `, rồi thêm ${carryIn} đã nhớ` : '';
  return `Hàng ${PLACE_NAMES[col]}: ${bottom} nhân ${top}${added}. Em viết chữ số nào?`;
}

/**
 * What a wrong digit gets: a nudge on the first try, the working after.
 * @param {Step} step
 * @param {number} digit
 * @param {number} tries wrong tries on this column, this one included
 */
export function wrongFor(step, digit, tries) {
  if (tries >= 2) return `Em xem nhé: ${step.say}.`;
  const { carryIn, carryOut } = step;
  if (carryIn > 0 && digit === step.plain % 10) return `Em quên thêm ${carryIn} đã nhớ rồi.`;
  if (carryOut > 0 && digit === carryOut) {
    return `Số ${carryOut} là số em nhớ sang hàng ${PLACE_NAMES[step.col + 1]}. Ở hàng này em viết chữ số khác.`;
  }
  return `Chưa đúng. Em tính lại hàng ${PLACE_NAMES[step.col]} nhé.`;
}

/** @typedef {'plain' | 'one' | 'many'} CarryKind */

/** How many carries each kind has. */
const CARRIES = { plain: [0, 0], one: [1, 1], many: [2, 4] };

/** @type {Record<CarryKind, Task>} */
const FALLBACK = {
  plain: { a: 12132, b: 3 },
  one: { a: 21314, b: 3 },
  many: { a: 31504, b: 3 },
};

/**
 * A random five-digit number times a digit from 2 to 9 of a kind: no carry,
 * one carry or two and more, with the product within 99 999.
 * @param {() => number} rand
 * @param {CarryKind} kind
 * @param {Task} [not] a task not to repeat
 * @returns {Task}
 */
export function drawMul(rand, kind, not) {
  const [lo, hi] = CARRIES[kind];
  for (let i = 0; i < 5000; i++) {
    const b = int(rand, 2, 9);
    const a = int(rand, 10000, Math.floor(LIMIT / b));
    const carries = carriesOf(a, b);
    const same = not && not.a === a && not.b === b;
    if (carries >= lo && carries <= hi && !same) return { a, b };
  }
  return FALLBACK[kind];
}

/**
 * A quotient and its remainder, the book's way.
 * @param {number} q
 * @param {number} rest
 */
export const withRest = (q, rest) => (rest > 0 ? `${fmt(q)} (dư ${rest})` : fmt(q));

/**
 * The division sentence: "21 437 : 3 = 7 145 (dư 2)".
 * @param {number} n
 * @param {number} d
 */
export const divText = (n, d) => `${fmt(n)} : ${d} = ${withRest(Math.floor(n / d), n % d)}`;

/**
 * The whole division in words, from the left.
 * @param {number} n
 * @param {number} d
 */
export function divWords(n, d) {
  const digits = String(n);
  const rounds = numberDivide(n, d).rounds.map(({ digit, partial, product, rest, end }, i) => {
    const down = i > 0 ? `Hạ ${digits[end]}, được ${partial}. ` : '';
    return `${down}${partial} chia ${d} được ${digit}, viết ${digit}; ${digit} nhân ${d} bằng ${product}; ${partial} trừ ${product} bằng ${rest}.`;
  });
  return `${rounds.join(' ')} Vậy ${divText(n, d)}.`;
}

/**
 * Checking a division by multiplying back.
 * @param {number} n
 * @param {number} d
 */
export function checkText(n, d) {
  const q = Math.floor(n / d);
  const rest = n % d;
  return rest === 0
    ? `Thử lại: ${fmt(q)} × ${d} = ${fmt(n)}.`
    : `Thử lại: ${fmt(q)} × ${d} = ${fmt(q * d)}, ${fmt(q * d)} + ${rest} = ${fmt(n)}.`;
}

/** @typedef {'exact' | 'rest' | 'zero'} DivKind */

/**
 * Whether `n : d` is the given case: dividing evenly, with a remainder (both
 * with every quotient digit above 0), or with a 0 in the quotient.
 * @param {number} n
 * @param {number} d
 * @param {DivKind} kind
 */
export function isDivKind(n, d, kind) {
  const zero = String(Math.floor(n / d)).includes('0');
  if (kind === 'zero') return zero;
  return !zero && (kind === 'exact' ? n % d === 0 : n % d > 0);
}

/**
 * A five-digit division by a digit from 2 to 9, of the given case.
 * @param {() => number} rand
 * @param {DivKind} kind
 * @param {{ n: number, d: number }} [not] a task not to repeat
 * @returns {{ n: number, d: number }}
 */
export function drawDivision(rand, kind, not) {
  for (;;) {
    const d = int(rand, 2, 9);
    const n = int(rand, 10000, LIMIT);
    const same = not && not.n === n && not.d === d;
    if (isDivKind(n, d, kind) && !same) return { n, d };
  }
}

/**
 * Up to four number options in increasing order: the right one and the slips
 * that are whole numbers from 0 to 100 000 and not the right value, then its
 * neighbours, so a question always has four different choices. Written the
 * way the book groups digits.
 * @param {number} right
 * @param {number[]} slips
 * @returns {{ options: string[], answer: number }}
 */
export function slipOptions(right, slips) {
  const near = [right + 1, right + 10, right - 1, right - 10];
  const others = [...new Set([...slips, ...near])].filter(
    (v) => v !== right && v >= 0 && v <= MAX_OPTION && Number.isInteger(v),
  );
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(fmt), answer: values.indexOf(right) };
}
