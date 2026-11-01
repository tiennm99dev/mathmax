/**
 * The mixed practice round of "Luyện tập chung" after the addition lessons
 * of the chapter "Phép cộng, phép trừ trong phạm vi 20": additions across
 * ten (shown on two ten-frames), splitting a number to make ten, the
 * missing number of an addition, comparing sums, adding three numbers
 * where two make ten, and word problems about adding and taking away.
 * Subtractions stay within what the chapter has taught so far: none crosses
 * ten. Questions are built from a seed, so the first round is the same on
 * the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { compareSign, SIGN_WORDS } from '#lib/core/kid/numbers.js';
import { numberOptions, signOptions } from '#lib/core/kid/quiz.js';
import { ADD_TABLE, makeTen, makeTenSteps } from '../_shared/facts.js';
import { newStory, result, solutionLines, storyText } from '../_shared/stories.js';

/** Two ten-frames: `a` red dots in the first, `b` blue dots in the second. */
/** @typedef {{ type: 'frames', a: number, b: number }} Visual */

/** @typedef {'cong' | 'tach' | 'so-thieu' | 'so-sanh' | 'ba-so' | 'bai-toan'} Kind */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual> & { kind: Kind }} Question */

/** Question kinds in the order of the lessons, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'cong',
  'tach',
  'so-thieu',
  'so-sanh',
  'ba-so',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  cong: 'Cộng qua 10',
  tach: 'Tách số để làm tròn 10',
  'so-thieu': 'Tìm số còn thiếu',
  'so-sanh': 'So sánh',
  'ba-so': 'Cộng ba số',
  'bai-toan': 'Bài toán thêm, bớt',
});

/** @param {() => number} rand */
const fact = (rand) => pick(rand, ADD_TABLE);

/**
 * An addition across ten, with its two ten-frames.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function addQuestion(rand) {
  const { a, b } = fact(rand);
  const big = Math.max(a, b);
  return {
    prompt: `${a} + ${b} = ?`,
    visual: { type: 'frames', a, b },
    ...numberOptions(rand, a + b, 11, 18),
    hint:
      a >= b
        ? `${a} cần thêm ${10 - a} là đủ 10. Em tách ${b} rồi cộng tiếp.`
        : `Đổi chỗ: ${a} + ${b} = ${b} + ${a}. ${big} cần thêm ${10 - big} là đủ 10.`,
    solution: `${a >= b ? '' : `${a} + ${b} = ${b} + ${a}. `}${makeTenSteps(big, Math.min(a, b)).join(' ')} Vậy ${a} + ${b} = ${a + b}.`,
  };
}

/**
 * Splitting the second number to make ten: what is left after filling ten.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function splitQuestion(rand) {
  const facts = ADD_TABLE.filter((f) => f.a >= f.b);
  const { a, b } = pick(rand, facts);
  const { fill, rest } = makeTen(a, b);
  const asSum = rand() < 0.5;
  return {
    prompt: asSum
      ? `${a} + ${b} = ${a} + ${fill} + ?`
      : `Để tính ${a} + ${b}, em tách ${b} thành ${fill} và mấy?`,
    ...numberOptions(rand, rest, 1, 9),
    hint: `${a} + ${fill} = 10. ${b} gồm ${fill} và mấy?`,
    solution: `${b} = ${fill} + ${rest}. ${a} + ${fill} = 10, 10 + ${rest} = ${a + b}.`,
  };
}

/**
 * The missing number of an addition across ten: `a + ? = c`.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function missingQuestion(rand) {
  const { a, b } = fact(rand);
  const c = a + b;
  return {
    prompt: `${a} + ? = ${c}`,
    ...numberOptions(rand, b, 1, 9),
    hint: `${a} cần thêm ${10 - a} là đủ 10. Từ 10 đến ${c} còn thêm mấy nữa?`,
    solution: `${a} + ${10 - a} = 10, 10 + ${c - 10} = ${c}. ${10 - a} + ${c - 10} = ${b}, nên ${a} + ${b} = ${c}. Số cần điền là ${b}.`,
  };
}

/**
 * A sign between a sum and a number, or between two sums.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function compareQuestion(rand) {
  const { a, b } = fact(rand);
  const c = a + b;
  if (rand() < 0.5) {
    const n = Math.min(20, Math.max(10, c + int(rand, -2, 2)));
    const sign = compareSign(c, n);
    return {
      prompt: `Chọn dấu đúng: ${a} + ${b} ... ${n}`,
      ...signOptions(sign),
      hint: `Em tính ${a} + ${b} trước, rồi so sánh với ${n}.`,
      solution: `${a} + ${b} = ${c}. ${c} ${SIGN_WORDS[sign]} ${n}, nên ${a} + ${b} ${sign} ${n}.`,
    };
  }
  let other = fact(rand);
  for (let i = 0; i < 20 && Math.abs(other.a + other.b - c) > 2; i++) other = fact(rand);
  const d = other.a + other.b;
  const sign = compareSign(c, d);
  return {
    prompt: `Chọn dấu đúng: ${a} + ${b} ... ${other.a} + ${other.b}`,
    ...signOptions(sign),
    hint: 'Em tính kết quả hai phép cộng trước, rồi so sánh.',
    solution: `${a} + ${b} = ${c}, ${other.a} + ${other.b} = ${d}. ${c} ${SIGN_WORDS[sign]} ${d}, nên ${a} + ${b} ${sign} ${other.a} + ${other.b}.`,
  };
}

/**
 * Three numbers where the first two make ten: 7 + 3 + 6.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function threeQuestion(rand) {
  const a = int(rand, 1, 9);
  const b = 10 - a;
  const c = int(rand, 1, 9);
  return {
    prompt: `${a} + ${b} + ${c} = ?`,
    ...numberOptions(rand, 10 + c, 11, 19),
    hint: `Em cộng từ trái sang phải: ${a} + ${b} trước.`,
    solution: `${a} + ${b} = 10. 10 + ${c} = ${10 + c}. Vậy ${a} + ${b} + ${c} = ${10 + c}.`,
  };
}

/**
 * A word problem about adding or taking away.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function storyQuestion(rand) {
  const s = newStory(rand, undefined, rand() < 0.5 ? 'them' : 'bot');
  const t = storyText(s);
  return {
    prompt: `${t.start} ${t.change} ${t.question}`,
    ...numberOptions(rand, result(s), 0, 20),
    hint: s.kind === 'them' ? 'Thêm vào thì em làm phép cộng.' : 'Bớt đi thì em làm phép trừ.',
    solution: solutionLines(s).join(' '),
  };
}

/** @type {Record<Kind, (rand: () => number) => import('#lib/core/kid/quiz.js').KidQuestion<Visual>>} */
const MAKERS = {
  cong: addQuestion,
  tach: splitQuestion,
  'so-thieu': missingQuestion,
  'so-sanh': compareQuestion,
  'ba-so': threeQuestion,
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
