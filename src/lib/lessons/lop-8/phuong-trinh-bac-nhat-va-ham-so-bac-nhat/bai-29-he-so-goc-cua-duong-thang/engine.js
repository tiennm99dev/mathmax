/**
 * Two lines y = ax + b and y = a'x + b': how they lie (song song, trùng
 * nhau, cắt nhau), where they cross, and the angle each makes with Ox.
 */

/**
 * @typedef {{ a: number, b: number }} Line
 * @typedef {'song-song' | 'trung' | 'cat'} Relation
 */

/**
 * @param {Line} d
 * @param {Line} e
 * @returns {Relation}
 */
export function relation(d, e) {
  if (d.a !== e.a) return 'cat';
  return d.b === e.b ? 'trung' : 'song-song';
}

/**
 * The crossing point of two lines with different slopes, else null.
 * @param {Line} d
 * @param {Line} e
 */
export function crossing(d, e) {
  if (d.a === e.a) return null;
  const x = (e.b - d.b) / (d.a - e.a);
  return { x, y: d.a * x + d.b };
}

/**
 * The angle α between Ox and the line, in degrees: the angle at A (where the
 * line meets Ox) between ray Ax and the part of the line above Ox. Acute
 * when a > 0, obtuse when a < 0; null for a = 0 (the line never meets Ox
 * or is Ox itself).
 * @param {number} a
 */
export function angleWithOx(a) {
  if (a === 0) return null;
  const t = (Math.atan(a) * 180) / Math.PI;
  return a > 0 ? t : 180 + t;
}

/**
 * Where the line meets Ox, when a ≠ 0.
 * @param {Line} d
 */
export function xIntercept(d) {
  return d.a === 0 ? null : -d.b / d.a;
}

/**
 * @typedef {{ text: string, test: (d: Line, e: Line) => boolean }} Challenge
 */

/** @type {Challenge[]} */
export const CHALLENGES = [
  { text: "Chỉnh d' song song với d.", test: (d, e) => relation(d, e) === 'song-song' },
  { text: "Chỉnh d' trùng với d.", test: (d, e) => relation(d, e) === 'trung' },
  {
    text: "Chỉnh d' cắt d tại một điểm nằm trên trục tung.",
    test: (d, e) => relation(d, e) === 'cat' && d.b === e.b,
  },
  {
    text: "Chỉnh d' song song với d và đi qua điểm (0; −2).",
    test: (d, e) => relation(d, e) === 'song-song' && e.b === -2,
  },
  {
    text: 'Chỉnh d để d tạo với trục Ox một góc tù.',
    test: (d) => d.a < 0,
  },
  {
    text: 'Chỉnh hai đường thẳng để chúng cắt nhau tại điểm (1; 3).',
    test: (d, e) => {
      const p = crossing(d, e);
      return p !== null && Math.abs(p.x - 1) < 1e-9 && Math.abs(p.y - 3) < 1e-9;
    },
  },
];
