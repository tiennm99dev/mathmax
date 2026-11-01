import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  CUPS,
  compareCapacity,
  holdsSentence,
  newVesselPair,
  newVesselTask,
  pourMessage,
  vessel,
} from './capacity.js';

describe('pouring into 1 l mugs', () => {
  it('guides the pouring and names the capacity', () => {
    expect(pourMessage('can', 5, 0)).toContain('Rót 1 l');
    expect(pourMessage('can', 5, 2)).toContain('đầy 2 ca');
    expect(pourMessage('can', 5, 5)).toContain('hết nước');
    expect(holdsSentence('xô', 8)).toBe('Xô chứa được 8 l nước, vì rót ra đầy 8 ca 1 l.');
    expect(compareCapacity({ name: 'can', l: 5 }, { name: 'xô', l: 7 })).toContain(
      'Xô chứa được nhiều nước hơn can.',
    );
  });

  it('draws containers that fit the mugs and pairs that differ', () => {
    const bad = [];
    const rand = rng(16);
    for (let i = 0; i < 200; i++) {
      const t = newVesselTask(rand);
      if (t.l < 2 || t.l > CUPS || t.l > vessel(t.id).hi) bad.push(['task', t]);
      const [a, b] = newVesselPair(rand);
      if (a.id === b.id || a.l === b.l || b.l > CUPS) bad.push(['pair', a, b]);
    }
    expect(bad).toEqual([]);
  });
});
