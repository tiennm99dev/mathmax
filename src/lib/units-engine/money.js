/**
 * @typedef {Readonly<{ value: number, count: number }>} NoteCount
 * @typedef {Readonly<{ notes: NoteCount[], rest: number }>} Breakdown
 */

/**
 * Vietnamese đồng banknotes found in the primary books, largest first.
 * @type {readonly number[]}
 */
export const VND_DENOMINATIONS = [
  500_000, 200_000, 100_000, 50_000, 20_000, 10_000, 5000, 2000, 1000, 500, 200, 100,
];

/**
 * Pay `amount` with the fewest notes. The đồng series is canonical (each
 * note is 1, 2 or 5 times a power of ten), so taking the largest note that
 * fits is optimal. `rest` is what no note can cover (under 100 đồng).
 * @param {number} amount whole đồng, non-negative
 * @param {readonly number[]} [denominations] largest first
 * @returns {Breakdown}
 */
export function breakdown(amount, denominations = VND_DENOMINATIONS) {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error('breakdown needs a whole, non-negative amount');
  }
  let rest = amount;
  /** @type {NoteCount[]} */
  const notes = [];
  for (const value of [...denominations].sort((a, b) => b - a)) {
    const count = Math.floor(rest / value);
    if (count > 0) {
      notes.push({ value, count });
      rest -= count * value;
    }
  }
  return { notes, rest };
}

/** @param {readonly NoteCount[]} notes */
export function totalOf(notes) {
  return notes.reduce((s, n) => s + n.value * n.count, 0);
}
