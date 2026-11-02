import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { FIRST_TASK, KIND_LABELS, buildRound, cutMessage, makeTask, pieceText } from './engine.js';

describe('the cut strip', () => {
  it('names a piece only when the cut comes out even', () => {
    expect(pieceText(18, 3)).toBe('6');
    expect(pieceText(18, 4)).toBe('');
  });

  it('tells where the cuts stand', () => {
    expect(cutMessage(FIRST_TASK, 1)).toContain('còn nguyên');
    expect(cutMessage(FIRST_TASK, 2)).toContain('cắt thêm');
    expect(cutMessage(FIRST_TASK, 3)).toContain('18 giảm đi 3 lần được 6. Em tính: 18 : 3 = 6.');
    expect(cutMessage(FIRST_TASK, 5)).toContain('nhiều quá');
  });

  it('makes tasks that divide evenly and differ from the one on screen', () => {
    const rand = rng(21);
    const bad = [];
    for (let i = 0; i < 100; i++) {
      const t = makeTask(rand, FIRST_TASK);
      if (t.n % t.times !== 0 || (t.n === FIRST_TASK.n && t.times === FIRST_TASK.times))
        bad.push(t);
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
        if (q.kind === 'giam' && Number(right) !== nums[0] / nums[1]) bad.push(q.prompt);
        if (q.kind === 'bot' && Number(right) !== nums[0] - nums[1]) bad.push(q.prompt);
        if (q.kind === 'strip' && Number(right) !== nums[0] / nums[1]) bad.push(q.prompt);
        if (q.kind === 'pick' && !right.includes(q.prompt.startsWith('Giảm') ? ':' : '−')) {
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
