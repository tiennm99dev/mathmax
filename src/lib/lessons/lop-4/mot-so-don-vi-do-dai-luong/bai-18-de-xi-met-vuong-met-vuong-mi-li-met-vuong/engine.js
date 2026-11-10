/**
 * Zooming into a square unit of area: the square of side 1 m holds 10 rows
 * of 10 squares of side 1 dm, one of those holds 100 squares of side 1 cm,
 * and one of those 100 squares of side 1 mm. The child fills the small
 * squares row by row and sees that 100 of them make the big one.
 * Pure and DOM-free.
 */
import { areaUnit } from '../_shared/measures.js';

/** @typedef {import('../_shared/measures.js').AreaUnit} AreaUnit */

/**
 * One zoom level: the big square and the unit of the small squares in it.
 * @typedef {{ big: AreaUnit, small: AreaUnit }} Level
 */

/** @type {readonly Level[]} */
export const LEVELS = [
  { big: areaUnit('m2'), small: areaUnit('dm2') },
  { big: areaUnit('dm2'), small: areaUnit('cm2') },
  { big: areaUnit('cm2'), small: areaUnit('mm2') },
];

/** Small squares in a big one: 10 rows of 10. */
export const FULL = 100;

/**
 * The count of filled squares after a change, kept from 0 to 100.
 * @param {number} filled
 * @param {number} change
 */
export function fillBy(filled, change) {
  return Math.min(FULL, Math.max(0, filled + change));
}

/**
 * What the grid says about the filled squares.
 * @param {Level} level
 * @param {number} filled
 * @returns {{ done: boolean, text: string }}
 */
export function fillMessage(level, filled) {
  const { big, small } = level;
  if (filled === 0) {
    return {
      done: false,
      text: `Hình vuông to có cạnh ${big.side}, diện tích là 1 ${big.symbol}. Mỗi ô nhỏ có cạnh ${small.side}, diện tích là 1 ${small.symbol}. Em tô các ô nhỏ nhé.`,
    };
  }
  if (filled < FULL) {
    const rows = Math.floor(filled / 10);
    const rest = filled % 10;
    const how =
      rows > 0 && rest > 0
        ? ` (${rows} hàng và ${rest} ô)`
        : rows > 0
          ? ` (${rows} hàng, mỗi hàng 10 ô)`
          : '';
    return {
      done: false,
      text: `Em đã tô ${filled} ô${how}, tức là ${filled} ${small.symbol}. Còn ${FULL - filled} ${small.symbol} nữa là đủ 1 ${big.symbol}.`,
    };
  }
  return {
    done: true,
    text: `Đủ rồi! 10 hàng, mỗi hàng 10 ô: 10 × 10 = 100. Vậy 1 ${big.symbol} = 100 ${small.symbol}.`,
  };
}
