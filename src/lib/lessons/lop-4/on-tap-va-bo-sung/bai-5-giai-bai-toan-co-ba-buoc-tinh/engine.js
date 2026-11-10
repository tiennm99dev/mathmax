/**
 * Word problems solved in three steps, drawn as a segment diagram (sơ đồ
 * đoạn thẳng): one bar per quantity, a bar given by "nhiều hơn", "ít hơn" or
 * "gấp" another bar is drawn from it, and the total comes last. Each step
 * asks for the calculation that finds one unknown; a right choice fills its
 * bar. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * A bar of the diagram. `from` names the bar it is drawn from and `rel` how:
 * `more` and `less` by `by` units, `times` by `by` copies.
 * @typedef {object} Bar
 * @property {string} label
 * @property {number} value
 * @property {number} [from]
 * @property {'more' | 'less' | 'times'} [rel]
 * @property {number} [by]
 */

/**
 * One step of the solution: the question, the calculations offered (the
 * first one is right) and what it finds, a bar index or `total`.
 * @typedef {{ ask: string, options: string[], finds: number | 'total' }} Step
 */

/**
 * @typedef {object} Problem
 * @property {string} id
 * @property {string} title
 * @property {string} text
 * @property {string} unit
 * @property {Bar[]} bars
 * @property {Step[]} steps
 * @property {string} answer
 */

/** @type {ReadonlyArray<Problem>} */
export const PROBLEMS = [
  {
    id: 'vit',
    title: 'Đàn vịt',
    text: 'Bác Đào nuôi 1 200 con vịt. Bác Mận nuôi ít hơn bác Đào 300 con vịt. Bác Cúc nuôi nhiều hơn bác Đào 500 con vịt. Hỏi cả ba bác nuôi bao nhiêu con vịt?',
    unit: 'con vịt',
    bars: [
      { label: 'Bác Đào', value: 1200 },
      { label: 'Bác Mận', value: 900, from: 0, rel: 'less', by: 300 },
      { label: 'Bác Cúc', value: 1700, from: 0, rel: 'more', by: 500 },
    ],
    steps: [
      {
        ask: 'Bước 1: Bác Mận nuôi bao nhiêu con vịt?',
        options: ['1 200 − 300 = 900', '1 200 + 300 = 1 500', '1 200 − 500 = 700'],
        finds: 1,
      },
      {
        ask: 'Bước 2: Bác Cúc nuôi bao nhiêu con vịt?',
        options: ['1 200 + 500 = 1 700', '900 + 500 = 1 400', '1 200 − 500 = 700'],
        finds: 2,
      },
      {
        ask: 'Bước 3: Cả ba bác nuôi bao nhiêu con vịt?',
        options: [
          '1 200 + 900 + 1 700 = 3 800',
          '1 200 + 300 + 500 = 2 000',
          '900 + 1 700 = 2 600',
        ],
        finds: 'total',
      },
    ],
    answer: 'Đáp số: 3 800 con vịt.',
  },
  {
    id: 'may-tinh',
    title: 'Bán máy tính',
    text: 'Thứ Sáu cửa hàng bán được 12 máy tính. Thứ Bảy bán được nhiều hơn Thứ Sáu 5 máy tính. Chủ nhật bán được nhiều hơn Thứ Bảy 10 máy tính. Hỏi cả ba ngày bán được bao nhiêu máy tính?',
    unit: 'máy tính',
    bars: [
      { label: 'Thứ Sáu', value: 12 },
      { label: 'Thứ Bảy', value: 17, from: 0, rel: 'more', by: 5 },
      { label: 'Chủ nhật', value: 27, from: 1, rel: 'more', by: 10 },
    ],
    steps: [
      {
        ask: 'Bước 1: Thứ Bảy bán được bao nhiêu máy tính?',
        options: ['12 + 5 = 17', '12 − 5 = 7', '12 + 10 = 22'],
        finds: 1,
      },
      {
        ask: 'Bước 2: Chủ nhật bán được bao nhiêu máy tính?',
        options: ['17 + 10 = 27', '12 + 10 = 22', '17 − 10 = 7'],
        finds: 2,
      },
      {
        ask: 'Bước 3: Cả ba ngày bán được bao nhiêu máy tính?',
        options: ['12 + 17 + 27 = 56', '12 + 5 + 10 = 27', '17 + 27 = 44'],
        finds: 'total',
      },
    ],
    answer: 'Đáp số: 56 máy tính.',
  },
  {
    id: 'qua',
    title: 'Ba giỏ quả',
    text: 'Giỏ sầu riêng có 12 quả. Giỏ bưởi có số quả gấp 2 lần giỏ sầu riêng. Giỏ xoài có nhiều hơn giỏ bưởi 13 quả. Hỏi cả ba giỏ có bao nhiêu quả?',
    unit: 'quả',
    bars: [
      { label: 'Sầu riêng', value: 12 },
      { label: 'Bưởi', value: 24, from: 0, rel: 'times', by: 2 },
      { label: 'Xoài', value: 37, from: 1, rel: 'more', by: 13 },
    ],
    steps: [
      {
        ask: 'Bước 1: Giỏ bưởi có bao nhiêu quả?',
        options: ['12 × 2 = 24', '12 + 2 = 14', '12 : 2 = 6'],
        finds: 1,
      },
      {
        ask: 'Bước 2: Giỏ xoài có bao nhiêu quả?',
        options: ['24 + 13 = 37', '12 + 13 = 25', '24 − 13 = 11'],
        finds: 2,
      },
      {
        ask: 'Bước 3: Cả ba giỏ có bao nhiêu quả?',
        options: ['12 + 24 + 37 = 73', '12 + 24 = 36', '24 + 37 = 61'],
        finds: 'total',
      },
    ],
    answer: 'Đáp số: 73 quả.',
  },
];

/**
 * The total of a problem.
 * @param {Problem} p
 */
export const totalOf = (p) => p.bars.reduce((sum, b) => sum + b.value, 0);

/**
 * The number a calculation ends with: "1 200 − 300 = 900" gives 900.
 * @param {string} option
 */
export const resultOf = (option) => Number(option.split('=').pop()?.replace(/\D/g, ''));

/**
 * A piece of a bar in units of the problem: `solid` is the bar itself, `extra`
 * the part added by "nhiều hơn", `missing` the dashed part taken away by "ít
 * hơn"; a `times` bar is solid pieces as long as the bar it is drawn from.
 * @typedef {{ start: number, end: number, kind: 'solid' | 'extra' | 'missing', note: string }} Piece
 */

/**
 * The pieces of every bar.
 * @param {Problem} p
 * @returns {Piece[][]}
 */
export function piecesOf(p) {
  return p.bars.map((bar) => {
    if (bar.from === undefined || !bar.rel || bar.by === undefined) {
      return [{ start: 0, end: bar.value, kind: 'solid', note: '' }];
    }
    const base = p.bars[bar.from].value;
    if (bar.rel === 'more') {
      return [
        { start: 0, end: base, kind: 'solid', note: '' },
        { start: base, end: base + bar.by, kind: 'extra', note: fmt(bar.by) },
      ];
    }
    if (bar.rel === 'less') {
      return [
        { start: 0, end: base - bar.by, kind: 'solid', note: '' },
        { start: base - bar.by, end: base, kind: 'missing', note: fmt(bar.by) },
      ];
    }
    return Array.from({ length: bar.by }, (_, i) => ({
      start: i * base,
      end: (i + 1) * base,
      kind: /** @type {const} */ ('solid'),
      note: '',
    }));
  });
}

/**
 * The longest piece end, which sets the scale of the drawing.
 * @param {Problem} p
 */
export const widest = (p) =>
  Math.max(
    ...piecesOf(p)
      .flat()
      .map((x) => x.end),
  );

/**
 * The feedback after a choice.
 * @param {Problem} p
 * @param {number} step
 * @param {number} chosen index into the step's options
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function judge(p, step, chosen) {
  const s = p.steps[step];
  if (chosen === 0) {
    const what = s.finds === 'total' ? 'Cả ba' : p.bars[s.finds].label;
    return { tone: 'ok', text: `Đúng rồi! ${what}: ${s.options[0]} (${p.unit}).` };
  }
  if (s.finds === 'total') {
    return { tone: 'warn', text: 'Chưa đúng. Muốn tìm tất cả, em cộng số của cả ba phần.' };
  }
  const bar = p.bars[s.finds];
  const base = bar.from === undefined ? '' : p.bars[bar.from].label;
  const how =
    bar.rel === 'times' ? `gấp ${bar.by} lần` : bar.rel === 'less' ? 'ít hơn' : 'nhiều hơn';
  return {
    tone: 'warn',
    text: `Chưa đúng. Em xem sơ đồ: ${bar.label} ${how} ${base}. Em tính từ số của ${base}.`,
  };
}

/**
 * The order the options of a step are shown in, so the right one (index 0)
 * is never first: the same for every visitor.
 * @param {number} step
 * @param {number} count
 */
export const shownOrder = (step, count) =>
  Array.from({ length: count }, (_, i) => (i + (step % (count - 1)) + 1) % count);
