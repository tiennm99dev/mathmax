/**
 * "Chắc chắn, có thể, không thể" for a box of coloured balls. Pure and
 * DOM-free.
 */

/** The three words of the book, in the order the options show them. */
export const CHANCES = /** @type {const} */ (['Chắc chắn', 'Có thể', 'Không thể']);

/** @typedef {(typeof CHANCES)[number]} Chance */

/**
 * "Trong hộp có 3 quả bóng đỏ, 2 quả bóng xanh."
 * @param {import('./visual.js').Ball[]} balls
 */
export function boxText(balls) {
  return `Trong hộp có ${balls.map((b) => `${b.count} quả bóng ${b.color}`).join(', ')}.`;
}

/**
 * Taking one ball out of the box: getting a ball of `color` is certain when
 * every ball has that colour, impossible when none has, possible otherwise.
 * @param {import('./visual.js').Ball[]} balls
 * @param {import('./visual.js').BallColor} color
 * @returns {Chance}
 */
export function chanceOfOne(balls, color) {
  const total = balls.reduce((s, b) => s + b.count, 0);
  const have = balls.filter((b) => b.color === color).reduce((s, b) => s + b.count, 0);
  if (have === 0) return 'Không thể';
  return have === total ? 'Chắc chắn' : 'Có thể';
}

/**
 * Taking two balls at once: whether a given pair of colours can come out.
 * @param {import('./visual.js').Ball[]} balls
 * @param {import('./visual.js').BallColor} first
 * @param {import('./visual.js').BallColor} second
 */
export function pairPossible(balls, first, second) {
  /** @param {import('./visual.js').BallColor} c */
  const have = (c) => balls.filter((b) => b.color === c).reduce((s, b) => s + b.count, 0);
  return first === second ? have(first) >= 2 : have(first) >= 1 && have(second) >= 1;
}
