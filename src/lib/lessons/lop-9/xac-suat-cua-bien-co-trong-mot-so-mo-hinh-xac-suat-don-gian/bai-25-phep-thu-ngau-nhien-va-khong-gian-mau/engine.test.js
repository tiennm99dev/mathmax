import { describe, it, expect } from 'vitest';
import {
  EXPERIMENTS,
  cellPossible,
  children,
  countText,
  omegaText,
  outcomeText,
  outcomes,
  paths,
  treeNodes,
} from './engine.js';

/** @param {string} id */
const exp = (id) => {
  const e = EXPERIMENTS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e;
};

describe('sample spaces', () => {
  it('lists two coin tosses the book way', () => {
    expect(omegaText(exp('hai-dong-xu'))).toBe('Ω = {SS; SN; NS; NN}');
  });

  it('has 12 outcomes for a die and a coin, written as pairs', () => {
    const e = exp('xuc-xac-dong-xu');
    expect(outcomes(e)).toHaveLength(12);
    expect(outcomeText(e, ['4', 'N'])).toBe('(4, N)');
    expect(countText(e)).toBe('6 · 2 = 12');
  });

  it('never repeats a card drawn without replacement', () => {
    const e = exp('rut-the');
    const all = outcomes(e);
    expect(all).toHaveLength(6);
    expect(all.every(([a, b]) => a !== b)).toBe(true);
    expect(children(e, ['2'])).toEqual(['1', '3']);
    expect(countText(e)).toBe('3 · 2 = 6');
    expect(cellPossible(e, '2', '2')).toBe(false);
  });

  it('allows a repeat when the card goes back', () => {
    const e = exp('rut-the-tra-lai');
    expect(outcomes(e)).toHaveLength(9);
    expect(cellPossible(e, '2', '2')).toBe(true);
  });

  it('has 8 outcomes for three children', () => {
    const e = exp('ba-con');
    expect(outcomes(e).map((p) => outcomeText(e, p))).toEqual([
      'TTT',
      'TTG',
      'TGT',
      'TGG',
      'GTT',
      'GTG',
      'GGT',
      'GGG',
    ]);
    expect(countText(e)).toBe('2 · 2 · 2 = 8');
  });

  it('has no outcome twice', () => {
    for (const e of EXPERIMENTS) {
      const texts = outcomes(e).map((p) => outcomeText(e, p));
      expect(new Set(texts).size).toBe(texts.length);
    }
  });
});

describe('tree layout', () => {
  it('puts each leaf on its own row and each branch point between its leaves', () => {
    for (const e of EXPERIMENTS) {
      const nodes = treeNodes(e);
      const depth = e.stages.length;
      const leaves = nodes.filter((n) => n.level === depth);
      expect(leaves.map((n) => n.y)).toEqual(leaves.map((_, i) => i));
      for (const n of nodes) {
        const kids = nodes.filter((c) => c.parent === n.key);
        if (kids.length === 0) continue;
        const ys = kids.map((c) => c.y);
        expect(n.y).toBeGreaterThanOrEqual(Math.min(...ys));
        expect(n.y).toBeLessThanOrEqual(Math.max(...ys));
      }
      expect(nodes.filter((n) => n.level === 1)).toHaveLength(e.stages[0].labels.length);
    }
  });

  it('builds partial outcomes level by level', () => {
    const e = exp('rut-the');
    expect(paths(e, 0)).toEqual([[]]);
    expect(paths(e, 1)).toEqual([['1'], ['2'], ['3']]);
  });
});
