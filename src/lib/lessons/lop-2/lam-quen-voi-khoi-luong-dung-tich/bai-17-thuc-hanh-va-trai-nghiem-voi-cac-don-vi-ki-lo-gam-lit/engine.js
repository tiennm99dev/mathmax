/**
 * The guess-then-check game of "Thực hành và trải nghiệm với các đơn vị
 * ki-lô-gam, lít": everyday things of a usual mass or capacity; for each the
 * child guesses a number of kilograms or litres, then checks it on the pan
 * balance (adding weights until it is level) or by pouring into 1 l mugs,
 * and earns stars for a close guess. Pure and DOM-free.
 */
import { int, rng, shuffle } from '#lib/core/drill.js';
import { capitalize } from '#lib/core/kid/quiz.js';
import { vessel } from '../_shared/capacity.js';
import { massThing } from '../_shared/mass.js';

/** Things per game, half weighed and half poured. */
export const ROUNDS = 6;
/** Smallest and largest guess the child can set. */
export const GUESS_MIN = 1;
export const GUESS_MAX = 10;

/**
 * @typedef {{ kind: 'mass', id: import('../_shared/mass.js').ThingId, amount: number }
 *   | { kind: 'capacity', id: import('../_shared/capacity.js').VesselId, amount: number }} Item
 */

/** Things weighed, with a usual mass in kilograms. */
/** @type {readonly Item[]} */
export const MASS_ITEMS = [
  { kind: 'mass', id: 'pomelo', amount: 1 },
  { kind: 'mass', id: 'bag', amount: 2 },
  { kind: 'mass', id: 'melon', amount: 3 },
  { kind: 'mass', id: 'pumpkin', amount: 4 },
  { kind: 'mass', id: 'box', amount: 8 },
  { kind: 'mass', id: 'sack', amount: 10 },
];

/** Containers poured out, with a usual capacity in litres. */
/** @type {readonly Item[]} */
export const CAPACITY_ITEMS = [
  { kind: 'capacity', id: 'bottle', amount: 1 },
  { kind: 'capacity', id: 'jar', amount: 3 },
  { kind: 'capacity', id: 'can', amount: 5 },
  { kind: 'capacity', id: 'bucket', amount: 10 },
];

/**
 * The name of an item's thing, inside a sentence.
 * @param {Item} item
 */
export function itemName(item) {
  return item.kind === 'mass' ? massThing(item.id).name : vessel(item.id).name;
}

/**
 * The unit of an item: "kg" or "l".
 * @param {Item} item
 */
export function unitOf(item) {
  return item.kind === 'mass' ? 'kg' : 'l';
}

/**
 * A game from a seed: three things to weigh and three to pour, taking turns.
 * @param {number} seed
 * @returns {Item[]}
 */
export function makeGame(seed) {
  const rand = rng(seed * 7919 + 17);
  const mass = shuffle(rand, MASS_ITEMS).slice(0, ROUNDS / 2);
  const cap = shuffle(rand, CAPACITY_ITEMS).slice(0, ROUNDS / 2);
  return mass.flatMap((m, i) => [m, cap[i]]);
}

/**
 * A first guess to show, so the stepper does not start on the answer.
 * @param {number} seed
 */
export function startGuess(seed) {
  return int(rng(seed * 31 + 17), 4, 6);
}

/**
 * The question for the guess.
 * @param {Item} item
 */
export function guessPrompt(item) {
  const name = itemName(item);
  return item.kind === 'mass'
    ? `Em đoán ${name} cân nặng mấy ki-lô-gam? Bấm − hoặc + rồi bấm "Cân thử".`
    : `Em đoán ${name} chứa được mấy lít nước? Bấm − hoặc + rồi bấm "Đong thử".`;
}

/**
 * Stars for a guess: 3 when right, one fewer for each unit off, none from
 * 3 units off.
 * @param {number} guess
 * @param {number} actual
 */
export function guessStars(guess, actual) {
  return Math.max(0, 3 - Math.abs(guess - actual));
}

/**
 * Feedback once the thing is weighed or poured out.
 * @param {Item} item
 * @param {number} guess
 */
export function checkMessage(item, guess) {
  const name = itemName(item);
  const unit = unitOf(item);
  const head =
    item.kind === 'mass'
      ? `${capitalize(name)} cân nặng ${item.amount} kg. Em đoán ${guess} kg.`
      : `${capitalize(name)} chứa được ${item.amount} l nước. Em đoán ${guess} l.`;
  const d = Math.abs(guess - item.amount);
  if (d === 0) return `${head} Đoán đúng luôn! Em được 3 sao.`;
  const side =
    item.kind === 'mass'
      ? `${guess > item.amount ? 'nặng hơn' : 'nhẹ hơn'} số cân được`
      : `${guess > item.amount ? 'nhiều hơn' : 'ít hơn'} số đong được`;
  if (d <= 2) {
    return `${head} Em đoán ${side} ${d} ${unit}, rất gần rồi! Em được ${guessStars(guess, item.amount)} sao.`;
  }
  return `${head} Em đoán ${side} ${d} ${unit}. Lần sau em so sánh với ${
    item.kind === 'mass' ? 'quả bưởi nặng khoảng 1 kg' : 'chai nước 1 l'
  } nhé.`;
}

/**
 * The closing line of a game.
 * @param {number[]} stars stars per thing
 */
export function gameSummary(stars) {
  const total = stars.reduce((a, b) => a + b, 0);
  const max = stars.length * 3;
  const exact = stars.filter((s) => s === 3).length;
  const head = `Em được ${total} / ${max} sao. Em đoán trúng ${exact} đồ vật.`;
  if (total >= max - 3) return `${head} Em ước lượng rất giỏi!`;
  if (total >= max / 2) return `${head} Em ước lượng khá tốt. Chơi thêm để giỏi hơn nhé!`;
  return `${head} Khi đoán, em so sánh với quả bưởi nặng khoảng 1 kg và chai nước 1 l nhé.`;
}
