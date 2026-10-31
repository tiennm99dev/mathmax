import { describe, it, expect } from 'vitest';
import { MAX, apply, can, describe as say, guide, nextTarget, valueOf } from './engine.js';

describe('counting-stick board', () => {
  it('adds and removes bundles and loose sticks', () => {
    let s = { tens: 0, ones: 0 };
    s = apply(s, 'bundle+');
    s = apply(s, 'bundle+');
    s = apply(s, 'stick+');
    expect(s).toEqual({ tens: 2, ones: 1 });
    expect(valueOf(s)).toBe(21);
    expect(apply(s, 'bundle-')).toEqual({ tens: 1, ones: 1 });
  });

  it('never goes below zero or above 99', () => {
    expect(can({ tens: 0, ones: 0 }, 'stick-')).toBe(false);
    expect(can({ tens: 0, ones: 3 }, 'bundle-')).toBe(false);
    expect(can({ tens: 9, ones: 9 }, 'stick+')).toBe(false);
    expect(can({ tens: 9, ones: 0 }, 'bundle+')).toBe(false);
    expect(valueOf(apply({ tens: 8, ones: 10 }, 'tie'))).toBe(90);
    expect(can({ tens: 8, ones: 10 }, 'bundle+')).toBe(false);
  });

  it('ties ten loose sticks into one bundle', () => {
    expect(apply({ tens: 2, ones: 10 }, 'tie')).toEqual({ tens: 3, ones: 0 });
    expect(can({ tens: 2, ones: 9 }, 'tie')).toBe(false);
    expect(can({ tens: 2, ones: 10 }, 'stick+')).toBe(false);
  });

  it('describes the board as tens and ones', () => {
    expect(say({ tens: 2, ones: 5 })).toBe('Số 25 gồm 2 chục và 5 đơn vị, đọc là "hai mươi lăm".');
    expect(say({ tens: 3, ones: 10 })).toContain('4 chục');
    expect(say({ tens: 0, ones: 0 })).toContain('Chưa có');
  });

  it('guides the child toward the target', () => {
    expect(guide({ tens: 1, ones: 0 }, 34).text).toContain('thêm bó chục');
    expect(guide({ tens: 5, ones: 0 }, 34).text).toContain('bớt bó chục');
    expect(guide({ tens: 3, ones: 1 }, 34).text).toContain('thêm que rời');
    expect(guide({ tens: 3, ones: 6 }, 34).text).toContain('bớt que rời');
    expect(guide({ tens: 3, ones: 4 }, 34)).toEqual({
      done: true,
      text: 'Đúng rồi! 3 chục và 4 đơn vị là số 34, đọc là "ba mươi tư".',
    });
  });

  it('picks a fresh two-digit target', () => {
    const bad = [];
    for (const r of [0, 0.3, 0.6, 0.999999]) {
      const t = nextTarget(50, () => r);
      if (t === 50 || t < 11 || t > MAX) bad.push(t);
    }
    expect(bad).toEqual([]);
  });
});
