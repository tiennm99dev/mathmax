/**
 * The mixed practice round of the last "Luyện tập chung" of the chapter
 * "Phép cộng, phép trừ (có nhớ) trong phạm vi 100": carrying calculations in
 * columns, three numbers worked from left to right (25 + 65 − 30), comparing
 * a difference (the missing digit of 60 − 9 > 5□, the subtraction whose result
 * lies between two numbers) and word problems. Questions are built from a
 * seed, so the first round is the same on the server and in the browser. Pure
 * and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { carryText, equationText, exprText, makeCarry, sumOptions } from '../_shared/carry.js';

/**
 * A carrying calculation set out in columns.
 * @typedef {{ a: number, b: number, op: import('../_shared/carry.js').Op }} Visual
 */

/** @typedef {'cong' | 'tru-mot' | 'tru-hai' | 'ba-so' | 'so-sanh' | 'bai-toan'} Kind */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual> & { kind: Kind }} Question */

/** Question kinds in the order of the lessons, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'cong',
  'tru-mot',
  'tru-hai',
  'ba-so',
  'so-sanh',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  cong: 'Cộng có nhớ',
  'tru-mot': 'Trừ có nhớ cho số có một chữ số',
  'tru-hai': 'Trừ có nhớ cho số có hai chữ số',
  'ba-so': 'Tính từ trái sang phải',
  'so-sanh': 'So sánh kết quả phép trừ',
  'bai-toan': 'Bài toán có lời văn',
});

/**
 * Answer options for a carrying difference: two numbers near it, the slip of
 * forgetting the carry in the tens column (62 − 37 written 35) and the
 * difference, in increasing order.
 * @param {() => number} rand
 * @param {number} right the difference
 */
export function differenceOptions(rand, right) {
  const near = numberOptions(rand, right, right - 3, right + 3)
    .options.map(Number)
    .filter((v) => v !== right)
    .slice(0, 2);
  const values = [...near, right + 10, right].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * A carrying subtraction with a given result, whose ones digit is not 0: a
 * result ending in 0 never needs carrying.
 * @param {() => number} rand
 * @param {number} result from 11 to 89
 */
function subtractionWithResult(rand, result) {
  const ub = int(rand, 10 - (result % 10), 9);
  const b = int(rand, 0, 8 - Math.floor(result / 10)) * 10 + ub;
  return { a: result + b, b };
}

/**
 * A carrying addition in columns, with a one- or a two-digit second number.
 * @param {() => number} rand
 */
function additionQuestion(rand) {
  const { a, b } = makeCarry(rand, rand() < 0.5 ? 'add-one' : 'add-two');
  const [ua, ub] = [a % 10, b % 10];
  return {
    prompt: `Đặt tính rồi tính: ${exprText(a, b, '+')} = ?`,
    visual: /** @type {Visual} */ ({ a, b, op: '+' }),
    ...sumOptions(rand, a + b),
    hint: `Hàng đơn vị: ${ua} + ${ub} được 10 hoặc hơn. Đừng quên nhớ 1 sang hàng chục.`,
    solution: carryText(a, b, '+'),
  };
}

/**
 * A carrying subtraction in columns.
 * @param {() => number} rand
 * @param {'sub-one' | 'sub-two'} kind
 */
function subtractionQuestion(rand, kind) {
  const { a, b } = makeCarry(rand, kind);
  const [ua, ub] = [a % 10, b % 10];
  return {
    prompt: `Đặt tính rồi tính: ${exprText(a, b, '-')} = ?`,
    visual: /** @type {Visual} */ ({ a, b, op: '-' }),
    ...differenceOptions(rand, a - b),
    hint: `Hàng đơn vị: ${ua} không trừ được ${ub}. Em lấy ${10 + ua} trừ ${ub}, rồi nhớ 1 nhé.`,
    solution: carryText(a, b, '-'),
  };
}

/**
 * Three numbers worked from left to right: an addition then a subtraction
 * (25 + 65 − 30), or two subtractions (90 − 40 − 26).
 * @param {() => number} rand
 */
function threeQuestion(rand) {
  const adds = rand() < 0.5;
  const oneDigit = rand() < 0.5;
  /** @type {import('../_shared/carry.js').Op} */
  const op = adds ? '+' : '-';
  const { a, b } = makeCarry(
    rand,
    adds ? (oneDigit ? 'add-one' : 'add-two') : oneDigit ? 'sub-one' : 'sub-two',
  );
  const first = adds ? a + b : a - b;
  // A carrying addition never ends in 9, so the second step can carry too.
  const c = adds
    ? int(rand, 0, Math.floor(first / 10) - 2) * 10 + int(rand, (first % 10) + 1, 9)
    : int(rand, 2, 9);
  const right = first - c;
  const text = `${exprText(a, b, op)} − ${c}`;
  return {
    prompt: `${text} = ?`,
    ...numberOptions(rand, right, 0, 99),
    hint: `Em tính từ trái sang phải: ${exprText(a, b, op)} trước.`,
    solution: `${equationText(a, b, op)}. ${first} − ${c} = ${right}. Vậy ${text} = ${right}.`,
  };
}

/**
 * The missing digit of a comparison, as in 60 − 9 > 5□ and 42 − 4 < 3□: only
 * one digit fits, because the difference ends in 1 or in 8.
 * @param {() => number} rand
 */
function digitQuestion(rand) {
  const tens = int(rand, 1, 8);
  const greater = rand() < 0.5;
  const right = tens * 10 + (greater ? 1 : 8);
  const digit = greater ? 0 : 9;
  const { a, b } = subtractionWithResult(rand, right);
  const sign = greater ? '>' : '<';
  const digits = greater ? [0, 1, 2, 3] : [6, 7, 8, 9];
  return {
    prompt: `Chọn chữ số thích hợp cho ô trống: ${exprText(a, b, '-')} ${sign} ${tens}□`,
    options: digits.map(String),
    answer: digits.indexOf(digit),
    hint: `Em tính ${exprText(a, b, '-')} trước, rồi so sánh với số có hàng chục là ${tens}.`,
    solution: `${equationText(a, b, '-')}. ${right} ${sign} ${tens}${digit}, nên chữ số cần chọn là ${digit}.`,
  };
}

/**
 * Which subtraction has a result between two numbers, as with Rô-bốt's
 * notebook labels: more than Nam's, fewer than Mai's.
 * @param {() => number} rand
 */
function betweenQuestion(rand) {
  const lo = int(rand, 11, 75);
  const hi = lo + 5;
  const carries = (/** @type {number} */ n) => n >= 11 && n % 10 !== 0;
  const inside = pick(rand, [1, 2, 3, 4].map((d) => lo + d).filter(carries));
  const below = pick(rand, [0, 1, 2, 3].map((d) => lo - d).filter(carries));
  const above = pick(rand, [0, 1, 2, 3].map((d) => hi + d).filter(carries));
  const text = (/** @type {number} */ result) => {
    const { a, b } = subtractionWithResult(rand, result);
    return exprText(a, b, '-');
  };
  const [right, low, high] = [text(inside), text(below), text(above)];
  return {
    prompt: `Phép trừ nào có kết quả lớn hơn ${lo} và bé hơn ${hi}?`,
    ...mixOptions(rand, right, [low, high]),
    hint: `Em tính kết quả từng phép trừ, rồi tìm số lớn hơn ${lo} và bé hơn ${hi}.`,
    solution: `${low} = ${below}. ${high} = ${above}. ${right} = ${inside}. Số ${inside} lớn hơn ${lo} và bé hơn ${hi}, nên chọn ${right}.`,
  };
}

/**
 * Word problems; `a` and `b` fill the story, and `lead` opens the worked
 * sentence ("Số bậc sóc còn phải leo là: ...").
 * @type {ReadonlyArray<{
 *   story: (a: number, b: number) => string;
 *   kind: import('../_shared/carry.js').Kind;
 *   lead: string;
 *   unit: string;
 *   name: string;
 * }>}
 */
const STORIES = [
  {
    story: (a, b) =>
      `Cầu thang có ${a} bậc. Sóc đã leo được ${b} bậc. Sóc còn phải leo bao nhiêu bậc nữa?`,
    kind: 'sub-one',
    lead: 'Số bậc sóc còn phải leo là',
    unit: 'bậc',
    name: 'bậc',
  },
  {
    story: (a, b) => `Rổ có ${a} quả cam. Mẹ biếu bà ${b} quả. Trong rổ còn lại bao nhiêu quả cam?`,
    kind: 'sub-two',
    lead: 'Số quả cam còn lại là',
    unit: 'quả',
    name: 'quả cam',
  },
  {
    story: (a, b) =>
      `Sợi dây dài ${a} cm. Bố cắt đi ${b} cm. Sợi dây còn lại dài bao nhiêu xăng-ti-mét?`,
    kind: 'sub-two',
    lead: 'Sợi dây còn lại dài là',
    unit: 'cm',
    name: 'cm',
  },
  {
    story: (a, b) =>
      `Thư viện có ${a} quyển truyện. Các bạn mượn ${b} quyển. Thư viện còn lại bao nhiêu quyển truyện?`,
    kind: 'sub-two',
    lead: 'Số quyển truyện còn lại là',
    unit: 'quyển',
    name: 'quyển truyện',
  },
  {
    story: (a, b) =>
      `Cây tre thứ nhất có ${a} đốt. Cây tre thứ hai có ${b} đốt. Hai cây có tất cả bao nhiêu đốt tre?`,
    kind: 'add-two',
    lead: 'Số đốt tre có tất cả là',
    unit: 'đốt',
    name: 'đốt tre',
  },
  {
    story: (a, b) =>
      `Buổi sáng cửa hàng bán ${a} kg gạo. Buổi chiều bán ${b} kg gạo. Cả ngày cửa hàng bán tất cả bao nhiêu ki-lô-gam gạo?`,
    kind: 'add-two',
    lead: 'Số gạo bán được có tất cả là',
    unit: 'kg',
    name: 'kg',
  },
];

/**
 * A word problem solved by one carrying calculation.
 * @param {() => number} rand
 */
function storyQuestion(rand) {
  const s = pick(rand, STORIES);
  const { a, b, op } = makeCarry(rand, s.kind);
  const right = op === '+' ? a + b : a - b;
  return {
    prompt: s.story(a, b),
    ...(op === '+' ? sumOptions(rand, right) : differenceOptions(rand, right)),
    hint:
      op === '+'
        ? `Muốn tìm tất cả, em làm phép cộng: ${exprText(a, b, op)}.`
        : `Muốn tìm phần còn lại, em làm phép trừ: ${exprText(a, b, op)}.`,
    solution: `${s.lead}: ${equationText(a, b, op)} (${s.unit}). Đáp số: ${right} ${s.name}.`,
  };
}

/** @type {Record<Kind, (rand: () => number) => import('#lib/core/kid/quiz.js').KidQuestion<Visual>>} */
const MAKERS = {
  cong: additionQuestion,
  'tru-mot': (rand) => subtractionQuestion(rand, 'sub-one'),
  'tru-hai': (rand) => subtractionQuestion(rand, 'sub-two'),
  'ba-so': threeQuestion,
  'so-sanh': (rand) => (rand() < 0.5 ? digitQuestion(rand) : betweenQuestion(rand)),
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
