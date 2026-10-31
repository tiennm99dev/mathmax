import { describe, it, expect } from 'vitest';
import { fitGroup, partialText, storyAfter, storyBefore, swapNote, tokens } from './engine.js';

describe('balloon addition engine', () => {
  it('keeps the sum within 10', () => {
    expect(fitGroup(8, 4)).toBe(6);
    expect(fitGroup(-2, 3)).toBe(0);
    expect(fitGroup(12, 0)).toBe(9);
    const bad = [];
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 12; b++) {
        const fit = fitGroup(b, a);
        if (fit + a > 10 || fit < 0) bad.push([a, b]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('reveals the addition token by token', () => {
    expect(tokens(3, 2)).toEqual(['3', '+', '2', '=', '5']);
    expect(partialText(3, 2, 0)).toBe('');
    expect(partialText(3, 2, 2)).toBe('3 +');
    expect(partialText(3, 2, 5)).toBe('3 + 2 = 5');
  });

  it('tells both meanings of addition', () => {
    expect(storyBefore('gop', 3, 2)).toContain('Bên trái có 3');
    expect(storyAfter('gop', 3, 2)).toBe('Gộp lại có 5 quả bóng. Ta viết 3 + 2 = 5.');
    expect(storyAfter('them', 4, 1)).toContain('có tất cả 5 quả bóng');
  });

  it('states the swap rule', () => {
    expect(swapNote(2, 3)).toBe('3 + 2 = 5 và 2 + 3 = 5. Đổi chỗ hai số, kết quả vẫn là 5.');
    expect(swapNote(2, 2)).toContain('2 + 2 = 4');
  });
});
