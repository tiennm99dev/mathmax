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
 * - `clock`: one still clock to read; `clocks`: a named clock per child.
 * - `balance`: a level or tipped pan balance.
 * - `cans`: full cans of water, each with its litres.
 * - `month`: a calendar sheet with some dates marked.
 * - `scatter`: plane shapes mixed up, to count by kind.
 * - `tally`: names with tally marks, the counts hidden until the question ends.
 * - `chart`: a picture chart, one picture per thing.
 * - `box`: a box of coloured balls.
 * - `pattern`: a row of shapes that repeats, with a "?" in place of the last.
 * @typedef {import('./figures.js').Figure} Figure
 * @typedef {import('#lib/core/kid/column.js').Op} Op
 * @typedef {import('./solids.js').SolidKind} SolidKind
 * @typedef {import('#lib/core/kid/pictures/index.js').PictureName} PictureName
 * @typedef {import('#lib/core/kid/mass.js').Load} Load
 * @typedef {import('./chance.js').BallColor} BallColor
 * @typedef {'vuong' | 'tron' | 'tam-giac'} PlaneKind
 * @typedef {{ kind: PlaneKind, color: BallColor }} PatternItem
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
 *   | MeasureSurveyVisual
 * )} Visual
 */

/**
 * The pictures of the reviews of measures and of counting data, drawn by
 * `measure-survey-visual.svelte`.
 * @typedef {(
 *   | { type: 'clock', minutes: number }
 *   | { type: 'clocks', clocks: Array<{ name: string, minutes: number }> }
 *   | { type: 'balance', left: Load[], right: Load[] }
 *   | { type: 'cans', litres: number[] }
 *   | { type: 'month', month: number, marks: number[] }
 *   | { type: 'scatter', kinds: PlaneKind[] }
 *   | { type: 'tally', rows: Array<{ label: string, count: number }> }
 *   | { type: 'chart', title: string, rows: Array<{ label: string, count: number, picture: PictureName }> }
 *   | { type: 'box', balls: BallColor[] }
 *   | { type: 'pattern', items: PatternItem[] }
 * )} MeasureSurveyVisual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
