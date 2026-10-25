import { describe, it, expect } from 'vitest';
import { middleOf, rayOf, raysRelation } from './engine.js';

describe('points on a line', () => {
  it('finds the point between the other two', () => {
    const r = middleOf([
      { name: 'O', x: 100 },
      { name: 'A', x: 240 },
      { name: 'B', x: 380 },
    ]);
    expect(r?.middle.name).toBe('A');
    expect(r?.ends.map((p) => p.name)).toEqual(['O', 'B']);
    const s = middleOf([
      { name: 'O', x: 200 },
      { name: 'A', x: 300 },
      { name: 'B', x: 60 },
    ]);
    expect(s?.middle.name).toBe('O');
  });

  it('needs three distinct points', () => {
    expect(
      middleOf([
        { name: 'O', x: 100 },
        { name: 'A', x: 100 },
        { name: 'B', x: 380 },
      ]),
    ).toBeNull();
  });

  it('names the ray a point is on', () => {
    expect(rayOf(200, 100)).toBe('x');
    expect(rayOf(200, 300)).toBe('y');
    expect(rayOf(200, 200)).toBeNull();
  });

  it('tells opposite rays from the same ray', () => {
    expect(raysRelation(200, 100, 300)).toBe('doi-nhau');
    expect(raysRelation(200, 250, 300)).toBe('trung-nhau');
    expect(raysRelation(200, 120, 60)).toBe('trung-nhau');
    expect(raysRelation(200, 200, 60)).toBeNull();
  });
});
