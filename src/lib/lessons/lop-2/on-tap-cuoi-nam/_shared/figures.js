/**
 * Plain drawings of the review of geometry as data, drawn by `figure.svelte`:
 * named points, segments, curves, closed shapes, dividing strokes and labels.
 * Pure and DOM-free.
 */

/** @typedef {{ x: number, y: number }} Point */

/**
 * A drawing. `segments` name their two points from `dots`.
 * @typedef {object} Figure
 * @property {number} w
 * @property {number} h
 * @property {Array<Point & { name: string, below?: boolean }>} [dots] a name
 *   sits above its dot, or below when a line comes down onto the dot
 * @property {Array<[string, string]>} [segments]
 * @property {Array<[Point, Point, Point]>} [curves] start, bend and end of each curve
 * @property {Point[][]} [shapes] closed shapes, by their corners
 * @property {Point[][]} [strokes] unnamed straight strokes, by their points
 * @property {Array<Point & { text: string }>} [texts]
 * @property {string} say what a screen reader hears
 */

/** Runs of letters the book names points with; it skips F and J. */
export const NAME_RUNS = /** @type {const} */ (['ABCD', 'DEGH', 'GHIK', 'MNPQ', 'KLMN']);

/** Closed shapes that fit a 70-unit square from (0, 0). */
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
  hexagon: [
    { x: 20, y: 4 },
    { x: 50, y: 4 },
    { x: 68, y: 35 },
    { x: 50, y: 66 },
    { x: 20, y: 66 },
    { x: 2, y: 35 },
  ],
});

/** @typedef {keyof typeof SHAPE_MODELS} ShapeModel */

/**
 * One closed shape moved to (`x`, `y`).
 * @param {ShapeModel} model
 * @param {number} [x]
 * @param {number} [y]
 * @returns {Point[]}
 */
export function shapeAt(model, x = 0, y = 0) {
  return SHAPE_MODELS[model].map((p) => ({ x: p.x + x, y: p.y + y }));
}

/**
 * The corners of a polyline turning up and down by turns, fitted inside a
 * `w` × `h` drawing. A longer part is drawn longer, though not in proportion.
 * @param {readonly number[]} lengths
 * @param {number} [w]
 * @param {number} [h]
 * @param {number} [pad]
 * @returns {Point[]}
 */
export function zigzag(lengths, w = 320, h = 150, pad = 30) {
  const biggest = Math.max(...lengths);
  const raw = [{ x: 0, y: 0 }];
  lengths.forEach((len, i) => {
    const last = raw[raw.length - 1];
    const turn = ((i % 2 === 0 ? -1 : 1) * Math.PI) / 5;
    // A short part keeps room for its names beside a long one.
    const drawn = len + biggest / 2;
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
  { x: -14, y: -13 },
  { x: 14, y: -13 },
  { x: 14, y: 23 },
];

/**
 * A polyline named letter by letter, with each part's length written beside it.
 * @param {string} names one letter per corner
 * @param {readonly number[]} lengths in cm, one fewer than `names`, at most three parts
 * @returns {Figure}
 */
export function polylineFigure(names, lengths) {
  const corners = zigzag(lengths);
  const letters = [...names];
  const dots = corners.map((p, i) => ({ ...p, name: letters[i], below: i % 2 === 0 }));
  return {
    w: 320,
    h: 150,
    dots,
    segments: lengths.map((_, i) => /** @type {[string, string]} */ ([letters[i], letters[i + 1]])),
    texts: lengths.map((len, i) => ({
      x: (corners[i].x + corners[i + 1].x) / 2 + LABEL_SHIFT[i].x,
      y: (corners[i].y + corners[i + 1].y) / 2 + LABEL_SHIFT[i].y,
      text: `${len} cm`,
    })),
    say: `Đường gấp khúc ${names}. ${lengths.map((len, i) => `Đoạn ${letters[i]}${letters[i + 1]} dài ${len} cm`).join(', ')}.`,
  };
}
