/**
 * A number expression (biểu thức số) worked one operation at a time by the
 * book's rules: inside the brackets first, then multiplying and dividing, then
 * adding and subtracting, each from left to right. Pure and DOM-free.
 */

/** @typedef {'+' | '−' | '×' | ':'} Op */
/** @typedef {{ k: 'num', v: number }} NumToken */
/** @typedef {{ k: 'op', op: Op }} OpToken */
/** @typedef {NumToken | OpToken | { k: '(' } | { k: ')' }} Token */

/**
 * One line of the working: the operation done next (`now`) inside its line.
 * The last line is only the value, in `before`.
 * @typedef {{ before: string, now: string, after: string }} WorkStep
 */

/**
 * @param {string} text such as "8 × (11 − 6)"
 * @returns {Token[]}
 */
function parse(text) {
  return (text.match(/\d+|[+−×:()]/g) ?? []).map((part) => {
    if (part === '(' || part === ')') return { k: part };
    if (/\d/.test(part)) return { k: 'num', v: Number(part) };
    return { k: 'op', op: /** @type {Op} */ (part) };
  });
}

/** @param {Token[]} tokens */
function textOf(tokens) {
  return tokens
    .map((t) => (t.k === 'num' ? String(t.v) : t.k === 'op' ? ` ${t.op} ` : t.k))
    .join('');
}

/**
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
 * The index of the operation to do next, or -1 when only the value is left.
 * @param {Token[]} tokens
 */
function nextOp(tokens) {
  const open = tokens.findIndex((t) => t.k === '(');
  const from = open < 0 ? 0 : open + 1;
  const to = open < 0 ? tokens.length : tokens.findIndex((t) => t.k === ')');
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
 * The expression once the operation at `i` is done; brackets around a lone
 * number go.
 * @param {Token[]} tokens
 * @param {number} i
 * @returns {Token[]}
 */
function applyOp(tokens, i) {
  const left = /** @type {NumToken} */ (tokens[i - 1]);
  const right = /** @type {NumToken} */ (tokens[i + 1]);
  const { op } = /** @type {OpToken} */ (tokens[i]);
  /** @type {NumToken} */
  const num = { k: 'num', v: compute(left.v, op, right.v) };
  const out = [...tokens.slice(0, i - 1), num, ...tokens.slice(i + 2)];
  const at = i - 1;
  return out[at - 1]?.k === '(' && out[at + 1]?.k === ')'
    ? [...out.slice(0, at - 1), num, ...out.slice(at + 2)]
    : out;
}

/**
 * Every line of the working, with the operation to do next marked.
 * @param {string} text
 * @returns {WorkStep[]}
 */
export function workSteps(text) {
  let tokens = parse(text);
  /** @type {WorkStep[]} */
  const steps = [];
  for (let i = nextOp(tokens); i >= 0; i = nextOp(tokens)) {
    steps.push({
      before: textOf(tokens.slice(0, i - 1)),
      now: textOf(tokens.slice(i - 1, i + 2)),
      after: textOf(tokens.slice(i + 2)),
    });
    tokens = applyOp(tokens, i);
  }
  steps.push({ before: textOf(tokens), now: '', after: '' });
  return steps;
}

/**
 * The working as plain lines, from the expression to its value.
 * @param {string} text
 */
export const workLines = (text) => workSteps(text).map((s) => s.before + s.now + s.after);

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
 * The operation done first.
 * @param {string} text
 */
export const firstOp = (text) => workSteps(text)[0].now;

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
