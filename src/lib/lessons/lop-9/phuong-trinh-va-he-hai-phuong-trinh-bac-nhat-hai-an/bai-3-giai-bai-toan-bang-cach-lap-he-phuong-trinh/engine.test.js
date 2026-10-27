import { describe, it, expect } from 'vitest';
import {
  PROBLEMS,
  bank,
  cellKey,
  isComplete,
  placeTile,
  rowEquation,
  rowTex,
  solve,
  tiles,
} from './engine.js';

/** Reads a tile such as '1,15x', '13 000' or 'y' as a number (its coefficient). */
const value = (/** @type {string} */ t) =>
  Number(t.replace(/[xy]$/, '').replace(/\s/g, '').replace(',', '.') || '1');

describe('problem data', () => {
  for (const p of PROBLEMS) {
    it(`${p.id}: tiles are distinct and the rows match their equations`, () => {
      const all = tiles(p);
      expect(new Set(all).size).toBe(all.length);
      expect([...all].sort()).toEqual(
        [...p.rows.flatMap((r) => r.cells.map((c) => c.tile)), ...p.extra].sort(),
      );
      for (const row of p.rows) {
        const [a, b, c] = row.cells.map((cell) => cell.tile);
        expect(a.endsWith('x')).toBe(true);
        expect(b.endsWith('y')).toBe(true);
        expect(value(a)).toBe(row.eq.a);
        expect(value(b)).toBe(row.eq.b);
        expect(value(c)).toBe(row.eq.c);
      }
    });
  }

  it('solutions meet the conditions and match the stories', () => {
    const expected = {
      'ga-cho': { x: 22, y: 14 },
      ve: { x: 150, y: 100 },
      'trai-cay': { x: 40, y: 35 },
      'nang-suat': { x: 420, y: 300 },
    };
    for (const p of PROBLEMS) {
      const s = solve(p);
      expect(s, p.id).toEqual(expected[/** @type {keyof typeof expected} */ (p.id)]);
      expect(p.valid(s.x, s.y)).toBe(true);
      for (const row of p.rows) {
        expect(row.eq.a * s.x + row.eq.b * s.y).toBeCloseTo(row.eq.c, 9);
      }
    }
    expect(PROBLEMS[0].answer(22, 14)).toBe('Có 22 con gà và 14 con chó.');
    expect(PROBLEMS[3].valid(420.5, 299.5)).toBe(true);
    expect(PROBLEMS[0].valid(22.5, 13.5)).toBe(false);
  });
});

describe('placing tiles', () => {
  const p = PROBLEMS[0];

  it('accepts the right tile and refuses a wrong one with a reason', () => {
    const wrong = placeTile(p, {}, 1, 0, '4x');
    expect(wrong.ok).toBe(false);
    expect(wrong.placements).toEqual({});
    expect(wrong.message).toMatch(/2 chân/);
    const right = placeTile(p, {}, 1, 0, '2x');
    expect(right.ok).toBe(true);
    expect(right.placements).toEqual({ [cellKey(1, 0)]: '2x' });
    expect(bank(p, right.placements)).not.toContain('2x');
  });

  it('reads each row as an equation once it is full', () => {
    /** @type {Record<string, string>} */
    let pl = {};
    p.rows.forEach((row, r) =>
      row.cells.forEach((cell, c) => {
        pl = placeTile(p, pl, r, c, cell.tile).placements;
      }),
    );
    expect(rowEquation(p, pl, 0)).toBe('x + y = 36');
    expect(rowEquation(p, pl, 1)).toBe('2x + 4y = 100');
    expect(isComplete(p, pl)).toBe(true);
    expect(isComplete(p, {})).toBe(false);
    expect([...bank(p, pl)].sort()).toEqual(['136', '2y', '4x']);
  });

  it('writes TeX with the decimal comma braced', () => {
    expect(rowTex(PROBLEMS[3], 1)).toBe('1{,}15x + 1{,}12y = 819');
    expect(rowTex(PROBLEMS[1], 1)).toBe('60x + 40y = 13\\,000');
  });
});
