import { describe, expect, it } from 'vitest';
import { isOneOver } from '../_shared/parts.js';
import { KIND_LABELS, buildRound, sideEnds } from './engine.js';

/**
 * The value of "12 : 3".
 * @param {string} text
 */
function divided(text) {
  const m = text.match(/(\d+) : (\d+)/);
  if (!m) throw new Error(`not a division: ${text}`);
  return Number(m[1]) / Number(m[2]);
}

/**
 * The right answer worked out again from what the question shows.
 * @param {import('./engine.js').Question} q
 * @returns {number | null} null for a question another test judges
 */
function recomputed(q) {
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  switch (q.kind) {
    case 'nhan':
      return nums[0] * nums[1];
    case 'chia':
      return nums[0] / nums[1];
    case 'nhan-chia':
      return nums[3] / nums[4];
    case 'thua-so':
      return nums[1] / nums[0];
    case 'so-bi-chia':
      return nums[0] * nums[1];
    case 'so-chia':
      return nums[0] / nums[1];
    case 'xep-do':
      return nums[0] * nums[1];
    case 'chia-nhom':
      return nums[0] / nums[1];
    default:
      return null;
  }
}

/** Every question of several rounds. */
function allQuestions() {
  const all = [];
  for (let seed = 1; seed <= 40; seed++) all.push(...buildRound(seed));
  return all;
}

describe('the mixed practice', () => {
  it('asks one question of each part', () => {
    const round = buildRound(1);
    expect(round.map((q) => q.kind).sort()).toEqual(Object.keys(KIND_LABELS).sort());
  });

  it('keeps every answer among different options', () => {
    const bad = allQuestions().filter((q) => {
      const labels = q.options.map((o) => (typeof o === 'string' ? o : o.label));
      return (
        q.answer < 0 ||
        q.answer >= labels.length ||
        labels.length < 3 ||
        new Set(labels).size !== labels.length
      );
    });
    expect(bad.map((q) => q.prompt)).toEqual([]);
  });

  it('marks the right result of every calculation and word problem', () => {
    const bad = allQuestions().filter((q) => {
      const right = recomputed(q);
      return right !== null && q.options[q.answer] !== String(right);
    });
    expect(bad.map((q) => q.prompt)).toEqual([]);
  });

  it('has one division under the limit', () => {
    const bad = allQuestions()
      .filter((q) => q.kind === 'be-hon')
      .filter((q) => {
        const limit = Number(q.prompt.match(/\d+/)?.[0]);
        const under = q.options.filter((o) => divided(String(o)) < limit);
        return under.length !== 1 || under[0] !== q.options[q.answer];
      });
    expect(bad.map((q) => q.options)).toEqual([]);
  });

  it('multiplies the two corners of the hidden side', () => {
    const bad = allQuestions()
      .filter((q) => q.kind === 'tam-giac')
      .filter((q) => {
        const v = /** @type {import('./engine.js').TriangleVisual} */ (q.visual);
        const [x, y] = sideEnds(v.corners, v.hidden);
        return q.options[q.answer] !== String(x * y);
      });
    expect(bad).toEqual([]);
  });

  it('draws the shape the question asks about', () => {
    const bad = allQuestions()
      .filter((q) => q.kind === 'tim-hinh')
      .filter((q) => {
        const n = Number(q.prompt.match(/1\/(\d)/)?.[1]);
        return !isOneOver(/** @type {any} */ (q.options[q.answer]).figure, n);
      });
    expect(bad).toEqual([]);
  });
});
