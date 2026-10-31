/**
 * A mixed practice round over the chapter "Các số từ 0 đến 10": counting
 * pictures, the missing number in a count, comparing with >, < and =, the
 * largest number, and splitting a number into two parts. Questions are
 * built from a seed, so the first round is the same on the server and in the
 * browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { pictureGroups, pictures } from '#lib/core/kid/pictures/index.js';
import { TOP, wordOf } from '../_shared/number-words.js';

/** @typedef {'count' | 'missing' | 'compare' | 'largest' | 'split'} Kind */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   picture?: import('#lib/core/kid/pictures/index.js').PictureName;
 *   shown?: number;
 *   options: string[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ (['count', 'missing', 'compare', 'largest', 'split']);

/** What each kind practises, for the score line. */
export const KIND_LABELS = /** @type {const} */ ({
  count: 'Đếm',
  missing: 'Thứ tự các số',
  compare: 'So sánh số',
  largest: 'Số lớn nhất',
  split: 'Mấy và mấy',
});

const COUNTABLE = [...pictureGroups.fruit, ...pictureGroups.animals, ...pictureGroups.things];

/**
 * Up to four number options that include `right`, drawn from 0..TOP near it,
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
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  if (kind === 'count') {
    const picture = pick(rand, COUNTABLE);
    const n = int(rand, 3, TOP);
    const noun = pictures[picture];
    return {
      kind,
      prompt: `Có mấy ${noun}?`,
      picture,
      shown: n,
      ...numberOptions(rand, n),
      hint: 'Chạm từng hình và đếm to, mỗi hình một lần.',
      solution: `Đếm đến hình cuối cùng em đọc "${wordOf(n)}". Có ${n} ${noun}.`,
    };
  }
  if (kind === 'missing') {
    const start = int(rand, 0, TOP - 3);
    const gap = int(rand, 1, 2);
    const row = [start, start + 1, start + 2, start + 3];
    const right = row[gap];
    const text = row.map((v, i) => (i === gap ? '?' : String(v))).join(', ');
    return {
      kind,
      prompt: `Số nào còn thiếu: ${text}?`,
      ...numberOptions(rand, right),
      hint: `Em đếm từ ${start}: mỗi số sau hơn số trước 1.`,
      solution: `Đếm: ${row.join(', ')}. Số còn thiếu là ${right}.`,
    };
  }
  if (kind === 'compare') {
    const a = int(rand, 0, TOP);
    const b = rand() < 0.2 ? a : int(rand, 0, TOP);
    const sign = a === b ? '=' : a > b ? '>' : '<';
    const word = { '>': 'lớn hơn', '<': 'bé hơn', '=': 'bằng' }[sign];
    return {
      kind,
      prompt: `Chọn dấu đúng: ${a} ... ${b}`,
      options: ['>', '<', '='],
      answer: ['>', '<', '='].indexOf(sign),
      hint:
        a === b
          ? 'Hai số giống nhau.'
          : 'Số nào đứng sau khi đếm thì lớn hơn. Đầu nhọn chỉ vào số bé.',
      solution: `${a} ${word} ${b}, nên ${a} ${sign} ${b}.`,
    };
  }
  if (kind === 'largest') {
    const values = shuffle(
      rand,
      Array.from({ length: TOP + 1 }, (_, i) => i),
    ).slice(0, 3);
    const top = Math.max(...values);
    return {
      kind,
      prompt: 'Số nào lớn nhất?',
      options: values.map(String),
      answer: values.indexOf(top),
      hint: 'So sánh từng cặp số, hoặc xem số nào đứng sau cùng khi đếm.',
      solution: `Xếp từ bé đến lớn: ${[...values].sort((x, y) => x - y).join(', ')}. Số lớn nhất là ${top}.`,
    };
  }
  const n = int(rand, 3, TOP);
  const left = int(rand, 1, n - 1);
  const right = n - left;
  return {
    kind,
    prompt: `${n} gồm ${left} và mấy?`,
    ...numberOptions(rand, right),
    hint: `Có ${left} hạt rồi, em đếm tiếp đến ${n}.`,
    solution: `Từ ${left} đếm tiếp đến ${n} được thêm ${right}. ${n} gồm ${left} và ${right}.`,
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
