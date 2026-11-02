/**
 * What the paper-strip lessons of this chapter share: the colours of a strip
 * and answer options built from the slips a child really makes. Pure and
 * DOM-free.
 */

/** @typedef {'main' | 'copy' | 'extra' | 'plus' | 'faded'} StripTone */

/** The smallest share of a strip that still holds its number at 390 px wide. */
const MIN_LABELLED_SHARE = 0.06;

/**
 * Whether a piece is wide enough to print its number. A narrower piece stays to
 * scale and goes unlabelled, since half a digit would read as another number.
 * @param {number} size
 * @param {number} scale
 */
export const holdsText = (size, scale) => size / scale >= MIN_LABELLED_SHARE;

/**
 * Up to four number options in increasing order: the right one and the slips
 * that are not the right value, then its neighbours, so a question always has
 * four different choices.
 * @param {number} right
 * @param {number[]} slips
 * @returns {{ options: string[], answer: number }}
 */
export function slipOptions(right, slips) {
  const near = [right + 1, right + 2, right + 3];
  const others = [...new Set([...slips, ...near])].filter((v) => v !== right && v >= 0);
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}
