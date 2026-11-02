import { describe, expect, it } from 'vitest';
import {
  ITEMS_DM,
  ITEMS_M,
  ROUNDS,
  TAPES,
  gameSummary,
  guessPrompt,
  makeGame,
  resultMessage,
  startGuess,
  tapeFeedback,
} from './engine.js';

describe('the things to measure', () => {
  it('all fit on the tape of their unit', () => {
    const bad = [...ITEMS_DM, ...ITEMS_M].filter(
      (i) => i.amount < 1 || i.amount > TAPES[i.unit].max,
    );
    expect(bad).toEqual([]);
    expect(TAPES.dm.max * TAPES.dm.step).toBeLessThanOrEqual(300);
    expect(TAPES.m.max * TAPES.m.step).toBeLessThanOrEqual(300);
  });

  it('builds a game of different things, dm first, the same for a seed', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const game = makeGame(seed);
      if (game.length !== ROUNDS) bad.push([seed, 'length']);
      if (new Set(game.map((i) => i.name)).size !== game.length) bad.push([seed, 'repeat']);
      if (game[2].unit !== 'dm' || game[3].unit !== 'm') bad.push([seed, 'order']);
    }
    expect(bad).toEqual([]);
    expect(makeGame(1)).toEqual(makeGame(1));
  });

  it('never gives the length away while guessing', () => {
    const bad = [...ITEMS_DM, ...ITEMS_M].filter(
      (i) => guessPrompt(i).includes(`${i.amount} ${i.unit}`) && i.amount !== 1,
    );
    expect(bad).toEqual([]);
    expect(startGuess(ITEMS_DM[0])).toBe(6);
    expect(startGuess(ITEMS_M[0])).toBe(3);
  });
});

describe('the tape and the result', () => {
  const item = ITEMS_DM[1]; // thước kẻ, 3 dm

  it('tells which way to pull', () => {
    expect(tapeFeedback(item, 1)).toContain('kéo thêm');
    expect(tapeFeedback(item, 5)).toContain('thu lại');
    expect(tapeFeedback(item, 3)).toContain('vừa bằng');
  });

  it('gives stars by how close the guess is', () => {
    expect(resultMessage(item, 3)).toContain('3 sao');
    expect(resultMessage(item, 4)).toContain('nhiều hơn 1 dm');
    expect(resultMessage(item, 4)).toContain('2 sao');
    expect(resultMessage(item, 1)).toContain('ít hơn 2 dm');
    expect(resultMessage(item, 1)).toContain('1 sao');
    expect(resultMessage(item, 9)).not.toContain('sao.');
  });

  it('sums the game up', () => {
    expect(gameSummary([3, 3, 3, 3, 3])).toContain('15 trên 15');
    expect(gameSummary([1, 0, 2, 0, 0])).toContain('3 trên 15');
  });
});
