/**
 * What a review question of this chapter draws above its options.
 * `quiz-visual.svelte` draws it; nothing here gives the answer away before the
 * question has ended.
 * @typedef {(
 *   | { type: 'mul', a: number, b: number }
 *   | { type: 'div', n: number, d: number }
 *   | { type: 'work', text: string }
 *   | { type: 'scene', scene: import('./scene.js').Scene }
 *   | { type: 'cubes', dims: import('./stack.js').Dims, mark?: number }
 *   | { type: 'broken', lengths: number[] }
 *   | { type: 'balance', left: import('#lib/core/kid/mass.js').Load[], right: import('#lib/core/kid/mass.js').Load[] }
 * )} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} ReviewQuestion */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
