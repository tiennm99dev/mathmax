/**
 * The expressions of the lesson's widget and the tree it grows: the numbers of
 * the expression stand at the bottom, and each operation worked joins two of
 * them into a new number above, until the value stands at the top. Pure and
 * DOM-free.
 */
import { compute, parse } from '../_shared/expression.js';

/** @typedef {'order' | 'strong' | 'brackets'} SetKind */
/** @typedef {import('../_shared/expression.js').Op} Op */

/**
 * A number of the tree: a leaf, or a result with the two numbers it came from.
 * @typedef {object} TreeNode
 * @property {number} id
 * @property {number} value
 * @property {number} x
 * @property {number} level 0 for the numbers of the expression
 * @property {Op} [op]
 * @property {number} [leftId]
 * @property {number} [rightId]
 */

/** The expressions of each set, in the order they come. */
export const EXPRESSIONS = /** @type {const} */ ({
  order: ['27 − 7 + 30', '60 + 50 − 20', '30 : 5 × 2', '67 − 15 − 5', '8 × 3 : 4'],
  strong: ['24 + 5 × 6', '30 − 18 : 3', '40 + 32 : 4', '56 − 2 × 5', '90 : 9 + 15'],
  brackets: ['8 × (11 − 6)', '45 : (5 + 4)', '(15 + 5) : 5', '32 − (25 + 4)', '5 × (6 − 2)'],
});

/** The rule each set practises. */
export const SET_RULES = /** @type {const} */ ({
  order: 'Chỉ có cộng, trừ hoặc chỉ có nhân, chia: em tính từ trái sang phải.',
  strong: 'Có cả cộng, trừ, nhân, chia: em làm nhân, chia trước; cộng, trừ sau.',
  brackets: 'Có dấu ngoặc: em tính trong ngoặc trước.',
});

/**
 * The leaves of the tree of an expression, side by side across `width`.
 * @param {string} text
 * @param {number} width
 * @returns {TreeNode[]}
 */
export function leavesOf(text, width) {
  const numbers = parse(text).filter((t) => t.k === 'num');
  return numbers.map((t, i) => ({
    id: /** @type {{ id: number }} */ (t).id,
    value: /** @type {{ v: number }} */ (t).v,
    x: ((i + 0.5) * width) / numbers.length,
    level: 0,
  }));
}

/**
 * The tree with one more result, centred above the two numbers it came from.
 * @param {TreeNode[]} tree
 * @param {number} leftId
 * @param {Op} op
 * @param {number} rightId
 * @param {number} id the id of the result
 * @returns {TreeNode[]}
 */
export function growTree(tree, leftId, op, rightId, id) {
  const left = /** @type {TreeNode} */ (tree.find((n) => n.id === leftId));
  const right = /** @type {TreeNode} */ (tree.find((n) => n.id === rightId));
  return [
    ...tree,
    {
      id,
      op,
      leftId,
      rightId,
      value: compute(left.value, op, right.value),
      x: (left.x + right.x) / 2,
      level: Math.max(left.level, right.level) + 1,
    },
  ];
}

/**
 * Three to four options for one calculation: the right value, what the other
 * operation of its kind gives, and its neighbours. Whole, not negative, in
 * increasing order.
 * @param {number} a
 * @param {Op} op
 * @param {number} b
 */
export function valueOptions(a, op, b) {
  const right = compute(a, op, b);
  const other = /** @type {Record<Op, Op>} */ ({ '+': '−', '−': '+', '×': '+', ':': '−' })[op];
  const slips = [compute(a, other, b), right + 1, right > 0 ? right - 1 : right + 2, right + 10];
  const values = [...new Set(slips)].filter((v) => v !== right && v >= 0);
  return [right, ...values.slice(0, 3)].sort((x, y) => x - y);
}
