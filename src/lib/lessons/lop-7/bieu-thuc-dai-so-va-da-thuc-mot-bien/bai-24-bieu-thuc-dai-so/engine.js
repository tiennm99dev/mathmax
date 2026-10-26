/**
 * Algebraic expressions the widget evaluates: each knows its variables, how
 * to write itself with the variables replaced by numbers (TeX, negatives in
 * brackets) and its value. The value is computed from the numbers, never
 * read back from the TeX.
 */

import { formatNumber, texNumber } from '#lib/core/number-format.js';

/**
 * A number in TeX: −1.5 → '-1{,}5'.
 * @param {number} v
 */
export const num = (v) => texNumber(formatNumber(v, 4)).replace('−', '-');

/**
 * A number to substitute for a variable: bracketed when negative.
 * @param {number} v
 */
export const put = (v) => (v < 0 ? `(${num(v)})` : num(v));

/**
 * @typedef {{ name: string, label: string, min: number, max: number, step: number, start: number }} Variable
 * @typedef {{
 *   id: string,
 *   title: string,
 *   tex: string,
 *   meaning: string,
 *   vars: Variable[],
 *   value: (v: Record<string, number>) => number | null,
 *   steps: (v: Record<string, number>) => string[],
 * }} Expression
 */

/** @type {Expression[]} */
export const EXPRESSIONS = [
  {
    id: 'chu-vi',
    title: 'Chu vi hình chữ nhật',
    tex: '2(a + b)',
    meaning: 'chu vi (cm) của hình chữ nhật có chiều dài a cm và chiều rộng b cm',
    vars: [
      { name: 'a', label: 'Chiều dài a (cm)', min: 0.5, max: 10, step: 0.5, start: 5 },
      { name: 'b', label: 'Chiều rộng b (cm)', min: 0.5, max: 10, step: 0.5, start: 3 },
    ],
    value: ({ a, b }) => 2 * (a + b),
    steps: ({ a, b }) => [`2 \\cdot (${num(a)} + ${num(b)})`, `2 \\cdot ${num(a + b)}`],
  },
  {
    id: 'bac-hai',
    title: 'Biểu thức một biến',
    tex: '4x^2 - 1',
    meaning: 'biểu thức A = 4x² − 1',
    vars: [{ name: 'x', label: 'Biến x', min: -3, max: 3, step: 0.5, start: 2 }],
    value: ({ x }) => 4 * x * x - 1,
    steps: ({ x }) => [`4 \\cdot ${put(x)}^2 - 1`, `4 \\cdot ${num(x * x)} - 1`],
  },
  {
    id: 'hai-bien',
    title: 'Biểu thức hai biến',
    tex: 'x^2 - xy + 2y - 1',
    meaning: 'biểu thức x² − xy + 2y − 1',
    vars: [
      { name: 'x', label: 'Biến x', min: -5, max: 5, step: 1, start: 3 },
      { name: 'y', label: 'Biến y', min: -5, max: 5, step: 1, start: -2 },
    ],
    value: ({ x, y }) => x * x - x * y + 2 * y - 1,
    steps: ({ x, y }) => [
      `${put(x)}^2 - ${put(x)} \\cdot ${put(y)} + 2 \\cdot ${put(y)} - 1`,
      `${num(x * x)} ${x * y < 0 ? '+' : '-'} ${num(Math.abs(x * y))} ${y < 0 ? '-' : '+'} ${num(Math.abs(2 * y))} - 1`,
    ],
  },
  {
    id: 'gap-nhau',
    title: 'Hai xe đi ngược chiều',
    tex: '120 : (x + y)',
    meaning:
      'thời gian (giờ) để hai xe cách nhau 120 km, đi ngược chiều với vận tốc x km/h và y km/h, gặp nhau',
    vars: [
      { name: 'x', label: 'Vận tốc x (km/h)', min: 10, max: 60, step: 2, start: 36 },
      { name: 'y', label: 'Vận tốc y (km/h)', min: 10, max: 60, step: 2, start: 44 },
    ],
    value: ({ x, y }) => (x + y === 0 ? null : 120 / (x + y)),
    steps: ({ x, y }) => [`120 : (${num(x)} + ${num(y)})`, `120 : ${num(x + y)}`],
  },
];

/**
 * Starting values of an expression's variables.
 * @param {Expression} e
 * @returns {Record<string, number>}
 */
export function startValues(e) {
  return Object.fromEntries(e.vars.map((v) => [v.name, v.start]));
}

/**
 * Whether a value is exact to two decimals, so it can be written with '='
 * rather than '≈'.
 * @param {number} v
 */
export function isExact(v) {
  return Math.abs(v * 100 - Math.round(v * 100)) < 1e-9;
}
