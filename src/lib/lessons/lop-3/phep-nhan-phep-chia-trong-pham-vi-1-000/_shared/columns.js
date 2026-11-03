/**
 * Three-digit multiplication and division worked in columns the book's way
 * ("3 nhân 6 bằng 18, viết 8, nhớ 1"; "13 chia 4 được 3, viết 3"), the tasks
 * that fit each case, and answer options built from the slips a child makes.
 * Pure and DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { int } from '#lib/core/drill.js';

/** What each column of a three-digit number is called, from the left. */
export const PLACES = /** @type {const} */ (['trăm', 'chục', 'đơn vị']);

/**
 * One column of a multiplication, from the ones up.
 * @typedef {object} MulColumn
 * @property {number} value the digit of the first factor in this column
 * @property {number} product the multiplier times `value`
 * @property {number} carryIn what the column before carried over
 * @property {number} carryOut what this column carries over
 * @property {number} digit what is written (all of it in the last column)
 * @property {string} say how the book says it
 */

/**
 * The columns of `a × b`, ones first.
 * @param {number} a a three-digit number
 * @param {number} b a digit
 * @returns {MulColumn[]}
 */
export function mulColumns(a, b) {
  const values = [a % 10, Math.floor(a / 10) % 10, Math.floor(a / 100)];
  let carryIn = 0;
  return values.map((value, i) => {
    const product = b * value;
    const total = product + carryIn;
    const last = i === values.length - 1;
    const digit = last ? total : total % 10;
    const carryOut = last ? 0 : Math.floor(total / 10);
    const added = carryIn > 0 ? `, thêm ${carryIn} bằng ${total}` : '';
    const kept = carryOut > 0 ? `, nhớ ${carryOut}` : '';
    const say = `${b} nhân ${value} bằng ${product}${added}, viết ${digit}${kept}`;
    const column = { value, product, carryIn, carryOut, digit, say };
    carryIn = carryOut;
    return column;
  });
}

/**
 * How many columns of `a × b` carry over.
 * @param {number} a
 * @param {number} b
 */
export const carriesOf = (a, b) => mulColumns(a, b).filter((c) => c.carryOut > 0).length;

/**
 * The whole multiplication in words.
 * @param {number} a
 * @param {number} b
 */
export function mulWords(a, b) {
  const steps = mulColumns(a, b).map((c) => `${c.say}.`);
  return `${steps.join(' ')} Vậy ${a} × ${b} = ${a * b}.`;
}

/**
 * The result of `a × b` with every carry forgotten, a slip children make.
 * @param {number} a
 * @param {number} b
 */
export function forgotCarry(a, b) {
  const [ones, tens, hundreds] = mulColumns(a, b);
  return hundreds.product * 100 + (tens.product % 10) * 10 + (ones.product % 10);
}

/** @typedef {'plain' | 'one' | 'two'} MulKind */

/**
 * A multiplication with no carry, one carry or two, and a product within 999.
 * @param {() => number} rand
 * @param {MulKind} kind
 * @param {{ a: number, b: number }} [not] a task not to repeat
 * @returns {{ a: number, b: number }}
 */
export function drawProduct(rand, kind, not) {
  const carries = { plain: 0, one: 1, two: 2 }[kind];
  for (;;) {
    const b = int(rand, 2, 9);
    const a = int(rand, 101, 499);
    const same = not && not.a === a && not.b === b;
    if (a * b <= 999 && a % 10 > 0 && carriesOf(a, b) === carries && !same) return { a, b };
  }
}

/**
 * The division sentence.
 * @param {number} n
 * @param {number} d
 */
export function divText(n, d) {
  const rest = n % d;
  return `${n} : ${d} = ${Math.floor(n / d)}${rest > 0 ? ` (dư ${rest})` : ''}`;
}

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

/** @typedef {'exact' | 'rest' | 'zero' | 'two'} DivKind */

/**
 * Whether `n : d` is the given case: dividing evenly, with a remainder, with a
 * 0 in the quotient, or with hundreds too small to divide, so that the
 * quotient has two digits. The first two keep every quotient digit above 0.
 * @param {number} n
 * @param {number} d
 * @param {DivKind} kind
 */
export function isDivKind(n, d, kind) {
  const q = Math.floor(n / d);
  const zero = String(q).includes('0');
  if (kind === 'two') return q < 100;
  if (q < 100) return false;
  if (kind === 'zero') return zero;
  return !zero && (kind === 'exact' ? n % d === 0 : n % d > 0);
}

/**
 * A three-digit division by a digit from 2 to 9, of the given case.
 * @param {() => number} rand
 * @param {DivKind} kind
 * @param {{ n: number, d: number }} [not] a task not to repeat
 * @returns {{ n: number, d: number }}
 */
export function drawDivision(rand, kind, not) {
  for (;;) {
    const d = int(rand, 2, 9);
    const n = int(rand, 100, 999);
    const same = not && not.n === n && not.d === d;
    if (isDivKind(n, d, kind) && !same) return { n, d };
  }
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
    ? `Thử lại: ${q} × ${d} = ${n}.`
    : `Thử lại: ${q} × ${d} = ${q * d}, ${q * d} + ${rest} = ${n}.`;
}

/**
 * Up to four number options in increasing order: the right one and the slips
 * that are whole numbers and not the right value, then its neighbours, so a
 * question always has four different choices.
 * @param {number} right
 * @param {number[]} slips
 * @returns {{ options: string[], answer: number }}
 */
export function slipOptions(right, slips) {
  const near = [right + 1, right + 2, right + 3];
  const others = [...new Set([...slips, ...near])].filter(
    (v) => v !== right && v >= 0 && Number.isInteger(v),
  );
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}
