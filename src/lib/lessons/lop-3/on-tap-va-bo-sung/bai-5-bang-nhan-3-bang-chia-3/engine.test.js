import { describe, expect, it } from 'vitest';
import { BASE, buildRound, downMessage, hopsDown, hopsUp, upMessage } from './engine.js';

describe('the table of 3 on a number line', () => {
  it('lands each forward hop on the next product', () => {
    expect(hopsUp(0)).toEqual([]);
    expect(hopsUp(10).at(-1)).toEqual({ from: 27, to: 30, label: '+3' });
    expect(hopsUp(4).map((h) => h.to)).toEqual([3, 6, 9, 12]);
  });

  it('lands backward hops on 0 after as many hops as the quotient', () => {
    expect(hopsDown(12, 4).map((h) => h.to)).toEqual([9, 6, 3, 0]);
    expect(hopsDown(12, 2)).toEqual([
      { from: 12, to: 9, label: '−3' },
      { from: 9, to: 6, label: '−3' },
    ]);
  });

  it('says what each hop shows', () => {
    expect(upMessage(4)).toBe('4 lần 3: 3 + 3 + 3 + 3 = 12. 3 × 4 = 12.');
    expect(upMessage(10)).toBe(
      'Xong bảng nhân 3! Đếm thêm 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30.',
    );
    expect(downMessage(4, 0)).toBe('Em đứng ở số 12. Lùi mấy bước 3 thì về số 0?');
    expect(downMessage(4, 2)).toBe('Đã lùi 2 bước, em đang ở số 6.');
    expect(downMessage(4, 4)).toBe('Về số 0 rồi! Lùi 4 bước 3. Vì 3 × 4 = 12 nên 12 : 3 = 4.');
  });
});

describe('the quiz round', () => {
  it('has the right answer for each question', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const n = q.visual?.n ?? 0;
        const asksRow = q.kind === 'div' || /Mỗi bó|Xếp được/.test(q.prompt);
        const right = asksRow ? n : BASE * n;
        if (q.options[q.answer] !== String(right)) bad.push([seed, q.prompt]);
        if (new Set(q.options).size !== q.options.length) bad.push([seed, q.options]);
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
