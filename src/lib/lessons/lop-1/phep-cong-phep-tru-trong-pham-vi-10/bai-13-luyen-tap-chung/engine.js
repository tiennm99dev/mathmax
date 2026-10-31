/**
 * A mixed practice round over the chapter "Phép cộng, phép trừ trong phạm vi
 * 10": adding, subtracting, the missing number, comparing a sum or a
 * difference with a number, short word problems and writing the addition a
 * picture shows. Questions are built from a seed, so the first round is the
 * same on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { pictureGroups, pictures } from '#lib/core/kid/pictures/index.js';
import { MINUS } from '#lib/core/number-format.js';
import { TOP, addText, subText } from '../_shared/arith.js';

/** @typedef {'add' | 'sub' | 'missing' | 'compare' | 'story' | 'picture'} Kind */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   picture?: import('#lib/core/kid/pictures/index.js').PictureName;
 *   groups?: [number, number];
 *   options: string[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ ([
  'add',
  'sub',
  'missing',
  'compare',
  'story',
  'picture',
]);

/** What each kind practises, for the score line. */
export const KIND_LABELS = /** @type {const} */ ({
  add: 'Phép cộng',
  sub: 'Phép trừ',
  missing: 'Tìm số còn thiếu',
  compare: 'So sánh',
  story: 'Bài toán',
  picture: 'Nhìn hình viết phép tính',
});

const COUNTABLE = [...pictureGroups.fruit, ...pictureGroups.things];

/** Comparison signs in the order the buttons show them. */
export const SIGNS = /** @type {const} */ (['>', '<', '=']);

/**
 * Up to four number options that include `right`, drawn from 0..10 near it,
 * in increasing order so a child can scan them.
 * @param {() => number} rand
 * @param {number} right
 * @returns {{ options: string[], answer: number }}
 */
export function numberOptions(rand, right) {
  const near = [];
  for (let d = -3; d <= 3; d++) {
    const v = right + d;
    if (d !== 0 && v >= 0 && v <= TOP) near.push(v);
  }
  const values = [right, ...shuffle(rand, near).slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * A sum a + b within 10 with both parts at least 1.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
function sumPair(rand) {
  const c = int(rand, 2, TOP);
  const a = int(rand, 1, c - 1);
  return [a, c - a];
}

/**
 * Options for a picture of two groups: the right addition first among
 * three, then shuffled; the wrong ones have a wrong result or the wrong sign.
 * @param {() => number} rand
 * @param {number} a
 * @param {number} b
 */
function pictureOptions(rand, a, b) {
  const c = a + b;
  const wrongSum = c + (c >= TOP ? -1 : 1);
  const wrong = [`${a} + ${b} = ${wrongSum}`];
  wrong.push(a > b ? subText(a, b) : `${a} + ${b} = ${c === 2 ? 3 : c - 1}`);
  if (wrong[0] === wrong[1]) wrong[1] = `${a} + ${b} = ${c >= TOP ? c - 2 : c + 2}`;
  const options = shuffle(rand, [addText(a, b), ...wrong]);
  return { options, answer: options.indexOf(addText(a, b)) };
}

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  if (kind === 'add') {
    const [a, b] = sumPair(rand);
    return {
      kind,
      prompt: `${a} + ${b} = ?`,
      ...numberOptions(rand, a + b),
      hint: `Có ${a}, em đếm thêm ${b} nữa.`,
      solution: `${addText(a, b)}.`,
    };
  }
  if (kind === 'sub') {
    const [b, r] = sumPair(rand);
    const n = b + r;
    return {
      kind,
      prompt: `${n} ${MINUS} ${b} = ?`,
      ...numberOptions(rand, r),
      hint: `Em nghĩ: ${b} cộng mấy thì bằng ${n}?`,
      solution: `${addText(b, r)}, nên ${subText(n, b)}.`,
    };
  }
  if (kind === 'missing') {
    const [a, b] = sumPair(rand);
    const c = a + b;
    if (rand() < 0.5) {
      return {
        kind,
        prompt: `Số nào điền vào ô trống? ${a} + ? = ${c}`,
        ...numberOptions(rand, b),
        hint: `${a} cộng mấy thì bằng ${c}? Em đếm tiếp từ ${a} đến ${c}.`,
        solution: `${subText(c, a)}, nên ${addText(a, b)}. Số cần điền là ${b}.`,
      };
    }
    return {
      kind,
      prompt: `Số nào điền vào ô trống? ${c} ${MINUS} ? = ${a}`,
      ...numberOptions(rand, b),
      hint: `${c} bớt đi mấy thì còn ${a}? Em đếm lùi từ ${c} đến ${a}.`,
      solution: `${addText(a, b)}, nên ${subText(c, b)}. Số cần điền là ${b}.`,
    };
  }
  if (kind === 'compare') {
    const plus = rand() < 0.5;
    const [x, y] = sumPair(rand);
    const value = plus ? x + y : x;
    const left = plus ? `${x} + ${y}` : `${x + y} ${MINUS} ${y}`;
    const other =
      rand() < 0.3 ? value : int(rand, Math.max(0, value - 2), Math.min(TOP, value + 2));
    const sign = value === other ? '=' : value > other ? '>' : '<';
    const word = { '>': 'lớn hơn', '<': 'bé hơn', '=': 'bằng' }[sign];
    return {
      kind,
      prompt: `Chọn dấu đúng: ${left} ... ${other}`,
      options: [...SIGNS],
      answer: SIGNS.indexOf(sign),
      hint: `Tính ${left} trước, rồi so sánh với ${other}.`,
      solution: `${left} = ${value}. ${value} ${word} ${other}, nên ${left} ${sign} ${other}.`,
    };
  }
  if (kind === 'story') {
    const picture = pick(rand, COUNTABLE);
    const noun = pictures[picture];
    const [a, b] = sumPair(rand);
    if (rand() < 0.5) {
      return {
        kind,
        prompt: `Có ${a} ${noun}. Thêm ${b} ${noun} nữa. Có tất cả mấy ${noun}?`,
        ...numberOptions(rand, a + b),
        hint: 'Thêm vào thì em làm phép cộng.',
        solution: `${addText(a, b)}. Có tất cả ${a + b} ${noun}.`,
      };
    }
    const n = a + b;
    return {
      kind,
      prompt: `Có ${n} ${noun}. Bớt đi ${a} ${noun}. Còn lại mấy ${noun}?`,
      ...numberOptions(rand, b),
      hint: 'Bớt đi thì em làm phép trừ.',
      solution: `${subText(n, a)}. Còn lại ${b} ${noun}.`,
    };
  }
  const picture = pick(rand, COUNTABLE);
  const [a, b] = sumPair(rand);
  return {
    kind,
    prompt: 'Phép tính nào đúng với hình?',
    picture,
    groups: [a, b],
    ...pictureOptions(rand, a, b),
    hint: 'Đếm từng nhóm, rồi gộp hai nhóm lại.',
    solution: `Nhóm trái có ${a}, nhóm phải có ${b}. Gộp lại: ${addText(a, b)}.`,
  };
}

/**
 * A round of two questions per kind in mixed order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = shuffle(rand, [...KINDS, ...KINDS]);
  return kinds.map((k) => makeQuestion(k, rand));
}

/**
 * Kinds the child missed at the first try, to suggest what to review.
 * @param {readonly Question[]} round
 * @param {ReadonlyArray<boolean | null>} firstTry
 * @returns {string[]}
 */
export function weakKinds(round, firstTry) {
  const missed = new Set();
  round.forEach((q, i) => {
    if (firstTry[i] === false) missed.add(q.kind);
  });
  return KINDS.filter((k) => missed.has(k)).map((k) => KIND_LABELS[k]);
}
