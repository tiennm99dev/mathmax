import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, buildRound, divWords, mulWords } from './engine.js';

describe('how a calculation is said', () => {
  it('multiplies with a carry the way the book says it', () => {
    expect(mulWords(27, 3)).toBe(
      '3 nhân 7 bằng 21, viết 1, nhớ 2. 3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8. Vậy 27 × 3 = 81.',
    );
    expect(mulWords(12, 3)).toContain('3 nhân 1 bằng 3, viết 3.');
  });

  it('divides from the tens', () => {
    expect(divWords(35, 3)).toContain('Vậy 35 : 3 = 11 (dư 2).');
    expect(divWords(72, 4)).toContain('Hạ 2, được 32. 32 chia 4 được 8');
  });
});

describe('the round', () => {
  it('has one question of each part', () => {
    const kinds = buildRound(1).map((q) => q.kind);
    expect(kinds.toSorted()).toEqual(Object.keys(KIND_LABELS).toSorted());
  });

  it('stores the answers that the numbers of the prompt give', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        const nums = q.prompt.match(/\d+/g)?.map(Number) ?? [];
        const [x, y] = nums;
        const opts = q.options.map(optionText);
        if (new Set(opts).size !== opts.length || q.answer < 0) bad.push(q.prompt);
        if (opts.length < 2) bad.push(q.prompt);
        if (q.kind === 'nhan-chuc' || q.kind === 'nhan' || q.kind === 'gap') {
          if (Number(right) !== x * y || x * y > 99) bad.push(q.prompt);
        }
        if (q.kind === 'chia-chuc' || q.kind === 'chia' || q.kind === 'giam') {
          if (Number(right) !== x / y) bad.push(q.prompt);
        }
        if (q.kind === 'chia-du') {
          if (right !== `${Math.floor(x / y)} (dư ${x % y})`) bad.push(q.prompt);
        }
        if (q.kind === 'bai-du') {
          const [count, left] = right.match(/\d+/g)?.map(Number) ?? [];
          if (count * y + left !== x || left >= y || left === 0) bad.push(q.prompt);
        }
        if (q.kind === 'chuoi' && Number(right) !== x / y + nums[2]) bad.push(q.prompt);
        if (q.kind === 'hai-buoc' && q.solution.includes(`= ${right}.`) === false)
          bad.push(q.prompt);
        if (q.kind === 'so-do' && !q.visual) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('asks for the calculation that the words of the prompt name', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = buildRound(seed).find((c) => c.kind === 'chon-phep');
      if (!q) throw new Error('no such question');
      const right = optionText(q.options[q.answer]);
      const sign = q.prompt.startsWith('Gấp')
        ? '×'
        : q.prompt.startsWith('Thêm')
          ? '+'
          : q.prompt.startsWith('Giảm')
            ? ':'
            : '−';
      if (!right.includes(sign)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('never offers a remainder of zero as a number form', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        for (const o of q.options) if (optionText(o).includes('dư 0')) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
