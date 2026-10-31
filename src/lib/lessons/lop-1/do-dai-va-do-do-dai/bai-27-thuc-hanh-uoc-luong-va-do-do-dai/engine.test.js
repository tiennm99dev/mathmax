import { describe, it, expect } from 'vitest';
import { estimateStars } from '../_shared/length.js';
import { GUESS_MAX, GUESS_MIN, ROUNDS, gameSummary, makeGame, startGuess } from './engine.js';

describe('guess-then-measure game', () => {
  it('deals five different things of different lengths, over many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const game = makeGame(seed);
      const lengths = game.map((g) => g.length);
      if (game.length !== ROUNDS) bad.push({ seed, why: 'size' });
      if (new Set(game.map((g) => g.thing.id)).size !== ROUNDS) bad.push({ seed, why: 'things' });
      if (new Set(lengths).size !== ROUNDS) bad.push({ seed, why: 'lengths', lengths });
      if (lengths.some((v) => v < 3 || v > 11)) bad.push({ seed, why: 'range', lengths });
      if (game.some((g) => g.shift === 0 || Math.abs(g.shift) > 2))
        bad.push({ seed, why: 'shift' });
      const g = startGuess(seed);
      if (g < GUESS_MIN || g > GUESS_MAX) bad.push({ seed, why: 'guess', g });
    }
    expect(bad).toEqual([]);
  });

  it('sums the stars in the closing line', () => {
    const stars = [7, 9, 4, 12, 3].map((g, i) => estimateStars(g, [7, 8, 6, 9, 3][i]));
    expect(stars).toEqual([3, 2, 1, 0, 3]);
    expect(gameSummary(stars)).toContain('9 / 15 sao');
    expect(gameSummary(stars)).toContain('trúng 2 vật');
    expect(gameSummary([3, 3, 3, 3, 2])).toContain('rất giỏi');
  });
});
