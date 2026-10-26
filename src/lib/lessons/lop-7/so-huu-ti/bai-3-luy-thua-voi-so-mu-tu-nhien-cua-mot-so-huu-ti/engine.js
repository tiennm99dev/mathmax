/**
 * The power-rule puzzle: an expression built from powers of one rational
 * base, joined by "·" and ":" and read from left to right. A rule card turns
 * the expression into a new one; the exact values before and after show
 * whether the step was right. Values are exact (BigInt numerator and
 * denominator) so large powers stay correct.
 */

import { writtenTex } from '../_shared/rational.js';

/** @typedef {import('../_shared/rational.js').Written} Written */

/**
 * One power x^m, or a power of a power (x^m)^n when `n` is set.
 * @typedef {{ m: number, n?: number }} Term
 */

/**
 * @typedef {object} Expr
 * @property {Written} base
 * @property {Term[]} terms
 * @property {Array<'·' | ':'>} ops between consecutive terms
 */

/**
 * @typedef {object} Rule
 * @property {string} id
 * @property {string} title card title
 * @property {string} tex the card's formula
 * @property {boolean} correct whether it is a true rule
 */

/** @type {Rule[]} */
export const RULES = [
  {
    id: 'nhan',
    title: 'Nhân hai lũy thừa cùng cơ số',
    tex: 'x^m \\cdot x^n = x^{m+n}',
    correct: true,
  },
  { id: 'chia', title: 'Chia hai lũy thừa cùng cơ số', tex: 'x^m : x^n = x^{m-n}', correct: true },
  {
    id: 'luy-thua',
    title: 'Lũy thừa của lũy thừa',
    tex: '(x^m)^n = x^{m \\cdot n}',
    correct: true,
  },
  {
    id: 'nhan-sai',
    title: 'Nhân: nhân số mũ?',
    tex: 'x^m \\cdot x^n = x^{m \\cdot n}',
    correct: false,
  },
  { id: 'chia-sai', title: 'Chia: chia số mũ?', tex: 'x^m : x^n = x^{m : n}', correct: false },
  {
    id: 'luy-thua-sai',
    title: 'Lũy thừa của lũy thừa: cộng số mũ?',
    tex: '(x^m)^n = x^{m+n}',
    correct: false,
  },
];

/**
 * Exact value of base^k as BigInt parts, sign on the numerator.
 * @param {Written} base
 * @param {number} k
 */
export function power(base, k) {
  const n = BigInt(base.f.n) ** BigInt(k);
  const d = BigInt(base.f.d) ** BigInt(k);
  return reduce(n, d);
}

/**
 * @param {bigint} a
 * @param {bigint} b
 * @returns {bigint}
 */
function gcdBig(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

/**
 * @param {bigint} n
 * @param {bigint} d
 * @returns {{ n: bigint, d: bigint }}
 */
function reduce(n, d) {
  if (d < 0n) [n, d] = [-n, -d];
  const g = gcdBig(n, d) || 1n;
  return { n: n / g, d: d / g };
}

/**
 * The exponent a term stands for: m, or m·n for (x^m)^n.
 * @param {Term} t
 */
const exponentOf = (t) => (t.n === undefined ? t.m : t.m * t.n);

/**
 * Exact value of the whole expression, read left to right.
 * @param {Expr} e
 * @returns {{ n: bigint, d: bigint }}
 */
export function value(e) {
  let k = exponentOf(e.terms[0]);
  e.ops.forEach((op, i) => {
    const next = exponentOf(e.terms[i + 1]);
    k = op === '·' ? k + next : k - next;
  });
  // A negative total exponent would mean a quotient below x^0; puzzles avoid it.
  if (k >= 0) return power(e.base, k);
  const p = power(e.base, -k);
  return reduce(p.d, p.n);
}

/**
 * TeX of a value: an integer or \frac{n}{d}.
 * @param {{ n: bigint, d: bigint }} v
 */
export function valueTex(v) {
  return v.d === 1n ? `${v.n}` : `\\frac{${v.n}}{${v.d}}`;
}

/**
 * Plain text of a value: '−27', '8/125'.
 * @param {{ n: bigint, d: bigint }} v
 */
export function valueText(v) {
  const sign = v.n < 0n ? '−' : '';
  const n = v.n < 0n ? -v.n : v.n;
  return v.d === 1n ? `${sign}${n}` : `${sign}${n}/${v.d}`;
}

/**
 * True when two exact values are equal.
 * @param {{ n: bigint, d: bigint }} a
 * @param {{ n: bigint, d: bigint }} b
 */
export function sameValue(a, b) {
  return a.n === b.n && a.d === b.d;
}

/**
 * TeX of the base, bracketed unless it is a natural number.
 * @param {Written} base
 */
function baseTex(base) {
  const t = writtenTex(base);
  return base.f.d === 1 && base.f.n >= 0 ? t : `\\left(${t}\\right)`;
}

/**
 * TeX of one term.
 * @param {Written} base
 * @param {Term} t
 */
function termTex(base, t) {
  const inner = `${baseTex(base)}^{${t.m}}`;
  if (t.n === undefined) return inner;
  const natural = base.f.d === 1 && base.f.n >= 0;
  return natural ? `\\left(${inner}\\right)^{${t.n}}` : `\\left[${inner}\\right]^{${t.n}}`;
}

/**
 * TeX of the whole expression.
 * @param {Expr} e
 */
export function exprTex(e) {
  let tex = termTex(e.base, e.terms[0]);
  e.ops.forEach((op, i) => {
    tex += ` ${op === '·' ? '\\cdot' : ':'} ${termTex(e.base, e.terms[i + 1])}`;
  });
  return tex;
}

/**
 * True when the expression is a single power x^k: the puzzle is solved.
 * @param {Expr} e
 */
export function isDone(e) {
  return e.terms.length === 1 && e.terms[0].n === undefined;
}

/**
 * Applies a rule card. Products and quotients act on the first two terms
 * (the expression is read left to right); a power of a power acts on the
 * first term that is one. Returns the new expression, or a reason why the
 * card does not fit.
 * @param {Expr} e
 * @param {string} ruleId
 * @returns {{ next: Expr } | { reason: string }}
 */
export function apply(e, ruleId) {
  if (ruleId === 'luy-thua' || ruleId === 'luy-thua-sai') {
    const i = e.terms.findIndex((t) => t.n !== undefined);
    if (i < 0) return { reason: 'Biểu thức không còn lũy thừa của lũy thừa nào.' };
    const t = e.terms[i];
    const n = /** @type {number} */ (t.n);
    const m = ruleId === 'luy-thua' ? t.m * n : t.m + n;
    const terms = e.terms.map((x, j) => (j === i ? { m } : x));
    return { next: { ...e, terms } };
  }
  if (e.terms.length < 2) return { reason: 'Chỉ còn một lũy thừa, không còn phép nhân hay chia.' };
  const [a, b] = e.terms;
  const op = e.ops[0];
  if (a.n !== undefined || b.n !== undefined) {
    return { reason: 'Hãy đưa lũy thừa của lũy thừa về một lũy thừa trước đã.' };
  }
  const wantOp = ruleId.startsWith('nhan') ? '·' : ':';
  if (op !== wantOp) {
    return {
      reason: `Phép tính đầu tiên (từ trái sang phải) là phép ${op === '·' ? 'nhân' : 'chia'}, không phải phép ${wantOp === '·' ? 'nhân' : 'chia'}.`,
    };
  }
  /** @type {number} */
  let m;
  if (ruleId === 'nhan') m = a.m + b.m;
  else if (ruleId === 'nhan-sai') m = a.m * b.m;
  else if (ruleId === 'chia') {
    if (a.m < b.m) return { reason: 'Số mũ của số bị chia phải không nhỏ hơn số mũ của số chia.' };
    m = a.m - b.m;
  } else {
    if (a.m % b.m !== 0)
      return { reason: `${a.m} không chia hết cho ${b.m}, thẻ này không dùng được.` };
    m = a.m / b.m;
  }
  return { next: { ...e, terms: [{ m }, ...e.terms.slice(2)], ops: e.ops.slice(1) } };
}

/** @type {Expr[]} */
export const PUZZLES = [
  {
    base: { f: { n: 2, d: 3 }, form: 'frac' },
    terms: [{ m: 5 }, { m: 3 }],
    ops: ['·'],
  },
  {
    base: { f: { n: -3, d: 1 }, form: 'int' },
    terms: [{ m: 6 }, { m: 3 }],
    ops: [':'],
  },
  {
    base: { f: { n: -1, d: 2 }, form: 'frac' },
    terms: [{ m: 2, n: 3 }],
    ops: [],
  },
  {
    base: { f: { n: 3, d: 2 }, form: 'dec' },
    terms: [{ m: 4 }, { m: 3 }, { m: 5 }],
    ops: ['·', ':'],
  },
  {
    base: { f: { n: 2, d: 5 }, form: 'frac' },
    terms: [{ m: 3, n: 2 }, { m: 4 }, { m: 7 }],
    ops: ['·', ':'],
  },
  {
    base: { f: { n: -1, d: 2 }, form: 'dec' },
    terms: [{ m: 9 }, { m: 2, n: 3 }],
    ops: [':'],
  },
];
