/**
 * Perspective similarity (hình đồng dạng phối cảnh) with centre O and ratio
 * k > 0: every point M goes to the point M′ on ray OM with OM′ = k · OM.
 * Pure helpers for the widget; points are SVG points.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

/**
 * The image M′ of M: on ray OM, with OM′ = k · OM.
 * @param {Pt} o @param {number} k @param {Pt} m
 * @returns {Pt}
 */
export function image(o, k, m) {
  return { x: o.x + k * (m.x - o.x), y: o.y + k * (m.y - o.y) };
}

/**
 * Images of all the vertices of a polygon.
 * @param {Pt} o @param {number} k @param {Pt[]} pts
 */
export function imagePolygon(o, k, pts) {
  return pts.map((p) => image(o, k, p));
}

/** @param {Pt} p @param {Pt} q */
export function dist(p, q) {
  return Math.hypot(q.x - p.x, q.y - p.y);
}

/**
 * Perimeter of a closed polygon.
 * @param {Pt[]} pts
 */
export function perimeter(pts) {
  return pts.reduce((sum, p, i) => sum + dist(p, pts[(i + 1) % pts.length]), 0);
}

/**
 * Starting shapes, in SVG units on a 20-unit grid: a triangle, a house and
 * an arrow. Vertex names follow the order of the points.
 */
export const SHAPES = {
  'tam-giac': [
    { x: 220, y: 120 },
    { x: 260, y: 180 },
    { x: 200, y: 180 },
  ],
  nha: [
    { x: 220, y: 100 },
    { x: 250, y: 130 },
    { x: 250, y: 170 },
    { x: 190, y: 170 },
    { x: 190, y: 130 },
  ],
  'mui-ten': [
    { x: 190, y: 140 },
    { x: 230, y: 140 },
    { x: 230, y: 120 },
    { x: 260, y: 150 },
    { x: 230, y: 180 },
    { x: 230, y: 160 },
    { x: 190, y: 160 },
  ],
};
