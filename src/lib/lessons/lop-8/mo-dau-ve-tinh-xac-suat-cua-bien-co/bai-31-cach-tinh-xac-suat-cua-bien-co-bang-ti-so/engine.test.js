import { describe, it, expect } from 'vitest';
import { gcd } from '#lib/numtheory-engine/index.js';
import { EVENTS, balls, ratio, ratioTex } from './engine.js';

/** @param {string} id */
const colours = (id) => {
  const e = EVENTS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e.colours;
};

describe('probability as a ratio', () => {
  it('counts each ball as one outcome', () => {
    expect(balls({ do: 2, xanh: 1, vang: 0 })).toEqual(['do', 'do', 'xanh']);
  });

  it('divides favourable by possible outcomes and simplifies', () => {
    expect(ratio({ do: 7, xanh: 3, vang: 10 }, colours('do'))).toEqual({
      k: 7,
      n: 20,
      p: 7,
      q: 20,
    });
    expect(ratio({ do: 4, xanh: 6, vang: 2 }, colours('khong-do'))).toEqual({
      k: 8,
      n: 12,
      p: 2,
      q: 3,
    });
    expect(ratio({ do: 3, xanh: 3, vang: 0 }, colours('vang'))?.k).toBe(0);
    expect(ratio({ do: 0, xanh: 0, vang: 0 }, colours('do'))).toBeNull();
  });

  it('writes the ratio in TeX', () => {
    expect(ratioTex({ k: 7, n: 20, p: 7, q: 20 })).toBe('P(E) = \\dfrac{7}{20}');
    expect(ratioTex({ k: 8, n: 12, p: 2, q: 3 })).toBe('P(E) = \\dfrac{8}{12} = \\dfrac{2}{3}');
    expect(ratioTex({ k: 0, n: 5, p: 0, q: 1 })).toBe('P(E) = \\dfrac{0}{5} = 0');
    expect(ratioTex({ k: 5, n: 5, p: 1, q: 1 })).toBe('P(E) = \\dfrac{5}{5} = 1');
    expect(gcd(12, 18)).toBe(6);
  });
});
