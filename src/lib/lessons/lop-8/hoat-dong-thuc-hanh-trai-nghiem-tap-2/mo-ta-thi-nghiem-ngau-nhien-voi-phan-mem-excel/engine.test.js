import { describe, expect, it } from 'vitest';
import { EXPERIMENTS, ballColour, countEvent, rangeOf, runningShare, simulate } from './engine.js';

describe('simulate', () => {
  it('stays within RANDBETWEEN bounds and repeats for a seed', () => {
    for (const exp of EXPERIMENTS) {
      const values = simulate(exp, 500, 7);
      expect(values).toHaveLength(500);
      expect(Math.min(...values)).toBe(exp.low);
      expect(Math.max(...values)).toBe(exp.high);
      expect(simulate(exp, 500, 7)).toEqual(values);
    }
  });

  it('settles near the probability over many trials', () => {
    for (const exp of EXPERIMENTS) {
      const values = simulate(exp, 20000, 2026);
      for (const ev of exp.events) {
        const share = countEvent(values, ev) / values.length;
        expect(Math.abs(share - ev.chance[0] / ev.chance[1])).toBeLessThan(0.02);
      }
    }
  });
});

describe('events', () => {
  it('each event chance matches the outcomes it covers', () => {
    for (const exp of EXPERIMENTS) {
      const outcomes = [];
      for (let v = exp.low; v <= exp.high; v++) outcomes.push(v);
      for (const ev of exp.events) {
        const hits = outcomes.filter((v) => ev.test(v)).length;
        expect(hits / outcomes.length).toBeCloseTo(ev.chance[0] / ev.chance[1]);
      }
    }
  });

  it('writes the COUNTIF formulas with the range of the sheet', () => {
    const [coin, die, bag] = EXPERIMENTS;
    expect(rangeOf(100)).toBe('B2:B101');
    expect(coin.events[0].countFormula(rangeOf(20))).toBe('=COUNTIF(B2:B21;"S")');
    expect(die.events[2].countFormula('B2:B51')).toBe('=COUNTIF(B2:B51;">4")');
    expect(bag.events[0].countFormula('B2:B201')).toBe('=COUNTIF(B2:B201;">=6")');
  });

  it('colours the eight balls as in the bag: 1 blue, 2 yellow, 2 red, 3 black', () => {
    const colours = [1, 2, 3, 4, 5, 6, 7, 8].map(ballColour);
    expect(colours.filter((c) => c === 'Xanh')).toHaveLength(1);
    expect(colours.filter((c) => c === 'Vàng')).toHaveLength(2);
    expect(colours.filter((c) => c === 'Đỏ')).toHaveLength(2);
    expect(colours.filter((c) => c === 'Đen')).toHaveLength(3);
  });
});

describe('runningShare', () => {
  it('is the share of hits so far', () => {
    const [, die] = EXPERIMENTS;
    const six = die.events[0];
    expect(runningShare([6, 1, 6, 2], six)).toEqual([1, 0.5, 2 / 3, 0.5]);
    expect(countEvent([6, 1, 6, 2], six)).toBe(2);
  });
});
