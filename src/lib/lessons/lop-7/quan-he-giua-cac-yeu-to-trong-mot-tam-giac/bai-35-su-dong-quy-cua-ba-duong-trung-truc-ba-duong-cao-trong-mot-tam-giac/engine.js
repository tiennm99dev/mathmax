/**
 * Logic of the concurrency board for perpendicular bisectors and altitudes.
 * Points are in grid units (y up). The perpendicular bisectors of BC, CA, AB
 * pass through the midpoints M, N, P and meet at O; the altitudes AD, BE, CF
 * meet at the orthocentre H. Vertices sit on a half-unit grid, so the kind
 * of triangle (acute, right, obtuse) is decided exactly from dot products.
 *
 * @typedef {import('#lib/geom-engine/grid-triangle.js').Pt} Pt
 * @typedef {import('#lib/geom-engine/grid-triangle.js').Tri} Tri
 * @typedef {import('#lib/geom-engine/grid-triangle.js').Vertex} Vertex
 */

import { cross, dist, foot, midpoint } from '#lib/geom-engine/plane.js';

const EPS = 1e-9;
/** @type {Vertex[]} */
const VS = ['A', 'B', 'C'];
/** The two other vertices of each vertex, in order. */
const OTHERS = /** @type {const} */ ({ A: ['B', 'C'], B: ['C', 'A'], C: ['A', 'B'] });

/**
 * Dot product of the two sides leaving vertex `v`: positive for an acute
 * angle, zero for a right angle, negative for an obtuse one.
 * @param {Tri} t @param {Vertex} v
 */
function dotAt(t, v) {
  const [p, q] = OTHERS[v];
  const o = t[v];
  return (t[p].x - o.x) * (t[q].x - o.x) + (t[p].y - o.y) * (t[q].y - o.y);
}

/**
 * Whether the triangle is acute, right or obtuse, and at which vertex.
 * @param {Tri} t
 * @returns {{ kind: 'nhon' | 'vuong' | 'tu', at: Vertex | null }}
 */
export function classify(t) {
  for (const v of VS) {
    const d = dotAt(t, v);
    if (Math.abs(d) < EPS) return { kind: 'vuong', at: v };
    if (d < 0) return { kind: 'tu', at: v };
  }
  return { kind: 'nhon', at: null };
}

/**
 * The point equally far from the three vertices (meet of the perpendicular
 * bisectors).
 * @param {Tri} t
 * @returns {Pt}
 */
export function circumcenter(t) {
  const { A, B, C } = t;
  const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const a2 = A.x ** 2 + A.y ** 2;
  const b2 = B.x ** 2 + B.y ** 2;
  const c2 = C.x ** 2 + C.y ** 2;
  return {
    x: (a2 * (B.y - C.y) + b2 * (C.y - A.y) + c2 * (A.y - B.y)) / d,
    y: (a2 * (C.x - B.x) + b2 * (A.x - C.x) + c2 * (B.x - A.x)) / d,
  };
}

/**
 * Where a point lies with respect to the triangle.
 * @param {Tri} t @param {Pt} p
 * @returns {'trong' | 'canh' | 'ngoai'}
 */
export function where(t, p) {
  const s = Math.sign(cross(t.A, t.B, t.C));
  const c = [cross(t.A, t.B, p), cross(t.B, t.C, p), cross(t.C, t.A, p)].map((v) =>
    Math.abs(v) < 1e-7 ? 0 : Math.sign(v) * s,
  );
  if (c.some((v) => v < 0)) return 'ngoai';
  return c.some((v) => v === 0) ? 'canh' : 'trong';
}

/**
 * Perpendicular bisectors: midpoints, their common point O and the
 * distances from O to the three vertices.
 * @param {Tri} t
 */
export function bisectorsOfSides(t) {
  const O = circumcenter(t);
  const sides = [
    { name: 'M', from: t.B, to: t.C, opposite: t.A },
    { name: 'N', from: t.C, to: t.A, opposite: t.B },
    { name: 'P', from: t.A, to: t.B, opposite: t.C },
  ].map((s) => ({ ...s, at: midpoint(s.from, s.to) }));
  return {
    O,
    sides,
    OA: dist(O, t.A),
    OB: dist(O, t.B),
    OC: dist(O, t.C),
    place: where(t, O),
  };
}

/**
 * Altitudes: feet D, E, F on the lines BC, CA, AB and the orthocentre H.
 * A foot is `outside` when it falls on the extension of the side.
 * @param {Tri} t
 */
export function altitudes(t) {
  const O = circumcenter(t);
  // Euler: the orthocentre is A + B + C − 2O.
  const H = { x: t.A.x + t.B.x + t.C.x - 2 * O.x, y: t.A.y + t.B.y + t.C.y - 2 * O.y };
  const rows = [
    { from: 'A', name: 'D', vertex: t.A, p: t.B, q: t.C },
    { from: 'B', name: 'E', vertex: t.B, p: t.C, q: t.A },
    { from: 'C', name: 'F', vertex: t.C, p: t.A, q: t.B },
  ].map((r) => {
    const f = foot(r.vertex, r.p, r.q);
    const len = dist(r.vertex, f);
    const along = (f.x - r.p.x) * (r.q.x - r.p.x) + (f.y - r.p.y) * (r.q.y - r.p.y);
    const side = (r.q.x - r.p.x) ** 2 + (r.q.y - r.p.y) ** 2;
    return { ...r, foot: f, len, outside: along < -EPS || along > side + EPS };
  });
  return { H, rows, place: where(t, H) };
}

/**
 * Plain-text name of the vertex `v` angle, e.g. 'Â'.
 * @param {Vertex} v
 */
export const hat = (v) => ({ A: 'Â', B: 'B̂', C: 'Ĉ' })[v];

/**
 * What the board says about O and H for the current triangle.
 * @param {Tri} t
 */
export function report(t) {
  const k = classify(t);
  const opp = k.at
    ? /** @type {Record<Vertex, string>} */ ({ A: 'BC', B: 'CA', C: 'AB' })[k.at]
    : '';
  const kindText =
    k.kind === 'nhon'
      ? 'Tam giác ABC nhọn'
      : k.kind === 'vuong'
        ? `Tam giác ABC vuông tại ${k.at}`
        : `Tam giác ABC tù (${hat(/** @type {Vertex} */ (k.at))} tù)`;
  const oText =
    k.kind === 'nhon'
      ? 'O nằm bên trong tam giác.'
      : k.kind === 'vuong'
        ? `O là trung điểm của cạnh huyền ${opp}.`
        : `O nằm bên ngoài tam giác, khác phía với ${k.at} đối với đường thẳng ${opp}.`;
  const hText =
    k.kind === 'nhon'
      ? 'H nằm bên trong tam giác.'
      : k.kind === 'vuong'
        ? `H trùng với đỉnh góc vuông ${k.at}.`
        : `H nằm bên ngoài tam giác, cùng phía với ${k.at} đối với đường thẳng ${opp}.`;
  return { ...k, kindText, oText, hText };
}
