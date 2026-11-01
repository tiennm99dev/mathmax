/**
 * What a review question of this chapter shows above its options; the
 * chapter's `quiz-visual.svelte` draws it.
 * - `column`: a calculation set out in columns.
 * - `chain`: a start number and calculations to follow along the arrows.
 * - `tower`: the bottom row of a number tower (tháp số).
 * - `figure`: a plain drawing of points, segments and closed shapes.
 * - `ruler`: a named segment lying on a centimetre ruler.
 * - `pattern`: plane shapes in a row, then a "?" box.
 * - `scales`: one or two pan balances with their loads.
 * - `cups`: groups of full 1 l mugs, one group per container.
 * - `clock`: a clock at a time, in minutes since 0:00.
 * - `number-line`: a number line with a "?" in place of one number.
 * @typedef {import('./figures.js').Figure} Figure
 * @typedef {import('#lib/core/kid/shapes.js').ShapeKind} ShapeKind
 * @typedef {import('./arith-skills.js').Op} Op
 * @typedef {{ kind: 'thing', name: string, kg: number } | { kind: 'weight', kg: number }} Load
 * @typedef {{ left: Load[], right: Load[] }} Scale
 * @typedef {(
 *   | { type: 'column', a: number, b: number, op: Op }
 *   | { type: 'chain', start: number, steps: { op: Op, n: number }[] }
 *   | { type: 'tower', base: number[] }
 *   | { type: 'figure', figure: Figure }
 *   | { type: 'ruler', name: string, from: number, to: number }
 *   | { type: 'pattern', figures: ShapeKind[] }
 *   | { type: 'scales', scales: Scale[] }
 *   | { type: 'cups', groups: { name: string, n: number }[] }
 *   | { type: 'clock', minutes: number }
 *   | { type: 'number-line', min: number, step: number, count: number, blank: number }
 * )} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
