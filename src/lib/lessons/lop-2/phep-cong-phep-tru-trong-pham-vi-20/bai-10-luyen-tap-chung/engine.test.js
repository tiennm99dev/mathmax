import { describe, expect, it } from 'vitest';
import { optionText, weakLabels } from '#lib/core/kid/quiz.js';
import { KINDS, KIND_LABELS, buildRound } from './engine.js';

/** @param {string} text the sum or number on one side of a comparison */
function value(text) {
  return text
    .split('+')
    .map((x) => Number(x.trim()))
    .reduce((s, x) => s + x, 0);
}

/**
 * The right option worked out again from the prompt alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const p = q.prompt;
  const nums = (p.match(/\d+/g) ?? []).map(Number);
  if (p.startsWith('Chọn dấu đúng: ')) {
    const [left, right] = p.slice('Chọn dấu đúng: '.length).split(' ... ');
    const x = value(left);
    const y = value(right);
    return x === y ? '=' : x > y ? '>' : '<';
  }
  if (/^\d+ \+ \? = \d+$/.test(p)) return String(nums[1] - nums[0]);
  if (/^\d+ \+ \d+ = \d+ \+ \d+ \+ \?$/.test(p)) return String(nums[1] - nums[3]);
  if (p.startsWith('Để tính')) return String(nums[1] - nums[3]);
  if (/^\d+ \+ \d+( \+ \d+)? = \?$/.test(p)) return String(nums.reduce((s, x) => s + x, 0));
  if (p.includes('có tất cả')) return String(nums[0] + nums[1]);
  if (p.includes('còn lại')) return String(nums[0] - nums[1]);
  return '';
}

describe('the mixed practice round', () => {
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
        if (texts[q.answer] !== recompute(q)) bad.push([seed, q.prompt, texts[q.answer]]);
        if (new Set(texts).size !== texts.length) bad.push([seed, 'options', q.prompt]);
        if (q.hint.includes(` = ${texts[q.answer]}.`) && q.kind !== 'so-sanh')
          bad.push([seed, 'hint gives it away', q.hint]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stays within 20 and never subtracts across ten', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
        if (nums.some((n) => n > 20)) bad.push(q.prompt);
        if (q.prompt.includes('còn lại') && nums[0] > 10 && nums[1] > nums[0] - 10)
          bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same first round on server and browser, and names weak parts', () => {
    const round = buildRound(1);
    expect(buildRound(1)).toEqual(round);
    const firstTry = round.map((q) => q.kind !== 'tach');
    expect(weakLabels(round, firstTry, KIND_LABELS)).toEqual([KIND_LABELS.tach]);
  });
});
