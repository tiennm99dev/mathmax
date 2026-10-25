/**
 * Pure angle helpers for the lessons on angles. Directions are whole degrees
 * measured the mathematical way: 0° points right and angles grow
 * counter-clockwise. Points are SVG points (y grows downwards); the helpers
 * flip y themselves.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {'nhon' | 'vuong' | 'tu' | 'bet'} AngleKind
 * @typedef {'dinh' | 'canh-x' | 'canh-y' | 'trong' | 'ngoai' | 'bet' | 'trung'} PointPlace
 */

/** @param {number} a */
export const norm = (a) => ((a % 360) + 360) % 360;

/**
 * Unit vector of a direction, in SVG coordinates.
 * @param {number} deg
 * @returns {Pt}
 */
export function dirOf(deg) {
  const t = (deg * Math.PI) / 180;
  return { x: Math.cos(t), y: -Math.sin(t) };
}

/**
 * The point at distance `r` from `o` in direction `deg`.
 * @param {Pt} o @param {number} r @param {number} deg
 * @returns {Pt}
 */
export function along(o, r, deg) {
  const u = dirOf(deg);
  return { x: o.x + r * u.x, y: o.y + r * u.y };
}

/**
 * Direction of `p` seen from `o`, in [0, 360), rounded to whole degrees.
 * @param {Pt} o @param {Pt} p
 */
export function directionTo(o, p) {
  return norm(Math.round((Math.atan2(o.y - p.y, p.x - o.x) * 180) / Math.PI));
}

/**
 * Measure of the angle formed by two rays with directions `a` and `b`: the
 * smaller of the two turns between them, from 0° to 180°.
 * @param {number} a @param {number} b
 */
export function measure(a, b) {
  const d = norm(b - a);
  return d <= 180 ? d : 360 - d;
}

/**
 * Kind of an angle by its measure (0° < m ≤ 180°).
 * @param {number} m
 * @returns {AngleKind}
 */
export function kindOf(m) {
  if (m === 180) return 'bet';
  if (m === 90) return 'vuong';
  return m < 90 ? 'nhon' : 'tu';
}

/** Vietnamese names of the kinds. */
export const KIND_NAME = /** @type {Record<AngleKind, string>} */ ({
  nhon: 'góc nhọn',
  vuong: 'góc vuông',
  tu: 'góc tù',
  bet: 'góc bẹt',
});

/**
 * Where point `m` lies with respect to the angle with vertex `o` and sides in
 * directions `a` (ray Ox) and `b` (ray Oy): on the vertex, on a side (within
 * `tol` SVG units), inside or outside. A straight angle has no interior
 * point here, and two coinciding rays form no angle.
 * @param {Pt} o @param {number} a @param {number} b @param {Pt} m
 * @param {number} [tol]
 * @returns {PointPlace}
 */
export function placeOf(o, a, b, m, tol = 6) {
  const v = { x: m.x - o.x, y: o.y - m.y };
  if (Math.hypot(v.x, v.y) <= tol) return 'dinh';
  const t1 = (a * Math.PI) / 180;
  const t2 = (b * Math.PI) / 180;
  const u = { x: Math.cos(t1), y: Math.sin(t1) };
  const w = { x: Math.cos(t2), y: Math.sin(t2) };
  /** @param {Pt} p @param {Pt} q */
  const cross = (p, q) => p.x * q.y - p.y * q.x;
  /** @param {Pt} p @param {Pt} q */
  const dot = (p, q) => p.x * q.x + p.y * q.y;
  if (dot(u, v) > 0 && Math.abs(cross(u, v)) <= tol) return 'canh-x';
  if (dot(w, v) > 0 && Math.abs(cross(w, v)) <= tol) return 'canh-y';
  const m0 = measure(a, b);
  if (m0 === 0) return 'trung';
  if (m0 === 180) return 'bet';
  const s = Math.sign(cross(u, w));
  return s * cross(u, v) > 0 && s * cross(v, w) > 0 ? 'trong' : 'ngoai';
}

/**
 * Angle between the hands of a clock at `h` o'clock sharp (1 to 12).
 * @param {number} h
 */
export function clockAngle(h) {
  return measure(0, 30 * (h % 12));
}
