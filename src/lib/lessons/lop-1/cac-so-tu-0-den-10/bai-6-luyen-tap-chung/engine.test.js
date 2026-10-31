import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { KINDS, buildRound, makeQuestion, numberOptions, weakKinds } from './engine.js';

/** @param {import('./engine.js').Question} q */
function expected(q) {
  const m = q.solution.match(/(\d+|[<>=])\D*$/);
  return m ? m[1] : null;
}

describe('mixed practice engine', () => {
  it('builds the same round from the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
    expect(buildRound(1)).not.toEqual(buildRound(2));
  });

  it('asks each kind twice', () => {
    const round = buildRound(5);
    expect(round).toHaveLength(KINDS.length * 2);
    for (const k of KINDS) expect(round.filter((q) => q.kind === k)).toHaveLength(2);
  });

  it('offers number options that include the answer, all in 0..10', () => {
    const rand = rng(3);
    const bad = [];
    for (let right = 0; right <= 10; right++) {
      const { options, answer } = numberOptions(rand, right);
      const values = options.map(Number);
      if (values[answer] !== right || values.some((v) => v < 0 || v > 10)) bad.push(right);
      if (new Set(values).size !== values.length || values.length < 3) bad.push(right);
    }
    expect(bad).toEqual([]);
  });

  it('stores answers that match the worked solution', () => {
    const rand = rng(21);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const kind = KINDS[i % KINDS.length];
      const q = makeQuestion(kind, rand);
      const shown = q.options[q.answer];
      if (kind === 'count' && Number(shown) !== q.shown) bad.push(q);
      if (kind === 'compare') {
        const [a, b] = (q.prompt.match(/\d+/g) ?? []).map(Number);
        const sign = a === b ? '=' : a > b ? '>' : '<';
        if (shown !== sign) bad.push(q);
      }
      if (kind === 'split') {
        const [n, left] = (q.prompt.match(/\d+/g) ?? []).map(Number);
        if (Number(shown) !== n - left || n - left < 1) bad.push(q);
      }
      if (kind === 'largest' && Number(shown) !== Math.max(...q.options.map(Number))) bad.push(q);
      if (kind === 'missing') {
        const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
        const all = [...nums, Number(shown)].sort((x, y) => x - y);
        if (all.some((v, j) => j > 0 && v !== all[j - 1] + 1)) bad.push(q);
      }
      if (kind !== 'compare' && expected(q) !== shown) bad.push(q);
    }
    expect(bad).toEqual([]);
  });

  it('names the kinds missed at the first try', () => {
    const round = buildRound(4);
    const firstTry = round.map((q) => q.kind !== 'compare');
    expect(weakKinds(round, firstTry)).toEqual(['So sánh số']);
    expect(
      weakKinds(
        round,
        round.map(() => true),
      ),
    ).toEqual([]);
  });
});
