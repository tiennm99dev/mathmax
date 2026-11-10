/**
 * The pretend shop: the goods and their prices, what the line says while the
 * child hands over notes, the change to choose, and the practice round of
 * reading notes, counting money, change and exchanging notes. Pure and
 * DOM-free.
 */
import { rng } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { moneyText, spareNote, sumNotes } from '../_shared/money.js';
import { labelsOf, roundOf } from '../_shared/questions.js';

/**
 * Something for sale.
 * @typedef {{ name: string, picture: import('#lib/core/kid/pictures/index.js').PictureName, price: number }} Good
 */

/** @type {readonly Good[]} */
export const GOODS = [
  { name: 'Bút chì', picture: 'pencil', price: 3000 },
  { name: 'Quả bóng bay', picture: 'balloon', price: 5000 },
  { name: 'Nải chuối', picture: 'banana', price: 15000 },
  { name: 'Túi cam', picture: 'orange', price: 22000 },
  { name: 'Túi táo', picture: 'apple', price: 28000 },
  { name: 'Chùm nho', picture: 'grapes', price: 36000 },
  { name: 'Quả bóng', picture: 'ball', price: 45000 },
  { name: 'Bó hoa', picture: 'flower', price: 64000 },
];

/** The most notes the child can hand over at once. */
export const MAX_NOTES = 10;

/**
 * The line under the notes while the child pays.
 * @param {readonly number[]} given
 * @param {number} price
 * @returns {{ enough: boolean, text: string }}
 */
export function payAdvice(given, price) {
  const paid = sumNotes(given);
  if (paid === 0) {
    return { enough: false, text: 'Em chạm vào các tờ tiền để đưa cho cô bán hàng.' };
  }
  if (paid < price) {
    return {
      enough: false,
      text: `Em đã đưa ${moneyText(paid)}. Còn thiếu ${moneyText(price - paid)}.`,
    };
  }
  const spare = spareNote(given, price);
  const extra = spare
    ? ` Bớt tờ ${moneyText(spare)} vẫn đủ, em có thể cất lại tờ đó.`
    : ' Em bấm Trả tiền nhé.';
  return { enough: true, text: `Em đã đưa ${moneyText(paid)}, đủ để trả.${extra}` };
}

/**
 * Three amounts of change to choose from, smallest first: the right one, the
 * price itself (a common mix-up) and a slip of 1 000 or 10 000 đồng.
 * @param {number} paid
 * @param {number} price
 * @returns {{ options: number[], answer: number }}
 */
export function changeChoices(paid, price) {
  const right = paid - price;
  const slips = [price, right + 1000, right - 1000, right + 10000].filter(
    (v) => v > 0 && v !== right,
  );
  const values = [right, ...new Set(slips)].slice(0, 3).sort((a, b) => a - b);
  return { options: values, answer: values.indexOf(right) };
}

/**
 * The sentence once the change is right.
 * @param {number} paid
 * @param {number} price
 */
export function changeWork(paid, price) {
  return `${fmt(paid)} − ${fmt(price)} = ${fmt(paid - price)}. Cô trả lại em ${moneyText(paid - price)}.`;
}

/** @type {import('../_shared/questions.js').Kind[]} */
const KINDS = ['note', 'note', 'sum', 'sum', 'change', 'change', 'exchange', 'shop'];

/** What each part of the round practises. */
export const KIND_LABELS = labelsOf(KINDS);

/**
 * The practice round of the lesson.
 * @param {number} seed
 */
export function buildRound(seed) {
  return roundOf(KINDS, rng(seed));
}
