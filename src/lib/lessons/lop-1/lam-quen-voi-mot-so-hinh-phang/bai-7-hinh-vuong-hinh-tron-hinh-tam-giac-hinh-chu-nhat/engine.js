/**
 * Decks for the shape sorting game: everyday objects and drawn shapes of
 * different sizes, colours and turns, each to be put into the bin of its
 * shape. Pure and DOM-free.
 */
import { shuffled } from '#lib/core/card-sorter.js';
import {
  COLORS,
  OBJECTS,
  SHAPES,
  SHAPE_NAMES,
  figureLabel,
  objectSentence,
  shapeTitle,
} from '../_shared/shapes.js';

/** The four bins, one per shape. */
export const BINS = SHAPES.map((kind) => ({ id: kind, label: shapeTitle(kind) }));

/**
 * Drawn shapes for the second deck: three of each kind, made to look
 * different (size, colour, turn, proportions) while keeping their shape.
 * @type {ReadonlyArray<import('../_shared/shapes.js').Figure & { id: string }>}
 */
export const FIGURES = [
  { id: 'h1', kind: 'vuong', color: COLORS[0], size: 1, turn: 0, variant: 0 },
  { id: 'h2', kind: 'vuong', color: COLORS[3], size: 0.6, turn: 0, variant: 0 },
  { id: 'h3', kind: 'vuong', color: COLORS[2], size: 0.9, turn: 30, variant: 0 },
  { id: 'h4', kind: 'tron', color: COLORS[1], size: 1, turn: 0, variant: 0 },
  { id: 'h5', kind: 'tron', color: COLORS[4], size: 0.55, turn: 0, variant: 0 },
  { id: 'h6', kind: 'tron', color: COLORS[5], size: 0.8, turn: 0, variant: 0 },
  { id: 'h7', kind: 'tam-giac', color: COLORS[2], size: 1, turn: 0, variant: 0 },
  { id: 'h8', kind: 'tam-giac', color: COLORS[0], size: 0.85, turn: 0, variant: 1 },
  { id: 'h9', kind: 'tam-giac', color: COLORS[3], size: 0.9, turn: 180, variant: 2 },
  { id: 'h10', kind: 'chu-nhat', color: COLORS[4], size: 1, turn: 0, variant: 0 },
  { id: 'h11', kind: 'chu-nhat', color: COLORS[1], size: 0.9, turn: 90, variant: 1 },
  { id: 'h12', kind: 'chu-nhat', color: COLORS[5], size: 0.8, turn: 0, variant: 2 },
];

/**
 * Why a drawn shape belongs to its bin, said after it is placed.
 * @param {import('../_shared/shapes.js').Figure} figure
 */
export function figureWhy(figure) {
  const name = SHAPE_NAMES[figure.kind];
  if (figure.turn !== 0 && figure.kind !== 'tron') return `Xoay đi, nó vẫn là ${name}.`;
  if (figure.size < 0.7) return `To hay nhỏ, nó vẫn là ${name}.`;
  return `Đây là ${name}.`;
}

/** Object cards, in a fixed mixed order. */
export const OBJECT_CARDS = shuffled(
  OBJECTS.map((o) => ({ id: o.id, label: o.name, bin: o.shape, why: objectSentence(o) })),
  7,
);

/** Drawn-shape cards, in a fixed mixed order. */
export const FIGURE_CARDS = shuffled(
  FIGURES.map((f) => ({ id: f.id, label: figureLabel(f), bin: f.kind, why: figureWhy(f) })),
  11,
);

/**
 * The drawn shape behind a card id, if any.
 * @param {string} id
 */
export function figureOf(id) {
  return FIGURES.find((f) => f.id === id) ?? null;
}

/**
 * The object behind a card id, if any.
 * @param {string} id
 */
export function objectOf(id) {
  return OBJECTS.find((o) => o.id === id) ?? null;
}
