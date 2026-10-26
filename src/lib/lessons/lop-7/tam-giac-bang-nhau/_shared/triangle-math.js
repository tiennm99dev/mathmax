/**
 * Pure triangle helpers for the chapter "Tam giác bằng nhau". Points are SVG
 * points (y grows downwards); directions are degrees measured the
 * mathematical way (0° points right, angles grow counter-clockwise on
 * screen), and the helpers flip y themselves. Lengths are in whatever unit
 * the caller uses (centimetres for the constructions).
 *
 * @typedef {{ x: number, y: number }} Pt
 */

import { formatNumber } from '#lib/core/number-format.js';
import { norm } from '#lib/core/visuals/angle-math.js';

const RAD = Math.PI / 180;

/**
 * The point at distance `r` from `o` in direction `deg`.
 * @param {Pt} o @param {number} r @param {number} deg
 * @returns {Pt}
 */
export function along(o, r, deg) {
  return { x: o.x + r * Math.cos(deg * RAD), y: o.y - r * Math.sin(deg * RAD) };
}

/**
 * Direction of `p` seen from `o`, in [0, 360).
 * @param {Pt} o @param {Pt} p
 */
export function directionTo(o, p) {
  return norm(Math.atan2(o.y - p.y, p.x - o.x) / RAD);
}

/** @param {Pt} p @param {Pt} q */
export function dist(p, q) {
  return Math.hypot(p.x - q.x, p.y - q.y);
}

/**
 * Measure of the angle PQR (vertex Q), from 0° to 180°.
 * @param {Pt} p @param {Pt} q @param {Pt} r
 */
export function angleAt(p, q, r) {
  const d = norm(directionTo(q, r) - directionTo(q, p));
  return d <= 180 ? d : 360 - d;
}

/**
 * The three angles of triangle ABC: at A, at B, at C.
 * @param {Pt} a @param {Pt} b @param {Pt} c
 * @returns {[number, number, number]}
 */
export function angles(a, b, c) {
  return [angleAt(c, a, b), angleAt(a, b, c), angleAt(b, c, a)];
}

/**
 * Twice the signed area; zero when the three points are collinear.
 * @param {Pt} a @param {Pt} b @param {Pt} c
 */
export function cross(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

/**
 * Rounds three angles that add up to 180° to whole degrees that still add up
 * to 180° (largest remainder), so a measured triangle never reads 179° or
 * 181°.
 * @param {readonly number[]} exact
 * @returns {number[]}
 */
export function roundTo180(exact) {
  const floors = exact.map(Math.floor);
  let left = 180 - floors.reduce((s, v) => s + v, 0);
  const order = exact
    .map((v, i) => i)
    .sort((i, j) => exact[j] - floors[j] - (exact[i] - floors[i]));
  const out = [...floors];
  for (const i of order) {
    if (left <= 0) break;
    out[i]++;
    left--;
  }
  return out;
}

/**
 * The kind of a triangle by its largest angle, from whole-degree measures.
 * @param {readonly number[]} whole
 * @returns {'nhọn' | 'vuông' | 'tù'}
 */
export function kindOf(whole) {
  const max = Math.max(...whole);
  if (max === 90) return 'vuông';
  return max > 90 ? 'tù' : 'nhọn';
}

/**
 * Arc of radius `r` at vertex `o` between the rays towards `p` and `q`,
 * always the inside (smaller) angle.
 * @param {Pt} o @param {Pt} p @param {Pt} q @param {number} r
 */
export function arcPath(o, p, q, r) {
  let from = directionTo(o, p);
  let sweep = norm(directionTo(o, q) - from);
  if (sweep > 180) {
    from = directionTo(o, q);
    sweep = 360 - sweep;
  }
  if (sweep < 1e-6) return '';
  const s = along(o, r, from);
  const e = along(o, r, from + sweep);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 0 0 ${e.x} ${e.y}`;
}

/**
 * Filled wedge of radius `r` marking the inside angle at vertex `o` between
 * the rays towards `p` and `q`, with the direction of its bisector (where
 * a measure label goes).
 * @param {Pt} o @param {Pt} p @param {Pt} q @param {number} r
 */
export function wedge(o, p, q, r) {
  let from = directionTo(o, p);
  let sweep = norm(directionTo(o, q) - from);
  if (sweep > 180) {
    from = directionTo(o, q);
    sweep = 360 - sweep;
  }
  return { path: sector(o, from, sweep, r), mid: from + sweep / 2 };
}

/**
 * Filled sector of radius `r` from direction `from` turning `sweep` degrees
 * counter-clockwise.
 * @param {Pt} o @param {number} from @param {number} sweep @param {number} r
 */
export function sector(o, from, sweep, r) {
  const s = along(o, r, from);
  const e = along(o, r, from + sweep);
  const large = sweep > 180 ? 1 : 0;
  return `M ${o.x} ${o.y} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
}

/**
 * Small square marking a right angle at `o` between the rays towards `p`
 * and `q`.
 * @param {Pt} o @param {Pt} p @param {Pt} q @param {number} s
 */
export function rightMark(o, p, q, s) {
  const u = along(o, s, directionTo(o, p));
  const v = along(o, s, directionTo(o, q));
  const w = { x: u.x + v.x - o.x, y: u.y + v.y - o.y };
  return `M ${u.x} ${u.y} L ${w.x} ${w.y} L ${v.x} ${v.y}`;
}

/**
 * Point where a label sits outside the triangle at vertex `v`: pushed away
 * from the centroid of `a`, `b`, `c`.
 * @param {Pt} v @param {Pt} a @param {Pt} b @param {Pt} c @param {number} [gap]
 */
export function labelAt(v, a, b, c, gap = 18) {
  const g = { x: (a.x + b.x + c.x) / 3, y: (a.y + b.y + c.y) / 3 };
  const d = dist(v, g) || 1;
  return { x: v.x + ((v.x - g.x) / d) * gap, y: v.y + ((v.y - g.y) / d) * gap + 5 };
}

/**
 * Length text with one decimal at most and the decimal comma.
 * @param {number} v
 */
export function lenText(v) {
  return formatNumber(v, 1);
}

/**
 * @typedef {object} Solved
 * @property {number} a side BC (opposite A)
 * @property {number} b side CA (opposite B)
 * @property {number} c side AB (opposite C)
 * @property {number} A angle at A, degrees
 * @property {number} B angle at B
 * @property {number} C angle at C
 */

/**
 * Builds triangle ABC from two sides and the included angle (c.g.c):
 * AB = c, AC = b, angle A.
 * @param {number} c @param {number} A @param {number} b
 * @returns {Solved}
 */
export function fromSAS(c, A, b) {
  const a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * RAD));
  const pts = placeSAS(c, A, b);
  const [, B, C] = angles(pts.A, pts.B, pts.C);
  return { a, b, c, A, B, C };
}

/**
 * Vertex positions for c.g.c with A at the origin and AB along 0°.
 * @param {number} c @param {number} A @param {number} b
 */
export function placeSAS(c, A, b) {
  const o = { x: 0, y: 0 };
  return { A: o, B: along(o, c, 0), C: along(o, b, A) };
}

/**
 * Builds triangle ABC from one side and its two adjacent angles (g.c.g):
 * angle B, BC = a, angle C. Null when B + C ≥ 180°.
 * @param {number} B @param {number} a @param {number} C
 * @returns {Solved | null}
 */
export function fromASA(B, a, C) {
  const A = 180 - B - C;
  if (A <= 0) return null;
  const k = a / Math.sin(A * RAD);
  return { a, b: k * Math.sin(B * RAD), c: k * Math.sin(C * RAD), A, B, C };
}

/**
 * Every triangle with angle B, side BA = c next to it and side AC = b
 * opposite it (two sides and an angle that is not between them). There can
 * be none, one or two: the answer is the list of possible lengths BC.
 * @param {number} B @param {number} c @param {number} b
 * @returns {number[]}
 */
export function ssaBases(B, c, b) {
  const h = c * Math.sin(B * RAD);
  const proj = c * Math.cos(B * RAD);
  const eps = 1e-9;
  if (b < h - eps) return [];
  const root = Math.sqrt(Math.max(0, b * b - h * h));
  return [proj - root, proj + root]
    .filter((x) => x > eps)
    .filter((x, i, all) => all.findIndex((y) => Math.abs(y - x) < 1e-6) === i);
}

/**
 * Scales and centres a set of points into a box, keeping proportions.
 * @param {Pt[]} pts
 * @param {{ x: number, y: number, w: number, h: number }} box
 * @returns {{ map: (p: Pt) => Pt, k: number }}
 */
export function fitInto(pts, box) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX || 1;
  const h = Math.max(...ys) - minY || 1;
  const k = Math.min(box.w / w, box.h / h);
  const ox = box.x + (box.w - w * k) / 2;
  const oy = box.y + (box.h - h * k) / 2;
  return { map: (p) => ({ x: ox + (p.x - minX) * k, y: oy + (p.y - minY) * k }), k };
}
