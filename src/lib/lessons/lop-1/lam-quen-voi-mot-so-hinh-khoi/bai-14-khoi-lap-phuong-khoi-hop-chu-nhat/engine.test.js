import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { isCube } from '../_shared/solids.js';
import {
  BOXES,
  CUBE,
  answerOf,
  buildRound,
  compareMessage,
  guessMessage,
  plainSolid,
} from './engine.js';

describe('cube and box games', () => {
  it('compares a real cube with boxes that are not cubes', () => {
    expect(isCube(CUBE.dims)).toBe(true);
    expect(BOXES.filter((b) => isCube(b.box.dims))).toEqual([]);
    expect(compareMessage('dai')).toContain('2 mặt là hình vuông');
    expect(compareMessage('det')).not.toContain('2 mặt là hình vuông');
  });

  it('builds rounds of three cubes and three boxes with the right answers', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildRound(seed);
      if (round.length !== 6) bad.push(`${seed} length`);
      if (round.filter((q) => q.kind === 'lap-phuong').length !== 3) bad.push(`${seed} mix`);
      for (const q of round) if (answerOf(q) !== q.kind) bad.push(`${seed} ${q.name}`);
    }
    expect(bad).toEqual([]);
  });

  it('builds the same round from the same seed', () => {
    expect(JSON.stringify(buildRound(4))).toBe(JSON.stringify(buildRound(4)));
  });

  it('draws plain solids of the asked kind', () => {
    const rand = rng(2);
    for (let i = 0; i < 20; i++) {
      expect(answerOf(plainSolid(rand, 'lap-phuong'))).toBe('lap-phuong');
      expect(answerOf(plainSolid(rand, 'hop-chu-nhat'))).toBe('hop-chu-nhat');
    }
  });

  it('praises a right guess and nudges after a wrong one', () => {
    const item = buildRound(1)[0];
    expect(guessMessage(item, item.kind)).toContain('Đúng rồi');
    const wrong = item.kind === 'lap-phuong' ? 'hop-chu-nhat' : 'lap-phuong';
    expect(guessMessage(item, wrong)).toContain('Chưa đúng');
  });
});
