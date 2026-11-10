/**
 * Swapping the terms of a four-term sum so that each pair in brackets,
 * (first + second) + (third + fourth), makes a round number: tròn chục,
 * tròn trăm or tròn nghìn. Swapping never changes the total (the
 * commutative property) and the brackets only change the order of work (the
 * associative property). Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * The sums to rearrange, in the order they are first shown. No starting
 * order already pairs two round sums.
 */
export const PUZZLES = /** @type {const} */ ([
  [98, 46, 2, 54],
  [56, 17, 44, 83],
  [37, 125, 63, 75],
  [480, 299, 20, 1],
  [1975, 368, 2025, 632],
]);

/**
 * How round a number is, in the book's words, or an empty string.
 * @param {number} n
 */
export function roundWord(n) {
  if (n === 0) return '';
  if (n % 1000 === 0) return 'tròn nghìn';
  if (n % 100 === 0) return 'tròn trăm';
  if (n % 10 === 0) return 'tròn chục';
  return '';
}

/**
 * The terms with places `i` and `j` swapped.
 * @param {readonly number[]} terms
 * @param {number} i
 * @param {number} j
 */
export function swap(terms, i, j) {
  const next = [...terms];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/**
 * The two bracketed pairs and their sums.
 * @param {readonly number[]} terms four terms
 */
export function pairsOf(terms) {
  return [0, 2].map((i) => {
    const sum = terms[i] + terms[i + 1];
    return { a: terms[i], b: terms[i + 1], sum, word: roundWord(sum) };
  });
}

/**
 * Whether both bracketed pairs make a round number.
 * @param {readonly number[]} terms
 */
export const solved = (terms) => pairsOf(terms).every((p) => p.word !== '');

/**
 * The sum written with its brackets: "(98 + 2) + (46 + 54)".
 * @param {readonly number[]} terms
 */
export const bracketText = (terms) =>
  pairsOf(terms)
    .map((p) => `(${fmt(p.a)} + ${fmt(p.b)})`)
    .join(' + ');

/**
 * The live feedback line.
 * @param {readonly number[]} terms
 */
export function feedback(terms) {
  const [first, second] = pairsOf(terms);
  const total = fmt(first.sum + second.sum);
  if (solved(terms)) {
    return `Tuyệt! ${bracketText(terms)} = ${fmt(first.sum)} + ${fmt(second.sum)} = ${total}. Em tính nhẩm thật nhanh.`;
  }
  const round = [first, second].find((p) => p.word !== '');
  if (round) {
    return `${fmt(round.a)} + ${fmt(round.b)} = ${fmt(round.sum)}, số ${round.word}. Còn cặp kia chưa tròn. Tổng vẫn là ${total}.`;
  }
  return `Hai cặp chưa tròn: ${fmt(first.sum)} và ${fmt(second.sum)}. Em đổi chỗ các số hạng. Tổng vẫn là ${total}.`;
}
