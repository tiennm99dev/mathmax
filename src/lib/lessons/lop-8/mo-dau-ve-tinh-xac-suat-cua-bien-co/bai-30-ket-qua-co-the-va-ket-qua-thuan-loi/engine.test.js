import { describe, it, expect } from 'vitest';
import { EXPERIMENTS, checkPicked, favourable, isPrime, pips } from './engine.js';

/** @param {string} id */
const exp = (id) => {
  const e = EXPERIMENTS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e;
};
/** @param {import('./engine.js').Experiment} e @param {string} id */
const ev = (e, id) => {
  const x = e.events.find((y) => y.id === id);
  if (!x) throw new Error(id);
  return x;
};
/** @param {import('./engine.js').Outcome[]} list */
const ids = (list) => list.map((o) => o.id);

describe('possible outcomes', () => {
  it('lists every outcome once', () => {
    expect(exp('xuc-xac').outcomes).toHaveLength(6);
    expect(exp('the-so').outcomes).toHaveLength(12);
    expect(exp('the-mau').outcomes).toHaveLength(8);
    for (const e of EXPERIMENTS) expect(new Set(ids(e.outcomes)).size).toBe(e.outcomes.length);
  });
});

describe('favourable outcomes', () => {
  it('matches the book example and hand counts', () => {
    const d = exp('xuc-xac');
    expect(ids(favourable(d, ev(d, 'nguyen-to')))).toEqual(['2', '3', '5']);
    expect(ids(favourable(d, ev(d, 'lon-hon-4')))).toEqual(['5', '6']);
    expect(favourable(d, ev(d, 'nho-hon-7'))).toHaveLength(6);
    const c = exp('the-so');
    expect(ids(favourable(c, ev(c, 'uoc-12')))).toEqual(['1', '2', '3', '4', '6', '12']);
    expect(ids(favourable(c, ev(c, 'nguyen-to')))).toEqual(['2', '3', '5', '7', '11']);
    expect(ids(favourable(c, ev(c, 'le-lon-5')))).toEqual(['7', '9', '11']);
    expect(favourable(c, ev(c, 'lon-hon-12'))).toHaveLength(0);
    const m = exp('the-mau');
    expect(ids(favourable(m, ev(m, 'so-2')))).toEqual(['V2', 'X2']);
    expect(ids(favourable(m, ev(m, 'vang-le')))).toEqual(['V1', 'V3', 'V5']);
    expect(ids(favourable(m, ev(m, 'lon-hon-3')))).toEqual(['V4', 'V5']);
  });

  it('checks a selection', () => {
    const d = exp('xuc-xac');
    const e = ev(d, 'chan');
    expect(checkPicked(d, e, ['2', '4', '6']).correct).toBe(true);
    const r = checkPicked(d, e, ['2', '3']);
    expect(r.correct).toBe(false);
    expect(ids(r.missing)).toEqual(['4', '6']);
    expect(ids(r.extra)).toEqual(['3']);
  });

  it('knows the primes and the die faces', () => {
    expect([1, 2, 9, 11, 12].map(isPrime)).toEqual([false, true, false, true, false]);
    for (let k = 1; k <= 6; k++) expect(pips(k)).toHaveLength(k);
  });
});
