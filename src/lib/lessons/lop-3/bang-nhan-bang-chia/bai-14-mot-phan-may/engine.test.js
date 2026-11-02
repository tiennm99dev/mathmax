import { describe, expect, it } from 'vitest';
import { KIND_LABELS, SHARES, buildRound, leftOver, pizzaMessage, shareMessage } from './engine.js';

describe('the pizza', () => {
  it('names the part only when one slice is coloured', () => {
    expect(pizzaMessage(4, 0)).toContain('chạm vào 1 phần');
    expect(pizzaMessage(4, 1)).toContain('1/4');
    expect(pizzaMessage(4, 1)).toContain('một phần tư');
    expect(pizzaMessage(4, 2)).not.toContain('1/4');
  });
});

describe('dealing things onto plates', () => {
  it('shares every set evenly', () => {
    const bad = SHARES.flatMap((s) => s.plates.filter((p) => s.total % p !== 0));
    expect(bad).toEqual([]);
  });

  it('tells what is left, then what one plate is', () => {
    const share = SHARES[0];
    expect(leftOver(12, 3, 2)).toBe(6);
    expect(shareMessage(share, 3, 0, false)).toContain('chia đều vào 3 đĩa');
    expect(shareMessage(share, 3, 2, false)).toContain('Còn 6 quả');
    expect(shareMessage(share, 3, 4, false)).toContain('Mỗi đĩa có 4 quả');
    expect(shareMessage(share, 3, 4, true)).toContain('12 : 3 = 4');
    expect(shareMessage(share, 3, 4, true)).toContain('1/3 số quả cam là 4 quả');
  });
});

describe('the round', () => {
  it('asks eight questions on known parts with no repeated option', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildRound(seed);
      if (round.length !== 8) bad.push(['length', seed]);
      for (const q of round) {
        if (!q.kind || !(q.kind in KIND_LABELS)) bad.push(['kind', seed]);
        const labels = q.options.map((o) => (typeof o === 'string' ? o : o.label));
        if (new Set(labels).size !== labels.length) bad.push(['repeat', q.prompt]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('starts the same way on the server and in the browser', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});
