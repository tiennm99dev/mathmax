/**
 * Division tables for the chapter: the book's sentences and the quiz rounds
 * of the table lessons. A division table is read off the multiplication table
 * of the same number: 2 × 4 = 8 gives 8 : 2 = 4.
 */
import { countLabel } from '#lib/core/kid/quiz.js';
import { pick, rng, shuffle } from '#lib/core/drill.js';

/**
 * "8 : 2 = 4"
 * @param {number} dividend
 * @param {number} divisor
 */
export const divLine = (dividend, divisor) => `${dividend} : ${divisor} = ${dividend / divisor}`;

/**
 * Four options around the quotient `n`, the mistakes being a neighbouring row
 * and the difference a child gets by subtracting instead of dividing.
 * @param {number} base
 * @param {number} n
 */
export function divisionOptions(base, n) {
  const wrong = [n + 1, n - 1, base * n - base, n + 2, n + 3];
  const picked = [...new Set(wrong)].filter((v) => v > 0 && v !== n).slice(0, 3);
  const values = [n, ...picked].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(n) };
}

/**
 * What a screen reader says for a picture of `groups` groups of `each`. Loose,
 * the pictures are named one by one, so the number of groups stays unsaid
 * while a question is open.
 * @param {string} noun
 * @param {number} each
 * @param {number} groups
 * @param {boolean} grouped
 */
export function groupsLabel(noun, each, groups, grouped) {
  if (!grouped) return countLabel(noun, each * groups);
  return `${groups} nhóm, mỗi nhóm ${each} ${noun}`;
}

/** What each part of a division table round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  table: 'Bảng chia',
  parts: 'Tìm thương',
  story: 'Bài toán',
});

/**
 * A word problem whose answer is `total : base`, written for `n` as the answer.
 * @typedef {(n: number) => { prompt: string, unit: string }} Story
 */

/**
 * A round of seven questions on one division table, each on a different row.
 * `visual.n` is the quotient, which a widget may draw once a question ends.
 * @param {number} base
 * @param {readonly Story[]} stories
 * @param {number} seed
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<{ n: number }>[]}
 */
export function buildDivisionRound(base, stories, seed) {
  const rand = rng(seed);
  const rows = shuffle(rand, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const kinds = ['table', 'parts', 'story', 'table', 'parts', 'story', 'table'];
  return kinds.map((kind, i) => {
    const n = rows[i];
    const total = base * n;
    const common = { kind, ...divisionOptions(base, n), visual: { n } };
    if (kind === 'parts') {
      return {
        ...common,
        prompt: `Số bị chia là ${total}, số chia là ${base}. Thương là số mấy?`,
        hint: `Em tính ${total} : ${base}. Nhớ lại bảng nhân ${base}.`,
        solution: `${divLine(total, base)}, vì ${n} × ${base} = ${total}.`,
      };
    }
    if (kind === 'story') {
      const { prompt, unit } = pick(rand, stories)(n);
      return {
        ...common,
        prompt,
        hint: `Em viết phép chia ${total} : ${base}.`,
        solution: `${divLine(total, base)} (${unit}).`,
      };
    }
    return {
      ...common,
      prompt: `${total} : ${base} = ?`,
      hint: `${base} nhân với số nào thì bằng ${total}?`,
      solution: `${base} × ${n} = ${total}, nên ${divLine(total, base)}.`,
    };
  });
}
