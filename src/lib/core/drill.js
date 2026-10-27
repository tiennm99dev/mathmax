/**
 * Generated practice drills for practice and review lessons: a seeded random
 * source, a shuffled set of questions drawn from several skills, a per-skill
 * summary that colours the skill map, and the two-try flow of
 * `drill-board.svelte` (a wrong first answer opens the hint ladder and a
 * second try; only a second miss shows the full solution).
 */

import { GROUP, readNatural } from './number-format.js';
import { normalizeUnit } from './answer-check.js';

/**
 * @typedef {object} Question
 * @property {string} skill id of the skill it practises
 * @property {string} prompt plain text
 * @property {number} answer a natural number
 * @property {string[]} steps the worked solution, one step per line
 * @property {string[]} [hints] plain-text hint ladder, mildest first; when
 *   left out, `hintsFor` derives it from the steps
 * @property {string} [unit] the unit the answer is counted in, such as '%',
 *   'đồng' or '°'. The learner may type it, or its Vietnamese word, after the
 *   number; a question without one takes a bare number only
 * @property {(text: string) => number | null} [read] how this question reads
 *   the typed number, when it differs from the board's `read` (a fraction
 *   among integers, say)
 */

/**
 * @typedef {object} Skill
 * @property {string} id
 * @property {string} label shown on the skill map, e.g. 'Bài 6. Lũy thừa'
 * @property {(rand: () => number) => Omit<Question, 'skill'>} make
 */

/**
 * Deterministic random numbers in [0, 1) from a 32-bit seed (mulberry32), so
 * a set can be rebuilt and tested.
 * @param {number} seed
 * @returns {() => number}
 */
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A whole number from lo to hi inclusive.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
export function int(rand, lo, hi) {
  return lo + Math.floor(rand() * (hi - lo + 1));
}

/**
 * @template T
 * @param {() => number} rand
 * @param {readonly T[]} items
 * @returns {T}
 */
export function pick(rand, items) {
  return items[Math.floor(rand() * items.length)];
}

/**
 * A shuffled copy (Fisher-Yates).
 * @template T
 * @param {() => number} rand
 * @param {readonly T[]} items
 * @returns {T[]}
 */
export function shuffle(rand, items) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * `perSkill` questions from every skill, mixed in random order. Questions
 * with the same prompt are drawn again so a set never repeats itself.
 * @param {Skill[]} skills
 * @param {number} perSkill
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildSet(skills, perSkill, seed) {
  const rand = rng(seed);
  /** @type {Question[]} */
  const out = [];
  const seen = new Set();
  for (const skill of skills) {
    for (let k = 0; k < perSkill; k++) {
      let q = skill.make(rand);
      for (let tries = 0; seen.has(q.prompt) && tries < 20; tries++) q = skill.make(rand);
      seen.add(q.prompt);
      out.push({ skill: skill.id, ...q });
    }
  }
  return shuffle(rand, out);
}

/**
 * A skill whose whole-number answers are read as natural numbers, so a count
 * typed with dot grouping ('1.350') is 1350 rather than a decimal, whatever
 * reader the board uses for the other answers (probabilities, decimals).
 * @param {Skill} skill
 * @returns {Skill}
 */
export function countsAsNaturals(skill) {
  return {
    ...skill,
    make(rand) {
      const q = skill.make(rand);
      return Number.isInteger(q.answer) ? { ...q, read: readNatural } : q;
    },
  };
}

/**
 * Splits typed text into the number and a trailing unit: '45 %' gives
 * { number: '45', unit: '%' }, '−3/4' gives { number: '−3/4', unit: '' }.
 * The unit starts at the first character after the last digit (or closing
 * bracket) that cannot belong to a number.
 * @param {string} text
 * @returns {{ number: string, unit: string }}
 */
export function splitUnit(text) {
  const s = text.trim();
  const m = /^(.*?[\d)])\s*([^\d\s.,/+\-\u2212\u2013\u2014()][\s\S]*)$/u.exec(s);
  return m ? { number: m[1], unit: m[2].trim() } : { number: s, unit: '' };
}

/**
 * Reads a typed answer to one question. A unit after the number is checked
 * against the question's own `unit` (so '45%' answers a percentage question
 * but not a count), then the number is read by the question's `read`, else
 * by the board's. Returns 'unit' when the unit does not belong there, null
 * when the number cannot be read.
 * @param {Pick<Question, 'unit' | 'read'>} question
 * @param {string} text
 * @param {(text: string) => number | null} read
 * @returns {number | null | 'unit'}
 */
export function readAnswer(question, text, read) {
  const { number, unit } = splitUnit(text);
  if (unit && (!question.unit || normalizeUnit(unit) !== normalizeUnit(question.unit))) {
    return 'unit';
  }
  return (question.read ?? read)(number);
}

/**
 * An answer written with its unit: '45%', '90°', '12 000 đồng'.
 * @param {string} text the formatted number
 * @param {string} [unit]
 */
export function withUnit(text, unit) {
  if (!unit) return text;
  return /^[%°‰]/.test(unit) ? `${text}${unit}` : `${text} ${unit}`;
}

/**
 * @typedef {'todo' | 'doing' | 'good' | 'mixed' | 'weak'} SkillStatus
 */

/**
 * Per-skill tally of first attempts. `results[i]` is true, false or null
 * (not answered yet) for `questions[i]`. A skill is 'todo' until one of its
 * questions is answered and 'doing' until all of them are, so one slip never
 * flags it early. Once finished it is 'good' when every question was right
 * first time, 'weak' when at most a third were, else 'mixed'.
 * @param {Skill[]} skills
 * @param {Question[]} questions
 * @param {Array<boolean | null>} results
 * @returns {Array<{ id: string, label: string, right: number, answered: number, total: number, status: SkillStatus }>}
 */
export function skillMap(skills, questions, results) {
  return skills.map(({ id, label }) => {
    let right = 0;
    let answered = 0;
    let total = 0;
    questions.forEach((q, i) => {
      if (q.skill !== id) return;
      total++;
      if (results[i] === null || results[i] === undefined) return;
      answered++;
      if (results[i]) right++;
    });
    /** @type {SkillStatus} */
    let status = 'todo';
    if (answered > 0 && answered < total) status = 'doing';
    else if (answered > 0) {
      if (right === answered) status = 'good';
      else if (right * 3 <= answered) status = 'weak';
      else status = 'mixed';
    }
    return { id, label, right, answered, total, status };
  });
}

/**
 * @typedef {'ask' | 'invalid' | 'retry' | 'retry-invalid' | 'right' | 'fixed' | 'wrong'} DrillPhase
 * - `ask`, `invalid`: first try (the last input could not be read).
 * - `retry`, `retry-invalid`: second try after a wrong first answer.
 * - `right`: right first time; `fixed`: right on the second try;
 *   `wrong`: missed twice, so the full solution shows.
 */

/**
 * Whether the question is settled and the board moves on next.
 * @param {DrillPhase} phase
 */
export function isDone(phase) {
  return phase === 'right' || phase === 'fixed' || phase === 'wrong';
}

/**
 * Whether the current input belongs to the second try.
 * @param {DrillPhase} phase
 */
export function isRetry(phase) {
  return phase === 'retry' || phase === 'retry-invalid';
}

/**
 * The next phase after checking an answer: `ok` is null for unreadable input,
 * which never uses up a try.
 * @param {DrillPhase} phase
 * @param {boolean | null} ok
 * @returns {DrillPhase}
 */
export function nextPhase(phase, ok) {
  if (isDone(phase)) return phase;
  if (isRetry(phase)) {
    if (ok === null) return 'retry-invalid';
    return ok ? 'fixed' : 'wrong';
  }
  if (ok === null) return 'invalid';
  return ok ? 'right' : 'retry';
}

/**
 * The hint ladder for a question: its own `hints`, or else the solution steps
 * before the last one, leaving out any step that already states the answer.
 * @param {Question} question
 * @returns {string[]}
 */
export function hintsFor(question) {
  if (question.hints) return question.hints;
  const answer = new RegExp(`(?<!\\d)${question.answer}(?!\\d)`);
  // Digits grouped by a space, narrow space or dot (1 024, 1.024) read as one.
  const ungroup = (/** @type {string} */ step) =>
    step.replace(new RegExp(`(\\d)[ .${GROUP}](?=\\d{3}(?!\\d))`, 'g'), '$1');
  return question.steps.slice(0, -1).filter((step) => !answer.test(ungroup(step)));
}
