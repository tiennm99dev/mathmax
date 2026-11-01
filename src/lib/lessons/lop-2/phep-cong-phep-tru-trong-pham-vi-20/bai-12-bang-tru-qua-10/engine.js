/**
 * "Bảng trừ (qua 10)" as a table the child opens one fact at a time: pick
 * `c − b`, find the difference by thinking of the addition table
 * ("b cộng mấy bằng c?"), and the fact opens together with its partner
 * `c − d`, since both come from the same addition `b + d = c`. Pure and
 * DOM-free.
 */
import { numberOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { SUB_FACTS } from '../_shared/facts.js';

/** @typedef {{ c: number, b: number }} SubFact */

/** The numbers subtracted from, one column of the table each. */
export const MINUENDS = [11, 12, 13, 14, 15, 16, 17, 18];

/**
 * The table in the book's columns: "11 trừ đi một số" to "18 trừ đi một số".
 * @type {ReadonlyArray<{ c: number, facts: SubFact[] }>}
 */
export const COLUMNS = MINUENDS.map((c) => ({ c, facts: SUB_FACTS.filter((f) => f.c === c) }));

/**
 * The key of a fact in the set of opened facts.
 * @param {SubFact} f
 */
export const keyOf = ({ c, b }) => `${c}-${b}`;

/**
 * The other subtraction of the same addition: `c − (c − b)`.
 * @param {SubFact} f
 * @returns {SubFact}
 */
export function partner({ c, b }) {
  return { c, b: c - b };
}

/**
 * The addition the fact comes from, the way the addition table writes it
 * (larger number first): 12 − 3 comes from 9 + 3 = 12.
 * @param {SubFact} f
 */
export function additionOf({ c, b }) {
  const d = c - b;
  return `${Math.max(b, d)} + ${Math.min(b, d)} = ${c}`;
}

/**
 * The four facts of one family (two when both numbers are equal):
 * 3 + 9 = 12, 9 + 3 = 12, 12 − 3 = 9, 12 − 9 = 3.
 * @param {SubFact} f
 * @returns {string[]}
 */
export function family({ c, b }) {
  const d = c - b;
  if (b === d) return [`${b} + ${d} = ${c}`, `${c} ${MINUS} ${b} = ${d}`];
  return [
    `${b} + ${d} = ${c}`,
    `${d} + ${b} = ${c}`,
    `${c} ${MINUS} ${b} = ${d}`,
    `${c} ${MINUS} ${d} = ${b}`,
  ];
}

/**
 * The question of a fact: its options (differences from 2 to 9), the hint
 * and the reason once found.
 * @param {SubFact} f
 * @param {() => number} rand
 */
export function question(f, rand) {
  const d = f.c - f.b;
  const other = partner(f);
  const both = other.b === f.b ? '' : ` Em cũng biết luôn ${f.c} ${MINUS} ${d} = ${f.b}.`;
  return {
    ...numberOptions(rand, d, 2, 9),
    hint: `Em nhớ bảng cộng: ${f.b} cộng mấy thì bằng ${f.c}?`,
    reason: `Vì ${f.b} + ${d} = ${f.c} nên ${f.c} ${MINUS} ${f.b} = ${d}.${both}`,
  };
}

/**
 * The opened set after a fact is found: the fact and its partner.
 * @param {ReadonlySet<string>} open
 * @param {SubFact} f
 */
export function openFact(open, f) {
  return new Set([...open, keyOf(f), keyOf(partner(f))]);
}

/**
 * The next fact still closed, in table order after `from` (wrapping round),
 * or null when the whole table is open.
 * @param {ReadonlySet<string>} open
 * @param {SubFact} [from]
 * @returns {SubFact | null}
 */
export function nextClosed(open, from) {
  const start = from ? SUB_FACTS.findIndex((f) => keyOf(f) === keyOf(from)) + 1 : 0;
  for (let i = 0; i < SUB_FACTS.length; i++) {
    const f = SUB_FACTS[(start + i) % SUB_FACTS.length];
    if (!open.has(keyOf(f))) return f;
  }
  return null;
}
