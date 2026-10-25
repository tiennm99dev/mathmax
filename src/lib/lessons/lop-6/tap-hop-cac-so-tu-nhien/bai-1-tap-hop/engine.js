/**
 * Pure helpers for the set-builder widget: write a set of natural numbers by
 * listing its elements, and find a characteristic property that describes it
 * exactly in ℕ when the elements follow a simple pattern.
 */

/**
 * Sorted copy without duplicates.
 * @param {Iterable<number>} elements
 */
export function sortedUnique(elements) {
  return [...new Set(elements)].sort((x, y) => x - y);
}

/**
 * The listing form, with elements separated by semicolons as in the textbook:
 * `A = {0; 2; 4}`.
 * @param {string} name
 * @param {Iterable<number>} elements
 */
export function listForm(name, elements) {
  const list = sortedUnique(elements);
  return `${name} = {${list.join('; ')}}`;
}

/**
 * The bound part of a property: `x < hi + 1` when nothing smaller than `lo`
 * shares the pattern, otherwise `lo ≤ x ≤ hi`.
 * @param {number} lo
 * @param {number} hi
 * @param {boolean} startsAtFirst
 */
function bounds(lo, hi, startsAtFirst) {
  return startsAtFirst ? `x < ${hi + 1}` : `${lo} ≤ x ≤ ${hi}`;
}

/**
 * The property form `A = {x ∈ ℕ | ...}` when the elements are consecutive
 * numbers, or evenly spaced numbers sharing a parity or a remainder.
 * Returns null when no such simple property describes the set exactly.
 * @param {string} name
 * @param {Iterable<number>} elements
 * @returns {string | null}
 */
export function propertyForm(name, elements) {
  const s = sortedUnique(elements);
  if (s.length < 2) return null;
  const d = s[1] - s[0];
  for (let i = 2; i < s.length; i++) if (s[i] - s[i - 1] !== d) return null;
  const lo = s[0];
  const hi = s[s.length - 1];
  /** @type {string} */
  let rule;
  if (d === 1) {
    rule = bounds(lo, hi, lo === 0);
  } else {
    if (s.length < 3) return null;
    const r = lo % d;
    const first = lo < d;
    if (d === 2) {
      rule = `x là số ${r === 0 ? 'chẵn' : 'lẻ'}, ${bounds(lo, hi, first)}`;
    } else if (r === 0) {
      rule = `x chia hết cho ${d}, ${bounds(lo, hi, first)}`;
    } else {
      rule = `x chia cho ${d} dư ${r}, ${bounds(lo, hi, first)}`;
    }
  }
  return `${name} = {x ∈ ℕ | ${rule}}`;
}

/**
 * `5 ∈ A` or `5 ∉ A`.
 * @param {number} n
 * @param {string} name
 * @param {Iterable<number>} elements
 */
export function membership(n, name, elements) {
  return `${n} ${new Set(elements).has(n) ? '∈' : '∉'} ${name}`;
}

/** Targets the learner can try to build in the ring. */
export const CHALLENGES = [
  { text: 'A = {x ∈ ℕ | x < 6}', target: [0, 1, 2, 3, 4, 5] },
  { text: 'A = {x ∈ ℕ | 4 ≤ x ≤ 9}', target: [4, 5, 6, 7, 8, 9] },
  { text: 'A là tập hợp các số lẻ nhỏ hơn 12', target: [1, 3, 5, 7, 9, 11] },
  { text: 'A = {x ∈ ℕ | x chia hết cho 5, x < 16}', target: [0, 5, 10, 15] },
];

/**
 * Whether two collections hold the same elements.
 * @param {Iterable<number>} a
 * @param {Iterable<number>} b
 */
export function sameSet(a, b) {
  const x = sortedUnique(a);
  const y = sortedUnique(b);
  return x.length === y.length && x.every((v, i) => v === y[i]);
}
