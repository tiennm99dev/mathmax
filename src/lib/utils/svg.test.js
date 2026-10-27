import { describe, it, expect } from 'vitest';
import { pointsAttr } from './svg.js';

describe('pointsAttr', () => {
  it('writes each point with one decimal place', () => {
    expect(
      pointsAttr([
        { x: 0, y: 1.25 },
        { x: 10.04, y: -3 },
      ]),
    ).toBe('0.0,1.3 10.0,-3.0');
  });
});
