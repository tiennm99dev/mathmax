import { describe, expect, it } from 'vitest';
import {
  BINS,
  FIGURES,
  FIGURE_CARDS,
  OBJECT_CARDS,
  figureOf,
  figureWhy,
  objectOf,
} from './engine.js';
import { OBJECTS, SHAPES } from '../_shared/shapes.js';

describe('shape sorting decks', () => {
  it('has one bin per shape', () => {
    expect(BINS.map((b) => b.id)).toEqual([...SHAPES]);
    expect(BINS.map((b) => b.label)).toEqual([
      'Hình vuông',
      'Hình tròn',
      'Hình tam giác',
      'Hình chữ nhật',
    ]);
  });

  it('puts three cards of every shape in each deck', () => {
    for (const deck of [OBJECT_CARDS, FIGURE_CARDS]) {
      const counts = SHAPES.map((s) => deck.filter((c) => c.bin === s).length);
      expect(counts).toEqual([3, 3, 3, 3]);
    }
  });

  it('mixes each deck so no two neighbours always share a bin', () => {
    for (const deck of [OBJECT_CARDS, FIGURE_CARDS]) {
      expect(deck.slice(0, 3).some((c) => c.bin !== deck[0].bin)).toBe(true);
    }
  });

  it('finds the object or figure behind each card', () => {
    for (const c of OBJECT_CARDS) expect(objectOf(c.id)?.shape).toBe(c.bin);
    for (const c of FIGURE_CARDS) expect(figureOf(c.id)?.kind).toBe(c.bin);
    expect(figureOf('dong-ho')).toBeNull();
    expect(objectOf('h1')).toBeNull();
  });

  it('explains objects by their face and turned shapes as unchanged', () => {
    const clock = OBJECT_CARDS.find((c) => c.id === 'dong-ho');
    expect(clock?.why).toBe('Mặt đồng hồ có dạng hình tròn.');
    const turned = FIGURES.find((f) => f.id === 'h3');
    expect(turned && figureWhy(turned)).toBe('Xoay đi, nó vẫn là hình vuông.');
    const small = FIGURES.find((f) => f.id === 'h5');
    expect(small && figureWhy(small)).toBe('To hay nhỏ, nó vẫn là hình tròn.');
    expect(new Set(OBJECTS.map((o) => o.id)).size).toBe(OBJECTS.length);
  });
});
