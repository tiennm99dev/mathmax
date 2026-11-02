/**
 * Tap-the-name options for a plane shape, on top of `shapes.js` and `quiz.js`.
 * Pure and DOM-free.
 */
import { shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions } from './quiz.js';
import { FIGURE_NAMES, SHAPES } from './shapes.js';

/**
 * The name of a shape or solid at the start of an option: 'Hình vuông'.
 * @param {import('./shapes.js').FigureKind} kind
 */
export function figureTitle(kind) {
  return capitalize(FIGURE_NAMES[kind]);
}

/**
 * Options naming the right plane shape and two other shapes.
 * @param {() => number} rand
 * @param {import('./shapes.js').ShapeKind} right
 */
export function shapeOptions(rand, right) {
  const others = shuffle(
    rand,
    SHAPES.filter((s) => s !== right),
  ).slice(0, 2);
  return mixOptions(rand, figureTitle(right), others.map(figureTitle));
}
