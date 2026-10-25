/**
 * Points on one line xy, each given by its abscissa (x grows towards y):
 * which point lies between the other two, which side of O a point is on and
 * how the rays OA and OB lie.
 *
 * @typedef {{ name: string, x: number }} LinePoint
 */

/**
 * The point that lies between the other two, or null when two of them
 * coincide.
 * @param {LinePoint[]} pts exactly three points
 * @returns {{ middle: LinePoint, ends: [LinePoint, LinePoint] } | null}
 */
export function middleOf(pts) {
  const [p, q, r] = pts;
  if (p.x === q.x || q.x === r.x || p.x === r.x) return null;
  const sorted = [p, q, r].sort((u, v) => u.x - v.x);
  return { middle: sorted[1], ends: [sorted[0], sorted[2]] };
}

/**
 * Which of the two rays Ox (towards x, smaller abscissas) and Oy contains
 * the point p; null when p is O itself.
 * @param {number} o @param {number} p
 * @returns {'x' | 'y' | null}
 */
export function rayOf(o, p) {
  if (p === o) return null;
  return p < o ? 'x' : 'y';
}

/**
 * How the rays OA and OB lie: opposite when O is between A and B, the same
 * ray when A and B are on the same side of O.
 * @param {number} o @param {number} a @param {number} b
 * @returns {'doi-nhau' | 'trung-nhau' | null}
 */
export function raysRelation(o, a, b) {
  const sa = rayOf(o, a);
  const sb = rayOf(o, b);
  if (!sa || !sb) return null;
  return sa === sb ? 'trung-nhau' : 'doi-nhau';
}
