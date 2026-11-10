import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { clockAngle } from './angle.js';
import { clockQuestion, drawMeasure, readingQuestion } from './questions.js';

describe('shared questions', () => {
  it('ask to read the true measure off the protractor', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const rand = rng(seed);
      const m = drawMeasure(rand);
      for (const side of /** @type {const} */ (['phai', 'trai'])) {
        const q = readingQuestion(rand, side, m);
        const fig = q.visual?.type === 'figure' ? q.visual.figure : null;
        const ok =
          optionText(q.options[q.answer]) === `${m}°` &&
          fig?.protractor === side &&
          !q.hint.includes(`${m}°`) &&
          q.solution.includes(`${m}°`);
        if (!ok) bad.push([seed, side, m]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('draws measures on the 5° grid and avoids a repeat', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const rand = rng(seed);
      const a = drawMeasure(rand);
      const b = drawMeasure(rand, a);
      if (a === b || a % 5 || a < 15 || a > 165) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('asks the clock angle of the hour it shows', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = clockQuestion(rng(seed));
      const h = q.visual?.type === 'clock' ? q.visual.minutes / 60 : -1;
      if (optionText(q.options[q.answer]) !== `${clockAngle(h)}°` || !q.prompt.includes(`${h} giờ`))
        bad.push(seed);
    }
    expect(bad).toEqual([]);
  });
});

describe('clock options', () => {
  it('step by 30° like the hour marks', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = clockQuestion(rng(seed));
      const values = q.options.map((o) => Number(optionText(o).replace('°', '')));
      if (values.some((v) => v % 30 !== 0 || v <= 0 || v > 180) || new Set(values).size !== 4)
        bad.push(seed);
    }
    expect(bad).toEqual([]);
  });
});
