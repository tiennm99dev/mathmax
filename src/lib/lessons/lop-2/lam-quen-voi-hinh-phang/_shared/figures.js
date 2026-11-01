/**
 * Plain drawings of the chapter "Làm quen với hình phẳng" as data: named
 * points, segments, lines, curves, closed shapes and length labels, which
 * `figure.svelte` draws. Also the geometry a child's check rests on: whether
 * three points are collinear and where a line through two points leaves the
 * drawing. Pure and DOM-free.
 */
import { cross } from '#lib/geom-engine/plane.js';

/** @typedef {{ x: number, y: number }} Point */

/**
 * A drawing. `segments` and `lines` name their points from `dots`; a line runs
 * on to the edges of the drawing, a segment stops at its two points.
 * @typedef {object} Figure
 * @property {number} w
 * @property {number} h
 * @property {Array<Point & { name: string }>} [dots]
 * @property {Array<[string, string]>} [segments]
 * @property {Array<[string, string]>} [lines]
 * @property {Array<{ d: string, name?: string, x?: number, y?: number }>} [curves]
 * @property {Point[][]} [shapes] closed shapes, by their corners
 * @property {Point[][]} [strokes] unnamed open or dividing strokes, by their points
 * @property {Array<Point & { text: string }>} [texts]
 */

/** Runs of letters the book names points with; it skips F and J. */
export const NAME_RUNS = /** @type {const} */ (['ABCD', 'DEGH', 'GHIK', 'MNPQ', 'KLMN']);

/**
 * Whether three points lie on one straight line (exact for whole coordinates).
 * @param {Point} a @param {Point} b @param {Point} c
 */
export function areCollinear(a, b, c) {
  return cross(a, b, c) === 0;
}

/**
 * Where the straight line through `a` and `b` meets the edges of a `w` × `h`
 * drawing. `a` and `b` must be different points inside it.
 * @param {Point} a @param {Point} b @param {number} w @param {number} h
 * @returns {[Point, Point]}
 */
export function lineThrough(a, b, w, h) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  let lo = -Infinity;
  let hi = Infinity;
  for (const [from, d, size] of [
    [a.x, dx, w],
    [a.y, dy, h],
  ]) {
    if (d === 0) continue;
    const t0 = (0 - from) / d;
    const t1 = (size - from) / d;
    lo = Math.max(lo, Math.min(t0, t1));
    hi = Math.min(hi, Math.max(t0, t1));
  }
  return [
    { x: a.x + lo * dx, y: a.y + lo * dy },
    { x: a.x + hi * dx, y: a.y + hi * dy },
  ];
}

/**
 * A wavy curve from left to right around height `y`.
 * @param {number} y @param {number} [left] @param {number} [right] @param {number} [bend]
 */
export function wave(y, left = 30, right = 250, bend = 28) {
  const third = (right - left) / 3;
  return `M ${left} ${y} C ${left + third} ${y - bend}, ${left + 2 * third} ${y + bend}, ${right} ${y}`;
}

/** Added to each part's length when drawing, so a short part keeps room for its names. */
const MIN_DRAWN = 4;

/**
 * The corners of a polyline turning up and down by turns, fitted inside a
 * `w` × `h` drawing. A longer part is drawn longer, though not in proportion.
 * @param {number[]} lengths
 * @param {number} [w] @param {number} [h] @param {number} [pad]
 * @returns {Point[]}
 */
export function zigzag(lengths, w = 320, h = 150, pad = 30) {
  const raw = [{ x: 0, y: 0 }];
  lengths.forEach((len, i) => {
    const last = raw[raw.length - 1];
    const turn = ((i % 2 === 0 ? -1 : 1) * Math.PI) / 5;
    const drawn = len + MIN_DRAWN;
    raw.push({ x: last.x + drawn * Math.cos(turn), y: last.y + drawn * Math.sin(turn) });
  });
  const xs = raw.map((p) => p.x);
  const ys = raw.map((p) => p.y);
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
  const scale = Math.min((w - 2 * pad) / (x1 - x0), (h - 2 * pad) / (y1 - y0 || 1));
  const left = (w - (x1 - x0) * scale) / 2;
  const top = (h - (y1 - y0) * scale) / 2;
  return raw.map((p) => ({ x: left + (p.x - x0) * scale, y: top + (p.y - y0) * scale }));
}

/** Where each part's length sits from its midpoint: on the outer side of each bend. */
const LABEL_SHIFT = [
  { x: -13, y: -13 },
  { x: 13, y: -13 },
  { x: 13, y: 23 },
];

/**
 * A polyline named letter by letter, with each part's length written beside it.
 * @param {string} names one letter per corner
 * @param {number[]} lengths in cm, one fewer than `names`, at most three parts
 * @returns {Figure}
 */
export function polylineFigure(names, lengths) {
  const corners = zigzag(lengths);
  const letters = [...names];
  const dots = corners.map((p, i) => ({ ...p, name: letters[i] }));
  return {
    w: 320,
    h: 150,
    dots,
    segments: lengths.map((_, i) => [letters[i], letters[i + 1]]),
    texts: lengths.map((len, i) => ({
      x: (corners[i].x + corners[i + 1].x) / 2 + LABEL_SHIFT[i].x,
      y: (corners[i].y + corners[i + 1].y) / 2 + LABEL_SHIFT[i].y,
      text: `${len} cm`,
    })),
  };
}

/** Closed shapes that fit a 70-unit square from (0, 0), by number of corners. */
export const SHAPE_MODELS = /** @type {const} */ ({
  triangle: [
    { x: 35, y: 4 },
    { x: 68, y: 66 },
    { x: 2, y: 66 },
  ],
  square: [
    { x: 8, y: 8 },
    { x: 62, y: 8 },
    { x: 62, y: 62 },
    { x: 8, y: 62 },
  ],
  rectangle: [
    { x: 2, y: 18 },
    { x: 68, y: 18 },
    { x: 68, y: 52 },
    { x: 2, y: 52 },
  ],
  trapezoid: [
    { x: 18, y: 12 },
    { x: 52, y: 12 },
    { x: 68, y: 58 },
    { x: 2, y: 58 },
  ],
  uneven: [
    { x: 10, y: 6 },
    { x: 66, y: 22 },
    { x: 50, y: 64 },
    { x: 2, y: 48 },
  ],
  diamond: [
    { x: 35, y: 2 },
    { x: 68, y: 35 },
    { x: 35, y: 68 },
    { x: 2, y: 35 },
  ],
  pentagon: [
    { x: 35, y: 2 },
    { x: 68, y: 26 },
    { x: 55, y: 66 },
    { x: 15, y: 66 },
    { x: 2, y: 26 },
  ],
});

/**
 * One closed shape moved to (`x`, `y`).
 * @param {keyof typeof SHAPE_MODELS} model
 * @param {number} [x] @param {number} [y]
 * @returns {Point[]}
 */
export function shapeAt(model, x = 0, y = 0) {
  return SHAPE_MODELS[model].map((p) => ({ x: p.x + x, y: p.y + y }));
}

/**
 * What a screen reader hears for a figure: what is drawn, in words.
 * @param {Figure} figure
 */
export function figureText(figure) {
  const parts = [];
  for (const [a, b] of figure.segments ?? []) parts.push(`đoạn nối ${a} với ${b}`);
  for (const [a, b] of figure.lines ?? []) {
    parts.push(`đường thẳng đi qua ${a} và ${b}, kéo dài về hai phía`);
  }
  for (const _ of figure.curves ?? []) parts.push('đường uốn cong');
  for (const corners of figure.shapes ?? []) parts.push(`hình ${corners.length} cạnh`);
  for (const pts of figure.strokes ?? []) parts.push(`nét vẽ gồm ${pts.length - 1} đoạn`);
  for (const t of figure.texts ?? []) parts.push(`số đo ${t.text}`);
  const named = (figure.dots ?? []).map((d) => d.name);
  const dots = named.length > 0 ? `Các điểm ${named.join(', ')}. ` : '';
  return `${dots}${parts.join('; ')}.`;
}
