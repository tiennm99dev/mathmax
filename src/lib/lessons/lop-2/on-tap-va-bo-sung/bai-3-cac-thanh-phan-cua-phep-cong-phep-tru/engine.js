/**
 * The parts of an addition and a subtraction ("Các thành phần của phép cộng,
 * phép trừ"): in 32 + 15 = 47, 32 and 15 are số hạng and 47 is the tổng; in
 * 47 − 15 = 32, 47 is the số bị trừ, 15 the số trừ and 32 the hiệu. The
 * written sum "32 + 15" and difference "47 − 15" are also called tổng and
 * hiệu. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { makeProblem } from '#lib/core/kid/column.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */
/**
 * The tappable parts of a calculation: the first number, the second number,
 * the result, and the whole left side ("32 + 15").
 * @typedef {'a' | 'b' | 'c' | 'expr'} Part
 */

/** @type {Part[]} */
export const PARTS = ['a', 'b', 'c', 'expr'];

/**
 * The book's name for each part.
 * @param {Op} op
 * @param {Part} part
 */
export function nameOf(op, part) {
  if (op === '+') return part === 'a' || part === 'b' ? 'Số hạng' : 'Tổng';
  if (part === 'a') return 'Số bị trừ';
  if (part === 'b') return 'Số trừ';
  return 'Hiệu';
}

/** The names a question may ask for, per sign. */
export const NAMES = {
  '+': ['Số hạng', 'Tổng'],
  '-': ['Số bị trừ', 'Số trừ', 'Hiệu'],
};

/**
 * A calculation within 100 without carrying or borrowing.
 * @param {() => number} rand
 * @param {Op} op
 * @returns {{ a: number, b: number, c: number, op: Op }}
 */
export function makeCalc(rand, op) {
  const kind =
    op === '+'
      ? pick(rand, /** @type {const} */ (['add-one', 'add-two']))
      : pick(rand, /** @type {const} */ (['sub-one', 'sub-two']));
  const p = makeProblem(rand, kind);
  return { a: p.a, b: p.b, c: op === '+' ? p.a + p.b : p.a - p.b, op };
}

/**
 * The parts that carry a name.
 * @param {Op} op
 * @param {string} name
 * @returns {Part[]}
 */
export function partsNamed(op, name) {
  return PARTS.filter((p) => nameOf(op, p) === name);
}

/**
 * A name to look for, different from `previous` when the sign has more than
 * one name.
 * @param {() => number} rand
 * @param {Op} op
 * @param {string | null} [previous]
 */
export function askName(rand, op, previous = null) {
  const pool = NAMES[op].filter((n) => n !== previous);
  return pool[int(rand, 0, pool.length - 1)];
}

/**
 * The text of a part as printed.
 * @param {{ a: number, b: number, c: number, op: Op }} calc
 * @param {Part} part
 */
export function partText(calc, part) {
  if (part === 'expr') return `${calc.a} ${calc.op === '+' ? '+' : '−'} ${calc.b}`;
  return String(calc[part]);
}

/**
 * What a tap answers to "Chạm vào <name>".
 * @param {{ a: number, b: number, c: number, op: Op }} calc
 * @param {string} name asked for
 * @param {Part} part tapped
 * @returns {{ ok: boolean, text: string }}
 */
export function judgeTap(calc, name, part) {
  const got = nameOf(calc.op, part);
  const text = partText(calc, part);
  if (got === name) {
    const also =
      part === 'expr'
        ? ` Kết quả ${calc.c} cũng gọi là ${name.toLowerCase()}.`
        : part === 'c'
          ? ` ${partText(calc, 'expr')} cũng gọi là ${name.toLowerCase()}.`
          : '';
    return { ok: true, text: `Đúng rồi! ${text} là ${name.toLowerCase()}.${also}` };
  }
  return {
    ok: false,
    text: `Chưa đúng: ${text} là ${got.toLowerCase()}. Em tìm ${name.toLowerCase()} nhé. ${clue(name)}`,
  };
}

/**
 * Where a part sits, as a nudge.
 * @param {string} name
 */
export function clue(name) {
  if (name === 'Số hạng') return 'Các số hạng là hai số được cộng với nhau.';
  if (name === 'Tổng') return 'Tổng là kết quả của phép cộng, đứng sau dấu =.';
  if (name === 'Số bị trừ') return 'Số bị trừ đứng đầu, trước dấu −.';
  if (name === 'Số trừ') return 'Số trừ đứng ngay sau dấu −.';
  return 'Hiệu là kết quả của phép trừ, đứng sau dấu =.';
}
