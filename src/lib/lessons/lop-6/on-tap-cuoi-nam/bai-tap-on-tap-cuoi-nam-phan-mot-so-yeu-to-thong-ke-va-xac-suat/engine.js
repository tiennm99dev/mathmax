/**
 * Logic for the year-end statistics and probability review: generated
 * bar-chart reading questions, and simulated random experiments (a coin, a
 * die, a box of balls) whose experimental probability the learner works out.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { fraction, simplify } from '#lib/fraction-engine/index.js';

/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/**
 * @typedef {object} ChartQuestion
 * @property {string} title chart title
 * @property {string} unit value-axis title
 * @property {Array<{ label: string, value: number }>} data
 * @property {string} prompt plain text
 * @property {number} answer a whole number
 * @property {string} hint
 * @property {string[]} steps worked solution, the last step states the answer
 */

const THEMES = /** @type {const} */ ([
  {
    title: 'Môn thể thao yêu thích của học sinh lớp 6A',
    unit: 'Số học sinh',
    who: 'học sinh',
    labels: ['Bóng đá', 'Cầu lông', 'Bơi', 'Đá cầu', 'Bóng rổ'],
    verb: 'chọn',
  },
  {
    title: 'Loại quả yêu thích của học sinh lớp 6B',
    unit: 'Số học sinh',
    who: 'học sinh',
    labels: ['Xoài', 'Cam', 'Chuối', 'Dưa hấu', 'Ổi'],
    verb: 'chọn',
  },
  {
    title: 'Số bạn đi học muộn trong tuần của khối 6',
    unit: 'Số bạn',
    who: 'bạn',
    labels: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'],
    verb: 'đi học muộn vào',
  },
]);

/**
 * `count` whole numbers from `lo` up that add up to `total`, with a single
 * largest one.
 * @param {() => number} rand
 * @param {number} count
 * @param {number} total
 * @param {number} lo
 */
export function splitTotal(rand, count, total, lo) {
  for (;;) {
    const parts = Array.from({ length: count }, () => lo);
    for (let left = total - lo * count; left > 0; left--) parts[int(rand, 0, count - 1)]++;
    const top = Math.max(...parts);
    if (parts.filter((p) => p === top).length === 1 && top <= 20) return parts;
  }
}

/**
 * A bar chart and one question about it.
 * @param {() => number} rand
 * @returns {ChartQuestion}
 */
export function chartQuestion(rand) {
  const theme = pick(rand, THEMES);
  const count = 4;
  const total = pick(rand, [20, 25, 40, 50]);
  const labels = theme.title.includes('tuần')
    ? theme.labels.slice(0, count)
    : shuffle(rand, theme.labels).slice(0, count);
  const values = splitTotal(rand, count, total, 2);
  const data = labels.map((label, i) => ({ label, value: values[i] }));
  const sum = values.join(' + ');
  const v = int(rand, 0, 3);
  const base = { title: theme.title, unit: theme.unit, data };
  const on = (/** @type {string} */ l) => `${theme.verb} ${l.toLowerCase()}`;

  if (v === 0) {
    return {
      ...base,
      prompt: `Biểu đồ cho biết có tất cả bao nhiêu ${theme.who}?`,
      answer: total,
      hint: 'Cộng chiều cao (số liệu) của tất cả các cột.',
      steps: [`Tổng số liệu các cột: ${sum}.`, `Có tất cả ${total} ${theme.who}.`],
    };
  }
  if (v === 1) {
    let [i, j] = shuffle(rand, [0, 1, 2, 3]);
    while (values[i] === values[j]) [i, j] = shuffle(rand, [0, 1, 2, 3]);
    if (values[i] < values[j]) [i, j] = [j, i];
    const [a, b] = [data[i], data[j]];
    return {
      ...base,
      prompt: `Số ${theme.who} ${on(a.label)} nhiều hơn số ${theme.who} ${on(b.label)} bao nhiêu?`,
      answer: a.value - b.value,
      hint: 'Đọc số liệu của hai cột rồi lấy số lớn trừ số bé.',
      steps: [
        `${a.label}: ${a.value}; ${b.label}: ${b.value}.`,
        `${a.value} − ${b.value} = ${a.value - b.value}.`,
      ],
    };
  }
  if (v === 2) {
    const top = Math.max(...values);
    const hi = data.find((d) => d.value === top)?.label;
    return {
      ...base,
      prompt: `Cột nào trong biểu đồ cao nhất? Nhập số ${theme.who} ứng với cột đó.`,
      answer: top,
      hint: 'Tìm cột cao nhất và đọc số ghi trên đầu cột.',
      steps: [`Cột cao nhất là cột ${hi}.`, `Số ${theme.who} ${on(String(hi))} là ${top}.`],
    };
  }
  // A percentage that comes out whole: pick a total and a part that divide well.
  const nice = data.filter((d) => (d.value * 100) % total === 0);
  const target = nice.length ? pick(rand, nice) : null;
  if (!target) {
    return {
      ...base,
      prompt: `Biểu đồ cho biết có tất cả bao nhiêu ${theme.who}?`,
      answer: total,
      hint: 'Cộng chiều cao (số liệu) của tất cả các cột.',
      steps: [`Tổng số liệu các cột: ${sum}.`, `Có tất cả ${total} ${theme.who}.`],
    };
  }
  const pct = (target.value * 100) / total;
  return {
    ...base,
    prompt: `Số ${theme.who} ${on(target.label)} chiếm bao nhiêu phần trăm tổng số ${theme.who}? (Nhập số phần trăm.)`,
    answer: pct,
    hint: 'Tìm tổng số trước; tỉ số phần trăm của a và b là a · 100 : b (%).',
    steps: [
      `Tổng số: ${sum} = ${total}.`,
      `${target.label}: ${target.value}. Tỉ số phần trăm: ${target.value} · 100 : ${total} = ${pct}%.`,
    ],
  };
}

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} label
 * @property {string} action what one trial is
 * @property {string[]} outcomes all possible outcomes
 * @property {string} event the event asked about
 * @property {(outcome: string) => boolean} happens
 */

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'dong-xu',
    label: 'Tung đồng xu',
    action: 'tung đồng xu',
    outcomes: ['Mặt sấp', 'Mặt ngửa'],
    event: 'Đồng xu xuất hiện mặt ngửa',
    happens: (o) => o === 'Mặt ngửa',
  },
  {
    id: 'xuc-xac',
    label: 'Gieo xúc xắc',
    action: 'gieo xúc xắc',
    outcomes: ['1 chấm', '2 chấm', '3 chấm', '4 chấm', '5 chấm', '6 chấm'],
    event: 'Số chấm xuất hiện là số chẵn',
    happens: (o) => Number.parseInt(o, 10) % 2 === 0,
  },
  {
    id: 'hop-bong',
    label: 'Lấy bóng',
    action: 'lấy một quả bóng từ hộp có 3 bóng đỏ, 2 bóng xanh rồi trả lại',
    outcomes: ['Bóng đỏ', 'Bóng đỏ', 'Bóng đỏ', 'Bóng xanh', 'Bóng xanh'],
    event: 'Lấy được bóng xanh',
    happens: (o) => o === 'Bóng xanh',
  },
];

/**
 * The distinct outcomes of an experiment, in order (the ball box repeats
 * colours because each ball is equally likely).
 * @param {Experiment} e
 */
export const distinctOutcomes = (e) => [...new Set(e.outcomes)];

/**
 * Results of `n` trials, each drawn uniformly from the experiment's outcomes.
 * @param {Experiment} e @param {number} n @param {() => number} rand
 */
export function runTrials(e, n, rand) {
  return Array.from({ length: n }, () => e.outcomes[Math.floor(rand() * e.outcomes.length)]);
}

/**
 * How many times each distinct outcome came up.
 * @param {Experiment} e @param {string[]} results
 */
export function tallyOutcomes(e, results) {
  return distinctOutcomes(e).map((o) => ({
    outcome: o,
    count: results.filter((r) => r === o).length,
  }));
}

/**
 * Experimental probability of the experiment's event: n(A)/n, reduced.
 * @param {Experiment} e @param {string[]} results
 * @returns {{ hits: number, total: number, value: Fraction } | null}
 */
export function experimental(e, results) {
  if (results.length === 0) return null;
  const hits = results.filter(e.happens).length;
  return { hits, total: results.length, value: simplify(fraction(hits, results.length)) };
}
