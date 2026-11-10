import { describe, expect, it } from 'vitest';
import { KIND_LABELS, TARGETS, buildRound, targetMessage, unitQuestion } from './engine.js';
import { rng } from '#lib/core/drill.js';

describe('virtual protractor goals', () => {
  it('says when the goal is reached and which way to turn', () => {
    expect(targetMessage(60, 60).done).toBe(true);
    expect(targetMessage(40, 60).text).toContain('ra xa');
    expect(targetMessage(80, 60).text).toContain('lại gần');
  });

  it('asks only measures the 5° steps can make', () => {
    expect(TARGETS.every((t) => t % 5 === 0 && t >= 5 && t <= 180)).toBe(true);
  });
});

describe('reading round', () => {
  it('has six questions of the listed kinds', () => {
    const bad = [];
    for (let seed = 1; seed <= 20; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind ?? '');
      if (
        round.length !== 6 ||
        !kinds.every((k) => k in KIND_LABELS) ||
        kinds.filter((k) => k === 'thuoc-trai').length !== 2 ||
        round.some((q) => q.answer < 0 || q.answer >= q.options.length)
      )
        bad.push(seed);
    }
    expect(bad).toEqual([]);
    expect(buildRound(1)).toEqual(buildRound(1));
  });

  it('asks the unit in every form with the right answer', () => {
    const seen = new Set();
    for (let seed = 1; seed <= 30; seed++) {
      const q = unitQuestion(rng(seed));
      seen.add(q.prompt);
      expect(['Độ', '60°', '90°']).toContain(q.options[q.answer]);
    }
    expect(seen.size).toBe(3);
  });
});
