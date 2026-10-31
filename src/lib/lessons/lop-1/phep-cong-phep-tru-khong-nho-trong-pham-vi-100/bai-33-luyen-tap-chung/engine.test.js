import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { KINDS, buildRound, makeQuestion, numberOptions, weakKinds } from './engine.js';

/**
 * Evaluates "a + b" or "a − b".
 * @param {string} text
 */
function evaluate(text) {
  const m = text.match(/(\d+) ([+−]) (\d+)/);
  if (!m) return NaN;
  return m[2] === '+' ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
}

/**
 * Recomputes the right option of a question from its prompt alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const p = q.prompt;
  if (q.kind === 'compare') {
    const m = p.match(/: (.+) \.\.\. (\d+)$/);
    if (!m) return '';
    const v = evaluate(m[1]);
    const o = Number(m[2]);
    return v === o ? '=' : v > o ? '>' : '<';
  }
  if (q.kind === 'story') {
    const nums = (p.match(/\d+/g) ?? []).map(Number);
    return String(p.includes('Thêm') ? nums[0] + nums[1] : nums[0] - nums[1]);
  }
  return String(evaluate(p));
}

/**
 * Whether a calculation in a prompt needs carrying or borrowing.
 * @param {string} text
 */
function carries(text) {
  const m = text.match(/(\d+) ([+−]) (\d+)/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[3])];
  return m[2] === '+' ? (a % 10) + (b % 10) > 9 || a + b > 99 : a % 10 < b % 10 || a < b;
}

describe('mixed practice within 100 without carrying', () => {
  it('builds the same round from the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
    expect(buildRound(1)).not.toEqual(buildRound(2));
  });

  it('asks each kind twice', () => {
    const round = buildRound(5);
    expect(round).toHaveLength(KINDS.length * 2);
    for (const k of KINDS) expect(round.filter((q) => q.kind === k)).toHaveLength(2);
  });

  it('offers distinct number options in 0..99 that include the answer', () => {
    const rand = rng(3);
    const bad = [];
    for (const right of [0, 1, 9, 10, 46, 90, 99]) {
      const { options, answer } = numberOptions(rand, right, [right * 10, right]);
      const values = options.map(Number);
      if (values[answer] !== right || values.some((v) => v < 0 || v > 99)) bad.push(right);
      if (new Set(values).size !== values.length || values.length < 3) bad.push(right);
    }
    expect(bad).toEqual([]);
  });

  it('stores answers that match the prompt, with no carrying', () => {
    const rand = rng(21);
    const bad = [];
    for (let i = 0; i < 400; i++) {
      const q = makeQuestion(KINDS[i % KINDS.length], rand);
      if (recompute(q) !== q.options[q.answer]) bad.push(q);
      if (new Set(q.options).size !== q.options.length || q.options.length < 3) bad.push(q);
      if (carries(q.prompt)) bad.push(q);
      const nums = `${q.prompt} ${q.options.join(' ')}`.match(/\d+/g) ?? [];
      if (nums.some((n) => Number(n) > 99)) bad.push(q);
    }
    expect(bad).toEqual([]);
  });

  it('never puts the answer in a hint', () => {
    const rand = rng(8);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const q = makeQuestion(KINDS[i % KINDS.length], rand);
      if (q.hint.includes(`= ${q.options[q.answer]}`)) bad.push(q);
    }
    expect(bad).toEqual([]);
  });

  it('names the kinds missed at the first try', () => {
    const round = buildRound(4);
    expect(
      weakKinds(
        round,
        round.map((q) => q.kind !== 'tens'),
      ),
    ).toEqual(['Tính nhẩm số tròn chục']);
    expect(
      weakKinds(
        round,
        round.map(() => true),
      ),
    ).toEqual([]);
  });
});
