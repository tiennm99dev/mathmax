/**
 * The banknotes a grade 2 child meets in "Giới thiệu tiền Việt Nam": their
 * values, how they are written and read, and adding them up. Pure and
 * DOM-free.
 */
import { breakdown } from '#lib/units-engine/money.js';

/** The notes of the lesson, smallest first. */
export const NOTES = /** @type {const} */ ([100, 200, 500, 1000]);

/** @typedef {(typeof NOTES)[number]} Note */

/** How each note is read aloud. */
export const NOTE_WORDS = /** @type {const} */ ({
  100: 'một trăm đồng',
  200: 'hai trăm đồng',
  500: 'năm trăm đồng',
  1000: 'một nghìn đồng',
});

/**
 * The money of some notes added up.
 * @param {readonly number[]} notes
 */
export function sumNotes(notes) {
  return notes.reduce((s, n) => s + n, 0);
}

/**
 * The fewest of the lesson's notes that make `amount` exactly, largest
 * first, or null when no notes can (not a whole number of hundreds).
 * @param {number} amount
 * @returns {number[] | null}
 */
export function fewestNotes(amount) {
  const { notes, rest } = breakdown(amount, [...NOTES].reverse());
  if (rest > 0) return null;
  return notes.flatMap(({ value, count }) => Array.from({ length: count }, () => value));
}

/**
 * Notes said in a sentence, largest first: "1 tờ 500 đồng và 2 tờ 100 đồng".
 * @param {readonly number[]} notes
 */
export function notesText(notes) {
  return [...new Set(notes)]
    .sort((a, b) => b - a)
    .map((v) => `${notes.filter((n) => n === v).length} tờ ${v} đồng`)
    .join(' và ');
}
