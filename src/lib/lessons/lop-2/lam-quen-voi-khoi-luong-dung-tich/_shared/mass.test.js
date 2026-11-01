import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  MASS_THINGS,
  compareSentence,
  fewestWeights,
  heavierSide,
  massThing,
  newPair,
  newWeighTask,
  panLayout,
  weighMessage,
  weightsText,
} from './mass.js';

describe('the pan balance', () => {
  it('lets the heavier pan go down', () => {
    expect(heavierSide(3, 2)).toBe('left');
    expect(heavierSide(1, 5)).toBe('right');
    expect(heavierSide(4, 4)).toBe('level');
  });

  it('makes every mass from 1 to 10 kg with the fewest weights', () => {
    const bad = [];
    for (let kg = 1; kg <= 10; kg++) {
      const w = fewestWeights(kg);
      if (w.reduce((s, x) => s + x, 0) !== kg) bad.push(kg);
    }
    expect(bad).toEqual([]);
    expect(fewestWeights(8)).toEqual([5, 2, 1]);
    expect(weightsText([5, 2, 1])).toBe('5 kg + 2 kg + 1 kg');
  });

  it('tells the child what to do next', () => {
    expect(weighMessage('quả dưa hấu', 3, [])).toContain('đặt lên đĩa');
    expect(weighMessage('quả dưa hấu', 3, [1])).toContain('thêm quả cân');
    expect(weighMessage('quả dưa hấu', 3, [5])).toContain('bỏ bớt');
    expect(weighMessage('quả dưa hấu', 3, [1, 2])).toBe(
      'Cân thăng bằng! Quả dưa hấu nặng 2 kg + 1 kg = 3 kg. Quả dưa hấu cân nặng 3 kg.',
    );
    expect(compareSentence({ name: 'quả bưởi', kg: 1 }, { name: 'bao gạo', kg: 5 })).toBe(
      'Đĩa có bao gạo thấp hơn: bao gạo nặng hơn quả bưởi, quả bưởi nhẹ hơn bao gạo.',
    );
    expect(compareSentence({ name: 'quả bưởi', kg: 2 }, { name: 'túi đường', kg: 2 })).toContain(
      'nặng bằng',
    );
  });

  it('draws tasks and pairs inside each thing range', () => {
    const bad = [];
    const rand = rng(5);
    /** @type {import('./mass.js').ThingId | undefined} */
    let prev;
    for (let i = 0; i < 200; i++) {
      const t = newWeighTask(rand, prev);
      const m = massThing(t.id);
      if (t.id === prev || t.kg < m.lo || t.kg > m.hi) bad.push(['task', t]);
      prev = t.id;
      const [a, b] = newPair(rand);
      if (a.id === b.id) bad.push(['pair', a, b]);
      for (const p of [a, b]) {
        const pm = massThing(p.id);
        if (p.kg < pm.lo || p.kg > pm.hi) bad.push(['range', p]);
      }
    }
    expect(bad).toEqual([]);
    expect(MASS_THINGS.length).toBeGreaterThan(4);
  });

  it('keeps the loads of a pan inside its width', () => {
    const loads = /** @type {import('./mass.js').Load[]} */ (
      [5, 2, 2, 1, 1, 1].map((kg) => ({ kind: 'weight', kg }))
    );
    const items = panLayout(loads, 104);
    expect(items).toHaveLength(6);
    expect(items.every((it) => it.x >= -52 && it.x + it.w <= 52)).toBe(true);
    expect(new Set(items.map((it) => it.y)).size).toBe(3);
  });
});
