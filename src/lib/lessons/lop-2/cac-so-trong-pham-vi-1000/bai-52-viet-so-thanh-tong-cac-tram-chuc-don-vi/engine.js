/**
 * The splitting number of "Viết số thành tổng các trăm, chục, đơn vị": each
 * digit tapped opens its part of the sum. A zero digit has no part. Pure and
 * DOM-free.
 */
import { PLACES, placesOf, sumParts } from '../_shared/place-value.js';

/** @typedef {import('../_shared/place-value.js').PlaceKey} PlaceKey */

/** The numbers to split, in order: the zero digits come early. */
export const NUMBERS = /** @type {const} */ ([345, 408, 840, 139, 607, 814, 360, 992]);

/**
 * What a digit of `n` stands for.
 * @param {number} n
 * @param {PlaceKey} key
 */
export function digitText(n, key) {
  const place = PLACES.find((p) => p.key === key);
  if (!place) return '';
  const digit = placesOf(n)[key];
  if (digit === 0) {
    return `Chữ số 0 ở hàng ${place.unit}: không có ${place.unit} nào, nên em không viết vào tổng.`;
  }
  return `Chữ số ${digit} ở hàng ${place.unit}: ${digit} ${place.unit} là ${digit * place.value}.`;
}

/**
 * The sum with the parts opened so far, and "?" for the others.
 * @param {number} n
 * @param {readonly PlaceKey[]} opened
 * @returns {string}
 */
export function sumSoFar(n, opened) {
  const digits = placesOf(n);
  const shown = PLACES.filter((p) => digits[p.key] > 0).map((p) =>
    opened.includes(p.key) ? String(digits[p.key] * p.value) : '?',
  );
  return `${n} = ${shown.join(' + ')}`;
}

/**
 * Whether every part of the sum is open; a zero digit need not be tapped.
 * @param {number} n
 * @param {readonly PlaceKey[]} opened
 */
export function allOpen(n, opened) {
  const digits = placesOf(n);
  return PLACES.every((p) => digits[p.key] === 0 || opened.includes(p.key));
}

/**
 * The line that closes a number.
 * @param {number} n
 */
export function doneText(n) {
  return `Xong rồi! ${n} gồm ${sumParts(n).length} phần: ${n} = ${sumParts(n).join(' + ')}.`;
}

/**
 * The live line after a tap. A zero digit is explained even once the sum is
 * finished, because the child is invited to try it.
 * @param {number} n
 * @param {readonly PlaceKey[]} opened
 * @param {PlaceKey | null} last The digit tapped last.
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function tapNote(n, opened, last) {
  if (allOpen(n, opened)) {
    const done = doneText(n);
    const zero = last && placesOf(n)[last] === 0 ? `${digitText(n, last)} ` : '';
    return { tone: 'ok', text: `${zero}${done}` };
  }
  if (last) return { tone: 'info', text: digitText(n, last) };
  return { tone: 'info', text: 'Em chạm vào từng chữ số nhé.' };
}
