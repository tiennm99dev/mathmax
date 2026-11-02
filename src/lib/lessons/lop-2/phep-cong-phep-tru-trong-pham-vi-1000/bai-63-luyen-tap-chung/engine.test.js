import { describe, expect, it } from 'vitest';
import { MINUS } from '#lib/core/number-format.js';
import { optionText, questionKey } from '#lib/core/kid/quiz.js';
import { carryCount, forgetCarry } from '../_shared/column-three.js';
import { KINDS, KIND_LABELS, STORIES, buildRound } from './engine.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

/**
 * A calculation worked from left to right.
 * @param {string} text such as "800 − 200 + 135"
 */
function value(text) {
  const tokens = text.trim().split(' ');
  let total = Number(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    total += (tokens[i] === '+' ? 1 : -1) * Number(tokens[i + 1]);
  }
  return total;
}

/**
 * The calculation between a prefix and " = ?".
 * @param {string} prompt
 */
function calculation(prompt) {
  return value(prompt.replace(/^.*: /, '').replace(' = ?', ''));
}

/**
 * The right option worked out again from the question alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const texts = q.options.map(optionText);
  if (q.kind === 'cong' || q.kind === 'tru' || q.kind === 'nham' || q.kind === 'ba-so') {
    return String(calculation(q.prompt));
  }
  if (q.kind === 'lon-be') {
    const results = texts.map(value);
    const target = q.prompt.includes('lớn nhất') ? Math.max(...results) : Math.min(...results);
    return texts[results.indexOf(target)];
  }
  if (q.kind === 'sai') {
    const bad = texts.filter((t) => {
      const [left, right] = t.split(' = ');
      return value(left) !== Number(right);
    });
    return bad.length === 1 ? bad[0] : 'several';
  }
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  const story = STORIES.find((s) => s.text(nums[0], nums[1]) === q.prompt);
  if (!story) return 'no story';
  return String(story.op === '+' ? nums[0] + nums[1] : nums[0] - nums[1]);
}

describe('buildRound', () => {
  it('asks twelve questions of every kind', () => {
    const bad = SEEDS.filter((seed) => {
      const round = buildRound(seed);
      return round.length !== 12 || KINDS.some((k) => !round.some((q) => q.kind === k));
    });
    expect(bad).toEqual([]);
    expect(Object.keys(KIND_LABELS)).toEqual(KINDS);
  });

  it('is the same for the same seed', () => {
    expect(buildRound(3)).toEqual(buildRound(3));
  });

  it('marks the right answer, recomputed from the question', () => {
    const bad = SEEDS.flatMap((seed) =>
      buildRound(seed)
        .filter((q) => recompute(q) !== optionText(q.options[q.answer]))
        .map((q) => `${seed}: ${q.prompt}`),
    );
    expect(bad).toEqual([]);
  });

  it('has different options, at least two, and no repeated question', () => {
    const bad = SEEDS.filter((seed) => {
      const round = buildRound(seed);
      const keys = new Set(round.map(questionKey));
      return (
        keys.size !== round.length ||
        round.some((q) => {
          const texts = q.options.map(optionText);
          return texts.length < 2 || new Set(texts).size !== texts.length;
        })
      );
    });
    expect(bad).toEqual([]);
  });

  it('stays within 1000 and adds no answer to the hint', () => {
    const bad = SEEDS.flatMap((seed) =>
      buildRound(seed).filter((q) => {
        const right = optionText(q.options[q.answer]);
        const numbers = q.options.flatMap((o) => optionText(o).match(/\d+/g) ?? []).map(Number);
        const given = /** @type {string[]} */ (q.prompt.match(/\d+/g) ?? []);
        const added = /** @type {string[]} */ (q.hint.match(/\d+/g) ?? []).filter(
          (n) => !given.includes(n),
        );
        return numbers.some((n) => n > 1000) || added.includes(right);
      }),
    );
    expect(bad).toEqual([]);
  });

  it('carries at most once in a column question', () => {
    const bad = SEEDS.flatMap((seed) =>
      buildRound(seed).filter(
        (q) => q.visual && carryCount(q.visual.a, q.visual.b, q.visual.op) > 1,
      ),
    );
    expect(bad).toEqual([]);
  });

  it('writes the book minus sign', () => {
    const q = buildRound(1).find((x) => x.kind === 'tru');
    expect(q?.prompt).toContain(MINUS);
  });
});

describe('forgetCarry', () => {
  it('gives the slip of a forgotten carry', () => {
    expect(forgetCarry(427, 246, '+')).toBe(663);
    expect(forgetCarry(381, 342, '+')).toBe(623);
    expect(forgetCarry(485, 128, '-')).toBe(367);
    expect(forgetCarry(427, 251, '-')).toBe(276);
    expect(forgetCarry(247, 351, '+')).toBe(598);
  });
});
