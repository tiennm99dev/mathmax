/**
 * Logic of the angle-and-opposite-side board: rank the three sides of a
 * triangle by length and pair each with its opposite angle. Sides are ranked
 * from their exact squared lengths, so two equal sides are never split by
 * rounding; the angles then come out in the same order (the theorem the
 * board shows).
 */

import { OPPOSITE, measureTri, same } from '../_shared/triangle-board.js';

/** @typedef {import('../_shared/triangle-board.js').Tri} Tri */
/** @typedef {import('../_shared/triangle-board.js').Vertex} Vertex */

/** @type {Vertex[]} */
const VERTICES = ['A', 'B', 'C'];

/**
 * The vertices grouped from the longest opposite side to the shortest; a
 * group holds the vertices whose opposite sides are equal.
 * @param {Tri} t
 * @returns {Vertex[][]}
 */
export function rankGroups(t) {
  const { sq } = measureTri(t);
  const sorted = [...VERTICES].sort((p, q) => sq[q] - sq[p]);
  /** @type {Vertex[][]} */
  const groups = [];
  for (const v of sorted) {
    const last = groups.at(-1);
    if (last && same(sq[last[0]], sq[v])) last.push(v);
    else groups.push([v]);
  }
  return groups;
}

const HATS = { A: 'Â', B: 'B̂', C: 'Ĉ' };

/** Plain-text angle name: Â, B̂, Ĉ. @param {Vertex} v */
export const hat = (v) => HATS[v];

/**
 * The comparison of the sides, longest first, as plain text:
 * 'BC > CA = AB'.
 * @param {Vertex[][]} groups
 */
export function sideChain(groups) {
  return groups.map((g) => g.map((v) => OPPOSITE[v]).join(' = ')).join(' > ');
}

/**
 * The matching comparison of the angles: 'Â > B̂ = Ĉ'.
 * @param {Vertex[][]} groups
 */
export function angleChain(groups) {
  return groups.map((g) => g.map(hat).join(' = ')).join(' > ');
}

/**
 * The kind of triangle by its sides.
 * @param {Vertex[][]} groups
 * @returns {'deu' | 'can' | 'thuong'}
 */
export function sideKind(groups) {
  if (groups.length === 1) return 'deu';
  return groups.length === 2 ? 'can' : 'thuong';
}

/**
 * Whether the angle order agrees with the side order: each group's angles
 * are equal and larger than every angle of the next group (within `tol`
 * degrees for rounding).
 * @param {Tri} t
 * @param {number} [tol]
 */
export function anglesFollowSides(t, tol = 1e-6) {
  const { angle } = measureTri(t);
  const groups = rankGroups(t);
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    for (const v of g) if (Math.abs(angle[v] - angle[g[0]]) > tol) return false;
    const next = groups[i + 1];
    if (next && !(angle[g[0]] > angle[next[0]] + tol)) return false;
  }
  return true;
}
