import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { KINDS, clockAngle, kindOf } from '../_shared/angle.js';
import {
  KIND_LABELS,
  buildRound,
  byMeasure,
  byPicture,
  clearMeasure,
  clockKind,
  equalAngles,
  joinedAngles,
} from './engine.js';

/** @param {string} text */
const degreesIn = (text) => [...text.matchAll(/(\d+)°/g)].map((m) => Number(m[1]));

describe('mixed practice', () => {
  it('names an angle from its written measure', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = byMeasure(rng(seed));
      const [m] = degreesIn(q.prompt);
      if (KINDS[q.answer] !== kindOf(m)) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('names an angle from its picture, with the measure kept back', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const rand = rng(seed);
      const m = clearMeasure(rand);
      const q = byPicture(rand, m);
      const fig = q.visual?.type === 'figure' ? q.visual.figure : null;
      if (KINDS[q.answer] !== kindOf(m) || !fig?.arcs[0].late || q.prompt.includes('°'))
        bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('names the angle of the clock hands', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = clockKind(rng(seed));
      const h = q.visual?.type === 'clock' ? q.visual.minutes / 60 : 0;
      if (KINDS[q.answer] !== kindOf(clockAngle(h))) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('finds the other angle of the same measure', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = equalAngles(rng(seed));
      const pairs = [...q.prompt.matchAll(/góc đỉnh (\w) bằng (\d+)°/g)].map((m) => ({
        v: m[1],
        m: Number(m[2]),
      }));
      const asked = q.prompt.match(/bằng góc đỉnh (\w)\?$/)?.[1];
      const given = pairs.find((p) => p.v === asked);
      const picked = optionText(q.options[q.answer]).slice(-1);
      const twin = pairs.find((p) => p.v === picked);
      if (pairs.length !== 4 || !given || !twin || twin.v === asked || twin.m !== given.m)
        bad.push(seed);
      if (q.options.length !== 3) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('adds two angles with a shared side', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = joinedAngles(rng(seed));
      const [a, b] = degreesIn(q.prompt);
      if (optionText(q.options[q.answer]) !== `${a + b}°` || a + b > 180) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('builds a round of eight questions of the listed kinds', () => {
    const bad = [];
    for (let seed = 1; seed <= 20; seed++) {
      const round = buildRound(seed);
      if (round.length !== 8 || !round.every((q) => (q.kind ?? '') in KIND_LABELS)) bad.push(seed);
      const pics = round.filter((q) => q.kind === 'theo-hinh').map((q) => degreesIn(q.solution)[0]);
      if (pics[0] === pics[1]) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });
});
