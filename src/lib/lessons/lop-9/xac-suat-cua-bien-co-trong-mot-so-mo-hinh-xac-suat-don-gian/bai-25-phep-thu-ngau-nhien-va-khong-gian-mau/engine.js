/**
 * Random experiments made of successive stages (toss a coin, then roll a
 * die, then draw a card...), their sample space and the layout of the tree
 * diagram and two-way table that list it. An outcome is the path of labels
 * picked at each stage. With `distinct`, a label used at one stage cannot
 * come again (cards drawn one after another without putting them back).
 */

/** @typedef {{ name: string, short: string, labels: string[] }} Stage `short` heads a tree column. */

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} title
 * @property {string} story what is done, as one sentence
 * @property {Stage[]} stages
 * @property {boolean} [distinct] a label cannot repeat (drawing without replacement)
 * @property {boolean} [compact] outcomes written as one word (SN) instead of a pair (1, S)
 */

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'hai-dong-xu',
    title: 'Tung hai đồng xu',
    story: 'Tung một đồng xu hai lần liên tiếp và ghi lại mặt xuất hiện (S: sấp, N: ngửa).',
    stages: [
      { name: 'Lần tung thứ nhất', short: 'Lần 1', labels: ['S', 'N'] },
      { name: 'Lần tung thứ hai', short: 'Lần 2', labels: ['S', 'N'] },
    ],
    compact: true,
  },
  {
    id: 'xuc-xac-dong-xu',
    title: 'Gieo xúc xắc và tung đồng xu',
    story: 'Lan gieo một con xúc xắc, Hòa tung một đồng xu; ghi số chấm và mặt của đồng xu.',
    stages: [
      { name: 'Xúc xắc', short: 'Xúc xắc', labels: ['1', '2', '3', '4', '5', '6'] },
      { name: 'Đồng xu', short: 'Đồng xu', labels: ['S', 'N'] },
    ],
  },
  {
    id: 'rut-the',
    title: 'Rút lần lượt hai thẻ, không trả lại',
    story:
      'Hộp có ba tấm thẻ ghi số 1, 2, 3. Rút ngẫu nhiên một thẻ, không trả lại hộp, rồi rút tiếp một thẻ.',
    stages: [
      { name: 'Thẻ rút lần thứ nhất', short: 'Thẻ 1', labels: ['1', '2', '3'] },
      { name: 'Thẻ rút lần thứ hai', short: 'Thẻ 2', labels: ['1', '2', '3'] },
    ],
    distinct: true,
  },
  {
    id: 'rut-the-tra-lai',
    title: 'Rút hai lần, có trả lại',
    story:
      'Hộp có ba tấm thẻ ghi số 1, 2, 3. Rút ngẫu nhiên một thẻ, ghi số, trả thẻ vào hộp rồi rút tiếp một thẻ.',
    stages: [
      { name: 'Thẻ rút lần thứ nhất', short: 'Thẻ 1', labels: ['1', '2', '3'] },
      { name: 'Thẻ rút lần thứ hai', short: 'Thẻ 2', labels: ['1', '2', '3'] },
    ],
  },
  {
    id: 'ba-con',
    title: 'Gia đình có ba con',
    story: 'Ghi giới tính lần lượt của con thứ nhất, thứ hai, thứ ba (T: trai, G: gái).',
    stages: [
      { name: 'Con thứ nhất', short: 'Con 1', labels: ['T', 'G'] },
      { name: 'Con thứ hai', short: 'Con 2', labels: ['T', 'G'] },
      { name: 'Con thứ ba', short: 'Con 3', labels: ['T', 'G'] },
    ],
    compact: true,
  },
];

/**
 * The labels that can follow a partial outcome.
 * @param {Experiment} exp
 * @param {string[]} prefix labels already picked
 */
export function children(exp, prefix) {
  const stage = exp.stages[prefix.length];
  if (!stage) return [];
  return exp.distinct ? stage.labels.filter((l) => !prefix.includes(l)) : stage.labels;
}

/**
 * Every partial outcome with `depth` labels, in tree order.
 * @param {Experiment} exp
 * @param {number} depth
 * @returns {string[][]}
 */
export function paths(exp, depth) {
  /** @type {string[][]} */
  let out = [[]];
  for (let d = 0; d < depth; d++) out = out.flatMap((p) => children(exp, p).map((l) => [...p, l]));
  return out;
}

/**
 * The sample space: every complete outcome.
 * @param {Experiment} exp
 */
export const outcomes = (exp) => paths(exp, exp.stages.length);

/**
 * An outcome written the book's way: 'SN' or '(1, S)'.
 * @param {Experiment} exp
 * @param {string[]} path
 */
export const outcomeText = (exp, path) => (exp.compact ? path.join('') : `(${path.join(', ')})`);

/**
 * The sample space as text: 'Ω = {SS; SN; NS; NN}'.
 * @param {Experiment} exp
 */
export const omegaText = (exp) =>
  `Ω = {${outcomes(exp)
    .map((p) => outcomeText(exp, p))
    .join('; ')}}`;

/**
 * How the number of outcomes builds up stage by stage, as a sentence part:
 * '6 · 2 = 12' or '3 · 2 = 6' (fewer choices once a card is out).
 * @param {Experiment} exp
 */
export function countText(exp) {
  const factors = [];
  /** @type {string[]} */
  let prefix = [];
  for (let d = 0; d < exp.stages.length; d++) {
    const next = children(exp, prefix);
    factors.push(next.length);
    prefix = [...prefix, next[0]];
  }
  const n = factors.reduce((a, b) => a * b, 1);
  return factors.length === 1 ? String(n) : `${factors.join(' · ')} = ${n}`;
}

/**
 * @typedef {object} TreeNode
 * @property {string} key the path joined by '/'
 * @property {number} level 1 for the first stage
 * @property {string} label
 * @property {number} y vertical position in leaf rows (0 for the first leaf)
 * @property {string | null} parent key of the parent node, null under the root
 */

/**
 * Nodes of the tree diagram, laid out on the leaf rows: a leaf sits on its
 * row, a branch point midway between its first and last leaf.
 * @param {Experiment} exp
 * @returns {TreeNode[]}
 */
export function treeNodes(exp) {
  const leaves = outcomes(exp);
  /** @type {TreeNode[]} */
  const nodes = [];
  for (let level = 1; level <= exp.stages.length; level++) {
    for (const p of paths(exp, level)) {
      const key = p.join('/');
      const rows = leaves
        .map((leaf, i) => (leaf.slice(0, level).join('/') === key ? i : -1))
        .filter((i) => i >= 0);
      nodes.push({
        key,
        level,
        label: p[level - 1],
        y: (rows[0] + rows[rows.length - 1]) / 2,
        parent: level === 1 ? null : p.slice(0, -1).join('/'),
      });
    }
  }
  return nodes;
}

/**
 * Whether a cell of the two-way table (row label of stage 1, column label of
 * stage 2) is a possible outcome. Only two-stage experiments have a table.
 * @param {Experiment} exp
 * @param {string} row
 * @param {string} col
 */
export const cellPossible = (exp, row, col) => !(exp.distinct && row === col);
