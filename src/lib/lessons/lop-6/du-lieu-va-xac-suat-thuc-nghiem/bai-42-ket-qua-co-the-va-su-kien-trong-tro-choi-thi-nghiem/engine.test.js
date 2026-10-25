import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { EXPERIMENTS, explain, favourable, grade, occurs, trial } from './engine.js';

const [coin, die, box] = EXPERIMENTS;

describe('possible outcomes and events', () => {
  it('lists the possible outcomes of each experiment', () => {
    expect(coin.outcomes).toHaveLength(2);
    expect(die.outcomes).toHaveLength(6);
    expect(box.outcomes).toHaveLength(4);
    for (const exp of EXPERIMENTS) expect(exp.values).toHaveLength(exp.outcomes.length);
  });

  it('finds the outcomes that make each die event happen', () => {
    expect(favourable(die, 0)).toEqual(['2 chấm', '4 chấm', '6 chấm']);
    expect(favourable(die, 1)).toEqual(['2 chấm', '3 chấm', '5 chấm']);
    expect(favourable(die, 2)).toEqual(['5 chấm', '6 chấm']);
    expect(favourable(die, 3)).toEqual(['3 chấm', '6 chấm']);
  });

  it('finds the outcomes of the coin and ball events', () => {
    expect(favourable(coin, 0)).toEqual(['Mặt ngửa (N)']);
    expect(favourable(box, 1)).toEqual(['Bóng đỏ', 'Bóng vàng', 'Bóng trắng']);
    expect(favourable(box, 2)).toEqual(['Bóng xanh', 'Bóng vàng']);
  });

  it('decides whether an event happens for the outcome obtained', () => {
    expect(occurs(die, 0, 3)).toBe(true); // 4 dots, even
    expect(occurs(die, 1, 3)).toBe(false); // 4 is not prime
    expect(explain(die, 1, 3)).toContain('không xảy ra');
    expect(explain(die, 2, 5)).toContain('xảy ra: kết quả 6 chấm');
    expect(explain(coin, 0, 1)).toContain(
      'kết quả mặt ngửa (N) nằm trong các kết quả mặt ngửa (N)',
    );
    expect(explain(box, 0, 0)).toContain('chỉ xảy ra với bóng đỏ, còn kết quả là bóng xanh');
  });

  it('grades the marks event by event', () => {
    // Die shows 5: even no, prime yes, > 4 yes, divisible by 3 no.
    expect(grade(die, 4, [false, true, false, null])).toEqual([true, true, false, null]);
  });

  it('draws every outcome over many trials', () => {
    const r = rng(7);
    const seen = new Set(Array.from({ length: 200 }, () => trial(die, r)));
    expect([...seen].sort()).toEqual([0, 1, 2, 3, 4, 5]);
    expect(trial(die, () => 0.999999)).toBe(5);
  });
});
