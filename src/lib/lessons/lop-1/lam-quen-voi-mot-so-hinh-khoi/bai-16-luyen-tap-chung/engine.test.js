import { describe, expect, it } from 'vitest';
import { SCENES, fits } from '../_shared/positions.js';
import { OBJECTS, kindOf, solidTitle } from '../_shared/solids.js';
import { KINDS, WALLS, buildRound, numberOptions, weakKinds } from './engine.js';
import { rng } from '#lib/core/drill.js';

describe('mixed solids and positions practice', () => {
  it('asks every kind twice in a round of ten', () => {
    const round = buildRound(1);
    expect(round).toHaveLength(10);
    for (const k of KINDS) expect(round.filter((q) => q.kind === k)).toHaveLength(2);
  });

  it('builds the same round from the same seed', () => {
    expect(JSON.stringify(buildRound(5))).toBe(JSON.stringify(buildRound(5)));
  });

  it('stores answers that match what each question shows', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = q.options[q.answer];
        if (right === undefined) {
          bad.push(`${seed} ${q.kind} no answer`);
          continue;
        }
        if ((q.kind === 'khoi' || q.kind === 'do-vat') && q.boxes) {
          if (right !== solidTitle(kindOf(q.boxes[0].dims))) bad.push(`${seed} ${q.kind}`);
        }
        if (
          q.kind === 'do-vat' &&
          !OBJECTS.some((o) => q.prompt.startsWith(o.name[0].toUpperCase() + o.name.slice(1)))
        ) {
          bad.push(`${seed} object prompt`);
        }
        if (q.kind === 'dem' && Number(right) !== q.boxes?.length) bad.push(`${seed} dem`);
        if ((q.kind === 'phong' || q.kind === 'hang') && q.scene && q.place) {
          const scene = SCENES[q.scene];
          const trueOptions = q.options.filter((text) =>
            Object.entries(scene.phrases).some(
              ([id, words]) => text.endsWith(`${words}.`) && fits(scene, String(q.place), id),
            ),
          );
          if (trueOptions.length !== 1 || trueOptions[0] !== right) bad.push(`${seed} ${q.kind}`);
        }
        if (new Set(q.options).size !== q.options.length) bad.push(`${seed} ${q.kind} duplicates`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('counts walls of at most nine cubes', () => {
    for (const w of WALLS) {
      const n = w.reduce((s, h) => s + h, 0);
      expect(n).toBeGreaterThanOrEqual(2);
      expect(n).toBeLessThanOrEqual(9);
    }
  });

  it('offers number options around the answer', () => {
    const rand = rng(9);
    for (let n = 1; n <= 9; n++) {
      const { options, answer } = numberOptions(rand, n);
      expect(options[answer]).toBe(String(n));
      expect(options.every((o) => Number(o) >= 1)).toBe(true);
    }
  });

  it('suggests the kinds missed at the first try', () => {
    const round = buildRound(2);
    const firstTry = round.map((q) => q.kind !== 'dem');
    expect(weakKinds(round, firstTry)).toEqual(['Đếm khối']);
  });
});
