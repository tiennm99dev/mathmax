/**
 * The mixed practice round of "Luyện tập chung" closing the chapter "Ôn tập
 * và bổ sung": a missing number on the number ray, tens and ones of a
 * number, the number just before or after, comparing and ordering numbers,
 * addition and subtraction without carrying with the names of their parts,
 * and short word problems. The calculation and word-problem questions come
 * from the chapter's review skills. Questions are built from a seed, so the
 * first round is the same on the server and in the browser. Pure and
 * DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { compareSign, readNumber, tensOnes } from '#lib/core/kid/numbers.js';
import { signOptions } from '#lib/core/kid/quiz.js';
import {
  addSkill,
  columnSkill,
  compareSkill,
  moreLessSkill,
  nearOptions,
  partsSkill,
  storySkill,
  subtractSkill,
  tensSkill,
} from '../_shared/review-skills.js';

/**
 * What a question shows above its options: a stretch of the number ray with
 * one number hidden (`null`), or a calculation set out in columns.
 * @typedef {{ type: 'ray', numbers: Array<number | null> }
 *   | { type: 'column', a: number, b: number, op: '+' | '-' }} Visual
 */

/** @typedef {'tia-so' | 'cau-tao' | 'lien-ke' | 'so-sanh' | 'tinh' | 'bai-toan'} Kind */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual> & { kind: Kind }} Question */

/** Question kinds in the order of the chapter, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'tia-so',
  'cau-tao',
  'lien-ke',
  'so-sanh',
  'tinh',
  'bai-toan',
]);

/** What each kind practises, for the end card. */
export const KIND_LABELS = /** @type {const} */ ({
  'tia-so': 'Tia số',
  'cau-tao': 'Chục và đơn vị',
  'lien-ke': 'Số liền trước, số liền sau',
  'so-sanh': 'So sánh các số',
  tinh: 'Phép cộng, phép trừ',
  'bai-toan': 'Bài toán',
});

/**
 * A missing number among five neighbours on the ray, counted by ones or by
 * whole tens.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function rayQuestion(rand) {
  const byTens = rand() < 0.3;
  const step = byTens ? 10 : 1;
  const start = byTens ? 10 * int(rand, 0, 5) : int(rand, 0, 95);
  const gap = int(rand, 1, 3);
  const all = Array.from({ length: 5 }, (_, i) => start + i * step);
  const right = all[gap];
  const numbers = all.map((n, i) => (i === gap ? null : n));
  const shown = numbers.map((n) => (n === null ? '?' : String(n))).join(', ');
  return {
    prompt: `Số nào còn thiếu trên tia số: ${shown}?`,
    visual: { type: 'ray', numbers },
    ...nearOptions(rand, right, byTens ? [right + 1, right - 1] : [right + 10, right - 10]),
    hint: byTens
      ? 'Các số tròn chục trên tia số cách nhau 10. Em đếm thêm 10.'
      : 'Mỗi số trên tia số hơn số đứng trước nó 1. Em đếm thêm 1.',
    solution: byTens
      ? `Đếm thêm 10: ${all.join(', ')}. Số còn thiếu là ${right}.`
      : `Đếm thêm 1: ${all.join(', ')}. Số còn thiếu là ${right}.`,
  };
}

/**
 * Tens and ones of a two-digit number: build it from its tens and ones,
 * split it into whole tens plus ones (56 = 50 + 6), or find it from how it
 * is read aloud.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function placeQuestion(rand) {
  const tens = int(rand, 1, 9);
  const ones = int(rand, 1, 9);
  const n = 10 * tens + ones;
  const flipped = 10 * ones + tens;
  const roll = rand();
  if (roll < 0.35) {
    return {
      prompt: `Số gồm ${tens} chục và ${ones} đơn vị là số nào?`,
      ...nearOptions(rand, n, [flipped, tens + ones]),
      hint: 'Em viết số chục trước, rồi viết số đơn vị bên phải.',
      solution: `${tens} chục và ${ones} đơn vị là ${n}. ${n} = ${10 * tens} + ${ones}.`,
    };
  }
  if (roll < 0.7) {
    return {
      prompt: `${n} = ${10 * tens} + ?`,
      ...nearOptions(rand, ones, [tens, 10 * ones]),
      hint: `${n} gồm mấy chục và mấy đơn vị?`,
      solution: `${n} gồm ${tens} chục và ${ones} đơn vị, nên ${n} = ${10 * tens} + ${ones}.`,
    };
  }
  return {
    prompt: `Số "${readNumber(n)}" viết là số nào?`,
    ...nearOptions(rand, n, [flipped]),
    hint: `"${readNumber(10 * tens)}" là ${tens} chục. Em viết chữ số chục trước.`,
    solution: `"${readNumber(n)}" gồm ${tens} chục và ${ones} đơn vị, viết là ${n}.`,
  };
}

/**
 * Special numbers the book asks about, each with the number it names and
 * how to find it.
 */
const SPECIAL = [
  { name: 'số lớn nhất có hai chữ số', value: 99 },
  { name: 'số tròn chục lớn nhất có hai chữ số', value: 90 },
  { name: 'số bé nhất có hai chữ số', value: 10 },
  { name: 'số tròn chục bé nhất có hai chữ số', value: 10 },
];

/**
 * The number just before or just after a number, sometimes of a special
 * number such as the largest two-digit number.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function neighbourQuestion(rand) {
  const after = rand() < 0.5;
  if (rand() < 0.3) {
    const s = pick(rand, SPECIAL);
    // 99 has no number just after it within two digits.
    const before = !after || s.value === 99;
    const right = before ? s.value - 1 : s.value + 1;
    const word = before ? 'liền trước' : 'liền sau';
    return {
      prompt: `Số ${word} của ${s.name} là số nào?`,
      ...nearOptions(rand, right, [s.value, before ? s.value + 1 : s.value - 1]),
      hint: `Em tìm ${s.name} trước. Rồi ${before ? 'bớt đi 1' : 'thêm 1'}.`,
      solution: `${s.name.charAt(0).toUpperCase()}${s.name.slice(1)} là ${s.value}. Số ${word} của ${s.value} là ${right}.`,
    };
  }
  const n = after ? int(rand, 10, 98) : int(rand, 11, 99);
  const right = after ? n + 1 : n - 1;
  const word = after ? 'liền sau' : 'liền trước';
  return {
    prompt: `Số ${word} của ${n} là số nào?`,
    ...nearOptions(rand, right, [after ? n - 1 : n + 1, after ? n + 10 : n - 10]),
    hint: after
      ? 'Số liền sau hơn số đã cho 1. Trên tia số, nó ở bên phải.'
      : 'Số liền trước kém số đã cho 1. Trên tia số, nó ở bên trái.',
    solution: after
      ? `${n} + 1 = ${right}. Số liền sau của ${n} là ${right}.`
      : `${n} − 1 = ${right}. Số liền trước của ${n} là ${right}.`,
  };
}

/**
 * Four different two-digit numbers.
 * @param {() => number} rand
 */
function fourNumbers(rand) {
  /** @type {Set<number>} */
  const seen = new Set();
  while (seen.size < 4) seen.add(int(rand, 10, 99));
  return [...seen];
}

/**
 * Comparing numbers: the sign between two numbers, the smallest or largest
 * of four, or a calculation against a number.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function compareQuestion(rand) {
  const roll = rand();
  if (roll < 0.35) {
    const a = int(rand, 10, 99);
    const sameTens = rand() < 0.6;
    let b = sameTens ? 10 * Math.floor(a / 10) + int(rand, 0, 9) : int(rand, 10, 99);
    if (rand() < 0.15) b = a;
    const sign = compareSign(a, b);
    const x = tensOnes(a);
    const y = tensOnes(b);
    const why =
      a === b
        ? `${a} và ${b} là hai số giống nhau.`
        : x.tens === y.tens
          ? `Cùng ${x.tens} chục; ${x.ones} đơn vị ${sign === '>' ? 'nhiều hơn' : 'ít hơn'} ${y.ones} đơn vị.`
          : `${x.tens} chục ${sign === '>' ? 'nhiều hơn' : 'ít hơn'} ${y.tens} chục.`;
    return {
      prompt: `Chọn dấu đúng: ${a} ... ${b}`,
      ...signOptions(sign),
      hint: 'Em so sánh số chục trước. Nếu số chục bằng nhau, em so sánh số đơn vị.',
      solution: `${why} Vậy ${a} ${sign} ${b}.`,
    };
  }
  if (roll < 0.7) {
    const nums = fourNumbers(rand);
    const smallest = rand() < 0.5;
    const right = smallest ? Math.min(...nums) : Math.max(...nums);
    const sorted = [...nums].sort((p, q) => p - q);
    return {
      prompt: `Trong các số ${nums.join(', ')}, số nào ${smallest ? 'bé nhất' : 'lớn nhất'}?`,
      options: nums.map(String),
      answer: nums.indexOf(right),
      hint: 'Em so sánh số chục của các số trước.',
      solution: `Xếp từ bé đến lớn: ${sorted.join(', ')}. Số ${smallest ? 'bé nhất' : 'lớn nhất'} là ${right}.`,
    };
  }
  return compareSkill.make(rand);
}

/**
 * The sum of the largest and the smallest of four numbers, chosen so that
 * the sum needs no carrying.
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<Visual>}
 */
export function extremesQuestion(rand) {
  let nums = fourNumbers(rand);
  for (let i = 0; i < 200; i++) {
    const lo = Math.min(...nums);
    const hi = Math.max(...nums);
    if ((lo % 10) + (hi % 10) <= 9 && lo + hi <= 99) break;
    nums = fourNumbers(rand);
  }
  let lo = Math.min(...nums);
  let hi = Math.max(...nums);
  if ((lo % 10) + (hi % 10) > 9 || lo + hi > 99) {
    nums = [37, 45, 24, 42];
    lo = 24;
    hi = 45;
  }
  const sum = lo + hi;
  const second = [...nums].sort((p, q) => q - p)[1];
  return {
    prompt: `Có các số ${nums.join(', ')}. Tổng của số lớn nhất và số bé nhất là bao nhiêu?`,
    ...nearOptions(rand, sum, [hi - lo, second + lo]),
    hint: 'Em tìm số lớn nhất và số bé nhất trước, rồi cộng hai số đó.',
    solution: `Số lớn nhất là ${hi}, số bé nhất là ${lo}. ${hi} + ${lo} = ${sum}.`,
  };
}

/** Makers of the calculation questions, mixed for the `tinh` kind. */
const CALCULATIONS = [
  tensSkill.make,
  addSkill.make,
  subtractSkill.make,
  columnSkill.make,
  partsSkill.make,
  extremesQuestion,
];

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  /** @type {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} */
  let q;
  if (kind === 'tia-so') q = rayQuestion(rand);
  else if (kind === 'cau-tao') q = placeQuestion(rand);
  else if (kind === 'lien-ke') q = neighbourQuestion(rand);
  else if (kind === 'so-sanh') q = compareQuestion(rand);
  else if (kind === 'tinh') q = pick(rand, CALCULATIONS)(rand);
  else q = (rand() < 0.6 ? storySkill : moreLessSkill).make(rand);
  return { ...q, kind };
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
