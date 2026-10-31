/**
 * A kid adaptive review quiz: every question is a tap-the-answer question,
 * and the next one comes from the part of the review the child is weakest
 * at so far. The choice of part is core's `nextSkill` (every part once
 * first, then weighted by wrong first attempts); this file adds the kid
 * question shape, option builders and the end-of-set summary. Pure and
 * DOM-free.
 */
import { nextSkill, statusOf, tally } from '#lib/core/adaptive.js';
import { shuffle } from '#lib/core/drill.js';

/** @typedef {import('#lib/core/kid/pictures/index.js').PictureName} PictureName */
/** @typedef {'vuong' | 'tron' | 'tam-giac' | 'chu-nhat'} ShapeKind */
/** @typedef {'lap-phuong' | 'hop-chu-nhat'} SolidKind */
/** @typedef {ShapeKind | SolidKind} FigureKind */

/**
 * What a question shows above its options.
 * - `groups`: groups of pictures side by side, each `{ picture, n }`.
 * - `takeaway`: `total` pictures of which the last `gone` are crossed out.
 * - `figures`: plane shapes or solids in a row; `blank` adds a "?" box at the end.
 * - `row`: pictures standing in a row, left to right as the child sees them.
 * - `table`: one picture on a table and one under it.
 * @typedef {(
 *   | { type: 'groups', groups: { picture: PictureName, n: number }[] }
 *   | { type: 'takeaway', picture: PictureName, total: number, gone: number }
 *   | { type: 'figures', figures: FigureKind[], blank?: boolean }
 *   | { type: 'row', pictures: PictureName[] }
 *   | { type: 'table', top: PictureName, under: PictureName }
 * )} Visual
 */

/**
 * @typedef {object} KidQuestion
 * @property {string} prompt short sentence a child can hear
 * @property {string[]} options what the buttons say
 * @property {number} answer index of the right option
 * @property {string} hint shown after a wrong first tap, never the answer
 * @property {string} solution the full reason, shown when the question ends
 * @property {Visual} [visual]
 * @property {string[]} [optionLabels] screen-reader names when an option is a sign
 */

/**
 * @typedef {object} KidSkill
 * @property {string} id
 * @property {string} label shown on the skill map
 * @property {(rand: () => number) => KidQuestion} make
 */

/** @typedef {import('#lib/core/adaptive.js').Attempt} Attempt */
/** @typedef {import('#lib/core/adaptive.js').Reason} Reason */

/**
 * Core's adaptive helpers read only `id` and `label` of a skill, so a kid
 * skill can stand in for a review skill there.
 * @param {readonly KidSkill[]} skills
 * @returns {import('#lib/core/adaptive.js').ReviewSkill[]}
 */
function asReview(skills) {
  return /** @type {import('#lib/core/adaptive.js').ReviewSkill[]} */ (
    /** @type {unknown} */ ([...skills])
  );
}

/**
 * The part for the next question and why it was chosen.
 * @param {readonly KidSkill[]} skills
 * @param {Attempt[]} attempts first attempts so far, in order
 * @param {() => number} rand
 * @returns {{ skill: KidSkill, reason: Reason }}
 */
export function pickSkill(skills, attempts, rand) {
  const { skill, reason } = nextSkill(asReview(skills), attempts, rand);
  return { skill: skills.find((s) => s.id === skill.id) ?? skills[0], reason };
}

/**
 * A question of `skill` whose prompt and options were not asked yet in this
 * set (up to 20 redraws).
 * @param {KidSkill} skill
 * @param {Set<string>} asked keys of the questions already asked
 * @param {() => number} rand
 */
export function drawFresh(skill, asked, rand) {
  let q = skill.make(rand);
  for (let tries = 0; asked.has(questionKey(q)) && tries < 20; tries++) q = skill.make(rand);
  return q;
}

/**
 * What tells two questions apart: the same prompt with another picture is
 * another question.
 * @param {KidQuestion} q
 */
export function questionKey(q) {
  return `${q.prompt}|${JSON.stringify(q.visual ?? null)}|${q.options.join('/')}`;
}

/**
 * Each part with its first-attempt score and status ('todo', 'good',
 * 'mixed' or 'weak').
 * @param {readonly KidSkill[]} skills
 * @param {Attempt[]} attempts
 */
export function skillMap(skills, attempts) {
  return tally(asReview(skills), attempts).map((s) => ({
    ...s,
    status: statusOf(s.right, s.answered),
  }));
}

/**
 * Labels of the parts to review once a set ends: those with a wrong first
 * attempt, in the order of `skills`.
 * @param {readonly KidSkill[]} skills
 * @param {Attempt[]} attempts
 */
export function toReview(skills, attempts) {
  return skillMap(skills, attempts)
    .filter((s) => s.status === 'mixed' || s.status === 'weak')
    .map((s) => s.label);
}

/**
 * Up to four number options from `lo` to `hi` that include `right`, drawn
 * near it and in increasing order so a child can scan them.
 * @param {() => number} rand
 * @param {number} right
 * @param {number} [lo]
 * @param {number} [hi]
 * @returns {{ options: string[], answer: number }}
 */
export function numberOptions(rand, right, lo = 0, hi = 10) {
  const near = [];
  for (let d = -3; d <= 3; d++) {
    const v = right + d;
    if (d !== 0 && v >= lo && v <= hi) near.push(v);
  }
  const values = [right, ...shuffle(rand, near).slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * The right option among distinct wrong ones, shuffled.
 * @param {() => number} rand
 * @param {string} right
 * @param {string[]} wrong
 * @returns {{ options: string[], answer: number }}
 */
export function mixOptions(rand, right, wrong) {
  const options = shuffle(rand, [right, ...new Set(wrong.filter((w) => w !== right))]);
  return { options, answer: options.indexOf(right) };
}

/** The comparison signs, in the order their buttons show. */
export const SIGNS = /** @type {const} */ (['>', '<', '=']);

/** How each sign is read aloud. */
export const SIGN_WORDS = /** @type {const} */ ({ '>': 'lớn hơn', '<': 'bé hơn', '=': 'bằng' });

/**
 * The sign between two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {'>' | '<' | '='}
 */
export function signOf(a, b) {
  return a === b ? '=' : a > b ? '>' : '<';
}

/**
 * A sign question as options: the three signs, read aloud as words.
 * @param {'>' | '<' | '='} sign
 */
export function signOptions(sign) {
  return {
    options: [...SIGNS],
    answer: SIGNS.indexOf(sign),
    optionLabels: SIGNS.map((s) => `Dấu ${SIGN_WORDS[s]}`),
  };
}

/**
 * First letter in upper case, for options that start a sentence.
 * @param {string} text
 */
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
