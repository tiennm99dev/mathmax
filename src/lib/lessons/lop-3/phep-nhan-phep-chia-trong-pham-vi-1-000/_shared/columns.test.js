import { describe, expect, it } from 'vitest';
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { rng } from '#lib/core/drill.js';
import {
  carriesOf,
  checkText,
  divText,
  divWords,
  drawDivision,
  drawProduct,
  forgotCarry,
  isDivKind,
  mulColumns,
  mulWords,
  slipOptions,
} from './columns.js';

describe('multiplying in columns', () => {
  it('says a double carry the way the book does', () => {
    expect(mulWords(164, 3)).toBe(
      '3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 6 bằng 18, thêm 1 bằng 19, viết 9, nhớ 1. 3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4. Vậy 164 × 3 = 492.',
    );
  });

  it('carries across a zero digit', () => {
    expect(mulColumns(205, 4).map((c) => c.digit)).toEqual([0, 2, 8]);
    expect(mulColumns(205, 4)[1].say).toBe('4 nhân 0 bằng 0, thêm 2 bằng 2, viết 2');
  });

  it('counts the carries and knows the forgotten-carry slip', () => {
    expect(carriesOf(213, 3)).toBe(0);
    expect(carriesOf(127, 3)).toBe(1);
    expect(carriesOf(164, 3)).toBe(2);
    expect(forgotCarry(245, 2)).toBe(480);
  });

  it('writes digits that spell the product, for drawn tasks of every kind', () => {
    const rand = rng(3);
    const bad = [];
    for (const [kind, carries] of /** @type {const} */ ([
      ['plain', 0],
      ['one', 1],
      ['two', 2],
    ])) {
      for (let i = 0; i < 100; i++) {
        const { a, b } = drawProduct(rand, kind);
        const [o, t, h] = mulColumns(a, b).map((c) => c.digit);
        if (h * 100 + t * 10 + o !== a * b || a * b > 999) bad.push([a, b]);
        if (h > 9 || carriesOf(a, b) !== carries) bad.push([a, b]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('dividing in columns', () => {
  it('writes the sentence, the words and the check', () => {
    expect(divText(538, 4)).toBe('538 : 4 = 134 (dư 2)');
    expect(divWords(518, 5)).toContain('Hạ 1, được 1. 1 chia 5 được 0, viết 0');
    expect(divWords(354, 6).startsWith('35 chia 6 được 5')).toBe(true);
    expect(checkText(396, 3)).toBe('Thử lại: 132 × 3 = 396.');
    expect(checkText(538, 4)).toBe('Thử lại: 134 × 4 = 536, 536 + 2 = 538.');
  });

  it('tells the cases apart', () => {
    expect(isDivKind(396, 3, 'exact')).toBe(true);
    expect(isDivKind(538, 4, 'rest')).toBe(true);
    expect(isDivKind(518, 5, 'zero')).toBe(true);
    expect(isDivKind(354, 6, 'two')).toBe(true);
    expect(isDivKind(518, 5, 'rest')).toBe(false);
  });

  it('draws tasks whose rounds rebuild the quotient', () => {
    const rand = rng(5);
    const bad = [];
    for (const kind of /** @type {const} */ (['exact', 'rest', 'zero', 'two'])) {
      for (let i = 0; i < 80; i++) {
        const { n, d } = drawDivision(rand, kind);
        const { rounds } = numberDivide(n, d);
        const q = Number(rounds.map((r) => r.digit).join(''));
        if (q !== Math.floor(n / d) || rounds.at(-1)?.rest !== n % d) bad.push([n, d]);
        if (!isDivKind(n, d, kind)) bad.push([n, d]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('options from real slips', () => {
  it('holds the right answer once, among different whole numbers in order', () => {
    const { options, answer } = slipOptions(18, [9, 24, 12]);
    expect(options).toEqual(['9', '12', '18', '24']);
    expect(options[answer]).toBe('18');
    expect(slipOptions(4, [4, -1, 1.5]).options).toEqual(['4', '5', '6', '7']);
  });
});
