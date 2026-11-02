import { describe, expect, it } from 'vitest';
import { makeScene, questionsOf, strokes } from './engine.js';

describe('the tally game', () => {
  it('makes a heap whose counts differ and add up', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const { rows, items } = makeScene(seed);
      const counts = rows.map((r) => r.count);
      const total = counts.reduce((a, b) => a + b, 0);
      if (new Set(counts).size !== 3 || items.length !== total) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('adds one stroke per tapped thing to the row of that thing', () => {
    const scene = makeScene(1);
    const all = scene.items.map((_, i) => i);
    expect(strokes(scene, [])).toEqual([0, 0, 0]);
    expect(strokes(scene, all)).toEqual(scene.rows.map((r) => r.count));
  });

  it('asks questions whose stored answer is the true count or extreme', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const scene = makeScene(seed);
      const qs = questionsOf(scene, seed);
      const counts = scene.rows.map((r) => r.count);
      scene.rows.forEach((r, i) => {
        if (qs[i].options[qs[i].answer] !== String(r.count)) bad.push([seed, i]);
      });
      const top = scene.rows[counts.indexOf(Math.max(...counts))].label;
      const low = scene.rows[counts.indexOf(Math.min(...counts))].label;
      if (String(qs[3].options[qs[3].answer]).toLowerCase() !== top) bad.push([seed, 'most']);
      if (String(qs[4].options[qs[4].answer]).toLowerCase() !== low) bad.push([seed, 'least']);
    }
    expect(bad).toEqual([]);
  });
});
