import { describe, it, expect } from 'vitest';
import { cbrtText, cubeFaces, cubeRoot, cubeSentence, isPerfectCube } from './engine.js';

describe('cube roots', () => {
  it('is exact on perfect cubes, negatives included', () => {
    for (let n = -5; n <= 5; n++) {
      expect(cubeRoot(n ** 3)).toBe(n);
      expect(isPerfectCube(n ** 3)).toBe(true);
    }
    expect(isPerfectCube(10)).toBe(false);
    expect(cubeRoot(-10) ** 3).toBeCloseTo(-10, 10);
  });

  it('writes the book notation and sentences', () => {
    expect(cbrtText(-27)).toBe('∛(−27)');
    expect(cbrtText(125)).toBe('∛125');
    expect(cubeSentence(-27)).toContain('∛(−27) = −3 vì (−3)³ = −27.');
    expect(cubeSentence(64)).toContain('cạnh 4');
    expect(cubeSentence(10)).toContain('∛10 ≈ 2,154');
    expect(cubeSentence(-10)).toContain('số âm');
    expect(cubeSentence(0)).toContain('Căn bậc ba của 0 là 0');
  });

  it('draws three faces of a cube', () => {
    const f = cubeFaces(0, 100, 50);
    expect(f.front).toBe('0.0,100.0 50.0,100.0 50.0,50.0 0.0,50.0');
    expect(f.top.split(' ')).toHaveLength(4);
    expect(f.side.split(' ')).toHaveLength(4);
  });
});
