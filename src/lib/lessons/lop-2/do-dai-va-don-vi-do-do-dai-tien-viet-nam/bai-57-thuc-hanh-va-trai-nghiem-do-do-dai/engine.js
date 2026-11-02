/**
 * The game of "Thực hành và trải nghiệm đo độ dài": guess how long a familiar
 * thing is, in dm or m, then pull a tape measure out to its far end to check.
 * Stars reward a close guess. Pure and DOM-free.
 */
import { shuffle, rng } from '#lib/core/drill.js';
import { estimateStars } from '#lib/core/kid/length.js';
import { capitalize } from '#lib/core/kid/quiz.js';

/** @typedef {'dm' | 'm'} Unit */
/**
 * @typedef {{ name: string, dim: 'dài' | 'cao', amount: number, unit: Unit, color: string }} Item
 */

/** Things to measure in rounds of a game: three in dm and two in m. */
export const ROUNDS = 5;

/** The longest tape for each unit: its numbers and its width per unit, in SVG units. */
export const TAPES = /** @type {const} */ ({
  dm: { max: 12, step: 25 },
  m: { max: 5, step: 60 },
});

/** Read-aloud name of a unit. */
export const UNIT_WORDS = /** @type {const} */ ({ dm: 'đề-xi-mét', m: 'mét' });

/** @type {readonly Item[]} */
export const ITEMS_DM = [
  { name: 'hộp bút', dim: 'dài', amount: 2, unit: 'dm', color: '#60a5fa' },
  { name: 'thước kẻ', dim: 'dài', amount: 3, unit: 'dm', color: '#fbbf24' },
  { name: 'cái cặp sách', dim: 'dài', amount: 4, unit: 'dm', color: '#f87171' },
  { name: 'cái ghế học sinh', dim: 'cao', amount: 7, unit: 'dm', color: '#a78bfa' },
  { name: 'bàn học', dim: 'dài', amount: 10, unit: 'dm', color: '#34d399' },
];

/** @type {readonly Item[]} */
export const ITEMS_M = [
  { name: 'cửa lớp', dim: 'cao', amount: 2, unit: 'm', color: '#fb923c' },
  { name: 'cái giường', dim: 'dài', amount: 2, unit: 'm', color: '#f472b6' },
  { name: 'bảng lớp', dim: 'dài', amount: 3, unit: 'm', color: '#4ade80' },
  { name: 'bức tường phòng em', dim: 'dài', amount: 4, unit: 'm', color: '#818cf8' },
];

/**
 * The things of one game, dm first and the same for the same seed.
 * @param {number} seed
 * @returns {Item[]}
 */
export function makeGame(seed) {
  const rand = rng(seed);
  return [...shuffle(rand, ITEMS_DM).slice(0, 3), ...shuffle(rand, ITEMS_M).slice(0, 2)];
}

/**
 * Where the guess stepper starts, the middle of its range.
 * @param {Item} item
 */
export function startGuess(item) {
  return Math.ceil(TAPES[item.unit].max / 2);
}

/**
 * The question while guessing.
 * @param {Item} item
 */
export function guessPrompt(item) {
  return `${capitalize(item.name)} ${item.dim} khoảng mấy ${UNIT_WORDS[item.unit]}? Em so với đoạn mẫu 1 ${item.unit} rồi chọn số.`;
}

/**
 * Feedback while the tape is pulled out.
 * @param {Item} item
 * @param {number} pulled
 */
export function tapeFeedback(item, pulled) {
  const read = `Thước dây đang ở ${pulled} ${item.unit}.`;
  if (pulled < item.amount) return `${read} Chưa đến đầu kia của ${item.name}, em kéo thêm nhé.`;
  if (pulled > item.amount) return `${read} Dài quá ${item.name} rồi, em thu lại nhé.`;
  return `${read} Thước dây vừa bằng ${item.name}.`;
}

/**
 * The result once the tape reached the far end.
 * @param {Item} item
 * @param {number} guess
 */
export function resultMessage(item, guess) {
  const head = `Đo được: ${item.name} ${item.dim} ${item.amount} ${item.unit}. Em đoán ${guess} ${item.unit}.`;
  const d = Math.abs(guess - item.amount);
  if (d === 0) return `${head} Đoán đúng luôn! Em được 3 sao.`;
  const side = guess > item.amount ? 'nhiều hơn' : 'ít hơn';
  const stars = estimateStars(guess, item.amount);
  if (stars > 0)
    return `${head} Em đoán ${side} ${d} ${item.unit}, rất gần rồi! Em được ${stars} sao.`;
  return `${head} Em đoán ${side} ${d} ${item.unit}. Lần sau em so kĩ với đoạn mẫu nhé.`;
}

/**
 * The end of a game.
 * @param {readonly number[]} stars
 */
export function gameSummary(stars) {
  const total = stars.reduce((a, b) => a + b, 0);
  const of = ROUNDS * 3;
  if (total === of) return `Em được ${total} trên ${of} sao. Mắt em đo giỏi quá!`;
  return `Em được ${total} trên ${of} sao. Chơi lại để đoán gần hơn nhé!`;
}
