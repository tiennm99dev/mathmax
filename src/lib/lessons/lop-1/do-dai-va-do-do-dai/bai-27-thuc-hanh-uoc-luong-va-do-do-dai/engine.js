/**
 * The guess-then-measure game of "Thực hành ước lượng và đo độ dài": five
 * things of different lengths; for each the child guesses a length in cm,
 * then slides the ruler to its 0 mark to measure, and earns stars for a
 * close guess. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { LONGEST, THINGS } from '../_shared/length.js';

/** Things per game. */
export const ROUNDS = 5;
/** Smallest and largest guess the child can set, in cm. */
export const GUESS_MIN = 1;
export const GUESS_MAX = 15;

/**
 * @typedef {{
 *   thing: import('../_shared/length.js').Thing;
 *   length: number;
 *   shift: number;
 * }} Item
 */

/**
 * Five things from a seed, each a different thing with a different length
 * from 3 to 11 cm, and the ruler starting 1 or 2 cm off.
 * @param {number} seed
 * @returns {Item[]}
 */
export function makeGame(seed) {
  const rand = rng(seed * 6007 + 27);
  const things = shuffle(rand, THINGS).slice(0, ROUNDS);
  const lengths = shuffle(
    rand,
    Array.from({ length: LONGEST - 2 }, (_, i) => i + 3),
  ).slice(0, ROUNDS);
  return things.map((thing, i) => ({
    thing,
    length: lengths[i],
    shift: pick(rand, [-2, -1, 1, 2]),
  }));
}

/**
 * A first guess to show: the middle of the range, moved a little so it is
 * not a hint.
 * @param {number} seed
 */
export function startGuess(seed) {
  return int(rng(seed * 31 + 7), 5, 10);
}

/**
 * The closing line of a game.
 * @param {number[]} stars stars per thing
 */
export function gameSummary(stars) {
  const total = stars.reduce((a, b) => a + b, 0);
  const max = stars.length * 3;
  const exact = stars.filter((s) => s === 3).length;
  const head = `Em được ${total} / ${max} sao. Em đoán trúng ${exact} vật.`;
  if (total >= max - 3) return `${head} Mắt em ước lượng rất giỏi!`;
  if (total >= max / 2) return `${head} Em ước lượng khá tốt. Chơi thêm để giỏi hơn nhé!`;
  return `${head} Em nhìn ô 1 cm, thử đếm xem đồ vật dài bằng mấy ô như thế nhé.`;
}
