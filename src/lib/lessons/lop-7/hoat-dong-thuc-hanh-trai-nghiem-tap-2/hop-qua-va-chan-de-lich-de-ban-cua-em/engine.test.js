import { describe, it, expect } from 'vitest';
import { FLAP, TRIANGLES, boxNet, fold, material, polygonArea, standNet } from './engine.js';

/** @param {ReturnType<typeof fold>} folded @param {string} id */
const piece = (folded, id) => {
  const p = folded.find((f) => f.piece.id === id);
  if (!p) throw new Error(id);
  return p.pts;
};

/** @param {{ x: number, y: number, z: number }[]} pts */
const bounds = (pts) => ({
  x: [Math.min(...pts.map((p) => p.x)), Math.max(...pts.map((p) => p.x))],
  y: [Math.min(...pts.map((p) => p.y)), Math.max(...pts.map((p) => p.y))],
  z: [Math.min(...pts.map((p) => p.z)), Math.max(...pts.map((p) => p.z))],
});

describe('gift box net', () => {
  it('lies flat at t = 0', () => {
    for (const f of fold(boxNet(6, 4, 5), 0)) for (const p of f.pts) expect(p.z).toBe(0);
  });

  it('folds into the a × b × c box with the lid on top', () => {
    const [a, b, c] = [6, 4, 5];
    const folded = fold(boxNet(a, b, c), 1);
    const all = bounds(folded.flatMap((f) => f.pts));
    for (const [lo, hi, want] of [
      [all.x[0], all.x[1], a],
      [all.y[0], all.y[1], b],
      [all.z[0], all.z[1], c],
    ]) {
      expect(lo).toBeCloseTo(0, 9);
      expect(hi).toBeCloseTo(want, 9);
    }
    for (const p of piece(folded, 'nap')) expect(p.z).toBeCloseTo(c, 9);
    for (const p of piece(folded, 'truoc')) expect(p.y).toBeCloseTo(0, 9);
    for (const p of piece(folded, 'sau')) expect(p.y).toBeCloseTo(b, 9);
    for (const p of piece(folded, 'trai')) expect(p.x).toBeCloseTo(0, 9);
    for (const p of piece(folded, 'phai')) expect(p.x).toBeCloseTo(a, 9);
    // The glue flap lands on the inside of the front wall.
    for (const p of piece(folded, 'mep-than')) expect(p.y).toBeCloseTo(0, 9);
  });

  it('needs the surface area plus the flaps', () => {
    const [a, b, c] = [6, 4, 5];
    const m = material(boxNet(a, b, c));
    expect(m.faces).toBeCloseTo(2 * (a * b + b * c + c * a), 9); // 148
    expect(m.flaps).toBeCloseTo(FLAP * (c - FLAP) + 2 * FLAP * (a - FLAP), 9); // 14
    expect(m.total).toBeCloseTo(162, 9);
    expect(m.width).toBeCloseTo(2 * a + 2 * b + FLAP, 9);
    expect(m.height).toBeCloseTo(c + 2 * b + 2 * FLAP, 9);
  });

  it('a 10 cm cube uses 600 cm² for its faces', () => {
    expect(material(boxNet(10, 10, 10)).faces).toBeCloseTo(600, 9);
  });
});

describe('calendar stand net', () => {
  it('has triangles whose sides close up', () => {
    for (const { w, s, m } of TRIANGLES) expect((w / 2) ** 2 + m ** 2).toBe(s ** 2);
  });

  it('folds into a triangular prism lying on the table', () => {
    for (const tri of TRIANGLES) {
      const L = 15;
      const folded = fold(standNet(tri, L, true), 1);
      const back = piece(folded, 'mat-sau');
      // The back face comes down onto the far edge of the bottom: y = 0, z = 0.
      const low = back.filter((p) => Math.abs(p.z) < 1e-9);
      expect(low).toHaveLength(2);
      for (const p of low) expect(p.y).toBeCloseTo(0, 9);
      // The ridge sits at height m above the middle of the bottom.
      const top = bounds(piece(folded, 'mat-lich'));
      expect(top.z[1]).toBeCloseTo(tri.m, 9);
      for (const id of ['tam-giac-trai', 'tam-giac-phai']) {
        const b = bounds(piece(folded, id));
        expect(b.z[1]).toBeCloseTo(tri.m, 9);
        expect(b.x[1] - b.x[0]).toBeCloseTo(0, 9);
      }
      // The flap lies flat on the bottom face.
      for (const p of piece(folded, 'mep')) expect(p.z).toBeCloseTo(0, 9);
    }
  });

  it('needs the lateral area, the two triangles and the flap', () => {
    const tri = TRIANGLES[0]; // 8, 5, 5, height 3
    const open = material(standNet(tri, 15, false));
    expect(open.faces).toBeCloseTo((8 + 5 + 5) * 15, 9); // 270
    expect(open.flaps).toBeCloseTo(FLAP * (15 - FLAP), 9); // 14
    const closed = material(standNet(tri, 15, true));
    expect(closed.faces).toBeCloseTo(270 + 8 * 3, 9); // 294
    expect(closed.width).toBeCloseTo(15 + 2 * 3, 9);
    expect(closed.height).toBeCloseTo(8 + 2 * 5 + FLAP, 9);
  });
});

describe('polygonArea', () => {
  it('works whichever way the corners go', () => {
    const tri = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 3 },
    ];
    expect(polygonArea(tri)).toBe(6);
    expect(polygonArea([...tri].reverse())).toBe(6);
  });
});
