import { describe, it, expect } from 'vitest';
import katex from 'katex';
import {
  CELLS,
  EVENTS,
  cellText,
  check,
  favourable,
  probability,
  probabilityTex,
} from './engine.js';

/** @param {string} id */
const ev = (id) => {
  const e = EVENTS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e;
};

describe('two dice', () => {
  it('has 36 distinct outcomes', () => {
    expect(CELLS).toHaveLength(36);
    expect(new Set(CELLS.map((c) => c.key)).size).toBe(36);
  });

  it('counts the favourable outcomes of each event by hand', () => {
    const counts = Object.fromEntries(EVENTS.map((e) => [e.id, favourable(e).length]));
    expect(counts).toEqual({
      'tong-7': 6,
      'bang-nhau': 6,
      'tong-10': 6,
      'co-6': 11,
      'hieu-2': 8,
      'tich-chan': 27,
      'tong-nt': 15,
      'xanh-lon-hon': 15,
    });
    expect(favourable(ev('tong-7'))).toEqual(['1-6', '2-5', '3-4', '4-3', '5-2', '6-1']);
  });

  it('finds missing and extra marks', () => {
    const marked = new Set(['1-6', '2-5', '3-3']);
    const r = check(marked, ev('tong-7'));
    expect(r.missing).toEqual(['3-4', '4-3', '5-2', '6-1']);
    expect(r.extra).toEqual(['3-3']);
    expect(r.right).toBe(false);
    expect(check(new Set(favourable(ev('bang-nhau'))), ev('bang-nhau')).right).toBe(true);
  });

  it('reduces the probability', () => {
    expect(probability(6)).toEqual({ k: 6, n: 36, p: 1, q: 6 });
    expect(probability(0)).toEqual({ k: 0, n: 36, p: 0, q: 1 });
    expect(probabilityTex(6)).toBe('P(E) = \\dfrac{6}{36} = \\dfrac{1}{6}');
    expect(probabilityTex(11)).toBe('P(E) = \\dfrac{11}{36}');
    expect(probabilityTex(36)).toBe('P(E) = \\dfrac{36}{36} = 1');
    expect(probabilityTex(0)).toBe('P(E) = \\dfrac{0}{36} = 0');
    for (let k = 0; k <= 36; k++) {
      expect(() =>
        katex.renderToString(probabilityTex(k), { strict: 'error', throwOnError: true }),
      ).not.toThrow();
    }
  });

  it('labels a cell by pair, sum or product', () => {
    expect(cellText('cap', 2, 5)).toBe('(2, 5)');
    expect(cellText('tong', 2, 5)).toBe('7');
    expect(cellText('tich', 2, 5)).toBe('10');
  });
});
