/**
 * A mixed practice round over the chapter "Độ dài và đo độ dài": which of
 * two things is longer or shorter, the longest or shortest of three, the
 * tallest or shortest of three children, reading a ruler, comparing two
 * lengths given in cm, and the facts about units. Questions are built from a
 * seed, so the first round is the same on the server and in the browser.
 * Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import {
  KIDS,
  LONGEST,
  THINGS,
  compareSentences,
  inSentence,
  largestIndex,
  pairWords,
  smallestIndex,
} from '../_shared/length.js';

/** @typedef {'pair' | 'three' | 'kids' | 'ruler' | 'cm' | 'unit'} Kind */

/**
 * @typedef {(
 *   | { type: 'things', items: { thing: import('../_shared/length.js').Thing, length: number }[] }
 *   | { type: 'kids', items: { kid: import('../_shared/length.js').Kid, height: number }[] }
 *   | { type: 'ruler', thing: import('../_shared/length.js').Thing, length: number }
 * )} Scene
 */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   scene?: Scene;
 *   options: string[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ (['pair', 'three', 'kids', 'ruler', 'cm', 'unit']);

/** What each kind practises, for the progress line and the summary. */
export const KIND_LABELS = /** @type {const} */ ({
  pair: 'Dài hơn, ngắn hơn',
  three: 'Dài nhất, ngắn nhất',
  kids: 'Cao nhất, thấp nhất',
  ruler: 'Đọc thước',
  cm: 'So sánh số đo',
  unit: 'Đơn vị đo',
});

/**
 * `k` different sizes from lo to hi, at least `gap` apart.
 * @param {() => number} rand
 * @param {number} k
 * @param {number} lo
 * @param {number} hi
 * @param {number} gap
 */
export function spreadSizes(rand, k, lo, hi, gap) {
  for (;;) {
    const sizes = Array.from({ length: k }, () => int(rand, lo, hi));
    const sorted = [...sizes].sort((a, b) => a - b);
    if (sorted.every((v, i) => i === 0 || v - sorted[i - 1] >= gap)) return sizes;
  }
}

/** Facts about measuring, each with its options and right answer. */
const UNIT_FACTS = [
  {
    prompt: 'Xăng-ti-mét viết tắt là gì?',
    options: ['cm', 'xm', 'kg'],
    answer: 0,
    hint: 'Chữ viết tắt có chữ c và chữ m.',
    solution: 'Xăng-ti-mét viết tắt là cm.',
  },
  {
    prompt: 'Đo bằng thước, em đặt vạch số mấy thẳng với một đầu đồ vật?',
    options: ['Vạch 0', 'Vạch 1', 'Vạch 5'],
    answer: 0,
    hint: 'Đo bắt đầu từ số nhỏ nhất trên thước.',
    solution: 'Em đặt vạch 0 thẳng với một đầu đồ vật.',
  },
  {
    prompt: 'Gang tay bố dài hơn gang tay em. Đo cùng một cái bàn, ai đếm được nhiều gang tay hơn?',
    options: ['Em', 'Bố', 'Bằng nhau'],
    answer: 0,
    hint: 'Gang tay ngắn hơn thì phải đặt nhiều lần hơn.',
    solution: 'Gang tay em ngắn hơn nên em đếm được nhiều gang tay hơn.',
  },
  {
    prompt: 'Muốn so chiều cao hai bạn, hai bạn phải đứng thế nào?',
    options: ['Trên cùng một mặt sàn', 'Một bạn đứng trên ghế', 'Xa nhau'],
    answer: 0,
    hint: 'Hai bạn phải bắt đầu từ cùng một chỗ.',
    solution: 'Hai bạn đứng cạnh nhau trên cùng một mặt sàn rồi so đỉnh đầu.',
  },
];

/**
 * @param {Kind} kind
 * @param {() => number} rand
 * @param {number} turn which of the two questions of this kind (0 or 1)
 * @returns {Question}
 */
export function makeQuestion(kind, rand, turn) {
  const ask = turn === 0 ? 'more' : 'less';
  if (kind === 'pair') {
    const things = shuffle(rand, THINGS).slice(0, 2);
    const sizes = spreadSizes(rand, 2, 3, 13, 2);
    const w = pairWords('length');
    const big = largestIndex(sizes);
    const answer = ask === 'more' ? big : 1 - big;
    const labels = /** @type {[string, string]} */ ([things[0].label, things[1].label]);
    return {
      kind,
      prompt: `Vật nào ${ask === 'more' ? w.more : w.less}?`,
      scene: { type: 'things', items: things.map((thing, i) => ({ thing, length: sizes[i] })) },
      options: labels,
      answer,
      hint: 'Hai vật đã thẳng hàng ở đầu bên trái. Em nhìn đầu bên phải.',
      solution: compareSentences(labels, /** @type {[number, number]} */ (sizes), 'length'),
    };
  }
  if (kind === 'three') {
    const things = shuffle(rand, THINGS).slice(0, 3);
    const sizes = spreadSizes(rand, 3, 3, 13, 2);
    const w = pairWords('length');
    const answer = ask === 'more' ? largestIndex(sizes) : smallestIndex(sizes);
    const word = ask === 'more' ? w.most : w.least;
    return {
      kind,
      prompt: `Vật nào ${word}?`,
      scene: { type: 'things', items: things.map((thing, i) => ({ thing, length: sizes[i] })) },
      options: things.map((t) => t.label),
      answer,
      hint:
        ask === 'more'
          ? 'Vật thò ra xa nhất ở bên phải là vật dài nhất.'
          : 'Vật thò ra ít nhất ở bên phải là vật ngắn nhất.',
      solution: `${things[answer].label} ${word}.`,
    };
  }
  if (kind === 'kids') {
    const kids = shuffle(rand, KIDS).slice(0, 3);
    const sizes = spreadSizes(rand, 3, 5, 9, 1);
    const w = pairWords('height');
    const answer = ask === 'more' ? largestIndex(sizes) : smallestIndex(sizes);
    const word = ask === 'more' ? w.most : w.least;
    return {
      kind,
      prompt: `Ba bạn đứng trên cùng mặt sàn. Bạn nào ${word}?`,
      scene: { type: 'kids', items: kids.map((kid, i) => ({ kid, height: sizes[i] })) },
      options: kids.map((k) => k.label),
      answer,
      hint:
        ask === 'more'
          ? 'Em so đỉnh đầu: đỉnh đầu ở cao nhất là bạn cao nhất.'
          : 'Em so đỉnh đầu: đỉnh đầu ở thấp nhất là bạn thấp nhất.',
      solution: `${kids[answer].label} ${word}.`,
    };
  }
  if (kind === 'ruler') {
    const thing = pick(rand, THINGS);
    const length = int(rand, 3, LONGEST);
    const below = int(rand, 0, 2);
    const values = [0, 1, 2].map((k) => length - below + k);
    return {
      kind,
      prompt: `${thing.label} dài mấy xăng-ti-mét?`,
      scene: { type: 'ruler', thing, length },
      options: values.map((v) => `${v} cm`),
      answer: below,
      hint: `Vạch 0 đã thẳng với một đầu. Em nhìn đầu kia của ${inSentence(thing.label)}.`,
      solution: `Đầu kia thẳng với vạch ${length}, nên ${inSentence(thing.label)} dài ${length} cm.`,
    };
  }
  if (kind === 'cm') {
    const things = shuffle(rand, THINGS).slice(0, 2);
    const sizes = spreadSizes(rand, 2, 2, 19, 1);
    const w = pairWords('length');
    const big = largestIndex(sizes);
    const answer = ask === 'more' ? big : 1 - big;
    const labels = /** @type {[string, string]} */ ([things[0].label, things[1].label]);
    const [a, b] = sizes;
    return {
      kind,
      prompt: `${labels[0]} dài ${a} cm. ${labels[1]} dài ${b} cm. Vật nào ${ask === 'more' ? w.more : w.less}?`,
      options: labels,
      answer,
      hint: `Em so sánh hai số ${a} và ${b}.`,
      solution: `${Math.max(a, b)} > ${Math.min(a, b)}. ${compareSentences(labels, /** @type {[number, number]} */ (sizes), 'length')}`,
    };
  }
  const fact = UNIT_FACTS[(int(rand, 0, 1) * 2 + turn) % UNIT_FACTS.length];
  const order = shuffle(rand, [0, 1, 2]);
  return {
    kind,
    prompt: fact.prompt,
    options: order.map((i) => fact.options[i]),
    answer: order.indexOf(fact.answer),
    hint: fact.hint,
    solution: fact.solution,
  };
}

/**
 * One round: every kind twice, in a mixed order with no kind twice in a row
 * where the shuffle allows.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed * 2741 + 28);
  const list = KINDS.flatMap((k) => [makeQuestion(k, rand, 0), makeQuestion(k, rand, 1)]);
  const mixed = shuffle(rand, list);
  for (let i = 1; i < mixed.length; i++) {
    if (mixed[i].kind !== mixed[i - 1].kind) continue;
    const j = mixed.findIndex((q, k) => k > i && q.kind !== mixed[i].kind);
    if (j > 0) [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
  }
  return mixed;
}

/**
 * Kinds to review: those missed at the first try.
 * @param {Question[]} round
 * @param {Array<boolean | null>} firstTry
 */
export function weakKinds(round, firstTry) {
  const weak = new Set();
  round.forEach((q, i) => {
    if (firstTry[i] === false) weak.add(KIND_LABELS[q.kind]);
  });
  return [...weak];
}
