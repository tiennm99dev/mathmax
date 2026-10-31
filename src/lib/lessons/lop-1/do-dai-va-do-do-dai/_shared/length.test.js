import { describe, it, expect } from 'vitest';
import {
  compareSentences,
  estimateMessage,
  estimateStars,
  inSentence,
  largestIndex,
  pairWords,
  rulerAdvice,
  smallestIndex,
  snapShift,
  spansToCover,
} from './length.js';

describe('comparing lengths and heights', () => {
  it('uses the book words for each dimension', () => {
    expect(pairWords('length').more).toBe('dài hơn');
    expect(pairWords('length').less).toBe('ngắn hơn');
    expect(pairWords('height').more).toBe('cao hơn');
    expect(pairWords('height').less).toBe('thấp hơn');
  });

  it('says both sentences, the bigger one first', () => {
    expect(compareSentences(['Bút chì đỏ', 'Bút chì xanh'], [5, 9], 'length')).toBe(
      'Bút chì xanh dài hơn bút chì đỏ. Bút chì đỏ ngắn hơn bút chì xanh.',
    );
    expect(compareSentences(['Bạn Nam', 'Bạn Mai'], [8, 6], 'height')).toBe(
      'Bạn Nam cao hơn bạn Mai. Bạn Mai thấp hơn bạn Nam.',
    );
  });

  it('lowers only the first letter', () => {
    expect(inSentence('Bạn Nam')).toBe('bạn Nam');
  });

  it('finds the only largest or smallest value', () => {
    expect(largestIndex([3, 9, 5])).toBe(1);
    expect(smallestIndex([3, 9, 5])).toBe(0);
    expect(largestIndex([9, 9, 5])).toBe(-1);
    expect(smallestIndex([4, 9, 4])).toBe(-1);
  });
});

describe('reading a ruler', () => {
  it('snaps the 0 mark to whole centimetres within reach', () => {
    expect(snapShift(0.4)).toBe(0);
    expect(Object.is(snapShift(-0.3), 0)).toBe(true);
    expect(snapShift(1.6)).toBe(2);
    expect(snapShift(-9)).toBe(-4);
  });

  it('reads the far end only when the 0 mark is at the near end', () => {
    expect(rulerAdvice(0, 7, 'bút chì đỏ')).toContain('bút chì đỏ dài 7 cm');
    expect(rulerAdvice(2, 7, 'bút chì đỏ')).toContain('sang trái');
    expect(rulerAdvice(-1, 7, 'bút chì đỏ')).toContain('sang phải');
  });
});

describe('guessing a length', () => {
  it('gives fewer stars the further the guess is', () => {
    expect([7, 6, 8, 5, 10, 1].map((g) => estimateStars(g, 7))).toEqual([3, 2, 2, 1, 0, 0]);
  });

  it('names the stars it gives', () => {
    expect(estimateMessage(7, 7, 'ống hút')).toContain('3 sao');
    expect(estimateMessage(9, 7, 'ống hút')).toContain('dài hơn 2 cm');
    expect(estimateMessage(9, 7, 'ống hút')).toContain('1 sao');
    expect(estimateMessage(2, 7, 'ống hút')).toContain('ngắn hơn 5 cm');
  });
});

describe('measuring with hand spans', () => {
  it('counts the spans laid end to end', () => {
    expect(spansToCover(12, 3)).toBe(4);
    expect(spansToCover(12, 6)).toBe(2);
    expect(spansToCover(13, 3)).toBe(5);
  });
});
