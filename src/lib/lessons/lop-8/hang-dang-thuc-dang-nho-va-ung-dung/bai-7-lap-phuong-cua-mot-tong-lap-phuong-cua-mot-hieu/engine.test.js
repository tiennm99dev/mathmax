import { describe, it, expect } from 'vitest';
import { KINDS, boxes, faces, project, termOf, viewBox } from './engine.js';

describe('cube of a + b cut into 8 boxes', () => {
  it('has one a³, three a²b, three ab² and one b³ box', () => {
    const list = boxes(3, 2);
    const counts = KINDS.map((k) => list.filter((bx) => bx.kind === k).length);
    expect(counts).toEqual([1, 3, 3, 1]);
  });

  it('fills the whole cube: the volumes add up to (a + b)³', () => {
    for (let a = 1; a <= 5; a++) {
      for (let b = 1; b <= 4; b++) {
        const vol = boxes(a, b).reduce((s, bx) => s + bx.size[0] * bx.size[1] * bx.size[2], 0);
        expect(vol).toBe((a + b) ** 3);
        const terms = KINDS.reduce((s, k) => s + termOf(k, a, b).total, 0);
        expect(terms).toBe((a + b) ** 3);
      }
    }
  });

  it('gives each kind the right volume', () => {
    expect(termOf('a3', 4, 1)).toEqual({ count: 1, volume: 64, total: 64 });
    expect(termOf('a2b', 4, 1)).toEqual({ count: 3, volume: 16, total: 48 });
    expect(termOf('ab2', 4, 1)).toEqual({ count: 3, volume: 4, total: 12 });
    expect(termOf('b3', 4, 1)).toEqual({ count: 1, volume: 1, total: 1 });
  });

  it('paints back to front and moves b-side boxes apart', () => {
    const list = boxes(2, 1, 1);
    expect(list[0].id).toBe('000');
    expect(list.at(-1)?.id).toBe('111');
    expect(list.at(-1)?.origin).toEqual([3, 3, 3]);
  });

  it('projects isometrically: up is −y on screen, x and y go down sideways', () => {
    expect(project(0, 0, 1, 10)).toEqual([0, -10]);
    const [px, py] = project(1, 0, 0, 10);
    expect(px).toBeCloseTo(8.66, 2);
    expect(py).toBe(5);
    expect(faces(boxes(1, 1)[0], 10).top.split(' ')).toHaveLength(4);
    expect(viewBox(2, 10, 5).split(' ').map(Number)[3]).toBe(50);
  });
});
