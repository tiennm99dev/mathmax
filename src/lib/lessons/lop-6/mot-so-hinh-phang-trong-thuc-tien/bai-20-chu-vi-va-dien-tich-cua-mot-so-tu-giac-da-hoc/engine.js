/**
 * Cut-and-rearrange pictures behind three area formulas. Coordinates are in
 * centimetres with y pointing up; `t` runs from 0 (shape as drawn) to 1
 * (pieces rearranged). Every piece moves rigidly, so its area never changes.
 *
 * - Parallelogram: the right triangle cut off along the height slides to
 *   the other side, giving a rectangle a × h.
 * - Rhombus: cut along the diagonal m, then the lower half along the
 *   diagonal n; the two small triangles slide up into the corners, giving a
 *   rectangle m × n/2.
 * - Trapezoid: a copy turned half a turn (ending where a half-turn about the
 *   midpoint of a leg puts it) joins it into a parallelogram (a + b) × h, twice the trapezoid.
 */

/** @typedef {{ x: number, y: number }} Pt */
/** @typedef {{ pts: Pt[], role: 'still' | 'moving' | 'copy' }} Piece */

/**
 * @param {Pt[]} pts
 * @param {number} dx
 * @param {number} dy
 */
const shift = (pts, dx, dy) => pts.map((p) => ({ x: p.x + dx, y: p.y + dy }));

/**
 * Rotates points about c by angle (radians, anticlockwise).
 * @param {Pt[]} pts
 * @param {Pt} c
 * @param {number} angle
 */
function rotate(pts, c, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return pts.map((p) => ({
    x: c.x + (p.x - c.x) * cos - (p.y - c.y) * sin,
    y: c.y + (p.x - c.x) * sin + (p.y - c.y) * cos,
  }));
}

/**
 * Parallelogram ABCD with base AB = a, height h, top side shifted right by s
 * (0 < s ≤ a so the foot H of the height from D lies on AB).
 * @param {number} a
 * @param {number} h
 * @param {number} s
 * @param {number} t
 * @returns {Piece[]}
 */
export function parallelogramPieces(a, h, s, t) {
  return [
    {
      role: 'still',
      pts: [
        { x: s, y: 0 },
        { x: a, y: 0 },
        { x: a + s, y: h },
        { x: s, y: h },
      ],
    },
    {
      role: 'moving',
      pts: shift(
        [
          { x: 0, y: 0 },
          { x: s, y: 0 },
          { x: s, y: h },
        ],
        a * t,
        0,
      ),
    },
  ];
}

/**
 * Rhombus with horizontal diagonal m and vertical diagonal n, centred at the
 * origin.
 * @param {number} m
 * @param {number} n
 * @param {number} t
 * @returns {Piece[]}
 */
export function rhombusPieces(m, n, t) {
  const L = { x: -m / 2, y: 0 };
  const R = { x: m / 2, y: 0 };
  const T = { x: 0, y: n / 2 };
  const B = { x: 0, y: -n / 2 };
  const O = { x: 0, y: 0 };
  return [
    { role: 'still', pts: [L, R, T] },
    { role: 'moving', pts: shift([O, R, B], (-m / 2) * t, (n / 2) * t) },
    { role: 'moving', pts: shift([O, L, B], (m / 2) * t, (n / 2) * t) },
  ];
}

/**
 * Isosceles trapezoid with bases a (bottom) and b (top, b < a) and height h,
 * plus its copy turned by t half-turns about the midpoint of leg BC.
 * @param {number} a
 * @param {number} b
 * @param {number} h
 * @param {number} t
 * @returns {Piece[]}
 */
export function trapezoidPieces(a, b, h, t) {
  const s = (a - b) / 2;
  const pts = [
    { x: 0, y: 0 },
    { x: a, y: 0 },
    { x: s + b, y: h },
    { x: s, y: h },
  ];
  const M = { x: (a + s + b) / 2, y: h / 2 };
  // Turning about M sweeps far off the board, so the copy turns about its own
  // centre while that centre slides to its final place 2M - G. At t = 1 this
  // is exactly the half-turn about M.
  const G = { x: pts.reduce((v, p) => v + p.x, 0) / 4, y: pts.reduce((v, p) => v + p.y, 0) / 4 };
  const turned = rotate(pts, G, -Math.PI * t);
  const copy = shift(turned, 2 * (M.x - G.x) * t, 2 * (M.y - G.y) * t);
  return [
    { role: 'still', pts },
    { role: 'copy', pts: copy },
  ];
}

/**
 * Area of a polygon (shoelace formula).
 * @param {Pt[]} pts
 */
export function polygonArea(pts) {
  let sum = 0;
  for (let i = 0; i < pts.length; i++) {
    const q = pts[(i + 1) % pts.length];
    sum += pts[i].x * q.y - q.x * pts[i].y;
  }
  return Math.abs(sum) / 2;
}

/**
 * The smallest axis-aligned box around some pieces.
 * @param {Piece[]} pieces
 */
export function bounds(pieces) {
  const all = pieces.flatMap((p) => p.pts);
  const xs = all.map((p) => p.x);
  const ys = all.map((p) => p.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}
