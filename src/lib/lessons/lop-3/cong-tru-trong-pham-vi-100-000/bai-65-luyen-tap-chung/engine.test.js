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
 * The value of the expression in a prompt such as "Tính nhẩm: 40 000 + 20 000 = ?"
 * or "… 75 000 − (12 000 + 8 000) = ?", worked out independently of the engine.
 * @param {string} prompt
 */
function valueOf(prompt) {
  const expr = (prompt.split(':')[1] ?? '').split('=')[0].replaceAll(GROUP, '');
  /** @type {string[]} */
  const tokens = expr.match(/\d+|[+−()]/g) ?? [];
  let i = 0;
  /** @returns {number} */
  const term = () => {
    const t = tokens[i++];
    if (t === '(') {
      const v = sum();
      i++;
      return v;
    }
    return Number(t);
  };
  /** @returns {number} */
  const sum = () => {
    let v = term();
    while (tokens[i] === '+' || tokens[i] === '−')
      v = tokens[i++] === '+' ? v + term() : v - term();
    return v;
  };
  return sum();
}

const EXPRESSION_KINDS = ['cong-nham', 'tru-nham', 'cong', 'tru', 'bieu-thuc'];

describe('the round', () => {
  it('has one question of each part', () => {
    const kinds = buildRound(1).map((q) => q.kind);
    expect(kinds.toSorted()).toEqual(Object.keys(KIND_LABELS).toSorted());
  });

  it('works out an expression with brackets', () => {
    expect(valueOf(`Tính: 75${GROUP}000 − (12${GROUP}000 + 8${GROUP}000) = ?`)).toBe(55000);
  });

  it('stores the answers that the numbers of the prompt give', () => {
    const bad = [];
    for (let seed = 1; seed <= 400; seed++) {
      for (const q of buildRound(seed)) {
        const opts = q.options.map(optionText);
        const right = optionText(q.options[q.answer]);
        const [x, y, z] = numbersIn(q.prompt);
        const value = numbersIn(right)[0];
        const kind = q.kind ?? '';
        if (new Set(opts).size !== opts.length || opts.length < 3) bad.push(q.prompt);
        if (opts.some((o) => o.includes('-') || o.includes('.'))) bad.push(q.prompt);
        if (q.solution.includes('undefined') || q.hint.includes('undefined')) bad.push(q.prompt);
        if (EXPRESSION_KINDS.includes(kind) && value !== valueOf(q.prompt)) bad.push(q.prompt);
        if (kind === 'thu-lai') {
          const [a, b] = numbersIn(right);
          if (a !== z || b !== y || x - y !== z) bad.push(q.prompt);
        }
        if (kind === 'bai-hon') {
          const want = q.prompt.includes('nhiều hơn') ? x + y : x - y;
          if (value !== want) bad.push(q.prompt);
        }
        if (kind === 'bai-hai-buoc' && (value !== x - y - z || value <= 0)) bad.push(q.prompt);
        if (kind !== 'thu-lai' && (value > 100000 || value <= 0)) bad.push(q.prompt);
        if (numbersIn(q.prompt).some((n) => n > 100000)) bad.push(q.prompt);
        if (opts.some((o) => numbersIn(o).some((n) => n > 100000 || n === 0))) bad.push(q.prompt);
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
