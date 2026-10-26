import { describe, expect, it } from 'vitest';
import { buildSet, hintsFor, rng } from '#lib/core/drill.js';
import { GROUP, readNatural } from '#lib/core/number-format.js';
import { MASS_SKILLS, TEMPERATURE_SKILLS, TIME_SKILLS } from './measure-skills.js';

const ALL = [...MASS_SKILLS, ...TIME_SKILLS, ...TEMPERATURE_SKILLS];

/** Numbers in a prompt, with grouped digits read as one number. */
const numbers = (/** @type {string} */ text) =>
  (text.match(new RegExp(`\\d+(?:[${GROUP} ]\\d{3})*`, 'g')) ?? []).map((s) =>
    Number(s.replace(new RegExp(`[${GROUP} ]`, 'g'), '')),
  );

describe('measuring drill skills', () => {
  it('give natural-number answers with hints that never state them', () => {
    const rand = rng(7);
    for (const skill of ALL) {
      for (let k = 0; k < 200; k++) {
        const q = { skill: skill.id, ...skill.make(rand) };
        expect(Number.isInteger(q.answer) && q.answer >= 0).toBe(true);
        for (const hint of hintsFor(q)) {
          expect(numbers(hint)).not.toContain(q.answer);
        }
        expect(numbers(q.steps.at(-1) ?? '')).toContain(q.answer);
      }
    }
  });

  it('recompute each conversion from the prompt', () => {
    const rand = rng(11);
    for (let k = 0; k < 200; k++) {
      const q = MASS_SKILLS[0].make(rand);
      const [kg, g] = numbers(q.prompt);
      expect(q.answer).toBe(kg * 1000 + g);

      const big = MASS_SKILLS[1].make(rand);
      const [n, extra] = numbers(big.prompt);
      const size = big.prompt.includes('tấn') ? 1000 : big.prompt.includes('tạ') ? 100 : 10;
      expect(big.answer).toBe(n * size + extra);

      const hm = TIME_SKILLS[0].make(rand);
      const [h, m] = numbers(hm.prompt);
      expect(hm.answer).toBe(h * 60 + m);

      const ms = TIME_SKILLS[1].make(rand);
      const [mm, s] = numbers(ms.prompt);
      expect(ms.answer).toBe(mm * 60 + s);

      const span = TIME_SKILLS[2].make(rand);
      const [h1, m1, h2, m2] = numbers(span.prompt);
      expect(span.answer).toBe(h2 * 60 + m2 - (h1 * 60 + m1));

      const ck = TEMPERATURE_SKILLS[0].make(rand);
      expect(ck.answer).toBe(numbers(ck.prompt)[0] + 273);
      const kc = TEMPERATURE_SKILLS[1].make(rand);
      expect(kc.answer).toBe(numbers(kc.prompt)[0] - 273);
    }
  });

  it('builds a set the board can read back', () => {
    const set = buildSet(MASS_SKILLS, 2, 1);
    expect(set).toHaveLength(6);
    for (const q of set) expect(readNatural(String(q.answer))).toBe(q.answer);
  });
});
