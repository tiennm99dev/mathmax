/**
 * The dot board of "Ba điểm thẳng hàng": three named points sit on the dots
 * of a board and the check says whether they lie on one straight line, and
 * which is in the middle. The card deck sorts segments, lines and curves.
 * Works in SVG units, all whole numbers. Pure and DOM-free.
 */
import { shuffled } from '#lib/core/card-sorter.js';
import { areCollinear, wave } from '../_shared/figures.js';

/** @typedef {import('../_shared/figures.js').Point} Point */
/** @typedef {{ A: Point, B: Point, C: Point }} Trio */

export const COLS = 7;
export const ROWS = 5;
export const STEP = 50;
export const PAD = 30;
export const WIDTH = PAD * 2 + STEP * (COLS - 1);
export const HEIGHT = PAD * 2 + STEP * (ROWS - 1);

/**
 * The dot in column `c`, row `r`.
 * @param {number} c @param {number} r
 * @returns {Point}
 */
export function dot(c, r) {
  return { x: PAD + c * STEP, y: PAD + r * STEP };
}

/**
 * The dots of the board.
 * @returns {Point[]}
 */
export function allDots() {
  const dots = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) dots.push(dot(c, r));
  return dots;
}

/**
 * The free dot nearest to `p`, so a dragged point lands on the board and
 * never on another point.
 * @param {Point} p
 * @param {Point[]} taken
 * @returns {Point}
 */
export function nearestFree(p, taken) {
  let best = dot(0, 0);
  let bestD = Infinity;
  for (const d of allDots()) {
    if (taken.some((t) => t.x === d.x && t.y === d.y)) continue;
    const dist = (d.x - p.x) ** 2 + (d.y - p.y) ** 2;
    if (dist < bestD) {
      best = d;
      bestD = dist;
    }
  }
  return best;
}

/**
 * Where an arrow key takes a point: one dot along, or nowhere when that is
 * off the board or taken.
 * @param {Point} p
 * @param {number} dx @param {number} dy
 * @param {Point[]} taken
 * @returns {Point}
 */
export function stepDot(p, dx, dy, taken) {
  const next = { x: p.x + dx * STEP, y: p.y + dy * STEP };
  const inside = next.x >= PAD && next.x <= WIDTH - PAD && next.y >= PAD && next.y <= HEIGHT - PAD;
  const free = !taken.some((t) => t.x === next.x && t.y === next.y);
  return inside && free ? next : p;
}

/**
 * Whether the three points are collinear.
 * @param {Trio} t
 */
export function inLine(t) {
  return areCollinear(t.A, t.B, t.C);
}

/**
 * The name of the point between the other two, when they are collinear.
 * @param {Trio} t
 * @returns {'A' | 'B' | 'C' | null}
 */
export function middleOf(t) {
  if (!inLine(t)) return null;
  const names = /** @type {const} */ (['A', 'B', 'C']);
  for (const n of names) {
    const [u, v] = names.filter((m) => m !== n).map((m) => t[m]);
    const dot = (u.x - t[n].x) * (v.x - t[n].x) + (u.y - t[n].y) * (v.y - t[n].y);
    if (dot < 0) return n;
  }
  return null;
}

/**
 * Whether the line runs neither along a row nor along a column of the board.
 * @param {Trio} t
 */
export function isSlanted(t) {
  return inLine(t) && t.A.x !== t.B.x && t.A.y !== t.B.y;
}

/**
 * A task on the board, each starting from a position that does not meet it yet.
 * @typedef {object} Goal
 * @property {string} id
 * @property {string} text
 * @property {string} done
 * @property {Trio} start
 * @property {(t: Trio) => boolean} met
 */

/** @type {readonly Goal[]} */
export const GOALS = [
  {
    id: 'thang-hang',
    text: 'Kéo một điểm để ba điểm A, B, C thẳng hàng.',
    done: 'Ba điểm A, B, C cùng nằm trên một đường thẳng. Ba điểm A, B, C thẳng hàng.',
    start: { A: dot(1, 1), B: dot(3, 1), C: dot(4, 3) },
    met: inLine,
  },
  {
    id: 'khong-thang-hang',
    text: 'Kéo một điểm để ba điểm A, B, C không thẳng hàng.',
    done: 'Không có đường thẳng nào đi qua cả ba điểm. Ba điểm A, B, C không thẳng hàng.',
    start: { A: dot(1, 2), B: dot(3, 2), C: dot(5, 2) },
    met: (t) => !inLine(t),
  },
  {
    id: 'o-giua',
    text: 'Kéo các điểm để ba điểm thẳng hàng và điểm B ở giữa A và C.',
    done: 'Ba điểm thẳng hàng, điểm B nằm giữa hai điểm A và C.',
    start: { A: dot(1, 3), B: dot(5, 3), C: dot(3, 1) },
    met: (t) => middleOf(t) === 'B',
  },
  {
    id: 'duong-xien',
    text: 'Xếp ba điểm thẳng hàng trên một đường xiên, không theo hàng ngang, không theo cột dọc.',
    done: 'Đường thẳng có thể nằm xiên. Ba điểm A, B, C vẫn thẳng hàng.',
    start: { A: dot(1, 1), B: dot(1, 3), C: dot(4, 3) },
    met: isSlanted,
  },
];

/**
 * What the child hears about the three points right now.
 * @param {Trio} t
 */
export function trioText(t) {
  if (!inLine(t)) {
    return 'Điểm C không nằm trên đường thẳng đi qua A và B. Ba điểm A, B, C không thẳng hàng.';
  }
  return `Ba điểm A, B, C thẳng hàng. Điểm ${middleOf(t)} ở giữa.`;
}

/** The drawings of the sorting cards, by card id. */
export const LINE_FIGURES = /** @type {Record<string, import('../_shared/figures.js').Figure>} */ ({
  'doan-1': {
    w: 100,
    h: 70,
    dots: [
      { name: 'A', x: 16, y: 44 },
      { name: 'B', x: 84, y: 44 },
    ],
    segments: [['A', 'B']],
  },
  'doan-2': {
    w: 100,
    h: 70,
    dots: [
      { name: 'M', x: 20, y: 28 },
      { name: 'N', x: 76, y: 60 },
    ],
    segments: [['M', 'N']],
  },
  'thang-1': {
    w: 100,
    h: 70,
    dots: [
      { name: 'C', x: 32, y: 44 },
      { name: 'D', x: 68, y: 44 },
    ],
    lines: [['C', 'D']],
  },
  'thang-2': {
    w: 100,
    h: 70,
    dots: [
      { name: 'P', x: 36, y: 26 },
      { name: 'Q', x: 64, y: 54 },
    ],
    lines: [['P', 'Q']],
  },
  'cong-1': { w: 100, h: 70, curves: [{ d: wave(38, 8, 92, 40), name: 'x', x: 84, y: 22 }] },
  'cong-2': {
    w: 100,
    h: 70,
    curves: [{ d: 'M 10 60 Q 50 -14 90 60', name: 'y', x: 46, y: 62 }],
  },
});

/** Bins of the sorter, in the book's order. */
export const LINE_BINS = /** @type {const} */ ([
  { id: 'doan', label: 'Đoạn thẳng' },
  { id: 'thang', label: 'Đường thẳng' },
  { id: 'cong', label: 'Đường cong' },
]);

const WHY = {
  doan: 'Đường này thẳng và dừng lại ở hai điểm, nên là đoạn thẳng.',
  thang: 'Đường này thẳng và kéo dài về hai phía, nên là đường thẳng.',
  cong: 'Đường này uốn cong, nên là đường cong.',
};

/** The cards, mixed the same way for every visitor. */
export const LINE_CARDS = shuffled(
  Object.keys(LINE_FIGURES).map((id, i) => {
    const bin = /** @type {keyof typeof WHY} */ (id.split('-')[0]);
    return { id, label: `Hình ${i + 1}`, bin, why: WHY[bin] };
  }),
  25,
);
