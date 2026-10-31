import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  KINDS,
  columnSteps,
  equationText,
  freshProblem,
  isNoCarry,
  makeProblem,
} from './column.js';

describe('column calculation without carrying', () => {
  it('writes the equations the book way', () => {
    expect(equationText(41, 5, '+')).toBe('41 + 5 = 46');
    expect(equationText(76, 34, '-')).toBe('76 − 34 = 42');
  });

  it('tells no-carry problems apart', () => {
    expect(isNoCarry(41, 5, '+')).toBe(true);
    expect(isNoCarry(47, 5, '+')).toBe(false);
    expect(isNoCarry(60, 40, '+')).toBe(false);
    expect(isNoCarry(76, 5, '-')).toBe(true);
    expect(isNoCarry(72, 5, '-')).toBe(false);
    expect(isNoCarry(30, 40, '-')).toBe(false);
  });

  it('adds a one-digit number: ones first, then brings the tens down', () => {
    const [ones, tens] = columnSteps(41, 5, '+');
    expect(ones.text).toBe('1 cộng 5 bằng 6, viết 6.');
    expect(tens.text).toBe('Hạ 4, viết 4.');
    expect([tens.digit, ones.digit]).toEqual([4, 6]);
  });

  it('adds and subtracts two-digit numbers column by column', () => {
    expect(columnSteps(21, 14, '+').map((s) => s.text)).toEqual([
      '1 cộng 4 bằng 5, viết 5.',
      '2 cộng 1 bằng 3, viết 3.',
    ]);
    expect(columnSteps(76, 34, '-').map((s) => s.text)).toEqual([
      '6 trừ 4 bằng 2, viết 2.',
      '7 trừ 3 bằng 4, viết 4.',
    ]);
    expect(columnSteps(76, 5, '-')[1].text).toBe('Hạ 7, viết 7.');
    expect(columnSteps(2, 40, '+')[1].text).toBe('Hạ 4, viết 4.');
  });

  it('builds no-carry problems with two-digit results whose columns add up', () => {
    const rand = rng(11);
    const bad = [];
    for (let i = 0; i < 400; i++) {
      const kind = KINDS[i % KINDS.length];
      const { a, b, op } = makeProblem(rand, kind);
      const r = op === '+' ? a + b : a - b;
      const [ones, tens] = columnSteps(a, b, op);
      const twoDigitB = kind.endsWith('two');
      if (!isNoCarry(a, b, op) || r < 10 || r > 99 || a < 10) bad.push({ kind, a, b });
      if (twoDigitB !== b >= 10 || b === 0) bad.push({ kind, a, b });
      if (tens.digit * 10 + ones.digit !== r) bad.push({ kind, a, b });
      if (op !== (kind.startsWith('add') ? '+' : '-')) bad.push({ kind, a, b });
    }
    expect(bad).toEqual([]);
  });

  it('never gives the digit away in the question or the hint', () => {
    const rand = rng(5);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const { a, b, op } = makeProblem(rand, KINDS[i % KINDS.length]);
      for (const s of columnSteps(a, b, op)) {
        if (s.ask.includes(`bằng ${s.digit}`) || s.hint.includes(`bằng ${s.digit}`)) bad.push(s);
      }
    }
    expect(bad).toEqual([]);
  });

  it('picks a problem different from the previous one', () => {
    const rand = rng(2);
    const prev = { a: 41, b: 5 };
    const bad = [];
    for (let i = 0; i < 50; i++) {
      const p = freshProblem(rand, 'add-one', prev);
      if (p.a === prev.a && p.b === prev.b) bad.push(p);
    }
    expect(bad).toEqual([]);
  });
});
