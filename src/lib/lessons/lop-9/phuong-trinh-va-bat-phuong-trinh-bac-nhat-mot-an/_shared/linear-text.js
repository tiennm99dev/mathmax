/**
 * Writing one-variable linear expressions `αx + β` with integer coefficients
 * the way the book prints them: a coefficient of 1 is dropped, a zero term
 * disappears. Plain text uses the book's minus sign `−` (for screen text,
 * aria labels and drill prompts); TeX uses `-` for live KaTeX.
 */

import { MINUS, fmt, intText } from '#lib/core/number-format.js';

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
  const g = gcd(p, q);
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
  const g = gcd(p, q);
  let n = p / g;
  let d = q / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return d === 1 ? intText(n) : `${intText(n)}/${d}`;
}

/**
 * Greatest common divisor of the sizes, at least 1.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}
