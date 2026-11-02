import { describe, expect, it } from 'vitest';
import { NOTES, fewestNotes, notesText, sumNotes } from './money.js';

describe('the banknotes of the lesson', () => {
  it('adds notes up', () => {
    expect(sumNotes([])).toBe(0);
    expect(sumNotes([500, 200, 100])).toBe(800);
  });

  it('pays every whole number of hundreds to 1000 with the fewest notes', () => {
    const bad = [];
    for (let amount = 100; amount <= 1000; amount += 100) {
      const notes = fewestNotes(amount);
      if (!notes || sumNotes(notes) !== amount) bad.push(amount);
      if (notes?.some((n) => !NOTES.includes(/** @type {any} */ (n)))) bad.push(amount);
    }
    expect(bad).toEqual([]);
    expect(fewestNotes(400)).toEqual([200, 200]);
    expect(fewestNotes(900)).toEqual([500, 200, 200]);
    expect(fewestNotes(150)).toBeNull();
  });

  it('says notes largest first and groups equal ones', () => {
    expect(notesText([100, 500, 100])).toBe('1 tờ 500 đồng và 2 tờ 100 đồng');
    expect(notesText([1000])).toBe('1 tờ 1000 đồng');
  });
});
