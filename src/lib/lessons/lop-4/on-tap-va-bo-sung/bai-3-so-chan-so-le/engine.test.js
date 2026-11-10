import { describe, expect, it } from 'vitest';
import {
  ROUNDS,
  digitReason,
  pairingText,
  pairsOf,
  parityOf,
  splitRange,
  verdict,
} from './engine.js';

describe('even and odd', () => {
  it('pairs things up', () => {
    expect(pairsOf(9)).toEqual({ pairs: 4, left: 1 });
    expect(pairsOf(12)).toEqual({ pairs: 6, left: 0 });
    expect(pairingText(7, 'con gà con')).toBe(
      '7 con gà con xếp được 3 cặp, còn thừa 1 con gà con.',
    );
    expect(pairingText(6, 'quả táo')).toBe('6 quả táo xếp được 3 cặp, không còn thừa quả táo nào.');
  });

  it('agrees with the last digit', () => {
    const wrong = [];
    for (let n = 0; n <= 1000; n++) {
      const even = [0, 2, 4, 6, 8].includes(n % 10);
      if ((parityOf(n) === 'chẵn') !== even) wrong.push(n);
    }
    expect(wrong).toEqual([]);
    expect(digitReason(649)).toBe('649 có chữ số tận cùng là 9, nên 649 là số lẻ.');
  });

  it('judges the answer without giving it away', () => {
    expect(verdict(9, 'lẻ', true).tone).toBe('ok');
    const slip = verdict(9, 'chẵn', false);
    expect(slip.tone).toBe('warn');
    expect(slip.text).not.toMatch(/lẻ\b|chẵn\b/);
  });

  it('counts the even and odd numbers from 10 to 31', () => {
    const { even, odd } = splitRange(10, 31);
    expect(even).toHaveLength(11);
    expect(odd).toHaveLength(11);
  });

  it('mixes even and odd rounds that fit the board', () => {
    const counts = ROUNDS.map((r) => r.count);
    expect(counts.some((n) => n % 2 === 0)).toBe(true);
    expect(counts.some((n) => n % 2 === 1)).toBe(true);
    expect(Math.max(...counts)).toBeLessThanOrEqual(16);
  });
});
