import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { KINDS, buildRound, makeQuestion, numberOptions, weakKinds } from './engine.js';

/**
 * Evaluates "a + b", "a − b" or a lone number.
 * @param {string} text
 */
function evaluate(text) {
  const m = text.trim().match(/^(\d+)\s*([+−])\s*(\d+)$/);
  if (!m) return Number(text);
  return m[2] === '+' ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
}

/**
 * Recomputes the right option of a question from its prompt alone.
 * @param {import('./engine.js').Question} q
 * @returns {string | null}
 */
function recompute(q) {
  const p = q.prompt;
  if (q.kind === 'add' || q.kind === 'sub') {
    return String(evaluate(p.replace(/=.*$/, '')));
  }
  if (q.kind === 'missing') {
    const m = p.match(/(\d+) ([+−]) \? = (\d+)/);
    if (!m) return null;
    const [x, op, z] = [Number(m[1]), m[2], Number(m[3])];
    return String(op === '+' ? z - x : x - z);
  }
  if (q.kind === 'compare') {
    const m = p.match(/: (.+) \.\.\. (\d+)$/);
    if (!m) return null;
    const v = evaluate(m[1]);
    const o = Number(m[2]);
    return v === o ? '=' : v > o ? '>' : '<';
  }
  if (q.kind === 'story') {
    const nums = (p.match(/\d+/g) ?? []).map(Number);
    return String(p.includes('Thêm') ? nums[0] + nums[1] : nums[0] - nums[1]);
  }
  if (q.kind === 'picture' && q.groups) {
    const [a, b] = q.groups;
    return `${a} + ${b} = ${a + b}`;
  }
  return null;
}

describe('mixed addition and subtraction practice', () => {
  it('builds the same round from the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
    expect(buildRound(1)).not.toEqual(buildRound(2));
  });

  it('asks each kind twice', () => {
    const round = buildRound(5);
    expect(round).toHaveLength(KINDS.length * 2);
    for (const k of KINDS) expect(round.filter((q) => q.kind === k)).toHaveLength(2);
  });

  it('offers distinct number options in 0..10 that include the answer', () => {
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

  it('stores answers that match the prompt, all within 10', () => {
    const rand = rng(21);
    const bad = [];
    for (let i = 0; i < 300; i++) {
      const q = makeQuestion(KINDS[i % KINDS.length], rand);
      const shown = q.options[q.answer];
      if (recompute(q) !== shown) bad.push(q);
      if (new Set(q.options).size !== q.options.length) bad.push(q);
      const nums = `${q.prompt} ${q.options.join(' ')}`.match(/\d+/g) ?? [];
      if (nums.some((n) => Number(n) > 10)) bad.push(q);
      if (q.kind === 'picture' && q.options.filter((o) => recompute(q) === o).length !== 1) {
        bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never puts the answer in a hint', () => {
    const rand = rng(8);
    const bad = [];
    for (let i = 0; i < 120; i++) {
      const q = makeQuestion(KINDS[i % KINDS.length], rand);
      const shown = q.options[q.answer];
      if (q.hint.includes(shown.includes('=') ? shown : `= ${shown}`)) bad.push(q);
    }
    expect(bad).toEqual([]);
  });

  it('names the kinds missed at the first try', () => {
    const round = buildRound(4);
    const firstTry = round.map((q) => q.kind !== 'compare');
    expect(weakKinds(round, firstTry)).toEqual(['So sánh']);
    expect(
      weakKinds(
        round,
        round.map(() => true),
      ),
    ).toEqual([]);
  });
});
