/**
 * Properties and type of a quadrilateral ABCD whose vertices sit on an
 * integer grid, so every test (equal sides, parallel sides, right angles,
 * diagonals) is exact integer arithmetic with no rounding.
 */

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @typedef {'hinh-vuong' | 'hinh-chu-nhat' | 'hinh-thoi' | 'hinh-binh-hanh'
 *   | 'hinh-thang-can' | 'hinh-thang' | 'tu-giac' | 'khong-loi'} QuadType
 */

/** Vietnamese name of each type. */
export const TYPE_NAMES = /** @type {Record<QuadType, string>} */ ({
  'hinh-vuong': 'Hình vuông',
  'hinh-chu-nhat': 'Hình chữ nhật',
  'hinh-thoi': 'Hình thoi',
  'hinh-binh-hanh': 'Hình bình hành',
  'hinh-thang-can': 'Hình thang cân',
  'hinh-thang': 'Hình thang (không cân)',
  'tu-giac': 'Tứ giác chưa có tên riêng',
  'khong-loi': 'Chưa phải tứ giác lồi',
});

/**
 * @param {Pt} p
 * @param {Pt} q
 */
const sub = (p, q) => ({ x: p.x - q.x, y: p.y - q.y });
/**
 * @param {Pt} u
 * @param {Pt} v
 */
const cross = (u, v) => u.x * v.y - u.y * v.x;
/**
 * @param {Pt} u
 * @param {Pt} v
 */
const dot = (u, v) => u.x * v.x + u.y * v.y;
/** @param {Pt} u */
const len2 = (u) => dot(u, u);

/**
 * Whether ABCD (in this order) is a convex quadrilateral: every turn goes the
 * same way and no three consecutive vertices are collinear.
 * @param {Pt[]} P
 */
export function isConvex(P) {
  let sign = 0;
  for (let i = 0; i < 4; i++) {
    const c = cross(sub(P[(i + 1) % 4], P[i]), sub(P[(i + 2) % 4], P[(i + 1) % 4]));
    if (c === 0) return false;
    const s = Math.sign(c);
    if (sign === 0) sign = s;
    else if (s !== sign) return false;
  }
  return true;
}

/**
 * Every property the lesson talks about, for the quadrilateral A, B, C, D.
 * @param {Pt[]} P four grid points in order A, B, C, D
 */
export function properties(P) {
  const [A, B, C, D] = P;
  const AB = sub(B, A);
  const BC = sub(C, B);
  const CD = sub(D, C);
  const DA = sub(A, D);
  const sides2 = [len2(AB), len2(BC), len2(CD), len2(DA)];
  const abParallelCd = cross(AB, CD) === 0;
  const bcParallelDa = cross(BC, DA) === 0;
  const rightAngles = [dot(DA, AB), dot(AB, BC), dot(BC, CD), dot(CD, DA)].filter(
    (d) => d === 0,
  ).length;
  const AC = sub(C, A);
  const BD = sub(D, B);
  return {
    sides2,
    allSidesEqual: sides2.every((s) => s === sides2[0]),
    oppositeSidesEqual: sides2[0] === sides2[2] && sides2[1] === sides2[3],
    abParallelCd,
    bcParallelDa,
    rightAngles,
    diagonalsEqual: len2(AC) === len2(BD),
    diagonalsPerpendicular: dot(AC, BD) === 0,
    // Midpoints of AC and BD coincide: A + C = B + D.
    diagonalsBisect: A.x + C.x === B.x + D.x && A.y + C.y === B.y + D.y,
    diagonals2: [len2(AC), len2(BD)],
  };
}

/**
 * The most specific type among those of the lesson.
 * @param {Pt[]} P
 * @returns {QuadType}
 */
export function classify(P) {
  if (!isConvex(P)) return 'khong-loi';
  const p = properties(P);
  const parallelogram = p.abParallelCd && p.bcParallelDa;
  if (parallelogram) {
    if (p.allSidesEqual) return p.rightAngles > 0 ? 'hinh-vuong' : 'hinh-thoi';
    return p.rightAngles > 0 ? 'hinh-chu-nhat' : 'hinh-binh-hanh';
  }
  if (p.abParallelCd) return p.sides2[1] === p.sides2[3] ? 'hinh-thang-can' : 'hinh-thang';
  if (p.bcParallelDa) return p.sides2[0] === p.sides2[2] ? 'hinh-thang-can' : 'hinh-thang';
  return 'tu-giac';
}

/**
 * Whether a shape of type `got` also counts as `want`: a square is also a
 * rectangle, a rhombus and a parallelogram; a rectangle and a rhombus are
 * also parallelograms. A rectangle has equal legs and parallel bases, but the
 * lesson keeps "hình thang cân" for shapes with exactly one pair of parallel
 * sides, so it is not counted here.
 * @param {QuadType} got
 * @param {QuadType} want
 */
export function counts(got, want) {
  if (got === want) return true;
  if (want === 'hinh-binh-hanh')
    return got === 'hinh-vuong' || got === 'hinh-chu-nhat' || got === 'hinh-thoi';
  if (want === 'hinh-chu-nhat' || want === 'hinh-thoi') return got === 'hinh-vuong';
  return false;
}

/** Starting shapes on the grid, one per type, as [A, B, C, D]. */
export const PRESETS = /** @type {Record<string, Pt[]>} */ ({
  'hinh-chu-nhat': [
    { x: 2, y: 6 },
    { x: 9, y: 6 },
    { x: 9, y: 2 },
    { x: 2, y: 2 },
  ],
  'hinh-thoi': [
    { x: 2, y: 6 },
    { x: 7, y: 6 },
    { x: 10, y: 2 },
    { x: 5, y: 2 },
  ],
  'hinh-binh-hanh': [
    { x: 1, y: 6 },
    { x: 8, y: 6 },
    { x: 10, y: 2 },
    { x: 3, y: 2 },
  ],
  'hinh-thang-can': [
    { x: 1, y: 6 },
    { x: 10, y: 6 },
    { x: 8, y: 2 },
    { x: 3, y: 2 },
  ],
});

/**
 * A length on the grid from its square, in centimetres: '5' when exact,
 * otherwise about one decimal ('≈ 4,5').
 * @param {number} d2 squared length in grid units (1 unit = 1 cm)
 * @param {(v: number) => string} format
 */
export function lengthText(d2, format) {
  const r = Math.round(Math.sqrt(d2));
  return r * r === d2 ? format(r) : `≈ ${format(Math.round(Math.sqrt(d2) * 10) / 10)}`;
}
