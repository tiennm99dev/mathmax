import { describe, expect, it } from 'vitest';
import {
  COLORS,
  OBJECTS,
  SHAPES,
  circleRadius,
  figureCorners,
  figureLabel,
  objectSentence,
  shapeTitle,
} from './shapes.js';

describe('chapter shapes', () => {
  it('names the four shapes the book way', () => {
    expect(SHAPES.map(shapeTitle)).toEqual([
      'Hình vuông',
      'Hình tròn',
      'Hình tam giác',
      'Hình chữ nhật',
    ]);
  });

  it('draws squares with equal sides and rectangles with unequal sides', () => {
    const bad = [];
    for (let variant = 0; variant < 3; variant++) {
      const sq = figureCorners({ kind: 'vuong', color: COLORS[0], size: 1, turn: 0, variant });
      const rect = figureCorners({ kind: 'chu-nhat', color: COLORS[0], size: 1, turn: 0, variant });
      if (!sq || !rect) {
        bad.push(`missing ${variant}`);
        continue;
      }
      const side = (/** @type {{x:number,y:number}[]} */ c, /** @type {number} */ i) =>
        Math.hypot(c[(i + 1) % 4].x - c[i].x, c[(i + 1) % 4].y - c[i].y);
      if (Math.abs(side(sq, 0) - side(sq, 1)) > 1e-9) bad.push(`square ${variant}`);
      if (side(rect, 0) / side(rect, 1) < 1.5) bad.push(`rectangle ${variant}`);
      const tri = figureCorners({ kind: 'tam-giac', color: COLORS[0], size: 1, turn: 0, variant });
      if (tri?.length !== 3) bad.push(`triangle ${variant}`);
    }
    expect(bad).toEqual([]);
    expect(
      figureCorners({ kind: 'tron', color: COLORS[0], size: 1, turn: 0, variant: 0 }),
    ).toBeNull();
    expect(circleRadius({ kind: 'tron', color: COLORS[0], size: 0.5, turn: 0, variant: 0 })).toBe(
      18,
    );
  });

  it('keeps every turned figure inside its padded canvas', () => {
    const far = [];
    for (const kind of SHAPES) {
      for (let variant = 0; variant < 3; variant++) {
        const c = figureCorners({ kind, color: COLORS[1], size: 1, turn: 0, variant }) ?? [];
        for (const p of c) if (Math.hypot(p.x - 50, p.y - 50) > 56) far.push(`${kind} ${variant}`);
      }
    }
    expect(far).toEqual([]);
  });

  it('labels figures by shape and colour and objects by their face', () => {
    expect(figureLabel({ kind: 'tam-giac', color: COLORS[0], size: 1, turn: 0, variant: 0 })).toBe(
      'hình tam giác màu đỏ',
    );
    expect(OBJECTS.filter((o) => o.shape === 'tron')).toHaveLength(3);
    const flag = OBJECTS.find((o) => o.id === 'la-co');
    expect(flag && objectSentence(flag)).toBe('Lá cờ Tổ quốc có dạng hình chữ nhật.');
  });
});
