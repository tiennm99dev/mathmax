import { describe, expect, it } from 'vitest';
import {
  DATASETS,
  ERRORS,
  baseSheet,
  evaluator,
  expectedValues,
  layout,
  matches,
  meets,
  modelFormulas,
  rangeAddrs,
  shiftFormula,
} from './engine.js';

const [picnic, marks] = DATASETS;

describe('ranges and criteria', () => {
  it('lists the cells of a range', () => {
    expect(rangeAddrs('A2', 'A4')).toEqual(['A2', 'A3', 'A4']);
    expect(rangeAddrs('E3', 'D2')).toEqual(['D2', 'E2', 'D3', 'E3']);
  });

  it('matches COUNTIF criteria the Excel way', () => {
    expect(meets('Tràng An', 'tràng an')).toBe(true);
    expect(meets(8, '>=8')).toBe(true);
    expect(meets(7, '>=8')).toBe(false);
    expect(meets(7, '<>8')).toBe(true);
    expect(meets(7, 7)).toBe(true);
    expect(meets(null, 7)).toBe(false);
  });
});

describe('the data sets', () => {
  it('give the frequencies of the book activity', () => {
    const e = expectedValues(picnic, picnic.data);
    expect([e.E2, e.E3, e.E4, e.E5]).toEqual([15, 10, 5, 30]);
    expect(e.F2).toBeCloseTo(0.5, 12);
  });

  it('have marks that add up to the class size', () => {
    const e = expectedValues(marks, marks.data);
    expect([e.E2, e.E3, e.E4, e.E5, e.E6, e.E7]).toEqual([3, 5, 8, 7, 5, 2]);
    expect(e.E8).toBe(30);
  });
});

describe('formulas', () => {
  it('compute the model table for both data sets', () => {
    const bad = [];
    for (const set of DATASETS) {
      const sheet = { ...baseSheet(set), ...modelFormulas(set) };
      const ev = evaluator(sheet);
      for (const [addr, want] of Object.entries(expectedValues(set, set.data)))
        if (!matches(ev.value(addr), want)) bad.push(`${set.id} ${addr}`);
    }
    expect(bad).toEqual([]);
  });

  it('accept text criteria, commas, COUNTA and arithmetic', () => {
    const sheet = {
      ...baseSheet(picnic),
      E2: '=COUNTIF(A2:A31,"Tràng An")',
      E3: '=countif($A$2:$A$31;D3)',
      E5: '=COUNTA(A2:A31)',
      F2: '=E2/E5*100',
      F3: '=(E3+E4)/30',
    };
    const ev = evaluator(sheet);
    expect(ev.value('E2')).toBe(15);
    expect(ev.value('E3')).toBe(10);
    expect(ev.value('E5')).toBe(30);
    expect(ev.value('F2')).toBe(50);
    expect(ev.value('F3')).toBeCloseTo(1 / 3, 12);
  });

  it('counts marks with a comparison', () => {
    const ev = evaluator({ ...baseSheet(marks), G1: '=COUNTIF($A$2:$A$31;">=8")' });
    expect(ev.value('G1')).toBe(14);
  });

  it('returns Excel errors', () => {
    const ev = evaluator({
      E2: '=E3/E4',
      E3: '=1',
      E4: '',
      E5: '=SUMM(E2)',
      E6: '=E7',
      E7: '=E6',
      E8: '=A1+1',
      A1: 'chữ',
    });
    expect(ev.value('E2')).toBe(ERRORS.div0);
    expect(ev.value('E5')).toBe(ERRORS.name);
    expect(ev.value('E6')).toBe(ERRORS.ref);
    expect(ev.value('E8')).toBe(ERRORS.value);
  });
});

describe('copying a formula down', () => {
  it('moves relative rows and keeps $ rows', () => {
    expect(shiftFormula('=COUNTIF($A$2:$A$31;D2)', 1)).toBe('=COUNTIF($A$2:$A$31;D3)');
    expect(shiftFormula('=COUNTIF(A2:A31;D2)', 2)).toBe('=COUNTIF(A4:A33;D4)');
    expect(shiftFormula('=E2/$E$5', 1)).toBe('=E3/$E$5');
    expect(shiftFormula('=COUNTIF(A$2:A$31;"Ba Vì")', 1)).toBe('=COUNTIF(A$2:A$31;"Ba Vì")');
    expect(shiftFormula('=E2', -2)).toBeNull();
  });

  it('miscounts when the data range is not fixed', () => {
    const { row } = layout(picnic);
    const sheet = baseSheet(picnic);
    sheet.E2 = '=COUNTIF(A2:A31;D2)';
    sheet.E3 = shiftFormula(sheet.E2, row(1) - row(0)) ?? '';
    const ev = evaluator(sheet);
    expect(ev.value('E2')).toBe(15);
    expect(ev.value('E3')).toBe(10);
    // With the first row changed, the copied range A3:A32 misses it.
    sheet.A2 = 'Ba Vì';
    const ev2 = evaluator(sheet);
    expect(ev2.value('E3')).toBe(10);
    expect(
      expectedValues(
        picnic,
        picnic.data.map((v, j) => (j === 0 ? 'Ba Vì' : v)),
      ).E3,
    ).toBe(11);
  });
});
