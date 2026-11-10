import { describe, expect, it } from 'vitest';
import { compareSign } from '#lib/core/kid/numbers.js';
import { PAIRS, checkSign, columns, scanSteps } from './engine.js';

describe('lining up two numbers', () => {
  it('leaves the missing places of the shorter number empty', () => {
    expect(columns(99999, 100000)).toEqual([
      { exp: 5, top: null, bottom: 1 },
      { exp: 4, top: 9, bottom: 0 },
      { exp: 3, top: 9, bottom: 0 },
      { exp: 2, top: 9, bottom: 0 },
      { exp: 1, top: 9, bottom: 0 },
      { exp: 0, top: 9, bottom: 0 },
    ]);
  });
});

describe('scanning the places', () => {
  it('stops at the first place that differs', () => {
    const steps = scanSteps(693251, 693500);
    expect(steps.map((s) => s.exp)).toEqual([null, 5, 4, 3, 2]);
    expect(steps.at(-1)?.text).toBe('Hàng trăm: 2 < 5. Chữ số này quyết định!');
  });

  it('settles different lengths by the count of digits', () => {
    const steps = scanSteps(125300000, 98999999);
    expect(steps).toHaveLength(1);
    expect(steps[0].differs).toBe(true);
    expect(steps[0].text).toContain('9 chữ số');
  });

  it('finds equal numbers equal', () => {
    expect(scanSteps(7000000, 7000000).at(-1)?.text).toBe(
      'Mọi hàng đều giống nhau: hai số bằng nhau.',
    );
  });
});

describe('picking the sign', () => {
  it('accepts only the right sign for every pair', () => {
    const bad = PAIRS.filter(([a, b]) => {
      const right = compareSign(a, b);
      const others = /** @type {const} */ (['>', '<', '=']).filter((s) => s !== right);
      return !checkSign(a, b, right).ok || others.some((s) => checkSign(a, b, s).ok);
    });
    expect(bad).toEqual([]);
    expect(checkSign(99999, 100000, '>').text).toContain('số chữ số');
    expect(checkSign(870354, 870345, '<').text).toContain('hàng đầu tiên');
  });
});
