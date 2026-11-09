import { describe, expect, it } from 'vitest';
import { GROUP } from '#lib/core/number-format.js';
import { optionText, questionKey } from '#lib/core/kid/quiz.js';
import { cellCount } from '../_shared/figures.js';
import { KINDS, KIND_LABELS, ROUND_LENGTH, amountOptions, buildRound } from './engine.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, '');

/** Every whole number in a text, in order. @param {string} text */
const numbersIn = (text) => (plain(text).match(/\d+/g) ?? []).map(Number);

/**
 * The right option worked out again from the question alone.
 * @param {import('./engine.js').Question} q
 * @returns {string | null}
 */
function recompute(q) {
  const n = numbersIn(q.prompt);
  switch (q.kind) {
    case 'chu-vi': {
      const unit = q.prompt.includes(' dm') ? 'dm' : 'cm';
      return `${n.reduce((s, v) => s + v, 0)} ${unit}`;
    }
    case 'chu-vi-cn':
      return `${(n[0] + n[1]) * 2} ${q.prompt.includes(' dm') ? 'dm' : 'cm'}`;
    case 'chu-vi-vuong':
      return `${n[0] * 4} cm`;
    case 'dem-o':
      return q.visual?.type === 'cells' ? `${cellCount(q.visual.rows)} cm²` : null;
    case 'dien-tich-cn':
      return `${n[0] * n[1]} cm²`;
    case 'dien-tich-vuong':
      return `${n[0] * n[0]} cm²`;
    case 'cm2': {
      const [a, b] = n;
      if (q.prompt.includes('+')) return `${a + b} cm²`;
      if (q.prompt.includes('−')) return `${a - b} cm²`;
      if (q.prompt.includes('×')) return `${a * b} cm²`;
      return `${a / b} cm²`;
    }
    case 'bai-toan':
      if (q.prompt.includes('rào')) return `${(n[0] + n[1]) * 2} m`;
      if (q.prompt.includes('chu vi')) return `${n[0] / 4} cm`;
      return n[0] * n[1] > n[2] * n[2] ? 'Tấm bìa hình chữ nhật' : 'Tấm bìa hình vuông';
    default:
      return null;
  }
}

describe('the mixed round', () => {
  it('covers every kind with different questions', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const round = buildRound(seed);
      if (new Set(round.map((q) => q.kind)).size !== KINDS.length) bad.push(['kinds', seed]);
      if (round.length !== ROUND_LENGTH) bad.push(['length', seed]);
      if (new Set(round.map(questionKey)).size !== round.length) bad.push(['repeat', seed]);
    }
    expect(bad).toEqual([]);
    expect(Object.keys(KIND_LABELS)).toEqual(KINDS);
  });

  it('stores the answer the question asks for, across many seeds', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map((o) => plain(optionText(o)));
        if (new Set(texts).size !== texts.length || texts.length < 2) {
          bad.push(['options', q.prompt, texts]);
        }
        const right = recompute(q);
        if (right === null || texts[q.answer] !== plain(right)) {
          bad.push([q.prompt, texts[q.answer], right]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('draws the sides the prompt names', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'chu-vi' || q.visual?.type !== 'poly') continue;
        const drawn = q.visual.labels.map((l) => numbersIn(l)[0]);
        const said = numbersIn(q.prompt);
        if (JSON.stringify(drawn) !== JSON.stringify(said)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('starts the same for every visitor', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});

describe('amount options', () => {
  it('keeps the right one among at least three distinct values', () => {
    const o = amountOptions(16, [16, 8, 8], 'cm');
    expect(o.options).toEqual(['8 cm', '16 cm', '17 cm']);
    expect(o.options[o.answer]).toBe('16 cm');
    const big = amountOptions(50, [1, 2, 3, 4], 'cm²');
    expect(big.options[big.answer]).toBe('50 cm²');
    expect(big.options.length).toBe(4);
  });
});
