/**
 * Logic of the three-sticks board. The sticks are BC = a, CA = b and AB = c
 * (opposite A, B, C). B sits at the origin and C at (a; 0), with y up. A is
 * where the circle of centre B and radius c meets the circle of centre C and
 * radius b. Lengths move in halves, so every comparison below is exact.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {'a' | 'b' | 'c'} Side
 */

/** Which segment each stick is. */
export const NAME = /** @type {const} */ ({ a: 'BC', b: 'CA', c: 'AB' });

/**
 * The three triangle inequalities, each with the side alone on the right:
 * AB + CA > BC, AB + BC > CA, BC + CA > AB.
 * @param {number} a @param {number} b @param {number} c
 */
export function inequalities(a, b, c) {
  return [
    {
      side: /** @type {Side} */ ('a'),
      left: /** @type {Side[]} */ (['c', 'b']),
      sum: b + c,
      right: a,
      ok: b + c > a,
    },
    {
      side: /** @type {Side} */ ('b'),
      left: /** @type {Side[]} */ (['c', 'a']),
      sum: a + c,
      right: b,
      ok: a + c > b,
    },
    {
      side: /** @type {Side} */ ('c'),
      left: /** @type {Side[]} */ (['a', 'b']),
      sum: a + b,
      right: c,
      ok: a + b > c,
    },
  ];
}

/**
 * The longest stick (the first one when several tie).
 * @param {number} a @param {number} b @param {number} c
 * @returns {Side}
 */
export function longest(a, b, c) {
  if (a >= b && a >= c) return 'a';
  return b >= c ? 'b' : 'c';
}

/**
 * Whether three lengths are the sides of a triangle, and how they fail when
 * not: 'triangle', 'flat' (the longest equals the sum of the other two, the
 * three points are collinear) or 'short' (the two shorter sticks cannot
 * reach).
 * @param {number} a @param {number} b @param {number} c
 * @returns {'triangle' | 'flat' | 'short'}
 */
export function classify(a, b, c) {
  const s = { a, b, c };
  const k = longest(a, b, c);
  const rest = a + b + c - s[k];
  if (s[k] < rest) return 'triangle';
  return s[k] === rest ? 'flat' : 'short';
}

/**
 * Where the two free ends land. For a triangle (or a flat one) both are the
 * vertex A. Otherwise the sticks AB (from B) and CA (from C) lie along the
 * line BC in the directions that bring their ends closest, and `gap` is how
 * far apart the ends stay.
 * @param {number} a @param {number} b @param {number} c
 * @returns {{ p: Pt, q: Pt, gap: number }}
 */
export function ends(a, b, c) {
  if (classify(a, b, c) === 'triangle') {
    const x = (a * a + c * c - b * b) / (2 * a);
    const A = { x, y: Math.sqrt(Math.max(0, c * c - x * x)) };
    return { p: A, q: A, gap: 0 };
  }
  let best = { p: { x: c, y: 0 }, q: { x: a - b, y: 0 }, gap: Infinity };
  for (const px of [c, -c])
    for (const qx of [a - b, a + b]) {
      const gap = Math.abs(px - qx);
      if (gap < best.gap) best = { p: { x: px, y: 0 }, q: { x: qx, y: 0 }, gap };
    }
  return best;
}

/**
 * The range a third side must lie in: |b − c| < a < b + c.
 * @param {number} b @param {number} c
 */
export function thirdSideRange(b, c) {
  return { low: Math.abs(b - c), high: b + c };
}
