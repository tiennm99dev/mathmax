/**
 * State of the term-card sorter: a polynomial written as a row of monomial
 * cards that the learner collects (gộp hạng tử cùng bậc) and arranges by
 * descending powers. Pure functions over arrays of cards; each returns a new
 * array.
 */

import { collect } from '../_shared/poly.js';

/** @typedef {{ id: string, c: number, e: number }} Card */

/**
 * Uncollected polynomials in the order they are first written.
 * @type {Array<{ id: string, name: string, terms: Array<{ c: number, e: number }> }>}
 */
export const PRESETS = [
  {
    id: 'a',
    name: 'A(x)',
    terms: [
      { c: -3, e: 2 },
      { c: -12, e: 0 },
      { c: 1, e: 5 },
      { c: 1, e: 2 },
      { c: -2, e: 4 },
    ],
  },
  {
    id: 'b',
    name: 'B(x)',
    terms: [
      { c: 2, e: 3 },
      { c: -3, e: 2 },
      { c: -1, e: 1 },
      { c: -2, e: 3 },
      { c: 7, e: 0 },
    ],
  },
  {
    id: 'c',
    name: 'C(x)',
    terms: [
      { c: 5, e: 1 },
      { c: -1, e: 0 },
      { c: 4, e: 3 },
      { c: 3, e: 1 },
      { c: 1, e: 2 },
    ],
  },
];

/**
 * Cards for a preset, with stable ids.
 * @param {Array<{ c: number, e: number }>} terms
 * @returns {Card[]}
 */
export function cardsOf(terms) {
  return terms.map((t, i) => ({ id: `t${i}`, ...t }));
}

/**
 * Moves the card at `i` one place left (-1) or right (+1); unchanged at an end.
 * @param {Card[]} cards
 * @param {number} i
 * @param {-1 | 1} dir
 * @returns {Card[]}
 */
export function move(cards, i, dir) {
  const j = i + dir;
  if (j < 0 || j >= cards.length) return cards;
  const out = [...cards];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

/**
 * Index of another card with the same exponent as card `i`, or -1.
 * @param {Card[]} cards
 * @param {number} i
 */
export function likeOf(cards, i) {
  return cards.findIndex((c, k) => k !== i && c.e === cards[i].e);
}

/**
 * Adds card `i` and its like term into one card at `i`'s place. A zero sum
 * removes both cards.
 * @param {Card[]} cards
 * @param {number} i
 * @returns {Card[]}
 */
export function merge(cards, i) {
  const j = likeOf(cards, i);
  if (j < 0) return cards;
  const c = Math.round((cards[i].c + cards[j].c) * 1e9) / 1e9;
  const out = cards.map((card, k) => (k === i ? { ...card, c } : card)).filter((_, k) => k !== j);
  return c === 0 ? out.filter((card) => card.id !== cards[i].id) : out;
}

/**
 * Whether two cards still share an exponent.
 * @param {Card[]} cards
 */
export function hasLikeTerms(cards) {
  return new Set(cards.map((c) => c.e)).size < cards.length;
}

/**
 * Whether the cards are collected and in descending powers.
 * @param {Card[]} cards
 */
export function isArranged(cards) {
  return cards.every((c, i) => i === 0 || cards[i - 1].e > c.e);
}

/**
 * Degree, leading coefficient and constant term of the cards' polynomial.
 * @param {Card[]} cards
 * @returns {{ degree: number | null, lead: number | null, free: number }}
 */
export function readout(cards) {
  const p = collect(cards);
  if (p.length === 0) return { degree: null, lead: null, free: 0 };
  return { degree: p.length - 1, lead: p[p.length - 1], free: p[0] ?? 0 };
}

/**
 * Polynomials whose roots the learner hunts for by trying values of x
 * (coefficients by degree). `roots` lists every root, all in steps of 0,5
 * between −3 and 3, so the slider can land on each one.
 * @type {Array<{ id: string, p: number[], roots: number[] }>}
 */
export const ROOT_PRESETS = [
  { id: 'hieu-binh-phuong', p: [-4, 0, 1], roots: [-2, 2] },
  { id: 'khong-tu-do', p: [0, 1, 1], roots: [-1, 0] },
  { id: 'bac-nhat', p: [-3, 2], roots: [1.5] },
  { id: 'vo-nghiem', p: [1, 0, 1], roots: [] },
];
