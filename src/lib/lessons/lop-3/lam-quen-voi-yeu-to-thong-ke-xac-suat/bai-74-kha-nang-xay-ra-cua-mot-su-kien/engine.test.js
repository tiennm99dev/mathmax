import { describe, expect, it } from 'vitest';
import {
  PRESETS,
  countsByColor,
  nextColor,
  outcomes,
  outcomesText,
  possibility,
  reasonText,
  resize,
} from './engine.js';

describe('the lucky wheel', () => {
  it('calls an event certain, possible or impossible from the cells', () => {
    expect(possibility(PRESETS[0].cells, 'do')).toBe('chac-chan');
    expect(possibility(PRESETS[0].cells, 'xanh')).toBe('khong-the');
    expect(possibility(PRESETS[1].cells, 'xanh')).toBe('co-the');
    expect(possibility(PRESETS[1].cells, 'vang')).toBe('khong-the');
    expect(possibility(PRESETS[2].cells, 'vang')).toBe('co-the');
  });

  it('lists the colours the arrow can stop on', () => {
    expect(outcomes(['xanh', 'do', 'xanh'])).toEqual(['do', 'xanh']);
    expect(outcomesText(['do', 'do'])).toBe('Kim chỉ có thể dừng ở ô đỏ.');
    expect(outcomesText(PRESETS[2].cells)).toBe('Kim có thể dừng ở ô đỏ, ô xanh hoặc ô vàng.');
  });

  it('explains each case in words', () => {
    expect(reasonText(PRESETS[0].cells, 'do')).toContain('chắc chắn');
    expect(reasonText(PRESETS[1].cells, 'do')).toContain('có thể');
    expect(reasonText(PRESETS[1].cells, 'vang')).toContain('không thể');
  });

  it('cycles colours and resizes within the limits', () => {
    expect(nextColor('do')).toBe('xanh');
    expect(nextColor('vang')).toBe('do');
    expect(resize(['do', 'do'], 4)).toEqual(['do', 'do', 'vang', 'do']);
    expect(resize(['do', 'xanh', 'vang'], 1)).toEqual(['do', 'xanh']);
    expect(resize(['do'], 20)).toHaveLength(8);
  });

  it('adds the stops of cells of the same colour', () => {
    expect(countsByColor(['do', 'xanh', 'do'], [2, 1, 3])).toEqual({ do: 5, xanh: 1, vang: 0 });
    expect(countsByColor(['do', 'xanh'], [])).toEqual({ do: 0, xanh: 0, vang: 0 });
  });
});
