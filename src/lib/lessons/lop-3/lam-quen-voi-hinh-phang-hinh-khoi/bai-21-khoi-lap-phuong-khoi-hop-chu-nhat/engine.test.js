import { describe, expect, it } from 'vitest';
import { SOLID_DIMS, START_VIEW, projectBox } from '../_shared/box.js';
import {
  KIND_LABELS,
  PARTS,
  REACH,
  buildRound,
  compareMessage,
  countMessage,
  countPart,
  nearestPart,
} from './engine.js';

describe('counting the parts of a solid', () => {
  it('counts a part once, in the order it was tapped', () => {
    expect(countPart(['d1'], 'd3')).toEqual(['d1', 'd3']);
    expect(countPart(['d1', 'd3'], 'd1')).toEqual(['d1', 'd3']);
  });

  it('knows how many parts there are', () => {
    expect(PARTS.dinh.total).toBe(8);
    expect(PARTS.canh.total).toBe(12);
    expect(PARTS.mat.total).toBe(6);
  });

  it('says what is left, and names the shape of the faces', () => {
    expect(countMessage('lap-phuong', 'mat', 0, 3)).toContain('Xoay khối');
    expect(countMessage('lap-phuong', 'mat', 2, 1)).toContain('hình vuông');
    expect(countMessage('hop-chu-nhat', 'mat', 2, 1)).toContain('hình chữ nhật');
    expect(countMessage('lap-phuong', 'mat', 3, 0)).toContain('xoay khối');
    expect(countMessage('lap-phuong', 'dinh', 3, 4)).toBe('Em đã đếm 3 đỉnh.');
  });

  it('gives the total only once all are counted', () => {
    expect(countMessage('lap-phuong', 'dinh', 7, 1)).not.toContain('8');
    expect(countMessage('lap-phuong', 'dinh', 8, 0)).toContain('có 8 đỉnh');
    expect(countMessage('hop-chu-nhat', 'canh', 11, 1)).not.toContain('12');
    expect(countMessage('hop-chu-nhat', 'canh', 12, 0)).toContain('có 12 cạnh');
    expect(countMessage('hop-chu-nhat', 'mat', 6, 0)).toContain('có 6 mặt');
  });

  it('compares the solids only when both are counted in full', () => {
    expect(compareMessage(() => 0)).toBeNull();
    expect(compareMessage((s, p) => (s === 'lap-phuong' ? PARTS[p].total : 0))).toBeNull();
    expect(compareMessage((_, p) => PARTS[p].total)).toContain('khác nhau');
  });
});

describe('what a press means', () => {
  it('reaches every edge and vertex of the solid from any corner view', () => {
    const bad = [];
    for (const kind of /** @type {const} */ (['lap-phuong', 'hop-chu-nhat'])) {
      for (const view of [START_VIEW, { yaw: 60, pitch: 40 }, { yaw: 150, pitch: -38 }]) {
        const { edges, vertices } = projectBox(SOLID_DIMS[kind], view, 320, 300);
        for (const e of edges) {
          const middle = { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 };
          if (nearestPart(middle, edges) !== e.id) bad.push(`${kind} edge ${e.id}`);
        }
        const dots = vertices.map((v) => ({ id: v.id, a: v.at, b: v.at }));
        for (const v of dots) {
          if (nearestPart(v.a, dots) !== v.id) bad.push(`${kind} vertex ${v.id}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('means nothing when the press is far from every part', () => {
    const edge = { id: 'c', a: { x: 0, y: 0 }, b: { x: 100, y: 0 } };
    expect(nearestPart({ x: 50, y: REACH - 1 }, [edge])).toBe('c');
    expect(nearestPart({ x: 50, y: REACH + 1 }, [edge])).toBeNull();
    expect(nearestPart({ x: 100 + REACH + 1, y: 0 }, [edge])).toBeNull();
  });
});

describe('the round', () => {
  it('is eight questions of known kinds and repeats on a seed', () => {
    const bad = [];
    for (let seed = 1; seed <= 30; seed++) {
      const round = buildRound(seed);
      if (round.length !== 8) bad.push(`seed ${seed}: ${round.length}`);
      for (const q of round) {
        if (!(q.kind in KIND_LABELS)) bad.push(`seed ${seed}: ${q.kind}`);
      }
    }
    expect(bad).toEqual([]);
    expect(buildRound(5)).toEqual(buildRound(5));
    expect(buildRound(5)).not.toEqual(buildRound(6));
  });
});
