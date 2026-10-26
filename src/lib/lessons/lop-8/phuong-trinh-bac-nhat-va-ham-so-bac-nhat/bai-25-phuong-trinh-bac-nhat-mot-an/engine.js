/**
 * The balance-scale model of an equation px + q = rx + s with natural
 * coefficients: each pan holds x-boxes and unit weights. Removing the same
 * thing from both pans, or splitting both pans into k equal parts, keeps the
 * scale level (an equivalent equation); acting on one pan only tips it.
 */

/**
 * @typedef {{ x: number, c: number }} Pan  x-boxes and unit weights on a pan
 * @typedef {{ left: Pan, right: Pan }} Scale
 * @typedef {'both' | 'left' | 'right'} Where
 * @typedef {{ kind: 'remove-x' } | { kind: 'remove-one' } | { kind: 'divide', k: number }} Move
 * @typedef {{ ok: true, scale: Scale } | { ok: false, reason: string }} MoveResult
 */

/** The puzzles, in rising difficulty; `solution` is the hidden x. */
export const PUZZLES = [
  { left: { x: 3, c: 2 }, right: { x: 0, c: 11 }, solution: 3 },
  { left: { x: 2, c: 5 }, right: { x: 1, c: 9 }, solution: 4 },
  { left: { x: 4, c: 1 }, right: { x: 2, c: 7 }, solution: 3 },
  { left: { x: 3, c: 4 }, right: { x: 1, c: 10 }, solution: 3 },
  { left: { x: 5, c: 3 }, right: { x: 2, c: 12 }, solution: 3 },
];

/**
 * @param {Pan} pan
 * @param {number} x
 */
export const weight = (pan, x) => pan.x * x + pan.c;

/**
 * Left minus right weight when x has the given value: 0 means level.
 * @param {Scale} s
 * @param {number} x
 */
export const tilt = (s, x) => weight(s.left, x) - weight(s.right, x);

/**
 * Apply a move to one pan.
 * @param {Pan} pan
 * @param {Move} move
 * @returns {Pan | string} the new pan, or why it cannot be done
 */
function onPan(pan, move) {
  if (move.kind === 'remove-x') {
    return pan.x > 0 ? { x: pan.x - 1, c: pan.c } : 'Đĩa cân không còn hộp x nào để bớt.';
  }
  if (move.kind === 'remove-one') {
    return pan.c > 0 ? { x: pan.x, c: pan.c - 1 } : 'Đĩa cân không còn quả cân nào để bớt.';
  }
  const { k } = move;
  if (pan.x % k !== 0 || pan.c % k !== 0) {
    return `Không chia được các vật trên đĩa thành ${k} phần giống hệt nhau.`;
  }
  return { x: pan.x / k, c: pan.c / k };
}

/**
 * Apply a move to both pans or to one of them.
 * @param {Scale} s
 * @param {Move} move
 * @param {Where} where
 * @returns {MoveResult}
 */
export function apply(s, move, where) {
  const left = where === 'right' ? s.left : onPan(s.left, move);
  const right = where === 'left' ? s.right : onPan(s.right, move);
  if (typeof left === 'string') return { ok: false, reason: left };
  if (typeof right === 'string') return { ok: false, reason: right };
  return { ok: true, scale: { left, right } };
}

/**
 * One side of the equation in TeX: 3x + 2, x, 11, 0.
 * @param {Pan} pan
 */
export function sideTex(pan) {
  const xs = pan.x === 0 ? '' : pan.x === 1 ? 'x' : `${pan.x}x`;
  if (!xs) return String(pan.c);
  return pan.c === 0 ? xs : `${xs} + ${pan.c}`;
}

/** @param {Scale} s */
export const equationTex = (s) => `${sideTex(s.left)} = ${sideTex(s.right)}`;

/**
 * Solved when one pan holds exactly one x-box and the other only weights.
 * @param {Scale} s
 * @returns {number | null} the value read off, or null
 */
export function solvedValue(s) {
  if (s.left.x === 1 && s.left.c === 0 && s.right.x === 0) return s.right.c;
  if (s.right.x === 1 && s.right.c === 0 && s.left.x === 0) return s.left.c;
  return null;
}

/**
 * Whether one pan has x-boxes on both pans removed already and the next
 * sensible move is to divide: the k that isolates x, or null.
 * @param {Scale} s
 */
export function divisorToIsolate(s) {
  if (s.left.x > 1 && s.left.c === 0 && s.right.x === 0) return s.left.x;
  if (s.right.x > 1 && s.right.c === 0 && s.left.x === 0) return s.right.x;
  return null;
}

/**
 * Term-by-term solving of ax + b = cx + d with integer coefficients: a term
 * moved to the other side changes sign (quy tắc chuyển vế), like terms are
 * collected, and kx = m is divided by k (quy tắc nhân).
 *
 * @typedef {{ id: number, c: number, x: boolean }} Term
 * @typedef {{ left: Term[], right: Term[] }} Equation
 */

/**
 * @param {number} a @param {number} b @param {number} c @param {number} d
 * @returns {Equation} ax + b = cx + d, zero terms left out
 */
export function linearEquation(a, b, c, d) {
  /** @type {Term[]} */
  const left = [];
  /** @type {Term[]} */
  const right = [];
  if (a) left.push({ id: 1, c: a, x: true });
  if (b) left.push({ id: 2, c: b, x: false });
  if (c) right.push({ id: 3, c: c, x: true });
  if (d) right.push({ id: 4, c: d, x: false });
  return { left, right };
}

/** Equations for the term-moving widget: [a, b, c, d] of ax + b = cx + d. */
export const LINEAR_PUZZLES = [
  [3, -5, -1, 7],
  [2, 9, 5, -3],
  [-4, 1, 1, 11],
  [-2, 6, 3, 8],
];

/**
 * Move the term with this id to the other side, changing its sign.
 * @param {Equation} eq
 * @param {number} id
 * @returns {Equation}
 */
export function moveTerm(eq, id) {
  const inLeft = eq.left.find((t) => t.id === id);
  const term = inLeft ?? eq.right.find((t) => t.id === id);
  if (!term) return eq;
  const moved = { ...term, c: -term.c };
  return inLeft
    ? { left: eq.left.filter((t) => t.id !== id), right: [...eq.right, moved] }
    : { left: [...eq.left, moved], right: eq.right.filter((t) => t.id !== id) };
}

/**
 * Collect like terms on each side: at most one x-term then one constant.
 * @param {Equation} eq
 * @returns {Equation}
 */
export function collect(eq) {
  let id = Math.max(0, ...eq.left.map((t) => t.id), ...eq.right.map((t) => t.id));
  /** @param {Term[]} side */
  const one = (side) => {
    const kx = side.filter((t) => t.x).reduce((s, t) => s + t.c, 0);
    const k = side.filter((t) => !t.x).reduce((s, t) => s + t.c, 0);
    /** @type {Term[]} */
    const out = [];
    if (kx) out.push({ id: ++id, c: kx, x: true });
    if (k) out.push({ id: ++id, c: k, x: false });
    return out;
  };
  return { left: one(eq.left), right: one(eq.right) };
}

/**
 * Whether the sides can still be collected (two like terms on one side).
 * @param {Equation} eq
 */
export function canCollect(eq) {
  /** @param {Term[]} side */
  const dup = (side) => side.filter((t) => t.x).length > 1 || side.filter((t) => !t.x).length > 1;
  return dup(eq.left) || dup(eq.right);
}

/**
 * The k of kx = m (or m = kx) when k ≠ 1, else null.
 * @param {Equation} eq
 */
export function divisor(eq) {
  const [xs, cs] =
    eq.left.length === 1 && eq.left[0].x && eq.right.every((t) => !t.x)
      ? [eq.left, eq.right]
      : eq.right.length === 1 && eq.right[0].x && eq.left.every((t) => !t.x)
        ? [eq.right, eq.left]
        : [null, null];
  if (!xs || !cs || cs.length > 1) return null;
  return xs[0].c === 1 ? null : xs[0].c;
}

/** @param {number} a @param {number} b @returns {number} */
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/**
 * The exact value p/q in lowest terms with q > 0.
 * @param {number} p @param {number} q
 * @returns {[number, number]}
 */
export function reduce(p, q) {
  const g = gcd(p, q) || 1;
  const s = q < 0 ? -1 : 1;
  return [(s * p) / g, (s * q) / g];
}

/** @param {[number, number]} f */
export const fracTex = ([p, q]) =>
  q === 1 ? String(p) : `${p < 0 ? '-' : ''}\\dfrac{${Math.abs(p)}}{${q}}`;

/**
 * Divide both sides by the coefficient of x: x = m/k.
 * @param {Equation} eq
 * @returns {{ k: number, value: [number, number] } | null}
 */
export function divideOut(eq) {
  const k = divisor(eq);
  if (k === null) return null;
  const cs = eq.left.some((t) => t.x) ? eq.right : eq.left;
  const m = cs.length ? cs[0].c : 0;
  return { k, value: reduce(m, k) };
}

/**
 * x = m (or m = x) read off, as an exact fraction; null when not solved.
 * @param {Equation} eq
 * @returns {[number, number] | null}
 */
export function solved(eq) {
  const xs = eq.left.some((t) => t.x) ? eq.left : eq.right;
  const cs = xs === eq.left ? eq.right : eq.left;
  if (xs.length !== 1 || xs[0].c !== 1 || cs.some((t) => t.x) || cs.length > 1) return null;
  return [cs.length ? cs[0].c : 0, 1];
}

/**
 * One term in TeX with its sign; `first` drops a leading plus.
 * @param {Term} t
 * @param {boolean} first
 */
export function termTex(t, first) {
  const abs = Math.abs(t.c);
  const body = t.x ? (abs === 1 ? 'x' : `${abs}x`) : String(abs);
  if (first) return t.c < 0 ? `-${body}` : body;
  return t.c < 0 ? `- ${body}` : `+ ${body}`;
}

/** @param {Term[]} side */
export const sideTermsTex = (side) =>
  side.length ? side.map((t, i) => termTex(t, i === 0)).join(' ') : '0';

/** @param {Equation} eq */
export const linearTex = (eq) => `${sideTermsTex(eq.left)} = ${sideTermsTex(eq.right)}`;
