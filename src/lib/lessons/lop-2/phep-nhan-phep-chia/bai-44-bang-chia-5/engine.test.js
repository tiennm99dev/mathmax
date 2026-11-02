import { describe, expect, it } from 'vitest';
import { BASE, ROWS, gridMessage, round } from './engine.js';

describe('the grid of five columns', () => {
  it('reads the quotient as the number of full rows', () => {
    expect(ROWS).toHaveLength(10);
    expect(gridMessage(0)).toContain('chạm');
    expect(gridMessage(7)).toContain('35 : 5 = 7');
    expect(gridMessage(7)).toContain('5 × 7 = 35');
    expect(gridMessage(10)).toContain('50 : 5 = 10');
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
