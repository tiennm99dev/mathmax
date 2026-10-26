/**
 * The function machine of the lesson: a few functions y = f(x) to feed
 * values into, the coordinates of a point read the book's way, and the
 * pieces of a graph that lie inside the drawn window.
 */

/**
 * @typedef {object} Fn
 * @property {string} id
 * @property {string} tex
 * @property {string} text plain text for screen readers
 * @property {(x: number) => number} f
 */

/** @type {Fn[]} */
export const FUNCTIONS = [
  { id: 'bac-nhat', tex: 'y = 2x - 1', text: 'y = 2x − 1', f: (x) => 2 * x - 1 },
  { id: 'giam', tex: 'y = -x + 3', text: 'y = −x + 3', f: (x) => -x + 3 },
  { id: 'binh-phuong', tex: 'y = x^2 - 4', text: 'y = x² − 4', f: (x) => x * x - 4 },
  { id: 'hang', tex: 'y = 3', text: 'y = 3', f: () => 3 },
];

/**
 * Where a point lies: on an axis, at the origin, or in a quadrant.
 * @param {number} x
 * @param {number} y
 */
export function place(x, y) {
  if (x === 0 && y === 0) return 'là gốc toạ độ O';
  if (y === 0) return 'nằm trên trục hoành Ox';
  if (x === 0) return 'nằm trên trục tung Oy';
  const q = x > 0 ? (y > 0 ? 'I' : 'IV') : y > 0 ? 'II' : 'III';
  return `nằm trong góc phần tư thứ ${q}`;
}

/**
 * Samples of y = f(x) on [xMin, xMax] split into runs that stay inside
 * [yMin, yMax], for drawing the graph as polylines.
 * @param {(x: number) => number} f
 * @param {{ xMin: number, xMax: number, yMin: number, yMax: number }} box
 * @param {number} [steps]
 * @returns {Array<Array<{ x: number, y: number }>>}
 */
export function graphRuns(f, box, steps = 200) {
  /** @type {Array<Array<{ x: number, y: number }>>} */
  const runs = [];
  /** @type {Array<{ x: number, y: number }>} */
  let run = [];
  for (let i = 0; i <= steps; i++) {
    const x = box.xMin + ((box.xMax - box.xMin) * i) / steps;
    const y = f(x);
    if (y >= box.yMin && y <= box.yMax) {
      run.push({ x, y });
    } else if (run.length) {
      runs.push(run);
      run = [];
    }
  }
  if (run.length) runs.push(run);
  return runs.filter((r) => r.length > 1);
}

/** Points the learner is asked to place, in the book's notation. */
export const TARGETS = [
  { x: 3, y: 2 },
  { x: -4, y: 1 },
  { x: -2, y: -5 },
  { x: 5, y: -3 },
  { x: 0, y: -4 },
  { x: 6, y: 0 },
];
