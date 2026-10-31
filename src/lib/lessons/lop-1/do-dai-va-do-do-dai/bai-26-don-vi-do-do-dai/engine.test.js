import { describe, it, expect } from 'vitest';
import { LONGEST, RULER_CM } from '../_shared/length.js';
import { HANDS, TABLE, answerCards, makeTask, measureMessage, spanMessage } from './engine.js';

describe('hand spans', () => {
  it('give two different whole counts for the same table', () => {
    expect(TABLE / HANDS.child.span).toBe(4);
    expect(TABLE / HANDS.adult.span).toBe(3);
  });

  it('report the count, then the reason for a common unit', () => {
    expect(spanMessage('child', 4, { child: 4 })).toContain('4 gang tay của em');
    const both = spanMessage('adult', 3, { child: 4, adult: 3 });
    expect(both).toContain('4 gang tay của em, 3 gang tay của bố');
    expect(both).toContain('xăng-ti-mét');
  });
});

describe('ruler tasks', () => {
  it('start misplaced and offer four in-range cards holding the length, over many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 100; seed++) {
      const t = makeTask(seed);
      const cards = answerCards(t);
      if (t.shift === 0 || Math.abs(t.shift) > 2) bad.push({ seed, why: 'shift', t });
      if (t.length < 3 || t.length > LONGEST) bad.push({ seed, why: 'length', t });
      if (cards.length !== 4 || new Set(cards).size !== 4) bad.push({ seed, why: 'cards', cards });
      if (!cards.includes(t.length)) bad.push({ seed, why: 'answer missing', cards });
      if (cards.some((v) => v < 1 || v > RULER_CM)) bad.push({ seed, why: 'range', cards });
    }
    expect(bad).toEqual([]);
  });

  it('includes the misread far end as a card when it is on the ruler', () => {
    const t = { ...makeTask(1), length: 8, shift: 2 };
    expect(answerCards(t)).toContain(6);
  });

  it('accepts the length only once the 0 mark meets the near end', () => {
    const t = { ...makeTask(1), length: 9, shift: 1 };
    expect(measureMessage(t, 1, 9).tone).toBe('warn');
    expect(measureMessage(t, 0, 9).tone).toBe('ok');
    expect(measureMessage(t, 0, 9).text).toContain('dài 9 cm');
    expect(measureMessage(t, 0, 8).tone).toBe('warn');
    expect(measureMessage(t, 0, null).tone).toBe('info');
  });
});
