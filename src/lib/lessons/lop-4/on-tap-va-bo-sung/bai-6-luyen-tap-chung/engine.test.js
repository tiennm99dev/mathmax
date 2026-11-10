import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { GROUP } from '#lib/core/number-format.js';
import { KIND_LABELS, buildRound, slipOptions } from './engine.js';

/** @param {string} text */
const numbersIn = (text) =>
  (text.match(new RegExp(`\\d+(?:${GROUP}\\d{3})*`, 'g')) ?? []).map((s) =>
    Number(s.replaceAll(GROUP, '')),
  );

/**
 * The value of a whole-number expression such as "(9 000 − 1 000) × 3" or
 * "2 370 + 105 × 6", worked out independently of the engine.
 * @param {string} expr
 */
function evaluate(expr) {
  /** @type {string[]} */
  const tokens = expr.replaceAll(GROUP, '').match(/\d+|[+−×:()]/g) ?? [];
  let i = 0;
  /** @returns {number} */
  const atom = () => {
    const t = tokens[i++];
    if (t === '(') {
      const v = sum();
      i++;
      return v;
    }
    return Number(t);
  };
  /** @returns {number} */
  const product = () => {
    let v = atom();
    while (tokens[i] === '×' || tokens[i] === ':')
      v = tokens[i++] === '×' ? v * atom() : v / atom();
    return v;
  };
  /** @returns {number} */
  const sum = () => {
    let v = product();
    while (tokens[i] === '+' || tokens[i] === '−')
      v = tokens[i++] === '+' ? v + product() : v - product();
    return v;
  };
  return sum();
}

/**
 * The expression of a "c + m × n với c = …, m = …, n = …" prompt with the
 * letters replaced by their numbers.
 * @param {string} prompt
 */
function substituted(prompt) {
  const [, expr, given] = prompt.match(/biểu thức (.+) với (.+)\.$/) ?? [];
  let out = expr;
  for (const [, letter, value] of given.matchAll(new RegExp(`([a-z]) = ([\\d${GROUP}]+)`, 'g')))
    out = out.replaceAll(letter, value);
  return out;
}

describe('the expression reader', () => {
  it('multiplies before adding and works out brackets first', () => {
    expect(evaluate(`2${GROUP}370 + 105 × 6`)).toBe(3000);
    expect(evaluate(`(13${GROUP}640 − 5${GROUP}537) × 8`)).toBe(64824);
    expect(substituted(`Tính giá trị của biểu thức a + b − c với a = 539, b = 243, c = 135.`)).toBe(
      '539 + 243 − 135',
    );
  });
});

describe('slip options', () => {
  it('keeps the right answer among up to four increasing numbers', () => {
    const { options, answer } = slipOptions(9000, [41000, 9000, -5]);
    expect(options[answer]).toBe(`9${GROUP}000`);
    expect(options).toHaveLength(4);
    const values = options.map((o) => numbersIn(o)[0]);
    expect(values).toEqual(values.toSorted((x, y) => x - y));
  });
});

describe('the round', () => {
  it('has one question of each part', () => {
    const kinds = buildRound(1).map((q) => q.kind);
    expect(kinds.toSorted()).toEqual(Object.keys(KIND_LABELS).toSorted());
  });

  it('stores the answers that the numbers of the prompt give', () => {
    /** @type {string[]} */
    const bad = [];
    for (let seed = 1; seed <= 300; seed++) {
      for (const q of buildRound(seed)) {
        const opts = q.options.map(optionText);
        const right = optionText(q.options[q.answer]);
        const nums = numbersIn(q.prompt);
        const value = numbersIn(right)[0];
        const kind = q.kind ?? '';
        const fail = () => bad.push(`${kind}: ${q.prompt}`);
        if (new Set(opts).size !== opts.length || opts.length < 3) fail();
        if (q.solution.includes('undefined') || q.hint.includes('undefined')) fail();
        if (opts.some((o) => numbersIn(o).some((n) => n > 100000 || n === 0))) fail();
        if (kind === 'viet-so' && !q.solution.endsWith(`${right}.`)) fail();
        if (kind === 'so-sanh') {
          const list = nums.slice(0, 4);
          const want = q.prompt.includes('lớn nhất') ? Math.max(...list) : Math.min(...list);
          if (value !== want) fail();
        }
        if (kind === 'lam-tron') {
          const unit = q.prompt.includes('chục nghìn')
            ? 10000
            : q.prompt.includes('hàng nghìn')
              ? 1000
              : 10;
          const n = nums[0];
          const low = Math.floor(n / unit) * unit;
          if (value !== (n % unit >= unit / 2 ? low + unit : low)) fail();
        }
        if (kind === 'chan-le') {
          const want = q.prompt.includes('chẵn') ? 0 : 1;
          const parities = opts.map((o) => numbersIn(o)[0] % 2);
          if (value % 2 !== want || parities.filter((p) => p === want).length !== 1) fail();
        }
        if (kind === 'dat-tinh') {
          const expr = q.prompt.split(':').slice(1).join(':').split('=')[0];
          if (value !== evaluate(expr)) fail();
        }
        if (kind === 'thu-lai') {
          const [a, d, qt, r] = nums;
          if (evaluate(right) !== a || qt * d + r !== a || r >= d) fail();
        }
        if (kind === 'bieu-thuc' && value !== evaluate(substituted(q.prompt))) fail();
        if (kind === 'bai-hai-buoc') {
          const [total, women] = nums;
          if (value !== total - women - women || value <= 0) fail();
        }
        if (kind === 'bai-ba-buoc') {
          const [, pen, count, book, note] = nums;
          if (value !== note - pen - count * book || value <= 0) fail();
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never gives the answer away in a hint', () => {
    /** @type {string[]} */
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        if (right.length > 2 && q.hint.includes(right)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
