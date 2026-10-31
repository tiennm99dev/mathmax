/**
 * A small GeoGebra CAS for grade 9: it reads what learners type the way
 * GeoGebra does (implicit multiplication `3x`, `2(x+1)`, powers `x^2`,
 * `sqrt(3)`, fractions with x in the denominator), and answers the commands
 * Solve, Solutions and NSolve for one equation in x and for a system of two
 * first-degree equations in x and y. Equations are turned into rational
 * functions; solving clears the denominators, finds the real roots (exactly
 * when the coefficients are rational: rational roots and square-root forms)
 * and drops the roots that make a denominator zero. The graph view reads
 * `y = ...` or `f(x) = ...` lines and finds where two graphs meet.
 */

import { numTex } from '#lib/core/number-format.js';

export class CasError extends Error {}

// ------------------------------------------------------------------ syntax

/**
 * @typedef {{ t: 'num', v: number } | { t: 'var', v: 'x' | 'y' } | { t: 'neg', a: Node }
 *   | { t: 'add' | 'sub' | 'mul' | 'div' | 'pow', a: Node, b: Node } | { t: 'sqrt', a: Node }} Node
 */
/** @typedef {{ l: Node, r: Node }} Equation */

/** @typedef {{ k: 'num', v: number } | { k: 'id', v: string } | { k: 'op', v: string }} Tok */

/**
 * Splits input into tokens. Letters run together into one name; a name made
 * only of x and y is a product of variables (`xy`).
 * @param {string} text
 * @returns {Tok[]}
 */
export function tokenize(text) {
  /** @type {Tok[]} */
  const out = [];
  const src = text.replace(/[−–]/g, '-').replace(/[·×]/g, '*').replace(/:/g, '/');
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    const num = /^(\d+(\.\d*)?|\.\d+)/.exec(src.slice(i));
    if (num) {
      out.push({ k: 'num', v: Number(num[0]) });
      i += num[0].length;
      continue;
    }
    const name = /^\p{L}+/u.exec(src.slice(i));
    if (name) {
      out.push({ k: 'id', v: name[0] });
      i += name[0].length;
      continue;
    }
    if (ch === '²' || ch === '³') {
      out.push({ k: 'op', v: '^' }, { k: 'num', v: ch === '²' ? 2 : 3 });
      i++;
      continue;
    }
    if ('+-*/^(){},=√'.includes(ch)) {
      out.push({ k: 'op', v: ch });
      i++;
      continue;
    }
    throw new CasError(`Không hiểu kí hiệu "${ch}".`);
  }
  return out;
}

/**
 * Parses an expression in x and y from tokens.
 * @param {Tok[]} toks
 * @returns {Node}
 */
export function parseExpr(toks) {
  let i = 0;
  const peek = () => toks[i];
  /** @param {string} v */
  const isOp = (v) => toks[i]?.k === 'op' && toks[i].v === v;
  /** @param {string} v */
  const expect = (v) => {
    if (!isOp(v)) throw new CasError(v === ')' ? 'Thiếu dấu ngoặc ")".' : `Thiếu "${v}".`);
    i++;
  };

  /** @returns {Node} */
  function sum() {
    let a = product();
    while (isOp('+') || isOp('-')) {
      const op = toks[i++].v;
      const b = product();
      a = { t: op === '+' ? 'add' : 'sub', a, b };
    }
    return a;
  }

  /** Whether the next token can start a factor written right after another one. */
  function startsFactor() {
    const t = peek();
    if (!t) return false;
    if (t.k === 'num' || t.k === 'id') return true;
    return t.k === 'op' && (t.v === '(' || t.v === '√');
  }

  /** @returns {Node} */
  function product() {
    let a = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = toks[i++].v;
        const b = unary();
        a = { t: op === '*' ? 'mul' : 'div', a, b };
      } else if (startsFactor()) {
        if (peek()?.k === 'num') throw new CasError('Hai số viết liền nhau; thêm dấu * hoặc +.');
        a = { t: 'mul', a, b: power() };
      } else return a;
    }
  }

  /** @returns {Node} */
  function unary() {
    if (isOp('-')) {
      i++;
      return { t: 'neg', a: unary() };
    }
    if (isOp('+')) {
      i++;
      return unary();
    }
    return power();
  }

  /** @returns {Node} */
  function power() {
    const base = atom();
    if (isOp('^')) {
      i++;
      if (isOp('-')) {
        i++;
        return { t: 'pow', a: base, b: { t: 'neg', a: atom() } };
      }
      return { t: 'pow', a: base, b: atom() };
    }
    return base;
  }

  /** @returns {Node} */
  function atom() {
    const t = peek();
    if (!t) throw new CasError('Biểu thức chưa viết xong.');
    if (t.k === 'num') {
      i++;
      return { t: 'num', v: t.v };
    }
    if (t.k === 'op' && t.v === '(') {
      i++;
      const v = sum();
      expect(')');
      return v;
    }
    if (t.k === 'op' && t.v === '√') {
      i++;
      return { t: 'sqrt', a: power() };
    }
    if (t.k === 'id') {
      i++;
      const low = t.v.toLowerCase();
      if (low === 'sqrt' || low === 'căn') {
        expect('(');
        const v = sum();
        expect(')');
        return { t: 'sqrt', a: v };
      }
      if (/^[xy]+$/.test(t.v)) {
        /** @type {Node} */
        let node = { t: 'var', v: /** @type {'x' | 'y'} */ (t.v[0]) };
        for (const ch of t.v.slice(1))
          node = { t: 'mul', a: node, b: { t: 'var', v: /** @type {'x' | 'y'} */ (ch) } };
        return node;
      }
      throw new CasError(`Không hiểu tên "${t.v}". Chỉ dùng biến x, y và hàm sqrt.`);
    }
    throw new CasError(`Không hiểu "${t.v}" ở vị trí này.`);
  }

  const node = sum();
  if (i < toks.length) throw new CasError(`Không hiểu "${toks[i].v}" ở vị trí này.`);
  return node;
}

/**
 * Parses `left = right`.
 * @param {string} text
 * @returns {Equation}
 */
export function parseEquation(text) {
  const parts = text.split('=');
  if (parts.length !== 2) throw new CasError('Phương trình cần đúng một dấu "=".');
  if (!parts[0].trim() || !parts[1].trim()) throw new CasError('Thiếu một vế của phương trình.');
  return { l: parseExpr(tokenize(parts[0])), r: parseExpr(tokenize(parts[1])) };
}

/**
 * Value of an expression at a point; NaN where it is undefined.
 * @param {Node} n
 * @param {{ x: number, y: number }} at
 * @returns {number}
 */
export function evaluate(n, at) {
  switch (n.t) {
    case 'num':
      return n.v;
    case 'var':
      return at[n.v];
    case 'neg':
      return -evaluate(n.a, at);
    case 'sqrt': {
      const v = evaluate(n.a, at);
      return v < 0 ? NaN : Math.sqrt(v);
    }
    case 'add':
      return evaluate(n.a, at) + evaluate(n.b, at);
    case 'sub':
      return evaluate(n.a, at) - evaluate(n.b, at);
    case 'mul':
      return evaluate(n.a, at) * evaluate(n.b, at);
    case 'div': {
      const d = evaluate(n.b, at);
      return Math.abs(d) < 1e-12 ? NaN : evaluate(n.a, at) / d;
    }
    default:
      return evaluate(n.a, at) ** evaluate(n.b, at);
  }
}

/** @param {Node} n @returns {Set<string>} */
export function variables(n) {
  if (n.t === 'var') return new Set([n.v]);
  if (n.t === 'num') return new Set();
  if (n.t === 'neg' || n.t === 'sqrt') return variables(n.a);
  return new Set([...variables(n.a), ...variables(n.b)]);
}

// ------------------------------------------------------------------ polynomials

/** @typedef {Map<string, number>} Poly coefficient per monomial key 'i,j' = x^i y^j */
/** @typedef {{ n: Poly, d: Poly }} Rat */

/** @param {number} c @returns {Poly} */
const constPoly = (c) => (c === 0 ? new Map() : new Map([['0,0', c]]));

/** @param {Poly} p */
function clean(p) {
  const big = Math.max(1, ...[...p.values()].map(Math.abs));
  for (const [k, v] of p) if (Math.abs(v) < 1e-11 * big) p.delete(k);
  return p;
}

/** @param {Poly} a @param {Poly} b @param {number} [s] */
function padd(a, b, s = 1) {
  const out = new Map(a);
  for (const [k, v] of b) out.set(k, (out.get(k) ?? 0) + s * v);
  return clean(out);
}

/** @param {Poly} a @param {Poly} b */
function pmul(a, b) {
  /** @type {Poly} */
  const out = new Map();
  for (const [ka, va] of a)
    for (const [kb, vb] of b) {
      const [i1, j1] = ka.split(',').map(Number);
      const [i2, j2] = kb.split(',').map(Number);
      const k = `${i1 + i2},${j1 + j2}`;
      out.set(k, (out.get(k) ?? 0) + va * vb);
    }
  return clean(out);
}

/** @param {Poly} p */
const isZero = (p) => p.size === 0;

/** @param {Poly} p */
function constOf(p) {
  if (p.size === 0) return 0;
  if (p.size === 1 && p.has('0,0')) return /** @type {number} */ (p.get('0,0'));
  return null;
}

/**
 * Turns an expression into a rational function, collecting every
 * denominator that must not be zero.
 * @param {Node} n
 * @param {Poly[]} conds
 * @returns {Rat}
 */
export function toRat(n, conds) {
  const one = constPoly(1);
  switch (n.t) {
    case 'num':
      return { n: constPoly(n.v), d: one };
    case 'var':
      return { n: new Map([[n.v === 'x' ? '1,0' : '0,1', 1]]), d: one };
    case 'neg': {
      const a = toRat(n.a, conds);
      return { n: padd(new Map(), a.n, -1), d: a.d };
    }
    case 'sqrt': {
      const v = constOf(toRat(n.a, conds).n);
      const dv = constOf(toRat(n.a, conds).d);
      if (v === null || dv === null)
        throw new CasError('Mô phỏng chỉ lấy căn bậc hai của một số, chẳng hạn sqrt(3).');
      if (v / dv < 0) throw new CasError('Không lấy được căn bậc hai của số âm.');
      return { n: constPoly(Math.sqrt(v / dv)), d: one };
    }
    case 'add':
    case 'sub': {
      const a = toRat(n.a, conds);
      const b = toRat(n.b, conds);
      return {
        n: padd(pmul(a.n, b.d), pmul(b.n, a.d), n.t === 'add' ? 1 : -1),
        d: pmul(a.d, b.d),
      };
    }
    case 'mul': {
      const a = toRat(n.a, conds);
      const b = toRat(n.b, conds);
      return { n: pmul(a.n, b.n), d: pmul(a.d, b.d) };
    }
    case 'div': {
      const a = toRat(n.a, conds);
      const b = toRat(n.b, conds);
      if (isZero(b.n)) throw new CasError('Không chia được cho 0.');
      if (constOf(b.n) === null) conds.push(b.n);
      return { n: pmul(a.n, b.d), d: pmul(a.d, b.n) };
    }
    default: {
      const e = toRat(n.b, conds);
      const k = constOf(e.n);
      const kd = constOf(e.d);
      if (k === null || kd === null || !Number.isInteger(k / kd) || Math.abs(k / kd) > 12)
        throw new CasError('Số mũ phải là số nguyên nhỏ, chẳng hạn x^2.');
      const p = k / kd;
      const base = toRat(n.a, conds);
      let r = { n: constPoly(1), d: constPoly(1) };
      for (let s = 0; s < Math.abs(p); s++) r = { n: pmul(r.n, base.n), d: pmul(r.d, base.d) };
      if (p < 0) {
        if (isZero(base.n)) throw new CasError('Không chia được cho 0.');
        if (constOf(base.n) === null) conds.push(base.n);
        r = { n: r.d, d: r.n };
      }
      return r;
    }
  }
}

/**
 * The polynomial whose zeros solve `l = r`, and the denominators that must not vanish.
 * @param {Equation} eq
 */
export function clearDenominators(eq) {
  /** @type {Poly[]} */
  const conds = [];
  const L = toRat(eq.l, conds);
  const R = toRat(eq.r, conds);
  return { poly: padd(pmul(L.n, R.d), pmul(R.n, L.d), -1), conds };
}

/** @param {Poly} p @returns {number[]} coefficients of x^0, x^1, ... */
function univariate(p) {
  /** @type {number[]} */
  const c = [];
  for (const [k, v] of p) {
    const [i, j] = k.split(',').map(Number);
    if (j !== 0) throw new CasError('Phương trình có cả x và y: hãy giải một hệ hai phương trình.');
    c[i] = (c[i] ?? 0) + v;
  }
  return Array.from({ length: c.length }, (_, i) => c[i] ?? 0);
}

/** @param {Poly} p @param {number} x @param {number} [y] */
function pval(p, x, y = 0) {
  let s = 0;
  for (const [k, v] of p) {
    const [i, j] = k.split(',').map(Number);
    s += v * x ** i * y ** j;
  }
  return s;
}

// ------------------------------------------------------------------ exact numbers

/**
 * The fraction p/q (q ≤ maxDen) within `tol` of v, or null.
 * @param {number} v @param {number} [maxDen] @param {number} [tol]
 * @returns {[number, number] | null}
 */
export function nearFraction(v, maxDen = 1000, tol = 1e-9) {
  for (let q = 1; q <= maxDen; q++) {
    const p = Math.round(v * q);
    if (Math.abs(v * q - p) <= tol * Math.max(1, Math.abs(v * q))) {
      const g = gcdNum(Math.abs(p), q) || 1;
      return [p / g, q / g];
    }
  }
  return null;
}

/** @param {number} a @param {number} b */
function gcdNum(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

/** @param {bigint} a @param {bigint} b */
function gcdBig(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b) [a, b] = [b, a % b];
  return a;
}

/** TeX of p/q. @param {number} p @param {number} q */
export function fracTex(p, q) {
  if (q < 0) [p, q] = [-p, -q];
  if (q === 1) return numTex(p);
  return `${p < 0 ? '-' : ''}\\dfrac{${numTex(Math.abs(p))}}{${numTex(q)}}`;
}

/**
 * TeX of (a + b√k) / t with whole numbers a, b, t and t > 0.
 * @param {number} a @param {number} b @param {number} k @param {number} t
 */
export function surdTex(a, b, k, t) {
  const g = gcdNum(gcdNum(Math.abs(a), Math.abs(b)), t) || 1;
  [a, b, t] = [a / g, b / g, t / g];
  const root = `${Math.abs(b) === 1 ? '' : numTex(Math.abs(b))}\\sqrt{${k}}`;
  let num;
  if (a === 0) num = `${b < 0 ? '-' : ''}${root}`;
  else num = `${numTex(a)} ${b < 0 ? '-' : '+'} ${root}`;
  if (t === 1) return num;
  if (a === 0 && b < 0) return `-\\dfrac{${root}}{${t}}`;
  return `\\dfrac{${num}}{${t}}`;
}

/**
 * A recognisable exact form (a + b√k) / t of a decimal value, or null.
 * @param {number} v
 */
function guessSurd(v) {
  for (const t of [1, 2, 3, 4, 6])
    for (const k of [2, 3, 5, 6, 7, 10])
      for (let B = 1; B <= 20; B++)
        for (const b of [B, -B]) {
          const a = v * t - b * Math.sqrt(k);
          const ar = Math.round(a);
          if (Math.abs(a - ar) < 1e-8 && Math.abs(ar) <= 1000) return surdTex(ar, b, k, t);
        }
  return null;
}

/** Largest s with s² | n, and the rest: n = s²k. @param {number} n */
function splitSquare(n) {
  let s = 1;
  let k = n;
  for (let f = 2; f * f <= k; f++)
    while (k % (f * f) === 0) {
      k /= f * f;
      s *= f;
    }
  return { s, k };
}

/** Divisors of a whole number (|n| ≤ 1e10). @param {bigint} n */
function divisors(n) {
  if (n < 0n) n = -n;
  /** @type {bigint[]} */
  const out = [];
  for (let d = 1n; d * d <= n; d++)
    if (n % d === 0n) {
      out.push(d);
      if (d * d !== n) out.push(n / d);
    }
  return out;
}

// ------------------------------------------------------------------ roots

/** @typedef {{ value: number, tex: string, exact: boolean }} Root */

/**
 * Real roots of a polynomial with float coefficients (degree ≥ 1), by the
 * Durand–Kerner iteration, with repeated roots merged.
 * @param {number[]} c coefficients from x^0
 * @returns {number[]}
 */
export function numericRoots(c) {
  const n = c.length - 1;
  const lead = c[n];
  const a = c.map((v) => v / lead);
  /** @type {Array<[number, number]>} */
  let z = Array.from({ length: n }, (_, k) => {
    const ang = (2 * Math.PI * k) / n + 0.4;
    const r = 1 + Math.max(...a.slice(0, n).map(Math.abs));
    return [r * Math.cos(ang), r * Math.sin(ang)];
  });
  /** @param {[number, number]} p @param {[number, number]} q @returns {[number, number]} */
  const cm = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
  /** @param {[number, number]} p @param {[number, number]} q @returns {[number, number]} */
  const cd = (p, q) => {
    const m = q[0] * q[0] + q[1] * q[1] || 1e-300;
    return [(p[0] * q[0] + p[1] * q[1]) / m, (p[1] * q[0] - p[0] * q[1]) / m];
  };
  for (let it = 0; it < 800; it++) {
    let moved = 0;
    z = z.map((zi, i) => {
      /** @type {[number, number]} */
      let pv = [1, 0];
      for (let k = n - 1; k >= 0; k--) pv = [cm(pv, zi)[0] + a[k], cm(pv, zi)[1]];
      /** @type {[number, number]} */
      let den = [1, 0];
      z.forEach((zj, j) => {
        if (j !== i) den = cm(den, [zi[0] - zj[0], zi[1] - zj[1]]);
      });
      const step = cd(pv, den);
      moved = Math.max(moved, Math.hypot(step[0], step[1]));
      return [zi[0] - step[0], zi[1] - step[1]];
    });
    if (moved < 1e-14) break;
  }
  const real = z
    .filter((p) => Math.abs(p[1]) < 1e-6 * Math.max(1, Math.abs(p[0])))
    .map((p) => p[0])
    .sort((u, v) => u - v);
  /** @type {number[]} */
  const out = [];
  for (const r of real) if (!out.length || Math.abs(r - out[out.length - 1]) > 1e-5) out.push(r);
  return out;
}

/**
 * Real roots of a one-variable polynomial, exact when the coefficients are
 * rational.
 * @param {number[]} c coefficients from x^0, leading coefficient non-zero
 * @returns {Root[]}
 */
export function realRoots(c) {
  const fr = c.map((v) => nearFraction(v));
  if (fr.every(Boolean)) return exactRoots(/** @type {Array<[number, number]>} */ (fr));
  return floatRoots(c);
}

/** @param {number} v @returns {Root} */
function floatRoot(v) {
  const f = nearFraction(v, 100, 1e-10);
  if (f) return { value: f[0] / f[1], tex: fracTex(f[0], f[1]), exact: true };
  const s = guessSurd(v);
  if (s) return { value: v, tex: s, exact: true };
  return { value: v, tex: `${numTex(v, 4)}`, exact: false };
}

/** @param {number[]} c */
function floatRoots(c) {
  const n = c.length - 1;
  if (n === 1) return [floatRoot(-c[0] / c[1])];
  if (n === 2) {
    const [cc, b, a] = c;
    const D = b * b - 4 * a * cc;
    const scale = Math.max(b * b, Math.abs(4 * a * cc), 1e-300);
    if (D < -1e-12 * scale) return [];
    if (Math.abs(D) <= 1e-12 * scale) return [floatRoot(-b / (2 * a))];
    const s = Math.sqrt(D);
    return [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((u, v) => u - v).map(floatRoot);
  }
  return numericRoots(c).map(floatRoot);
}

/**
 * @param {Array<[number, number]>} fr coefficients as fractions
 * @returns {Root[]}
 */
function exactRoots(fr) {
  const lcm = fr.reduce((m, [, q]) => (m / gcdNum(m, q)) * q, 1);
  /** @type {bigint[]} */
  let a = fr.map(([p, q]) => BigInt(Math.round((p * lcm) / q)));
  /** @type {Root[]} */
  const roots = [];
  // x = 0 roots.
  while (a.length > 1 && a[0] === 0n) {
    a = a.slice(1);
    if (!roots.some((r) => r.value === 0)) roots.push({ value: 0, tex: '0', exact: true });
  }
  /** Rational roots p/q: p | a0, q | an. */
  let found = true;
  while (found && a.length > 2) {
    found = false;
    const small = (a[0] < 0n ? -a[0] : a[0]) <= 10n ** 10n;
    const lead = a[a.length - 1];
    if (!small || (lead < 0n ? -lead : lead) > 10n ** 10n) break;
    outer: for (const q of divisors(lead))
      for (const pAbs of divisors(a[0]))
        for (const p of [pAbs, -pAbs]) {
          if (gcdBig(p, q) !== 1n) continue;
          // q^n P(p/q) = Σ a_i p^i q^(n-i).
          const n = a.length - 1;
          let s = 0n;
          for (let i = 0; i <= n; i++) s += a[i] * p ** BigInt(i) * q ** BigInt(n - i);
          if (s !== 0n) continue;
          // Divide by (q x − p): synthetic division from the top.
          /** @type {bigint[]} */
          const b = new Array(n).fill(0n);
          let carry = 0n;
          for (let i = n; i >= 1; i--) {
            const coef = a[i] + carry;
            b[i - 1] = coef / q;
            carry = b[i - 1] * p;
          }
          a = b;
          const value = Number(p) / Number(q);
          if (!roots.some((r) => Math.abs(r.value - value) < 1e-12))
            roots.push({ value, tex: fracTex(Number(p), Number(q)), exact: true });
          found = true;
          break outer;
        }
  }
  const m = a.length - 1;
  if (m === 1) {
    const value = -Number(a[0]) / Number(a[1]);
    const f = nearFraction(value);
    if (!roots.some((r) => Math.abs(r.value - value) < 1e-12))
      roots.push({ value, tex: f ? fracTex(f[0], f[1]) : numTex(value, 4), exact: true });
  } else if (m === 2) {
    const [cc, b, aa] = a.map(Number);
    const D = b * b - 4 * aa * cc;
    if (D === 0) {
      const value = -b / (2 * aa);
      if (!roots.some((r) => Math.abs(r.value - value) < 1e-12))
        roots.push({ value, tex: fracTex(-b, 2 * aa), exact: true });
    } else if (D > 0) {
      const { s, k } = splitSquare(D);
      const sign = aa < 0 ? -1 : 1;
      for (const pm of [-1, 1]) {
        const value = (-b + pm * Math.sqrt(D)) / (2 * aa);
        const tex =
          k === 1
            ? fracTex(sign * (-b + pm * s), Math.abs(2 * aa))
            : surdTex(sign * -b, sign * pm * s, k, Math.abs(2 * aa));
        roots.push({ value, tex, exact: true });
      }
    }
  } else if (m >= 3) {
    for (const v of numericRoots(a.map(Number))) roots.push(floatRoot(v));
  }
  return roots.sort((u, v) => u.value - v.value);
}

// ------------------------------------------------------------------ commands

/**
 * @typedef {object} SingleResult
 * @property {'single'} kind
 * @property {Root[]} roots the solutions
 * @property {Root[]} excluded roots of the cleared equation that make a denominator zero
 * @property {boolean} all every admissible x is a solution
 * @property {Equation[]} equations
 */

/**
 * @typedef {object} SystemResult
 * @property {'system'} kind
 * @property {'one' | 'none' | 'many'} count
 * @property {Root | null} x
 * @property {Root | null} y
 * @property {{ a: number, b: number, c: number } | null} line with many solutions, the
 *   equation ax + by = c both equations reduce to (null when both read 0 = 0)
 * @property {Equation[]} equations
 */

/** @typedef {(SingleResult | SystemResult) & { command: string, tex: string, text: string }} CasResult */

/**
 * Solves one equation in x.
 * @param {Equation} eq
 * @returns {SingleResult}
 */
export function solveEquation(eq) {
  const vars = new Set([...variables(eq.l), ...variables(eq.r)]);
  if (vars.has('y')) {
    throw new CasError(
      vars.has('x')
        ? 'Phương trình có cả x và y: hãy giải hệ, ví dụ Solve({x + y = 3, x - y = 1}, {x, y}).'
        : 'Hãy viết phương trình với ẩn x.',
    );
  }
  const { poly, conds } = clearDenominators(eq);
  const c = univariate(poly);
  /** @param {number} v */
  const allowed = (v) =>
    conds.every((p) => {
      const scale = Math.max(1, ...[...p.values()].map(Math.abs));
      return Math.abs(pval(p, v)) > 1e-9 * scale * Math.max(1, Math.abs(v)) ** 4;
    });
  if (c.length <= 1) {
    const zero = c.length === 0 || c[0] === 0;
    return { kind: 'single', roots: [], excluded: [], all: zero, equations: [eq] };
  }
  const roots = realRoots(c);
  return {
    kind: 'single',
    roots: roots.filter((r) => allowed(r.value)),
    excluded: roots.filter((r) => !allowed(r.value)),
    all: false,
    equations: [eq],
  };
}

/**
 * Solves two first-degree equations in x and y.
 * @param {Equation[]} eqs
 * @returns {SystemResult}
 */
export function solveSystem(eqs) {
  if (eqs.length !== 2) throw new CasError('Mô phỏng giải hệ gồm đúng hai phương trình.');
  const rows = eqs.map((eq) => {
    const { poly, conds } = clearDenominators(eq);
    if (conds.length) throw new CasError('Mô phỏng chỉ giải hệ không có ẩn ở mẫu.');
    for (const k of poly.keys())
      if (!['0,0', '1,0', '0,1'].includes(k))
        throw new CasError('Mô phỏng chỉ giải hệ hai phương trình bậc nhất hai ẩn.');
    return { a: poly.get('1,0') ?? 0, b: poly.get('0,1') ?? 0, c: -(poly.get('0,0') ?? 0) };
  });
  const [p, q] = rows;
  const D = p.a * q.b - q.a * p.b;
  const scale = Math.max(1, ...rows.flatMap((r) => [r.a, r.b, r.c].map(Math.abs)));
  if (Math.abs(D) > 1e-12 * scale * scale) {
    const x = (p.c * q.b - q.c * p.b) / D;
    const y = (p.a * q.c - q.a * p.c) / D;
    return {
      kind: 'system',
      count: 'one',
      x: floatRoot(x),
      y: floatRoot(y),
      line: null,
      equations: eqs,
    };
  }
  // Same left sides up to a factor: compare the ranks with the right sides.
  const Dx = p.c * q.b - q.c * p.b;
  const Dy = p.a * q.c - q.a * p.c;
  const empty = rows.some((r) => r.a === 0 && r.b === 0 && Math.abs(r.c) > 0);
  const many =
    !empty && Math.abs(Dx) < 1e-12 * scale * scale && Math.abs(Dy) < 1e-12 * scale * scale;
  const line = many ? (rows.find((r) => r.a !== 0 || r.b !== 0) ?? null) : null;
  return {
    kind: 'system',
    count: many ? 'many' : 'none',
    x: null,
    y: null,
    line,
    equations: eqs,
  };
}

/**
 * Splits `a, {b, c}, d` at the commas outside brackets.
 * @param {string} text
 */
function splitArgs(text) {
  /** @type {string[]} */
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of text) {
    if (ch === '(' || ch === '{') depth++;
    if (ch === ')' || ch === '}') depth--;
    if (ch === ',' && depth === 0) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

const COMMANDS = /** @type {const} */ (['Solve', 'Solutions', 'NSolve', 'NSolutions']);

/**
 * Runs one CAS input line such as `Solve(x^2 - 5x + 6 = 0)`.
 * @param {string} input
 * @returns {CasResult}
 */
export function runCas(input) {
  const text = input.trim();
  if (!text) throw new CasError('Hãy gõ một lệnh, chẳng hạn Solve(x^2 - 5x + 6 = 0).');
  const m = /^([A-Za-z]+)\s*\(([\s\S]*)\)\s*$/.exec(text);
  if (!m) {
    if (text.includes('='))
      throw new CasError(`Hãy đặt phương trình vào lệnh Solve: Solve(${text}).`);
    throw new CasError('Hãy gõ một lệnh, chẳng hạn Solve(x^2 - 5x + 6 = 0).');
  }
  const command = COMMANDS.find((c) => c.toLowerCase() === m[1].toLowerCase());
  if (!command)
    throw new CasError(`Mô phỏng chưa có lệnh "${m[1]}". Dùng Solve, Solutions hoặc NSolve.`);
  const numeric = command.startsWith('N');
  const named = command.endsWith('Solve');
  const args = splitArgs(m[2]);
  const first = args[0];
  if (first.startsWith('{')) {
    if (!first.endsWith('}')) throw new CasError('Thiếu dấu ngoặc "}".');
    const eqs = splitArgs(first.slice(1, -1)).map(parseEquation);
    if (args[1] !== undefined && !/^\{\s*x\s*,\s*y\s*\}$/.test(args[1]))
      throw new CasError('Danh sách ẩn của hệ viết là {x, y}.');
    const r = solveSystem(eqs);
    return { ...r, command, ...systemOutput(r, numeric, named) };
  }
  if (args.length > 2 || (args[1] !== undefined && args[1] !== 'x'))
    throw new CasError(
      'Lệnh giải một phương trình có dạng Solve(phương trình) hoặc Solve(phương trình, x).',
    );
  const r = solveEquation(parseEquation(first));
  return { ...r, command, ...singleOutput(r, numeric, named) };
}

/** @param {Root} r @param {boolean} numeric */
const shown = (r, numeric) => (numeric || !r.exact ? numTex(r.value, 4) : r.tex);

/**
 * @param {SingleResult} r @param {boolean} numeric @param {boolean} named
 * @returns {{ tex: string, text: string }}
 */
function singleOutput(r, numeric, named) {
  const approx = numeric || r.roots.some((x) => !x.exact);
  const items = r.roots.map(
    (x) => (named ? `x ${approx ? '\\approx' : '='} ` : '') + shown(x, numeric),
  );
  const tex = r.all ? (named ? '\\{x = x\\}' : '\\{x\\}') : `\\{${items.join(',\\ ')}\\}`;
  const excluded = r.excluded.length
    ? ` Giá trị ${r.excluded.map((x) => `$x = ${x.tex}$`).join(', ')} làm mẫu bằng $0$ nên bị loại.`
    : '';
  let text;
  if (r.all) text = 'Mọi giá trị của $x$ (thoả mãn điều kiện xác định) đều là nghiệm.';
  else if (r.roots.length === 0)
    text = `Tập nghiệm rỗng $\\{\\}$: phương trình vô nghiệm.${excluded}`;
  else if (r.roots.length === 1)
    text = `Phương trình có một nghiệm $x = ${shown(r.roots[0], numeric)}$.${excluded}`;
  else
    text = `Phương trình có ${r.roots.length} nghiệm: ${r.roots.map((x) => `$x ${approx ? '\\approx' : '='} ${shown(x, numeric)}$`).join(', ')}.${excluded}`;
  return { tex, text };
}

/**
 * @param {SystemResult} r @param {boolean} numeric @param {boolean} named
 * @returns {{ tex: string, text: string }}
 */
function systemOutput(r, numeric, named) {
  if (r.count === 'none') return { tex: '\\{\\}', text: 'Tập nghiệm rỗng: hệ vô nghiệm.' };
  if (r.count === 'many') {
    const l = r.line;
    // GeoGebra keeps one unknown free and writes the other in terms of it.
    const [sx, sy] = !l
      ? ['x', 'y']
      : l.b !== 0
        ? ['x', lineTex(-l.a / l.b, l.c / l.b)]
        : [floatRoot(l.c / l.a).tex, 'y'];
    const tex = named ? `\\{\\{x = ${sx},\\ y = ${sy}\\}\\}` : `\\{\\{${sx},\\ ${sy}\\}\\}`;
    const which = !l
      ? 'mọi cặp số $(x; y)$ đều là nghiệm'
      : l.b !== 0
        ? `nghiệm là mọi cặp $(x; ${sy})$ với $x$ tuỳ ý`
        : `nghiệm là mọi cặp $(${sx}; y)$ với $y$ tuỳ ý`;
    return { tex, text: `Hệ có vô số nghiệm: ${which}.` };
  }
  const x = /** @type {Root} */ (r.x);
  const y = /** @type {Root} */ (r.y);
  const sx = shown(x, numeric);
  const sy = shown(y, numeric);
  const tex = named ? `\\{\\{x = ${sx},\\ y = ${sy}\\}\\}` : `\\{\\{${sx},\\ ${sy}\\}\\}`;
  return { tex, text: `Hệ có nghiệm duy nhất $(x; y) = (${sx}; ${sy})$.` };
}

/**
 * `kx + m` as TeX with exact coefficients where possible: '2x - 1', '-\\dfrac{1}{2}x + 3'.
 * @param {number} k @param {number} m
 */
function lineTex(k, m) {
  /** @type {string[]} */
  const parts = [];
  if (Math.abs(k) > 1e-12) {
    const t = floatRoot(Math.abs(k)).tex;
    parts.push(`${k < 0 ? '-' : ''}${t === '1' ? '' : t}x`);
  }
  if (Math.abs(m) > 1e-12 || !parts.length) {
    const t = floatRoot(Math.abs(m)).tex;
    parts.push(parts.length ? `${m < 0 ? '-' : '+'} ${t}` : `${m < 0 ? '-' : ''}${t}`);
  }
  return parts.join(' ');
}

// ------------------------------------------------------------------ checking tasks

const SAMPLES = [
  { x: 0.37, y: -1.21 },
  { x: -2.3, y: 0.83 },
  { x: 3.1, y: 2.47 },
  { x: -0.61, y: -3.3 },
  { x: 1.73, y: 0.29 },
];

/**
 * Whether two equations say the same thing: l − r of one is a fixed non-zero
 * multiple of l − r of the other at sample points.
 * @param {Equation} e1 @param {Equation} e2
 */
export function sameEquation(e1, e2) {
  /** @type {number | null} */
  let k = null;
  for (const at of SAMPLES) {
    const a = evaluate(e1.l, at) - evaluate(e1.r, at);
    const b = evaluate(e2.l, at) - evaluate(e2.r, at);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    if (Math.abs(b) < 1e-9) {
      if (Math.abs(a) > 1e-9) return false;
      continue;
    }
    const ratio = a / b;
    if (k === null) k = ratio;
    else if (Math.abs(ratio - k) > 1e-7 * Math.max(1, Math.abs(k))) return false;
  }
  return k !== null && Math.abs(k) > 1e-12;
}

/**
 * Whether a CAS result solves the given task equations (in any order).
 * @param {CasResult} result @param {string[]} task equations as text
 */
export function solvesTask(result, task) {
  const want = task.map(parseEquation);
  if (result.equations.length !== want.length) return false;
  const used = new Set();
  return want.every((w) => {
    const i = result.equations.findIndex((e, j) => !used.has(j) && sameEquation(e, w));
    if (i < 0) return false;
    used.add(i);
    return true;
  });
}

// ------------------------------------------------------------------ graphs

/**
 * Reads a graph input line `y = 2x^2`, `f(x) = x + 1` or just `2x^2`.
 * @param {string} line
 * @returns {Node}
 */
export function parseFunction(line) {
  const body = line.replace(/^\s*(?:[a-zA-Z]\s*\(\s*x\s*\)|y)\s*=\s*/, '');
  if (!body.trim()) throw new CasError('Hãy gõ một hàm số, chẳng hạn y = 2x^2.');
  if (body.includes('=')) throw new CasError('Hàm số viết dạng y = biểu thức của x.');
  const node = parseExpr(tokenize(body));
  if (variables(node).has('y')) throw new CasError('Biểu thức của hàm số chỉ chứa biến x.');
  return node;
}

/**
 * Whether two functions of x agree at sample points.
 * @param {Node} f @param {Node} g
 */
export function sameFunction(f, g) {
  return SAMPLES.every((at) => {
    const a = evaluate(f, at);
    const b = evaluate(g, at);
    return (
      Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b))
    );
  });
}

/**
 * Where the graphs of f and g meet: the roots of f(x) = g(x), with y = f(x).
 * @param {Node} f @param {Node} g
 * @returns {Array<{ x: Root, y: Root }>}
 */
export function intersections(f, g) {
  const r = solveEquation({ l: f, r: g });
  if (r.all) return [];
  return r.roots.map((x) => ({ x, y: floatRoot(evaluate(f, { x: x.value, y: 0 })) }));
}

/**
 * Polyline pieces of y = f(x) on [x0, x1], split where the curve leaves
 * [y0, y1] far or is undefined.
 * @param {Node} f @param {number} x0 @param {number} x1 @param {number} y0 @param {number} y1
 * @param {number} [n] samples
 * @returns {Array<Array<{ x: number, y: number }>>}
 */
export function samplePieces(f, x0, x1, y0, y1, n = 240) {
  const pad = (y1 - y0) * 2;
  /** @type {Array<Array<{ x: number, y: number }>>} */
  const pieces = [];
  /** @type {Array<{ x: number, y: number }>} */
  let cur = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = evaluate(f, { x, y: 0 });
    if (!Number.isFinite(y) || y < y0 - pad || y > y1 + pad) {
      if (cur.length > 1) pieces.push(cur);
      cur = [];
      continue;
    }
    const prev = cur[cur.length - 1];
    if (prev && Math.abs(y - prev.y) > (y1 - y0) * 1.5) {
      if (cur.length > 1) pieces.push(cur);
      cur = [];
    }
    cur.push({ x, y });
  }
  if (cur.length > 1) pieces.push(cur);
  return pieces;
}
