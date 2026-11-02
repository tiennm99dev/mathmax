import { describe, expect, it } from 'vitest';
import { resultOf } from '#lib/core/kid/column.js';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { readNatural } from '#lib/core/number-format.js';
import { carryCount } from '../_shared/columns.js';
import {
  BOOK_CALCS,
  SKILLS,
  boardWidth,
  calcAt,
  drawCalc,
  drawMental,
  workerView,
} from './engine.js';

const SEEDS = Array.from({ length: 200 }, (_, i) => i + 1);

/** @param {string} id */
const skill = (id) => /** @type {(typeof SKILLS)[number]} */ (SKILLS.find((s) => s.id === id));

/**
 * The value of "a + b" or "a − b".
 * @param {string} text
 */
function evaluate(text) {
  const [a, sign, b] = text.trim().split(' ');
  const [x, y] = [Number(a.replace(/\D/g, '')), Number(b.replace(/\D/g, ''))];
  return sign === '+' ? x + y : x - y;
}

describe('the column worker', () => {
  it('opens with calculations that have one carry', () => {
    expect(BOOK_CALCS.every((c) => carryCount(c.a, c.b, c.op) === 1)).toBe(true);
    expect(calcAt(0, rng(1))).toEqual(BOOK_CALCS[0]);
  });

  it('writes one digit at a time and shows the carried 1', () => {
    const calc = { a: 146, b: 29, op: /** @type {const} */ ('+') };
    expect(workerView(calc, 0)).toMatchObject({
      written: [null, null, null],
      carried: null,
      active: 0,
    });
    expect(workerView(calc, 1)).toMatchObject({ written: [5, null, null], carried: 1, active: 1 });
    expect(workerView(calc, 2)).toMatchObject({ written: [5, 7, null], carried: null, active: 2 });
    expect(workerView(calc, 3)).toMatchObject({ written: [5, 7, 1], active: null, step: null });
  });

  it('skips a leading zero of a difference', () => {
    const view = workerView({ a: 216, b: 132, op: '-' }, 2);
    expect(view.written).toEqual([4, 8, null]);
    expect(view.step).toBeNull();
    expect(boardWidth({ a: 216, b: 132, op: '-' })).toBe(3);
  });

  it('adds a column for a sum that passes 100', () => {
    const calc = { a: 85, b: 41, op: /** @type {const} */ ('+') };
    expect(boardWidth(calc)).toBe(3);
    expect(workerView(calc, 3).written).toEqual([6, 2, 1]);
  });

  it('finishes every drawn calculation on its result', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const calc = drawCalc(rng(seed));
      const r = resultOf(calc.a, calc.b, calc.op);
      if (r < 10 || r > 999 || carryCount(calc.a, calc.b, calc.op) > 1) bad.push(calc);
      const { written } = workerView(calc, 3);
      const value = written.map((d, i) => (d ?? 0) * 10 ** i).reduce((s, v) => s + v, 0);
      if (value !== r) bad.push(calc);
    }
    expect(bad).toEqual([]);
  });
});

describe('review questions', () => {
  it('always has the right answer among distinct options', () => {
    const bad = [];
    for (const s of SKILLS) {
      for (const seed of SEEDS) {
        const q = s.make(rng(seed));
        const texts = q.options.map(optionText);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([s.id, seed, 'answer']);
        if (new Set(texts).size !== texts.length) bad.push([s.id, seed, texts]);
        if (texts.length < 2) bad.push([s.id, seed, 'few']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('draws mental sums of whole tens and hundreds up to 1 000', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const { a, b, op } = drawMental(rng(seed));
      const r = resultOf(a, b, op);
      if (a % 10 !== 0 || b % 10 !== 0 || r <= 0 || r > 1000) bad.push([a, b, op]);
      const q = skill('tinh-nham').make(rng(seed));
      const right = readNatural(optionText(q.options[q.answer]));
      if (right !== evaluate(q.prompt.replace(' = ?', ''))) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('computes column results and names', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const id of ['dat-tinh-cong', 'dat-tinh-tru']) {
        const q = skill(id).make(rng(seed));
        const v = q.visual;
        if (!v || Number(q.options[q.answer]) !== resultOf(v.a, v.b, v.op)) bad.push(q.prompt);
      }
      const n = skill('tong-hieu').make(rng(seed));
      const [a, b] = (n.prompt.match(/\d+/g) ?? []).map(Number);
      const want = n.prompt.includes('Tổng') ? a + b : a - b;
      if (Number(n.options[n.answer]) !== want) bad.push(n.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('picks the calculation with the largest or smallest result', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('lon-nhat').make(rng(seed));
      const values = q.options.map((o) => evaluate(optionText(o)));
      const want = q.prompt.includes('lớn nhất') ? Math.max(...values) : Math.min(...values);
      if (values[q.answer] !== want) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('solves word problems with the sign the story asks for', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('bai-toan').make(rng(seed));
      const [a, b] = (q.prompt.match(/\d+/g) ?? []).map(Number);
      const more = q.prompt.includes('nhiều hơn');
      if (parseInt(optionText(q.options[q.answer]), 10) !== (more ? a + b : a - b))
        bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
