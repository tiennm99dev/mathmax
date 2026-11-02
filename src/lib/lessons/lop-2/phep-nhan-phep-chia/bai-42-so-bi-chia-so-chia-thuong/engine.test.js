import { describe, expect, it } from 'vitest';
import {
  FACTS,
  PARTS,
  TASKS,
  askOrder,
  askText,
  cardsOf,
  divisionText,
  divisionsOf,
  judge,
  multiplicationText,
  namedText,
  placeCard,
  tapResult,
} from './engine.js';

describe('naming the parts', () => {
  it('uses whole divisions with three different numbers, so a name fits one number', () => {
    const bad = TASKS.filter(
      (t) =>
        !Number.isInteger(t.quotient) ||
        new Set([t.dividend, t.divisor, t.quotient]).size !== 3 ||
        t.quotient * t.divisor !== t.dividend,
    );
    expect(bad).toEqual([]);
  });

  it('asks all three names, starting from another name each task', () => {
    expect(askOrder(0)).toEqual(['dividend', 'divisor', 'quotient']);
    expect(askOrder(1)).toEqual(['divisor', 'quotient', 'dividend']);
    expect(askOrder(3)).toEqual(askOrder(0));
    expect([...askOrder(2)].sort()).toEqual([...PARTS].sort());
    expect(askText('quotient')).toBe('Em chạm vào thương.');
  });

  it('says what a tap means', () => {
    expect(tapResult('dividend', 'dividend').right).toBe(true);
    const miss = tapResult('dividend', 'quotient');
    expect(miss.right).toBe(false);
    expect(miss.text).toContain('đứng đầu');
  });

  it('writes the division and the multiplication that goes with it', () => {
    const d = { dividend: 10, divisor: 2, quotient: 5 };
    expect(divisionText(d)).toBe('10 : 2 = 5');
    expect(multiplicationText(d)).toBe('5 × 2 = 10');
    expect(namedText(d)).toContain('Số bị chia 10, số chia 2, thương 5');
  });
});

describe('building two divisions from one multiplication', () => {
  it('lists the cards of each fact, all different', () => {
    expect(cardsOf({ a: 2, b: 3 })).toEqual([2, 3, 6]);
    expect(FACTS.filter((f) => new Set(cardsOf(f)).size !== 3)).toEqual([]);
  });

  it('gives two true divisions for each fact', () => {
    const bad = [];
    for (const f of FACTS) {
      const [one, two] = divisionsOf(f);
      if (one.dividend / one.divisor !== f.b || two.dividend / two.divisor !== f.a) bad.push(f);
    }
    expect(bad).toEqual([]);
  });

  it('fills the first free slot and ignores a used card', () => {
    /** @type {import('./engine.js').Slots} */
    let slots = [null, null, null];
    slots = placeCard(slots, 6);
    expect(slots).toEqual([6, null, null]);
    expect(placeCard(slots, 6)).toEqual([6, null, null]);
    slots = placeCard(placeCard(slots, 2), 3);
    expect(slots).toEqual([6, 2, 3]);
    expect(placeCard(slots, 9)).toEqual([6, 2, 3]);
  });

  it('accepts both orders once and turns down anything else', () => {
    const fact = { a: 2, b: 3 };
    expect(judge(fact, [6, null, null], []).kind).toBe('wait');
    expect(judge(fact, [2, 3, 6], []).kind).toBe('wrong');
    expect(judge(fact, [6, 2, 3], []).kind).toBe('new');
    expect(judge(fact, [6, 2, 3], [2]).kind).toBe('again');
    const last = judge(fact, [6, 3, 2], [2]);
    expect(last.kind).toBe('new');
    expect(last.text).toContain('hai phép chia');
  });
});
