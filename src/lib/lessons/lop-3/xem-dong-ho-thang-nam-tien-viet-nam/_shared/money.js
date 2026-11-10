/**
 * The Vietnamese banknotes of grade 3, from 1 000 to 100 000 đồng: how they
 * are written and read, adding notes up, paying with the fewest notes, the
 * change a shop gives back and changing one note for smaller ones. Pure and
 * DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { breakdown } from '#lib/units-engine/money.js';

/** The notes of the lesson, smallest first. */
export const NOTES = /** @type {const} */ ([1000, 2000, 5000, 10000, 20000, 50000, 100000]);

/** @typedef {(typeof NOTES)[number]} Note */

/** How each note is read aloud. */
export const NOTE_WORDS = /** @type {const} */ ({
  1000: 'một nghìn đồng',
  2000: 'hai nghìn đồng',
  5000: 'năm nghìn đồng',
  10000: 'mười nghìn đồng',
  20000: 'hai mươi nghìn đồng',
  50000: 'năm mươi nghìn đồng',
  100000: 'một trăm nghìn đồng',
});

/**
 * Whether a number is one of the lesson's notes.
 * @param {number} value
 * @returns {value is Note}
 */
export function isNote(value) {
  return /** @type {readonly number[]} */ (NOTES).includes(value);
}

/**
 * An amount of money as the book writes it: '25 000 đồng'.
 * @param {number} amount
 */
export function moneyText(amount) {
  return `${fmt(amount)} đồng`;
}

/**
 * The money of some notes added up.
 * @param {readonly number[]} notes
 */
export function sumNotes(notes) {
  return notes.reduce((s, n) => s + n, 0);
}

/**
 * The fewest notes that make `amount` exactly, largest first, or null when
 * the notes cannot (not a whole number of thousands).
 * @param {number} amount
 * @returns {Note[] | null}
 */
export function fewestNotes(amount) {
  const { notes, rest } = breakdown(amount, [...NOTES].reverse());
  if (rest > 0) return null;
  return /** @type {Note[]} */ (
    notes.flatMap(({ value, count }) => Array.from({ length: count }, () => value))
  );
}

/**
 * Notes said in a sentence, largest first: '1 tờ 20 000 đồng và 2 tờ 5 000 đồng'.
 * @param {readonly number[]} notes
 */
export function notesText(notes) {
  return [...new Set(notes)]
    .sort((a, b) => b - a)
    .map((v) => `${notes.filter((n) => n === v).length} tờ ${moneyText(v)}`)
    .join(' và ');
}

/**
 * A note among `given` the buyer did not need: the price is still paid
 * without it. Null when every note is needed.
 * @param {readonly number[]} given
 * @param {number} price
 */
export function spareNote(given, price) {
  const total = sumNotes(given);
  const spare = [...given].sort((a, b) => b - a).find((n) => total - n >= price);
  return spare ?? null;
}
