/**
 * What a review question of this chapter shows above its options; the
 * chapter's `quiz-visual.svelte` draws it.
 * - `column`: a calculation set out in columns; `shown` is a result written
 *   there for the child to judge, otherwise the result stays hidden until the
 *   question ends.
 * - `chain`: a start number and calculations to follow along the arrows.
 * - `sequence`: evenly spaced numbers with a "?" in place of one of them.
 * - `blocks`: hundreds, tens and ones as place-value blocks.
 * - `cards`: digit cards to build a number from.
 * - `table`: a small table of names and numbers.
 * - `groups`: equal groups of pictures.
 * - `figure`: a plain drawing of points, segments, curves and closed shapes.
 * - `ruler`: a named segment lying on a centimetre ruler.
 * - `solids`: a row of solids with a letter under each.
 * @typedef {import('./figures.js').Figure} Figure
 * @typedef {import('#lib/core/kid/column.js').Op} Op
 * @typedef {import('./solids.js').SolidKind} SolidKind
 * @typedef {import('#lib/core/kid/pictures/index.js').PictureName} PictureName
 * @typedef {{ sign: '+' | '−' | '×' | ':', word: string, n: number, value: number }} ChainStep
 * @typedef {(
 *   | { type: 'column', a: number, b: number, op: Op, shown?: number }
 *   | { type: 'chain', start: number, steps: ChainStep[] }
 *   | { type: 'sequence', items: number[], blank: number }
 *   | { type: 'blocks', hundreds: number, tens: number, ones: number }
 *   | { type: 'cards', digits: number[] }
 *   | { type: 'table', head: [string, string], rows: Array<[string, number]> }
 *   | { type: 'groups', each: number, groups: number, picture: PictureName }
 *   | { type: 'figure', figure: Figure }
 *   | { type: 'ruler', name: string, from: number, to: number }
 *   | { type: 'solids', kinds: SolidKind[] }
 * )} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
