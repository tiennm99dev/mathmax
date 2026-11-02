import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { rng } from '#lib/core/drill.js';
import {
  FIRST_TASK,
  KIND_LABELS,
  buildRound,
  copyMessage,
  makeTask,
  maxCopies,
  stripScale,
  sumText,
} from './engine.js';

describe('the copied strip', () => {
  it('writes the copies as an addition', () => {
    expect(sumText(6, 1)).toBe('6');
    expect(sumText(6, 3)).toBe('6 + 6 + 6 = 18');
  });

  it('tells where the copies stand', () => {
    expect(copyMessage(FIRST_TASK, 2)).toContain('cần 3 băng');
    expect(copyMessage(FIRST_TASK, 3)).toBe(
      'Đúng rồi! 6 gấp lên 3 lần được 18. Em tính: 6 × 3 = 18.',
    );
    expect(copyMessage(FIRST_TASK, 4)).toContain('Nhiều quá');
  });

  it('keeps room for every copy on one scale', () => {
    expect(stripScale(FIRST_TASK)).toBe(FIRST_TASK.n * maxCopies(FIRST_TASK));
  });

  it('makes tasks in range and different from the one on screen', () => {
    const rand = rng(5);
    const bad = [];
    for (let i = 0; i < 100; i++) {
      const t = makeTask(rand, FIRST_TASK);
      if (t.n * t.times > 90 || (t.n === FIRST_TASK.n && t.times === FIRST_TASK.times)) bad.push(t);
    }
    expect(bad).toEqual([]);
  });
});

describe('the round', () => {
  it('stores the answer the numbers in the prompt give', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        const nums = q.prompt.match(/\d+/g)?.map(Number) ?? [];
        if (new Set(q.options.map(optionText)).size !== q.options.length) bad.push(q.prompt);
        if (q.kind === 'gap' && Number(right) !== nums[0] * nums[1]) bad.push(q.prompt);
        if (q.kind === 'them' && Number(right) !== nums[0] + nums[1]) bad.push(q.prompt);
        if (q.kind === 'strip' && Number(right) !== nums[0] * nums[1]) bad.push(q.prompt);
        if (q.kind === 'pick' && !right.includes(q.prompt.startsWith('Gấp') ? '×' : '+')) {
          bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('covers every part and gives the same round for a seed', () => {
    const round = buildRound(1);
    expect(new Set(round.map((q) => q.kind))).toEqual(new Set(Object.keys(KIND_LABELS)));
    expect(buildRound(1)).toEqual(round);
  });
});
