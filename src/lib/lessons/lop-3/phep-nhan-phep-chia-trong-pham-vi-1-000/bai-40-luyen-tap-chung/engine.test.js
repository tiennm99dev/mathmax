import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { valueOf } from '../_shared/expression.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @param {string} text */
const numbersIn = (text) => (text.match(/\d+/g) ?? []).map(Number);

/**
 * The right text of a division.
 * @param {number} n
 * @param {number} d
 */
function divisionText(n, d) {
  const q = Math.floor(n / d);
  return n % d > 0 ? `${q} (dư ${n % d})` : String(q);
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
        const [x, y] = numbersIn(q.prompt);
        if (new Set(opts).size !== opts.length || opts.length < 3) bad.push(q.prompt);
        if (opts.some((o) => o.includes('-') || o.includes('.'))) bad.push(q.prompt);
        if (q.solution.includes('undefined') || q.hint.includes('undefined')) bad.push(q.prompt);
        if (q.kind === 'nhan' || q.kind === 'nhan-nho' || q.kind === 'bai-nhan') {
          if (Number(right) !== x * y || x * y > 999) bad.push(q.prompt);
        }
        if (q.kind === 'nham') {
          const want = q.prompt.includes('×') ? x * y : x / y;
          if (Number(right) !== want || want > 999) bad.push(q.prompt);
        }
        if (['chia', 'chia-du', 'chia-0', 'chia-hai-so'].includes(q.kind ?? '')) {
          if (right !== divisionText(x, y)) bad.push(q.prompt);
          if (!q.solution.includes(`= ${right}.`)) bad.push(q.prompt);
        }
        if (['trai-phai', 'nhan-chia', 'ngoac'].includes(q.kind ?? '')) {
          const text = q.prompt.replace('Tính giá trị của biểu thức: ', '').replace(/\.$/, '');
          const value = valueOf(text);
          if (Number(right) !== value || !Number.isInteger(value) || value < 0) bad.push(q.prompt);
          const steps = q.solution.replace(/\.$/, '').split(' = ');
          if (Number(steps.at(-1)) !== value || steps[0] !== text) bad.push(q.prompt);
        }
        if (q.kind === 'gap-may-lan' && Number(right) !== x / y) bad.push(q.prompt);
        if (q.kind === 'bai-chia') {
          const [count, left] = numbersIn(right);
          if (count * y + left !== x || left >= y || left === 0) bad.push(q.prompt);
          if (opts.some((o) => numbersIn(o)[1] === 0)) bad.push(q.prompt);
        }
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
