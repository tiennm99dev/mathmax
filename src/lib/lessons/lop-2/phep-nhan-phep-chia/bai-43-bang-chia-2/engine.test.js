import { describe, expect, it } from 'vitest';
import { BASE, ROWS, cardFaces, flipMessage, round } from './engine.js';

describe('the cards of the table of division by 2', () => {
  it('pairs each row of the table of 2 with its division', () => {
    expect(ROWS).toHaveLength(10);
    expect(cardFaces(4)).toEqual({ front: '2 × 4 = 8', back: '8 : 2 = 4' });
    expect(cardFaces(10)).toEqual({ front: '2 × 10 = 20', back: '20 : 2 = 10' });
  });

  it('explains the card just turned and the finished table', () => {
    expect(flipMessage(null, 0)).toContain('chạm');
    expect(flipMessage(3, 1)).toContain('6 : 2 = 3');
    expect(flipMessage(3, 10)).toContain('xong bảng chia 2');
  });
});

describe('the quiz round', () => {
  it('stores the answer each story asks for', () => {
    const bad = [];
    for (let seed = 1; seed <= 20; seed++) {
      for (const q of round(seed)) {
        const total = Number(q.prompt.match(/\d+/)?.[0]);
        const asked = total / BASE;
        if (q.kind === 'story' && q.options[q.answer] !== String(asked)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
