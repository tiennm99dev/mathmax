/**
 * An adaptive review set: instead of a fixed list, each next question is drawn
 * from the skill the learner is weakest at so far. Every skill is tried once
 * first (in a seeded random order); after that a skill is picked at random
 * with a weight that grows with its wrong first attempts and shrinks with its
 * right ones, and never twice in a row while another skill is available.
 *
 * Answers are exact rational numbers, so a review can ask for whole numbers,
 * integers, fractions and decimals alike: `readValue` turns typed text such
 * as `-12`, `−12`, `3,75`, `3.75`, `5/6` or `2 526` into a fraction.
 */

import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { int } from '#lib/core/drill.js';

/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/**
 * @typedef {object} ReviewQuestion
 * @property {string} prompt plain text
 * @property {Fraction} answer exact value
 * @property {string} display the answer as the book writes it, e.g. '−3/4' or '3,825'
 * @property {string[]} steps worked solution, the last step states the answer
 * @property {string[]} hints mildest first, never the answer itself
 */

/**
 * @typedef {object} ReviewSkill
 * @property {string} id
 * @property {string} label shown on the skill map
 * @property {(rand: () => number) => ReviewQuestion} make
 */

/**
 * @typedef {{ skill: string, ok: boolean }} Attempt first attempt at one question
 * @typedef {'new' | 'weak' | 'review'} Reason why a skill was picked
 */

/**
 * Typed text as an exact value, or null when it is not a number. Accepts an
 * optional sign (- or −), digits grouped by spaces, a decimal comma or point,
 * and a fraction `p/q` with integer parts.
 * @param {string} text
 * @returns {Fraction | null}
 */
export function readValue(text) {
  const s = text
    .trim()
    .replace(/[−–]/g, '-')
    .replace(/(\d)[\s\u202f\u00a0]+(?=\d)/g, '$1');
  let m = /^([+-]?)(\d+)\s*\/\s*([+-]?)(\d+)$/.exec(s);
  if (m) {
    const q = Number(m[4]);
    if (q === 0) return null;
    const negative = (m[1] === '-') !== (m[3] === '-');
    return simplify(fraction(negative ? -Number(m[2]) : Number(m[2]), q));
  }
  m = /^([+-]?)(\d*)(?:[.,](\d+))?$/.exec(s);
  if (!m || (m[2] === '' && m[3] === undefined)) return null;
  const digits = m[3] ?? '';
  const d = 10 ** digits.length;
  const n = Number(m[2] || '0') * d + Number(digits || '0');
  return simplify(fraction(m[1] === '-' ? -n : n, d));
}

/**
 * @param {Fraction} a
 * @param {Fraction} b
 */
export function sameValue(a, b) {
  return a.n * b.d === b.n * a.d;
}

/**
 * First-attempt tallies per skill.
 * @param {ReviewSkill[]} skills
 * @param {Attempt[]} attempts
 */
export function tally(skills, attempts) {
  return skills.map(({ id, label }) => {
    const mine = attempts.filter((a) => a.skill === id);
    const right = mine.filter((a) => a.ok).length;
    return { id, label, right, answered: mine.length };
  });
}

/**
 * Status for the skill map: 'todo' before any answer, 'good' when every
 * first attempt was right, 'weak' when at most a third was, else 'mixed'.
 * @param {number} right
 * @param {number} answered
 * @returns {'todo' | 'good' | 'mixed' | 'weak'}
 */
export function statusOf(right, answered) {
  if (answered === 0) return 'todo';
  if (right === answered) return 'good';
  if (right * 3 <= answered) return 'weak';
  return 'mixed';
}

/**
 * Weight of a skill once every skill has been tried: a wrong first attempt
 * counts three times as much as a right one.
 * @param {number} right
 * @param {number} answered
 */
export function weightOf(right, answered) {
  const wrong = answered - right;
  return (1 + 3 * wrong) / (1 + right);
}

/**
 * The skill for the next question and why it was chosen.
 * @param {ReviewSkill[]} skills
 * @param {Attempt[]} attempts first attempts so far, in order
 * @param {() => number} rand
 * @returns {{ skill: ReviewSkill, reason: Reason }}
 */
export function nextSkill(skills, attempts, rand) {
  const stats = tally(skills, attempts);
  const fresh = skills.filter((_, i) => stats[i].answered === 0);
  if (fresh.length) return { skill: fresh[int(rand, 0, fresh.length - 1)], reason: 'new' };
  const last = attempts.at(-1)?.skill;
  const pool = skills.map((s, i) => ({ s, w: weightOf(stats[i].right, stats[i].answered) }));
  const allowed = pool.length > 1 ? pool.filter((p) => p.s.id !== last) : pool;
  const total = allowed.reduce((sum, p) => sum + p.w, 0);
  let x = rand() * total;
  let chosen = allowed[allowed.length - 1];
  for (const p of allowed) {
    x -= p.w;
    if (x < 0) {
      chosen = p;
      break;
    }
  }
  const i = skills.indexOf(chosen.s);
  const weak = stats[i].right < stats[i].answered;
  return { skill: chosen.s, reason: weak ? 'weak' : 'review' };
}

/**
 * A question from `skill` whose prompt has not been asked yet (up to 20
 * redraws).
 * @param {ReviewSkill} skill
 * @param {Set<string>} asked prompts already used
 * @param {() => number} rand
 */
export function drawQuestion(skill, asked, rand) {
  let q = skill.make(rand);
  for (let tries = 0; asked.has(q.prompt) && tries < 20; tries++) q = skill.make(rand);
  return q;
}
