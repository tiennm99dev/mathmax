/**
 * Word problems about "more than" and "fewer than" (bài toán về nhiều hơn,
 * ít hơn một số đơn vị): one child has `a` things, the other has `k` more
 * (nhiều hơn) or `k` fewer (ít hơn). The solution is set out the book's way:
 * "Số bông hoa Việt hái được là: 6 + 2 = 8 (bông). Đáp số: 8 bông hoa."
 * Everything stays within 20. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { MINUS } from '#lib/core/number-format.js';

/**
 * One kind of story: the picture, what is counted, the unit written in the
 * solution, the two children and what they did.
 * @typedef {object} Pair
 * @property {import('#lib/core/kid/pictures/index.js').PictureName} picture
 * @property {string} name what is counted ("bông hoa")
 * @property {string} unit unit in the solution ("bông")
 * @property {[string, string]} who the child given first, then the one asked about
 * @property {string} verb what they did ("hái được")
 */

/** @type {readonly Pair[]} */
export const PAIRS = [
  { picture: 'flower', name: 'bông hoa', unit: 'bông', who: ['Mai', 'Việt'], verb: 'hái được' },
  { picture: 'star', name: 'ngôi sao', unit: 'ngôi sao', who: ['Lan', 'Nam'], verb: 'gấp được' },
  { picture: 'fish', name: 'con cá', unit: 'con', who: ['Minh', 'Hùng'], verb: 'câu được' },
  {
    picture: 'balloon',
    name: 'quả bóng bay',
    unit: 'quả',
    who: ['Hoa', 'Hà'],
    verb: 'có',
  },
  { picture: 'pencil', name: 'cái bút chì', unit: 'cái', who: ['An', 'Bình'], verb: 'có' },
  { picture: 'apple', name: 'quả táo', unit: 'quả', who: ['Rô-bốt', 'Mi'], verb: 'hái được' },
];

/**
 * A story: which pair, more (`nhieu`) or fewer (`it`), what the first child
 * has and the difference.
 * @typedef {{ pair: number, kind: 'nhieu' | 'it', a: number, k: number }} CompareStory
 */

/**
 * What the second child has: the answer of the story.
 * @param {CompareStory} s
 */
export function compareResult(s) {
  return s.kind === 'nhieu' ? s.a + s.k : s.a - s.k;
}

/**
 * The sentences of a story: what the first child has, how the second
 * compares, and the question.
 * @param {CompareStory} s
 */
export function compareText(s) {
  const p = PAIRS[s.pair];
  const [first, second] = p.who;
  return {
    start: `${first} ${p.verb} ${s.a} ${p.name}.`,
    change: `${second} ${p.verb} ${s.kind === 'nhieu' ? 'nhiều hơn' : 'ít hơn'} ${first} ${s.k} ${p.name}.`,
    question: `Hỏi ${second} ${p.verb} bao nhiêu ${p.name}?`,
  };
}

/**
 * The whole story as one prompt.
 * @param {CompareStory} s
 */
export function comparePrompt(s) {
  const t = compareText(s);
  return `${t.start} ${t.change} ${t.question}`;
}

/**
 * The solution (bài giải) as the book sets it out.
 * @param {CompareStory} s
 * @returns {string[]}
 */
export function compareSolution(s) {
  const p = PAIRS[s.pair];
  const c = compareResult(s);
  const sign = s.kind === 'nhieu' ? '+' : MINUS;
  return [
    `Số ${p.name} ${p.who[1]} ${p.verb} là:`,
    `${s.a} ${sign} ${s.k} = ${c} (${p.unit})`,
    `Đáp số: ${c} ${p.name}.`,
  ];
}

/**
 * The summary (tóm tắt) the book writes before the solution.
 * @param {CompareStory} s
 * @returns {string[]}
 */
export function compareSummary(s) {
  const p = PAIRS[s.pair];
  const [first, second] = p.who;
  return [
    `${first}: ${s.a} ${p.name}`,
    `${second} ${s.kind === 'nhieu' ? 'nhiều hơn' : 'ít hơn'} ${first}: ${s.k} ${p.name}`,
    `${second}: ... ${p.name}?`,
  ];
}

/**
 * The hint of a story: which operation, never the answer.
 * @param {CompareStory} s
 */
export function compareHint(s) {
  return s.kind === 'nhieu' ? 'Nhiều hơn thì em làm phép cộng.' : 'Ít hơn thì em làm phép trừ.';
}

/**
 * A new story, about another pair than the last one. Without a `kind` it
 * switches between more and fewer, starting with more. The difference is
 * 1 to 5; "more" stays within 20, "fewer" leaves at least 1.
 * @param {() => number} rand
 * @param {CompareStory} [previous]
 * @param {CompareStory['kind']} [kind]
 * @returns {CompareStory}
 */
export function newCompareStory(rand, previous, kind) {
  const next = kind ?? (previous?.kind === 'nhieu' ? 'it' : 'nhieu');
  for (let i = 0; i < 40; i++) {
    const pair = int(rand, 0, PAIRS.length - 1);
    const k = int(rand, 1, 5);
    const a = next === 'nhieu' ? int(rand, 3, 20 - k) : int(rand, Math.max(5, k + 1), 18);
    if (!previous || pair !== previous.pair) return { pair, kind: next, a, k };
  }
  return next === 'nhieu'
    ? { pair: 0, kind: 'nhieu', a: 6, k: 2 }
    : { pair: 1, kind: 'it', a: 9, k: 3 };
}
