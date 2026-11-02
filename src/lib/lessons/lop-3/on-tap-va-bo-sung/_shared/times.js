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
 * Four options around `base × n`, in increasing order: the next and previous
 * rows of the table and the sum a child gets by adding instead of multiplying.
 * @param {number} base
 * @param {number} n
 */
export function productOptions(base, n) {
  const right = base * n;
  const wrong = [base * (n + 1), base * (n - 1), base + n, base * (n + 2), right + 1];
  const picked = [...new Set(wrong)].filter((v) => v > 0 && v !== right).slice(0, 3);
  const values = [right, ...picked].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * Four options around a quotient `n` from 1 to 10, in increasing order: its
 * neighbours and the divisor a child may write by mistake.
 * @param {number} base
 * @param {number} n
 */
export function quotientOptions(base, n) {
  const wrong = [n + 1, n - 1, base, n + 2, n - 2, base + 1];
  const picked = [...new Set(wrong)].filter((v) => v > 0 && v !== n).slice(0, 3);
  const values = [n, ...picked].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(n) };
}
