/**
 * A small GeoGebra-like engine for the rational-expression practice:
 * a parser for what learners type (implicit multiplication, `^`, `/`,
 * commands), exact rational arithmetic on polynomials in x and y, the CAS
 * commands Simplify, Factor, Solve and Solutions for one variable x, the
 * checked tasks (equal value and lowest terms), and the graphing input bar
 * that reads `y = ...` or `f(x) = ...` lines with the sliders a and b.
 */

import { formatNumber, texNumber } from '#lib/core/number-format.js';

export class CasError extends Error {}

// ---------------------------------------------------------------- rationals

/** @typedef {{ n: number, d: number }} Q exact rational, d > 0 */

/** @param {number} a @param {number} b */
function gcdInt(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** @param {number} n @param {number} [d] @returns {Q} */
export function q(n, d = 1) {
  if (d === 0) throw new CasError('Không chia được cho 0.');
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d)) {
    throw new CasError('Các số trong phép tính quá lớn.');
  }
  const g = gcdInt(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g || 0, d: (s * d) / g };
}

/** @param {Q} a @param {Q} b */
const qadd = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d);
/** @param {Q} a @param {Q} b */
const qmul = (a, b) => q(a.n * b.n, a.d * b.d);
/** @param {Q} a @param {Q} b */
const qdiv = (a, b) => q(a.n * b.d, a.d * b.n);
/** @param {Q} a */
const qneg = (a) => q(-a.n, a.d);
/** @param {Q} a */
const qval = (a) => a.n / a.d;

/** Exact value of a typed decimal such as `4.8`. @param {string} text */
function qFromDecimal(text) {
  const [int, frac = ''] = text.split('.');
  const scale = 10 ** frac.length;
  return q(Number(int + frac), scale);
}

// ------------------------------------------------- polynomials in x and y

/** @typedef {Map<string, Q>} MPoly key `i,j` is the monomial x^i y^j */

/** @param {Q} c @returns {MPoly} */
const mconst = (c) => (c.n === 0 ? new Map() : new Map([['0,0', c]]));

/** @param {string} name @returns {MPoly} */
function mvar(name) {
  if (name === 'x') return new Map([['1,0', q(1)]]);
  if (name === 'y') return new Map([['0,1', q(1)]]);
  throw new CasError(`Không dùng được biến ${name} ở đây.`);
}

/** @param {MPoly} a @param {MPoly} b @param {number} [sign] */
function madd(a, b, sign = 1) {
  const out = new Map(a);
  for (const [k, c] of b) {
    const v = qadd(out.get(k) ?? q(0), sign < 0 ? qneg(c) : c);
    if (v.n === 0) out.delete(k);
    else out.set(k, v);
  }
  return out;
}

/** @param {MPoly} a @param {MPoly} b */
function mmul(a, b) {
  /** @type {MPoly} */
  let out = new Map();
  for (const [ka, ca] of a) {
    const [i, j] = ka.split(',').map(Number);
    for (const [kb, cb] of b) {
      const [k, l] = kb.split(',').map(Number);
      out = madd(out, new Map([[`${i + k},${j + l}`, qmul(ca, cb)]]));
    }
  }
  return out;
}

/** Total degree, −1 for the zero polynomial. @param {MPoly} p */
export function totalDegree(p) {
  let deg = -1;
  for (const k of p.keys()) {
    const [i, j] = k.split(',').map(Number);
    deg = Math.max(deg, i + j);
  }
  return deg;
}

/** @param {MPoly} p */
const hasY = (p) => [...p.keys()].some((k) => !k.endsWith(',0'));

// ------------------------------------------- one-variable polynomials in x

/** @typedef {Q[]} Poly coefficients, constant term first, no trailing zeros */

/** @param {Q[]} p @returns {Poly} */
function trim(p) {
  const out = p.slice();
  while (out.length && out[out.length - 1].n === 0) out.pop();
  return out;
}

/** @param {MPoly} p @returns {Poly} */
function toPoly(p) {
  /** @type {Q[]} */
  const out = [];
  for (const [k, c] of p) {
    const i = Number(k.split(',')[0]);
    while (out.length <= i) out.push(q(0));
    out[i] = c;
  }
  return trim(out);
}

/** @param {Poly} p @returns {MPoly} */
function fromPoly(p) {
  return new Map(p.flatMap((c, i) => (c.n === 0 ? [] : [[`${i},0`, c]])));
}

/** Quotient and remainder over the rationals. @param {Poly} a @param {Poly} b */
function polyDivide(a, b) {
  if (!b.length) throw new CasError('Không chia được cho đa thức 0.');
  let r = a.slice();
  /** @type {Q[]} */
  const quot = Array.from({ length: Math.max(a.length - b.length + 1, 0) }, () => q(0));
  const lb = b[b.length - 1];
  while (r.length >= b.length && r.length) {
    const shift = r.length - b.length;
    const c = qdiv(r[r.length - 1], lb);
    quot[shift] = c;
    r = trim(
      r.map((v, i) =>
        i >= shift && i - shift < b.length ? qadd(v, qneg(qmul(c, b[i - shift]))) : v,
      ),
    );
  }
  return { quot: trim(quot), rem: r };
}

/** Monic greatest common divisor. @param {Poly} a @param {Poly} b */
function polyGcd(a, b) {
  while (b.length) [a, b] = [b, polyDivide(a, b).rem];
  if (!a.length) return [q(1)];
  const lead = a[a.length - 1];
  return a.map((c) => qdiv(c, lead));
}

/** @param {Poly} p @param {Q} x */
function polyAt(p, x) {
  return p.reduceRight((acc, c) => qadd(qmul(acc, x), c), q(0));
}

/** Integer coefficients with no common factor, leading coefficient positive. @param {Poly} p */
function primitive(p) {
  const l = p.reduce((m, c) => (m * c.d) / gcdInt(m, c.d), 1);
  const ints = p.map((c) => (c.n * l) / c.d);
  const g = ints.reduce((m, c) => gcdInt(m, c), 0) || 1;
  const s = ints[ints.length - 1] < 0 ? -1 : 1;
  return { ints: ints.map((c) => (s * c) / g), scale: q(s * g, l) };
}

/** @param {number} n @returns {number[]} */
function divisors(n) {
  n = Math.abs(n);
  if (n > 1e7) throw new CasError('Các số trong phép tính quá lớn.');
  const out = [];
  for (let k = 1; k * k <= n; k++) {
    if (n % k === 0) out.push(k, n / k);
  }
  return [...new Set(out)].sort((a, b) => a - b);
}

/**
 * Rational roots with their multiplicity, and what is left once the
 * matching linear factors are divided out.
 * @param {Poly} p
 */
function rationalRoots(p) {
  /** @type {{ root: Q, mult: number }[]} */
  const roots = [];
  let rest = p;
  let zeros = 0;
  while (rest.length > 1 && rest[0].n === 0) {
    rest = rest.slice(1);
    zeros++;
  }
  if (zeros) roots.push({ root: q(0), mult: zeros });
  let found = true;
  while (found && rest.length > 1) {
    found = false;
    const { ints } = primitive(rest);
    const tops = divisors(ints[0]);
    const bottoms = divisors(ints[ints.length - 1]);
    search: for (const t of tops) {
      for (const b of bottoms) {
        for (const r of [q(t, b), q(-t, b)]) {
          if (polyAt(rest, r).n === 0) {
            const known = roots.find((e) => e.root.n === r.n && e.root.d === r.d);
            if (known) known.mult++;
            else roots.push({ root: r, mult: 1 });
            rest = polyDivide(rest, [qneg(r), q(1)]).quot;
            found = true;
            break search;
          }
        }
      }
    }
  }
  // x first, then by size of the root, the positive root before its opposite.
  roots.sort(
    (a, b) => Math.abs(qval(a.root)) - Math.abs(qval(b.root)) || qval(b.root) - qval(a.root),
  );
  return { roots, rest };
}

// ------------------------------------------------------------------ parser

/**
 * @typedef {{ t: 'num', q: Q }
 *   | { t: 'var', name: string }
 *   | { t: 'neg', a: Node }
 *   | { t: 'add' | 'sub' | 'mul' | 'div', a: Node, b: Node }
 *   | { t: 'pow', a: Node, n: number }
 *   | { t: 'call', name: string, args: Node[] }
 *   | { t: 'eq', a: Node, b: Node }} Node
 */

export const COMMANDS = ['Simplify', 'Factor', 'Expand', 'Solve', 'Solutions'];

/** @typedef {{ k: 'num' | 'id' | 'op', v: string }} Token */

/** @param {string} text @returns {Token[]} */
function tokenize(text) {
  /** @type {Token[]} */
  const out = [];
  const src = text.replace(/[−–]/g, '-').replace(/[·×]/g, '*');
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (/\s/.test(ch)) {
      i++;
    } else if (/[0-9.]/.test(ch)) {
      const m = /^\d*\.?\d+|^\d+\.?/.exec(src.slice(i));
      if (!m) throw new CasError(`Không đọc được số ở vị trí ${i + 1}.`);
      out.push({ k: 'num', v: m[0].replace(/\.$/, '') });
      i += m[0].length;
    } else if (/[a-zA-Z]/.test(ch)) {
      const m = /^[a-zA-Z]+/.exec(src.slice(i));
      const word = /** @type {RegExpExecArray} */ (m)[0];
      const cmd = COMMANDS.find((c) => c.toLowerCase() === word.toLowerCase());
      if (cmd) out.push({ k: 'id', v: cmd });
      else for (const c of word) out.push({ k: 'id', v: c });
      i += word.length;
    } else if (ch === ':') {
      throw new CasError('GeoGebra dùng dấu / cho phép chia, không dùng dấu :.');
    } else if ('+-*/^()=,²³'.includes(ch)) {
      if (ch === '²' || ch === '³')
        out.push({ k: 'op', v: '^' }, { k: 'num', v: ch === '²' ? '2' : '3' });
      else out.push({ k: 'op', v: ch });
      i++;
    } else {
      throw new CasError(`Không hiểu kí tự "${ch}".`);
    }
  }
  return out;
}

/**
 * Parses one line. Implicit multiplication has the same priority as `*`, so
 * `1/3x` means one third of x, as in the lesson.
 * @param {string} text
 * @param {string[]} [vars] letters allowed as variables
 * @returns {Node}
 */
export function parse(text, vars = ['x', 'y']) {
  const toks = tokenize(text);
  if (!toks.length) throw new CasError('Dòng lệnh đang trống.');
  let pos = 0;
  const peek = () => toks[pos];
  /** @param {string} v */
  const isOp = (v) => peek()?.k === 'op' && peek().v === v;
  /** @param {string} v */
  const expect = (v) => {
    if (!isOp(v)) throw new CasError(v === ')' ? 'Thiếu dấu ngoặc đóng ")".' : `Thiếu "${v}".`);
    pos++;
  };

  /** @returns {Node} */
  function expr() {
    let node = term();
    while (isOp('+') || isOp('-')) {
      const op = toks[pos++].v;
      node = { t: op === '+' ? 'add' : 'sub', a: node, b: term() };
    }
    return node;
  }

  const startsPrimary = () => {
    const t = peek();
    return t && (t.k === 'num' || t.k === 'id' || (t.k === 'op' && t.v === '('));
  };

  /** @returns {Node} */
  function term() {
    let node = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = toks[pos++].v;
        node = { t: op === '*' ? 'mul' : 'div', a: node, b: unary() };
      } else if (startsPrimary()) {
        node = { t: 'mul', a: node, b: power() };
      } else {
        return node;
      }
    }
  }

  /** @returns {Node} */
  function unary() {
    if (isOp('-')) {
      pos++;
      return { t: 'neg', a: unary() };
    }
    if (isOp('+')) {
      pos++;
      return unary();
    }
    return power();
  }

  /** @returns {Node} */
  function power() {
    const base = primary();
    if (!isOp('^')) return base;
    pos++;
    let sign = 1;
    let paren = false;
    if (isOp('(')) {
      paren = true;
      pos++;
    }
    if (isOp('-')) {
      sign = -1;
      pos++;
    }
    const t = peek();
    if (!t || t.k !== 'num' || !/^\d+$/.test(t.v)) {
      throw new CasError('Số mũ phải là một số nguyên, ví dụ x^2.');
    }
    pos++;
    if (paren) expect(')');
    const n = sign * Number(t.v);
    if (Math.abs(n) > 12) throw new CasError('Số mũ quá lớn.');
    return { t: 'pow', a: base, n };
  }

  /** @returns {Node} */
  function primary() {
    const t = peek();
    if (!t) throw new CasError('Biểu thức bị thiếu ở cuối dòng.');
    if (t.k === 'num') {
      pos++;
      return { t: 'num', q: qFromDecimal(t.v) };
    }
    if (t.k === 'id') {
      pos++;
      if (COMMANDS.includes(t.v)) {
        expect('(');
        const args = [statement()];
        while (isOp(',')) {
          pos++;
          args.push(statement());
        }
        expect(')');
        return { t: 'call', name: t.v, args };
      }
      if (!vars.includes(t.v)) {
        throw new CasError(`Không hiểu kí hiệu "${t.v}". Biến dùng được: ${vars.join(', ')}.`);
      }
      return { t: 'var', name: t.v };
    }
    if (t.v === '(') {
      pos++;
      const inner = expr();
      expect(')');
      return inner;
    }
    throw new CasError(`Không mong đợi "${t.v}" ở đây.`);
  }

  /** @returns {Node} */
  function statement() {
    const a = expr();
    if (!isOp('=')) return a;
    pos++;
    return { t: 'eq', a, b: expr() };
  }

  const node = statement();
  if (pos < toks.length) {
    const t = toks[pos];
    throw new CasError(t.v === ')' ? 'Thừa dấu ngoặc đóng ")".' : `Không mong đợi "${t.v}" ở đây.`);
  }
  return node;
}

// ---------------------------------------------------------- numeric value

/**
 * Value of an expression at a point; NaN when a denominator vanishes.
 * @param {Node} node @param {Record<string, number>} env
 * @returns {number}
 */
export function evalNode(node, env) {
  switch (node.t) {
    case 'num':
      return qval(node.q);
    case 'var':
      return env[node.name] ?? NaN;
    case 'neg':
      return -evalNode(node.a, env);
    case 'add':
      return evalNode(node.a, env) + evalNode(node.b, env);
    case 'sub':
      return evalNode(node.a, env) - evalNode(node.b, env);
    case 'mul':
      return evalNode(node.a, env) * evalNode(node.b, env);
    case 'div': {
      const d = evalNode(node.b, env);
      return Math.abs(d) < 1e-12 ? NaN : evalNode(node.a, env) / d;
    }
    case 'pow': {
      const b = evalNode(node.a, env);
      return node.n < 0 && Math.abs(b) < 1e-12 ? NaN : b ** node.n;
    }
    case 'call':
      if (node.name === 'Simplify' || node.name === 'Factor' || node.name === 'Expand') {
        return evalNode(node.args[0], env);
      }
      return NaN;
    default:
      return NaN;
  }
}

// ------------------------------------------------- exact rational functions

/** @typedef {{ num: MPoly, den: MPoly }} Rat */

/** @param {Node} node @returns {Rat} */
function toRat(node) {
  switch (node.t) {
    case 'num':
      return { num: mconst(node.q), den: mconst(q(1)) };
    case 'var':
      return { num: mvar(node.name), den: mconst(q(1)) };
    case 'neg': {
      const a = toRat(node.a);
      return { num: madd(new Map(), a.num, -1), den: a.den };
    }
    case 'add':
    case 'sub': {
      const a = toRat(node.a);
      const b = toRat(node.b);
      return reduce({
        num: madd(mmul(a.num, b.den), mmul(b.num, a.den), node.t === 'add' ? 1 : -1),
        den: mmul(a.den, b.den),
      });
    }
    case 'mul': {
      const a = toRat(node.a);
      const b = toRat(node.b);
      return reduce({ num: mmul(a.num, b.num), den: mmul(a.den, b.den) });
    }
    case 'div': {
      const a = toRat(node.a);
      const b = toRat(node.b);
      if (!b.num.size) throw new CasError('Không chia được cho 0.');
      return reduce({ num: mmul(a.num, b.den), den: mmul(a.den, b.num) });
    }
    case 'pow': {
      const a = toRat(node.a);
      /** @type {Rat} */
      let out = { num: mconst(q(1)), den: mconst(q(1)) };
      for (let k = 0; k < Math.abs(node.n); k++) {
        out = { num: mmul(out.num, a.num), den: mmul(out.den, a.den) };
      }
      if (node.n < 0) {
        if (!a.num.size) throw new CasError('Không chia được cho 0.');
        out = { num: out.den, den: out.num };
      }
      return reduce(out);
    }
    case 'call':
      if (node.name === 'Simplify' || node.name === 'Expand') return toRat(node.args[0]);
      throw new CasError(`Lệnh ${node.name} không đặt được bên trong biểu thức khác.`);
    case 'eq':
      throw new CasError('Phương trình chỉ dùng được trong lệnh Solve hoặc Solutions.');
  }
}

/** Cancels common factors when the fraction is in x only. @param {Rat} r @returns {Rat} */
function reduce(r) {
  if (!r.num.size) return { num: new Map(), den: mconst(q(1)) };
  if (hasY(r.num) || hasY(r.den)) return r;
  const n = toPoly(r.num);
  const d = toPoly(r.den);
  const g = polyGcd(n, d);
  return { num: fromPoly(polyDivide(n, g).quot), den: fromPoly(polyDivide(d, g).quot) };
}

// ---------------------------------------------------------------- display

/** @param {Q} c */
function qTex(c) {
  const sign = c.n < 0 ? '-' : '';
  const n = Math.abs(c.n);
  return c.d === 1 ? `${sign}${n}` : `${sign}\\frac{${n}}{${c.d}}`;
}

/** @param {number} i @param {number} j */
function monoTex(i, j) {
  const part = (/** @type {string} */ v, /** @type {number} */ e) =>
    e === 0 ? '' : e === 1 ? v : `${v}^{${e}}`;
  return part('x', i) + part('y', j);
}

/** @param {MPoly} p */
export function mpolyTex(p) {
  if (!p.size) return '0';
  const terms = [...p.entries()]
    .map(([k, c]) => {
      const [i, j] = k.split(',').map(Number);
      return { i, j, c };
    })
    .sort((a, b) => b.i + b.j - (a.i + a.j) || b.i - a.i);
  return terms
    .map(({ i, j, c }, idx) => {
      const mono = monoTex(i, j);
      const neg = c.n < 0;
      const abs = q(Math.abs(c.n), c.d);
      const coef = mono && abs.n === 1 && abs.d === 1 ? '' : qTex(abs);
      const body = coef + mono;
      if (idx === 0) return (neg ? '-' : '') + body;
      return (neg ? ' - ' : ' + ') + body;
    })
    .join('');
}

/** Integer coefficients in numerator and denominator, as GeoGebra shows them. @param {Rat} r */
function tidy(r) {
  if (!r.num.size) return r;
  const all = [...r.num.values(), ...r.den.values()];
  const l = all.reduce((m, c) => (m * c.d) / gcdInt(m, c.d), 1);
  const g = all.reduce((m, c) => gcdInt(m, (c.n * l) / c.d), 0) || 1;
  const lead = [...r.den.entries()].sort((a, b) => {
    const [i, j] = a[0].split(',').map(Number);
    const [k, m] = b[0].split(',').map(Number);
    return k + m - (i + j) || k - i;
  })[0][1];
  const s = lead.n < 0 ? -1 : 1;
  const f = q(s * l, g);
  const scale = (/** @type {MPoly} */ p) => new Map([...p].map(([k, c]) => [k, qmul(c, f)]));
  const num = scale(r.num);
  const den = scale(r.den);
  // A constant denominator folds into the coefficients: x/2 shows as ½x.
  if (totalDegree(den) === 0) {
    const c = /** @type {Q} */ (den.get('0,0'));
    return { num: new Map([...num].map(([k, v]) => [k, qdiv(v, c)])), den: mconst(q(1)) };
  }
  return { num, den };
}

/** @param {Rat} r */
function ratTex(r) {
  const t = tidy(r);
  if (totalDegree(t.den) <= 0) return mpolyTex(t.num);
  return `\\frac{${mpolyTex(t.num)}}{${mpolyTex(t.den)}}`;
}

/** @param {Poly} p */
const polyTex = (p) => mpolyTex(fromPoly(p));

/** Factored form of a polynomial in x over the rationals. @param {Poly} p */
function factorTex(p) {
  if (!p.length) return '0';
  if (p.length === 1) return qTex(p[0]);
  const { roots, rest } = rationalRoots(p);
  /** @type {{ body: string, mult: number }[]} */
  const parts = [];
  /** @type {Poly} */
  let product = [q(1)];
  /** @param {Poly} f @param {number} mult */
  const take = (f, mult) => {
    parts.push({ body: polyTex(f), mult });
    for (let k = 0; k < mult; k++) product = toPoly(mmul(fromPoly(product), fromPoly(f)));
  };
  // Linear factors with integer coefficients: d·x − n for the root n/d.
  for (const { root, mult } of roots) take([q(-root.n), q(root.d)], mult);
  if (rest.length > 1)
    take(
      primitive(rest).ints.map((c) => q(c)),
      1,
    );
  // Whatever constant is left over goes in front.
  const c = qdiv(p[p.length - 1], product[product.length - 1]);
  const lead = c.n === 1 && c.d === 1 ? '' : c.n === -1 && c.d === 1 ? '-' : qTex(c);
  if (parts.length === 1 && parts[0].mult === 1 && !lead) return parts[0].body;
  return (
    lead +
    parts
      .map(({ body, mult }) => {
        const wrapped = body === 'x' ? 'x' : `(${body})`;
        return mult > 1 ? `${wrapped}^{${mult}}` : wrapped;
      })
      .join('')
  );
}

/** @param {Q} r */
const rootTex = (r) => qTex(r);

// ------------------------------------------------------------------- CAS

/** @typedef {{ tex: string, note?: string }} CasResult */

/**
 * Runs one CAS line: a plain expression is simplified, as GeoGebra does when
 * Enter is pressed; Simplify, Expand, Factor, Solve and Solutions work in x.
 * @param {string} line
 * @returns {CasResult}
 */
export function run(line) {
  const node = parse(line);
  if (node.t === 'eq') {
    throw new CasError(
      'Muốn giải phương trình, gõ Solve(phương trình) hoặc Solutions(phương trình).',
    );
  }
  if (node.t === 'call' && node.args.length !== 1) {
    throw new CasError(`Lệnh ${node.name} cần đúng một biểu thức trong ngoặc.`);
  }
  if (node.t === 'call' && (node.name === 'Solve' || node.name === 'Solutions')) {
    return solve(node.args[0], node.name === 'Solve');
  }
  const target = node.t === 'call' ? node.args[0] : node;
  if (target.t === 'eq')
    throw new CasError('Phương trình chỉ dùng được trong lệnh Solve hoặc Solutions.');
  const r = toRat(target);
  if (hasY(r.num) || hasY(r.den)) {
    throw new CasError(
      'Bản mô phỏng này chỉ tính với một biến x. Biểu thức có cả x và y, hãy làm trong GeoGebra thật.',
    );
  }
  if (node.t === 'call' && node.name === 'Factor') {
    const t = tidy(r);
    const n = toPoly(t.num);
    const d = toPoly(t.den);
    if (d.length <= 1) return { tex: factorTex(n) };
    return { tex: `\\frac{${factorTex(n)}}{${factorTex(d)}}` };
  }
  return { tex: ratTex(r) };
}

/**
 * Solves an equation in x: the solutions are the rational roots of the
 * numerator of left − right that do not make a denominator zero.
 * @param {Node} eq @param {boolean} named Solve writes `x = …`
 * @returns {CasResult}
 */
function solve(eq, named) {
  if (eq.t !== 'eq') throw new CasError('Trong ngoặc phải là một phương trình có dấu "=".');
  const left = toRatRaw(eq.a);
  const right = toRatRaw(eq.b);
  const diff = {
    num: madd(mmul(left.num, right.den), mmul(right.num, left.den), -1),
    den: mmul(left.den, right.den),
  };
  if (hasY(diff.num) || hasY(diff.den)) {
    throw new CasError('Bản mô phỏng chỉ giải phương trình một ẩn x.');
  }
  const n = toPoly(diff.num);
  const d = toPoly(diff.den);
  const bad = (/** @type {Q} */ r) => polyAt(d, r).n === 0;
  if (!n.length) {
    const excluded = d.length > 1 ? rationalRoots(d).roots.map((e) => e.root) : [];
    return {
      tex: 'x \\in \\mathbb{R}',
      note: excluded.length
        ? `Mọi giá trị x đều là nghiệm, trừ ${excluded.map((r) => texToText(rootTex(r))).join('; ')} (làm mẫu bằng 0).`
        : 'Mọi giá trị x đều là nghiệm: phương trình có vô số nghiệm.',
    };
  }
  const { roots, rest } = n.length > 1 ? rationalRoots(n) : { roots: [], rest: n };
  const good = roots.map((e) => e.root).filter((r) => !bad(r));
  const list = good.map((r) => (named ? `x = ${rootTex(r)}` : rootTex(r))).join(', ');
  const notes = [];
  if (!good.length) notes.push('Phương trình vô nghiệm.');
  if (roots.some((e) => bad(e.root))) notes.push('Có giá trị bị loại vì làm mẫu bằng 0.');
  if (rest.length > 2) notes.push('Bản mô phỏng chỉ tìm các nghiệm là số hữu tỉ.');
  return { tex: `\\{${list}\\}`, note: notes.join(' ') || undefined };
}

/** Like toRat but keeps every factor, so the excluded values stay visible. @param {Node} node @returns {Rat} */
function toRatRaw(node) {
  switch (node.t) {
    case 'mul':
    case 'div': {
      const a = toRatRaw(node.a);
      const b = toRatRaw(node.b);
      if (node.t === 'mul') return { num: mmul(a.num, b.num), den: mmul(a.den, b.den) };
      if (!b.num.size) throw new CasError('Không chia được cho 0.');
      return { num: mmul(a.num, b.den), den: mmul(a.den, b.num) };
    }
    case 'add':
    case 'sub': {
      const a = toRatRaw(node.a);
      const b = toRatRaw(node.b);
      return {
        num: madd(mmul(a.num, b.den), mmul(b.num, a.den), node.t === 'add' ? 1 : -1),
        den: mmul(a.den, b.den),
      };
    }
    case 'neg': {
      const a = toRatRaw(node.a);
      return { num: madd(new Map(), a.num, -1), den: a.den };
    }
    case 'pow': {
      const a = toRatRaw(node.a);
      /** @type {Rat} */
      let out = { num: mconst(q(1)), den: mconst(q(1)) };
      for (let k = 0; k < Math.abs(node.n); k++) {
        out = { num: mmul(out.num, a.num), den: mmul(out.den, a.den) };
      }
      return node.n < 0 ? { num: out.den, den: out.num } : out;
    }
    default:
      return toRat(node);
  }
}

/** Plain text of a small TeX number for notes. @param {string} tex */
function texToText(tex) {
  return tex.replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2').replace('-', '−');
}

// ------------------------------------------------------------ checked tasks

/**
 * @typedef {object} FractionTask
 * @property {string} id
 * @property {string} label
 * @property {string} prompt TeX of the task
 * @property {string} command what to type in GeoGebra's CAS
 * @property {string} expected the answer, as typed
 * @property {string} resultTex what GeoGebra shows
 * @property {number} denDegree total degree of the denominator in lowest terms
 */

/** @type {FractionTask[]} */
export const FRACTION_TASKS = [
  {
    id: 'rut-gon',
    label: 'Rút gọn',
    prompt: '\\text{Rút gọn: } \\dfrac{x^2 - 4}{x^2 + 4x + 4}',
    command: 'Simplify((x^2 - 4)/(x^2 + 4x + 4))',
    expected: '(x - 2)/(x + 2)',
    resultTex: '\\frac{x - 2}{x + 2}',
    denDegree: 1,
  },
  {
    id: 'tru',
    label: 'Phép trừ',
    prompt: '\\text{Tính: } \\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1}',
    command: '1/(x - 1) - 2/(x^2 - 1)',
    expected: '1/(x + 1)',
    resultTex: '\\frac{1}{x + 1}',
    denDegree: 1,
  },
  {
    id: 'nhan',
    label: 'Phép nhân',
    prompt: '\\text{Tính: } \\dfrac{x^2 + 2x}{x - 3} \\cdot \\dfrac{x^2 - 9}{x^2 + 5x + 6}',
    command: '(x^2 + 2x)/(x - 3) * (x^2 - 9)/(x^2 + 5x + 6)',
    expected: 'x',
    resultTex: 'x',
    denDegree: 0,
  },
  {
    id: 'hai-bien',
    label: 'Hai biến',
    prompt:
      '\\text{Tính: } \\dfrac{x^4 - xy^3}{2xy + y^2} : \\dfrac{x^3 + x^2y + xy^2}{2x + y} + \\dfrac{y + x}{x}',
    command: 'Simplify((x^4 - x*y^3)/(2x*y + y^2) / ((x^3 + x^2*y + x*y^2)/(2x + y)) + (y + x)/x)',
    expected: '(x^2 + y^2)/(x*y)',
    resultTex: '\\frac{x^{2} + y^{2}}{xy}',
    denDegree: 2,
  },
];

/** Fixed sample points away from the poles of the tasks. */
const SAMPLES = [
  { x: 1.37, y: 0.61 },
  { x: -2.29, y: 1.83 },
  { x: 3.11, y: -0.47 },
  { x: 0.53, y: 2.71 },
  { x: -0.83, y: -1.39 },
];

/** @param {Node} node @returns {boolean} */
const hasDiv = (node) =>
  node.t === 'div' ||
  (node.t === 'pow' && node.n < 0) ||
  ('a' in node && hasDiv(node.a)) ||
  ('b' in node && hasDiv(node.b));

/**
 * Checks a typed answer: same value as the expected one at sample points,
 * and written as one fraction A/B (or a polynomial) in lowest terms.
 * @param {FractionTask} task @param {string} text
 * @returns {{ ok: boolean, message: string }}
 */
export function checkFraction(task, text) {
  /** @type {Node} */
  let node;
  try {
    node = parse(text.replace(/(\d),(\d)/g, '$1.$2'));
  } catch (e) {
    return { ok: false, message: e instanceof CasError ? e.message : 'Không đọc được kết quả.' };
  }
  if (node.t === 'eq' || node.t === 'call') {
    return { ok: false, message: 'Chỉ gõ biểu thức kết quả, không gõ lệnh hay dấu "=".' };
  }
  const want = parse(task.expected);
  const same = SAMPLES.every((env) => {
    const a = evalNode(node, env);
    const b = evalNode(want, env);
    return Number.isFinite(a) && Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(b));
  });
  if (!same) return { ok: false, message: 'Chưa đúng: kết quả này không bằng biểu thức đã cho.' };
  /** @type {Node} */
  let den = { t: 'num', q: q(1) };
  if (node.t === 'div' && !hasDiv(node.a) && !hasDiv(node.b)) {
    den = node.b;
  } else if (hasDiv(node)) {
    return {
      ok: false,
      message: 'Giá trị đúng rồi, nhưng hãy viết kết quả thành một phân thức dạng (tử)/(mẫu).',
    };
  }
  const degree = totalDegree(toRatRaw(den).num);
  if (degree > task.denDegree) {
    return {
      ok: false,
      message: 'Giá trị đúng rồi, nhưng phân thức chưa tối giản: tử và mẫu còn nhân tử chung.',
    };
  }
  return { ok: true, message: 'Chính xác! Kết quả đã ở dạng tối giản.' };
}

// ------------------------------------------------------------- graphing

/**
 * @typedef {object} GraphEntry
 * @property {string} name f, g, h, ...
 * @property {Node} node right-hand side in x, a and b
 * @property {string} input what was typed
 * @property {boolean} usesSliders mentions a or b
 */

/**
 * Reads one line of the graphing input bar: `y = -3x + 3`,
 * `f(x) = 1/2x - 4` or just `2x + 1`. The letters a and b are sliders.
 * @param {string} text @param {string} fallbackName
 * @returns {GraphEntry}
 */
export function parseGraph(text, fallbackName) {
  let body = text.trim();
  let name = fallbackName;
  const named = /^([a-zA-Z])\s*\(\s*x\s*\)\s*=(.*)$/.exec(body);
  if (named) {
    name = named[1];
    body = named[2];
  } else if (/^y\s*=/.test(body)) {
    body = body.replace(/^y\s*=/, '');
  }
  if (!body.trim()) throw new CasError('Hãy gõ hàm số, ví dụ y = 2x + 1.');
  const node = parse(body, ['x', 'a', 'b']);
  if (node.t === 'eq' || node.t === 'call') {
    throw new CasError('Gõ hàm số dạng y = ax + b, ví dụ y = -3x + 3.');
  }
  /** @type {(n: Node) => boolean} */
  const uses = (n) =>
    n.t === 'var' ? n.name !== 'x' : ('a' in n && uses(n.a)) || ('b' in n && uses(n.b));
  return { name, node, input: text.trim(), usesSliders: uses(node) };
}

/**
 * Slope and intercept when the function is y = ax + b, otherwise null.
 * @param {Node} node @param {Record<string, number>} params
 * @returns {{ a: number, b: number } | null}
 */
export function linearForm(node, params) {
  const f = (/** @type {number} */ x) => evalNode(node, { ...params, x });
  const b = f(0);
  const a = f(1) - b;
  const ok = [-3.5, 2, 4.25].every((x) => {
    const v = f(x);
    return Number.isFinite(v) && Math.abs(v - (a * x + b)) < 1e-9 * Math.max(1, Math.abs(v));
  });
  return ok && Number.isFinite(a) && Number.isFinite(b) ? { a: clean(a), b: clean(b) } : null;
}

/** @param {number} v */
const clean = (v) => Math.round(v * 1e9) / 1e9;

/**
 * Where the line y = ax + b meets the axes.
 * @param {{ a: number, b: number }} line
 */
export function intercepts({ a, b }) {
  return { y: b, x: a === 0 ? null : clean(-b / a) };
}

/** Vietnamese writing of a coordinate, fractions kept exact when short. @param {number} v */
export function coordText(v) {
  for (const d of [1, 2, 3, 4, 5, 6, 8]) {
    const n = Math.round(v * d);
    if (Math.abs(n / d - v) < 1e-9) {
      if (d === 1) return formatNumber(n);
      const dec = formatNumber(v);
      return dec.length <= 6 ? dec : `${n < 0 ? '−' : ''}${Math.abs(n)}/${d}`;
    }
  }
  return formatNumber(v, 2);
}

/** TeX of y = ax + b, with the book's decimal comma. @param {{ a: number, b: number }} line */
export function lineTex({ a, b }) {
  const num = (/** @type {number} */ v) => texNumber(formatNumber(Math.abs(v))).replace('−', '-');
  const ax = a === 0 ? '' : `${a < 0 ? '-' : ''}${Math.abs(a) === 1 ? '' : num(a)}x`;
  if (!ax) return `y = ${b < 0 ? '-' : ''}${num(b)}`;
  const bx = b === 0 ? '' : ` ${b < 0 ? '-' : '+'} ${num(b)}`;
  return `y = ${ax}${bx}`;
}

/**
 * @typedef {object} GraphTask
 * @property {string} id
 * @property {string} label
 * @property {string} tex
 * @property {number} a
 * @property {number} b
 */

/** @type {GraphTask[]} */
export const GRAPH_TASKS = [
  { id: 'a', label: 'y = −3x + 3', tex: 'y = -3x + 3', a: -3, b: 3 },
  { id: 'b', label: 'y = ½x − 4', tex: 'y = \\dfrac{1}{2}x - 4', a: 0.5, b: -4 },
  { id: 'c', label: 'y = 2x', tex: 'y = 2x', a: 2, b: 0 },
];

/**
 * Sample points of a function across the visible x-range, split where it is
 * undefined or jumps off the board.
 * @param {Node} node @param {Record<string, number>} params
 * @param {number} xMin @param {number} xMax @param {number} yMin @param {number} yMax
 * @returns {{ x: number, y: number }[][]}
 */
export function samplePath(node, params, xMin, xMax, yMin, yMax) {
  const steps = 240;
  /** @type {{ x: number, y: number }[][]} */
  const runs = [];
  /** @type {{ x: number, y: number }[]} */
  let cur = [];
  const span = yMax - yMin;
  for (let k = 0; k <= steps; k++) {
    const x = xMin + ((xMax - xMin) * k) / steps;
    const y = evalNode(node, { ...params, x });
    if (!Number.isFinite(y) || y < yMin - 2 * span || y > yMax + 2 * span) {
      if (cur.length > 1) runs.push(cur);
      cur = [];
      continue;
    }
    cur.push({ x, y: Math.max(yMin - span, Math.min(yMax + span, y)) });
  }
  if (cur.length > 1) runs.push(cur);
  return runs;
}
