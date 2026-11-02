import { describe, expect, it } from 'vitest';
import { holdsText } from './strip.js';
import {
  SCENES,
  answerLine,
  compared,
  firstCalc,
  firstOptions,
  makeStory,
  needOptions,
  secondLabel,
  secondParts,
  solutionSteps,
  spoken,
  totalCalc,
  totalOptions,
} from './two-step.js';

const everyStory = () =>
  SCENES.flatMap((scene) => scene.pairs.map((pair) => makeStory(scene, pair)));

describe('the word problems', () => {
  it('work out to whole numbers within 100 with the numbers in their sentences', () => {
    const bad = [];
    for (const s of everyStory()) {
      const nums = s.given.match(/\d+/g)?.map(Number) ?? [];
      const right =
        s.rel === 'gap'
          ? s.a * s.k
          : s.rel === 'giam'
            ? s.a / s.k
            : s.a + (s.rel === 'hon' ? s.k : -s.k);
      if (!nums.includes(s.a) || !nums.includes(s.k)) bad.push(s.given);
      if (s.second !== right || !Number.isInteger(right) || right <= 0) bad.push(s.given);
      if (s.total !== s.a + right || s.total > 100) bad.push(s.given);
    }
    expect(bad).toEqual([]);
  });

  it('start from the numbers of the book', () => {
    const can = makeStory(SCENES[0]);
    expect([can.second, can.total]).toEqual([15, 20]);
    const boats = makeStory(SCENES[1]);
    expect([boats.second, boats.total]).toEqual([7, 17]);
    expect(compared('giam', 30, 2)).toBe(15);
  });

  it('write the solution line by line', () => {
    const can = makeStory(SCENES[0]);
    expect(solutionSteps(can).map((s) => s.line)).toEqual(['5 × 3 = 15 (l)', '5 + 15 = 20 (l)']);
    expect(answerLine(can)).toBe('Đáp số: 20 l nước mắm.');
  });
});

describe('the options of a step', () => {
  it('hold the right calculation once, with only whole results among the others', () => {
    const bad = [];
    for (const s of everyStory()) {
      const sets = [needOptions(s), firstOptions(s), totalOptions(s)];
      for (const { options, answer } of sets) {
        if (new Set(options).size !== options.length || answer < 0) bad.push(s.given);
      }
      const { options, answer } = firstOptions(s);
      if (options[answer] !== firstCalc(s)) bad.push(s.given);
      const total = totalOptions(s);
      if (total.options[total.answer] !== totalCalc(s)) bad.push(s.given);
      for (const o of options) {
        const [x, sign, y] = o.split(' ');
        if (sign === ':' && Number(x) % Number(y) !== 0) bad.push(o);
        if (sign === '−' && Number(x) <= Number(y)) bad.push(o);
      }
    }
    expect(bad).toEqual([]);
  });

  it('are read aloud in words', () => {
    expect(spoken('5 × 3')).toBe('5 nhân 3');
    expect(spoken('30 : 2')).toBe('30 chia 2');
  });
});

describe('the strip of the second quantity', () => {
  it('is as long as the quantity and fits the shared scale', () => {
    const bad = [];
    for (const s of everyStory()) {
      const parts = secondParts(s, true);
      const drawn = parts.filter((p) => p.tone !== 'faded').reduce((sum, p) => sum + p.size, 0);
      if (drawn !== s.second) bad.push(s.given);
      if (parts.reduce((sum, p) => sum + p.size, 0) > s.total) bad.push(s.given);
      for (const p of parts) if (p.text && !holdsText(p.size, s.total)) bad.push(s.given);
    }
    expect(bad).toEqual([]);
  });

  it('hides the value until it is known', () => {
    const boats = makeStory(SCENES[1]);
    expect(secondParts(boats, false)[0].text).toBe('?');
    expect(secondParts(boats, true)[0].text).toBe('7');
    expect(secondLabel(boats, false)).not.toContain('7');
    expect(secondLabel(boats, true)).toContain('7');
  });
});
