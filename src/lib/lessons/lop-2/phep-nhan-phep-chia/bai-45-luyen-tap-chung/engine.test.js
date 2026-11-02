import { describe, expect, it } from 'vitest';
import { optionText, questionKey } from '#lib/core/kid/quiz.js';
import { KINDS, KIND_LABELS, buildRound } from './engine.js';

/**
 * Works out a printed sentence "a op b = c".
 * @param {string} text
 */
function holds(text) {
  const m = text.match(/^(\d+) ([×:]) (\d+) = (\d+)$/);
  if (!m) return false;
  const [a, b, c] = [Number(m[1]), Number(m[3]), Number(m[4])];
  return m[2] === '×' ? a * b === c : a === b * c;
}

/**
 * The right option worked out again from the question alone, or null where
 * another test checks it.
 * @param {import('./engine.js').Question} q
 * @returns {string | null}
 */
function recompute(q) {
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  switch (q.kind) {
    case 'nhan':
    case 'tong':
      return String(nums[0] * nums[1]);
    case 'chia':
      return String(nums[0] / nums[1]);
    case 'hai-buoc':
      return q.prompt.includes('×')
        ? String(nums[0] * nums[1] - nums[2])
        : String(nums[0] / nums[1] + nums[2]);
    case 'dau': {
      const [left, right] = [nums[0] * nums[1], nums[2] / nums[3]];
      if (left === right) return '=';
      return left > right ? '>' : '<';
    }
    default:
      return null;
  }
}

describe('the mixed round', () => {
  it('covers every kind with fourteen different questions', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildRound(seed);
      const kinds = new Set(round.map((q) => q.kind));
      if (kinds.size !== KINDS.length || round.length !== 14) bad.push(['kinds', seed]);
      if (new Set(round.map(questionKey)).size !== round.length) bad.push(['repeat', seed]);
    }
    expect(bad).toEqual([]);
    expect(Object.keys(KIND_LABELS)).toEqual(KINDS);
  });

  it('stores the answer the question asks for, across many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map(optionText);
        const right = texts[q.answer];
        const expected = recompute(q);
        if (expected !== null && right !== expected) bad.push(`${q.prompt} → ${right}`);
        if (new Set(texts).size !== texts.length || texts.length < 2) bad.push(texts.join('/'));
        if (q.answer < 0 || q.answer >= texts.length) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('offers exactly one true division from a multiplication', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed).filter((x) => x.kind === 'lap')) {
        const texts = q.options.map(optionText);
        const trueOnes = texts.filter(holds);
        if (trueOnes.length !== 1 || trueOnes[0] !== texts[q.answer]) {
          bad.push(`${q.prompt} ${texts.join(' / ')}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('points at the part each naming question asks for', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed).filter((x) => x.kind === 'ten')) {
        const [a, b, c] = (q.prompt.match(/\d+/g) ?? []).map(Number);
        let want = c;
        if (q.prompt.includes('số bị chia')) want = a;
        if (q.prompt.includes('số chia là')) want = b;
        if (q.options[q.answer] !== String(want)) bad.push(q.prompt);
        if (new Set([a, b, c]).size !== 3) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stores the worked-out answer of the word problems', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed).filter((x) => x.kind === 'bai-toan')) {
        const { each = 0, groups = 0 } = q.visual ?? {};
        const want = q.visual?.loose ? groups : each * groups;
        if (q.options[q.answer] !== String(want)) bad.push(q.prompt);
        if (!q.solution.includes(String(want))) bad.push(q.solution);
      }
    }
    expect(bad).toEqual([]);
  });

  it('is the same for the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});
