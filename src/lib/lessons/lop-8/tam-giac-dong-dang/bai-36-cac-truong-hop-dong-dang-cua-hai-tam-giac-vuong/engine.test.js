import { describe, it, expect } from 'vitest';
import { similar } from '../_shared/tri.js';
import { checkAcute, checkHypotenuseLeg, checkLegs } from './engine.js';

describe('one acute angle', () => {
  it('accepts equal acute angles whatever the size', () => {
    const c = checkAcute({ bc: 5, B: 37 }, { bc: 12, B: 37 });
    expect(c.status).toBe('similar');
    expect(c.left && c.right && similar(c.left, c.right)).toBe(true);
  });

  it('sees B′ = C as similar with B and C swapped', () => {
    expect(checkAcute({ bc: 5, B: 30 }, { bc: 8, B: 60 }).status).toBe('swapped');
    expect(checkAcute({ bc: 5, B: 30 }, { bc: 8, B: 50 }).status).toBe('none');
  });
});

describe('two legs', () => {
  it('needs the legs in one ratio', () => {
    const c = checkLegs({ ab: 3, ca: 4 }, { ab: 6, ca: 8 });
    expect(c.status).toBe('similar');
    expect(c.left?.bc).toBeCloseTo(5, 9);
    expect(c.left && c.right && similar(c.left, c.right)).toBe(true);
    expect(checkLegs({ ab: 3, ca: 4 }, { ab: 8, ca: 6 }).status).toBe('swapped');
    expect(checkLegs({ ab: 3, ca: 4 }, { ab: 6, ca: 7 }).status).toBe('none');
  });
});

describe('hypotenuse and leg', () => {
  it('forces the third sides into the same ratio', () => {
    const c = checkHypotenuseLeg({ bc: 7, ab: 3 }, { bc: 14, ab: 6 });
    expect(c.status).toBe('similar');
    expect(c.left && c.right && similar(c.left, c.right)).toBe(true);
  });

  it('rejects a leg as long as the hypotenuse', () => {
    expect(checkHypotenuseLeg({ bc: 5, ab: 5 }, { bc: 10, ab: 6 }).status).toBe('invalid');
  });

  it('rejects ratios that differ', () => {
    expect(checkHypotenuseLeg({ bc: 5, ab: 3 }, { bc: 10, ab: 7 }).status).toBe('none');
  });
});
