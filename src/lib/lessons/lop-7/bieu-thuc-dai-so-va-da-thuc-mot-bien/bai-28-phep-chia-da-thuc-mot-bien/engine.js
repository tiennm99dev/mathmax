/**
 * Long division of polynomials in one variable, laid out the way the book
 * writes it, next to the long division of two natural numbers with the same
 * number of rounds. Each round has three actions: divide the leading terms
 * (chia), multiply the divisor by that quotient term (nhân), subtract (trừ).
 * For numbers the subtraction also brings the next digit down (hạ).
 */

import { add, degree, mul, polyText, sub, termText, trim } from '../_shared/poly.js';

/** @typedef {import('../_shared/poly.js').Term} Term */

/**
 * @typedef {object} PolyRound
 * @property {Term} term the quotient term found by dividing leading terms
 * @property {number[]} product divisor times that term
 * @property {number[]} rest what is left after subtracting the product
 */

/**
 * Quotient of two terms, ax^m : bx^n = (a : b)x^(m − n); null when m < n or
 * b = 0, where the quotient is not a monomial.
 * @param {Term} a
 * @param {Term} b
 * @returns {Term | null}
 */
export function divideTerm(a, b) {
  if (b.c === 0 || a.e < b.e) return null;
  return { c: Math.round((a.c / b.c) * 1e9) / 1e9, e: a.e - b.e };
}

/**
 * The leading term of a non-zero collected polynomial.
 * @param {number[]} p
 * @returns {Term}
 */
const lead = (p) => {
  const q = trim(p);
  return { c: q[q.length - 1], e: q.length - 1 };
};

/**
 * Long division of p by a non-zero q: rounds go on while the rest has a
 * degree at least that of q, so the remainder is 0 or of lower degree.
 * @param {number[]} p
 * @param {number[]} q
 * @returns {{ quotient: number[], remainder: number[], rounds: PolyRound[] }}
 */
export function longDivide(p, q) {
  const d = degree(q);
  if (d === null) throw new Error('division by the zero polynomial');
  /** @type {PolyRound[]} */
  const rounds = [];
  /** @type {number[]} */
  let quotient = [];
  let rest = trim(p);
  while (rest.length > 0 && rest.length - 1 >= d) {
    const term = /** @type {Term} */ (divideTerm(lead(rest), lead(q)));
    /** @type {number[]} */
    const single = Array(term.e + 1).fill(0);
    single[term.e] = term.c;
    const product = mul(q, single);
    // Subtracting must cancel the leading term exactly, even with decimals.
    const next = sub(rest, product).slice(0, rest.length - 1);
    rounds.push({ term, product, rest: trim(next) });
    quotient = add(quotient, single);
    rest = trim(next);
  }
  return { quotient, remainder: rest, rounds };
}

/**
 * @typedef {object} NumberRound
 * @property {number} digit the quotient digit
 * @property {number} partial the number divided in this round
 * @property {number} product digit times the divisor
 * @property {number} rest partial minus product
 * @property {number} end index of the last dividend digit used so far
 */

/**
 * Long division of natural numbers as taught in primary school: start with
 * the shortest leading part of a that is at least b, then bring down one
 * digit per round.
 * @param {number} a
 * @param {number} b
 * @returns {{ quotient: number, remainder: number, rounds: NumberRound[] }}
 */
export function numberDivide(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b <= 0) {
    throw new Error('natural numbers only, divisor positive');
  }
  const digits = String(a).split('').map(Number);
  /** @type {NumberRound[]} */
  const rounds = [];
  let end = 0;
  let partial = digits[0];
  while (partial < b && end < digits.length - 1) {
    end += 1;
    partial = partial * 10 + digits[end];
  }
  if (partial < b) return { quotient: 0, remainder: a, rounds };
  for (;;) {
    const digit = Math.floor(partial / b);
    const product = digit * b;
    const rest = partial - product;
    rounds.push({ digit, partial, product, rest, end });
    if (end === digits.length - 1) break;
    end += 1;
    partial = rest * 10 + digits[end];
  }
  return { quotient: Math.floor(a / b), remainder: a % b, rounds };
}

/**
 * Presets: a polynomial division and a number division with the same
 * number of rounds. Polynomials are coefficients by degree.
 * @type {Array<{ id: string, label: string, p: number[], q: number[], a: number, b: number }>}
 */
export const PRESETS = [
  {
    id: 'don-thuc',
    label: 'Chia cho đơn thức',
    p: [0, 0, 0, -2, 5, 0, -1],
    q: [0, 0, 0.5],
    a: 936,
    b: 3,
  },
  {
    id: 'chia-het',
    label: 'Chia hết',
    p: [-2, 6, -3, -3, 2],
    q: [-2, 0, 1],
    a: 3192,
    b: 12,
  },
  {
    id: 'khuyet',
    label: 'Thương khuyết bậc',
    p: [3, -9, -2, 6],
    q: [-1, 3],
    a: 864,
    b: 24,
  },
  {
    id: 'co-du',
    label: 'Chia có dư',
    p: [7, -1, -3, 5],
    q: [1, 0, 1],
    a: 467,
    b: 15,
  },
];

/** The three actions of a round, in order. */
export const ACTIONS = ['chia', 'nhân', 'trừ'];

/**
 * How far a stepped division has got: `step` counts actions done, three per
 * round. Returns, for round r, how many of its actions are visible (0 to 3).
 * @param {number} step
 * @param {number} r
 */
export function shownIn(step, r) {
  return Math.max(0, Math.min(3, step - 3 * r));
}

/**
 * Plain-text narration of the action just done in a polynomial division.
 * @param {ReturnType<typeof longDivide>} div
 * @param {number[]} q the divisor
 * @param {number} step 1 to 3 × rounds
 */
export function polyNarration(div, q, step) {
  const r = Math.floor((step - 1) / 3);
  const action = (step - 1) % 3;
  const round = div.rounds[r];
  const lq = termText(lead(q));
  if (action === 0) {
    const from =
      r === 0 ? 'hạng tử bậc cao nhất của đa thức bị chia' : 'hạng tử bậc cao nhất của dư vừa có';
    return `Chia: lấy ${from} chia cho ${lq}, được ${termText(round.term)}. Viết ${termText(round.term)} vào thương.`;
  }
  if (action === 1) {
    return `Nhân: ${termText(round.term)} nhân với đa thức chia, được ${polyText(round.product)}. Viết tích dưới đa thức đang chia, các hạng tử cùng bậc thẳng cột.`;
  }
  const last = r === div.rounds.length - 1;
  const restText = polyText(round.rest);
  if (!last)
    return `Trừ: được dư ${restText}. Dư này có bậc chưa nhỏ hơn bậc của đa thức chia nên chia tiếp.`;
  if (round.rest.length === 0)
    return `Trừ: được dư 0. Phép chia hết, thương là ${polyText(div.quotient)}.`;
  return `Trừ: được dư ${restText}, có bậc nhỏ hơn bậc của đa thức chia nên dừng. Thương ${polyText(div.quotient)}, dư ${restText}.`;
}

/**
 * Plain-text narration of the action just done in a number division.
 * @param {ReturnType<typeof numberDivide>} div
 * @param {number} b the divisor
 * @param {number} step 1 to 3 × rounds
 */
export function numberNarration(div, b, step) {
  const r = Math.floor((step - 1) / 3);
  const action = (step - 1) % 3;
  const round = div.rounds[r];
  if (action === 0)
    return `Chia: ${round.partial} chia ${b} được ${round.digit}, viết ${round.digit} vào thương.`;
  if (action === 1) return `Nhân: ${round.digit} nhân ${b} bằng ${round.product}.`;
  const last = r === div.rounds.length - 1;
  if (!last) {
    const next = div.rounds[r + 1].partial;
    return `Trừ: ${round.partial} trừ ${round.product} bằng ${round.rest}, hạ chữ số tiếp theo được ${next}.`;
  }
  return `Trừ: ${round.partial} trừ ${round.product} bằng ${round.rest}. Hết chữ số để hạ: thương ${div.quotient}, dư ${div.remainder}.`;
}
