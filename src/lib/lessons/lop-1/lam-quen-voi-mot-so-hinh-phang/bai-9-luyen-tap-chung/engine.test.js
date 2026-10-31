import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { SHAPES, SHAPE_NAMES } from '../_shared/shapes.js';
import {
  KINDS,
  STICK_SHAPES,
  buildRound,
  countAloud,
  makeQuestion,
  numberOptions,
  weakKinds,
} from './engine.js';

describe('mixed shape practice', () => {
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
        if (!right) {
          bad.push(`${seed} ${q.kind} no answer`);
          continue;
        }
        if (q.kind === 'name' && q.figure) {
          if (right.label.toLowerCase() !== SHAPE_NAMES[q.figure.kind]) {
            bad.push(`${seed} name`);
          }
        }
        if (q.kind === 'find') {
          const kinds = q.options.map((o) => o.figure?.kind);
          if (new Set(kinds).size !== 4 || !q.prompt.includes(right.label))
            bad.push(`${seed} find`);
        }
        if (q.kind === 'count' && q.scene) {
          const n = Number(right.label);
          const asked = SHAPES.find((k) => q.scene?.filter((f) => f.kind === k).length === n);
          if (!asked || q.scene.length < 6 || q.scene.length > 9) bad.push(`${seed} count`);
        }
        if (q.kind === 'sticks' && Number(right.label) !== q.sticks?.length)
          bad.push(`${seed} sticks`);
        const labels = q.options.map((o) => o.label);
        if (new Set(labels).size !== labels.length) bad.push(`${seed} ${q.kind} duplicate options`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('counts the sticks of each stick shape', () => {
    expect(STICK_SHAPES.map((s) => [s.id, s.sticks.length])).toEqual([
      ['tam-giac', 3],
      ['vuong', 4],
      ['chu-nhat', 6],
      ['ngoi-nha', 6],
      ['hai-vuong', 7],
    ]);
  });

  it('asks the scene question about the shape it counts', () => {
    const q = makeQuestion('count', rng(3));
    const n = Number(q.options[q.answer].label);
    const shape = SHAPES.find((k) => q.prompt.includes(SHAPE_NAMES[k]));
    expect(q.scene?.filter((f) => f.kind === shape)).toHaveLength(n);
  });

  it('offers increasing number options that include the answer', () => {
    const { options, answer } = numberOptions(rng(2), 2, 2);
    const values = options.map((o) => Number(o.label));
    expect(values[answer]).toBe(2);
    expect(values).toEqual([...values].sort((a, b) => a - b));
    expect(Math.min(...values)).toBeGreaterThanOrEqual(2);
  });

  it('counts aloud and lists missed kinds', () => {
    expect(countAloud(4)).toBe('một, hai, ba, bốn');
    const round = buildRound(1);
    const first = round[0];
    const firstTry = round.map((q) => q.kind !== first.kind);
    expect(weakKinds(round, firstTry)).toHaveLength(1);
    expect(
      weakKinds(
        round,
        round.map(() => true),
      ),
    ).toEqual([]);
  });

  it('draws every stick of a stick shape about the same length', () => {
    const uneven = STICK_SHAPES.filter((shape) => {
      const lengths = shape.sticks.map((s) => Math.hypot(s.x2 - s.x1, s.y2 - s.y1));
      return Math.max(...lengths) > Math.min(...lengths) * 1.05;
    }).map((shape) => shape.id);
    expect(uneven).toEqual([]);
  });
});
