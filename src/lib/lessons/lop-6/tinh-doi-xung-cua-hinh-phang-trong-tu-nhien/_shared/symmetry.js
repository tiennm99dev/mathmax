/**
 * Plane symmetry for the chapter "Tính đối xứng của hình phẳng trong tự
 * nhiên": the shapes of the two widgets, folding a shape along a line and
 * turning it half a turn about a point. Coordinates are in units with the
 * y axis pointing up; a shape is a closed polygon (a segment is a polygon
 * with two vertices). A transformed shape "coincides" with the original when
 * it has exactly the same set of edges, which is an exact test for any
 * simple polygon and needs no area computation.
 */

/** @typedef {{ x: number, y: number }} Pt */
/**
 * @typedef {object} Shape
 * @property {string} id
 * @property {string} name Vietnamese name, e.g. 'Hình vuông'
 * @property {Pt[]} points vertices in order
 * @property {number | 'vo-so'} axes number of axes of symmetry ('vo-so' = infinitely many)
 * @property {Pt | null} center centre of symmetry, or null when it has none
 */

const EPS = 1e-6;

/**
 * Vertices of a regular polygon centred at the origin.
 * @param {number} n @param {number} r circumradius @param {number} startDeg angle of the first vertex
 * @returns {Pt[]}
 */
export function regular(n, r, startDeg) {
  return Array.from({ length: n }, (_, k) => {
    const a = ((startDeg + (360 * k) / n) * Math.PI) / 180;
    return { x: clean(r * Math.cos(a)), y: clean(r * Math.sin(a)) };
  });
}

/** Rounds away float noise such as 1.8e-16 so equal coordinates compare equal. @param {number} v */
const clean = (v) => Math.round(v * 1e9) / 1e9;

/** @param {Array<[number, number]>} list @returns {Pt[]} */
const pts = (list) => list.map(([x, y]) => ({ x, y }));

const O = { x: 0, y: 0 };

/** Every shape the widgets offer, keyed by id. */
export const SHAPES = /** @type {Record<string, Shape>} */ ({
  'doan-thang': {
    id: 'doan-thang',
    name: 'Đoạn thẳng',
    points: pts([
      [-3, 0],
      [3, 0],
    ]),
    axes: 2,
    center: O,
  },
  'tam-giac-deu': {
    id: 'tam-giac-deu',
    name: 'Tam giác đều',
    points: regular(3, 3, 90),
    axes: 3,
    center: null,
  },
  'hinh-vuong': {
    id: 'hinh-vuong',
    name: 'Hình vuông',
    points: pts([
      [-2, -2],
      [2, -2],
      [2, 2],
      [-2, 2],
    ]),
    axes: 4,
    center: O,
  },
  'hinh-chu-nhat': {
    id: 'hinh-chu-nhat',
    name: 'Hình chữ nhật',
    points: pts([
      [-3, -1.5],
      [3, -1.5],
      [3, 1.5],
      [-3, 1.5],
    ]),
    axes: 2,
    center: O,
  },
  'hinh-thoi': {
    id: 'hinh-thoi',
    name: 'Hình thoi',
    points: pts([
      [-3, 0],
      [0, -2],
      [3, 0],
      [0, 2],
    ]),
    axes: 2,
    center: O,
  },
  'hinh-thang-can': {
    id: 'hinh-thang-can',
    name: 'Hình thang cân',
    points: pts([
      [-3, -1.5],
      [3, -1.5],
      [1.5, 1.5],
      [-1.5, 1.5],
    ]),
    axes: 1,
    center: null,
  },
  'hinh-binh-hanh': {
    id: 'hinh-binh-hanh',
    name: 'Hình bình hành',
    points: pts([
      [-3, -1.5],
      [1.5, -1.5],
      [3, 1.5],
      [-1.5, 1.5],
    ]),
    axes: 0,
    center: O,
  },
  'luc-giac-deu': {
    id: 'luc-giac-deu',
    name: 'Lục giác đều',
    points: regular(6, 3, 0),
    axes: 6,
    center: O,
  },
  'hinh-tron': {
    id: 'hinh-tron',
    name: 'Hình tròn',
    // A 72-gon drawn as a circle: every line through the centre that the
    // widget can draw (steps of 15°) maps it onto itself, as for a circle.
    points: regular(72, 3, 0),
    axes: 'vo-so',
    center: O,
  },
  'chu-t': {
    id: 'chu-t',
    name: 'Chữ T',
    points: pts([
      [-2.5, 2.5],
      [-2.5, 1.5],
      [-0.5, 1.5],
      [-0.5, -2.5],
      [0.5, -2.5],
      [0.5, 1.5],
      [2.5, 1.5],
      [2.5, 2.5],
    ]),
    axes: 1,
    center: null,
  },
  'chu-h': {
    id: 'chu-h',
    name: 'Chữ H',
    points: pts([
      [-2, -2.5],
      [-1, -2.5],
      [-1, -0.5],
      [1, -0.5],
      [1, -2.5],
      [2, -2.5],
      [2, 2.5],
      [1, 2.5],
      [1, 0.5],
      [-1, 0.5],
      [-1, 2.5],
      [-2, 2.5],
    ]),
    axes: 2,
    center: O,
  },
  'chu-n': {
    id: 'chu-n',
    name: 'Chữ N',
    points: pts([
      [-2, -2.5],
      [-1, -2.5],
      [-1, 1],
      [1, -2.5],
      [2, -2.5],
      [2, 2.5],
      [1, 2.5],
      [1, -1],
      [-1, 2.5],
      [-2, 2.5],
    ]),
    axes: 0,
    center: O,
  },
});

/**
 * A shape's name inside a sentence: only the first letter is lowered, so
 * "Hình vuông" reads "hình vuông" and "Chữ T" keeps its capital letter.
 * @param {string} name
 */
export const inSentence = (name) => name[0].toLowerCase() + name.slice(1);

/**
 * A line through `p` at `deg` degrees to the x axis.
 * @typedef {{ p: Pt, deg: number }} Line
 */

/**
 * Mirror image of a point in a line.
 * @param {Pt} q @param {Line} line
 * @returns {Pt}
 */
export function reflect(q, { p, deg }) {
  const a = (deg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const t = dx * ux + dy * uy;
  return { x: 2 * (p.x + t * ux) - q.x, y: 2 * (p.y + t * uy) - q.y };
}

/**
 * A point turned by `deg` degrees (anticlockwise) about `c`.
 * @param {Pt} q @param {Pt} c @param {number} deg
 * @returns {Pt}
 */
export function rotate(q, c, deg) {
  const a = (deg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const dx = q.x - c.x;
  const dy = q.y - c.y;
  return { x: c.x + dx * cos - dy * sin, y: c.y + dx * sin + dy * cos };
}

/** Image of a point under a half turn about `c`: the point symmetric to it through `c`. @param {Pt} q @param {Pt} c */
export const halfTurn = (q, c) => ({ x: 2 * c.x - q.x, y: 2 * c.y - q.y });

/** @param {Pt} a @param {Pt} b */
const near = (a, b) => Math.abs(a.x - b.x) < EPS && Math.abs(a.y - b.y) < EPS;

/**
 * Edges of a closed polygon; a two-point shape is a single segment.
 * @param {Pt[]} P
 * @returns {Array<[Pt, Pt]>}
 */
function edges(P) {
  if (P.length === 2) return [[P[0], P[1]]];
  return P.map((p, i) => /** @type {[Pt, Pt]} */ ([p, P[(i + 1) % P.length]]));
}

/**
 * Whether two polygons have the same edges, in any order or direction, so
 * one covers the other exactly.
 * @param {Pt[]} A @param {Pt[]} B
 */
export function sameShape(A, B) {
  if (A.length !== B.length) return false;
  const eb = edges(B);
  const used = eb.map(() => false);
  for (const [a1, a2] of edges(A)) {
    const k = eb.findIndex(
      ([b1, b2], i) =>
        !used[i] && ((near(a1, b1) && near(a2, b2)) || (near(a1, b2) && near(a2, b1))),
    );
    if (k === -1) return false;
    used[k] = true;
  }
  return true;
}

/**
 * Whether folding the shape along the line makes both parts coincide, that
 * is whether the line is an axis of symmetry.
 * @param {Pt[]} P @param {Line} line
 */
export function isAxis(P, line) {
  return sameShape(
    P.map((q) => reflect(q, line)),
    P,
  );
}

/**
 * Whether a half turn about `c` brings the shape back onto itself, that is
 * whether `c` is a centre of symmetry.
 * @param {Pt[]} P @param {Pt} c
 */
export function isCenter(P, c) {
  return sameShape(
    P.map((q) => halfTurn(q, c)),
    P,
  );
}

/**
 * Signed distance of `q` from the line: positive on the left of its direction.
 * @param {Pt} q @param {Line} line
 */
export function side(q, { p, deg }) {
  const a = (deg * Math.PI) / 180;
  return Math.cos(a) * (q.y - p.y) - Math.sin(a) * (q.x - p.x);
}

/**
 * The part of a polygon on one side of a line (Sutherland-Hodgman with one
 * half-plane): `keep` = 1 for the left side, -1 for the right.
 * @param {Pt[]} P @param {Line} line @param {1 | -1} keep
 * @returns {Pt[]}
 */
export function clip(P, line, keep) {
  /** @type {Pt[]} */
  const out = [];
  for (let i = 0; i < P.length; i++) {
    const a = P[i];
    const b = P[(i + 1) % P.length];
    const sa = keep * side(a, line);
    const sb = keep * side(b, line);
    if (sa >= -EPS) out.push(a);
    if ((sa > EPS && sb < -EPS) || (sa < -EPS && sb > EPS)) {
      const t = sa / (sa - sb);
      out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
    }
  }
  return out;
}

/**
 * One key per distinct line, so the same axis found twice (through another
 * point of it) counts once: the direction modulo 180° and the signed
 * distance of the origin from the line.
 * @param {Line} line
 */
export function lineKey({ p, deg }) {
  const d = (((Math.round(deg) % 180) + 180) % 180) % 180;
  const dist = side({ x: 0, y: 0 }, { p, deg: d });
  return `${d}|${Math.round(dist * 1000) || 0}`;
}
