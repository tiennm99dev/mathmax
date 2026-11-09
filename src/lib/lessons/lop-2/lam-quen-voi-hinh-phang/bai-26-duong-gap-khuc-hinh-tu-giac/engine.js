/**
 * The polyline board of "Đường gấp khúc": a child taps dots in order, each
 * new dot joined to the last along a row or a column, and the parts add up.
 * Every step on the board is 1 cm. A polyline must bend at every corner and
 * not touch itself; the sorter tells quadrilaterals from other figures. Pure
 * and DOM-free.
 */
import { shuffled } from '#lib/core/card-sorter.js';
import { shapeAt } from '../_shared/figures.js';

/** @typedef {{ c: number, r: number }} Spot */

export const COLS = 6;
export const ROWS = 5;

/** Names of the corners, skipping F as the book does. */
export const CORNER_NAMES = 'ABCDEGH';

/** Why a tapped dot cannot be the next corner. */
/** @typedef {'off-grid' | 'same' | 'touches' | 'straight' | 'full'} Refusal */

/**
 * The dots from `a` to `b` along a row or column, leaving out `a`.
 * @param {Spot} a @param {Spot} b
 * @returns {Spot[]}
 */
function dotsTo(a, b) {
  const n = Math.abs(b.c - a.c) + Math.abs(b.r - a.r);
  return Array.from({ length: n }, (_, i) => ({
    c: a.c + Math.sign(b.c - a.c) * (i + 1),
    r: a.r + Math.sign(b.r - a.r) * (i + 1),
  }));
}

/**
 * Why `next` cannot join the polyline, or null when it can.
 * @param {Spot[]} path
 * @param {Spot} next
 * @returns {Refusal | null}
 */
export function refusal(path, next) {
  if (path.length === 0) return null;
  if (path.length >= CORNER_NAMES.length) return 'full';
  const last = path[path.length - 1];
  if (next.c === last.c && next.r === last.r) return 'same';
  if (next.c !== last.c && next.r !== last.r) return 'off-grid';
  const used = new Set();
  for (let i = 0; i + 1 < path.length; i++) {
    used.add(`${path[i].c},${path[i].r}`);
    for (const d of dotsTo(path[i], path[i + 1])) used.add(`${d.c},${d.r}`);
  }
  used.delete(`${last.c},${last.r}`);
  if (dotsTo(last, next).some((d) => used.has(`${d.c},${d.r}`))) return 'touches';
  if (path.length >= 2) {
    const before = path[path.length - 2];
    const sameLine = (before.c === last.c) === (last.c === next.c);
    if (sameLine) return 'straight';
  }
  return null;
}

/**
 * What the child hears when a dot is refused.
 * @param {Refusal} why
 * @returns {string}
 */
export function refusalText(why) {
  return {
    'off-grid': 'Em chọn một chấm cùng hàng hoặc cùng cột với điểm cuối nhé.',
    same: 'Em đang đứng ở chấm này rồi. Chọn chấm khác nhé.',
    touches: 'Đường này chạm vào đoạn đã vẽ. Em chọn chấm khác nhé.',
    straight:
      'Đi tiếp thẳng hướng thì không gấp khúc. Đường gấp khúc phải gấp ở mỗi điểm: em rẽ sang hướng khác nhé.',
    full: 'Đường gấp khúc đã đủ dài rồi. Em xoá bớt một đoạn để vẽ tiếp.',
  }[why];
}

/**
 * The length of each part, in cm.
 * @param {Spot[]} path
 * @returns {number[]}
 */
export function partLengths(path) {
  return path.slice(1).map((p, i) => Math.abs(p.c - path[i].c) + Math.abs(p.r - path[i].r));
}

/**
 * The polyline's name, letter by letter: "ABCD".
 * @param {number} corners
 */
export function nameOf(corners) {
  return CORNER_NAMES.slice(0, corners);
}

/**
 * What the child hears about the polyline drawn so far.
 * @param {Spot[]} path
 */
export function pathText(path) {
  if (path.length === 0) return 'Chạm một chấm để đặt điểm A.';
  if (path.length === 1) return 'Chạm một chấm cùng hàng hoặc cùng cột để vẽ đoạn thẳng đầu tiên.';
  const parts = partLengths(path);
  const total = parts.reduce((s, x) => s + x, 0);
  if (parts.length === 1) return `Đoạn thẳng AB dài ${total} cm. Vẽ tiếp để có đường gấp khúc.`;
  return `Đường gấp khúc ${nameOf(path.length)} gồm ${parts.length} đoạn thẳng. Độ dài: ${parts.join(' + ')} = ${total} (cm).`;
}

/** Tasks for the board. */
export const CHALLENGES = /** @type {const} */ ([
  { parts: 2, cm: 7 },
  { parts: 3, cm: 10 },
  { parts: 4, cm: 12 },
  { parts: 5, cm: 9 },
]);

/**
 * Whether the polyline has the parts and the length asked for.
 * @param {Spot[]} path
 * @param {{ parts: number, cm: number }} challenge
 */
export function meets(path, challenge) {
  const parts = partLengths(path);
  return parts.length === challenge.parts && parts.reduce((s, x) => s + x, 0) === challenge.cm;
}

/**
 * What the child hears when the polyline has gone past the task, or '' while
 * it can still meet it (and once it has).
 * @param {Spot[]} path
 * @param {{ parts: number, cm: number }} challenge
 */
export function challengeNote(path, challenge) {
  if (meets(path, challenge)) return '';
  const parts = partLengths(path);
  const total = parts.reduce((s, x) => s + x, 0);
  if (parts.length > challenge.parts) {
    return `Thử thách cần ${challenge.parts} đoạn thẳng. Em xoá bớt đoạn nhé.`;
  }
  if (parts.length === challenge.parts || total >= challenge.cm) {
    return `Thử thách cần ${challenge.parts} đoạn thẳng, dài ${challenge.cm} cm. Em xoá đoạn cuối rồi vẽ lại nhé.`;
  }
  return '';
}

/** Drawings of the sorting cards, by card id; each shape fills a 70-unit box. */
const box = { w: 70, h: 70 };
export const FIGURE_CARDS = /** @type {Record<string, import('../_shared/figures.js').Figure>} */ ({
  vuong: { ...box, shapes: [shapeAt('square')] },
  'chu-nhat': { ...box, shapes: [shapeAt('rectangle')] },
  thang: { ...box, shapes: [shapeAt('trapezoid')] },
  lech: { ...box, shapes: [shapeAt('uneven')] },
  'tam-giac': { ...box, shapes: [shapeAt('triangle')] },
  'nam-canh': { ...box, shapes: [shapeAt('pentagon')] },
  ho: {
    ...box,
    strokes: [
      [
        { x: 8, y: 60 },
        { x: 8, y: 12 },
        { x: 62, y: 12 },
        { x: 62, y: 60 },
      ],
    ],
  },
  tron: { ...box, curves: [{ d: 'M 5 35 A 30 30 0 1 1 65 35 A 30 30 0 1 1 5 35 Z' }] },
});

/** Sorter bins. */
export const FIGURE_BINS = /** @type {const} */ ([
  { id: 'tu-giac', label: 'Hình tứ giác' },
  { id: 'khac', label: 'Không phải hình tứ giác' },
]);

const QUAD = 'Hình này khép kín, có 4 cạnh và 4 đỉnh, nên là hình tứ giác.';

const CARD_FACTS = /** @type {const} */ ({
  vuong: { bin: 'tu-giac', why: QUAD },
  'chu-nhat': { bin: 'tu-giac', why: QUAD },
  thang: { bin: 'tu-giac', why: QUAD },
  lech: { bin: 'tu-giac', why: QUAD },
  'tam-giac': { bin: 'khac', why: 'Hình này chỉ có 3 cạnh.' },
  'nam-canh': { bin: 'khac', why: 'Hình này có 5 cạnh.' },
  ho: { bin: 'khac', why: 'Đường này không khép kín, đó là đường gấp khúc.' },
  tron: { bin: 'khac', why: 'Hình tròn không có cạnh nào.' },
});

/** The cards, mixed the same way for every visitor. */
export const QUAD_CARDS = shuffled(
  Object.keys(FIGURE_CARDS).map((id, i) => ({
    id,
    label: `Hình ${i + 1}`,
    ...CARD_FACTS[/** @type {keyof typeof CARD_FACTS} */ (id)],
  })),
  26,
);
