/**
 * A mixed practice round over the chapter "Phép cộng, phép trừ (không nhớ)
 * trong phạm vi 100": column addition and subtraction, adding and
 * subtracting round tens in the head, comparing a result with a number and
 * short word problems. Questions are built from a seed, so the first round
 * is the same on the server and in the browser. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { pictureGroups, pictures } from '#lib/core/kid/pictures/index.js';
import {
  KINDS as COLUMN_KINDS,
  columnSteps,
  equationText,
  exprText,
  makeProblem,
  resultOf,
} from '../_shared/column.js';

const ADD_KINDS = /** @type {const} */ (['add-one', 'add-two']);
const SUB_KINDS = /** @type {const} */ (['sub-one', 'sub-two']);

/** @typedef {'add' | 'sub' | 'tens' | 'compare' | 'story'} Kind */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   options: string[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ (['add', 'sub', 'tens', 'compare', 'story']);

/** What each kind practises, for the score line. */
export const KIND_LABELS = /** @type {const} */ ({
  add: 'Phép cộng',
  sub: 'Phép trừ',
  tens: 'Tính nhẩm số tròn chục',
  compare: 'So sánh',
  story: 'Bài toán',
});

/** Comparison signs in the order the buttons show them. */
export const SIGNS = /** @type {const} */ (['>', '<', '=']);

const SIGN_WORDS = /** @type {const} */ ({ '>': 'lớn hơn', '<': 'bé hơn', '=': 'bằng' });

const COUNTABLE = [...pictureGroups.fruit, ...pictureGroups.things];

/**
 * Three or four number options from 0 to 99 that include `right`, in
 * increasing order: the likely mistakes first (`mistakes`), then numbers one
 * or ten away.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} [mistakes]
 * @returns {{ options: string[], answer: number }}
 */
export function numberOptions(rand, right, mistakes = []) {
  /** @param {number} v */
  const ok = (v) => Number.isInteger(v) && v >= 0 && v <= 99 && v !== right;
  const picked = [...new Set(mistakes.filter(ok))].slice(0, 2);
  const near = shuffle(
    rand,
    [right - 10, right + 10, right - 1, right + 1].filter((v) => ok(v) && !picked.includes(v)),
  );
  const values = [right, ...picked, ...near].slice(0, 4).sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * The sum written one column too far left, the mistake of putting a
 * one-digit number under the tens: 41 + 5 read as 41 + 50.
 * @param {number} a
 * @param {number} b
 * @param {import('../_shared/column.js').Op} op
 */
function misaligned(a, b, op) {
  return b < 10 ? resultOf(a, b * 10, op) : -1;
}

/**
 * The full column working of a calculation, as one sentence.
 * @param {number} a
 * @param {number} b
 * @param {import('../_shared/column.js').Op} op
 */
function working(a, b, op) {
  const [ones, tens] = columnSteps(a, b, op);
  return `${ones.text} ${tens.text} Vậy ${equationText(a, b, op)}.`;
}

/**
 * One question of a kind.
 * @param {Kind} kind
 * @param {() => number} rand
 * @returns {Question}
 */
export function makeQuestion(kind, rand) {
  if (kind === 'add' || kind === 'sub') {
    const add = kind === 'add';
    const { a, b, op } = makeProblem(rand, pick(rand, add ? ADD_KINDS : SUB_KINDS));
    const r = resultOf(a, b, op);
    return {
      kind,
      prompt: `${exprText(a, b, op)} = ?`,
      ...numberOptions(rand, r, [misaligned(a, b, op)]),
      hint: `Em đặt tính: ${add ? 'cộng' : 'trừ'} hàng đơn vị trước, rồi đến hàng chục.`,
      solution: working(a, b, op),
    };
  }
  if (kind === 'tens') {
    const add = rand() < 0.5;
    const x = add ? int(rand, 1, 8) : int(rand, 2, 9);
    const y = add ? int(rand, 1, 9 - x) : int(rand, 1, x - 1);
    const op = add ? '+' : '-';
    const rt = add ? x + y : x - y;
    return {
      kind,
      prompt: `Tính nhẩm: ${exprText(x * 10, y * 10, op)} = ?`,
      ...numberOptions(rand, rt * 10, [rt]),
      hint: `${x * 10} là ${x} chục, ${y * 10} là ${y} chục.`,
      solution: `${x} chục ${add ? '+' : '−'} ${y} chục = ${rt} chục. Vậy ${equationText(x * 10, y * 10, op)}.`,
    };
  }
  if (kind === 'compare') {
    const { a, b, op } = makeProblem(rand, pick(rand, COLUMN_KINDS));
    const value = resultOf(a, b, op);
    const other = rand() < 0.3 ? value : Math.min(99, value + pick(rand, [-2, -1, 1, 2]));
    const sign = value === other ? '=' : value > other ? '>' : '<';
    const left = exprText(a, b, op);
    return {
      kind,
      prompt: `Chọn dấu đúng: ${left} ... ${other}`,
      options: [...SIGNS],
      answer: SIGNS.indexOf(sign),
      hint: `Tính ${left} trước, rồi so sánh với ${other}.`,
      solution: `${left} = ${value}. ${value} ${SIGN_WORDS[sign]} ${other}, nên ${left} ${sign} ${other}.`,
    };
  }
  const noun = pictures[pick(rand, COUNTABLE)];
  const add = rand() < 0.5;
  const { a, b, op } = makeProblem(rand, pick(rand, add ? ADD_KINDS : SUB_KINDS));
  const r = resultOf(a, b, op);
  return {
    kind,
    prompt: add
      ? `Có ${a} ${noun}. Thêm ${b} ${noun} nữa. Có tất cả bao nhiêu ${noun}?`
      : `Có ${a} ${noun}. Bớt đi ${b} ${noun}. Còn lại bao nhiêu ${noun}?`,
    ...numberOptions(rand, r, [misaligned(a, b, op), resultOf(a, b, add ? '-' : '+')]),
    hint: add ? 'Thêm vào thì em làm phép cộng.' : 'Bớt đi thì em làm phép trừ.',
    solution: `${equationText(a, b, op)}. ${add ? 'Có tất cả' : 'Còn lại'} ${r} ${noun}.`,
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
