import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { GROUP } from '#lib/core/number-format.js';
import { rng } from '#lib/core/drill.js';
import { carries } from '../_shared/column.js';
import { KIND_LABELS, buildRound, pairFor } from './engine.js';

/** @param {string} text */
const numbersIn = (text) =>
  (text.match(new RegExp(`\\d+(?:${GROUP}\\d{3})*`, 'g')) ?? []).map((s) =>
    Number(s.replaceAll(GROUP, '')),
  );

const SEEDS = Array.from({ length: 40 }, (_, i) => i * 7919 + 1);

describe('mixed practice round', () => {
  it('asks one question of each part', () => {
    const round = buildRound(3);
    expect(round.map((q) => q.kind).sort()).toEqual(Object.keys(KIND_LABELS).sort());
  });

  it('has distinct options with the right one among them', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map(optionText);
        if (new Set(texts).size !== texts.length || texts.length < 2) bad.push(`${seed} ${q.kind}`);
        if (q.answer < 0 || q.answer >= texts.length) bad.push(`${seed} ${q.kind} answer`);
        if (q.hint.includes(texts[q.answer]) && /^\d/.test(texts[q.answer]))
          bad.push(`${seed} ${q.kind} hint`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('marks the right result of every calculation', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const right = numbersIn(optionText(q.options[q.answer]))[0];
        const nums = numbersIn(q.prompt);
        if (q.kind === 'cong' && nums[0] + nums[1] !== right) bad.push(q.prompt);
        if (q.kind === 'tru' && nums[0] - nums[1] !== right) bad.push(q.prompt);
        if (q.kind === 'giao-hoan' && nums[2] !== right) bad.push(q.prompt);
        if (q.kind === 'nham') {
          const value = q.prompt.includes('+') ? nums[0] + nums[1] : nums[0] - nums[1];
          if (value !== right) bad.push(q.prompt);
        }
        if (q.kind === 'tong-hieu') {
          const [sum, diff] = nums;
          const want = q.prompt.includes('lớn') ? (sum + diff) / 2 : (sum - diff) / 2;
          if (want !== right) bad.push(q.prompt);
        }
        if (q.kind === 'thuc-te') {
          const value = q.prompt.includes('thêm') ? nums[0] + nums[1] : nums[0] - nums[1];
          if (value !== right) bad.push(q.prompt);
        }
        if (q.kind === 'thuan-tien') {
          const [a, , c] = nums;
          const [x, y] = numbersIn(optionText(q.options[q.answer]));
          if (x !== a || y !== c || (a + c) % 100 !== 0) bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('draws pairs that carry in two or more columns and keep six digits', () => {
    const rand = rng(11);
    const bad = [];
    for (let i = 0; i < 50; i++) {
      for (const op of /** @type {const} */ (['+', '−'])) {
        const { a, b } = pairFor(rand, op);
        const value = op === '+' ? a + b : a - b;
        if (carries(op, a, b) < 2 || String(value).length !== 6) bad.push(`${a} ${op} ${b}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
