/**
 * Words for the sign of an integer, for the chapter "Số nguyên". Writing and
 * reading integers (`intText`, `operand`, `readInteger`, `MINUS`) lives in
 * `#lib/core/number-format.js`.
 */

/**
 * Whether an integer is positive, negative or zero, in words.
 * @param {number} n
 */
export function kindOf(n) {
  if (n > 0) return 'số nguyên dương';
  if (n < 0) return 'số nguyên âm';
  return 'số 0 (không dương, không âm)';
}
