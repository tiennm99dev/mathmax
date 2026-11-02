import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  KIND_LABELS,
  buildRound,
  circlesInSquare,
  clockAngle,
  leafRow,
  paintedCube,
} from './engine.js';

/** @param {string} text */
const nums = (text) => (text.match(/\d+/g) ?? []).map(Number);

/**
 * @param {{ options: unknown[], answer: number }} q
 */
const chosen = (q) => Number(q.options[q.answer]);

describe('problems of the chapter', () => {
  it('compute the side of a square from four radii', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const q = circlesInSquare(rng(seed));
      if (chosen(q) !== 4 * nums(q.prompt)[0]) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('add the diameters of a row of pads, drawn to scale', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const q = leafRow(rng(seed));
      const [big, small] = nums(q.prompt);
      if (big !== 2 * small) bad.push(`scale ${q.prompt}`);
      if (chosen(q) !== 2 * big + 2 * small) bad.push(q.prompt);
      const circles = q.visual?.circles ?? [];
      if (circles.length !== 4) bad.push('four pads');
      for (let i = 1; i < circles.length; i++) {
        const gap = circles[i].c.x - circles[i - 1].c.x;
        if (gap !== circles[i].r + circles[i - 1].r) bad.push('pads do not touch');
      }
    }
    expect(bad).toEqual([]);
  });

  it('count four small faces on each big face', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const q = paintedCube(rng(seed));
      if (chosen(q) !== 4 * nums(q.prompt)[1]) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('find a right angle at 3 and 9 and no other whole hour offered', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      for (const yes of [true, false]) {
        const q = clockAngle(rng(seed), yes);
        const hour = nums(q.prompt)[0];
        if ((hour === 3 || hour === 9) !== yes) bad.push(`hour ${hour}`);
        if (hour === 6 || hour === 12) bad.push(`straight or shut hands at ${hour}`);
        if (q.options[q.answer] !== (yes ? 'Có' : 'Không')) bad.push('answer');
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('the round', () => {
  it('covers every part of the chapter with good options and pictures on a card', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const round = buildRound(seed);
      if (round.length !== 12) bad.push(`seed ${seed}: ${round.length}`);
      const kinds = new Set(round.map((q) => q.kind));
      for (const k of Object.keys(KIND_LABELS))
        if (!kinds.has(k)) bad.push(`seed ${seed}: no ${k}`);
      for (const q of round) {
        if (q.answer < 0 || q.answer >= q.options.length) bad.push(`${q.prompt}: answer`);
        if (new Set(q.options).size !== q.options.length) bad.push(`${q.prompt}: options`);
        const scene = q.visual;
        if (!scene) {
          bad.push(`${q.prompt}: no picture`);
          continue;
        }
        const spots = [
          ...(scene.dots ?? []).flatMap((d) => (d.nameAt ? [d.at, d.nameAt] : [d.at])),
          ...(scene.texts ?? []),
        ];
        for (const s of spots) {
          if (s.x < 10 || s.y < 10 || s.x > scene.w - 10 || s.y > scene.h - 10) {
            bad.push(`${q.prompt}: ${s.x}, ${s.y}`);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('repeats on a seed and changes with it', () => {
    expect(buildRound(3)).toEqual(buildRound(3));
    expect(buildRound(3)).not.toEqual(buildRound(4));
  });
});
