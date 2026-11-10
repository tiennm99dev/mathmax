/**
 * The place-value model of a five-digit number times a digit: the number
 * split into ten thousands, thousands, hundreds, tens and ones, each part
 * times the digit, then the parts added up. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { digitsOf } from '../_shared/columns.js';

/**
 * The parts of `a`, ones first, each with its product by `b`. A 0 digit
 * gives no part.
 * @param {import('../_shared/columns.js').Task} task
 * @returns {Array<{ col: number, value: number, product: number }>}
 */
export function partsOf({ a, b }) {
  return digitsOf(a)
    .map((digit, col) => {
      const value = digit * 10 ** col;
      return { col, value, product: value * b };
    })
    .filter((p) => p.value > 0);
}

/**
 * The closing sum of the parts: "90 000 + 3 000 + 1 500 + 12 = 94 512".
 * @param {import('../_shared/columns.js').Task} task
 */
export function partsSum(task) {
  const products = partsOf(task)
    .map((p) => p.product)
    .reverse();
  return `${products.map(fmt).join(' + ')} = ${fmt(task.a * task.b)}`;
}
