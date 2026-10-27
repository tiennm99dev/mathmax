/**
 * Pure logic for the card designer and the classroom light check.
 *
 * Light index of a classroom, as in the activity: S1 is the floor area, S2 the
 * total area of the openings (doors and windows), and A = S2 / S1 · 100. The
 * room has enough daylight when A ≥ 20.
 */

/** The light index a room must reach. */
export const LIGHT_STANDARD = 20;

/**
 * @typedef {{ width: number, height: number, count: number }} Opening
 * A group of identical rectangular openings, sizes in metres.
 */

/**
 * Rounds away floating-point noise from sums of decimals (0.1 + 0.2).
 * @param {number} v
 */
export function tidy(v) {
  return Math.round(v * 1e9) / 1e9;
}

/**
 * @param {number} length
 * @param {number} width
 * @param {Opening[]} openings
 */
export function roomReport(length, width, openings) {
  const floor = tidy(length * width);
  const parts = openings.map((o) => tidy(o.width * o.height * o.count));
  const open = tidy(parts.reduce((s, p) => s + p, 0));
  const index = floor > 0 ? (open / floor) * 100 : 0;
  return { floor, parts, open, index, ok: index >= LIGHT_STANDARD };
}

/**
 * Smallest number of extra windows of the given size needed to reach the
 * standard, 0 when the room already meets it.
 * @param {number} floor S1 in m²
 * @param {number} open S2 in m²
 * @param {number} windowArea area of one extra window in m²
 */
export function windowsNeeded(floor, open, windowArea) {
  const missing = (floor * LIGHT_STANDARD) / 100 - open;
  if (missing <= 1e-9) return 0;
  return Math.ceil(tidy(missing / windowArea));
}

/**
 * @typedef {object} CardShape
 * @property {string} name Vietnamese name
 * @property {number} w width of its bounding box, cm
 * @property {number} h height of its bounding box, cm
 * @property {number} area cm²
 * @property {string} formula how the area is found, plain text
 * @property {Array<[number, number]>} pts outline inside the box, from its top-left corner, cm
 */

/** Shapes the card designer offers, all with an area formula from chapter IV. */
/** @type {Record<string, CardShape>} */
export const CARD_SHAPES = {
  vuong: {
    name: 'Hình vuông',
    w: 2,
    h: 2,
    area: 4,
    formula: '2 · 2 = 4',
    pts: [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ],
  },
  'chu-nhat': {
    name: 'Hình chữ nhật',
    w: 3,
    h: 2,
    area: 6,
    formula: '3 · 2 = 6',
    pts: [
      [0, 0],
      [3, 0],
      [3, 2],
      [0, 2],
    ],
  },
  thoi: {
    name: 'Hình thoi',
    w: 2,
    h: 4,
    area: 4,
    formula: '½ · 2 · 4 = 4',
    pts: [
      [1, 0],
      [2, 2],
      [1, 4],
      [0, 2],
    ],
  },
  'binh-hanh': {
    name: 'Hình bình hành',
    w: 4,
    h: 2,
    area: 6,
    formula: '3 · 2 = 6',
    pts: [
      [1, 0],
      [4, 0],
      [3, 2],
      [0, 2],
    ],
  },
  'thang-can': {
    name: 'Hình thang cân',
    w: 4,
    h: 2,
    area: 6,
    formula: '(4 + 2) · 2 : 2 = 6',
    pts: [
      [1, 0],
      [3, 0],
      [4, 2],
      [0, 2],
    ],
  },
};

/**
 * Keeps a shape's top-left corner so the whole shape stays inside the left
 * half of the card, snapped to half centimetres.
 * @param {CardShape} shape
 * @param {number} x
 * @param {number} y
 * @param {number} half width of the left half, cm
 * @param {number} height card height, cm
 */
export function placeInHalf(shape, x, y, half, height) {
  const snapHalf = (/** @type {number} */ v) => Math.round(v * 2) / 2;
  return {
    x: Math.min(Math.max(snapHalf(x), 0), half - shape.w),
    y: Math.min(Math.max(snapHalf(y), 0), height - shape.h),
  };
}

/**
 * Outline of a placed shape and of its mirror image across the fold line
 * x = `axis`, in card centimetres.
 * @param {CardShape} shape
 * @param {number} x
 * @param {number} y
 * @param {number} axis
 */
export function placedOutlines(shape, x, y, axis) {
  const left = shape.pts.map(([px, py]) => ({ x: x + px, y: y + py }));
  const right = left.map((p) => ({ x: 2 * axis - p.x, y: p.y }));
  return { left, right };
}

/**
 * Whether two convex polygons overlap with positive area (touching along an
 * edge or at a corner does not count), by the separating axis test.
 * @param {Array<{ x: number, y: number }>} p
 * @param {Array<{ x: number, y: number }>} q
 */
export function convexOverlap(p, q) {
  for (const poly of [p, q]) {
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      const nx = b.y - a.y;
      const ny = a.x - b.x;
      const range = (/** @type {Array<{ x: number, y: number }>} */ pts) => {
        const v = pts.map((t) => t.x * nx + t.y * ny);
        return [Math.min(...v), Math.max(...v)];
      };
      const [p0, p1] = range(p);
      const [q0, q1] = range(q);
      if (p1 <= q0 + 1e-9 || q1 <= p0 + 1e-9) return false;
    }
  }
  return true;
}
