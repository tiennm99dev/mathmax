/**
 * A small computer algebra system for the GeoGebra CAS activity: it reads
 * polynomials in several variables with rational coefficients, as typed in
 * the GeoGebra CAS input line (`(5x - y)^2`, `Expand(...)`, `Factor(...)`,
 * `Division(..., ...)`), and computes, expands, factors and divides them.
 *
 * Factor works over the rationals and finds linear factors with small
 * coefficients (rational roots in one variable; factors such as x + y or
 * x - 2y + 1 in several). A polynomial it cannot split further is left as it
 * is, as GeoGebra leaves x^2 - 2.
 */

/** @typedef {{ n: number, d: number }} Rat */
/** @typedef {Record<string, number>} Mono variable name -> exponent (> 0) */
/** @typedef {{ mono: Mono, c: Rat }} Term */
/** @typedef {Map<string, Term>} Poly */

/**
 * @typedef {{ t: 'num', v: Rat }
 *   | { t: 'var', name: string }
 *   | { t: 'neg', a: Node }
 *   | { t: 'add' | 'sub' | 'mul' | 'div', a: Node, b: Node }
 *   | { t: 'pow', a: Node, k: number }
 *   | { t: 'group', a: Node }
 *   | { t: 'call', name: string, args: Node[] }} Node
 */

/** @typedef {{ c: Rat, factors: Array<{ p: Poly, m: number }> }} Factored */

/**
 * @typedef {{ kind: 'poly', p: Poly }
 *   | { kind: 'factored', f: Factored }
 *   | { kind: 'pair', q: Poly, r: Poly }} Value
 */

/** An error with a message for the learner, in Vietnamese. */
export class CasError extends Error {}

// ---------------------------------------------------------------- rationals

/** @param {number} a @param {number} b */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** @param {number} n @param {number} [d] @returns {Rat} */
export function rat(n, d = 1) {
  if (d === 0) throw new CasError('Không chia được cho 0.');
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d)) {
    throw new CasError('Các số quá lớn, khung mô phỏng không tính được.');
  }
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g || 0, d: (s * d) / g };
}

/** @param {Rat} a @param {Rat} b */
const radd = (a, b) => rat(a.n * b.d + b.n * a.d, a.d * b.d);
/** @param {Rat} a @param {Rat} b */
const rmul = (a, b) => rat(a.n * b.n, a.d * b.d);
/** @param {Rat} a @param {Rat} b */
const rdiv = (a, b) => rat(a.n * b.d, a.d * b.n);
/** @param {Rat} a */
const rneg = (a) => rat(-a.n, a.d);

// -------------------------------------------------------------- polynomials

/** @param {Mono} m */
const monoKey = (m) =>
  Object.keys(m)
    .sort()
    .map((v) => `${v}${m[v]}`)
    .join('');

/** @param {Mono} m */
const monoDeg = (m) => Object.values(m).reduce((s, e) => s + e, 0);

/** @param {Mono} a @param {Mono} b @returns {Mono} */
function monoMul(a, b) {
  /** @type {Mono} */
  const out = { ...a };
  for (const [v, e] of Object.entries(b)) out[v] = (out[v] ?? 0) + e;
  return out;
}

/** `a / b` when every exponent of `b` fits in `a`, else null. @param {Mono} a @param {Mono} b */
function monoDiv(a, b) {
  /** @type {Mono} */
  const out = { ...a };
  for (const [v, e] of Object.entries(b)) {
    const left = (out[v] ?? 0) - e;
    if (left < 0) return null;
    if (left === 0) delete out[v];
    else out[v] = left;
  }
  return out;
}

/** @param {Iterable<Term>} terms @returns {Poly} */
function fromTerms(terms) {
  /** @type {Poly} */
  const p = new Map();
  for (const { mono, c } of terms) {
    const key = monoKey(mono);
    const old = p.get(key);
    const sum = old ? radd(old.c, c) : c;
    if (sum.n === 0) p.delete(key);
    else p.set(key, { mono, c: sum });
  }
  return p;
}

/** @param {Rat} c @returns {Poly} */
export const constant = (c) => fromTerms([{ mono: {}, c }]);
/** @param {string} name @returns {Poly} */
export const variable = (name) => fromTerms([{ mono: { [name]: 1 }, c: rat(1) }]);

/** @param {Poly} p @param {Poly} q */
export const add = (p, q) => fromTerms([...p.values(), ...q.values()]);
/** @param {Poly} p */
export const neg = (p) => fromTerms([...p.values()].map((t) => ({ mono: t.mono, c: rneg(t.c) })));
/** @param {Poly} p @param {Poly} q */
export const sub = (p, q) => add(p, neg(q));

/** @param {Poly} p @param {Poly} q */
export function mul(p, q) {
  /** @type {Term[]} */
  const out = [];
  for (const a of p.values()) {
    for (const b of q.values()) out.push({ mono: monoMul(a.mono, b.mono), c: rmul(a.c, b.c) });
  }
  return fromTerms(out);
}

/** @param {Poly} p @param {number} k */
export function pow(p, k) {
  let out = constant(rat(1));
  for (let i = 0; i < k; i++) out = mul(out, p);
  return out;
}

/** @param {Poly} p */
export const isZero = (p) => p.size === 0;
/** @param {Poly} p @param {Poly} q */
export const equal = (p, q) => isZero(sub(p, q));

/** Variables of `p`, sorted. @param {Poly} p */
export function varsOf(p) {
  const set = new Set();
  for (const t of p.values()) for (const v of Object.keys(t.mono)) set.add(v);
  return [...set].sort();
}

/** @param {Poly} p @param {string} v */
const degIn = (p, v) => Math.max(0, ...[...p.values()].map((t) => t.mono[v] ?? 0));

/** Total degree, -1 for the zero polynomial. @param {Poly} p */
export const degree = (p) =>
  p.size ? Math.max(...[...p.values()].map((t) => monoDeg(t.mono))) : -1;

/**
 * Terms in the order GeoGebra prints them: higher total degree first, then
 * higher powers of the alphabetically first variable.
 * @param {Poly} p
 */
export function sortedTerms(p) {
  const vars = varsOf(p);
  return [...p.values()].sort((a, b) => {
    const d = monoDeg(b.mono) - monoDeg(a.mono);
    if (d) return d;
    for (const v of vars) {
      const e = (b.mono[v] ?? 0) - (a.mono[v] ?? 0);
      if (e) return e;
    }
    return 0;
  });
}

// ------------------------------------------------------------------ writing

/** @param {Mono} m */
function monoTex(m) {
  return Object.keys(m)
    .sort()
    .map((v) => (m[v] === 1 ? v : `${v}^{${m[v]}}`))
    .join('');
}

/** @param {Rat} c */
const ratTex = (c) => (c.d === 1 ? String(Math.abs(c.n)) : `\\frac{${Math.abs(c.n)}}{${c.d}}`);

/** TeX of a polynomial: `25x^{2} - 10xy + y^{2}`. @param {Poly} p */
export function polyTex(p) {
  if (isZero(p)) return '0';
  return sortedTerms(p)
    .map(({ mono, c }, i) => {
      const sign = c.n < 0 ? (i ? ' - ' : '-') : i ? ' + ' : '';
      const body = monoTex(mono);
      const one = c.n === c.d || c.n === -c.d;
      return sign + (body && one ? '' : ratTex(c)) + body;
    })
    .join('');
}

/** @param {Poly} p */
const isMonomialPoly = (p) => p.size === 1;

/** TeX of a factored form: `3(x + y)(x + z)(y + z)`. @param {Factored} f */
export function factoredTex(f) {
  if (f.c.n === 0) return '0';
  if (f.factors.length === 1 && f.factors[0].m === 1 && f.c.n === f.c.d) {
    return polyTex(f.factors[0].p);
  }
  const parts = f.factors.map(({ p, m }) => {
    const base = isMonomialPoly(p) ? polyTex(p) : `(${polyTex(p)})`;
    return m === 1 ? base : `${base}^{${m}}`;
  });
  const sign = f.c.n < 0 ? '-' : '';
  const unit = Math.abs(f.c.n) === f.c.d;
  return sign + (parts.length && unit ? '' : ratTex(f.c)) + parts.join('');
}

/** TeX of any CAS value. @param {Value} v */
export function valueTex(v) {
  if (v.kind === 'poly') return polyTex(v.p);
  if (v.kind === 'factored') return factoredTex(v.f);
  return `\\left\\{${polyTex(v.q)},\\ ${polyTex(v.r)}\\right\\}`;
}

// ------------------------------------------------------------------ parsing

const COMMANDS = {
  expand: 'Expand',
  simplify: 'Simplify',
  factor: 'Factor',
  factorise: 'Factor',
  factorize: 'Factor',
  division: 'Division',
  div: 'Div',
  mod: 'Mod',
};

/** @typedef {{ k: 'num' | 'id' | 'op', s: string }} Token */

/** @param {string} text @returns {Token[]} */
export function tokenize(text) {
  const src = text
    .replace(/[−–]/g, '-')
    .replace(/[·×]/g, '*')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3');
  /** @type {Token[]} */
  const out = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (/\s/.test(ch)) {
      i++;
    } else if (/\d/.test(ch)) {
      const m = /^\d+(\.\d+)?/.exec(src.slice(i));
      const s = m ? m[0] : ch;
      out.push({ k: 'num', s });
      i += s.length;
    } else if (/[A-Za-z]/.test(ch)) {
      const m = /^[A-Za-z]+/.exec(src.slice(i));
      const s = m ? m[0] : ch;
      out.push({ k: 'id', s });
      i += s.length;
    } else if ('+-*/^(),'.includes(ch)) {
      out.push({ k: 'op', s: ch });
      i++;
    } else {
      throw new CasError(`Không hiểu kí tự "${ch}".`);
    }
  }
  return out;
}

/** @param {string} s @returns {Rat} */
function readNum(s) {
  const [int, frac = ''] = s.split('.');
  return rat(Number(int + frac), 10 ** frac.length);
}

/**
 * Parses one CAS input line into a syntax tree.
 * @param {string} text
 * @returns {Node}
 */
export function parse(text) {
  const tokens = tokenize(text);
  if (!tokens.length) throw new CasError('Hãy nhập một biểu thức.');
  let at = 0;
  const peek = () => tokens[at];
  /** @param {string} s */
  const isOp = (s) => peek()?.k === 'op' && peek().s === s;
  /** @param {string} s */
  function expect(s) {
    if (!isOp(s)) throw new CasError(s === ')' ? 'Thiếu dấu ngoặc đóng ")".' : `Thiếu "${s}".`);
    at++;
  }

  /** @returns {Node} */
  function expr() {
    let left = term();
    while (isOp('+') || isOp('-')) {
      const op = peek().s === '+' ? 'add' : 'sub';
      at++;
      left = { t: op, a: left, b: term() };
    }
    return left;
  }

  /** @returns {Node} */
  function term() {
    let left = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = peek().s === '*' ? 'mul' : 'div';
        at++;
        left = { t: op, a: left, b: unary() };
      } else if (peek() && (peek().k === 'id' || isOp('('))) {
        left = { t: 'mul', a: left, b: power() };
      } else {
        return left;
      }
    }
  }

  /** @returns {Node} */
  function unary() {
    if (isOp('-')) {
      at++;
      return { t: 'neg', a: unary() };
    }
    if (isOp('+')) {
      at++;
      return unary();
    }
    return power();
  }

  /** The exponent after `^`, or null when no `^` follows. */
  function exponent() {
    if (!isOp('^')) return null;
    at++;
    const tok = peek();
    let k;
    if (tok?.k === 'num' && /^\d+$/.test(tok.s)) {
      at++;
      k = Number(tok.s);
    } else if (isOp('(') && tokens[at + 1]?.k === 'num' && tokens[at + 2]?.s === ')') {
      k = Number(tokens[at + 1].s);
      at += 3;
    } else {
      throw new CasError('Số mũ phải là một số tự nhiên.');
    }
    if (!Number.isInteger(k) || k > 20)
      throw new CasError('Số mũ phải là số tự nhiên không quá 20.');
    return k;
  }

  /** @returns {Node} */
  function power() {
    const base = atom();
    const k = exponent();
    return k === null ? base : { t: 'pow', a: base, k };
  }

  /** @returns {Node} */
  function atom() {
    const tok = peek();
    if (!tok) throw new CasError('Biểu thức chưa đầy đủ.');
    if (tok.k === 'num') {
      at++;
      return { t: 'num', v: readNum(tok.s) };
    }
    if (tok.k === 'id') {
      at++;
      const cmd = COMMANDS[/** @type {keyof typeof COMMANDS} */ (tok.s.toLowerCase())];
      if (isOp('(') && cmd) {
        at++;
        const args = [expr()];
        while (isOp(',')) {
          at++;
          args.push(expr());
        }
        expect(')');
        return { t: 'call', name: cmd, args };
      }
      if (tok.s.length > 1 && /^[A-Z]/.test(tok.s)) {
        throw new CasError(`Khung mô phỏng không có lệnh "${tok.s}".`);
      }
      if (/[A-Z]/.test(tok.s)) throw new CasError('Hãy dùng chữ thường cho các biến.');
      // `xy` is x·y; a following power belongs to the last letter only.
      /** @type {Node} */
      let node = { t: 'var', name: tok.s[tok.s.length - 1] };
      if (tok.s.length > 1) {
        const k = exponent();
        if (k !== null) node = { t: 'pow', a: node, k };
        for (let i = tok.s.length - 2; i >= 0; i--) {
          node = { t: 'mul', a: { t: 'var', name: tok.s[i] }, b: node };
        }
      }
      return node;
    }
    if (tok.s === '(') {
      at++;
      const inner = expr();
      expect(')');
      return { t: 'group', a: inner };
    }
    throw new CasError(`Không mong đợi "${tok.s}" ở đây.`);
  }

  const tree = expr();
  if (at < tokens.length) {
    const s = tokens[at].s;
    throw new CasError(s === ')' ? 'Thừa dấu ngoặc đóng ")".' : `Không mong đợi "${s}" ở đây.`);
  }
  return tree;
}

// --------------------------------------------------------------- evaluating

/** @param {Poly} p */
function onlyConstant(p) {
  if (isZero(p)) return rat(0);
  const t = p.get('');
  return p.size === 1 && t ? t.c : null;
}

/**
 * Divides `p` by the monomial `q`: terms that `q` divides go to the
 * quotient, the others stay in the remainder.
 * @param {Poly} p @param {Term} q
 */
function divideByTerm(p, q) {
  /** @type {Term[]} */
  const quot = [];
  /** @type {Term[]} */
  const rem = [];
  for (const t of p.values()) {
    const m = monoDiv(t.mono, q.mono);
    if (m) quot.push({ mono: m, c: rdiv(t.c, q.c) });
    else rem.push(t);
  }
  return { q: fromTerms(quot), r: fromTerms(rem) };
}

/** Coefficient of v^k in `p`, as a polynomial free of v. @param {Poly} p @param {string} v @param {number} k */
function coeffIn(p, v, k) {
  /** @type {Term[]} */
  const out = [];
  for (const t of p.values()) {
    if ((t.mono[v] ?? 0) !== k) continue;
    const mono = { ...t.mono };
    delete mono[v];
    out.push({ mono, c: t.c });
  }
  return fromTerms(out);
}

/**
 * Long division of `p` by `q` in the variable `v`, when the leading
 * coefficient of `q` in v is a number.
 * @param {Poly} p @param {Poly} q @param {string} v
 */
function divideIn(p, q, v) {
  const dq = degIn(q, v);
  const lead = onlyConstant(coeffIn(q, v, dq));
  if (!lead) return null;
  let rem = p;
  let quot = constant(rat(0));
  for (let guard = 0; guard < 64; guard++) {
    const dr = degIn(rem, v);
    if (isZero(rem) || dr < dq) break;
    const lc = coeffIn(rem, v, dr);
    const step = mul(
      mul(lc, constant(rdiv(rat(1), lead))),
      fromTerms([{ mono: dr - dq ? { [v]: dr - dq } : {}, c: rat(1) }]),
    );
    quot = add(quot, step);
    rem = sub(rem, mul(step, q));
  }
  return { q: quot, r: rem };
}

/**
 * Quotient and remainder of `p` by `q`, as in GeoGebra's Division: by a
 * monomial term by term, otherwise long division in one variable.
 * @param {Poly} p @param {Poly} q
 */
export function divide(p, q) {
  if (isZero(q)) throw new CasError('Không chia được cho đa thức 0.');
  if (q.size === 1) return divideByTerm(p, [...q.values()][0]);
  const vars = [...new Set([...varsOf(p), ...varsOf(q)])];
  if (vars.length !== 1) {
    throw new CasError(
      'Khung mô phỏng chỉ chia cho đơn thức, hoặc chia hai đa thức cùng một biến.',
    );
  }
  const out = divideIn(p, q, vars[0]);
  if (!out) throw new CasError('Không chia được.');
  return out;
}

/** @param {Node} node @returns {Poly} */
function toPoly(node) {
  switch (node.t) {
    case 'num':
      return constant(node.v);
    case 'var':
      return variable(node.name);
    case 'group':
      return toPoly(node.a);
    case 'neg':
      return neg(toPoly(node.a));
    case 'add':
      return add(toPoly(node.a), toPoly(node.b));
    case 'sub':
      return sub(toPoly(node.a), toPoly(node.b));
    case 'mul':
      return mul(toPoly(node.a), toPoly(node.b));
    case 'pow': {
      const base = toPoly(node.a);
      if (base.size * node.k > 400 && degree(base) * node.k > 30) {
        throw new CasError('Biểu thức quá lớn, khung mô phỏng không tính được.');
      }
      return pow(base, node.k);
    }
    case 'div': {
      const num = toPoly(node.a);
      const den = toPoly(node.b);
      if (isZero(den)) throw new CasError('Không chia được cho 0.');
      const { q, r } = divide(num, den);
      if (den.size !== 1 || !isZero(r)) {
        throw new CasError(
          'Dấu "/" chỉ dùng để chia cho một đơn thức chia hết; hãy dùng lệnh Division.',
        );
      }
      return q;
    }
    case 'call':
      return fromValue(callValue(node));
  }
}

/** @param {Value} v */
function fromValue(v) {
  if (v.kind === 'poly') return v.p;
  if (v.kind === 'factored') return expandFactored(v.f);
  throw new CasError('Lệnh Division cho hai kết quả nên phải đứng ngoài cùng.');
}

/** @param {Factored} f */
export function expandFactored(f) {
  return f.factors.reduce((acc, { p, m }) => mul(acc, pow(p, m)), constant(f.c));
}

/** @param {Extract<Node, { t: 'call' }>} node @returns {Value} */
function callValue(node) {
  const need = node.name === 'Division' || node.name === 'Div' || node.name === 'Mod' ? 2 : 1;
  if (node.args.length !== need) {
    throw new CasError(
      need === 2
        ? `Lệnh ${node.name} cần hai đa thức: ${node.name}(<đa thức bị chia>, <đa thức chia>).`
        : `Lệnh ${node.name} cần đúng một biểu thức.`,
    );
  }
  const args = node.args.map(toPoly);
  switch (node.name) {
    case 'Factor':
      return { kind: 'factored', f: factor(args[0]) };
    case 'Division': {
      const { q, r } = divide(args[0], args[1]);
      return { kind: 'pair', q, r };
    }
    case 'Div':
      return { kind: 'poly', p: divide(args[0], args[1]).q };
    case 'Mod':
      return { kind: 'poly', p: divide(args[0], args[1]).r };
    default:
      return { kind: 'poly', p: args[0] };
  }
}

/**
 * Runs one CAS input line.
 * @param {string} text
 * @returns {Value}
 */
export function run(text) {
  const tree = parse(text);
  if (tree.t === 'call') return callValue(tree);
  return { kind: 'poly', p: toPoly(tree) };
}

// ---------------------------------------------------------------- factoring

/** @param {number} n */
function divisors(n) {
  n = Math.abs(n);
  /** @type {number[]} */
  const out = [];
  for (let i = 1; i <= n && i <= 1000; i++) if (n % i === 0) out.push(i);
  return out;
}

/**
 * Splits `p` into a rational number times a polynomial with coprime integer
 * coefficients whose first printed term is positive.
 * @param {Poly} p
 */
function primitive(p) {
  const terms = sortedTerms(p);
  let num = 0;
  let den = 1;
  for (const { c } of terms) {
    num = gcd(num, c.n);
    den = (den * c.d) / gcd(den, c.d);
  }
  const c = rat(terms[0].c.n < 0 ? -num : num, den);
  return { c, p: mul(p, constant(rdiv(rat(1), c))) };
}

/**
 * A linear factor of `p` (integer coefficients, no monomial factor) with
 * small coefficients, or null.
 * @param {Poly} p
 * @returns {{ factor: Poly, rest: Poly } | null}
 */
function linearFactor(p) {
  const vars = varsOf(p);
  for (const v of vars) {
    const top = degIn(p, v);
    if (top === 0) continue;
    const others = vars.filter((w) => w !== v);
    const leadC = onlyConstant(coeffIn(p, v, top));
    const lowC = onlyConstant(coeffIn(p, v, 0));
    const ks = leadC ? divisors(leadC.n) : [1, 2, 3];
    const consts =
      others.length === 0 && lowC
        ? divisors(lowC.n).flatMap((d) => [d, -d])
        : [0, 1, -1, 2, -2, 3, -3];
    const span = others.length >= 3 ? 2 : 3;
    /** @type {number[][]} */
    let combos = [[]];
    for (let i = 0; i < others.length; i++) {
      combos = combos.flatMap((c) =>
        Array.from({ length: 2 * span + 1 }, (_, j) => [...c, j - span]),
      );
    }
    for (const k of ks) {
      for (const coefs of combos) {
        for (const c0 of consts) {
          if (coefs.every((a) => a === 0) && c0 === 0) continue;
          if (gcd(gcd(k, c0), coefs.reduce(gcd, 0)) !== 1) continue;
          /** @type {Term[]} */
          const terms = [
            { mono: { [v]: 1 }, c: rat(k) },
            { mono: {}, c: rat(c0) },
          ];
          others.forEach((w, i) => terms.push({ mono: { [w]: 1 }, c: rat(coefs[i]) }));
          const lin = fromTerms(terms);
          const out = divideIn(p, lin, v);
          if (out && isZero(out.r)) return { factor: lin, rest: out.q };
        }
      }
    }
  }
  return null;
}

/**
 * Factors `p` over the rationals as far as this engine can: a number, the
 * common monomial, linear factors with small coefficients, and what is left.
 * @param {Poly} p
 * @returns {Factored}
 */
export function factor(p) {
  if (isZero(p)) return { c: rat(0), factors: [] };
  const first = primitive(p);
  let c = first.c;
  let rest = first.p;
  /** @type {Poly[]} */
  const found = [];
  // Common monomial factor: each variable to its smallest exponent.
  const vars = varsOf(rest);
  for (const v of vars) {
    const low = Math.min(...[...rest.values()].map((t) => t.mono[v] ?? 0));
    for (let i = 0; i < low; i++) found.push(variable(v));
    if (low) rest = divideByTerm(rest, { mono: { [v]: low }, c: rat(1) }).q;
  }
  for (let guard = 0; guard < 20 && degree(rest) > 1; guard++) {
    const lin = linearFactor(rest);
    if (!lin) break;
    found.push(lin.factor);
    rest = lin.rest;
  }
  if (degree(rest) >= 1) found.push(rest);
  else c = rmul(c, onlyConstant(rest) ?? rat(1));
  // Make each factor primitive with a positive first term; collect repeats.
  /** @type {Array<{ p: Poly, m: number }>} */
  const factors = [];
  for (const f of found) {
    const prim = primitive(f);
    c = rmul(c, prim.c);
    const same = factors.find((g) => equal(g.p, prim.p));
    if (same) same.m++;
    else factors.push({ p: prim.p, m: 1 });
  }
  factors.sort((a, b) => {
    const ma = isMonomialPoly(a.p) ? 0 : 1;
    const mb = isMonomialPoly(b.p) ? 0 : 1;
    return ma - mb || degree(a.p) - degree(b.p) || polyTex(a.p).localeCompare(polyTex(b.p));
  });
  return { c, factors };
}

/** Number of non-constant factors, with multiplicity. @param {Factored} f */
export const factorCount = (f) =>
  f.factors.reduce((s, { p, m }) => s + (degree(p) >= 1 ? m : 0), 0);

// ------------------------------------------------------------ answer checks

/** Whether a syntax tree is written as a sum of monomials, with no brackets left. @param {Node} node @returns {boolean} */
export function isExpandedForm(node) {
  switch (node.t) {
    case 'num':
    case 'var':
      return true;
    case 'neg':
      return isExpandedForm(node.a);
    case 'add':
    case 'sub':
      return isExpandedForm(node.a) && isExpandedForm(node.b);
    case 'mul':
    case 'div':
      return isMonomialNode(node.a) && isMonomialNode(node.b);
    case 'pow':
      return isMonomialNode(node.a);
    case 'group':
      return degree(toPoly(node.a)) <= 0;
    default:
      return false;
  }
}

/** @param {Node} node @returns {boolean} */
function isMonomialNode(node) {
  switch (node.t) {
    case 'num':
    case 'var':
      return true;
    case 'neg':
      return isMonomialNode(node.a);
    case 'mul':
    case 'div':
      return isMonomialNode(node.a) && isMonomialNode(node.b);
    case 'pow':
      return isMonomialNode(node.a);
    case 'group':
      return degree(toPoly(node.a)) <= 0;
    default:
      return false;
  }
}

/**
 * Non-constant factors a written product shows, with multiplicity:
 * `3(x + y)(y + z)^2` shows 3; a monomial counts each variable power.
 * @param {Node} node
 * @returns {number}
 */
export function writtenFactors(node) {
  switch (node.t) {
    case 'neg':
      return writtenFactors(node.a);
    case 'mul':
      return writtenFactors(node.a) + writtenFactors(node.b);
    case 'pow':
      return writtenFactors(node.a) * node.k;
    case 'var':
      return 1;
    case 'num':
      return 0;
    case 'group':
      return degree(toPoly(node.a)) >= 1 ? 1 : 0;
    default:
      return degree(toPoly(node)) >= 1 ? 1 : 0;
  }
}

/**
 * Checks a learner's typed polynomial against the expected one.
 * `form` asks for the expanded form or a complete factorisation.
 * @param {string} text
 * @param {Poly} expected
 * @param {'any' | 'expanded' | 'factored'} form
 * @returns {{ ok: boolean, message: string }}
 */
export function checkAnswer(text, expected, form) {
  let tree;
  let value;
  try {
    tree = parse(text);
    if (tree.t === 'call') {
      return { ok: false, message: 'Hãy gõ kết quả, không gõ lệnh của GeoGebra.' };
    }
    value = toPoly(tree);
  } catch (e) {
    return { ok: false, message: e instanceof CasError ? e.message : 'Không đọc được biểu thức.' };
  }
  if (!equal(value, expected)) {
    return { ok: false, message: 'Chưa đúng: biểu thức em gõ không bằng kết quả cần tìm.' };
  }
  if (form === 'expanded' && !isExpandedForm(tree)) {
    return {
      ok: false,
      message:
        'Đúng giá trị nhưng chưa khai triển hết: hãy viết thành tổng các đơn thức, bỏ hết dấu ngoặc.',
    };
  }
  if (form === 'factored') {
    const need = factorCount(factor(expected));
    if (writtenFactors(tree) < need) {
      return {
        ok: false,
        message: `Đúng giá trị nhưng chưa phân tích hết: kết quả có ${need} nhân tử khác hằng số.`,
      };
    }
  }
  return { ok: true, message: 'Đúng rồi!' };
}

/**
 * Reads a polynomial typed by the learner, or null when it does not parse.
 * @param {string} text
 */
export function readPoly(text) {
  try {
    const tree = parse(text);
    return tree.t === 'call' ? null : toPoly(tree);
  } catch {
    return null;
  }
}

// -------------------------------------------------------------------- tasks

/**
 * @typedef {object} Task
 * @property {string} id
 * @property {string} label short name on the task switch
 * @property {string} prompt TeX of what to do
 * @property {string} command what to type in the GeoGebra CAS
 * @property {'expanded' | 'factored' | 'division'} form
 */

/** The book's CAS exercises, checked by the widget. @type {Task[]} */
export const TASKS = [
  {
    id: 'tinh',
    label: 'Tính',
    prompt: '\\text{Thu gọn: } (2x + y)(x - 3y) + 5xy',
    command: '(2x + y)(x - 3y) + 5xy',
    form: 'expanded',
  },
  {
    id: 'kt1',
    label: 'Khai triển 1',
    prompt: '\\text{Khai triển: } (5x - y)^2',
    command: 'Expand((5x - y)^2)',
    form: 'expanded',
  },
  {
    id: 'kt2',
    label: 'Khai triển 2',
    prompt: '\\text{Khai triển: } \\left(\\tfrac{1}{3}x + 2y\\right)^3',
    command: 'Expand((1/3x + 2y)^3)',
    form: 'expanded',
  },
  {
    id: 'pt1',
    label: 'Phân tích 1',
    prompt: '\\text{Phân tích thành nhân tử: } x^4 - 4x^3 - 7x^2 + 8x + 10',
    command: 'Factor(x^4 - 4x^3 - 7x^2 + 8x + 10)',
    form: 'factored',
  },
  {
    id: 'pt2',
    label: 'Phân tích 2',
    prompt: '\\text{Phân tích thành nhân tử: } (x + y + z)^3 - x^3 - y^3 - z^3',
    command: 'Factor((x + y + z)^3 - x^3 - y^3 - z^3)',
    form: 'factored',
  },
  {
    id: 'chia1',
    label: 'Chia 1',
    prompt: '(3x^4y - 9x^3y^2 - 21x^2y^2) : (3x^2y)',
    command: 'Division(3x^4y - 9x^3y^2 - 21x^2y^2, 3x^2y)',
    form: 'division',
  },
  {
    id: 'chia2',
    label: 'Chia 2',
    prompt: '(2x^3 + 5x^2 - 2x + 12) : (2x^2 - x + 1)',
    command: 'Division(2x^3 + 5x^2 - 2x + 12, 2x^2 - x + 1)',
    form: 'division',
  },
];

/**
 * Checks a learner's answer to a task: one polynomial, or quotient and
 * remainder for a division.
 * @param {Task} task
 * @param {string} first
 * @param {string} [second]
 */
export function checkTask(task, first, second = '') {
  const value = run(task.command);
  if (value.kind === 'pair') {
    const q = checkAnswer(first, value.q, 'expanded');
    if (!q.ok) return { ok: false, message: `Thương: ${q.message}` };
    const r = checkAnswer(second, value.r, 'expanded');
    if (!r.ok) return { ok: false, message: `Số dư: ${r.message}` };
    return { ok: true, message: 'Đúng rồi! Thương và số dư đều khớp với GeoGebra.' };
  }
  const expected = value.kind === 'poly' ? value.p : expandFactored(value.f);
  return checkAnswer(first, expected, task.form === 'factored' ? 'factored' : 'expanded');
}
