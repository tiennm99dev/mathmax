/**
 * What a review question of this chapter draws above its options.
 * `quiz-visual.svelte` draws it; nothing here gives the answer away before the
 * question has ended.
 * @typedef {(
 *   | { type: 'column', op: import('./columns.js').ColumnOp, a: number, b: number }
 *   | { type: 'div', n: number, d: number }
 *   | { type: 'clock', minutes: number }
 *   | { type: 'shape', kind: ShapeKind, labels: string[] }
 *   | { type: 'table', table: DataTable }
 *   | { type: 'box', balls: Ball[] }
 * )} Visual
 */

/** @typedef {'triangle' | 'quad' | 'rect' | 'square' | 'circle'} ShapeKind */

/**
 * A data table (bảng số liệu): a header row, then one row per group.
 * @typedef {object} DataTable
 * @property {string} caption
 * @property {string} corner the top-left cell
 * @property {string[]} head the column names
 * @property {Array<{ label: string, cells: string[] }>} rows
 */

/** @typedef {'đỏ' | 'xanh' | 'vàng' | 'trắng' | 'nâu' | 'tím'} BallColor */

/** @typedef {{ color: BallColor, count: number }} Ball */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} ReviewQuestion */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
