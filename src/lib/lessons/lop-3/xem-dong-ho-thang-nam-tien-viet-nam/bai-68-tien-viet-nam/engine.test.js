import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { GROUP } from '#lib/core/number-format.js';
import { fewestNotes } from '../_shared/money.js';
import {
  GOODS,
  KIND_LABELS,
  MAX_NOTES,
  buildRound,
  changeChoices,
  changeWork,
  payAdvice,
} from './engine.js';

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, ' ');

describe('the pretend shop', () => {
  it('prices every good in whole thousands the notes can pay', () => {
    const bad = GOODS.filter((g) => {
      const notes = fewestNotes(g.price);
      return !notes || notes.length > MAX_NOTES || g.price > 100000;
    });
    expect(bad).toEqual([]);
  });

  it('says how much is missing, and when a note is spare', () => {
    expect(payAdvice([], 22000).enough).toBe(false);
    expect(plain(payAdvice([20000], 22000).text)).toBe(
      'Em đã đưa 20 000 đồng. Còn thiếu 2 000 đồng.',
    );
    expect(payAdvice([50000], 22000).enough).toBe(true);
    expect(plain(payAdvice([50000], 22000).text)).toBe(
      'Em đã đưa 50 000 đồng, đủ để trả. Em bấm Trả tiền nhé.',
    );
    expect(plain(payAdvice([50000, 10000], 22000).text)).toContain('Bớt tờ 10 000 đồng vẫn đủ');
  });

  it('offers the right change among three different amounts', () => {
    const bad = [];
    for (const g of GOODS) {
      for (const paid of [g.price + 1000, 50000, 100000]) {
        if (paid <= g.price) continue;
        const { options, answer } = changeChoices(paid, g.price);
        if (
          options.length !== 3 ||
          new Set(options).size !== 3 ||
          options[answer] !== paid - g.price ||
          options.some((v) => v <= 0)
        )
          bad.push({ g, paid, options });
      }
    }
    expect(bad).toEqual([]);
    expect(plain(changeWork(50000, 22000))).toBe(
      '50 000 − 22 000 = 28 000. Cô trả lại em 28 000 đồng.',
    );
  });
});

describe('the practice round', () => {
  it('asks eight money questions', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const round = buildRound(seed);
      if (round.length !== 8) bad.push(seed);
      for (const q of round) {
        if (!q.kind || !(q.kind in KIND_LABELS) || !optionText(q.options[q.answer])) bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });
});
