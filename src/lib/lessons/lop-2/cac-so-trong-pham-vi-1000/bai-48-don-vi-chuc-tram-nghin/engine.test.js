import { describe, expect, it } from 'vitest';
import {
  JOIN_AT,
  LEVELS,
  START,
  add,
  join,
  pileNote,
  remove,
  ruleText,
  split,
  worthText,
} from './engine.js';

/**
 * Adds blocks to the pile until ten of them are there.
 * @param {import('./engine.js').Pile} pile
 */
function fill(pile) {
  let now = pile;
  while (now.count < JOIN_AT) now = add(now);
  return now;
}

describe('joining blocks', () => {
  it('climbs from units to one thousand, each step joining ten', () => {
    let pile = START;
    const rules = [];
    for (let i = 0; i < 3; i++) {
      pile = fill(pile);
      rules.push(ruleText(pile.level));
      pile = join(pile);
    }
    expect(pile).toEqual({ level: 3, count: 1 });
    expect(rules).toEqual(['10 đơn vị = 1 chục', '10 chục = 1 trăm', '10 trăm = 1 nghìn']);
  });

  it('keeps the value of the pile when joining and splitting', () => {
    const worth = (/** @type {import('./engine.js').Pile} */ p) => p.count * LEVELS[p.level].value;
    const pile = fill({ level: 1, count: 1 });
    expect(worth(join(pile))).toBe(worth(pile));
    expect(worth(split(join(pile)))).toBe(worth(pile));
    expect(split(join(pile))).toEqual(pile);
  });

  it('refuses a join before ten and a split of more than one block', () => {
    const nine = { level: 0, count: 9 };
    expect(join(nine)).toEqual(nine);
    const two = { level: 1, count: 2 };
    expect(split(two)).toEqual(two);
    expect(split({ level: 0, count: 1 })).toEqual({ level: 0, count: 1 });
  });

  it('never goes over ten blocks and stops at one thousand', () => {
    const ten = { level: 0, count: 10 };
    expect(add(ten)).toEqual(ten);
    const top = { level: 3, count: 1 };
    expect(add(top)).toEqual(top);
    expect(join(top)).toEqual(top);
  });

  it('takes a block away but keeps the single joined block to split', () => {
    expect(remove({ level: 0, count: 3 })).toEqual({ level: 0, count: 2 });
    expect(remove({ level: 2, count: 1 })).toEqual({ level: 2, count: 1 });
  });
});

describe('what the widget says', () => {
  it('says how far the pile is from a join', () => {
    expect(pileNote(START)).toContain('Thêm 1 đơn vị');
    expect(pileNote({ level: 0, count: 7 })).toBe('Có 7 đơn vị. Cần thêm 3 đơn vị nữa để ghép.');
    expect(pileNote({ level: 1, count: 10 })).toContain('1 trăm');
    expect(pileNote({ level: 3, count: 1 })).toContain('1000');
  });

  it('writes the worth of a pile', () => {
    expect(worthText({ level: 1, count: 3 })).toBe('3 chục là 30');
    expect(worthText({ level: 2, count: 10 })).toBe('10 trăm là 1000');
  });
});
