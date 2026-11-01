/**
 * The mixed practice round of "Luyện tập chung" after the subtraction
 * lessons of the chapter "Phép cộng, phép trừ trong phạm vi 20":
 * subtractions across ten (shown on two ten-frames), splitting the number
 * taken away to reach 10, subtracting with the addition table, the missing
 * number of a subtraction, comparing differences, and word problems about
 * "more than" and "fewer than". Questions are built from a seed, so the first
 * round is the same on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { compareSign, SIGN_WORDS } from '#lib/core/kid/numbers.js';
import { numberOptions, signOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { SUB_FACTS, downToTen, downToTenSteps } from '../_shared/facts.js';
import {
  compareHint,
  comparePrompt,
  compareResult,
  compareSolution,
  newCompareStory,
} from '../_shared/compare-stories.js';

/** Two ten-frames holding `c` dots, `b` of them to cross out. */
/** @typedef {{ type: 'frames', c: number, b: number }} Visual */

/** @typedef {'tru' | 'tach' | 'bang-tru' | 'so-thieu' | 'so-sanh' | 'bai-toan'} Kind */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual> & { kind: Kind }} Question */

/** Question kinds in the order of the lessons, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'tru',
  'tach',
  'bang-tru',
  'so-thieu',
  'so-sanh',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  tru: 'Trừ qua 10',
  tach: 'Tách số để trừ về 10',
  'bang-tru': 'Bảng trừ và bảng cộng',
  'so-thieu': 'Tìm số còn thiếu',
  'so-sanh': 'So sánh',
  'bai-toan': 'Bài toán nhiều hơn, ít hơn',
});

/** @param {() => number} rand */
const fact = (rand) => pick(rand, SUB_FACTS);

/**
 * A subtraction across ten, with its two ten-frames.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function subQuestion(rand) {
  const { c, b } = fact(rand);
  return {
    prompt: `${c} ${MINUS} ${b} = ?`,
    visual: { type: 'frames', c, b },
    ...numberOptions(rand, c - b, 2, 9),
    hint: `${c} bớt ${c - 10} thì còn 10. Em tách ${b} rồi trừ tiếp.`,
    solution: `${downToTenSteps(c, b).join(' ')} Vậy ${c} ${MINUS} ${b} = ${c - b}.`,
  };
}

/**
 * Splitting the number taken away: what is still to take from 10.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function splitQuestion(rand) {
  const { c, b } = fact(rand);
  const { first, rest } = downToTen(c, b);
  return {
    prompt: `${c} ${MINUS} ${b} = ${c} ${MINUS} ${first} ${MINUS} ?`,
    ...numberOptions(rand, rest, 1, 8),
    hint: `${c} ${MINUS} ${first} = 10. ${b} gồm ${first} và mấy?`,
    solution: `${b} = ${first} + ${rest}. ${c} ${MINUS} ${first} = 10, 10 ${MINUS} ${rest} = ${c - b}.`,
  };
}

/**
 * A subtraction found from an addition of the table: 8 + 5 = 13, so 13 − 8.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function tableQuestion(rand) {
  const { c, b } = fact(rand);
  const d = c - b;
  return {
    prompt: `Biết ${b} + ${d} = ${c}. Vậy ${c} ${MINUS} ${b} = ?`,
    ...numberOptions(rand, d, 2, 9),
    hint: `Từ một phép cộng, em viết được hai phép trừ. ${b} cộng mấy thì bằng ${c}?`,
    solution: `${b} + ${d} = ${c}, nên ${c} ${MINUS} ${b} = ${d} và ${c} ${MINUS} ${d} = ${b}.`,
  };
}

/**
 * The missing number of a subtraction across ten: `c − ? = d`.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function missingQuestion(rand) {
  const { c, b } = fact(rand);
  const d = c - b;
  return {
    prompt: `${c} ${MINUS} ? = ${d}`,
    ...numberOptions(rand, b, 2, 9),
    hint: `Em nghĩ: ${d} cộng mấy thì bằng ${c}?`,
    solution: `${d} + ${b} = ${c}, nên ${c} ${MINUS} ${b} = ${d}. Số cần điền là ${b}.`,
  };
}

/**
 * A sign between a difference and a number, or between two differences.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function compareQuestion(rand) {
  const { c, b } = fact(rand);
  const d = c - b;
  if (rand() < 0.5) {
    const n = Math.min(10, Math.max(1, d + int(rand, -2, 2)));
    const sign = compareSign(d, n);
    return {
      prompt: `Chọn dấu đúng: ${c} ${MINUS} ${b} ... ${n}`,
      ...signOptions(sign),
      hint: `Em tính ${c} ${MINUS} ${b} trước, rồi so sánh với ${n}.`,
      solution: `${c} ${MINUS} ${b} = ${d}. ${d} ${SIGN_WORDS[sign]} ${n}, nên ${c} ${MINUS} ${b} ${sign} ${n}.`,
    };
  }
  let other = fact(rand);
  for (let i = 0; i < 20 && Math.abs(other.c - other.b - d) > 1; i++) other = fact(rand);
  const e = other.c - other.b;
  const sign = compareSign(d, e);
  return {
    prompt: `Chọn dấu đúng: ${c} ${MINUS} ${b} ... ${other.c} ${MINUS} ${other.b}`,
    ...signOptions(sign),
    hint: 'Em tính kết quả hai phép trừ trước, rồi so sánh.',
    solution: `${c} ${MINUS} ${b} = ${d}, ${other.c} ${MINUS} ${other.b} = ${e}. ${d} ${SIGN_WORDS[sign]} ${e}, nên ${c} ${MINUS} ${b} ${sign} ${other.c} ${MINUS} ${other.b}.`,
  };
}

/**
 * A word problem about more than or fewer than.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function storyQuestion(rand) {
  const s = newCompareStory(rand, undefined, rand() < 0.5 ? 'nhieu' : 'it');
  const [lead, calc, total] = compareSolution(s);
  return {
    prompt: comparePrompt(s),
    ...numberOptions(rand, compareResult(s), 0, 20),
    hint: compareHint(s),
    solution: `${lead} ${calc}. ${total}`,
  };
}

/** @type {Record<Kind, (rand: () => number) => import('#lib/core/kid/quiz.js').KidQuestion<Visual>>} */
const MAKERS = {
  tru: subQuestion,
  tach: splitQuestion,
  'bang-tru': tableQuestion,
  'so-thieu': missingQuestion,
  'so-sanh': compareQuestion,
  'bai-toan': storyQuestion,
};

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  return { ...MAKERS[kind](rand), kind };
}

/**
 * A round of two questions per kind in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  return shuffle(rand, [...KINDS, ...KINDS]).map((k) => makeQuestion(k, rand));
}
