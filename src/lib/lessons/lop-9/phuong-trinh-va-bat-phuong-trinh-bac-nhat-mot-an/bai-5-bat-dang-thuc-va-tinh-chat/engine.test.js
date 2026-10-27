import { describe, it, expect } from 'vitest';
import {
  apply,
  expected,
  fits,
  flip,
  inequalityText,
  relation,
  ruleText,
  sideText,
  stepText,
  tilt,
} from './engine.js';

describe('number balance', () => {
  it('reads the sign between two numbers', () => {
    expect(relation(2, 5)).toBe('<');
    expect(relation(-1, -4)).toBe('>');
    expect(relation(3, 3)).toBe('=');
    expect(flip('<')).toBe('>');
    expect(flip('=')).toBe('=');
  });

  it('predicts exactly what the arithmetic gives', () => {
    for (let a = -6; a <= 6; a++) {
      for (let b = -6; b <= 6; b++) {
        for (let k = -5; k <= 5; k++) {
          for (const op of /** @type {const} */ (['cong', 'nhan'])) {
            const t = apply({ a, b }, op, k);
            expect(relation(t.a, t.b)).toBe(expected(relation(a, b), op, k));
          }
        }
      }
    }
  });

  it('tilts toward the larger side', () => {
    expect(tilt('>')).toBeLessThan(0);
    expect(tilt('<')).toBeGreaterThan(0);
    expect(tilt('=')).toBe(0);
  });

  it('keeps the numbers readable', () => {
    expect(fits({ a: 2000, b: 1 }, 'nhan', 5)).toBe(false);
    expect(fits({ a: 2000, b: 1 }, 'nhan', 4)).toBe(true);
  });

  it('describes each step in Vietnamese with the book minus sign', () => {
    expect(inequalityText({ a: -4, b: -10 })).toBe('−4 > −10');
    expect(sideText(5, 'cong', -3)).toBe('5 + (−3)');
    expect(sideText(-4, 'nhan', 2)).toBe('(−4) · 2');
    expect(stepText({ a: 2, b: 5 }, 'nhan', -2)).toBe(
      '2 < 5 → Nhân hai vế với −2: −4 > −10 (đổi chiều)',
    );
    expect(stepText({ a: 2, b: 5 }, 'cong', 3)).toBe(
      '2 < 5 → Cộng 3 vào hai vế: 5 < 8 (giữ chiều)',
    );
    expect(stepText({ a: 2, b: 5 }, 'nhan', 0)).toBe(
      '2 < 5 → Nhân hai vế với 0: 0 = 0 (thành đẳng thức)',
    );
    expect(ruleText('<', 'nhan', -1)).toContain('ngược chiều');
    expect(ruleText('<', 'nhan', 3)).toContain('cùng chiều');
  });
});
