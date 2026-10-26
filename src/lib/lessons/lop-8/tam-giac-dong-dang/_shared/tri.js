/**
 * Triangles built from the data of a similarity case (three sides, two sides
 * and the included angle, one side and two angles, or a right triangle from
 * its legs or from its hypotenuse and a leg), and the drawing layout the
 * pair board uses. Pure: no DOM. Angles are in degrees.
 *
 * A triangle is named ABC: `ab`, `bc`, `ca` are its sides, `A`, `B`, `C` its
 * angles.
 *
 * @typedef {{ ab: number, bc: number, ca: number, A: number, B: number, C: number }} Tri
 * @typedef {{ x: number, y: number }} Pt
 */

const RAD = Math.PI / 180;

/** Relative tolerance for comparing lengths computed with square roots. */
const EPS = 1e-9;

/**
 * Whether three positive lengths satisfy the triangle inequality.
 * @param {number} ab @param {number} bc @param {number} ca
 */
export function isTriangle(ab, bc, ca) {
  return ab > 0 && bc > 0 && ca > 0 && ab < bc + ca && bc < ab + ca && ca < ab + bc;
}

/**
 * Angle opposite side `opp` in a triangle with sides `opp`, `p`, `q`
 * (law of cosines), in degrees.
 * @param {number} opp @param {number} p @param {number} q
 */
function angleOpposite(opp, p, q) {
  const cos = (p * p + q * q - opp * opp) / (2 * p * q);
  return Math.acos(Math.max(-1, Math.min(1, cos))) / RAD;
}

/**
 * The triangle with sides AB, BC, CA, or null when they do not form one.
 * @param {number} ab @param {number} bc @param {number} ca
 * @returns {Tri | null}
 */
export function fromSSS(ab, bc, ca) {
  if (!isTriangle(ab, bc, ca)) return null;
  const A = angleOpposite(bc, ab, ca);
  const B = angleOpposite(ca, ab, bc);
  return { ab, bc, ca, A, B, C: 180 - A - B };
}

/**
 * The triangle with sides AB, AC and the included angle A.
 * @param {number} ab @param {number} ca @param {number} A
 * @returns {Tri | null}
 */
export function fromSAS(ab, ca, A) {
  if (!(ab > 0 && ca > 0 && A > 0 && A < 180)) return null;
  const bc = Math.sqrt(ab * ab + ca * ca - 2 * ab * ca * Math.cos(A * RAD));
  const B = angleOpposite(ca, ab, bc);
  return { ab, bc, ca, A, B, C: 180 - A - B };
}

/**
 * The triangle with side BC and the two angles B and C on it.
 * @param {number} bc @param {number} B @param {number} C
 * @returns {Tri | null}
 */
export function fromASA(bc, B, C) {
  if (!(bc > 0 && B > 0 && C > 0 && B + C < 180)) return null;
  const A = 180 - B - C;
  const k = bc / Math.sin(A * RAD);
  return { ab: k * Math.sin(C * RAD), bc, ca: k * Math.sin(B * RAD), A, B, C };
}

/**
 * The triangle right-angled at A with hypotenuse BC and leg AB, or null when
 * the leg is not shorter than the hypotenuse.
 * @param {number} bc @param {number} ab
 * @returns {Tri | null}
 */
export function fromHypotenuseLeg(bc, ab) {
  if (!(ab > 0 && bc > ab)) return null;
  const ca = Math.sqrt(bc * bc - ab * ab);
  const B = angleOpposite(ca, ab, bc);
  return { ab, bc, ca, A: 90, B, C: 90 - B };
}

/**
 * Whether p/q = r/s, allowing for rounding in lengths that came from square
 * roots. Exact for whole numbers.
 * @param {number} p @param {number} q @param {number} r @param {number} s
 */
export function sameRatio(p, q, r, s) {
  return Math.abs(p * s - q * r) <= EPS * Math.max(1, Math.abs(p * s), Math.abs(q * r));
}

/**
 * Whether two triangles are similar with A ↔ A', B ↔ B', C ↔ C': their three
 * pairs of corresponding sides are proportional.
 * @param {Tri} t @param {Tri} u
 */
export function similar(t, u) {
  return sameRatio(u.ab, t.ab, u.bc, t.bc) && sameRatio(u.bc, t.bc, u.ca, t.ca);
}

/**
 * Whether two triangles are similar under some pairing of their vertices:
 * their sides, each sorted from shortest to longest, are proportional.
 * @param {Tri} t @param {Tri} u
 */
export function similarAnyOrder(t, u) {
  const p = [t.ab, t.bc, t.ca].sort((x, y) => x - y);
  const q = [u.ab, u.bc, u.ca].sort((x, y) => x - y);
  return sameRatio(q[0], p[0], q[1], p[1]) && sameRatio(q[1], p[1], q[2], p[2]);
}

/**
 * Vertices in a frame with B at the origin, C on the positive x-axis and A
 * above it (y up).
 * @param {Tri} t
 * @returns {{ A: Pt, B: Pt, C: Pt }}
 */
export function layout(t) {
  const x = (t.ab * t.ab + t.bc * t.bc - t.ca * t.ca) / (2 * t.bc);
  const y = Math.sqrt(Math.max(0, t.ab * t.ab - x * x));
  return { A: { x, y }, B: { x: 0, y: 0 }, C: { x: t.bc, y: 0 } };
}

/**
 * The largest scale (SVG units per unit of length) at which every triangle
 * fits a box of the given size, so that all are drawn to the same scale.
 * @param {Tri[]} tris @param {number} w @param {number} h
 */
export function fitScale(tris, w, h) {
  let s = Infinity;
  for (const t of tris) {
    const { A, C } = layout(t);
    const width = Math.max(C.x, A.x) - Math.min(0, A.x);
    s = Math.min(s, w / width, h / Math.max(A.y, 1e-9));
  }
  return s;
}

/**
 * Greatest common divisor of two natural numbers.
 * @param {number} a @param {number} b
 * @returns {number}
 */
export function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * TeX for the ratio p/q of two whole numbers followed by its lowest terms:
 * `\dfrac{8}{4} = 2`, `\dfrac{6}{4} = \dfrac{3}{2}`.
 * @param {number} p @param {number} q
 */
export function ratioTex(p, q) {
  const g = gcd(p, q);
  const n = p / g;
  const d = q / g;
  const reduced = d === 1 ? String(n) : `\\dfrac{${n}}{${d}}`;
  return n === p && d === q ? `\\dfrac{${p}}{${q}}` : `\\dfrac{${p}}{${q}} = ${reduced}`;
}
