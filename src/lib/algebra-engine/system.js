/**
 * Systems of two linear equations in standard form `a·x + b·y = c`.
 *
 * Standard form is used instead of the slope-intercept `y = a·x + b` of
 * `linear.js` because it represents vertical lines and makes the three
 * solution cases fall out of a single determinant.
 */

/**
 * @typedef {import('../geom-engine/vec.js').Vec2} Vec2
 * @typedef {Readonly<{a: number, b: number, c: number}>} StdLine
 * @typedef {{kind: 'unique', point: Vec2}
 *         | {kind: 'parallel'}
 *         | {kind: 'coincident'}
 *         | {kind: 'degenerate'}} SystemSolution
 */

/**
 * Coefficient tolerance. Coefficients are small integers in lesson use, so a
 * tight numeric epsilon is right here — unlike the pixel-scale `EPSILON_LEN`
 * of the geometry engine.
 */
export const EPSILON_COEF = 1e-9;

/** Geometric tolerance for "is this point on the box edge", in math units. */
const EPSILON_BOX = 1e-7;

/**
 * True when both coefficients vanish, i.e. the equation describes no line.
 * @param {StdLine} line @returns {boolean}
 */
export function isDegenerate(line) {
  return Math.abs(line.a) < EPSILON_COEF && Math.abs(line.b) < EPSILON_COEF;
}

/**
 * Solve the system of two standard-form equations.
 *
 * `unique` — the lines cross at one point (determinant ≠ 0).
 * `coincident` — same line, infinitely many solutions.
 * `parallel` — distinct parallel lines, no solution.
 * `degenerate` — an equation has a = b = 0 and is not a line.
 *
 * @param {StdLine} l1 @param {StdLine} l2 @returns {SystemSolution}
 */
export function solveSystem(l1, l2) {
  if (isDegenerate(l1) || isDegenerate(l2)) return { kind: 'degenerate' };

  const det = l1.a * l2.b - l2.a * l1.b;
  if (Math.abs(det) > EPSILON_COEF) {
    return {
      kind: 'unique',
      point: {
        x: (l1.c * l2.b - l2.c * l1.b) / det,
        y: (l1.a * l2.c - l2.a * l1.c) / det,
      },
    };
  }

  // Determinant is zero: the lines are parallel. They coincide only when the
  // constant terms scale by the same factor as the coefficients.
  const detX = l1.c * l2.b - l2.c * l1.b;
  const detY = l1.a * l2.c - l2.a * l1.c;
  const coincident = Math.abs(detX) < EPSILON_COEF && Math.abs(detY) < EPSILON_COEF;
  return { kind: coincident ? 'coincident' : 'parallel' };
}

/**
 * Clip a standard-form line to an axis-aligned box, returning the two points
 * where it meets the boundary. Returns `null` when the line misses the box,
 * only touches a corner, or the equation is degenerate.
 *
 * @param {StdLine} line
 * @param {number} xMin @param {number} xMax
 * @param {number} yMin @param {number} yMax
 * @returns {[Vec2, Vec2] | null}
 */
export function clipToBox(line, xMin, xMax, yMin, yMax) {
  if (isDegenerate(line)) return null;
  const { a, b, c } = line;

  /** @type {Vec2[]} */
  const hits = [];
  const push = (/** @type {Vec2} */ p) => {
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return;
    if (p.x < xMin - EPSILON_BOX || p.x > xMax + EPSILON_BOX) return;
    if (p.y < yMin - EPSILON_BOX || p.y > yMax + EPSILON_BOX) return;
    const dup = hits.some(
      (q) => Math.abs(q.x - p.x) < EPSILON_BOX && Math.abs(q.y - p.y) < EPSILON_BOX
    );
    if (!dup) hits.push(p);
  };

  // Vertical edges: solve for y at x = xMin, xMax (needs b ≠ 0).
  if (Math.abs(b) > EPSILON_COEF) {
    push({ x: xMin, y: (c - a * xMin) / b });
    push({ x: xMax, y: (c - a * xMax) / b });
  }
  // Horizontal edges: solve for x at y = yMin, yMax (needs a ≠ 0).
  if (Math.abs(a) > EPSILON_COEF) {
    push({ x: (c - b * yMin) / a, y: yMin });
    push({ x: (c - b * yMax) / a, y: yMax });
  }

  return hits.length >= 2 ? [hits[0], hits[1]] : null;
}

/**
 * Constant term that moves `line` onto the point `p` without changing its
 * direction — the value of `a·x + b·y` at `p`. Used when a line is dragged.
 *
 * @param {StdLine} line @param {Vec2} p @returns {number}
 */
export function constantThrough(line, p) {
  return line.a * p.x + line.b * p.y;
}
