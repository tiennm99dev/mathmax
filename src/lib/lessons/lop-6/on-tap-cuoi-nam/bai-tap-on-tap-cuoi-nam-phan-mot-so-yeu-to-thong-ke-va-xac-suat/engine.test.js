import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  EXPERIMENTS,
  chartQuestion,
  distinctOutcomes,
  experimental,
  runTrials,
  splitTotal,
  tallyOutcomes,
} from './engine.js';

const nums = (/** @type {string} */ s) => [...s.matchAll(/\d+/g)].map((m) => Number(m[0]));

describe('chartQuestion', () => {
  it('gives whole answers that match the chart', () => {
    const r = rng(11);
    for (let k = 0; k < 600; k++) {
      const q = chartQuestion(r);
      const values = q.data.map((d) => d.value);
      const total = values.reduce((a, b) => a + b, 0);
      expect(Number.isInteger(q.answer), q.prompt).toBe(true);
      expect([q.prompt, q.hint, ...q.steps].join(' ')).not.toMatch(/undefined|NaN/);
      expect(nums(q.steps.at(-1) ?? '')).toContain(q.answer);
      if (q.prompt.startsWith('Biểu đồ cho biết')) expect(q.answer).toBe(total);
      else if (q.prompt.startsWith('Cột nào')) expect(q.answer).toBe(Math.max(...values));
      else if (q.prompt.includes('phần trăm')) {
        const part = q.data.find((d) => q.prompt.includes(` ${d.label.toLowerCase()} `));
        expect(part, q.prompt).toBeDefined();
        expect(q.answer).toBe(((part?.value ?? 0) * 100) / total);
      } else {
        const named = q.data.filter((d) => q.prompt.includes(` ${d.label.toLowerCase()} `));
        expect(named, q.prompt).toHaveLength(2);
        const [a, b] = q.data.filter((d) => named.includes(d)).map((d) => d.value);
        expect(q.answer).toBe(Math.abs(a - b));
        expect(q.answer).toBeGreaterThan(0);
      }
    }
  });

  it('splits a total into parts with one largest part', () => {
    const r = rng(3);
    for (let k = 0; k < 200; k++) {
      const parts = splitTotal(r, 4, 50, 2);
      expect(parts.reduce((a, b) => a + b, 0)).toBe(50);
      const top = Math.max(...parts);
      expect(parts.filter((p) => p === top)).toHaveLength(1);
      expect(Math.min(...parts)).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('experiments', () => {
  it('tally every trial and reduce n(A)/n', () => {
    const r = rng(8);
    for (const e of EXPERIMENTS) {
      const results = runTrials(e, 60, r);
      const tally = tallyOutcomes(e, results);
      expect(tally.map((t) => t.outcome)).toEqual(distinctOutcomes(e));
      expect(tally.reduce((s, t) => s + t.count, 0)).toBe(60);
      const p = experimental(e, results);
      expect(p?.total).toBe(60);
      expect((p?.value.n ?? 0) * 60).toBe((p?.hits ?? 0) * (p?.value.d ?? 0));
    }
    expect(experimental(EXPERIMENTS[0], [])).toBeNull();
  });

  it('settles near the share of favourable outcomes over many trials', () => {
    const r = rng(21);
    const ball = /** @type {import('./engine.js').Experiment} */ (
      EXPERIMENTS.find((e) => e.id === 'hop-bong')
    );
    const p = experimental(ball, runTrials(ball, 20000, r));
    expect((p?.hits ?? 0) / 20000).toBeCloseTo(0.4, 1);
  });
});
