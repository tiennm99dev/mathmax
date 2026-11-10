import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { ADD_SUB_SKILLS } from './add-sub-skills.js';
import { DATA_CHANCE_SKILLS } from './data-chance-skills.js';
import { GENERAL_SKILLS, elapsedSkill, squareFromPerimeter } from './general-skills.js';
import { GEOMETRY_MEASURE_SKILLS } from './geometry-measure-skills.js';
import { MUL_DIV_SKILLS } from './mul-div-skills.js';
import { NUMBER_SKILLS } from './number-skills.js';

const OWN = [squareFromPerimeter, elapsedSkill];

/** @param {import('./visual.js').ReviewQuestion} q */
const rightValue = (q) => Number(optionText(q.options[q.answer]).split(' ')[0]);

describe('general review', () => {
  it('is a short set of distinct parts with distinct labels', () => {
    expect(GENERAL_SKILLS.length).toBeLessThanOrEqual(12);
    expect(new Set(GENERAL_SKILLS.map((s) => s.id)).size).toBe(GENERAL_SKILLS.length);
    expect(new Set(GENERAL_SKILLS.map((s) => s.label)).size).toBe(GENERAL_SKILLS.length);
    const others = [
      NUMBER_SKILLS,
      ADD_SUB_SKILLS,
      MUL_DIV_SKILLS,
      GEOMETRY_MEASURE_SKILLS,
      DATA_CHANCE_SKILLS,
    ].flat();
    for (const skill of OWN) expect(others.map((s) => s.id)).not.toContain(skill.id);
  });

  it('asks well formed questions with four distinct options', () => {
    const bad = [];
    for (const skill of OWN) {
      for (let seed = 1; seed <= 200; seed++) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        const all = `${q.prompt} ${q.hint} ${q.solution} ${texts.join(' ')}`;
        if (new Set(texts).size !== 4) bad.push([skill.id, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, 'answer']);
        if (/undefined|NaN|\.\d|Infinity|null| -\d|\b\d{4,}\b/.test(all)) bad.push(all);
        if (q.hint.includes(optionText(q.options[q.answer]))) bad.push([skill.id, 'hint']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stores the right area, perimeter and span of time', () => {
    const bad = [];
    for (let seed = 1; seed <= 200; seed++) {
      const q = squareFromPerimeter.make(rng(seed));
      const p = Number((q.prompt.match(/chu vi (\d+) cm/) ?? [])[1]);
      const side = p / 4;
      const times = Number((q.prompt.match(/gấp (\d) lần/) ?? [])[1]);
      const want = times ? (side * times + side) * 2 : side * side;
      if (!Number.isInteger(side) || rightValue(q) !== want) bad.push(q.prompt);

      const t = elapsedSkill.make(rng(seed));
      const [from, to] = [...t.prompt.matchAll(/lúc (\d+) giờ(?: (\d+) phút)?/g)].map((m) =>
        Number(m[2] ?? 0),
      );
      if (to <= from || to > 55 || rightValue(t) !== to - from) bad.push(t.prompt);
    }
    expect(bad).toEqual([]);
  });
});
