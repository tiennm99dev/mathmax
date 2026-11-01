/**
 * What a year-end review question shows above its options; the chapter's
 * `quiz-visual.svelte` draws it.
 * - `groups`: groups of pictures side by side, each `{ picture, n }`.
 * - `takeaway`: `total` pictures of which the last `gone` are crossed out.
 * - `figures`: plane shapes or solids in a row; `blank` adds a "?" box at the end.
 * - `sticks`: `tens` bundles of ten counting sticks and `ones` loose sticks.
 * - `clock`: a clock showing a whole hour, `hour` from 1 to 12.
 * - `strips`: things lying flat from the same left end, each `cm` long;
 *   `ruler` draws a centimetre ruler under them with its 0 mark at that end.
 * - `row`: pictures standing in a row, left to right as the child sees them.
 * @typedef {import('#lib/core/kid/pictures/index.js').PictureName} PictureName
 * @typedef {import('#lib/core/kid/shapes.js').FigureKind} FigureKind
 * @typedef {{ thing: string, cm: number }} Strip `thing` is an id of `THINGS` in `#lib/core/kid/length.js`
 * @typedef {(
 *   | { type: 'groups', groups: { picture: PictureName, n: number }[] }
 *   | { type: 'takeaway', picture: PictureName, total: number, gone: number }
 *   | { type: 'figures', figures: FigureKind[], blank?: boolean }
 *   | { type: 'sticks', tens: number, ones: number }
 *   | { type: 'clock', hour: number }
 *   | { type: 'strips', strips: Strip[], ruler?: boolean }
 *   | { type: 'row', pictures: PictureName[] }
 * )} Visual
 */

export {};
