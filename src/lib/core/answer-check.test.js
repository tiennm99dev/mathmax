import { describe, it, expect } from 'vitest';
import {
  checkAnswer,
  isSimplest,
  normalizeText,
  normalizeUnit,
  parseFraction,
  parseNumber,
} from './answer-check.js';

/** @typedef {import('./content-schema.js').Exercise} Exercise */

const base = { prompt: 'p', hints: ['h'], solution: 's' };

/**
 * @param {Exercise} ex
 * @param {unknown} response
 */
const reason = (ex, response) => checkAnswer(ex, response).reason;

describe('parseNumber', () => {
  it.each([
    ['3,5', 3.5],
    ['3.5', 3.5],
    ['42', 42],
    ['  7  ', 7],
    ['-2,25', -2.25],
    ['−2,25', -2.25],
    ['+4', 4],
    [',5', 0.5],
    ['.5', 0.5],
    ['1 000 000', 1000000],
    ['1 000', 1000],
    ['1.000.000', 1000000],
    ['1,000,000', 1000000],
    ['1.234,5', 1234.5],
    ['1,234.5', 1234.5],
    ['12 345,75', 12345.75],
    ['0', 0],
  ])('reads %j as %d', (input, value) => {
    expect(parseNumber(input)).toEqual({ value, unit: '' });
  });

  it.each([
    ['3,5 cm', 3.5, 'cm'],
    ['3,5cm', 3.5, 'cm'],
    ['12 m²', 12, 'm²'],
    ['50%', 50, '%'],
    ['20 000 đồng', 20000, 'đồng'],
    ['90°', 90, '°'],
  ])('splits %j into a value and a unit', (input, value, unit) => {
    expect(parseNumber(input)).toEqual({ value, unit });
  });

  it.each(['', 'abc', '3,5,', '1,2.3,4', '1.23.4', '12 34', '5 2', '3..5', '-', '1,2,3.4.5'])(
    'rejects %j',
    (input) => {
      expect(parseNumber(input)).toBeNull();
    },
  );
});

describe('normalizeUnit', () => {
  it('ignores case, spaces, carets and superscripts', () => {
    expect(normalizeUnit('cm²')).toBe('cm2');
    expect(normalizeUnit('CM^2')).toBe('cm2');
    expect(normalizeUnit('m ³')).toBe('m3');
    expect(normalizeUnit('km/h')).toBe('km/h');
  });
});

describe('parseFraction', () => {
  it.each([
    ['3/4', [3, 4]],
    [' 6 / 8 ', [6, 8]],
    ['-1/2', [-1, 2]],
    ['1/-2', [1, -2]],
    ['−5/3', [-5, 3]],
    ['5', [5, 1]],
    ['1 1/2', [3, 2]],
    ['-2 3/4', [-11, 4]],
  ])('reads %j', (input, f) => {
    expect(parseFraction(input)).toEqual(f);
  });

  it.each(['', '3/0', '3/', '/4', 'a/b', '1.5/2', '1 3/2', '1 1/0', '3//4'])(
    'rejects %j',
    (input) => {
      expect(parseFraction(input)).toBeNull();
    },
  );

  it('knows lowest terms', () => {
    expect(isSimplest([3, 4])).toBe(true);
    expect(isSimplest([-3, 4])).toBe(true);
    expect(isSimplest([6, 8])).toBe(false);
    expect(isSimplest([3, -4])).toBe(false);
    expect(isSimplest([5, 1])).toBe(true);
    expect(isSimplest([0, 1])).toBe(true);
    expect(isSimplest([0, 5])).toBe(false);
  });
});

describe('normalizeText', () => {
  it('folds case, diacritics, đ, spaces and trailing punctuation', () => {
    expect(normalizeText('  Hình   Vuông. ')).toBe('hinh vuong');
    expect(normalizeText('ĐƯỜNG TRÒN')).toBe('duong tron');
    expect(normalizeText('tam giác đều!')).toBe('tam giac deu');
    expect(normalizeText('Số nguyên tố?')).toBe('so nguyen to');
  });

  it('treats precomposed and combining forms alike', () => {
    expect(normalizeText('Trền')).toBe(normalizeText('Trền'));
  });
});

describe('checkAnswer: number', () => {
  /** @type {Exercise} */
  const ex = { ...base, type: 'number', answer: 3.5 };
  /** @type {Exercise} */
  const withUnit = { ...base, type: 'number', answer: 12, unit: 'cm²' };
  /** @type {Exercise} */
  const approx = { ...base, type: 'number', answer: 3.1416, tolerance: 0.01 };

  it('accepts comma and dot decimals', () => {
    expect(checkAnswer(ex, '3,5')).toEqual({ correct: true, reason: 'correct' });
    expect(reason(ex, '3.5')).toBe('correct');
    expect(reason(ex, '3,50')).toBe('correct');
    expect(reason(ex, 3.5)).toBe('correct');
  });

  it('rejects a wrong value', () => {
    expect(checkAnswer(ex, '3,6')).toEqual({ correct: false, reason: 'wrong' });
  });

  it('reports empty and unreadable input', () => {
    expect(reason(ex, '')).toBe('empty');
    expect(reason(ex, '   ')).toBe('empty');
    expect(reason(ex, undefined)).toBe('empty');
    expect(reason(ex, 'ba phẩy năm')).toBe('invalid');
    expect(reason(ex, ['3.5'])).toBe('invalid');
  });

  it('rejects a unit when the exercise has none', () => {
    expect(reason(ex, '3,5 cm')).toBe('invalid');
  });

  it('accepts the unit written or left out', () => {
    expect(reason(withUnit, '12')).toBe('correct');
    expect(reason(withUnit, '12 cm²')).toBe('correct');
    expect(reason(withUnit, '12cm2')).toBe('correct');
    expect(reason(withUnit, '12 CM^2')).toBe('correct');
  });

  it('flags a right value in the wrong unit', () => {
    expect(reason(withUnit, '12 m²')).toBe('unit');
    expect(reason(withUnit, '13 m²')).toBe('wrong');
    expect(reason(withUnit, '13 cm²')).toBe('wrong');
  });

  it('honours tolerance', () => {
    expect(reason(approx, '3,14')).toBe('correct');
    expect(reason(approx, '3,15')).toBe('correct');
    expect(reason(approx, '3,2')).toBe('wrong');
  });

  it('absorbs float noise without a tolerance', () => {
    /** @type {Exercise} */
    const sum = { ...base, type: 'number', answer: 0.1 + 0.2 };
    expect(reason(sum, '0,3')).toBe('correct');
  });

  it('handles negatives and large grouped numbers', () => {
    /** @type {Exercise} */
    const neg = { ...base, type: 'number', answer: -12 };
    /** @type {Exercise} */
    const big = { ...base, type: 'number', answer: 1500000, unit: 'đồng' };
    expect(reason(neg, '-12')).toBe('correct');
    expect(reason(neg, '−12')).toBe('correct');
    expect(reason(neg, '12')).toBe('wrong');
    expect(reason(big, '1 500 000 đồng')).toBe('correct');
    expect(reason(big, '1.500.000')).toBe('correct');
  });
});

describe('checkAnswer: fraction', () => {
  /** @type {Exercise} */
  const ex = { ...base, type: 'fraction', answer: [3, 4] };
  /** @type {Exercise} */
  const simplest = { ...base, type: 'fraction', answer: [3, 4], simplest: true };

  it('accepts any equal fraction by default', () => {
    expect(reason(ex, '3/4')).toBe('correct');
    expect(reason(ex, '6/8')).toBe('correct');
    expect(reason(ex, '-3/-4')).toBe('correct');
  });

  it('rejects an unequal fraction', () => {
    expect(reason(ex, '4/3')).toBe('wrong');
    expect(reason(ex, '-3/4')).toBe('wrong');
  });

  it('asks for lowest terms when required', () => {
    expect(reason(simplest, '3/4')).toBe('correct');
    expect(checkAnswer(simplest, '6/8')).toEqual({ correct: false, reason: 'not-simplest' });
    expect(reason(simplest, '-3/-4')).toBe('not-simplest');
    expect(reason(simplest, '5/4')).toBe('wrong');
  });

  it('accepts whole and mixed numbers by value', () => {
    /** @type {Exercise} */
    const two = { ...base, type: 'fraction', answer: [4, 2] };
    /** @type {Exercise} */
    const threeHalves = { ...base, type: 'fraction', answer: [3, 2], simplest: true };
    expect(reason(two, '2')).toBe('correct');
    expect(reason(threeHalves, '1 1/2')).toBe('correct');
  });

  it('reports empty and unreadable input', () => {
    expect(reason(ex, '')).toBe('empty');
    expect(reason(ex, '3/0')).toBe('invalid');
    expect(reason(ex, '0,75')).toBe('invalid');
    expect(reason(ex, 0.75)).toBe('invalid');
  });
});

describe('checkAnswer: choice', () => {
  /** @type {Exercise} */
  const ex = { ...base, type: 'choice', options: ['a', 'b', 'c'], answer: 1 };

  it('checks the picked index', () => {
    expect(reason(ex, 1)).toBe('correct');
    expect(reason(ex, 0)).toBe('wrong');
    expect(reason(ex, 2)).toBe('wrong');
  });

  it('reports no pick and junk', () => {
    expect(reason(ex, undefined)).toBe('empty');
    expect(reason(ex, null)).toBe('empty');
    expect(reason(ex, '1')).toBe('invalid');
    expect(reason(ex, 1.5)).toBe('invalid');
  });
});

describe('checkAnswer: multi', () => {
  /** @type {Exercise} */
  const ex = { ...base, type: 'multi', options: ['a', 'b', 'c', 'd'], answers: [0, 2] };

  it('compares as a set', () => {
    expect(reason(ex, [0, 2])).toBe('correct');
    expect(reason(ex, [2, 0])).toBe('correct');
    expect(reason(ex, [2, 0, 2])).toBe('correct');
  });

  it('rejects missing or extra picks', () => {
    expect(reason(ex, [0])).toBe('wrong');
    expect(reason(ex, [0, 2, 3])).toBe('wrong');
    expect(reason(ex, [1, 3])).toBe('wrong');
  });

  it('reports no pick and junk', () => {
    expect(reason(ex, [])).toBe('empty');
    expect(reason(ex, undefined)).toBe('empty');
    expect(reason(ex, ['0'])).toBe('invalid');
    expect(reason(ex, 0)).toBe('invalid');
  });
});

describe('checkAnswer: text', () => {
  /** @type {Exercise} */
  const ex = { ...base, type: 'text', accept: ['Hình vuông', 'hình vuông đều'] };

  it('ignores case, diacritics, spaces and trailing punctuation', () => {
    expect(reason(ex, 'Hình vuông')).toBe('correct');
    expect(reason(ex, '  hinh   vuong ')).toBe('correct');
    expect(reason(ex, 'HÌNH VUÔNG.')).toBe('correct');
    expect(reason(ex, 'hinh vuong deu')).toBe('correct');
  });

  it('rejects other words', () => {
    expect(reason(ex, 'hình chữ nhật')).toBe('wrong');
    expect(reason(ex, 'vuông')).toBe('wrong');
  });

  it('reports empty and junk', () => {
    expect(reason(ex, '')).toBe('empty');
    expect(reason(ex, 4)).toBe('invalid');
  });
});

describe('checkAnswer: order', () => {
  /** @type {Exercise} */
  const ex = { ...base, type: 'order', items: ['3', '1', '2'], answer: [1, 2, 0] };

  it('needs the exact sequence', () => {
    expect(reason(ex, [1, 2, 0])).toBe('correct');
    expect(reason(ex, [0, 1, 2])).toBe('wrong');
    expect(reason(ex, [2, 1, 0])).toBe('wrong');
  });

  it('reports partial and junk input', () => {
    expect(reason(ex, [1, 2])).toBe('incomplete');
    expect(reason(ex, undefined)).toBe('empty');
    expect(reason(ex, 'abc')).toBe('invalid');
  });
});

describe('checkAnswer: match', () => {
  /** @type {Exercise} */
  const ex = {
    ...base,
    type: 'match',
    left: ['2 + 2', '3 + 3', '1 + 1'],
    right: ['6', '2', '4', '8'],
    pairs: [
      [0, 2],
      [1, 0],
      [2, 1],
    ],
  };

  it('accepts the pairs in any order', () => {
    expect(
      reason(ex, [
        [2, 1],
        [0, 2],
        [1, 0],
      ]),
    ).toBe('correct');
  });

  it('rejects a wrong pair or a distractor', () => {
    expect(
      reason(ex, [
        [0, 2],
        [1, 1],
        [2, 0],
      ]),
    ).toBe('wrong');
    expect(
      reason(ex, [
        [0, 3],
        [1, 0],
        [2, 1],
      ]),
    ).toBe('wrong');
  });

  it('reports unmatched left items', () => {
    expect(
      reason(ex, [
        [0, 2],
        [1, 0],
      ]),
    ).toBe('incomplete');
    expect(reason(ex, [])).toBe('empty');
  });

  it('keeps the last pick for a repeated left item', () => {
    expect(
      reason(ex, [
        [0, 3],
        [0, 2],
        [1, 0],
        [2, 1],
      ]),
    ).toBe('correct');
  });

  it('rejects malformed pairs', () => {
    expect(reason(ex, [[0]])).toBe('invalid');
    expect(reason(ex, [['0', '2']])).toBe('invalid');
    expect(reason(ex, 'pairs')).toBe('invalid');
  });
});

describe('checkAnswer: count', () => {
  /** @type {Exercise} */
  const ex = { ...base, type: 'count', picture: 'apple', answer: 7 };

  it('checks the tapped number card', () => {
    expect(reason(ex, 7)).toBe('correct');
    expect(reason(ex, 6)).toBe('wrong');
    expect(reason(ex, 0)).toBe('wrong');
  });

  it('reports no tap and junk', () => {
    expect(reason(ex, null)).toBe('empty');
    expect(reason(ex, '7')).toBe('invalid');
  });
});
