import { describe, expect, it } from 'vitest';
import { BASE, buildRound, divMessage, mulMessage } from './engine.js';

describe('the table of 4 on a grid of dots', () => {
  it('says what each number of rows shows', () => {
    expect(mulMessage(1)).toBe('1 hàng, mỗi hàng 4 chấm. 4 × 1 = 4.');
    expect(mulMessage(3)).toBe('3 hàng, mỗi hàng 4 chấm. 4 + 4 + 4 = 12. 4 × 3 = 12.');
    expect(mulMessage(10)).toContain('4 × 10 = 40');
    expect(mulMessage(10)).toContain('36, 40');
  });

  it('says how many dots stay as the rows are ringed', () => {
    expect(divMessage(3, 0)).toBe('Có 12 chấm. Khoanh được mấy hàng, mỗi hàng 4 chấm?');
    expect(divMessage(3, 1)).toBe('Đã khoanh 1 hàng, còn 8 chấm.');
    expect(divMessage(3, 3)).toBe(
      'Hết chấm rồi! Khoanh được 3 hàng. Vì 4 × 3 = 12 nên 12 : 4 = 3.',
    );
  });
});

describe('the quiz round', () => {
  it('has the right answer among distinct options for every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const n = q.visual?.n ?? 0;
        const asksRow = q.kind === 'div' || /Mỗi hộp|Lắp được/.test(q.prompt);
        const right = asksRow ? n : BASE * n;
        if (q.options[q.answer] !== String(right)) bad.push([seed, q.prompt]);
        if (new Set(q.options).size !== q.options.length) bad.push([seed, q.options]);
        if (q.options.length < 3) bad.push([seed, q.options]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes numbers in the prompt that fit the row', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const n = q.visual?.n ?? 0;
        const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
        if (q.kind === 'mul' && (nums[0] !== BASE || nums[1] !== n)) bad.push(q.prompt);
        if (q.kind === 'div' && (nums[0] !== BASE * n || nums[1] !== BASE)) bad.push(q.prompt);
        if (q.kind === 'skip' && nums.at(-1) !== BASE * n - BASE) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
