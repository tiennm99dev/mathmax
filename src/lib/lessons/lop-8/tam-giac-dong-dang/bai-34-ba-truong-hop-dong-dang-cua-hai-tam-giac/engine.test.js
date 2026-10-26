import { describe, it, expect } from 'vitest';
import { similar } from '../_shared/tri.js';
import { checkAA, checkSAS, checkSSS } from './engine.js';

describe('cạnh – cạnh – cạnh', () => {
  it('accepts three sides in one ratio', () => {
    const c = checkSSS({ ab: 4, bc: 5, ca: 6 }, { ab: 8, bc: 10, ca: 12 });
    expect(c.status).toBe('similar');
    expect(c.left && c.right && similar(c.left, c.right)).toBe(true);
  });

  it('rejects one side out of proportion', () => {
    expect(checkSSS({ ab: 4, bc: 5, ca: 6 }, { ab: 8, bc: 10, ca: 11 }).status).toBe('none');
  });

  it('notices three sides in one ratio with the vertices paired another way', () => {
    expect(checkSSS({ ab: 4, bc: 5, ca: 6 }, { ab: 10, bc: 8, ca: 12 }).status).toBe('reordered');
  });

  it('flags lengths that make no triangle', () => {
    expect(checkSSS({ ab: 1, bc: 2, ca: 3 }, { ab: 2, bc: 4, ca: 6 }).status).toBe('invalid');
  });
});

describe('cạnh – góc – cạnh', () => {
  it('needs the included angle equal as well as the ratio', () => {
    const p = { ab: 4, ca: 6, A: 60 };
    expect(checkSAS(p, { ab: 6, ca: 9, A: 60 }).status).toBe('similar');
    expect(checkSAS(p, { ab: 6, ca: 9, A: 75 }).status).toBe('sides');
    expect(checkSAS(p, { ab: 6, ca: 8, A: 60 }).status).toBe('angle');
    expect(checkSAS(p, { ab: 6, ca: 8, A: 75 }).status).toBe('none');
  });

  it('gives triangles that are really similar when the case holds', () => {
    const c = checkSAS({ ab: 3, ca: 7, A: 110 }, { ab: 9, ca: 21, A: 110 });
    expect(c.left && c.right && similar(c.left, c.right)).toBe(true);
  });

  it('gives triangles that are not similar when the angle differs', () => {
    const c = checkSAS({ ab: 3, ca: 7, A: 110 }, { ab: 9, ca: 21, A: 100 });
    expect(c.left && c.right && similar(c.left, c.right)).toBe(false);
  });
});

describe('góc – góc', () => {
  it('needs two pairs of equal angles', () => {
    const p = { bc: 5, B: 50, C: 70 };
    const c = checkAA(p, { bc: 8, B: 50, C: 70 });
    expect(c.status).toBe('similar');
    expect(c.left && c.right && similar(c.left, c.right)).toBe(true);
    expect(checkAA(p, { bc: 8, B: 50, C: 65 }).status).toBe('one');
    expect(checkAA(p, { bc: 8, B: 40, C: 60 }).status).toBe('none');
  });

  it('notices similar triangles whose vertices pair another way', () => {
    // 50°, 60°, 70° in both, but B′ = 50° = B while C′ = 60° = Â.
    expect(checkAA({ bc: 5, B: 50, C: 70 }, { bc: 8, B: 50, C: 60 }).status).toBe('reordered');
  });

  it('flags angles that add up to 180° or more', () => {
    expect(checkAA({ bc: 5, B: 100, C: 80 }, { bc: 5, B: 50, C: 70 }).status).toBe('invalid');
  });
});
