import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { heavierSide, newPair } from '../_shared/mass.js';
import { compareOptions, scaleLabel } from './engine.js';

describe('reading the pan balance', () => {
  it('picks the sentence that matches the lower pan', () => {
    const bad = [];
    const rand = rng(15);
    for (let i = 0; i < 100; i++) {
      const pair = newPair(rand);
      const { options, answer } = compareOptions(pair);
      const side = heavierSide(pair[0].kg, pair[1].kg);
      const want = side === 'left' ? 0 : side === 'right' ? 1 : 2;
      if (answer !== want || new Set(options).size !== 3) bad.push(pair);
    }
    expect(bad).toEqual([]);
    expect(
      compareOptions([
        { id: 'pomelo', kg: 1 },
        { id: 'sack', kg: 5 },
      ]),
    ).toEqual({
      options: [
        'Quả bưởi nặng hơn bao gạo.',
        'Bao gạo nặng hơn quả bưởi.',
        'Hai vật nặng bằng nhau.',
      ],
      answer: 1,
    });
  });

  it('describes the balance for a screen reader', () => {
    expect(
      scaleLabel(
        [{ kind: 'thing', id: 'melon', kg: 3 }],
        [
          { kind: 'weight', kg: 2 },
          { kind: 'weight', kg: 1 },
        ],
      ),
    ).toBe(
      'Cân đĩa. Đĩa bên trái: quả dưa hấu. Đĩa bên phải: quả cân 2 kg + 1 kg. Cân thăng bằng.',
    );
    expect(scaleLabel([{ kind: 'thing', id: 'melon', kg: 3 }], [])).toContain('không có gì');
  });
});
