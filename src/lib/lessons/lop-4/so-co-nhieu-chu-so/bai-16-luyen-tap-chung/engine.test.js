import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { GROUP } from '#lib/core/number-format.js';
import { readBig } from '../_shared/big-numbers.js';
import { KIND_LABELS, buildRound, slipOptions } from './engine.js';

/** @param {string} text */
const numbersIn = (text) =>
  (text.match(new RegExp(`\\d+(?:${GROUP}\\d{3})*`, 'g')) ?? []).map((s) =>
    Number(s.replaceAll(GROUP, '')),
  );

const PLACES = [
  'đơn vị',
  'chục',
  'trăm',
  'nghìn',
  'chục nghìn',
  'trăm nghìn',
  'triệu',
  'chục triệu',
  'trăm triệu',
];
const CLASSES = ['đơn vị', 'nghìn', 'triệu'];

/**
 * The place of the only `digit` in `n`, worked out from the written digits.
 * @param {number} n
 * @param {number} digit
 */
function placeOf(n, digit) {
  const text = String(n);
  return text.length - 1 - text.indexOf(String(digit));
}

describe('slip options', () => {
  it('keeps the right answer among up to four increasing numbers', () => {
    const { options, answer } = slipOptions(5000000, [5000000, -1, 4900000]);
    expect(options[answer]).toBe(`5${GROUP}000${GROUP}000`);
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
        if (opts.some((o) => numbersIn(o).some((n) => n > 999999999))) fail();
        if (kind === 'doc-viet') {
          const words = q.prompt.match(/"(.+)"/)?.[1];
          if (
            readBig(value) !== words ||
            opts.filter((o) => readBig(numbersIn(o)[0]) === words).length !== 1
          )
            fail();
        }
        if (kind === 'tong-hang' && value !== nums.reduce((s, v) => s + v, 0)) fail();
        if (kind === 'gia-tri') {
          const [n, digit] = nums;
          if (value !== digit * 10 ** placeOf(n, digit)) fail();
        }
        if (kind === 'hang-lop') {
          const [n, digit] = nums;
          const exp = placeOf(n, digit);
          if (right !== `Hàng ${PLACES[exp]}, lớp ${CLASSES[Math.floor(exp / 3)]}`) fail();
        }
        if (kind === 'lam-tron') {
          const n = nums[0];
          const low = Math.floor(n / 100000) * 100000;
          if (value !== (n % 100000 >= 50000 ? low + 100000 : low)) fail();
        }
        if (kind === 'so-sanh') {
          const list = nums.slice(0, 4);
          const want = q.prompt.includes('lớn nhất') ? Math.max(...list) : Math.min(...list);
          if (list.length !== 4 || value !== want) fail();
        }
        if (kind === 'lien-ke') {
          const n = nums[0];
          if (value !== (q.prompt.includes('liền sau') ? n + 1 : n - 1)) fail();
        }
        if (kind === 'day-so') {
          const parts = q.prompt.split(': ')[1].split('; ');
          const gap = parts.indexOf('?');
          const at = (/** @type {number} */ i) => numbersIn(parts[i])[0];
          const step = at(1) - at(0) || at(gap - 1) - at(gap - 2);
          if (gap < 2 || value !== at(gap - 1) + step) fail();
          if (gap < parts.length - 1 && at(gap + 1) !== value + step) fail();
        }
        if (kind === 'thuc-te') {
          const books = nums;
          const want = q.prompt.includes('nhiều sách') ? Math.max(...books) : Math.min(...books);
          const named = q.prompt.split('; ').find((s) => numbersIn(s)[0] === want) ?? '';
          if (!named.includes(right) || new Set(books).size !== 3) fail();
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
