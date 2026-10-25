import { describe, it, expect } from 'vitest';
import {
  PRESETS,
  allowedOps,
  applyOp,
  pieces,
  regions,
  solve,
  toText,
  tokenize,
  whyNot,
} from './engine.js';

/**
 * Index of the n-th operation token whose sign is `op`.
 * @param {import('./engine.js').Token[]} tokens
 * @param {string} op
 * @param {number} [n]
 */
function opIndex(tokens, op, n = 0) {
  const all = tokens.flatMap((t, i) => (t.kind === 'op' && t.op === op ? [i] : []));
  return all[n];
}

describe('tokenize and toText', () => {
  it('reads numbers, signs and brackets', () => {
    const t = tokenize('80 - (4 · 5^2 - 3 * 2^3)');
    expect(t).toHaveLength(15);
    expect(toText(t)).toBe('80 − (4 · 5² − 3 · 2³)');
  });

  it('rejects unknown characters', () => {
    expect(() => tokenize('2 + x')).toThrow(SyntaxError);
  });
});

describe('allowedOps', () => {
  it('works left to right when only + and − are present', () => {
    const t = tokenize('20 - 8 + 3');
    expect(allowedOps(t)).toEqual([1]);
    expect(whyNot(t, 3)).toContain('từ trái sang phải');
  });

  it('puts multiplication and division before addition', () => {
    const t = tokenize('5 + 4 · 3');
    expect(allowedOps(t)).toEqual([3]);
    expect(whyNot(t, 1)).toContain('Nhân và chia trước');
  });

  it('allows every power before any other operation', () => {
    const t = tokenize('5^2 - 3^2 · 2');
    expect(allowedOps(t)).toEqual([1, 5]);
    expect(whyNot(t, 3)).toContain('lũy thừa');
    expect(whyNot(t, 7)).toContain('lũy thừa');
  });

  it('works inside the innermost brackets first', () => {
    const t = tokenize('2 · {[(12 - 4)^2 : 8 + 2] · 5}');
    expect(regions(t)).toEqual([[5, 7]]);
    expect(allowedOps(t)).toEqual([6]);
    expect(whyNot(t, 1)).toContain('trong ngoặc trước');
    expect(whyNot(t, opIndex(t, ':'))).toContain('ngoặc trong cùng');
  });

  it('lets sibling brackets go in any order', () => {
    const t = tokenize('(2 + 3) · (7 - 4)');
    expect(allowedOps(t)).toEqual([2, 8]);
    expect(whyNot(t, 5)).toContain('trong ngoặc trước');
  });

  it('rejects a token that is not an operation', () => {
    expect(whyNot(tokenize('1 + 2'), 0)).toBe('Hãy chọn một dấu phép tính.');
  });
});

describe('applyOp', () => {
  it('drops a bracket left around a single number', () => {
    const t = tokenize('(8 - 3)^2');
    const r = applyOp(t, 2);
    expect(r.step).toBe('8 − 3 = 5');
    expect(toText(r.tokens)).toBe('5²');
  });

  it('drops nested brackets that close at once', () => {
    const r = applyOp(tokenize('[(2 + 3)]'), 3);
    expect(toText(r.tokens)).toBe('5');
  });

  it('refuses results outside ℕ', () => {
    expect(() => applyOp(tokenize('3 - 5'), 1)).toThrow(RangeError);
    expect(() => applyOp(tokenize('7 : 2'), 1)).toThrow(RangeError);
  });
});

describe('solve', () => {
  it('evaluates the presets', () => {
    expect(PRESETS.map((p) => solve(p).value)).toEqual([15, 24, 35, 4, 10, 100]);
  });

  it('writes the textbook chain of equal expressions', () => {
    expect(solve('80 - (4 · 5^2 - 3 · 2^3)').lines).toEqual([
      '80 − (4 · 5² − 3 · 2³)',
      '80 − (4 · 25 − 3 · 2³)',
      '80 − (4 · 25 − 3 · 8)',
      '80 − (100 − 3 · 8)',
      '80 − (100 − 24)',
      '80 − 76',
      '4',
    ]);
  });
});

describe('pieces', () => {
  it('turns a power into the base and a superscript piece', () => {
    expect(pieces(tokenize('2^3 + 1')).map((p) => p.kind)).toEqual(['num', 'pow', 'op', 'num']);
  });
});
