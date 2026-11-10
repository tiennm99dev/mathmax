import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { BANKS, KIND_LABELS, buildRound } from './engine.js';

describe('the banks', () => {
  it('give every task a right option apart from the wrong ones', () => {
    const tasks = Object.values(BANKS).flat();
    const bad = tasks.filter(
      (t) =>
        t.wrong.length < 2 ||
        t.wrong.includes(t.right) ||
        new Set(t.wrong).size !== t.wrong.length ||
        t.hint.includes(t.right),
    );
    expect(bad).toEqual([]);
  });

  it('have a bank for every part', () => {
    expect(Object.keys(BANKS).toSorted()).toEqual(Object.keys(KIND_LABELS).toSorted());
  });
});

describe('the round', () => {
  it('has one question of each part with the right answer stored', () => {
    /** @type {string[]} */
    const bad = [];
    for (let seed = 1; seed <= 100; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind ?? '').toSorted();
      if (kinds.join() !== Object.keys(KIND_LABELS).toSorted().join()) bad.push(`kinds ${seed}`);
      for (const q of round) {
        const bank = BANKS[/** @type {keyof typeof BANKS} */ (q.kind)];
        const task = bank.find((t) => t.prompt === q.prompt);
        if (!task || optionText(q.options[q.answer]) !== task.right) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
