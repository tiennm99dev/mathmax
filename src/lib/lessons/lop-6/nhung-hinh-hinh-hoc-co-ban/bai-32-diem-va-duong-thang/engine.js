/**
 * Points and lines on a whole-number grid: whether three points are
 * collinear, how two lines lie (cut, parallel or the same line) and where a
 * line crosses the edges of the drawing. Grid coordinates are integers, so
 * every test is exact.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ kind: 'khong-xac-dinh' }
 *   | { kind: 'trung-nhau' }
 *   | { kind: 'song-song' }
 *   | { kind: 'cat-nhau', point: Pt }} Relation
 */

/** @param {Pt} u @param {Pt} v */
const det = (u, v) => u.x * v.y - u.y * v.x;

/** @param {Pt} a @param {Pt} b */
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });

/**
 * Whether two points are the same point.
 * @param {Pt} p @param {Pt} q
 */
export function same(p, q) {
  return p.x === q.x && p.y === q.y;
}

/**
 * Whether p lies on the line through a and b (a and b distinct).
 * @param {Pt} p @param {Pt} a @param {Pt} b
 */
export function onLine(p, a, b) {
  return det(sub(b, a), sub(p, a)) === 0;
}

/**
 * Whether three distinct points lie on one line. Two equal points give
 * false: the lesson speaks of three different points.
 * @param {Pt} a @param {Pt} b @param {Pt} c
 */
export function collinear(a, b, c) {
  if (same(a, b) || same(b, c) || same(a, c)) return false;
  return onLine(c, a, b);
}

/**
 * How the line AB and the line CD lie. A line needs two different points,
 * so a coinciding pair gives 'khong-xac-dinh'.
 * @param {Pt} a @param {Pt} b @param {Pt} c @param {Pt} d
 * @returns {Relation}
 */
export function lineRelation(a, b, c, d) {
  if (same(a, b) || same(c, d)) return { kind: 'khong-xac-dinh' };
  const u = sub(b, a);
  const v = sub(d, c);
  const cross = det(u, v);
  if (cross === 0) {
    return onLine(c, a, b) ? { kind: 'trung-nhau' } : { kind: 'song-song' };
  }
  const t = det(sub(c, a), v) / cross;
  return { kind: 'cat-nhau', point: { x: a.x + t * u.x, y: a.y + t * u.y } };
}

/**
 * Where the ray from `o` in direction `d` leaves the rectangle
 * [x0, x1] × [y0, y1]; `o` must lie inside it.
 * @param {Pt} o @param {Pt} d
 * @param {{ x0: number, y0: number, x1: number, y1: number }} r
 * @returns {Pt}
 */
export function rayExit(o, d, r) {
  let t = Infinity;
  if (d.x > 0) t = Math.min(t, (r.x1 - o.x) / d.x);
  if (d.x < 0) t = Math.min(t, (r.x0 - o.x) / d.x);
  if (d.y > 0) t = Math.min(t, (r.y1 - o.y) / d.y);
  if (d.y < 0) t = Math.min(t, (r.y0 - o.y) / d.y);
  if (!Number.isFinite(t)) return { ...o };
  return { x: o.x + t * d.x, y: o.y + t * d.y };
}

/**
 * The visible piece of the line through a and b, clipped to the rectangle.
 * @param {Pt} a @param {Pt} b
 * @param {{ x0: number, y0: number, x1: number, y1: number }} r
 * @returns {[Pt, Pt]}
 */
export function lineInRect(a, b, r) {
  const d = sub(b, a);
  return [rayExit(a, d, r), rayExit(a, { x: -d.x, y: -d.y }, r)];
}

/**
 * Whether a point lies inside the rectangle (edges included).
 * @param {Pt} p @param {{ x0: number, y0: number, x1: number, y1: number }} r
 */
export function inRect(p, r) {
  return p.x >= r.x0 && p.x <= r.x1 && p.y >= r.y0 && p.y <= r.y1;
}
