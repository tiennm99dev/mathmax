import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  balanceText,
  MASS_THINGS,
  compareSentence,
  fewestWeights,
  heavierSide,
  massThing,
  newPair,
  newWeighTask,
  panLayout,
  weighMessage,
  weightLabel,
  weightsText,
} from './mass.js';

describe('balanceText', () => {
  it('names both pans and the lower one', () => {
    expect(
      balanceText([{ kind: 'thing', name: 'Túi A', kg: 3 }], [{ kind: 'weight', kg: 2 }]),
    ).toBe('Cân đĩa. Đĩa bên trái: Túi A. Đĩa bên phải: quả cân 2 kg. Đĩa bên trái thấp hơn.');
    expect(balanceText([{ kind: 'thing', id: 'melon', kg: 3 }], [{ kind: 'weight', kg: 3 }])).toBe(
      'Cân đĩa. Đĩa bên trái: quả dưa hấu. Đĩa bên phải: quả cân 3 kg. Cân thăng bằng.',
    );
    expect(balanceText([], [{ kind: 'weight', kg: 1 }])).toBe(
      'Cân đĩa. Đĩa bên trái: trống. Đĩa bên phải: quả cân 1 kg. Đĩa bên phải thấp hơn.',
    );
  });

  it('gives a labelled box its own size on the pan', () => {
    const [box] = panLayout([{ kind: 'thing', name: 'Túi A', kg: 3 }], 104);
    expect([box.w, box.h]).toEqual([92, 34]);
  });
});

describe('gram weights', () => {
  it('are named and labelled in grams', () => {
    expect(weightLabel({ kg: 100, unit: 'g' })).toBe('100 g');
    expect(weightLabel({ kg: 2 })).toBe('2 kg');
    expect(
      balanceText(
        [{ kind: 'thing', name: 'Túi A', kg: 300 }],
        [
          { kind: 'weight', kg: 200, unit: 'g' },
          { kind: 'weight', kg: 100, unit: 'g' },
        ],
      ),
    ).toBe(
      'Cân đĩa. Đĩa bên trái: Túi A. Đĩa bên phải: quả cân 200 g, quả cân 100 g. Cân thăng bằng.',
    );
  });

  it('stack three labelled loads in three rows inside the pan', () => {
    const items = panLayout(
      [
        { kind: 'weight', kg: 500, unit: 'g' },
        { kind: 'weight', kg: 200, unit: 'g' },
        { kind: 'thing', name: 'Túi B', kg: 300 },
      ],
      104,
    );
    expect(items.every((it) => it.x >= -52 && it.x + it.w <= 52)).toBe(true);
    expect(new Set(items.map((it) => it.y)).size).toBe(3);
  });
});

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
    expect(weighMessage('bao gạo', 10, [1, 1, 1, 1, 1, 1])).toContain('thay bằng quả cân to hơn');
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
