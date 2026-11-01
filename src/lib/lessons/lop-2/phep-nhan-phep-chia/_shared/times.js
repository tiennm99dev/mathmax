/**
 * Multiplication tables for the chapter: the book's sentences and the quiz
 * rounds of the table lessons. In this grade `a × b` means "a taken b times",
 * so the repeated number always comes first.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';

/**
 * "2 × 3 = 6"
 * @param {number} a
 * @param {number} b
 */
export const mulLine = (a, b) => `${a} × ${b} = ${a * b}`;

/**
 * "2 + 2 + 2"
 * @param {number} a
 * @param {number} times
 */
export const repeatedSum = (a, times) => Array.from({ length: times }, () => a).join(' + ');

/**
 * What the skip-counting widgets say after `step` jumps of `base`.
 * @param {number} base
 * @param {number} step 0-10
 * @param {string} start what to do before the first jump
 */
export function jumpMessage(base, step, start) {
  if (step === 0) return start;
  const list = Array.from({ length: step }, (_, i) => base * (i + 1)).join(', ');
  if (step === 10) return `Xong bảng nhân ${base}! Đếm thêm ${base}: ${list}.`;
  return `${step} lần ${base}: ${mulLine(base, step)}. Đếm thêm ${base}: ${list}.`;
}

/**
 * Four options around `base × n`: the next and previous rows of the table,
 * and the sum a child gets by adding instead of multiplying.
 * @param {number} base
 * @param {number} n
 */
export function tableOptions(base, n) {
  const right = base * n;
  const wrong = [base * (n + 1), base * (n - 1), base + n, base * (n + 2), right + 1];
  const picked = [...new Set(wrong)].filter((v) => v > 0 && v !== right).slice(0, 3);
  const values = [right, ...picked].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/** What each part of a table round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  table: 'Bảng nhân',
  skip: 'Đếm thêm',
  story: 'Bài toán',
});

/**
 * A word problem whose answer is `base × n`.
 * @typedef {(n: number) => { prompt: string, unit: string }} Story
 */

/**
 * A round of seven questions on one table, each on a different row.
 * `visual.n` is the number of jumps a widget may draw once a question ends.
 * @param {number} base
 * @param {readonly Story[]} stories
 * @param {number} seed
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<{ n: number }>[]}
 */
export function buildRound(base, stories, seed) {
  const rand = rng(seed);
  const rows = shuffle(rand, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const kinds = ['table', 'skip', 'story', 'table', 'skip', 'story', 'table'];
  return kinds.map((kind, i) => {
    const n = rows[i];
    const right = base * n;
    const common = { kind, ...tableOptions(base, n), visual: { n } };
    if (kind === 'skip') {
      const shown = [right - 3 * base, right - 2 * base, right - base].filter((v) => v > 0);
      return {
        ...common,
        prompt: `Đếm thêm ${base}: ${shown.join(', ')}, … Số tiếp theo là số nào?`,
        hint: `Em lấy số cuối cùng cộng thêm ${base}.`,
        solution: `${right - base} + ${base} = ${right}.`,
      };
    }
    if (kind === 'story') {
      const { prompt, unit } = pick(rand, stories)(n);
      return {
        ...common,
        prompt,
        hint: `${base} được lấy ${n} lần. Em viết phép nhân.`,
        solution: `${mulLine(base, n)} (${unit}).`,
      };
    }
    return {
      ...common,
      prompt: `${base} × ${n} = ?`,
      hint: `Em đếm thêm ${base}, đếm ${n} lần.`,
      solution: `${mulLine(base, n)}.`,
    };
  });
}
