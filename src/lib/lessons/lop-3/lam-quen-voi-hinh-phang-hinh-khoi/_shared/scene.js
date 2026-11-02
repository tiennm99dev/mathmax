/**
 * A small drawing described as plain data, so a question can carry its picture
 * and a test can read the geometry back: points, lines, circles, filled
 * polygons, right-angle marks and hops. `scene-figure.svelte` draws it. Also
 * the geometry the figures of this chapter share. Pure and DOM-free.
 */

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @typedef {object} SceneParts
 * @property {{ points: Pt[], color?: string }[]} [polygons] drawn first
 * @property {{ c: Pt, r: number, color?: string }[]} [circles]
 * @property {{ a: Pt, b: Pt, color?: string, dash?: boolean, width?: number }[]} [lines]
 * @property {{ at: Pt, p: Pt, q: Pt }[]} [corners] right-angle marks at `at`, between `p` and `q`
 * @property {{ a: Pt, b: Pt }[]} [hops] jump arcs
 * @property {{ at: Pt, name?: string, nameAt?: Pt, color?: string }[]} [dots]
 * @property {{ x: number, y: number, text: string, color?: string }[]} [texts]
 */

/**
 * A picture. `label` is what a screen reader hears while the question is open,
 * so it may never state the answer; `settledLabel` and `reveal` (more drawing,
 * such as right-angle marks) apply once the question has ended.
 * @typedef {SceneParts & { w: number, h: number, label: string, settledLabel?: string, reveal?: SceneParts }} Scene
 */

/**
 * Whether two points are the same.
 * @param {Pt} p @param {Pt} q
 */
export function samePoint(p, q) {
  return p.x === q.x && p.y === q.y;
}

/**
 * Whether the corner at `o` between `p` and `q` is a right angle. Meant for
 * whole-number points, where the test is exact.
 * @param {Pt} o @param {Pt} p @param {Pt} q
 */
export function isRightAt(o, p, q) {
  return (p.x - o.x) * (q.x - o.x) + (p.y - o.y) * (q.y - o.y) === 0;
}

/**
 * Indices of the corners of a polygon that are right angles.
 * @param {Pt[]} points
 * @returns {number[]}
 */
export function rightCorners(points) {
  const n = points.length;
  return points.flatMap((o, i) =>
    isRightAt(o, points[(i + n - 1) % n], points[(i + 1) % n]) ? [i] : [],
  );
}

/**
 * Right-angle marks for every right corner of a polygon.
 * @param {Pt[]} points
 */
export function cornerMarks(points) {
  const n = points.length;
  return rightCorners(points).map((i) => ({
    at: points[i],
    p: points[(i + n - 1) % n],
    q: points[(i + 1) % n],
  }));
}

/**
 * The small square of a right-angle mark, as an SVG path.
 * @param {Pt} at corner
 * @param {Pt} p a point on one side
 * @param {Pt} q a point on the other side
 * @param {number} [size]
 */
export function cornerPath(at, p, q, size = 12) {
  const toward = (/** @type {Pt} */ t) => {
    const len = Math.hypot(t.x - at.x, t.y - at.y) || 1;
    return { x: ((t.x - at.x) / len) * size, y: ((t.y - at.y) / len) * size };
  };
  const u = toward(p);
  const v = toward(q);
  const line = (/** @type {number} */ x, /** @type {number} */ y) =>
    `${x.toFixed(1)} ${y.toFixed(1)}`;
  return `M ${line(at.x + u.x, at.y + u.y)} L ${line(at.x + u.x + v.x, at.y + u.y + v.y)} L ${line(at.x + v.x, at.y + v.y)}`;
}

/**
 * The centre of a set of points.
 * @param {Pt[]} points
 * @returns {Pt}
 */
export function centreOf(points) {
  const n = points.length;
  return {
    x: points.reduce((s, p) => s + p.x, 0) / n,
    y: points.reduce((s, p) => s + p.y, 0) / n,
  };
}

/**
 * Where a point's name goes: `gap` away from it, on the side away from `from`.
 * @param {Pt} p
 * @param {Pt} from
 * @param {number} [gap]
 * @returns {Pt}
 */
export function nameAway(p, from, gap = 18) {
  const len = Math.hypot(p.x - from.x, p.y - from.y) || 1;
  return { x: p.x + ((p.x - from.x) / len) * gap, y: p.y + ((p.y - from.y) / len) * gap };
}

/**
 * The point at `length` from `o`, `deg` degrees clockwise on the screen from
 * the direction to the right.
 * @param {Pt} o
 * @param {number} length
 * @param {number} deg
 * @returns {Pt}
 */
export function pointAt(o, length, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: o.x + length * Math.cos(rad), y: o.y + length * Math.sin(rad) };
}
