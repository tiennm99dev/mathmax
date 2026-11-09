import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { GROUP } from '#lib/core/number-format.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @param {string} text */
const numbersIn = (text) =>
  (text.match(new RegExp(`\\d+(?:${GROUP}\\d{3})*`, 'g')) ?? []).map((s) =>
    Number(s.replaceAll(GROUP, '')),
  );

/**
 * The right text of a division.
 * @param {number} n
 * @param {number} d
 */
function divisionText(n, d) {
  const q = Math.floor(n / d);
  const text = String(q).replace(/\B(?=(\d{3})+(?!\d))/g, GROUP);
  return n % d > 0 ? `${text} (dư ${n % d})` : text;
}

/** @type {Record<string, (x: number, y: number) => number>} */
const VALUE = {
  cong: (x, y) => x + y,
  tru: (x, y) => x - y,
  nhan: (x, y) => x * y,
};

describe('the round', () => {
  it('has one question of each part', () => {
    const kinds = buildRound(1).map((q) => q.kind);
    expect(kinds.toSorted()).toEqual(Object.keys(KIND_LABELS).toSorted());
  });

  it('stores the answers that the numbers of the prompt give', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildRound(seed)) {
        const opts = q.options.map(optionText);
        const right = optionText(q.options[q.answer]);
        const [x, y, z] = numbersIn(q.prompt);
        const value = numbersIn(right)[0];
        const kind = q.kind ?? '';
        if (new Set(opts).size !== opts.length || opts.length < 3) bad.push(q.prompt);
        if (opts.some((o) => o.includes('-') || o.includes('.'))) bad.push(q.prompt);
        if (q.solution.includes('undefined') || q.hint.includes('undefined')) bad.push(q.prompt);
        if (kind in VALUE && value !== VALUE[kind](x, y)) bad.push(q.prompt);
        if (kind === 'cong-nham' && value !== x + y) bad.push(q.prompt);
        if (kind === 'tru-nham' && value !== x - y) bad.push(q.prompt);
        if (kind === 'chia' || kind === 'chia-du') {
          if (right !== divisionText(x, y)) bad.push(q.prompt);
          if (!q.solution.includes(`= ${right}.`)) bad.push(q.prompt);
        }
        if (kind === 'chia' && x % y !== 0) bad.push(q.prompt);
        if (kind === 'chia-du' && x % y === 0) bad.push(q.prompt);
        if (kind === 'bai-hon') {
          const want = q.prompt.includes('nhiều hơn') ? x + y : x - y;
          if (value !== want) bad.push(q.prompt);
        }
        if (kind === 'bai-nhan-chia') {
          const want = q.prompt.includes('chia đều') ? x / y : x * y;
          if (value !== want) bad.push(q.prompt);
        }
        if (kind === 'bai-hai-buoc' && (value !== x - y - z || value <= 0)) bad.push(q.prompt);
        if (value > 10000) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never gives the answer away in a hint', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        if (right.length > 2 && q.hint.includes(right)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
