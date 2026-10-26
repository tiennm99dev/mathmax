/**
 * The cube of side a + b cut into 8 boxes by the planes x = a, y = a, z = a,
 * drawn in isometric projection. Each box is a × a × a, a × a × b, a × b × b
 * or b × b × b, which gives the four terms of (a + b)³ = a³ + 3a²b + 3ab² + b³.
 */

/** @typedef {'a3' | 'a2b' | 'ab2' | 'b3'} Kind */

/**
 * @typedef {object} Box
 * @property {string} id octant as 'ijk', 0 for the a side and 1 for the b side
 * @property {Kind} kind
 * @property {[number, number, number]} origin lowest corner (x, y, z)
 * @property {[number, number, number]} size edge lengths along x, y, z
 */

/** @type {Kind[]} */
export const KINDS = ['a3', 'a2b', 'ab2', 'b3'];

/**
 * The 8 boxes, in an order safe for painting back to front. With `gap` > 0
 * each box moves `gap` further along every axis on which it lies on the b
 * side, so the cube comes apart.
 * @param {number} a
 * @param {number} b
 * @param {number} [gap]
 * @returns {Box[]}
 */
export function boxes(a, b, gap = 0) {
  /** @type {Box[]} */
  const out = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        const idx = [i, j, k];
        const bs = i + j + k;
        out.push({
          id: `${i}${j}${k}`,
          kind: KINDS[bs],
          origin: /** @type {[number, number, number]} */ (idx.map((t) => (t ? a + gap : 0))),
          size: /** @type {[number, number, number]} */ (idx.map((t) => (t ? b : a))),
        });
      }
    }
  }
  // The viewer looks from the +x, +y, +z side: a box with a larger index sum
  // is never hidden behind one with a smaller sum.
  return out.sort((p, q) => sum(p.id) - sum(q.id));
}

/** @param {string} id */
const sum = (id) => [...id].reduce((s, d) => s + Number(d), 0);

/**
 * Volume of one box of each kind, and how many boxes there are of it.
 * @param {Kind} kind
 * @param {number} a
 * @param {number} b
 */
export function termOf(kind, a, b) {
  const nb = KINDS.indexOf(kind);
  const count = [1, 3, 3, 1][nb];
  const volume = a ** (3 - nb) * b ** nb;
  return { count, volume, total: count * volume };
}

const C30 = Math.cos(Math.PI / 6);

/**
 * Isometric projection of a point to SVG coordinates (y down), scale `s`.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} s
 * @returns {[number, number]}
 */
export function project(x, y, z, s) {
  return [(x - y) * C30 * s, ((x + y) / 2 - z) * s];
}

/**
 * The three visible faces of a box (top, the face toward +x, the face toward
 * +y) as SVG polygon point lists.
 * @param {Box} box
 * @param {number} s
 * @returns {{ top: string, right: string, left: string }}
 */
export function faces(box, s) {
  const [x0, y0, z0] = box.origin;
  const [x1, y1, z1] = box.origin.map((v, i) => v + box.size[i]);
  /** @param {Array<[number, number, number]>} pts */
  const poly = (pts) =>
    pts
      .map(([x, y, z]) =>
        project(x, y, z, s)
          .map((v) => Math.round(v * 100) / 100)
          .join(','),
      )
      .join(' ');
  return {
    top: poly([
      [x0, y0, z1],
      [x1, y0, z1],
      [x1, y1, z1],
      [x0, y1, z1],
    ]),
    right: poly([
      [x1, y0, z0],
      [x1, y1, z0],
      [x1, y1, z1],
      [x1, y0, z1],
    ]),
    left: poly([
      [x0, y1, z0],
      [x1, y1, z0],
      [x1, y1, z1],
      [x0, y1, z1],
    ]),
  };
}

/**
 * The SVG view box that holds a cube of the given full side, with padding.
 * @param {number} side
 * @param {number} s
 * @param {number} pad
 */
export function viewBox(side, s, pad) {
  const w = side * C30 * s;
  return `${-w - pad} ${-side * s - pad} ${2 * w + 2 * pad} ${2 * side * s + 2 * pad}`;
}
