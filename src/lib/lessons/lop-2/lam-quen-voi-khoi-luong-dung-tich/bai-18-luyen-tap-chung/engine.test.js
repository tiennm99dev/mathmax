import { describe, expect, it } from 'vitest';
import { optionText, weakLabels } from '#lib/core/kid/quiz.js';
import { totalKg } from '#lib/core/kid/mass.js';
import { KINDS, KIND_LABELS, buildRound } from './engine.js';

/**
 * The right option worked out again from the prompt and the picture alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const p = q.prompt;
  const nums = (p.match(/\d+/g) ?? []).map(Number);
  const unit = p.includes('ki-lô-gam') || p.includes(' kg') ? 'kg' : 'l';
  const v = q.visual;
  if (v?.type === 'scale' && q.kind === 'nang-nhe') {
    const heavyLeft = totalKg(v.left) > totalKg(v.right);
    const wantLeft = p.includes('nặng hơn') ? heavyLeft : !heavyLeft;
    return optionText(q.options[wantLeft ? 0 : 1]);
  }
  if (v?.type === 'scale') return `${totalKg(v.right)} kg`;
  if (v?.type === 'cups') return `${v.l} l`;
  if (/^\d+ (kg|l) \+ \d+ (kg|l) = \?$/.test(p)) return `${nums[0] + nums[1]} ${unit}`;
  if (/^\d+ (kg|l) − \d+ (kg|l) = \?$/.test(p)) return `${nums[0] - nums[1]} ${unit}`;
  if (p.includes('Cả hai') || p.includes('nhiều hơn')) return `${nums[0] + nums[1]} ${unit}`;
  if (p.includes('nhẹ hơn') || p.includes('ít hơn')) return `${nums[0] - nums[1]} ${unit}`;
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
        if (q.hint.includes(texts[q.answer])) bad.push([seed, 'hint', q.hint]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps balances level when read, pans light enough to draw, and numbers within 20', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const v = q.visual;
        if (q.kind === 'doc-can' && v?.type === 'scale') {
          if (totalKg(v.left) !== totalKg(v.right) || v.right.length > 4) bad.push(q.prompt);
        }
        if (q.kind === 'nang-nhe' && v?.type === 'scale') {
          if (totalKg(v.left) === totalKg(v.right)) bad.push(q.prompt);
        }
        const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
        if (nums.some((n) => n > 20)) bad.push(q.prompt);
        if (q.kind === 'bai-toan' && !q.solution.includes('Đáp số:')) bad.push(q.solution);
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same first round on server and browser, and names weak parts', () => {
    const round = buildRound(1);
    expect(buildRound(1)).toEqual(round);
    const firstTry = round.map((q) => q.kind !== 'doc-lit');
    expect(weakLabels(round, firstTry, KIND_LABELS)).toEqual([KIND_LABELS['doc-lit']]);
  });
});
