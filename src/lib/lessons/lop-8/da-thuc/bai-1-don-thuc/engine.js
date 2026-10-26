/**
 * Sorting monomial cards into groups of like monomials (đơn thức đồng dạng).
 * Each card shows a monomial, sometimes with its variables in an unusual
 * order (7yx² is 7x²y); a group is right when all its cards share one
 * variable part, and its sum adds the coefficients and keeps that part.
 */

import {
  alike,
  mono,
  monoDegree,
  monoOperand,
  monoText,
  parsePoly,
  varKey,
} from '../_shared/poly.js';

/** @typedef {import('../_shared/poly.js').Mono} Mono */
/** @typedef {{ id: string, label: string, m: Mono }} Card */

/**
 * A card from its value in preset syntax and, when the face differs, the
 * text printed on it.
 * @param {string} id
 * @param {string} src
 * @param {string} [label]
 * @returns {Card}
 */
function card(id, src, label) {
  const [m] = parsePoly(src);
  return { id, label: label ?? monoText(m), m };
}

/** The decks of the widget, from easier to trickier. */
export const DECKS = [
  {
    name: 'Bộ 1',
    cards: [
      card('a', '3x^2y'),
      card('b', 'xy^2'),
      card('c', '-2xy'),
      card('d', '-5x^2y'),
      card('e', '4xy^2'),
      card('f', '7x^2y', '7yx²'),
      card('g', '6xy'),
    ],
  },
  {
    name: 'Bộ 2',
    cards: [
      card('a', '2x^3'),
      card('b', '-3'),
      card('c', 'xyz'),
      card('d', '5x^2y^2'),
      card('e', '-x^3'),
      card('f', '9'),
      card('g', '-4xyz', '−4zxy'),
      card('h', '-5x^2y^2', '−5y²x²'),
    ],
  },
  {
    name: 'Bộ 3',
    cards: [
      card('a', 'x^2y^3'),
      card('b', 'x^3y^2'),
      card('c', 'x^5'),
      card('d', '-2x^2y^3', '−2y³x²'),
      card('e', '4x^3y^2'),
      card('f', '3x^5'),
      card('g', '-x^2y^3'),
    ],
  },
];

/**
 * The variable part as words for feedback: 'x²y', or 'không có biến' for a
 * number.
 * @param {Mono} m
 */
export function partName(m) {
  const t = monoText(mono(1, m.vars));
  return varKey(m) === '' ? 'số (không có biến)' : t;
}

/**
 * What one group holds: whether its cards are alike, and if so their sum
 * written out, e.g. '3x²y + (−5x²y) + 7x²y = 5x²y'.
 * @param {Card[]} members
 * @returns {{ ok: boolean, sum: Mono | null, line: string, clash: [Card, Card] | null }}
 */
export function groupInfo(members) {
  if (members.length === 0) return { ok: true, sum: null, line: '', clash: null };
  const first = members[0];
  const other = members.find((c) => !alike(c.m, first.m));
  if (other) return { ok: false, sum: null, line: '', clash: [first, other] };
  const coef = members.reduce((s, c) => s + c.m.coef, 0);
  const sum = mono(coef, first.m.vars);
  const terms = members.map((c, i) => (i === 0 ? monoText(c.m) : monoOperand(c.m))).join(' + ');
  return { ok: true, sum, line: `${terms} = ${monoText(sum)}`, clash: null };
}

/**
 * The degree of a group's sum as words: 'bậc 3', 'bậc 0', or 'tổng bằng 0,
 * không có bậc'.
 * @param {Mono} sum
 */
export function degreeWords(sum) {
  const d = monoDegree(sum);
  return d === null ? 'tổng bằng 0, không có bậc' : `bậc ${d}`;
}

/**
 * The state of the whole board.
 * @param {Card[]} cards
 * @param {string[][]} groups card ids per group
 * @returns {{ placed: number, total: number, mixed: number[], split: [number, number] | null, done: boolean, parts: number }}
 */
export function boardStatus(cards, groups) {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const filled = groups.map((ids) => ids.map((id) => /** @type {Card} */ (byId.get(id))));
  const placed = filled.reduce((s, g) => s + g.length, 0);
  const mixed = filled.flatMap((g, i) => (groupInfo(g).ok ? [] : [i]));
  /** @type {[number, number] | null} */
  let split = null;
  /** @type {Map<string, number>} */
  const seen = new Map();
  filled.forEach((g, i) => {
    if (g.length === 0 || mixed.includes(i) || split) return;
    const key = varKey(g[0].m);
    const j = seen.get(key);
    if (j !== undefined) split = [j, i];
    else seen.set(key, i);
  });
  const parts = new Set(cards.map((c) => varKey(c.m))).size;
  const done = placed === cards.length && mixed.length === 0 && split === null;
  return { placed, total: cards.length, mixed, split, done, parts };
}
