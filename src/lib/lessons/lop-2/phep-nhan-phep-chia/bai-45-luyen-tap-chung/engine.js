/**
 * The mixed practice round of "Luyện tập chung" for the chapter on
 * multiplication and division: mental multiplication and division by 2 and 5,
 * the names of the parts, two divisions from one multiplication, products as
 * sums, two-step sums, comparing with signs and word problems. Questions are
 * built from a seed, so the first round is the same on the server and in the
 * browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { compareSign, SIGN_WORDS } from '#lib/core/kid/numbers.js';
import { bigOptions, drawFresh, mixOptions, questionKey, signOptions } from '#lib/core/kid/quiz.js';
import { divLine, divisionOptions } from '../_shared/divide.js';
import { mulLine, repeatedSum, tableOptions } from '../_shared/times.js';

/** @typedef {{ each: number, groups: number, loose?: boolean }} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Asked */
/** @typedef {'nhan' | 'chia' | 'ten' | 'lap' | 'tong' | 'hai-buoc' | 'dau' | 'bai-toan'} Kind */
/** @typedef {Asked & { kind: Kind }} Question */

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  nhan: 'Bảng nhân 2 và 5',
  chia: 'Bảng chia 2 và 5',
  ten: 'Tên các số',
  lap: 'Từ phép nhân đến phép chia',
  tong: 'Viết tích thành tổng',
  'hai-buoc': 'Tính hai bước',
  dau: 'So sánh',
  'bai-toan': 'Giải bài toán',
});

/** @param {() => number} rand */
const table = (rand) => pick(rand, [2, 5]);

/**
 * Mental multiplication from the tables of 2 and 5.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function mulQuestion(rand) {
  const base = table(rand);
  const n = int(rand, 1, 10);
  return {
    prompt: `${base} × ${n} = ?`,
    visual: { each: base, groups: n },
    ...tableOptions(base, n),
    hint: `Em đếm thêm ${base}, đếm ${n} lần.`,
    solution: `${mulLine(base, n)}.`,
  };
}

/**
 * Mental division from the tables of 2 and 5.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function divQuestion(rand) {
  const base = table(rand);
  const n = int(rand, 1, 10);
  const total = base * n;
  return {
    prompt: `${total} : ${base} = ?`,
    visual: { each: base, groups: n, loose: true },
    ...divisionOptions(rand, n),
    hint: `${base} nhân với số nào thì bằng ${total}?`,
    solution: `${base} × ${n} = ${total}, nên ${divLine(total, base)}.`,
  };
}

/**
 * Pointing at a named part of a division or at the product of a multiplication.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function nameQuestion(rand) {
  const base = table(rand);
  const n = pick(
    rand,
    [3, 4, 6, 7, 8, 9].filter((v) => v !== base),
  );
  const total = base * n;
  const numbers = [base, n, total].sort((x, y) => x - y).map(String);
  const division = divLine(total, base);
  const asks = [
    {
      name: 'số bị chia',
      where: `phép chia ${division}`,
      right: total,
      hint: 'Số bị chia là số đem chia, đứng đầu phép chia.',
    },
    {
      name: 'số chia',
      where: `phép chia ${division}`,
      right: base,
      hint: 'Số chia đứng ngay sau dấu chia.',
    },
    {
      name: 'thương',
      where: `phép chia ${division}`,
      right: n,
      hint: 'Thương là kết quả, đứng sau dấu bằng.',
    },
    {
      name: 'tích',
      where: `phép nhân ${mulLine(base, n)}`,
      right: total,
      hint: 'Tích là kết quả của phép nhân, đứng sau dấu bằng.',
    },
  ];
  const { name, where, right, hint } = pick(rand, asks);
  return {
    prompt: `Trong ${where}, ${name} là số nào?`,
    options: numbers,
    answer: numbers.indexOf(String(right)),
    hint,
    solution: `Trong ${where}, ${name} là ${right}.`,
  };
}

/**
 * One of the two divisions a multiplication gives.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function buildQuestion(rand) {
  const base = table(rand);
  const n = int(rand, 1, 10);
  const total = base * n;
  const divisor = pick(rand, [base, n]);
  const quotient = total / divisor;
  return {
    prompt: `Từ phép nhân ${mulLine(base, n)}, em lập được phép chia nào?`,
    ...mixOptions(rand, divLine(total, divisor), [
      `${total} : ${divisor} = ${quotient + 1}`,
      `${total} : ${quotient} = ${divisor + 1}`,
      `${n} : ${base} = ${total}`,
    ]),
    hint: `Tích ${total} là số bị chia, đứng đầu phép chia.`,
    solution:
      base === n
        ? `${mulLine(base, n)} cho ${divLine(total, base)}.`
        : `${mulLine(base, n)} cho ${divLine(total, base)} và ${divLine(total, n)}.`,
  };
}

/**
 * A product outside the tables, worked out as a sum of equal numbers.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function sumQuestion(rand) {
  const a = pick(rand, [3, 4, 6, 7, 8]);
  const times = int(rand, 2, 5);
  const right = a * times;
  return {
    prompt: `Em viết thành tổng rồi tính: ${a} × ${times} = ?`,
    visual: { each: a, groups: times },
    ...bigOptions(rand, right, 1, 60),
    hint: `${a} được lấy ${times} lần. Em cộng ${times} số ${a}.`,
    solution: `${a} × ${times} = ${repeatedSum(a, times)} = ${right}.`,
  };
}

/**
 * Two steps from the book: a table row, then an addition or a subtraction.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function twoStepQuestion(rand) {
  const base = table(rand);
  if (rand() < 0.5) {
    const n = int(rand, base === 2 ? 5 : 2, base === 2 ? 10 : 8);
    const first = base * n;
    const take = int(rand, 2, 9);
    const right = first - take;
    return {
      prompt: `Em tính ${base} × ${n}, rồi trừ đi ${take}. Em được số mấy?`,
      ...bigOptions(rand, right, 0, 99),
      hint: `Em tính ${base} × ${n} trước, rồi lấy kết quả trừ đi ${take}.`,
      solution: `${mulLine(base, n)}. ${first} − ${take} = ${right}.`,
    };
  }
  const n = int(rand, 2, 10);
  const add = int(rand, 2, 9);
  const right = n + add;
  return {
    prompt: `Em tính ${base * n} : ${base}, rồi cộng thêm ${add}. Em được số mấy?`,
    ...bigOptions(rand, right, 0, 99),
    hint: `Em tính ${base * n} : ${base} trước, rồi lấy kết quả cộng thêm ${add}.`,
    solution: `${divLine(base * n, base)}. ${n} + ${add} = ${right}.`,
  };
}

/**
 * Comparing a product with a quotient, about one time in three equal.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function signQuestion(rand) {
  const a = table(rand);
  const n = int(rand, 1, 5);
  const left = a * n;
  const right = left <= 10 && rand() < 0.35 ? left : int(rand, 1, 10);
  const b = table(rand);
  const sign = compareSign(left, right);
  return {
    prompt: `Em chọn dấu thích hợp: ${a} × ${n} ? ${b * right} : ${b}`,
    ...signOptions(sign),
    hint: 'Em tính kết quả của hai bên, rồi so sánh hai số.',
    solution: `${a} × ${n} = ${left}, ${b * right} : ${b} = ${right}. ${left} ${SIGN_WORDS[sign]} ${right}, nên ${a} × ${n} ${sign} ${b * right} : ${b}.`,
  };
}

/**
 * A word problem of the book: taking a number many times, sharing out or
 * making groups.
 * @param {() => number} rand
 * @returns {Asked}
 */
export function wordProblem(rand) {
  const n = int(rand, 2, 10);
  const stories = [
    {
      prompt: `Mỗi ô ăn quan có 5 viên sỏi. ${n} ô có bao nhiêu viên sỏi?`,
      mul: 5,
      unit: 'viên sỏi',
    },
    { prompt: `Mỗi lọ cắm 5 bông hoa. ${n} lọ có bao nhiêu bông hoa?`, mul: 5, unit: 'bông hoa' },
    { prompt: `Mỗi đôi dép có 2 chiếc. ${n} đôi dép có bao nhiêu chiếc?`, mul: 2, unit: 'chiếc' },
    {
      prompt: `Bà có ${2 * n} quả vải, chia đều cho 2 cháu. Mỗi cháu được mấy quả?`,
      div: 2,
      unit: 'quả',
      shared: true,
    },
    {
      prompt: `Có ${5 * n} bạn chia đều thành 5 nhóm. Mỗi nhóm có mấy bạn?`,
      div: 5,
      unit: 'bạn',
      shared: true,
    },
    {
      prompt: `Có ${2 * n} chiếc đũa, mỗi người một đôi. Đủ cho mấy người?`,
      div: 2,
      unit: 'người',
    },
  ];
  const story = pick(rand, stories);
  if (story.mul) {
    return {
      prompt: story.prompt,
      visual: { each: story.mul, groups: n },
      ...tableOptions(story.mul, n),
      hint: `Số ${story.mul} được lấy ${n} lần. Em viết phép nhân.`,
      solution: `${mulLine(story.mul, n)} (${story.unit}).`,
    };
  }
  const base = story.div ?? 2;
  const total = base * n;
  return {
    prompt: story.prompt,
    visual: story.shared
      ? { each: n, groups: base, loose: true }
      : { each: base, groups: n, loose: true },
    ...divisionOptions(rand, n),
    hint: `Em viết phép chia ${total} : ${base}.`,
    solution: `${divLine(total, base)} (${story.unit}).`,
  };
}

/** @type {Record<Kind, (rand: () => number) => Asked>} */
const MAKERS = {
  nhan: mulQuestion,
  chia: divQuestion,
  ten: nameQuestion,
  lap: buildQuestion,
  tong: sumQuestion,
  'hai-buoc': twoStepQuestion,
  dau: signQuestion,
  'bai-toan': wordProblem,
};

/** Question kinds in the order of the lessons. */
export const KINDS = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));

/** How many questions of each kind a round asks. */
const COUNTS = /** @type {Record<Kind, number>} */ ({
  nhan: 2,
  chia: 2,
  ten: 1,
  lap: 2,
  tong: 1,
  'hai-buoc': 2,
  dau: 1,
  'bai-toan': 3,
});

/**
 * A round of fourteen different questions in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = KINDS.flatMap((k) => Array.from({ length: COUNTS[k] }, () => k));
  /** @type {Set<string>} */
  const asked = new Set();
  return shuffle(rand, kinds).map((kind) => {
    const skill = { id: kind, label: KIND_LABELS[kind], make: MAKERS[kind] };
    const q = { ...drawFresh(skill, asked, rand), kind };
    asked.add(questionKey(q));
    return q;
  });
}
