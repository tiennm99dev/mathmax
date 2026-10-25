import { gcd, lcm } from '../numtheory-engine/gcd.js';

/**
 * A fraction n/d with integer parts. `fraction()` keeps the denominator
 * positive but does not reduce, so 2/4 stays 2/4 until `simplify()`.
 * @typedef {Readonly<{n: number, d: number}>} Fraction
 */

/**
 * A mixed number: `whole` plus `n/d`, with 0 <= n < d. The sign sits on
 * `whole`, or on `n` when `whole` is 0 (−3/4 is { whole: 0, n: -3, d: 4 }).
 * @typedef {Readonly<{whole: number, n: number, d: number}>} Mixed
 */

/**
 * @param {number} n numerator, an integer
 * @param {number} [d] denominator, a non-zero integer
 * @returns {Fraction}
 */
export function fraction(n, d = 1) {
  if (!Number.isInteger(n) || !Number.isInteger(d)) {
    throw new Error(`fraction parts must be integers, got ${n}/${d}`);
  }
  if (d === 0) throw new Error('fraction denominator must not be 0');
  // `+ 0` turns -0 into 0 so equal fractions compare equal with toEqual.
  return d < 0 ? { n: -n + 0, d: -d } : { n: n + 0, d };
}

/** @param {Fraction} f @returns {Fraction} */
export function simplify(f) {
  const g = gcd(f.n, f.d) || 1;
  return fraction(f.n / g, f.d / g);
}

/** @param {Fraction} f */
export function isSimplest(f) {
  return gcd(f.n, f.d) === 1;
}

/**
 * Multiply both parts by `k`: 2/3 expanded by 4 is 8/12.
 * @param {Fraction} f @param {number} k a non-zero integer
 * @returns {Fraction}
 */
export function expand(f, k) {
  return fraction(f.n * k, f.d * k);
}

/** @param {Fraction} a @param {Fraction} b */
export function equals(a, b) {
  return a.n * b.d === b.n * a.d;
}

/**
 * @param {Fraction} a @param {Fraction} b
 * @returns {-1 | 0 | 1}
 */
export function compare(a, b) {
  const diff = a.n * b.d - b.n * a.d;
  return diff < 0 ? -1 : diff > 0 ? 1 : 0;
}

/**
 * Rewrite two fractions over their least common denominator, the step pupils
 * do before adding or comparing.
 * @param {Fraction} a @param {Fraction} b
 * @returns {[Fraction, Fraction]}
 */
export function commonDenominator(a, b) {
  const d = lcm(a.d, b.d);
  return [fraction(a.n * (d / a.d), d), fraction(b.n * (d / b.d), d)];
}

/** @param {Fraction} a @param {Fraction} b @returns {Fraction} */
export function add(a, b) {
  const [x, y] = commonDenominator(a, b);
  return simplify(fraction(x.n + y.n, x.d));
}

/** @param {Fraction} a @param {Fraction} b @returns {Fraction} */
export function sub(a, b) {
  return add(a, fraction(-b.n, b.d));
}

/** @param {Fraction} a @param {Fraction} b @returns {Fraction} */
export function mul(a, b) {
  return simplify(fraction(a.n * b.n, a.d * b.d));
}

/** @param {Fraction} a @param {Fraction} b @returns {Fraction} */
export function div(a, b) {
  if (b.n === 0) throw new Error('division by a zero fraction');
  return simplify(fraction(a.n * b.d, a.d * b.n));
}

/** @param {Fraction} f */
export function toNumber(f) {
  return f.n / f.d;
}

/** @param {Fraction} f @returns {Mixed} */
export function toMixed(f) {
  const s = simplify(f);
  const whole = Math.trunc(s.n / s.d) + 0;
  const rest = Math.abs(s.n % s.d);
  return { whole, n: whole === 0 ? s.n : rest, d: s.d };
}

/**
 * @param {number} whole @param {number} n @param {number} d
 * @returns {Fraction}
 */
export function fromMixed(whole, n, d) {
  const sign = whole < 0 ? -1 : 1;
  return fraction(whole * d + sign * n, d);
}

/**
 * Exact fraction for a finite decimal, reduced: 0.75 → 3/4, 2.5 → 5/2.
 * Accepts the Vietnamese decimal comma in strings ('3,25').
 * @param {number | string} value
 * @returns {Fraction}
 */
export function fromDecimal(value) {
  const text = String(value).trim().replace(',', '.');
  const match = /^(-?)(\d*)(?:\.(\d+))?$/.exec(text);
  if (!match || (match[2] === '' && match[3] === undefined)) {
    throw new Error(`not a finite decimal: ${value}`);
  }
  const [, sign, int, frac = ''] = match;
  const d = 10 ** frac.length;
  const n = Number(int || '0') * d + Number(frac || '0');
  return simplify(fraction(sign ? -n : n, d));
}

/**
 * Plain text such as '3/4', '−3/4' or '5' (a whole number when d is 1).
 * Uses the typographic minus sign.
 * @param {Fraction} f
 */
export function format(f) {
  const sign = f.n < 0 ? '−' : '';
  const n = Math.abs(f.n);
  return f.d === 1 ? `${sign}${n}` : `${sign}${n}/${f.d}`;
}

/**
 * TeX such as '\frac{3}{4}' or '-\frac{3}{4}'.
 * @param {Fraction} f
 */
export function toTex(f) {
  const sign = f.n < 0 ? '-' : '';
  const n = Math.abs(f.n);
  return f.d === 1 ? `${sign}${n}` : `${sign}\\frac{${n}}{${f.d}}`;
}
