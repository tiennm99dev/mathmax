/**
 * Kid tap-the-answer questions for grades 1-5: the question shape, option
 * builders, how a tap moves a question on (a wrong first tap shows a hint and
 * a second try, a second miss shows the answer), the end-of-round summary of
 * a fixed round, and the helpers of an adaptive set, where the next question
 * comes from the part the child is weakest at so far (core's `nextSkill`:
 * every part once first, then weighted by wrong first attempts). Pure and
 * DOM-free; `choice-round.svelte` and `adaptive-quiz.svelte` draw them.
 */
import { nextSkill, statusOf, tally } from '#lib/core/adaptive.js';
import { shuffle } from '#lib/core/drill.js';
import { SIGNS, SIGN_WORDS } from './numbers.js';

/**
 * One option of a question: its text, or an object whose `label` is the text
 * and whose other fields a widget's `option` snippet draws (a shape, a
 * picture).
 * @typedef {string | ({ label: string } & Record<string, any>)} KidOption
 */

/**
 * A question; `V` is the shape of its `visual`, which the widget draws.
 * @template [V=unknown]
 * @typedef {object} KidQuestion
 * @property {string} prompt short sentence a child can hear
 * @property {KidOption[]} options what the buttons say or show
 * @property {number} answer index of the right option
 * @property {string} hint shown after a wrong first tap, never the answer
 * @property {string} solution the full reason, shown when the question ends
 * @property {string} [kind] the part of the round it practises, for a fixed round
 * @property {string[]} [optionLabels] screen-reader names, when the text is not enough
 * @property {V} [visual] what the widget draws above the options
 */

/**
 * One part of an adaptive set: a question maker with its label.
 * @template [V=unknown]
 * @typedef {object} KidSkill
 * @property {string} id
 * @property {string} label shown on the skill map
 * @property {(rand: () => number) => KidQuestion<V>} make
 */

/** @typedef {import('#lib/core/adaptive.js').Attempt} Attempt */
/** @typedef {import('#lib/core/adaptive.js').Reason} Reason */

/**
 * Where a question is: `ask` waits for a tap, `retry` follows one miss (the
 * hint shows), `right` and `shown` end it.
 * @typedef {'ask' | 'retry' | 'right' | 'shown'} Phase
 */

/**
 * The text of an option.
 * @param {KidOption} option
 */
export function optionText(option) {
  return typeof option === 'string' ? option : option.label;
}

/**
 * What a screen reader says for option `i`: its own label when the question
 * gives one, "Dấu lớn hơn" for a comparison sign, else its text.
 * @param {KidQuestion<any>} q
 * @param {number} i
 */
export function optionName(q, i) {
  const given = q.optionLabels?.[i];
  if (given) return given;
  const text = optionText(q.options[i]);
  const sign = SIGNS.find((s) => s === text);
  return sign ? `Dấu ${SIGN_WORDS[sign]}` : text;
}

/**
 * Whether a question has ended.
 * @param {Phase} phase
 */
export function isSettled(phase) {
  return phase === 'right' || phase === 'shown';
}

/**
 * What one tap does. A tap on an option already tried, or after the
 * question ended, changes nothing (`first` is null). `first` is whether the
 * first tap of the question was right, set only on that first tap.
 * @param {{ phase: Phase, wrong: number[] }} state
 * @param {number} option tapped index
 * @param {number} answer right index
 * @returns {{ phase: Phase, wrong: number[], first: boolean | null }}
 */
export function tapOption(state, option, answer) {
  const { phase, wrong } = state;
  if (isSettled(phase) || wrong.includes(option)) return { phase, wrong, first: null };
  const first = phase === 'ask' ? option === answer : null;
  if (option === answer) return { phase: 'right', wrong, first };
  return { phase: phase === 'ask' ? 'retry' : 'shown', wrong: [...wrong, option], first };
}

/**
 * Labels of the parts of a fixed round with a wrong first try, in the order
 * of `labels` (kind → label).
 * @param {readonly KidQuestion<any>[]} round
 * @param {ReadonlyArray<boolean | null | undefined>} firstTry
 * @param {Readonly<Record<string, string>>} labels
 * @returns {string[]}
 */
export function weakLabels(round, firstTry, labels) {
  const missed = new Set();
  round.forEach((q, i) => {
    if (firstTry[i] === false) missed.add(q.kind);
  });
  return Object.keys(labels)
    .filter((k) => missed.has(k))
    .map((k) => labels[k]);
}

/**
 * The part for the next question of an adaptive set and why it was chosen.
 * @template {KidSkill<any>} S
 * @param {readonly S[]} skills
 * @param {Attempt[]} attempts first attempts so far, in order
 * @param {() => number} rand
 * @returns {{ skill: S, reason: Reason }}
 */
export function pickSkill(skills, attempts, rand) {
  return nextSkill(skills, attempts, rand);
}

/**
 * What tells two questions apart: the same prompt with another picture is
 * another question.
 * @param {KidQuestion<any>} q
 */
export function questionKey(q) {
  return `${q.prompt}|${JSON.stringify(q.visual ?? null)}|${q.options.map(optionText).join('/')}`;
}

/**
 * A question of `skill` that was not asked yet in this set (up to 20
 * redraws).
 * @template V
 * @param {KidSkill<V>} skill
 * @param {Set<string>} asked keys of the questions already asked
 * @param {() => number} rand
 * @returns {KidQuestion<V>}
 */
export function drawFresh(skill, asked, rand) {
  let q = skill.make(rand);
  for (let tries = 0; asked.has(questionKey(q)) && tries < 20; tries++) q = skill.make(rand);
  return q;
}

/**
 * Each part with its first-attempt score and status ('todo', 'good',
 * 'mixed' or 'weak').
 * @param {readonly KidSkill<any>[]} skills
 * @param {Attempt[]} attempts
 */
export function skillMap(skills, attempts) {
  return tally(skills, attempts).map((s) => ({
    ...s,
    status: statusOf(s.right, s.answered),
  }));
}

/**
 * Labels of the parts to review once a set ends: those with a wrong first
 * attempt, in the order of `skills`.
 * @param {readonly KidSkill<any>[]} skills
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

/**
 * A sign question as options: the three signs, read aloud as words.
 * @param {import('./numbers.js').Sign} sign
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
