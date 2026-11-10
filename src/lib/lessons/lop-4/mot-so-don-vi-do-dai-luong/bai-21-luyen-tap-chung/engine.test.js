import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { GROUP } from '#lib/core/number-format.js';
import { KIND_LABELS, buildRound, slipOptions } from './engine.js';

/** @param {string} text */
const numbersIn = (text) =>
  (text.match(new RegExp(`\\d+(?:${GROUP}\\d{3})*`, 'g')) ?? []).map((s) =>
    Number(s.replaceAll(GROUP, '')),
  );

/** Size of each unit in its quantity's smallest unit. */
const SIZE = /** @type {Record<string, number>} */ ({
  kg: 1,
  yến: 10,
  tạ: 100,
  tấn: 1000,
  'mm²': 1,
  'cm²': 100,
  'dm²': 10000,
  'm²': 1000000,
  giây: 1,
  phút: 60,
});

/**
 * An amount written with units ('3 tấn 2 tạ 5 kg', '2 phút 5 giây') in the
 * smallest unit.
 * @param {string} text
 */
function amount(text) {
  let total = 0;
  for (const m of text.matchAll(new RegExp(`(\\d+(?:${GROUP}\\d{3})*) (\\S+)`, 'g'))) {
    total += Number(m[1].replaceAll(GROUP, '')) * SIZE[m[2]];
  }
  return total;
}

/**
 * Roman numeral to number, for numerals up to XXXIX.
 * @param {string} r
 */
function fromRoman(r) {
  const v = /** @type {Record<string, number>} */ ({ I: 1, V: 5, X: 10 });
  let n = 0;
  for (let i = 0; i < r.length; i++) {
    const cur = v[r[i]];
    n += i + 1 < r.length && v[r[i + 1]] > cur ? -cur : cur;
  }
  return n;
}

describe('slip options', () => {
  it('keeps the right answer among increasing options with the unit', () => {
    const { options, answer } = slipOptions(40, [4, 400, 40, -1], 'yến');
    expect(options).toEqual(['4 yến', '40 yến', '400 yến']);
    expect(answer).toBe(1);
  });
});

describe('the round', () => {
  it('has one question of each part', () => {
    expect(
      buildRound(3)
        .map((q) => q.kind)
        .toSorted(),
    ).toEqual(Object.keys(KIND_LABELS).toSorted());
  });

  it('stores the answers that the prompts give', () => {
    /** @type {string[]} */
    const bad = [];
    for (let seed = 1; seed <= 300; seed++) {
      for (const q of buildRound(seed)) {
        const opts = q.options.map(optionText);
        const right = optionText(q.options[q.answer]);
        const kind = q.kind ?? '';
        const fail = () => bad.push(`${kind}: ${q.prompt} → ${right}`);
        if (new Set(opts).size !== opts.length || opts.length < 3) fail();
        if (/undefined|NaN/.test(q.solution + q.hint + q.prompt + opts.join())) fail();
        if (right.length > 2 && q.hint.includes(right)) fail();
        if (['khoi-luong-ra-kg', 'doi-khoi-luong', 'dien-tich', 'giay'].includes(kind)) {
          const [given, asked] = q.prompt.split(' = ');
          const unit = asked.replace('? ', '');
          if (amount(given) !== amount(right) || !right.endsWith(` ${unit}`)) fail();
        }
        if (kind === 'tinh-khoi-luong') {
          const [a, b] = numbersIn(q.prompt);
          const op = q.prompt.includes('+') ? a + b : q.prompt.includes('−') ? a - b : a * b;
          if (numbersIn(right)[0] !== op) fail();
        }
        if (kind === 'the-ki') {
          const year = numbersIn(q.prompt)[0];
          if (fromRoman(right) !== Math.ceil(year / 100)) fail();
        }
        if (kind === 'so-sanh') {
          const [left, other] = q.prompt.split(' ? ');
          const l = amount(left);
          const r = amount(other);
          if (right !== (l > r ? '>' : l < r ? '<' : '=')) fail();
        }
        if (kind === 'thuc-te') {
          const [tan, ta] = numbersIn(q.prompt);
          if (numbersIn(right)[0] !== tan * 10 + ta) fail();
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
