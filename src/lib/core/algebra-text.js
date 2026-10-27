/**
 * Writing algebra the way the book prints it, as plain text for screen text,
 * aria labels and drill prompts (the book's minus sign `−`), and as TeX
 * source for live KaTeX (`-`): one-variable linear expressions `αx + β` and
 * factors `x − r`, signed fractions, two-variable equations `ax + by = c`
 * with substituted pairs, monomials and sums in x and y, and computed roots.
 * A coefficient of 1 is dropped and a zero term disappears.
 */

import { MINUS, fmt, formatFixed, formatNumber, intText, sup } from './number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/**
 * @param {number} alpha
 * @param {number} beta
 * @param {string} name the variable
 * @param {string} minus the minus sign to print
 * @param {(n: number) => string} num how a magnitude is written
 */
function lin(alpha, beta, name, minus, num) {
  let out = '';
  if (alpha !== 0) {
    const mag = Math.abs(alpha);
    out = `${alpha < 0 ? minus : ''}${mag === 1 ? '' : num(mag)}${name}`;
  }
  if (beta !== 0) {
    if (out === '') out = `${beta < 0 ? minus : ''}${num(Math.abs(beta))}`;
    else out += ` ${beta < 0 ? minus : '+'} ${num(Math.abs(beta))}`;
  }
  return out === '' ? '0' : out;
}

/**
 * `αx + β` as plain text: '3x − 2', '−x', '5', '0'.
 * @param {number} alpha
 * @param {number} beta
 * @param {string} [name]
 */
export function linText(alpha, beta, name = 'x') {
  return lin(alpha, beta, name, MINUS, fmt);
}

/**
 * `αx + β` as TeX source: '3x - 2'.
 * @param {number} alpha
 * @param {number} beta
 * @param {string} [name]
 */
export function linTex(alpha, beta, name = 'x') {
  return lin(alpha, beta, name, '-', String);
}

/**
 * The factor `x − r` as plain text: 'x − 3', 'x + 2', 'x'.
 * @param {number} r
 */
export function factorText(r) {
  return linText(1, -r);
}

/**
 * The factor `x − r` as TeX: 'x - 3', 'x + 2', 'x'.
 * @param {number} r
 */
export function factorTex(r) {
  return linTex(1, -r);
}

/**
 * A fraction p/q as TeX with the sign in front: '-\frac{3}{7}', '2'.
 * @param {number} p
 * @param {number} q non-zero
 */
export function signedFracTex(p, q) {
  const g = gcd(p, q) || 1;
  let n = p / g;
  let d = q / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  if (d === 1) return String(n);
  return `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`;
}

/**
 * A fraction p/q as plain text: '−3/7', '2'.
 * @param {number} p
 * @param {number} q non-zero
 */
export function signedFracText(p, q) {
  const g = gcd(p, q) || 1;
  let n = p / g;
  let d = q / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return d === 1 ? intText(n) : `${intText(n)}/${d}`;
}

/**
 * @param {number} coef
 * @param {string} name
 */
function xyTerm(coef, name) {
  const mag = Math.abs(coef);
  return `${mag === 1 ? '' : mag}${name}`;
}

/**
 * The left side `a·x + b·y` with signs joined: '2x − 3y', '−x + y', 'y'.
 * @param {number} a
 * @param {number} b
 * @param {string} minus the minus sign to print
 */
function xyLhs(a, b, minus) {
  let out = '';
  if (a !== 0) out = `${a < 0 ? minus : ''}${xyTerm(a, 'x')}`;
  if (b !== 0) {
    if (out === '') out = `${b < 0 ? minus : ''}${xyTerm(b, 'y')}`;
    else out += ` ${b < 0 ? minus : '+'} ${xyTerm(b, 'y')}`;
  }
  return out === '' ? '0' : out;
}

/**
 * Plain text for screen text and drill prompts: '2x − 3y = −5'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function eqText(a, b, c) {
  return `${xyLhs(a, b, MINUS)} = ${intText(c)}`;
}

/**
 * TeX source for live KaTeX: '2x - 3y = -5'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function eqTex(a, b, c) {
  return `${xyLhs(a, b, '-')} = ${c}`;
}

/**
 * A pair of numbers written the book's way: '(2; −1)'.
 * @param {number} x
 * @param {number} y
 */
export function pairText(x, y) {
  return `(${intText(x)}; ${intText(y)})`;
}

/**
 * How a pair is substituted, as plain text: '2 · 3 − 3 · (−1) = 9'.
 * Zero terms are left out, as in the equation itself.
 * @param {number} a
 * @param {number} b
 * @param {number} x
 * @param {number} y
 */
export function substituteText(a, b, x, y) {
  /** @param {number} coef @param {number} v */
  const part = (coef, v) => {
    const value = v < 0 ? `(${intText(v)})` : intText(v);
    const mag = Math.abs(coef);
    return mag === 1 ? value : `${mag} · ${value}`;
  };
  let out = '';
  if (a !== 0) out = `${a < 0 ? MINUS : ''}${part(a, x)}`;
  if (b !== 0) {
    if (out === '') out = `${b < 0 ? MINUS : ''}${part(b, y)}`;
    else out += ` ${b < 0 ? MINUS : '+'} ${part(b, y)}`;
  }
  return `${out === '' ? '0' : out} = ${intText(a * x + b * y)}`;
}

/**
 * A monomial in x and y as the book writes it: (−3, 2, 1) → '−3x²y',
 * (1, 0, 0) → '1'.
 * @param {number} c nonzero coefficient
 * @param {number} ex exponent of x
 * @param {number} ey exponent of y
 */
export function monoText(c, ex, ey) {
  const pow = (/** @type {string} */ v, /** @type {number} */ e) =>
    e === 0 ? '' : `${v}${e > 1 ? sup(e) : ''}`;
  const vars = pow('x', ex) + pow('y', ey);
  const abs = Math.abs(c);
  const body = vars === '' ? fmt(abs) : `${abs === 1 ? '' : fmt(abs)}${vars}`;
  return (c < 0 ? MINUS : '') + body;
}

/**
 * A sum of monomials [c, ex, ey] with the signs written between terms:
 * '3x²y − xy + 5'.
 * @param {[number, number, number][]} terms
 */
export function sumText(terms) {
  return terms
    .map(([c, ex, ey], i) => {
      const m = monoText(c, ex, ey);
      if (i === 0) return m;
      return c < 0 ? `− ${m.slice(1)}` : `+ ${m}`;
    })
    .join(' ');
}

/**
 * Whether `value` is, up to rounding noise, a decimal with at most `places`
 * digits after the comma.
 * @param {number} value
 * @param {number} [places]
 */
export function isShortDecimal(value, places = 2) {
  const scaled = value * 10 ** places;
  return Math.abs(scaled - Math.round(scaled)) < 1e-7;
}

/**
 * A computed root as text: '= 2,5' when exact, '≈ 1,414' otherwise.
 * @param {number} value
 * @returns {{ exact: boolean, sign: '=' | '≈', text: string }}
 */
export function rootValue(value) {
  if (isShortDecimal(value)) {
    const clean = Math.round(value * 100) / 100;
    return { exact: true, sign: '=', text: formatNumber(clean, 2) };
  }
  return { exact: false, sign: '≈', text: formatFixed(value, 3) };
}

/**
 * A number for plain text with the comma as decimal mark and the book's
 * minus sign, at most two places: 6.25 → '6,25', −3 → '−3'.
 * @param {number} value
 */
export function numText(value) {
  return formatNumber(Math.round(value * 100) / 100, 2);
}
