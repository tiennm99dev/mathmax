/**
 * The dot grid of a multiplication: `a × b` is b rows of a dots, the book's
 * "a taken b times". Also the "tap the part" game on its three numbers.
 */

export const MIN_FACTOR = 1;
export const MAX_FACTOR = 8;

/** Which part a question asks for: the result, or either factor. */
/** @typedef {'tich' | 'thua-so'} Ask */

/** @type {ReadonlyArray<{ a: number, b: number, ask: Ask }>} */
export const QUESTIONS = [
  { a: 3, b: 4, ask: 'tich' },
  { a: 2, b: 6, ask: 'thua-so' },
  { a: 5, b: 3, ask: 'thua-so' },
  { a: 4, b: 2, ask: 'tich' },
  { a: 2, b: 7, ask: 'tich' },
  { a: 3, b: 3, ask: 'thua-so' },
];

/** What the three positions of `a × b = c` are called. */
export const PART_NAMES = /** @type {const} */ (['Thừa số', 'Thừa số', 'Tích']);

/**
 * Whether tapped position 0, 1 or 2 of the sentence is the part asked for.
 * @param {Ask} ask
 * @param {number} position
 */
export const isRightPart = (ask, position) => (ask === 'tich' ? position === 2 : position < 2);

/**
 * What the grid says.
 * @param {number} a
 * @param {number} b
 */
export function gridText(a, b) {
  return `${b} hàng, mỗi hàng ${a} chấm: ${a} được lấy ${b} lần. Hai thừa số là ${a} và ${b}, tích là ${a * b}.`;
}

/**
 * What swapping the factors shows.
 * @param {number} a the factors after the swap
 * @param {number} b
 */
export function swapText(a, b) {
  return `Đổi chỗ hai thừa số: ${a} × ${b} = ${b} × ${a}. Tích vẫn là ${a * b}.`;
}

/**
 * Feedback after tapping a part.
 * @param {Ask} ask
 * @param {number} position
 * @param {number} a
 * @param {number} b
 */
export function partFeedback(ask, position, a, b) {
  const value = [a, b, a * b][position];
  if (isRightPart(ask, position)) {
    return ask === 'tich'
      ? `Đúng rồi! ${value} là kết quả của phép nhân nên gọi là tích.`
      : `Đúng rồi! ${value} là một thừa số. Hai thừa số là ${a} và ${b}.`;
  }
  return position === 2
    ? `Chưa đúng. ${value} là kết quả nên gọi là tích. Thừa số đứng hai bên dấu nhân.`
    : `Chưa đúng. ${value} là thừa số. Tích là số đứng sau dấu bằng.`;
}
