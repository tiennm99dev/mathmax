import { describe, expect, it } from 'vitest';
import { GROUP } from '#lib/core/number-format.js';
import { optionText, questionKey } from '#lib/core/kid/quiz.js';
import { readTo10000, roundTo, toRoman } from '../_shared/numbers-to-10000.js';
import {
  KINDS,
  KIND_LABELS,
  ROUND_LENGTH,
  STORIES,
  buildRound,
  closePair,
  digitSlips,
  sumSlips,
  withZeros,
} from './engine.js';
import { rng } from '#lib/core/drill.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

/** Text with the group spaces of numbers taken out. @param {string} text */
const plain = (text) => text.replaceAll(GROUP, '');

/** Every whole number in a text, in order. @param {string} text */
const numbersIn = (text) => (plain(text).match(/\d+/g) ?? []).map(Number);

/** Adds up "3 000 + 800 + 2". @param {string} text */
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
      if (q.prompt.includes('đọc là gì')) return readTo10000(nums[0]);
      return String(options.map(Number).find((v) => q.prompt.includes(`"${readTo10000(v)}"`)));
    case 'hang': {
      const n = String(nums[0]);
      if (q.prompt.startsWith('Trong số')) {
        const at = n.indexOf(String(nums[1]));
        return ['Hàng nghìn', 'Hàng trăm', 'Hàng chục', 'Hàng đơn vị'][at];
      }
      const place = ['nghìn', 'trăm', 'chục', 'đơn vị'].findIndex((w) =>
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
    case 'la-ma': {
      if (q.prompt.startsWith('Số La Mã')) {
        const roman = q.prompt.split(' ')[3];
        return String(
          Array.from({ length: 30 }, (_, i) => i + 1).find((v) => toRoman(v) === roman),
        );
      }
      return toRoman(nums[0]);
    }
    case 'lam-tron':
      return String(roundTo(nums[0], q.prompt.includes('hàng chục') ? 10 : 100));
    case 'bai-toan':
      if (q.prompt.includes('Thư viện')) return String(roundTo(nums[0], 100));
      if (q.prompt.includes('thùng vở')) {
        return String(nums[0] * 1000 + nums[2] * 100 + nums[4] * 10 + nums[6]);
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
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'bai-toan' || !q.prompt.includes('hơn?')) continue;
        const story = STORIES.find((s) => q.prompt.startsWith(s.first));
        if (!story) {
          bad.push(['story', q.prompt]);
          continue;
        }
        const [a, b] = numbersIn(q.prompt);
        const firstWins = story.more ? a > b : a < b;
        const picked = optionText(q.options[q.answer]);
        if ((picked === story.first) !== firstWins) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('starts the same for every visitor', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});

describe('number helpers', () => {
  it('writes numbers of four digits, often with a zero', () => {
    const rand = rng(7);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const n = withZeros(rand);
      if (n < 1000 || n > 9999) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('makes wrong numbers of four digits only', () => {
    const rand = rng(3);
    const bad = [];
    for (const n of [1000, 4007, 9999, 6302, 1010]) {
      const slips = digitSlips(rand, n);
      if (slips.some((v) => v < 1000 || v > 9999 || v === n)) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('moves one part of a sum to the wrong place', () => {
    expect(sumSlips(5701)).not.toContain('5 000 + 700 + 1');
    expect(sumSlips(6008).length).toBeGreaterThan(0);
  });

  it('pairs numbers that differ at one place or are equal', () => {
    const rand = rng(11);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const [a, b] = closePair(rand);
      if (a < 900 || a > 10000 || b < 900 || b > 10000) bad.push([a, b]);
    }
    expect(bad).toEqual([]);
  });
});
