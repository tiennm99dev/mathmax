/**
 * Step-by-step evaluation of a natural-number expression following the
 * textbook order of operations:
 * - brackets first, innermost first: ( ) then [ ] then { };
 * - inside a bracket-free part: powers, then multiplication and division
 *   from left to right, then addition and subtraction from left to right.
 *
 * An expression is a flat list of tokens. Computing one operation replaces
 * `number op number` by its value; a bracket left around a single number is
 * dropped. Exponents are always plain numbers in this grade.
 */

import { fmt, sup } from '../_shared/format.js';

/**
 * @typedef {'+' | '-' | '*' | ':' | '^'} Op
 * @typedef {{ kind: 'num', value: number }
 *   | { kind: 'op', op: Op }
 *   | { kind: 'open', ch: string }
 *   | { kind: 'close', ch: string }} Token
 */

const OPS = /** @type {Record<string, Op>} */ ({
  '+': '+',
  '-': '-',
  '−': '-',
  '*': '*',
  '·': '*',
  '×': '*',
  ':': ':',
  '^': '^',
});

/** @type {Record<Op, string>} */
const SYMBOL = { '+': '+', '-': '−', '*': '·', ':': ':', '^': '^' };

/**
 * Reads an expression such as `2 · {[(12 - 4)^2 : 8 + 2] · 5}`.
 * @param {string} src
 * @returns {Token[]}
 */
export function tokenize(src) {
  /** @type {Token[]} */
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
    } else if (/\d/.test(c)) {
      let j = i;
      while (j < src.length && /\d/.test(src[j])) j++;
      out.push({ kind: 'num', value: Number(src.slice(i, j)) });
      i = j;
    } else if (c in OPS) {
      out.push({ kind: 'op', op: OPS[c] });
      i++;
    } else if ('([{'.includes(c)) {
      out.push({ kind: 'open', ch: c });
      i++;
    } else if (')]}'.includes(c)) {
      out.push({ kind: 'close', ch: c });
      i++;
    } else {
      throw new SyntaxError(`Kí tự lạ: ${c}`);
    }
  }
  return out;
}

/**
 * Priority of an operation: powers 3, multiplication and division 2,
 * addition and subtraction 1.
 * @param {Op} op
 */
export function level(op) {
  if (op === '^') return 3;
  return op === '*' || op === ':' ? 2 : 1;
}

/**
 * Bracket-free parts that may be worked on now, as inclusive index ranges:
 * the inside of every innermost bracket pair, or the whole expression when
 * no bracket is left.
 * @param {Token[]} tokens
 * @returns {Array<[number, number]>}
 */
export function regions(tokens) {
  /** @type {Array<[number, number]>} */
  const out = [];
  /** @type {number[]} */
  const stack = [];
  let lastOpen = -1;
  tokens.forEach((t, i) => {
    if (t.kind === 'open') {
      stack.push(i);
      lastOpen = i;
    } else if (t.kind === 'close') {
      const start = stack.pop();
      if (start !== undefined && start === lastOpen) out.push([start + 1, i - 1]);
      lastOpen = -1;
    }
  });
  return out.length > 0 ? out : [[0, tokens.length - 1]];
}

/**
 * Indices of the operation tokens that may be computed next. In each region:
 * every power, else the leftmost multiplication or division, else the
 * leftmost addition or subtraction.
 * @param {Token[]} tokens
 * @returns {number[]}
 */
export function allowedOps(tokens) {
  return regions(tokens).flatMap(([lo, hi]) => {
    /** @type {number[]} */
    const ops = [];
    for (let i = lo; i <= hi; i++) if (tokens[i].kind === 'op') ops.push(i);
    if (ops.length === 0) return [];
    const top = Math.max(...ops.map((i) => level(/** @type {any} */ (tokens[i]).op)));
    const atTop = ops.filter((i) => level(/** @type {any} */ (tokens[i]).op) === top);
    return top === 3 ? atTop : [atTop[0]];
  });
}

/**
 * Why the operation at `index` may not be computed now, or null when it may.
 * @param {Token[]} tokens
 * @param {number} index
 * @returns {string | null}
 */
export function whyNot(tokens, index) {
  const t = tokens[index];
  if (!t || t.kind !== 'op') return 'Hãy chọn một dấu phép tính.';
  const allowed = allowedOps(tokens);
  if (allowed.includes(index)) return null;
  const region = regions(tokens).find(([lo, hi]) => lo <= index && index <= hi);
  if (!region) {
    const inside = depthAt(tokens, index) > 0;
    return inside
      ? 'Trong ngoặc này vẫn còn ngoặc nhỏ hơn: phải tính ngoặc trong cùng trước.'
      : 'Biểu thức có dấu ngoặc: phải tính trong ngoặc trước ( ) → [ ] → { }.';
  }
  const best = allowed.find((i) => region[0] <= i && i <= region[1]);
  const bestOp = /** @type {{ op: Op }} */ (tokens[/** @type {number} */ (best)]).op;
  if (level(bestOp) > level(t.op)) {
    return bestOp === '^'
      ? 'Phải nâng lên lũy thừa trước, rồi mới đến nhân, chia, cộng, trừ.'
      : 'Nhân và chia trước, cộng và trừ sau.';
  }
  return 'Các phép tính cùng thứ tự được thực hiện lần lượt từ trái sang phải.';
}

/**
 * Number of open brackets around the token at `index`.
 * @param {Token[]} tokens
 * @param {number} index
 */
function depthAt(tokens, index) {
  let depth = 0;
  for (let i = 0; i < index; i++) {
    if (tokens[i].kind === 'open') depth++;
    else if (tokens[i].kind === 'close') depth--;
  }
  return depth;
}

/**
 * Value of `a op b` in ℕ; throws when the result is not a natural number.
 * @param {number} a
 * @param {Op} op
 * @param {number} b
 */
export function compute(a, op, b) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      if (a < b) throw new RangeError(`${a} − ${b} không thực hiện được trong ℕ`);
      return a - b;
    case '*':
      return a * b;
    case ':':
      if (b === 0 || a % b !== 0) throw new RangeError(`${a} không chia hết cho ${b}`);
      return a / b;
    default:
      return a ** b;
  }
}

/**
 * The expression after computing the operation at `index`, plus a short
 * record of that step (`8 − 3 = 5`).
 * @param {Token[]} tokens
 * @param {number} index
 * @returns {{ tokens: Token[], step: string }}
 */
export function applyOp(tokens, index) {
  const [l, t, r] = [tokens[index - 1], tokens[index], tokens[index + 1]];
  if (l?.kind !== 'num' || t?.kind !== 'op' || r?.kind !== 'num') {
    throw new RangeError('Phép tính này chưa có đủ hai số để tính.');
  }
  const value = compute(l.value, t.op, r.value);
  const step =
    t.op === '^'
      ? `${fmt(l.value)}${sup(r.value)} = ${fmt(value)}`
      : `${fmt(l.value)} ${SYMBOL[t.op]} ${fmt(r.value)} = ${fmt(value)}`;
  const out = [...tokens.slice(0, index - 1), { kind: 'num', value }, ...tokens.slice(index + 2)];
  let k = index - 1;
  while (out[k - 1]?.kind === 'open' && out[k + 1]?.kind === 'close') {
    out.splice(k + 1, 1);
    out.splice(k - 1, 1);
    k--;
  }
  return { tokens: /** @type {Token[]} */ (out), step };
}

/**
 * Pieces to draw an expression: numbers, operation signs (with their token
 * index so they can be picked), exponents and brackets. A power `a^n` gives
 * the number `a` then a piece of kind 'pow' holding the exponent text.
 * @param {Token[]} tokens
 * @returns {Array<{ kind: 'num' | 'op' | 'pow' | 'open' | 'close', text: string, index: number }>}
 */
export function pieces(tokens) {
  /** @type {Array<{ kind: 'num' | 'op' | 'pow' | 'open' | 'close', text: string, index: number }>} */
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.kind === 'num') out.push({ kind: 'num', text: fmt(t.value), index: i });
    else if (t.kind === 'open' || t.kind === 'close')
      out.push({ kind: t.kind, text: t.ch, index: i });
    else if (t.op === '^') {
      const e = tokens[i + 1];
      out.push({ kind: 'pow', text: e?.kind === 'num' ? sup(e.value) : '', index: i });
      i++;
    } else out.push({ kind: 'op', text: SYMBOL[t.op], index: i });
  }
  return out;
}

/**
 * Plain-text form of an expression: `80 − (4 · 5² − 3 · 2³)`.
 * @param {Token[]} tokens
 */
export function toText(tokens) {
  let s = '';
  for (const p of pieces(tokens)) {
    if (p.kind === 'pow') s += p.text;
    else if (p.kind === 'op') s += ` ${p.text} `;
    else s += p.text;
  }
  return s;
}

/**
 * Full textbook solution: each line is the expression after one more step,
 * computing the first allowed operation each time.
 * @param {string} src
 * @returns {{ lines: string[], steps: string[], value: number }}
 */
export function solve(src) {
  let tokens = tokenize(src);
  const lines = [toText(tokens)];
  const steps = [];
  while (tokens.length > 1) {
    const next = allowedOps(tokens)[0];
    if (next === undefined) throw new SyntaxError('Biểu thức không hợp lệ');
    const r = applyOp(tokens, next);
    tokens = r.tokens;
    steps.push(r.step);
    lines.push(toText(tokens));
  }
  const only = tokens[0];
  if (only?.kind !== 'num') throw new SyntaxError('Biểu thức không hợp lệ');
  return { lines, steps, value: only.value };
}

/** Expressions offered in the widget, from simple to nested. */
export const PRESETS = [
  '20 - 8 + 3',
  '48 : 4 · 2',
  '36 : 4 · 3 + 2^3',
  '80 - (4 · 5^2 - 3 · 2^3)',
  '100 : [2 · (15 - 10)]',
  '2 · {[(12 - 4)^2 : 8 + 2] · 5}',
];
