import { describe, expect, it } from 'vitest';
import { CUPS } from '../_shared/capacity.js';
import { massThing } from '../_shared/mass.js';
import {
  CAPACITY_ITEMS,
  GUESS_MAX,
  GUESS_MIN,
  MASS_ITEMS,
  ROUNDS,
  checkMessage,
  gameSummary,
  guessStars,
  makeGame,
  startGuess,
} from './engine.js';

describe('the guess-then-check game', () => {
  it('takes turns weighing and pouring, with no thing twice', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const game = makeGame(seed);
      if (game.length !== ROUNDS) bad.push([seed, 'length']);
      game.forEach((it, i) => {
        if (it.kind !== (i % 2 === 0 ? 'mass' : 'capacity')) bad.push([seed, i]);
      });
      if (new Set(game.map((it) => it.id)).size !== ROUNDS) bad.push([seed, 'twice']);
      const g = startGuess(seed);
      if (g < GUESS_MIN || g > GUESS_MAX) bad.push([seed, 'guess']);
    }
    expect(bad).toEqual([]);
    expect(makeGame(3)).toEqual(makeGame(3));
  });

  it('keeps every amount inside the guess range and the mugs', () => {
    const items = [...MASS_ITEMS, ...CAPACITY_ITEMS];
    expect(items.every((it) => it.amount >= GUESS_MIN && it.amount <= GUESS_MAX)).toBe(true);
    expect(CAPACITY_ITEMS.every((it) => it.amount <= CUPS)).toBe(true);
    expect(MASS_ITEMS.every((it) => it.kind === 'mass' && massThing(it.id).name.length > 0)).toBe(
      true,
    );
  });

  it('gives stars for a close guess', () => {
    expect(guessStars(3, 3)).toBe(3);
    expect(guessStars(5, 3)).toBe(1);
    expect(guessStars(9, 3)).toBe(0);
    expect(checkMessage({ kind: 'mass', id: 'melon', amount: 3 }, 4)).toBe(
      'Quả dưa hấu cân nặng 3 kg. Em đoán 4 kg. Em đoán nặng hơn 1 kg, rất gần rồi! Em được 2 sao.',
    );
    expect(checkMessage({ kind: 'capacity', id: 'can', amount: 5 }, 5)).toContain('Đoán đúng');
    expect(checkMessage({ kind: 'capacity', id: 'bucket', amount: 10 }, 4)).toContain('ít hơn 6 l');
    expect(gameSummary([3, 3, 3, 3, 2, 3])).toContain('rất giỏi');
  });
});
