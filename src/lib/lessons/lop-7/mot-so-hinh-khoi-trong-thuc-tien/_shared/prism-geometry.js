/**
 * Pure geometry for the right prisms of this chapter (hình hộp chữ nhật,
 * hình lập phương, hình lăng trụ đứng tam giác và tứ giác): the faces of a
 * prism standing on a base polygon, the same faces unfolded into a net, the
 * centre of the view, and the measures the book uses (chu vi đáy, diện tích
 * đáy, diện tích xung quanh, thể tích). The turning view itself is
 * `#lib/geom-engine/solid.js`.
 *
 * Model space is in centimetres: the base lies in the plane z = 0, z points
 * up. A base polygon is listed counter-clockwise seen from above.
 */

import { dist, polygonArea } from '#lib/geom-engine/plane.js';
import { add3 as add, dot3 as dot, mul3 as mul, sub3 as sub } from '#lib/geom-engine/solid.js';

/** @typedef {{ x: number, y: number }} P2 */
/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {import('#lib/geom-engine/solid.js').Face} Face */

/** @param {P2} p @param {number} [z] */
const lift = (p, z = 0) => ({ x: p.x, y: p.y, z });

/**
 * Perimeter of a polygon (chu vi đáy).
 * @param {P2[]} base
 */
export function perimeter(base) {
  return base.reduce((s, p, i) => s + dist(p, base[(i + 1) % base.length]), 0);
}

/**
 * The book's measures of a right prism of height h on this base:
 * S_xq = C_đáy · h, V = S_đáy · h.
 * @param {P2[]} base
 * @param {number} h
 */
export function measures(base, h) {
  const C = perimeter(base);
  const S = polygonArea(base);
  return { C, S, lateral: C * h, total: C * h + 2 * S, volume: S * h };
}

/**
 * A rectangle a (along x) by b (along y) as a counter-clockwise base,
 * corner A at the front left: A, B, C, D.
 * @param {number} a
 * @param {number} b
 * @returns {P2[]}
 */
export function rectBase(a, b) {
  return [
    { x: 0, y: 0 },
    { x: a, y: 0 },
    { x: a, y: b },
    { x: 0, y: b },
  ];
}

/**
 * The faces of the right prism on `base` with height h, unfolded by the
 * fraction t (0 closed, 1 flat). The bottom stays put; each side face turns
 * outwards about its bottom edge, and the top turns with side 0 about their
 * common edge, so t = 1 gives a net: the base with the side faces around it
 * and the top attached to side 0.
 * @param {P2[]} base
 * @param {number} h
 * @param {number} t
 * @returns {Face[]}
 */
export function prismFaces(base, h, t) {
  const n = base.length;
  const theta = (Math.PI / 2) * Math.min(1, Math.max(0, t));
  const up = { x: 0, y: 0, z: 1 };
  /** @type {Face[]} */
  const faces = [
    { id: 'bottom', kind: 'bottom', index: -1, pts: [...base].reverse().map((p) => lift(p)) },
  ];
  for (let i = 0; i < n; i++) {
    const p = lift(base[i]);
    const q = lift(base[(i + 1) % n]);
    const e = sub(q, p);
    const len = Math.hypot(e.x, e.y);
    // Outward horizontal normal of a counter-clockwise polygon.
    const out = { x: e.y / len, y: -e.x / len, z: 0 };
    const u = add(mul(up, Math.cos(theta)), mul(out, Math.sin(theta)));
    faces.push({
      id: `side-${i}`,
      kind: 'side',
      index: i,
      pts: [p, q, add(q, mul(u, h)), add(p, mul(u, h))],
    });
    if (i === 0) {
      // The top hangs off the top edge of side 0, turned twice as far.
      const ex = mul(e, 1 / len);
      const inward = mul(out, -1);
      const d = add(mul(up, Math.sin(2 * theta)), mul(out, -Math.cos(2 * theta)));
      const hinge = add(p, mul(u, h));
      faces.push({
        id: 'top',
        kind: 'top',
        index: -1,
        pts: base.map((b) => {
          const r = sub(lift(b), p);
          return add(hinge, add(mul(ex, dot(r, ex)), mul(d, dot(r, inward))));
        }),
      });
    }
  }
  return faces;
}

/**
 * Centre of the bounding box of some points.
 * @param {P3[]} pts
 * @returns {P3}
 */
export function boxCentre(pts) {
  const ax = pts.map((p) => p.x);
  const ay = pts.map((p) => p.y);
  const az = pts.map((p) => p.z);
  return {
    x: (Math.min(...ax) + Math.max(...ax)) / 2,
    y: (Math.min(...ay) + Math.max(...ay)) / 2,
    z: (Math.min(...az) + Math.max(...az)) / 2,
  };
}

/**
 * Where the view centres a prism unfolded by t: the middle of the solid at
 * t = 0 sliding to the middle of the net at t = 1.
 * @param {P2[]} base
 * @param {number} h
 * @param {number} t
 */
export function viewCentre(base, h, t) {
  const solid = boxCentre(prismFaces(base, h, 0).flatMap((f) => f.pts));
  const net = boxCentre(prismFaces(base, h, 1).flatMap((f) => f.pts));
  return add(mul(solid, 1 - t), mul(net, t));
}

/**
 * The book's name of a face from the names of the base vertices:
 * 'bottom' → ABCD, 'top' → A'B'C'D', 'side-0' → ABB'A'.
 * @param {string} id
 * @param {string[]} names
 */
export function faceName(id, names) {
  if (id === 'bottom') return names.join('');
  if (id === 'top') return names.map((n) => `${n}'`).join('');
  const i = Number(id.slice(5));
  const p = names[i];
  const q = names[(i + 1) % names.length];
  return `${p}${q}${q}'${p}'`;
}

/**
 * Face ids of a prism on an n-gon: the two bases, then the sides.
 * @param {number} n
 */
export function faceIds(n) {
  return ['bottom', 'top', ...Array.from({ length: n }, (_, i) => `side-${i}`)];
}
