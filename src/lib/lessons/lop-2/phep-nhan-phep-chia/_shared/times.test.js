import { describe, expect, it } from 'vitest';
import { buildRound, jumpMessage, mulLine, repeatedSum, tableOptions } from './times.js';

describe('table sentences', () => {
  it('keeps the repeated number first', () => {
    expect(mulLine(2, 3)).toBe('2 × 3 = 6');
    expect(repeatedSum(5, 4)).toBe('5 + 5 + 5 + 5');
  });

  it('lists the counted numbers after each jump', () => {
    expect(jumpMessage(2, 0, 'Bắt đầu')).toBe('Bắt đầu');
    expect(jumpMessage(2, 3, '')).toBe('3 lần 2: 2 × 3 = 6. Đếm thêm 2: 2, 4, 6.');
    expect(jumpMessage(5, 10, '')).toContain('Xong bảng nhân 5');
  });
});

describe('table options', () => {
  it('holds the product among four different positive numbers on every row', () => {
    const bad = [];
    for (const base of [2, 5]) {
      for (let n = 1; n <= 10; n++) {
        const { options, answer } = tableOptions(base, n);
        const values = options.map(Number);
        if (values[answer] !== base * n) bad.push(['answer', base, n]);
        if (new Set(values).size !== 4) bad.push(['size', base, n, options]);
        if (values.some((v) => v <= 0)) bad.push(['sign', base, n, options]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('table rounds', () => {
  const stories = [(/** @type {number} */ n) => ({ prompt: `${n} con`, unit: 'cái' })];

  it('asks each row once and stores the right product', () => {
    const bad = [];
    for (const base of [2, 5]) {
      for (let seed = 1; seed <= 20; seed++) {
        const round = buildRound(base, stories, seed);
        const rows = round.map((q) => q.visual?.n ?? 0);
        if (new Set(rows).size !== round.length) bad.push(['rows', base, seed]);
        for (const q of round) {
          const right = base * (q.visual?.n ?? 0);
          if (q.options[q.answer] !== String(right)) bad.push(['answer', base, seed, q.prompt]);
          if (!q.solution.includes(String(right))) bad.push(['solution', base, seed, q.prompt]);
          if (q.hint.includes(`= ${right}`)) bad.push(['hint', base, seed, q.hint]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same round from the same seed', () => {
    expect(buildRound(2, stories, 1)).toEqual(buildRound(2, stories, 1));
  });
});
