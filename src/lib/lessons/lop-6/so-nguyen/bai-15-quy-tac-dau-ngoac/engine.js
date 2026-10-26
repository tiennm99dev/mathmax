/**
 * Removing brackets one term at a time. An expression is a list of groups,
 * each a sign and some signed terms, in brackets or not. Opening a bracket
 * term by term keeps every intermediate expression equal to the original:
 * a − (b + c) = a − b − (c) = a − b − c.
 */

import { MINUS, intText } from '#lib/core/number-format.js';

/**
 * @typedef {{ sign: 1 | -1, terms: number[], bracket: boolean }} Group
 * @typedef {{ sign: '' | '+' | '−', body: string, kind: 'term' | 'open' | 'close', changed: boolean }} Token
 */

/** Sums from the lesson, written as groups. */
export const PRESETS = [
  {
    label: '4 − (12 − 15)',
    groups: /** @type {Group[]} */ ([
      { sign: 1, terms: [4], bracket: false },
      { sign: -1, terms: [12, -15], bracket: true },
    ]),
  },
  {
    label: '(72 − 1 956) − (−1 956 + 28)',
    groups: /** @type {Group[]} */ ([
      { sign: 1, terms: [72, -1956], bracket: true },
      { sign: -1, terms: [-1956, 28], bracket: true },
    ]),
  },
  {
    label: '2 023 − (2 023 − 37 + 15)',
    groups: /** @type {Group[]} */ ([
      { sign: 1, terms: [2023], bracket: false },
      { sign: -1, terms: [2023, -37, 15], bracket: true },
    ]),
  },
  {
    label: '(−5 + 23) − (−35 + 23 − 5)',
    groups: /** @type {Group[]} */ ([
      { sign: 1, terms: [-5, 23], bracket: true },
      { sign: -1, terms: [-35, 23, -5], bracket: true },
    ]),
  },
];

/**
 * The value of the expression.
 * @param {Group[]} groups
 */
export function evaluate(groups) {
  return groups.reduce((s, g) => s + g.sign * g.terms.reduce((t, x) => t + x, 0), 0);
}

/**
 * How many terms sit inside brackets: the number of steps to open them all.
 * @param {Group[]} groups
 */
export function stepCount(groups) {
  return groups.reduce((s, g) => s + (g.bracket ? g.terms.length : 0), 0);
}

/**
 * Which bracketed term step `k` (1-based) opens: its group and term index.
 * @param {Group[]} groups
 * @param {number} k
 */
export function stepTarget(groups, k) {
  let left = k;
  for (let gi = 0; gi < groups.length; gi++) {
    const g = groups[gi];
    if (!g.bracket) continue;
    if (left <= g.terms.length) return { group: gi, term: left - 1 };
    left -= g.terms.length;
  }
  return null;
}

/**
 * A signed term written into a sum: the first one keeps only a minus sign.
 * @param {number} value
 * @param {boolean} first
 * @param {boolean} changed
 * @returns {Token}
 */
function termToken(value, first, changed) {
  const sign = value < 0 ? MINUS : first ? '' : '+';
  return { sign, body: intText(Math.abs(value)), kind: 'term', changed };
}

/**
 * The expression after the first `k` bracketed terms have been taken out.
 * A term taken out of a bracket with a minus in front changes sign; the
 * rest of that bracket stays in brackets behind the same sign.
 * @param {Group[]} groups
 * @param {number} k
 * @returns {Token[]}
 */
export function stage(groups, k) {
  /** @type {Token[]} */
  const out = [];
  let opened = 0;
  for (const g of groups) {
    if (!g.bracket) {
      for (const t of g.terms) out.push(termToken(g.sign * t, out.length === 0, false));
      continue;
    }
    const take = Math.max(0, Math.min(g.terms.length, k - opened));
    g.terms.slice(0, take).forEach((t, i) => {
      const last = opened + i + 1 === k;
      out.push(termToken(g.sign * t, out.length === 0, last && g.sign < 0));
    });
    opened += g.terms.length;
    const rest = g.terms.slice(take);
    if (rest.length === 0) continue;
    const sign = out.length === 0 ? (g.sign < 0 ? MINUS : '') : g.sign < 0 ? MINUS : '+';
    out.push({ sign, body: '(', kind: 'open', changed: false });
    rest.forEach((t, i) => out.push({ ...termToken(t, i === 0, false) }));
    out.push({ sign: '', body: ')', kind: 'close', changed: false });
  }
  return out;
}

/**
 * Plain text of a stage: '4 − 12 − (−15)'.
 * @param {Token[]} tokens
 */
export function stageText(tokens) {
  let s = '';
  for (const t of tokens) {
    if (t.kind === 'close') s += ')';
    else if (s === '' || s.endsWith('(')) s += `${t.sign}${t.body}`;
    else s += ` ${t.sign} ${t.body}`;
  }
  return s.replace(/\( /g, '(');
}

/**
 * The value of the open sum `stage(groups, k)`, read back from its tokens,
 * so the widget can show that every step keeps the value.
 * @param {Token[]} tokens
 */
export function stageValue(tokens) {
  let total = 0;
  let outer = 1;
  let inner = false;
  for (const t of tokens) {
    const v = Number(t.body.replace(/\D/g, ''));
    if (t.kind === 'open') {
      outer = t.sign === MINUS ? -1 : 1;
      inner = true;
    } else if (t.kind === 'close') {
      inner = false;
      outer = 1;
    } else {
      const signed = t.sign === MINUS ? -v : v;
      total += inner ? outer * signed : signed;
    }
  }
  return total;
}

/**
 * Pairs of opposite numbers among the terms of the fully opened sum, for
 * the quick-sum step: each term is used at most once.
 * @param {number[]} values
 * @returns {Array<[number, number]>}
 */
export function oppositePairs(values) {
  const used = new Set();
  /** @type {Array<[number, number]>} */
  const out = [];
  values.forEach((v, i) => {
    if (used.has(i) || v === 0) return;
    const j = values.findIndex((w, jj) => jj > i && !used.has(jj) && w === -v);
    if (j < 0) return;
    used.add(i);
    used.add(j);
    out.push([i, j]);
  });
  return out;
}

/**
 * The signed terms once every bracket is open.
 * @param {Group[]} groups
 */
export function openTerms(groups) {
  return groups.flatMap((g) => g.terms.map((t) => g.sign * t));
}
