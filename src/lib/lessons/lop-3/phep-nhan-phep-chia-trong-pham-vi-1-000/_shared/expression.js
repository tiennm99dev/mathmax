/**
 * A number expression (biểu thức số) worked one operation at a time by the
 * book's rules: inside the brackets first, then multiplying and dividing, then
 * adding and subtracting, each from left to right. Numbers carry an id, so a
 * drawing can follow where each result came from. Pure and DOM-free.
 */

/** @typedef {'+' | '−' | '×' | ':'} Op */
/** @typedef {{ k: 'num', id: number, v: number }} NumToken */
/** @typedef {{ k: 'op', op: Op }} OpToken */
/** @typedef {NumToken | OpToken | { k: '(' } | { k: ')' }} Token */

/**
 * The tokens of an expression written with the book's signs.
 * @param {string} text such as "8 × (11 − 6)"
 * @returns {Token[]}
 */
export function parse(text) {
  let id = 0;
  return (text.match(/\d+|[+−×:()]/g) ?? []).map((part) => {
    if (part === '(' || part === ')') return { k: part };
    if (/\d/.test(part)) return { k: 'num', id: id++, v: Number(part) };
    return { k: 'op', op: /** @type {Op} */ (part) };
  });
}

/**
 * An expression written back as text.
 * @param {Token[]} tokens
 */
export function textOf(tokens) {
  return tokens
    .map((t) => (t.k === 'num' ? String(t.v) : t.k === 'op' ? ` ${t.op} ` : t.k))
    .join('');
}

/**
 * The result of one operation.
 * @param {number} a
 * @param {Op} op
 * @param {number} b
 */
export function compute(a, op, b) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  return op === '×' ? a * b : a / b;
}

/**
 * The part to work on: inside the brackets if any, else everything.
 * @param {Token[]} tokens
 * @returns {[number, number]}
 */
function focusOf(tokens) {
  const open = tokens.findIndex((t) => t.k === '(');
  if (open < 0) return [0, tokens.length];
  return [open + 1, tokens.findIndex((t) => t.k === ')')];
}

/**
 * The index of the operation to do next, or -1 when only the value is left.
 * @param {Token[]} tokens
 */
export function nextOp(tokens) {
  const [from, to] = focusOf(tokens);
  let first = -1;
  for (let i = from; i < to; i++) {
    const t = tokens[i];
    if (t.k !== 'op') continue;
    if (t.op === '×' || t.op === ':') return i;
    if (first < 0) first = i;
  }
  return first;
}

/**
 * The rule a tap on another operation broke.
 * @param {Token[]} tokens
 * @param {number} tapped index of the operation tapped
 */
export function ruleFor(tokens, tapped) {
  const [from, to] = focusOf(tokens);
  if (tapped < from || tapped >= to) return 'Có dấu ngoặc: em tính trong ngoặc trước.';
  const next = tokens[nextOp(tokens)];
  const strong = next.k === 'op' && (next.op === '×' || next.op === ':');
  const own = tokens[tapped];
  if (strong && own.k === 'op' && own.op !== '×' && own.op !== ':') {
    return 'Em làm phép nhân, phép chia trước. Phép cộng, phép trừ làm sau.';
  }
  return 'Các phép tính này cùng loại: em tính từ trái sang phải.';
}

/**
 * The operation at `i` with its two numbers.
 * @param {Token[]} tokens
 * @param {number} i
 */
export function partsOf(tokens, i) {
  const left = /** @type {NumToken} */ (tokens[i - 1]);
  const right = /** @type {NumToken} */ (tokens[i + 1]);
  const { op } = /** @type {OpToken} */ (tokens[i]);
  return { left, right, op, value: compute(left.v, op, right.v) };
}

/**
 * The expression once the operation at `i` is done: its result takes the place
 * of the three tokens, and brackets around a lone number go.
 * @param {Token[]} tokens
 * @param {number} i
 * @param {number} id the id of the result
 * @returns {Token[]}
 */
export function applyOp(tokens, i, id) {
  const { value } = partsOf(tokens, i);
  const num = /** @type {NumToken} */ ({ k: 'num', id, v: value });
  const out = [...tokens.slice(0, i - 1), num, ...tokens.slice(i + 2)];
  const at = i - 1;
  return out[at - 1]?.k === '(' && out[at + 1]?.k === ')'
    ? [...out.slice(0, at - 1), num, ...out.slice(at + 2)]
    : out;
}

/**
 * Every line of the working, the book's way, from the expression to its value.
 * @param {string} text
 * @returns {string[]}
 */
export function workLines(text) {
  let tokens = parse(text);
  const lines = [textOf(tokens)];
  for (let id = 100; nextOp(tokens) >= 0; id++) {
    tokens = applyOp(tokens, nextOp(tokens), id);
    lines.push(textOf(tokens));
  }
  return lines;
}

/**
 * The value of an expression.
 * @param {string} text
 */
export const valueOf = (text) => Number(workLines(text).at(-1));

/**
 * The working on one line: "24 + 5 × 6 = 24 + 30 = 54".
 * @param {string} text
 */
export const workText = (text) => workLines(text).join(' = ');

/**
 * What a child gets by working straight from left to right, ignoring brackets
 * and the order of operations; a slip for wrong options. It may not be a whole
 * number.
 * @param {string} text
 */
export function leftToRightSlip(text) {
  const tokens = parse(text).filter((t) => t.k === 'num' || t.k === 'op');
  let value = /** @type {NumToken} */ (tokens[0]).v;
  for (let i = 1; i < tokens.length; i += 2) {
    const { op } = /** @type {OpToken} */ (tokens[i]);
    value = compute(value, op, /** @type {NumToken} */ (tokens[i + 1]).v);
  }
  return value;
}
