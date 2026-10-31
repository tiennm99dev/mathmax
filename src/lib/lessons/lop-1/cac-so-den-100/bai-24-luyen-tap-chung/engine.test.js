import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { readNumber } from '../_shared/numbers.js';
import { KINDS, buildRound, makeQuestion, numberOptions, swapped, weakKinds } from './engine.js';

/**
 * The value a question's right option must have, worked out from the
 * prompt and the picture independently of the maker.
 * @param {import('./engine.js').Question} q
 */
function expected(q) {
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  if (q.kind === 'sticks') return String(q.sticks ? q.sticks.tens * 10 + q.sticks.ones : NaN);
  if (q.kind === 'read') {
    if (nums.length === 1) return readNumber(nums[0]);
    const words = q.prompt.match(/"(.+)"/)?.[1];
    for (let n = 1; n <= 100; n++) if (readNumber(n) === words) return String(n);
  }
  if (q.kind === 'place') return String(nums[0] * 10 + (nums[1] ?? 0));
  if (q.kind === 'compare') {
    const [a, b] = nums;
    return a === b ? '=' : a > b ? '>' : '<';
  }
  if (q.kind === 'extreme') {
    const values = q.options.map(Number);
    return String(q.prompt.includes('lớn') ? Math.max(...values) : Math.min(...values));
  }
  const n = nums[nums.length - 1];
  if (q.prompt.includes('dưới')) return String(n + 10);
  if (q.prompt.includes('trên')) return String(n - 10);
  if (q.prompt.includes('phải')) return String(n + 1);
  return String(n - 1);
}

describe('chapter practice round', () => {
  it('asks every kind twice', () => {
    const round = buildRound(1);
    expect(round).toHaveLength(KINDS.length * 2);
    for (const k of KINDS) expect(round.filter((q) => q.kind === k)).toHaveLength(2);
  });

  it('marks the right option and offers distinct options, over many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const right = q.options[q.answer];
        if (right !== expected(q)) bad.push({ seed, prompt: q.prompt, right });
        if (new Set(q.options).size !== q.options.length || q.options.length < 3)
          bad.push({ seed, prompt: q.prompt, options: q.options });
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps a board move on the board', () => {
    const rand = rng(3);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const q = makeQuestion('board', rand);
      const n = Number(q.prompt.match(/số (\d+)/)?.[1]);
      if (
        (q.prompt.includes('phải') && n % 10 === 0) ||
        (q.prompt.includes('trái') && n % 10 === 1)
      )
        bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('swaps digits only when that gives another two-digit number', () => {
    expect(swapped(47)).toBe(74);
    expect(swapped(40)).toBeNull();
    expect(swapped(55)).toBeNull();
  });

  it('builds sorted number options around the answer', () => {
    const { options, answer } = numberOptions(rng(1), 99, [null, 100, 101]);
    expect(options[answer]).toBe('99');
    expect(options.map(Number)).toEqual([...options.map(Number)].sort((a, b) => a - b));
    expect(options.every((o) => Number(o) <= 100)).toBe(true);
  });

  it('lists the kinds missed at the first try', () => {
    const round = buildRound(2);
    const firstTry = round.map((q) => q.kind !== 'compare');
    expect(weakKinds(round, firstTry)).toEqual(['So sánh']);
  });
});
