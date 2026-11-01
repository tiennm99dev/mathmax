import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  THINGS,
  actMessage,
  newStory,
  operationOptions,
  result,
  resultOptions,
  solutionLines,
  storyText,
  summaryLines,
} from './engine.js';

describe('stories about adding and taking away', () => {
  it('tells a story and sets out its solution the book way', () => {
    /** @type {import('./engine.js').Story} */
    const flowers = { thing: 1, kind: 'them', a: 9, b: 6 };
    expect(storyText(flowers)).toEqual({
      start: 'Lọ hoa có 9 bông hoa.',
      change: 'Việt cắm thêm 6 bông hoa.',
      question: 'Hỏi có tất cả bao nhiêu bông hoa?',
    });
    expect(summaryLines(flowers)[1]).toBe('Thêm: 6 bông hoa');
    expect(solutionLines(flowers)).toEqual([
      'Số bông hoa có tất cả là:',
      '9 + 6 = 15 (bông)',
      'Đáp số: 15 bông hoa.',
    ]);
    /** @type {import('./engine.js').Story} */
    const chicks = { thing: 0, kind: 'bot', a: 15, b: 4 };
    expect(result(chicks)).toBe(11);
    expect(solutionLines(chicks)[1]).toBe('15 − 4 = 11 (con)');
    expect(storyText(chicks).question).toBe('Hỏi còn lại bao nhiêu con gà con?');
    expect(operationOptions(chicks)).toEqual({ options: ['15 + 4', '15 − 4'], answer: 1 });
  });

  it('counts down what is left to act out', () => {
    /** @type {import('./engine.js').Story} */
    const s = { thing: 0, kind: 'them', a: 6, b: 3 };
    expect(actMessage(s, 1)).toContain('Còn 2 con gà con nữa');
    expect(actMessage(s, 3)).toContain('Đã thêm đủ 3');
  });

  it('draws stories within 20 that never subtract across ten', () => {
    const bad = [];
    const rand = rng(9);
    /** @type {import('./engine.js').Story | undefined} */
    let prev;
    for (let i = 0; i < 200; i++) {
      const s = newStory(rand, prev);
      const c = result(s);
      if (s.thing < 0 || s.thing >= THINGS.length) bad.push(['thing', s]);
      if (s.b < 2 || c < 0 || c > 20) bad.push(['range', s]);
      if (s.kind === 'bot' && s.a > 10 && s.b > s.a - 10) bad.push(['across ten', s]);
      if (prev && prev.thing === s.thing) bad.push(['same thing', s]);
      const { options, answer } = resultOptions(rand, s);
      if (options[answer] !== String(c)) bad.push(['answer', s]);
      prev = s;
    }
    expect(bad).toEqual([]);
  });
});
