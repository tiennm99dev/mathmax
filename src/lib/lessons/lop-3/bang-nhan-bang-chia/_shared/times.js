/**
 * Multiplication and division tables for this chapter: the book's sentences
 * and the option sets of their questions. `a × b` means "a taken b times", so
 * the repeated number always comes first. Pure and DOM-free.
 */

/**
 * "3 × 4 = 12"
 * @param {number} base
 * @param {number} n
 */
export const mulLine = (base, n) => `${base} × ${n} = ${base * n}`;

/**
 * "12 : 3 = 4", the row of the division table of `base` whose result is `n`.
 * @param {number} base
 * @param {number} n
 */
export const divLine = (base, n) => `${base * n} : ${base} = ${n}`;

/**
 * "3 + 3 + 3 + 3"
 * @param {number} base
 * @param {number} times
 */
export const repeatedSum = (base, times) => Array.from({ length: times }, () => base).join(' + ');

/**
 * Four options in increasing order with `right` among them. Options are listed
 * from small to large, so the number of wrong ones placed below `right` decides
 * where it stands. That number changes with the row, or a child could tap the
 * same place every time without reading the question.
 * @param {number} right
 * @param {number} slot how many wrong options to take from `below`, when it has them
 * @param {number[]} below wrong options to try under `right`, the likeliest first
 * @param {number[]} above wrong options to try over `right`, the likeliest first
 */
function placed(right, slot, below, above) {
  const low = [...new Set(below)].filter((v) => v > 0 && v < right).slice(0, slot);
  const high = [...new Set(above)].filter((v) => v > right).slice(0, 3 - low.length);
  const values = [...low, right, ...high].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * Four options around `base × n`: other rows of the table, the sum a child gets
 * by adding instead of multiplying, and one off.
 * @param {number} base
 * @param {number} n
 */
export function productOptions(base, n) {
  const right = base * n;
  const sum = base + n;
  return placed(
    right,
    (base + n) % 4,
    [base * (n - 1), sum, right - 1, base * (n - 2), right - 2, right - 3],
    [base * (n + 1), sum, base * (n + 2), right + 1],
  );
}

/**
 * Four options around a quotient `n` from 1 to 10: its neighbours and the
 * divisor a child may write by mistake.
 * @param {number} base
 * @param {number} n
 */
export function quotientOptions(base, n) {
  return placed(n, (base + n) % 4, [base, n - 1, n - 2, n - 3], [base, n + 1, n + 2, n + 3]);
}
