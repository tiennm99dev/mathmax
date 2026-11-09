import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { optionText, questionKey } from '#lib/core/kid/quiz.js';
import { readTo100000, roundTo } from '../_shared/numbers-to-100000.js';
import {
  KINDS,
  KIND_LABELS,
  ROUND_LENGTH,
  STORIES,
  buildRound,
  closePair,
  digitSlips,
  roundingSlips,
  sumSlips,
  withZeros,
} from './engine.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

/** Text with the group spaces of numbers taken out. @param {string} text */
const plain = (text) => text.replaceAll(GROUP, '');

/** Every whole number in a text, in order. @param {string} text */
const numbersIn = (text) => (plain(text).match(/\d+/g) ?? []).map(Number);

/** Adds up "40 000 + 800 + 2". @param {string} text */
const addUp = (text) =>
  plain(text)
    .split(' + ')
    .reduce((sum, part) => sum + Number(part), 0);

/**
 * The right option worked out again from the question alone, or null when
 * the prompt does not say enough.
 * @param {import('./engine.js').Question} q
 * @returns {string | null}
 */
function recompute(q) {
  const nums = numbersIn(q.prompt);
  const options = q.options.map((o) => plain(optionText(o)));
  switch (q.kind) {
    case 'doc':
      if (q.prompt.includes('đọc là gì')) return readTo100000(nums[0]);
      return String(options.map(Number).find((v) => q.prompt.includes(`"${readTo100000(v)}"`)));
    case 'hang': {
      const n = String(nums[0]);
      if (q.prompt.startsWith('Trong số')) {
        const at = n.indexOf(String(nums[1]));
        return ['Hàng chục nghìn', 'Hàng nghìn', 'Hàng trăm', 'Hàng chục', 'Hàng đơn vị'][at];
      }
      const place = ['chục nghìn', 'nghìn', 'trăm', 'chục', 'đơn vị'].findIndex((w) =>
        q.prompt.includes(`hàng ${w} của`),
      );
      return n[place];
    }
    case 'tong':
      if (q.prompt.endsWith('= ?')) return String(addUp(q.prompt.replace(' = ?', '')));
      return options.find((o) => addUp(o) === nums[0]) ?? null;
    case 'lien':
      return String(q.prompt.includes('liền sau') ? nums[0] + 1 : nums[0] - 1);
    case 'dau':
      if (nums[0] === nums[1]) return '=';
      return nums[0] > nums[1] ? '>' : '<';
    case 'lon-be': {
      const values = options.map(Number);
      return String(q.prompt.includes('lớn nhất') ? Math.max(...values) : Math.min(...values));
    }
    case 'lam-tron':
      return String(roundTo(nums[0], q.prompt.includes('chục nghìn') ? 10000 : 1000));
    case 'bai-toan':
      if (q.prompt.includes('Sân vận động')) return String(roundTo(nums[0], 1000));
      if (q.prompt.includes('viên kẹo')) {
        return String(nums[0] * 10000 + nums[2] * 1000 + nums[4] * 100 + nums[6] * 10);
      }
      return null;
    default:
      return null;
  }
}

describe('the mixed round', () => {
  it('covers every kind with different questions', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const round = buildRound(seed);
      if (new Set(round.map((q) => q.kind)).size !== KINDS.length) bad.push(['kinds', seed]);
      if (round.length !== ROUND_LENGTH) bad.push(['length', seed]);
      if (new Set(round.map(questionKey)).size !== round.length) bad.push(['repeat', seed]);
    }
    expect(bad).toEqual([]);
    expect(Object.keys(KIND_LABELS)).toEqual(KINDS);
  });

  it('stores the answer the question asks for, across many seeds', () => {
    const bad = [];
    let checked = 0;
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map((o) => plain(optionText(o)));
        if (new Set(texts).size !== texts.length || texts.length < 2)
          bad.push(['options', q.prompt]);
        const right = recompute(q);
        if (right === null) continue;
        checked += 1;
        if (texts[q.answer] !== plain(right)) bad.push([q.prompt, texts[q.answer], right]);
      }
    }
    expect(bad).toEqual([]);
    expect(checked).toBeGreaterThan(SEEDS.length * 10);
  });

  it('settles the comparison stories by the sizes', () => {
    const bad = [];
    let seen = 0;
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'bai-toan' || !q.prompt.includes('hơn?')) continue;
        const story = STORIES.find((s) => q.prompt.startsWith(s.first));
        if (!story) {
          bad.push(['story', q.prompt]);
          continue;
        }
        seen += 1;
        const [a, b] = numbersIn(q.prompt);
        const firstWins = story.more ? a > b : a < b;
        const picked = optionText(q.options[q.answer]);
        if ((picked === story.first) !== firstWins) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
    expect(seen).toBeGreaterThan(0);
  });

  it('offers three numbers when rounding', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const rounding = q.kind === 'lam-tron' || q.prompt.includes('Làm tròn');
        if (rounding && q.options.length !== 3) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('starts the same for every visitor', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});

describe('number helpers', () => {
  it('gives two wrong roundings even when the other place rounds the same way', () => {
    expect(roundingSlips(69216, 1000)).toEqual([70000, 68000]);
    expect(roundingSlips(49580, 1000)).toEqual([49000, 48000]);
    expect(roundingSlips(95900, 10000)).toEqual([90000, 96000]);
    expect(roundingSlips(12000, 10000)).toEqual([20000, 12000]);
  });

  it('writes numbers of five digits, often with a zero', () => {
    const rand = rng(7);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const n = withZeros(rand);
      if (n < 10000 || n > 99999) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('makes three wrong numbers of five digits', () => {
    const rand = rng(3);
    const bad = [];
    for (const n of [10000, 40007, 99999, 60302, 10010]) {
      const slips = digitSlips(rand, n);
      if (slips.length !== 3 || slips.some((v) => v < 10000 || v > 99999 || v === n)) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('moves one part of a sum to the wrong place', () => {
    expect(sumSlips(50701).map(plain)).not.toContain('50000 + 700 + 1');
    expect(sumSlips(60008).length).toBeGreaterThan(0);
  });

  it('pairs numbers up to 100 000', () => {
    const rand = rng(11);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const [a, b] = closePair(rand);
      if (a < 9000 || a > 100000 || b < 9000 || b > 100000) bad.push([a, b]);
    }
    expect(bad).toEqual([]);
  });
});
