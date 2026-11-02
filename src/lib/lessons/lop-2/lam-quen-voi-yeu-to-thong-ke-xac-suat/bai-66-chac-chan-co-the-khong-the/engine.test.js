import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { COLORS, PRESETS, drawBall, nextColor, possibility, reasonText } from './engine.js';

describe('the ball box', () => {
  it('gives the three boxes of the lesson their words for a blue ball', () => {
    expect(PRESETS.map((p) => possibility(p.balls, 'xanh'))).toEqual([
      'chac-chan',
      'co-the',
      'khong-the',
    ]);
  });

  it('depends on the wanted colour', () => {
    const box = PRESETS[1].balls;
    expect(possibility(box, 'do')).toBe('co-the');
    expect(possibility(box, 'vang')).toBe('khong-the');
    expect(reasonText(box, 'vang')).toContain('không thể');
  });

  it('cycles through every colour', () => {
    const start = COLORS[0].id;
    expect(nextColor(nextColor(nextColor(start)))).toBe(start);
  });

  it('only ever draws a ball that is in the box', () => {
    const rand = rng(7);
    const drawn = Array.from({ length: 200 }, () => drawBall(PRESETS[2].balls, rand));
    expect(drawn).not.toContain('xanh');
    expect(new Set(drawn)).toEqual(new Set(['do', 'vang']));
    const sure = Array.from({ length: 50 }, () => drawBall(PRESETS[0].balls, rand));
    expect(new Set(sure)).toEqual(new Set(['xanh']));
  });
});
