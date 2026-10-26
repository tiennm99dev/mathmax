import { describe, it, expect } from 'vitest';
import { EXPERIMENTS, cardsFor, classify, draw, occurrences, why } from './engine.js';

/** @param {string} id */
const exp = (id) => {
  const e = EXPERIMENTS.find((x) => x.id === id);
  if (!e) throw new Error(id);
  return e;
};

/** @param {string} id */
const kinds = (id) => Object.fromEntries(cardsFor(exp(id)).map((c) => [c.id, c.bin]));

describe('event kinds', () => {
  it('sorts the dice events', () => {
    expect(kinds('xuc-xac')).toEqual({
      'xuc-xac-nho-hon-7': 'chac-chan',
      'xuc-xac-bang-7': 'khong-the',
      'xuc-xac-chan': 'ngau-nhien',
      'xuc-xac-lon-hon-4': 'ngau-nhien',
      'xuc-xac-lon-hon-0': 'chac-chan',
      'xuc-xac-boi-10': 'khong-the',
    });
  });

  it('sorts the card events', () => {
    expect(kinds('the-so')).toEqual({
      'the-so-nguyen-to': 'chac-chan',
      'the-so-chan': 'ngau-nhien',
      'the-so-chia-het-4': 'khong-the',
      'the-so-nho-hon-14': 'chac-chan',
      'the-so-hai-chu-so': 'ngau-nhien',
      'the-so-chia-het-6': 'khong-the',
    });
  });

  it('sorts the ball events', () => {
    expect(kinds('bong')).toEqual({
      'bong-xanh': 'ngau-nhien',
      'bong-do': 'ngau-nhien',
      'bong-vang': 'khong-the',
      'bong-xanh-hoac-do': 'chac-chan',
    });
  });

  it('uses every bin in every experiment', () => {
    for (const e of EXPERIMENTS) {
      const bins = new Set(e.events.map((ev) => classify(ev, e.outcomes)));
      expect(bins.size).toBe(3);
    }
  });
});

describe('reasons', () => {
  it('names the outcomes on both sides of a random event', () => {
    const d = exp('xuc-xac');
    const even = d.events.find((e) => e.id === 'chan');
    expect(even && why(even, d)).toBe(
      'Biến cố xảy ra khi số chấm là 2; 4; 6, không xảy ra khi số chấm là 1; 3; 5; không biết trước được.',
    );
  });

  it('lists each colour once', () => {
    const b = exp('bong');
    const blue = b.events.find((e) => e.id === 'xanh');
    expect(blue && why(blue, b)).toContain('màu bóng là xanh, không xảy ra khi màu bóng là đỏ');
  });
});

describe('trials', () => {
  it('counts the trials in which an event happened', () => {
    const d = exp('xuc-xac');
    const counts = [1, 2, 0, 4, 1, 3];
    const even = d.events.find((e) => e.id === 'chan');
    const sure = d.events.find((e) => e.id === 'nho-hon-7');
    expect(even && occurrences(even, d, counts)).toBe(9);
    expect(sure && occurrences(sure, d, counts)).toBe(11);
  });

  it('draws every outcome and stays in range', () => {
    const d = exp('xuc-xac');
    expect(draw(d, 0)).toBe(0);
    expect(draw(d, 0.999999)).toBe(5);
    expect(draw(d, 1)).toBe(5);
    expect(draw(d, 0.5)).toBe(3);
  });
});
