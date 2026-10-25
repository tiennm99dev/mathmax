/**
 * Geometry for the ruler-and-compass board: the third vertex of an equilateral
 * triangle, how far a dragged point is from being it, the steps that draw a
 * square with a set square, and a regular hexagon built from six equilateral
 * triangles around a centre. Points are SVG coordinates (y grows downwards).
 */

/** SVG units per centimetre on the board. */
export const CM = 40;

/** How close, in centimetres, a length must be to count as equal. */
export const TOLERANCE = 0.1;

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @param {Pt} p
 * @param {Pt} q
 */
export function dist(p, q) {
  return Math.hypot(p.x - q.x, p.y - q.y);
}

/**
 * The two points that form an equilateral triangle with A and B: where the
 * compass arcs of radius AB centred at A and at B meet. The first lies above
 * AB on the screen, the second below.
 * @param {Pt} A
 * @param {Pt} B
 * @returns {[Pt, Pt]}
 */
export function apexes(A, B) {
  const mx = (A.x + B.x) / 2;
  const my = (A.y + B.y) / 2;
  const k = Math.sqrt(3) / 2;
  // Perpendicular to AB, scaled to the height of the triangle.
  const px = -(B.y - A.y) * k;
  const py = (B.x - A.x) * k;
  const up = { x: mx - px, y: my - py };
  const down = { x: mx + px, y: my + py };
  return up.y <= down.y ? [up, down] : [down, up];
}

/**
 * Where C stands relative to the two compass arcs, lengths in centimetres.
 * @param {Pt} A
 * @param {Pt} B
 * @param {Pt} C
 */
export function triangleStatus(A, B, C) {
  const ab = dist(A, B) / CM;
  const ca = dist(C, A) / CM;
  const cb = dist(C, B) / CM;
  const onA = Math.abs(ca - ab) <= TOLERANCE;
  const onB = Math.abs(cb - ab) <= TOLERANCE;
  return { ab, ca, cb, onA, onB, equilateral: onA && onB };
}

/**
 * The apex C should snap to after a drag, when it lands within `radius` SVG
 * units of one; otherwise null.
 * @param {Pt} A
 * @param {Pt} B
 * @param {Pt} C
 * @param {number} [radius]
 * @returns {Pt | null}
 */
export function snapApex(A, B, C, radius = 8) {
  for (const p of apexes(A, B)) if (dist(p, C) <= radius) return p;
  return null;
}

/**
 * The four corners of the square on AB, drawn above AB on the screen, in the
 * order A, B, C, D.
 * @param {Pt} A
 * @param {number} side in SVG units
 * @returns {[Pt, Pt, Pt, Pt]}
 */
export function squareCorners(A, side) {
  return [
    A,
    { x: A.x + side, y: A.y },
    { x: A.x + side, y: A.y - side },
    { x: A.x, y: A.y - side },
  ];
}

/** What each step of the set-square construction draws. */
export const SQUARE_STEPS = [
  'Bước 1. Vẽ đoạn thẳng AB có độ dài bằng cạnh hình vuông.',
  'Bước 2. Đặt êke có góc vuông tại A, vẽ đường thẳng vuông góc với AB tại A. Trên đó lấy điểm D sao cho AD = AB.',
  'Bước 3. Đặt êke có góc vuông tại B, vẽ đường thẳng vuông góc với AB tại B. Trên đó lấy điểm C sao cho BC = AB.',
  'Bước 4. Nối D với C. Ta được hình vuông ABCD.',
];

/**
 * The six vertices of the regular hexagon of side r centred at O, starting
 * at the right and going round anticlockwise on the screen.
 * @param {Pt} O
 * @param {number} r
 * @returns {Pt[]}
 */
export function hexagon(O, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const t = (i * Math.PI) / 3;
    return { x: O.x + r * Math.cos(t), y: O.y - r * Math.sin(t) };
  });
}

/**
 * The first k of the six equilateral triangles O, P_i, P_{i+1} that tile the
 * hexagon.
 * @param {Pt} O
 * @param {number} r
 * @param {number} k 0 to 6
 * @returns {Array<[Pt, Pt, Pt]>}
 */
export function hexTriangles(O, r, k) {
  const P = hexagon(O, r);
  return Array.from({ length: Math.max(0, Math.min(6, k)) }, (_, i) => [O, P[i], P[(i + 1) % 6]]);
}

/**
 * A polygon as an SVG `points` attribute.
 * @param {Pt[]} pts
 */
export function polyPoints(pts) {
  return pts.map((p) => `${p.x},${p.y}`).join(' ');
}
