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
        const [value, extra] = numbersIn(right);
        const kind = q.kind ?? '';
        if (new Set(opts).size !== opts.length || opts.length < 3) bad.push(q.prompt);
        if (opts.some((o) => o.includes('-') || o.includes('.'))) bad.push(q.prompt);
        if (opts.some((o) => numbersIn(o)[0] > 100000)) bad.push(q.prompt);
        if (q.solution.includes('undefined') || q.hint.includes('undefined')) bad.push(q.prompt);
        if ((kind === 'nhan-nham' || kind === 'nhan' || kind === 'bai-nhan') && value !== x * y) {
          bad.push(q.prompt);
        }
        if (kind === 'nhan' && (x < 10000 || x > 99999)) bad.push(q.prompt);
        if (kind === 'chia-nham' && value !== x / y) bad.push(q.prompt);
        if (kind === 'chia' || kind === 'chia-du') {
          if (right !== divisionText(x, y)) bad.push(q.prompt);
          if (!q.solution.includes(`= ${right}.`)) bad.push(q.prompt);
          if (x < 10000 || x > 99999) bad.push(q.prompt);
        }
        if (kind === 'chia' && x % y !== 0) bad.push(q.prompt);
        if (kind === 'chia-du' && x % y === 0) bad.push(q.prompt);
        if (kind === 'bai-chia' && (x % y !== 0 || value !== x / y)) bad.push(q.prompt);
        if (kind === 'bai-du' && (value !== Math.floor(x / y) || extra !== x % y || extra === 0)) {
          bad.push(q.prompt);
        }
        if (kind === 'bieu-thuc') {
          const want = q.prompt.includes('+') ? x + y * z : (x / y) * z;
          if (value !== want || value > 99999) bad.push(q.prompt);
        }
        if (kind === 'bai-hai-buoc' && (value !== x + x * y || value > 99999)) bad.push(q.prompt);
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
