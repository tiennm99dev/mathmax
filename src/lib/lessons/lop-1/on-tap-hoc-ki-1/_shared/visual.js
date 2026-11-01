/**
 * What a review question of this chapter shows above its options; the
 * chapter's `quiz-visual.svelte` draws it.
 * - `groups`: groups of pictures side by side, each `{ picture, n }`.
 * - `takeaway`: `total` pictures of which the last `gone` are crossed out.
 * - `figures`: plane shapes or solids in a row; `blank` adds a "?" box at the end.
 * - `row`: pictures standing in a row, left to right as the child sees them.
 * - `table`: one picture on a table and one under it.
 * @typedef {import('#lib/core/kid/pictures/index.js').PictureName} PictureName
 * @typedef {import('#lib/core/kid/shapes.js').FigureKind} FigureKind
 * @typedef {(
 *   | { type: 'groups', groups: { picture: PictureName, n: number }[] }
 *   | { type: 'takeaway', picture: PictureName, total: number, gone: number }
 *   | { type: 'figures', figures: FigureKind[], blank?: boolean }
 *   | { type: 'row', pictures: PictureName[] }
 *   | { type: 'table', top: PictureName, under: PictureName }
 * )} Visual
 */

export {};
