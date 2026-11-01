import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { askName, judgeTap, makeCalc, nameOf, partText, partsNamed } from './engine.js';

describe('names of the parts', () => {
  it('follows the book', () => {
    expect(['a', 'b', 'c', 'expr'].map((p) => nameOf('+', /** @type {'a'} */ (p)))).toEqual([
      'Số hạng',
      'Số hạng',
      'Tổng',
      'Tổng',
    ]);
    expect(['a', 'b', 'c', 'expr'].map((p) => nameOf('-', /** @type {'a'} */ (p)))).toEqual([
      'Số bị trừ',
      'Số trừ',
      'Hiệu',
      'Hiệu',
    ]);
    expect(partsNamed('+', 'Số hạng')).toEqual(['a', 'b']);
    expect(partsNamed('-', 'Hiệu')).toEqual(['c', 'expr']);
  });

  it('makes calculations within 100 without carrying', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const op of /** @type {const} */ (['+', '-'])) {
        const c = makeCalc(rng(seed), op);
        const ok =
          op === '+'
            ? c.c === c.a + c.b && c.c < 100 && (c.a % 10) + (c.b % 10) < 10
            : c.c === c.a - c.b && c.c >= 0 && c.a % 10 >= c.b % 10;
        if (!ok) bad.push(c);
      }
    }
    expect(bad).toEqual([]);
  });

  it('asks a fresh name and judges taps', () => {
    expect(askName(rng(3), '+', 'Tổng')).toBe('Số hạng');
    const calc = { a: 47, b: 15, c: 32, op: /** @type {const} */ ('-') };
    expect(partText(calc, 'expr')).toBe('47 − 15');
    expect(judgeTap(calc, 'Số trừ', 'b')).toEqual({ ok: true, text: 'Đúng rồi! 15 là số trừ.' });
    expect(judgeTap(calc, 'Hiệu', 'c').text).toContain('47 − 15 cũng gọi là hiệu');
    const miss = judgeTap(calc, 'Số trừ', 'a');
    expect(miss.ok).toBe(false);
    expect(miss.text).toContain('47 là số bị trừ');
  });
});
