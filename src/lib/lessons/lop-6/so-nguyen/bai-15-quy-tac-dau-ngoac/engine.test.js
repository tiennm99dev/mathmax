import { describe, it, expect } from 'vitest';
import {
  PRESETS,
  evaluate,
  oppositePairs,
  openTerms,
  stage,
  stageText,
  stageValue,
  stepCount,
  stepTarget,
} from './engine.js';

const M = '−';
const G = '\u202f';

describe('evaluate', () => {
  it('matches the book answers', () => {
    expect(PRESETS.map((p) => evaluate(p.groups))).toEqual([7, 44, 22, 35]);
  });
});

describe('stage', () => {
  it('opens a minus bracket one term at a time', () => {
    const g = PRESETS[0].groups;
    expect(stepCount(g)).toBe(2);
    expect(stageText(stage(g, 0))).toBe(`4 ${M} (12 ${M} 15)`);
    expect(stageText(stage(g, 1))).toBe(`4 ${M} 12 ${M} (${M}15)`);
    expect(stageText(stage(g, 2))).toBe(`4 ${M} 12 + 15`);
  });

  it('keeps signs when the bracket has a plus in front', () => {
    const g = [
      { sign: /** @type {1} */ (1), terms: [4], bracket: false },
      { sign: /** @type {1} */ (1), terms: [12, -15], bracket: true },
    ];
    expect(stageText(stage(g, 2))).toBe(`4 + 12 ${M} 15`);
    expect(stage(g, 2).some((t) => t.changed)).toBe(false);
  });

  it('writes a leading bracket without a plus sign', () => {
    const g = PRESETS[1].groups;
    expect(stageText(stage(g, 0))).toBe(`(72 ${M} 1${G}956) ${M} (${M}1${G}956 + 28)`);
    expect(stageText(stage(g, 4))).toBe(`72 ${M} 1${G}956 + 1${G}956 ${M} 28`);
  });

  it('marks only the term the last step changed', () => {
    const tokens = stage(PRESETS[0].groups, 2);
    expect(tokens.filter((t) => t.changed).map((t) => t.body)).toEqual(['15']);
  });

  it('keeps the value at every step of every preset', () => {
    for (const p of PRESETS) {
      const value = evaluate(p.groups);
      for (let k = 0; k <= stepCount(p.groups); k++) {
        expect(stageValue(stage(p.groups, k)), `${p.label} at ${k}`).toBe(value);
      }
    }
  });
});

describe('stepTarget', () => {
  it('walks the bracketed terms in order', () => {
    const g = PRESETS[1].groups;
    expect(stepTarget(g, 1)).toEqual({ group: 0, term: 0 });
    expect(stepTarget(g, 3)).toEqual({ group: 1, term: 0 });
    expect(stepTarget(g, 5)).toBeNull();
  });
});

describe('oppositePairs', () => {
  it('finds the opposite numbers that cancel', () => {
    const terms = openTerms(PRESETS[1].groups);
    expect(terms).toEqual([72, -1956, 1956, -28]);
    expect(oppositePairs(terms)).toEqual([[1, 2]]);
    expect(oppositePairs([5, -5, 5, -5, 3])).toEqual([
      [0, 1],
      [2, 3],
    ]);
    expect(oppositePairs([0, 0, 2])).toEqual([]);
  });
});
