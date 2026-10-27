import { describe, it, expect } from 'vitest';
import { absSentence, curvePath, rootLabel, rootsSentence, squareRoots } from './engine.js';

describe('square roots read off the parabola', () => {
  it('counts the roots by the sign of a', () => {
    expect(squareRoots(-1).count).toBe(0);
    expect(squareRoots(0)).toEqual({ count: 1, root: 0 });
    expect(squareRoots(6.25)).toEqual({ count: 2, root: 2.5 });
  });

  it('writes exact and rounded roots the book way', () => {
    expect(rootsSentence(6.25)).toContain('√6,25 = 2,5 và −√6,25 = −2,5');
    expect(rootsSentence(2)).toContain('√2 ≈ 1,414');
    expect(rootsSentence(-0.5)).toContain('Số âm không có căn bậc hai');
    expect(rootsSentence(0)).toContain('đúng một căn bậc hai');
    expect(rootLabel(9)).toBe('3');
    expect(rootLabel(3)).toBe('√3');
    expect(rootLabel(-2)).toBe('');
  });

  it('states √(x²) = |x| and flags negative x', () => {
    expect(absSentence(-3)).toContain('√(x²) = √9 = 3 = |−3|');
    expect(absSentence(-3)).toContain('√(x²) = −x');
    expect(absSentence(1.5)).toContain('√2,25 = 1,5');
  });

  it('clips a curve above the top of the plot', () => {
    const plane = { mx: (/** @type {number} */ x) => x, my: (/** @type {number} */ y) => -y };
    const d = curvePath((x) => x * x, -4, 4, plane, 10, 8);
    expect(d.startsWith('M -3.0 -9.0')).toBe(true);
    expect(d).not.toContain('-16');
  });
});
