/**
 * Expressions with letters (biểu thức chứa chữ) of grade 4: one, two or
 * three letters, each replaced by a number to get one value of the
 * expression. Each expression knows how to write itself with the numbers put
 * in and the steps to its value, the book's way: "Nếu a = 5 thì a × 4 =
 * 5 × 4 = 20." Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/** @typedef {'a' | 'b' | 'c'} Letter */
/** @typedef {Partial<Record<Letter, number>>} Values */

/**
 * @typedef {object} Expression
 * @property {string} id
 * @property {string} text the expression with letters
 * @property {string} meaning what the expression measures, or ''
 * @property {'square' | 'rect' | 'triangle' | 'none'} shape the figure drawn
 * @property {ReadonlyArray<{ letter: Letter, name: string, min: number, max: number, start: number }>} letters
 * @property {(v: Required<Values>) => number} value the value for given letters
 * @property {(v: Required<Values>) => string[]} written each step written with numbers
 * @property {{ values: Values, ask: string }} goal a value the child is asked to reach
 */

/** @type {ReadonlyArray<Expression>} */
export const EXPRESSIONS = [
  {
    id: 'square',
    text: 'a × 4',
    meaning: 'chu vi hình vuông cạnh a',
    shape: 'square',
    letters: [{ letter: 'a', name: 'cạnh a', min: 1, max: 20, start: 5 }],
    value: ({ a }) => a * 4,
    written: ({ a }) => [`${a} × 4`],
    goal: { values: { a: 9 }, ask: 'Em tìm a để chu vi hình vuông là 36 cm.' },
  },
  {
    id: 'mixed',
    text: '35 + 5 × a',
    meaning: '',
    shape: 'none',
    letters: [{ letter: 'a', name: 'a', min: 0, max: 10, start: 2 }],
    value: ({ a }) => 35 + 5 * a,
    written: ({ a }) => [`35 + 5 × ${a}`, `35 + ${5 * a}`],
    goal: { values: { a: 6 }, ask: 'Em tìm a để biểu thức có giá trị là 65.' },
  },
  {
    id: 'rect',
    text: '(a + b) × 2',
    meaning: 'chu vi hình chữ nhật chiều dài a, chiều rộng b',
    shape: 'rect',
    letters: [
      { letter: 'a', name: 'chiều dài a', min: 1, max: 30, start: 10 },
      { letter: 'b', name: 'chiều rộng b', min: 1, max: 30, start: 7 },
    ],
    value: ({ a, b }) => (a + b) * 2,
    written: ({ a, b }) => [`(${a} + ${b}) × 2`, `${a + b} × 2`],
    goal: { values: { a: 25, b: 16 }, ask: 'Em đặt chiều dài 25 cm, chiều rộng 16 cm.' },
  },
  {
    id: 'triangle',
    text: 'a + b + c',
    meaning: 'chu vi hình tam giác có ba cạnh a, b, c',
    shape: 'triangle',
    letters: [
      { letter: 'a', name: 'cạnh a', min: 1, max: 30, start: 6 },
      { letter: 'b', name: 'cạnh b', min: 1, max: 30, start: 8 },
      { letter: 'c', name: 'cạnh c', min: 1, max: 30, start: 10 },
    ],
    value: ({ a, b, c }) => a + b + c,
    written: ({ a, b, c }) => [`${a} + ${b} + ${c}`],
    goal: { values: { a: 12, b: 15, c: 20 }, ask: 'Em đặt ba cạnh 12 cm, 15 cm, 20 cm.' },
  },
];

/**
 * "a = 10, b = 7".
 * @param {Expression} e
 * @param {Values} v
 */
export const givenText = (e, v) =>
  e.letters.map(({ letter }) => `${letter} = ${v[letter]}`).join(', ');

/**
 * The book's sentence: "Nếu a = 10, b = 7 thì (a + b) × 2 = (10 + 7) × 2 =
 * 17 × 2 = 34."
 * @param {Expression} e
 * @param {Required<Values>} v
 */
export function substitution(e, v) {
  const steps = [...e.written(v), fmt(e.value(v))];
  return `Nếu ${givenText(e, v)} thì ${e.text} = ${steps.join(' = ')}.`;
}

/**
 * Starting values of an expression's letters, with the others at 0.
 * @param {Expression} e
 * @returns {Required<Values>}
 */
export function startValues(e) {
  /** @type {Required<Values>} */
  const v = { a: 0, b: 0, c: 0 };
  for (const { letter, start } of e.letters) v[letter] = start;
  return v;
}

/**
 * Whether the letters match the goal of an expression.
 * @param {Expression} e
 * @param {Values} v
 */
export const reachedGoal = (e, v) =>
  e.letters.every(({ letter }) => v[letter] === e.goal.values[letter]);
