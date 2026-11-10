import { describe, expect, it } from 'vitest';
import { makeScene, questionsOf, sortStep, tableCounts } from './engine.js';

/** @param {import('#lib/core/kid/quiz.js').KidQuestion} q */
const said = (q) => String(q.options[q.answer]);

describe('the sorting game', () => {
  it('makes heaps with three different counts that add up', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const { rows, items } = makeScene(seed);
      const counts = rows.map((r) => r.count);
      const total = counts.reduce((a, b) => a + b, 0);
      if (new Set(counts).size !== 3 || items.length !== total) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('fills the table one sorted thing at a time', () => {
    const scene = makeScene(3);
    expect(tableCounts(scene, 0)).toEqual([0, 0, 0]);
    expect(tableCounts(scene, scene.items.length)).toEqual(scene.rows.map((r) => r.count));
    const first = scene.items[0];
    expect(tableCounts(scene, 1)[first]).toBe(1);
  });

  it('accepts only the right group and says when the heap is done', () => {
    const scene = makeScene(5);
    const right = scene.items[0];
    expect(sortStep(scene, 0, right).ok).toBe(true);
    expect(sortStep(scene, 0, (right + 1) % 3).ok).toBe(false);
    const last = scene.items.length - 1;
    expect(sortStep(scene, last, scene.items[last]).message).toContain('phân loại xong');
  });

  it('stores the true answers to every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const scene = makeScene(seed);
      const qs = questionsOf(scene, seed);
      const counts = scene.rows.map((r) => r.count);
      const max = Math.max(...counts);
      const min = Math.min(...counts);
      const total = counts.reduce((a, b) => a + b, 0);
      const named = scene.rows.find((r) => qs[0].prompt.includes(r.noun + '?'));
      if (!named || said(qs[0]) !== String(named.count)) bad.push([seed, 'count']);
      if (said(qs[1]) !== scene.rows[counts.indexOf(max)].label) bad.push([seed, 'most']);
      if (said(qs[2]) !== scene.rows[counts.indexOf(min)].label) bad.push([seed, 'least']);
      if (said(qs[3]) !== String(max - min)) bad.push([seed, 'difference']);
      if (said(qs[4]) !== String(total)) bad.push([seed, 'total']);
      if (qs.some((q) => new Set(q.options.map(String)).size !== q.options.length)) {
        bad.push([seed, 'duplicate option']);
      }
    }
    expect(bad).toEqual([]);
  });
});
