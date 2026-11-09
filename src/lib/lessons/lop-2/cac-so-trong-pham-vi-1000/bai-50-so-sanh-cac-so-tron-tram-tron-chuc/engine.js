/**
 * The side-by-side comparison of "So sánh các số tròn trăm, tròn chục": two
 * numbers built from flats and rods, and the sign that goes between them. Pure
 * and DOM-free.
 */
import { compareSign, freshInt } from '#lib/core/kid/numbers.js';
import { compareWhy } from '#lib/core/kid/place-value.js';

/** @typedef {'tram' | 'chuc'} Mode */
/** @typedef {{ hundreds: number, tens: number }} Side */
/** @typedef {{ left: Side, right: Side }} Pair */

/** The first pair of each mode, the same on the server and in the browser. */
export const FIRST_PAIR = /** @type {Record<Mode, Pair>} */ ({
  tram: { left: { hundreds: 3, tens: 0 }, right: { hundreds: 5, tens: 0 } },
  chuc: { left: { hundreds: 1, tens: 2 }, right: { hundreds: 1, tens: 5 } },
});

/**
 * The number a side shows.
 * @param {Side} side
 */
export const valueOf = (side) => side.hundreds * 100 + side.tens * 10;

/**
 * A new pair to compare; round tens share their hundreds half of the time, so
 * the tens decide.
 * @param {Mode} mode
 * @param {Pair} previous
 * @param {() => number} [random] Returns a number in [0, 1).
 * @returns {Pair}
 */
export function freshPair(mode, previous, random = Math.random) {
  const left = freshInt(1, 9, previous.left.hundreds, random);
  if (mode === 'tram') {
    return {
      left: { hundreds: left, tens: 0 },
      right: { hundreds: freshInt(1, 9, left, random), tens: 0 },
    };
  }
  const leftTens = freshInt(1, 9, previous.left.tens, random);
  const sameHundreds = random() < 0.5;
  return {
    left: { hundreds: left, tens: leftTens },
    right: {
      hundreds: sameHundreds ? left : freshInt(1, 9, left, random),
      tens: freshInt(1, 9, sameHundreds ? leftTens : null, random),
    },
  };
}

/**
 * The live line about the sign the child picked.
 * @param {Pair} pair
 * @param {import('#lib/core/kid/numbers.js').Sign | null} picked
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function signNote(pair, picked) {
  const a = valueOf(pair.left);
  const b = valueOf(pair.right);
  if (picked === null) {
    return { tone: 'info', text: 'Em đếm các khối hai bên rồi chọn dấu.' };
  }
  if (picked === compareSign(a, b)) return { tone: 'ok', text: `Đúng rồi! ${compareWhy(a, b)}` };
  if (a === b) return { tone: 'warn', text: 'Chưa đúng. Hai bên có số khối như nhau.' };
  return pair.left.hundreds === pair.right.hundreds
    ? {
        tone: 'warn',
        text: 'Chưa đúng. Số tấm trăm hai bên bằng nhau. Em so sánh số thanh chục nhé.',
      }
    : { tone: 'warn', text: 'Chưa đúng. Em so sánh số tấm trăm hai bên nhé.' };
}
