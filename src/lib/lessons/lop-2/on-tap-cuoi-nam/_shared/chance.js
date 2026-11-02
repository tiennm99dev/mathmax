/**
 * Boxes of coloured balls and the book's three words for what can happen when
 * balls are taken without looking. The word comes from going through every way
 * of taking them. Pure and DOM-free.
 */

export const BALL_COLORS = /** @type {const} */ ({
  xanh: { name: 'xanh', fill: '#2563eb', mark: 'X', ink: '#ffffff' },
  do: { name: 'đỏ', fill: '#dc2626', mark: 'Đ', ink: '#ffffff' },
  vang: { name: 'vàng', fill: '#facc15', mark: 'V', ink: '#334155' },
});

/** @typedef {keyof typeof BALL_COLORS} BallColor */

export const COLOR_IDS = /** @type {BallColor[]} */ (Object.keys(BALL_COLORS));

/** The three words, in the order the options show them. */
export const WORDS = /** @type {const} */ (['Chắc chắn', 'Có thể', 'Không thể']);

/** @typedef {(typeof WORDS)[number]} ChanceWord */

/**
 * The word for an event, given every way things can turn out.
 * @template T
 * @param {readonly T[]} outcomes
 * @param {(outcome: T) => boolean} holds
 * @returns {ChanceWord}
 */
export function wordOf(outcomes, holds) {
  const hits = outcomes.filter(holds).length;
  if (hits === 0) return 'Không thể';
  return hits === outcomes.length ? 'Chắc chắn' : 'Có thể';
}

/**
 * Every way of taking one or two balls from a box.
 * @param {readonly BallColor[]} balls
 * @param {1 | 2} taken
 * @returns {BallColor[][]}
 */
export function waysToTake(balls, taken) {
  if (taken === 1) return balls.map((b) => [b]);
  return balls.flatMap((a, i) => balls.slice(i + 1).map((b) => [a, b]));
}

/**
 * A box of balls: 'hộp có 2 bóng xanh, 1 bóng đỏ'.
 * @param {readonly BallColor[]} balls
 */
export function boxText(balls) {
  const parts = COLOR_IDS.filter((c) => balls.includes(c)).map(
    (c) => `${balls.filter((b) => b === c).length} bóng ${BALL_COLORS[c].name}`,
  );
  return `Hộp có ${parts.join(', ')}`;
}
