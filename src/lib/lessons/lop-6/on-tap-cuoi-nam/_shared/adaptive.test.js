import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { fraction } from '#lib/fraction-engine/index.js';
import {
  drawQuestion,
  nextSkill,
  readValue,
  sameValue,
  statusOf,
  tally,
  weightOf,
} from './adaptive.js';

/** @param {string} id @returns {import('./adaptive.js').ReviewSkill} */
const skill = (id) => ({
  id,
  label: id.toUpperCase(),
  make: (r) => ({
    prompt: `${id}${Math.floor(r() * 1000)}`,
    answer: fraction(1),
    display: '1',
    steps: ['1'],
    hints: ['h'],
  }),
});
const SKILLS = ['a', 'b', 'c'].map(skill);

describe('readValue', () => {
  it('reads integers, decimals and fractions exactly', () => {
    expect(readValue('-12')).toEqual(fraction(-12));
    expect(readValue('−12')).toEqual(fraction(-12));
    expect(readValue('3,75')).toEqual(fraction(15, 4));
    expect(readValue('3.75')).toEqual(fraction(15, 4));
    expect(readValue('10/12')).toEqual(fraction(5, 6));
    expect(readValue('-5/6')).toEqual(fraction(-5, 6));
    expect(readValue('5/−6')).toEqual(fraction(-5, 6));
    expect(readValue('2 526')).toEqual(fraction(2526));
    expect(readValue('2\u202f526')).toEqual(fraction(2526));
    expect(readValue(',5')).toEqual(fraction(1, 2));
  });

  it('rejects anything else', () => {
    for (const s of ['', 'abc', '1/0', '3,', '1,2,3', '--2', '2x'])
      expect(readValue(s), s).toBeNull();
  });

  it('compares by value', () => {
    expect(sameValue(fraction(2, 4), fraction(1, 2))).toBe(true);
    expect(sameValue(fraction(-1, 2), fraction(1, 2))).toBe(false);
  });
});

describe('statuses and weights', () => {
  it('colours a skill like the drill board', () => {
    expect(statusOf(0, 0)).toBe('todo');
    expect(statusOf(2, 2)).toBe('good');
    expect(statusOf(1, 3)).toBe('weak');
    expect(statusOf(2, 3)).toBe('mixed');
  });

  it('weights a missed skill above a mastered one', () => {
    expect(weightOf(0, 2)).toBeGreaterThan(weightOf(1, 2));
    expect(weightOf(1, 2)).toBeGreaterThan(weightOf(2, 2));
  });

  it('tallies first attempts per skill', () => {
    const t = tally(SKILLS, [
      { skill: 'a', ok: true },
      { skill: 'a', ok: false },
      { skill: 'c', ok: true },
    ]);
    expect(t.map((s) => [s.right, s.answered])).toEqual([
      [1, 2],
      [0, 0],
      [1, 1],
    ]);
  });
});

describe('nextSkill', () => {
  it('tries every skill once before repeating one', () => {
    const r = rng(5);
    /** @type {import('./adaptive.js').Attempt[]} */
    const attempts = [];
    for (let i = 0; i < SKILLS.length; i++) {
      const { skill: s, reason } = nextSkill(SKILLS, attempts, r);
      expect(reason).toBe('new');
      attempts.push({ skill: s.id, ok: true });
    }
    expect(new Set(attempts.map((a) => a.skill)).size).toBe(3);
  });

  it('favours the skill with wrong answers and never repeats the last one', () => {
    const r = rng(9);
    const counts = { a: 0, b: 0, c: 0 };
    for (let i = 0; i < 3000; i++) {
      const attempts = [
        { skill: 'a', ok: true },
        { skill: 'b', ok: false },
        { skill: 'c', ok: true },
      ];
      const { skill: s, reason } = nextSkill(SKILLS, attempts, r);
      expect(s.id).not.toBe('c');
      counts[/** @type {'a' | 'b' | 'c'} */ (s.id)]++;
      expect(reason).toBe(s.id === 'b' ? 'weak' : 'review');
    }
    // Weights 0.5 for a and 4 for b.
    expect(counts.b).toBeGreaterThan(counts.a * 5);
  });

  it('draws a prompt that has not been asked', () => {
    const r = rng(1);
    const asked = new Set();
    for (let i = 0; i < 50; i++) {
      const q = drawQuestion(SKILLS[0], asked, r);
      expect(asked.has(q.prompt)).toBe(false);
      asked.add(q.prompt);
    }
  });
});
