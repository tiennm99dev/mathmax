import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import {
  askFor,
  carriesOf,
  checkText,
  divText,
  divWords,
  drawDivision,
  drawMul,
  isDivKind,
  mulSteps,
  mulWords,
  noCarry,
  sheetAt,
  slipOptions,
  wrongFor,
} from './columns.js';

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, ' ');

describe('multiplying in columns', () => {
  it('reads 31 504 × 3 the book way', () => {
    expect(plain(mulWords(31504, 3))).toBe(
      '3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 0 bằng 0, thêm 1 bằng 1, viết 1. 3 nhân 5 bằng 15, viết 5, nhớ 1. 3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4. 3 nhân 3 bằng 9, viết 9. Vậy 31 504 × 3 = 94 512.',
    );
  });

  it('counts carries and the forgotten-carry slip', () => {
    expect(carriesOf(12132, 3)).toBe(0);
    expect(carriesOf(21314, 3)).toBe(1);
    expect(carriesOf(31504, 3)).toBe(2);
    expect(noCarry(31504, 3)).toBe(93502);
  });

  it('fills the sheet digit by digit with carries above', () => {
    const sheet = sheetAt(31504, 3, 1);
    expect(sheet.written.slice(0, 5)).toEqual(['2', '', '', '', '']);
    expect(sheet.carries[1]).toBe(1);
    expect(sheet.active).toBe(1);
    const end = sheetAt(31504, 3, 5);
    expect(end.written.slice(0, 5).reverse().join('')).toBe('94512');
    expect(end.active).toBe(null);
    expect(end.finished).toBe(5);
  });

  it('asks and nudges by column', () => {
    const steps = mulSteps(31504, 3);
    expect(askFor(steps[1])).toBe('Hàng chục: 3 nhân 0, rồi thêm 1 đã nhớ. Em viết chữ số nào?');
    expect(wrongFor(steps[1], 0, 1)).toBe('Em quên thêm 1 đã nhớ rồi.');
    expect(wrongFor(steps[0], 1, 1)).toContain('nhớ sang hàng chục');
    expect(wrongFor(steps[0], 7, 2)).toContain('viết 2, nhớ 1');
  });

  it('draws tasks of each kind with the product within 99 999', () => {
    const rand = rng(7);
    const bad = [];
    for (const [kind, lo, hi] of /** @type {const} */ ([
      ['plain', 0, 0],
      ['one', 1, 1],
      ['many', 2, 4],
    ])) {
      for (let i = 0; i < 60; i++) {
        const { a, b } = drawMul(rand, kind);
        const c = carriesOf(a, b);
        const digits = mulSteps(a, b).map((s) => s.digit);
        if (a < 10000 || a * b > 99999 || c < lo || c > hi) bad.push({ a, b });
        if (Number(digits.reverse().join('')) !== a * b) bad.push({ a, b });
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('dividing in columns', () => {
  it('reads the book divisions', () => {
    expect(plain(divText(21437, 3))).toBe('21 437 : 3 = 7 145 (dư 2)');
    expect(plain(divWords(16025, 5))).toBe(
      '16 chia 5 được 3, viết 3; 3 nhân 5 bằng 15; 16 trừ 15 bằng 1. Hạ 0, được 10. 10 chia 5 được 2, viết 2; 2 nhân 5 bằng 10; 10 trừ 10 bằng 0. Hạ 2. 2 chia 5 được 0, viết 0; 0 nhân 5 bằng 0; 2 trừ 0 bằng 2. Hạ 5, được 25. 25 chia 5 được 5, viết 5; 5 nhân 5 bằng 25; 25 trừ 25 bằng 0. Vậy 16 025 : 5 = 3 205.',
    );
    expect(plain(checkText(36095, 8))).toBe('Thử lại: 4 511 × 8 = 36 088, 36 088 + 7 = 36 095.');
  });

  it('draws divisions of each case', () => {
    const rand = rng(3);
    const bad = [];
    for (const kind of /** @type {const} */ (['exact', 'rest', 'zero'])) {
      for (let i = 0; i < 60; i++) {
        const { n, d } = drawDivision(rand, kind);
        if (n < 10000 || n > 99999 || d < 2 || d > 9 || !isDivKind(n, d, kind)) bad.push({ n, d });
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('answer options', () => {
  it('keeps four different whole numbers within 100 000', () => {
    const { options, answer } = slipOptions(99999, [99999, 100500, -3]);
    expect(options.length).toBe(4);
    expect(plain(options[answer])).toBe('99 999');
    expect(options.map(plain)).not.toContain('100 500');
  });
});
