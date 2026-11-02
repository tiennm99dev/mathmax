import { describe, expect, it } from 'vitest';
import { optionText, weakLabels } from '#lib/core/kid/quiz.js';
import { isCarry } from '#lib/core/kid/carry.js';
import { KINDS, KIND_LABELS, buildRound } from './engine.js';

/** @param {string} text a sum or a number */
function value(text) {
  return text
    .split('+')
    .map((t) => Number(t.trim()))
    .reduce((x, y) => x + y, 0);
}

/**
 * The right option worked out again from the prompt and options alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const p = q.prompt;
  const nums = (p.match(/\d+(?![A-Z])/g) ?? []).map(Number);
  if (p.startsWith('Chọn dấu đúng: ')) {
    const [left, right] = p.slice('Chọn dấu đúng: '.length).split(' ... ');
    const x = value(left);
    const y = value(right);
    return x === y ? '=' : x > y ? '>' : '<';
  }
  if (p === 'Phép cộng nào có nhớ?') {
    const carrying = q.options.map(optionText).filter((o) => {
      const [x, y] = o.split(' + ').map(Number);
      return (x % 10) + (y % 10) >= 10;
    });
    return carrying.length === 1 ? carrying[0] : 'several';
  }
  return String(nums.reduce((x, y) => x + y, 0));
}

describe('the mixed addition practice round', () => {
  it('asks each kind twice and every answer checks out', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const round = buildRound(seed);
      if (round.length !== 2 * KINDS.length) bad.push([seed, 'length']);
      for (const k of KINDS) {
        if (round.filter((q) => q.kind === k).length !== 2) bad.push([seed, 'kind', k]);
      }
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts[q.answer] !== recompute(q)) bad.push([seed, q.prompt, texts]);
        if (new Set(texts).size !== texts.length || texts.length < 3)
          bad.push([seed, 'options', q.prompt, texts]);
        if (q.hint.includes(`= ${texts[q.answer]}.`)) bad.push([seed, 'hint', q.hint]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps every number within 100 and every column addition carrying', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const nums = [...(q.prompt.match(/\d+/g) ?? []), ...q.options.map(optionText)].flatMap(
          (t) => (t.match(/\d+/g) ?? []).map(Number),
        );
        if (nums.some((n) => n > 99)) bad.push(q.prompt);
        if (q.visual && !isCarry(q.visual.a, q.visual.b, '+')) bad.push(q.prompt);
        if (q.kind === 'bai-toan' && !q.solution.startsWith('Số ')) bad.push(q.solution);
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same first round on server and browser, and names weak parts', () => {
    const round = buildRound(1);
    expect(buildRound(1)).toEqual(round);
    const firstTry = round.map((q) => q.kind !== 'ba-so');
    expect(weakLabels(round, firstTry, KIND_LABELS)).toEqual([KIND_LABELS['ba-so']]);
  });
});
