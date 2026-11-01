import { describe, expect, it } from 'vitest';
import { QUESTIONS, gridText, isRightPart, partFeedback, swapText } from './engine.js';

describe('naming the parts', () => {
  it('finds the product after the equals sign and factors around the times sign', () => {
    expect([0, 1, 2].map((p) => isRightPart('tich', p))).toEqual([false, false, true]);
    expect([0, 1, 2].map((p) => isRightPart('thua-so', p))).toEqual([true, true, false]);
  });

  it('asks only questions whose three numbers can be told apart by place', () => {
    const bad = QUESTIONS.filter((q) => q.a < 2 || q.b < 2);
    expect(bad).toEqual([]);
  });

  it('explains a wrong tap by naming what was tapped', () => {
    expect(partFeedback('tich', 0, 3, 4)).toContain('3 là thừa số');
    expect(partFeedback('thua-so', 2, 3, 4)).toContain('12 là kết quả');
    expect(partFeedback('tich', 2, 3, 4)).toContain('Đúng rồi! 12');
    expect(partFeedback('thua-so', 1, 3, 4)).toContain('Đúng rồi! 4 là một thừa số');
  });
});

describe('the grid sentences', () => {
  it('reads rows and factors the book way', () => {
    expect(gridText(2, 5)).toBe(
      '5 hàng, mỗi hàng 2 chấm: 2 được lấy 5 lần. Hai thừa số là 2 và 5, tích là 10.',
    );
    expect(swapText(5, 2)).toBe('Đổi chỗ hai thừa số: 5 × 2 = 2 × 5. Tích vẫn là 10.');
  });
});
