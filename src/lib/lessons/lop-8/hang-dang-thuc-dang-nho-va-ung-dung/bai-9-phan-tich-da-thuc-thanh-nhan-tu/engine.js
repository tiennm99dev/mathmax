/**
 * Area tiles for factoring x² + px + q: one x × x square, p strips x × 1 and q
 * unit squares. Putting m strips on the right of the square and the other
 * n = p − m below it leaves an m × n corner; the tiles form a rectangle
 * (x + m)(x + n) exactly when that corner holds the q unit squares.
 */

/** @typedef {{ p: number, q: number }} Puzzle */

/** @type {Puzzle[]} */
export const PUZZLES = [
  { p: 3, q: 0 },
  { p: 5, q: 6 },
  { p: 4, q: 4 },
  { p: 6, q: 8 },
  { p: 7, q: 12 },
];

/**
 * How the tiles fit when m strips go on the right.
 * @param {Puzzle} puzzle
 * @param {number} m
 * @returns {{ m: number, n: number, corner: number, status: 'ok' | 'short' | 'over', leftover: number, missing: number }}
 *   `short`: some unit squares are left over; `over`: the corner has empty cells.
 */
export function arrange({ p, q }, m) {
  const mm = Math.max(0, Math.min(p, Math.trunc(m)));
  const n = p - mm;
  const corner = mm * n;
  const status = corner === q ? 'ok' : corner < q ? 'short' : 'over';
  return {
    m: mm,
    n,
    corner,
    status,
    leftover: Math.max(0, q - corner),
    missing: Math.max(0, corner - q),
  };
}

/**
 * Every split that makes a rectangle, as [m, n] with m ≤ n.
 * @param {Puzzle} puzzle
 * @returns {Array<[number, number]>}
 */
export function solutions(puzzle) {
  /** @type {Array<[number, number]>} */
  const out = [];
  for (let m = 0; m <= puzzle.p / 2; m++) {
    if (arrange(puzzle, m).status === 'ok') out.push([m, puzzle.p - m]);
  }
  return out;
}

/**
 * x + k in TeX, or just x when k is 0.
 * @param {number} k
 */
const plus = (k) => (k === 0 ? 'x' : `(x + ${k})`);

/**
 * The polynomial in TeX: x^2 + 5x + 6.
 * @param {Puzzle} puzzle
 */
export function polyTex({ p, q }) {
  const mid = p === 0 ? '' : p === 1 ? ' + x' : ` + ${p}x`;
  return `x^2${mid}${q === 0 ? '' : ` + ${q}`}`;
}

/**
 * The factored form read off a rectangle, in TeX: (x + 2)(x + 3), x(x + 3),
 * or (x + 2)^2 when both sides are equal.
 * @param {number} m
 * @param {number} n
 */
export function factorTex(m, n) {
  if (m === n) return m === 0 ? 'x^2' : `(x + ${m})^2`;
  const [a, b] = m === 0 ? [0, n] : n === 0 ? [0, m] : [m, n];
  return a === 0 ? `x${plus(b)}` : `${plus(a)}${plus(b)}`;
}

/**
 * The grouping that turns the rectangle into the factored form, line by line
 * in TeX. With no units the strips share the factor x directly.
 * @param {number} m
 * @param {number} n
 * @returns {string[]}
 */
export function groupingTex(m, n) {
  if (m === 0 || n === 0) {
    const k = m + n;
    return [`x^2 + ${k}x = x \\cdot x + x \\cdot ${k} = x(x + ${k})`];
  }
  const mt = m === 1 ? 'x' : `${m}x`;
  const nt = n === 1 ? 'x' : `${n}x`;
  const nf = n === 1 ? '' : `${n}`;
  return [
    `x^2 + ${mt} + ${nt} + ${m * n} = (x^2 + ${mt}) + (${nt} + ${m * n})`,
    `= x(x + ${m}) + ${nf}(x + ${m}) = ${factorTex(m, n)}`,
  ];
}
