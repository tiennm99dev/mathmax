/**
 * The mixed practice round of "Luyện tập chung" after the two addition
 * lessons of the chapter "Phép cộng, phép trừ (có nhớ) trong phạm vi 100":
 * carrying additions of a two-digit number with a one-digit and with a
 * two-digit number (set out in columns), spotting which addition carries,
 * adding three numbers from left to right, comparing a sum with a number, and
 * word problems. Questions are built from a seed, so the first round is the
 * same on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { compareSign, SIGN_WORDS } from '#lib/core/kid/numbers.js';
import { mixOptions, numberOptions, signOptions } from '#lib/core/kid/quiz.js';
import { carryText, makeCarry } from '../_shared/carry.js';

/** A carrying addition set out in columns. */
/** @typedef {{ a: number, b: number, op: '+' }} Visual */

/** @typedef {'cong-mot' | 'cong-hai' | 'co-nho' | 'ba-so' | 'so-sanh' | 'bai-toan'} Kind */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual> & { kind: Kind }} Question */

/** Question kinds in the order of the lessons, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'cong-mot',
  'cong-hai',
  'co-nho',
  'ba-so',
  'so-sanh',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'cong-mot': 'Cộng có nhớ với số có một chữ số',
  'cong-hai': 'Cộng có nhớ với số có hai chữ số',
  'co-nho': 'Nhận ra phép cộng có nhớ',
  'ba-so': 'Cộng ba số',
  'so-sanh': 'So sánh',
  'bai-toan': 'Bài toán có lời văn',
});

/**
 * Two numbers near the sum and the sum without the carry (35 + 7 written
 * 32), with the sum, in increasing order.
 * @param {() => number} rand
 * @param {number} right
 */
function sumOptions(rand, right) {
  const near = numberOptions(rand, right, right - 3, Math.min(99, right + 3))
    .options.map(Number)
    .filter((v) => v !== right)
    .slice(0, 2);
  const values = [...near, right - 10, right].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * A carrying addition in columns, `one` for a one-digit second number.
 * @param {() => number} rand
 * @param {boolean} one
 */
function columnQuestion(rand, one) {
  const { a, b } = makeCarry(rand, one ? 'add-one' : 'add-two');
  const [ua, ub] = [a % 10, b % 10];
  return {
    prompt: `Đặt tính rồi tính: ${a} + ${b} = ?`,
    visual: /** @type {Visual} */ ({ a, b, op: '+' }),
    ...sumOptions(rand, a + b),
    hint: `Hàng đơn vị: ${ua} + ${ub} = ${ua + ub}. Đừng quên nhớ 1 sang hàng chục.`,
    solution: carryText(a, b, '+'),
  };
}

/**
 * A two-digit addition that never carries.
 * @param {() => number} rand
 * @param {boolean} one
 */
function noCarry(rand, one) {
  const ua = int(rand, 0, 7);
  const ta = int(rand, 1, one ? 8 : 7);
  const ub = int(rand, 1, 9 - ua);
  return { a: ta * 10 + ua, b: one ? ub : int(rand, 1, 8 - ta) * 10 + ub };
}

/**
 * Which of three additions carries.
 * @param {() => number} rand
 */
function carryQuestion(rand) {
  const one = rand() < 0.5;
  const right = makeCarry(rand, one ? 'add-one' : 'add-two');
  const text = (/** @type {{ a: number, b: number }} */ p) => `${p.a} + ${p.b}`;
  const wrong = new Set();
  while (wrong.size < 2) wrong.add(text(noCarry(rand, one)));
  const opts = mixOptions(rand, text(right), [...wrong]);
  return {
    prompt: 'Phép cộng nào có nhớ?',
    ...opts,
    hint: 'Em cộng hai chữ số ở hàng đơn vị. Được 10 hoặc hơn thì có nhớ.',
    solution: `${right.a % 10} + ${right.b % 10} = ${(right.a % 10) + (right.b % 10)}: được hơn 10 nên có nhớ. ${right.a} + ${right.b} = ${right.a + right.b}.`,
  };
}

/**
 * Three numbers added from left to right: 26 + 4 + 9.
 * @param {() => number} rand
 */
function threeQuestion(rand) {
  const a = int(rand, 1, 7) * 10 + int(rand, 1, 9);
  const b = int(rand, 1, 9);
  const c = int(rand, 2, 9);
  const s = a + b;
  return {
    prompt: `${a} + ${b} + ${c} = ?`,
    ...numberOptions(rand, s + c, s + c - 3, Math.min(99, s + c + 3)),
    hint: `Em tính từ trái sang phải: ${a} + ${b} trước.`,
    solution: `${a} + ${b} = ${s}. ${s} + ${c} = ${s + c}. Vậy ${a} + ${b} + ${c} = ${s + c}.`,
  };
}

/**
 * A sign between a carrying sum and a number near it.
 * @param {() => number} rand
 */
function compareQuestion(rand) {
  const { a, b } = makeCarry(rand, rand() < 0.5 ? 'add-one' : 'add-two');
  const s = a + b;
  const n =
    s +
    pick(
      rand,
      [-10, -1, 0, 1, 10].filter((d) => s + d >= 10 && s + d <= 99),
    );
  const sign = compareSign(s, n);
  return {
    prompt: `Chọn dấu đúng: ${a} + ${b} ... ${n}`,
    ...signOptions(sign),
    hint: `Em tính ${a} + ${b} trước. Nhớ 1 sang hàng chục nhé.`,
    solution: `${a} + ${b} = ${s}. ${s} ${SIGN_WORDS[sign]} ${n}, nên ${a} + ${b} ${sign} ${n}.`,
  };
}

/**
 * Word problems that add two groups; `a` and `b` fill the story, and `one`
 * marks a story where the second number may have one digit.
 * @type {ReadonlyArray<{ story: (a: number, b: number) => string, unit: string, name: string, one?: boolean }>}
 */
const STORIES = [
  {
    story: (a, b) => `Lớp 2A có ${a} bạn. Lớp 2B có ${b} bạn. Cả hai lớp có bao nhiêu bạn?`,
    unit: 'bạn',
    name: 'bạn',
  },
  {
    story: (a, b) =>
      `Mẹ hái được ${a} quả cam. Bố hái được ${b} quả cam. Cả hai người hái được bao nhiêu quả cam?`,
    unit: 'quả',
    name: 'quả cam',
  },
  {
    story: (a, b) =>
      `Thư viện có ${a} quyển truyện. Cô mua thêm ${b} quyển. Thư viện có tất cả bao nhiêu quyển truyện?`,
    unit: 'quyển',
    name: 'quyển truyện',
    one: true,
  },
  {
    story: (a, b) =>
      `Đàn gà có ${a} con gà trống và ${b} con gà mái. Đàn gà có tất cả bao nhiêu con?`,
    unit: 'con',
    name: 'con gà',
  },
  {
    story: (a, b) => `Vườn có ${a} cây chuối và ${b} cây bưởi. Vườn có tất cả bao nhiêu cây?`,
    unit: 'cây',
    name: 'cây',
    one: true,
  },
];

/**
 * A word problem solved by a carrying addition.
 * @param {() => number} rand
 */
function storyQuestion(rand) {
  const s = pick(rand, STORIES);
  const { a, b } = makeCarry(rand, s.one && rand() < 0.5 ? 'add-one' : 'add-two');
  return {
    prompt: s.story(a, b),
    ...sumOptions(rand, a + b),
    hint: `Muốn tìm tất cả, em làm phép cộng: ${a} + ${b}.`,
    solution: `Số ${s.name} có tất cả là: ${a} + ${b} = ${a + b} (${s.unit}). Đáp số: ${a + b} ${s.name}.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => import('#lib/core/kid/quiz.js').KidQuestion<Visual>>} */
const MAKERS = {
  'cong-mot': (rand) => columnQuestion(rand, true),
  'cong-hai': (rand) => columnQuestion(rand, false),
  'co-nho': carryQuestion,
  'ba-so': threeQuestion,
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
