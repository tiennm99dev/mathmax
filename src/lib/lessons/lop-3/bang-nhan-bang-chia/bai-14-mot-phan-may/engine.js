/**
 * The lesson's pizza, cut into equal slices with one coloured, and oranges dealt
 * out evenly onto plates, where one plate is 1/n of them. Also its quiz round.
 * Pure and DOM-free.
 */
import { rng, shuffle } from '#lib/core/drill.js';
import { MAX_PARTS, MIN_PARTS, partText, partWords } from '../_shared/parts.js';
import {
  equalParts,
  pickPart,
  readPart,
  readWritten,
  rightOrWrong,
  shareOf,
} from '../_shared/part-questions.js';
import { divLine } from '../_shared/times.js';

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  doc: 'Đọc phần tô màu',
  ten: 'Đọc một phần mấy',
  hinh: 'Tìm hình đã tô màu',
  'bang-nhau': 'Các phần bằng nhau',
  'dung-sai': 'Đúng hay sai',
  'so-luong': 'Một phần mấy của số đồ vật',
});

/** The numbers of slices a pizza can be cut into. */
export const SLICE_COUNTS = Array.from(
  { length: MAX_PARTS - MIN_PARTS + 1 },
  (_, i) => MIN_PARTS + i,
);

/**
 * What the pizza says.
 * @param {number} n slices
 * @param {number} coloured slices coloured
 */
export function pizzaMessage(n, coloured) {
  if (coloured === 0) {
    return `Bánh được chia thành ${n} phần bằng nhau. Em chạm vào 1 phần để tô màu.`;
  }
  if (coloured === 1) {
    return `Đúng rồi! Bánh được chia thành ${n} phần bằng nhau, em tô màu 1 phần. Đã tô màu ${partText(n)} cái bánh, đọc là ${partWords(n)}.`;
  }
  return `Em đang tô màu ${coloured} phần. Một phần mấy chỉ tô màu 1 phần thôi. Chạm lại để bỏ bớt.`;
}

/** The sets to deal out, with the numbers of plates that share them evenly. */
export const SHARES = /** @type {const} */ ([
  { total: 12, plates: [2, 3, 4, 6], picture: 'orange', noun: 'quả cam', unit: 'quả' },
  { total: 18, plates: [2, 3, 6, 9], picture: 'apple', noun: 'quả táo', unit: 'quả' },
  { total: 8, plates: [2, 4], picture: 'fish', noun: 'con cá', unit: 'con' },
]);

/**
 * How many things are left after `rounds` rounds of one to each plate.
 * @param {number} total
 * @param {number} plates
 * @param {number} rounds
 */
export const leftOver = (total, plates, rounds) => total - plates * rounds;

/**
 * What the plates say.
 * @param {(typeof SHARES)[number]} share
 * @param {number} plates
 * @param {number} rounds rounds dealt so far
 * @param {boolean} picked whether a plate has been taken
 */
export function shareMessage(share, plates, rounds, picked) {
  const { total, noun, unit } = share;
  const left = leftOver(total, plates, rounds);
  if (rounds === 0) {
    return `Có ${total} ${noun}. Em chia đều vào ${plates} đĩa: mỗi lượt, mỗi đĩa được 1 ${unit}.`;
  }
  if (left > 0) return `Mỗi đĩa có ${rounds} ${unit}. Còn ${left} ${unit} chưa chia.`;
  if (!picked)
    return `Chia hết rồi! Mỗi đĩa có ${rounds} ${unit}. Em chạm vào 1 đĩa để lấy 1 phần.`;
  return `1 đĩa là ${partText(plates)} số ${noun}. ${divLine(plates, rounds)}. Vậy ${partText(plates)} số ${noun} là ${rounds} ${unit}.`;
}

/** The questions of a round, from reading a part to finding it in a set. */
const ROUND = /** @type {const} */ ([
  ['doc', readPart],
  ['ten', readWritten],
  ['hinh', pickPart],
  ['bang-nhau', equalParts],
  ['dung-sai', rightOrWrong],
  ['so-luong', shareOf],
  ['doc', readPart],
  ['so-luong', shareOf],
]);

/**
 * A round of eight questions, each on a different number of parts.
 * @param {number} seed
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<import('../_shared/part-questions.js').PartVisual>[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const counts = shuffle(rand, SLICE_COUNTS);
  return ROUND.map(([kind, make], i) => ({ kind, ...make(rand, counts[i]) }));
}
