import { describe, it, expect } from 'vitest';
import {
  cellFact,
  cellValue,
  cellsOf,
  cellsWith,
  hasCell,
  moveCell,
  relatedText,
  targetText,
} from './engine.js';

describe('addition and subtraction tables', () => {
  it('holds every fact within 10 once', () => {
    expect(cellsOf('cong')).toHaveLength(45);
    expect(cellsOf('tru')).toHaveLength(45);
    const bad = [];
    for (const [r, c] of cellsOf('cong')) {
      const v = cellValue('cong', r, c);
      if (v > 10 || v < 2) bad.push(['cong', r, c]);
    }
    for (const [r, c] of cellsOf('tru')) {
      const v = cellValue('tru', r, c);
      if (v < 1 || v + c !== r) bad.push(['tru', r, c]);
    }
    expect(bad).toEqual([]);
    expect(hasCell('cong', 6, 5)).toBe(false);
    expect(hasCell('tru', 4, 4)).toBe(false);
  });

  it('writes the fact and its related facts', () => {
    expect(cellFact('cong', 3, 2)).toBe('3 + 2 = 5');
    expect(cellFact('tru', 7, 3)).toBe('7 − 3 = 4');
    expect(relatedText('cong', 3, 2)).toBe('2 + 3 = 5. Từ 3 + 2 = 5 ta có 5 − 2 = 3 và 5 − 3 = 2.');
    expect(relatedText('tru', 7, 3)).toBe(
      'Thử lại bằng phép cộng: 4 + 3 = 7. Ta cũng có 7 − 4 = 3.',
    );
  });

  it('finds the cells with a result', () => {
    expect(cellsWith('cong', 10)).toHaveLength(9);
    expect(cellsWith('tru', 1)).toHaveLength(9);
    expect(targetText('cong', 3)).toBe('Có 2 ô bằng 3: 1 + 2 = 3; 2 + 1 = 3.');
  });

  it('moves between cells with arrow keys', () => {
    expect(moveCell('cong', 1, 1, 'ArrowRight')).toEqual([1, 2]);
    expect(moveCell('cong', 1, 9, 'ArrowRight')).toEqual([1, 9]);
    expect(moveCell('cong', 1, 9, 'ArrowDown')).toEqual([2, 8]);
    expect(moveCell('cong', 1, 1, 'ArrowUp')).toEqual([1, 1]);
    expect(moveCell('tru', 2, 1, 'ArrowDown')).toEqual([3, 1]);
    expect(moveCell('tru', 10, 9, 'ArrowUp')).toEqual([9, 8]);
  });
});
