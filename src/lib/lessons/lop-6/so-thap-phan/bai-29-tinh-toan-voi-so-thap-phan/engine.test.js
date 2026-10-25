import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { align, call, columns, decText, makeProblem, multiply, placeName, plan } from './engine.js';

/** @param {number} n @param {number} k */
const d = (n, k) => ({ n, k });
/** @param {{ n: number, k: number }} x */
const val = (x) => x.n / 10 ** x.k;

describe('columns', () => {
  it('adds column by column with carries', () => {
    const c = columns('add', d(375, 2), d(12, 1));
    expect(c.R).toBe(495);
    expect(decText(c.result)).toBe('4,95');
    expect(c.cols.map((col) => col.digit)).toEqual([5, 9, 4]);
    const c2 = columns('add', d(1875, 3), d(925, 2));
    expect(decText(c2.result)).toBe('11,125');
    expect(c2.cols[1].why).toBe('hàng phần trăm: 7 + 5 = 12, viết 2, nhớ 1.');
    expect(c2.cols[2].carryIn).toBe(1);
    expect(c2.cols[2].why).toBe('hàng phần mười: 8 + 2 + 1 (nhớ) = 11, viết 1, nhớ 1.');
  });

  it('subtracts with borrowing the way it is taught', () => {
    const c = columns('sub', d(52, 1), d(49, 1));
    expect(decText(c.result)).toBe('0,3');
    expect(c.cols[0].why).toBe(
      'hàng phần mười: 2 không trừ được 9, lấy 12 − 9 = 3, viết 3, nhớ 1.',
    );
    expect(c.cols[1].why).toBe('hàng đơn vị: 4 thêm 1 (nhớ) là 5; 5 − 5 = 0, viết 0.');
  });

  it('does not ask for leading zeros before the units digit', () => {
    const c = columns('sub', d(125, 1), d(119, 1));
    expect(c.width).toBe(3);
    expect(c.cols.map((col) => col.required)).toEqual([true, true, false]);
  });

  it('shows only the written digits of each number', () => {
    const c = columns('add', d(35, 2), d(125, 1));
    expect(c.cols.filter((col) => col.shownA).map((col) => col.da)).toEqual([5, 3, 0]);
    expect(c.cols.filter((col) => col.shownB).map((col) => col.db)).toEqual([5, 2, 1]);
  });

  it('agrees with plain arithmetic', () => {
    const r = rng(7);
    for (let t = 0; t < 300; t++) {
      const a = d(Math.floor(r() * 99999), Math.floor(r() * 4));
      const b = d(Math.floor(r() * 99999), Math.floor(r() * 4));
      const { A, B, k } = align(a, b);
      const sum = columns('add', a, b);
      expect(sum.cols.reduce((s, col) => s + col.digit * 10 ** col.i, 0)).toBe(A + B);
      expect(sum.k).toBe(k);
      const [hi, lo] = A >= B ? [a, b] : [b, a];
      const diff = columns('sub', hi, lo);
      expect(diff.cols.reduce((s, col) => s + col.digit * 10 ** col.i, 0)).toBe(Math.abs(A - B));
    }
  });
});

describe('multiply', () => {
  it('counts the decimals of both factors', () => {
    const m = multiply(d(125, 2), d(34, 1));
    expect(m).toMatchObject({ P: 4250, k: 3, digits: '4250', commaAt: 1 });
    expect(decText(m.result)).toBe('4,25');
  });

  it('pads a short product with zeros', () => {
    const m = multiply(d(25, 2), d(4, 1));
    expect(m.digits).toBe('0100');
    expect(m.commaAt).toBe(1);
    expect(decText(m.result)).toBe('0,1');
  });
});

describe('plan', () => {
  it('adds two negative numbers through their opposites', () => {
    const p = plan('+', d(-375, 2), d(-12, 1));
    expect(p).toMatchObject({ sign: -1, work: 'add' });
    expect(decText(p.answer)).toBe('−4,95');
  });

  it('adds numbers of different signs', () => {
    const p = plan('+', d(-375, 2), d(12, 1));
    expect(p).toMatchObject({ sign: -1, work: 'sub' });
    expect(decText(p.p)).toBe('3,75');
    expect(decText(p.answer)).toBe('−2,55');
    const p2 = plan('+', d(5, 1), d(-2, 1));
    expect(decText(p2.answer)).toBe('0,3');
  });

  it('turns a subtraction into adding the opposite', () => {
    const p = plan('-', d(12, 1), d(-375, 2));
    expect(p.reasons[0]).toBe(
      'Đổi phép trừ thành phép cộng với số đối: 1,2 − (−3,75) = 1,2 + 3,75.',
    );
    expect(decText(p.answer)).toBe('4,95');
    expect(plan('-', d(52, 1), d(49, 1)).reasons).toEqual([]);
  });

  it('decides the sign of a product', () => {
    expect(decText(plan('×', d(-25, 1), d(-4, 1)).answer)).toBe('1');
    expect(decText(plan('×', d(-125, 2), d(34, 1)).answer)).toBe('−4,25');
  });

  it('matches plain arithmetic for generated problems', () => {
    const r = rng(11);
    for (const op of /** @type {const} */ (['+', '-', '×'])) {
      for (const signed of [false, true]) {
        for (let t = 0; t < 200; t++) {
          const { x, y } = makeProblem(r, op, signed);
          const p = plan(op, x, y);
          const expected =
            op === '+' ? val(x) + val(y) : op === '-' ? val(x) - val(y) : val(x) * val(y);
          expect(val(p.answer)).toBeCloseTo(expected, 9);
          if (!signed) expect(x.n > 0 && y.n > 0).toBe(true);
          else expect(x.n < 0 || y.n < 0).toBe(true);
          if (p.work !== 'mul') {
            const c = columns(p.work, p.p, p.q);
            expect(c.R).toBe(Math.abs(p.answer.n));
          }
        }
      }
    }
  });
});

describe('text', () => {
  it('names places and brackets negative operands', () => {
    expect(placeName(0, 2)).toBe('hàng phần trăm');
    expect(placeName(3, 2)).toBe('hàng chục');
    expect(call(d(-5, 1), '×', d(-2, 0))).toBe('−0,5 × (−2)');
  });
});
