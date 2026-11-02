/**
 * The quiz round shared by the table lessons of this chapter: eight questions
 * on different rows of one table, from the table itself, skip counting, a
 * picture and word problems. Pure and DOM-free.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';
import { divLine, mulLine, productOptions, quotientOptions } from './times.js';

/**
 * A word problem on row `n` of the table.
 * @typedef {(n: number) => { prompt: string, unit: string, divide: boolean }} Story
 */

/**
 * The question asked with its picture on screen.
 * @typedef {{
 *   label: string;
 *   prompt: string;
 *   hint: string;
 *   solution: (n: number) => string;
 * }} PictureAsk
 */

/**
 * What a question gives a widget to draw: row `n`, shown while it is being asked
 * when `open`, else once it ends. `quotient` is set when the answer is `n`, not
 * the product.
 * @typedef {{ n: number, open: boolean, quotient: boolean }} RoundVisual
 */

/**
 * What each part of a round practises.
 * @param {number} base
 * @param {string} pictureLabel
 */
export const tableKindLabels = (base, pictureLabel) => ({
  mul: `Bảng nhân ${base}`,
  div: `Bảng chia ${base}`,
  skip: `Đếm thêm ${base}`,
  picture: pictureLabel,
  story: 'Bài toán',
});

/**
 * @param {number} seed
 * @param {number} base
 * @param {readonly Story[]} stories
 * @param {PictureAsk} ask
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion<RoundVisual>[]}
 */
export function buildTableRound(seed, base, stories, ask) {
  const rand = rng(seed);
  const rows = shuffle(rand, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const kinds = ['mul', 'div', 'picture', 'skip', 'story', 'mul', 'div', 'story'];
  return kinds.map((kind, i) => {
    const n = rows[i];
    const right = base * n;
    const closed = { n, open: false, quotient: false };
    if (kind === 'mul') {
      return {
        kind,
        visual: closed,
        prompt: `${base} × ${n} = ?`,
        ...productOptions(base, n),
        hint: `Em đếm thêm ${base}, đếm ${n} lần.`,
        solution: `${mulLine(base, n)}.`,
      };
    }
    if (kind === 'div') {
      return {
        kind,
        visual: { ...closed, quotient: true },
        prompt: `${right} : ${base} = ?`,
        ...quotientOptions(base, n),
        hint: `Em nghĩ: ${base} nhân với mấy thì bằng ${right}?`,
        solution: `Vì ${mulLine(base, n)} nên ${divLine(base, n)}.`,
      };
    }
    if (kind === 'picture') {
      return {
        kind,
        visual: { ...closed, open: true },
        prompt: ask.prompt,
        ...productOptions(base, n),
        hint: ask.hint,
        solution: ask.solution(n),
      };
    }
    if (kind === 'skip') {
      const shown = [right - 2 * base, right - base].filter((v) => v > 0);
      return {
        kind,
        visual: closed,
        prompt: `Đếm thêm ${base}: ${shown.join(', ')}, ... Số tiếp theo là số nào?`,
        ...productOptions(base, n),
        hint: `Em lấy số cuối cùng cộng thêm ${base}.`,
        solution: `${right - base} + ${base} = ${right}.`,
      };
    }
    const story = pick(rand, stories)(n);
    return {
      kind,
      visual: { ...closed, quotient: story.divide },
      prompt: story.prompt,
      ...(story.divide ? quotientOptions(base, n) : productOptions(base, n)),
      hint: story.divide
        ? 'Chia đều, hay chia thành từng nhóm bằng nhau: em làm phép chia.'
        : `${base} được lấy ${n} lần. Em viết phép nhân.`,
      solution: `${story.divide ? divLine(base, n) : mulLine(base, n)} (${story.unit}).`,
    };
  });
}

/**
 * Everything wrong with a round, for the lessons' tests: a right answer that is
 * not the table's, repeated options, too few options, or numbers in the prompt
 * that do not fit the row.
 * @param {import('#lib/core/kid/quiz.js').KidQuestion<RoundVisual>[]} round
 * @param {number} base
 */
export function roundProblems(round, base) {
  const bad = [];
  for (const q of round) {
    const { n = 0, quotient = false } = q.visual ?? {};
    const right = quotient ? n : base * n;
    if (q.options[q.answer] !== String(right)) bad.push(['answer', q.prompt]);
    if (new Set(q.options).size !== q.options.length) bad.push(['repeat', q.prompt]);
    if (q.options.length < 3) bad.push(['few', q.prompt]);
    const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
    if (q.kind === 'mul' && (nums[0] !== base || nums[1] !== n)) bad.push(['mul', q.prompt]);
    if (q.kind === 'div' && (nums[0] !== base * n || nums[1] !== base)) bad.push(['div', q.prompt]);
    if (q.kind === 'skip' && nums.at(-1) !== base * n - base) bad.push(['skip', q.prompt]);
    if (q.kind === 'story' && !nums.includes(quotient ? base * n : n))
      bad.push(['story', q.prompt]);
  }
  return bad;
}
