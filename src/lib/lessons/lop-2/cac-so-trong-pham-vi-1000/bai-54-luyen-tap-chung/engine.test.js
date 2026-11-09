import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText, questionKey } from '#lib/core/kid/quiz.js';
import { readTo1000 } from '#lib/core/kid/place-value.js';
import {
  KINDS,
  KIND_LABELS,
  STORIES,
  buildRound,
  digitSlips,
  lineLabel,
  pileLabel,
  sumSlips,
  tickText,
} from './engine.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);

/**
 * Adds up "300 + 40 + 5".
 * @param {string} text
 */
const addUp = (text) => text.split(' + ').reduce((sum, part) => sum + Number(part), 0);

/**
 * The right option worked out again from the question alone.
 * @param {import('./engine.js').Question} q
 * @returns {string | null}
 */
function recompute(q) {
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  switch (q.kind) {
    case 'khoi': {
      if (q.visual?.type !== 'pile') return null;
      const { hundreds, tens, ones } = q.visual;
      return String(hundreds * 100 + tens * 10 + ones);
    }
    case 'tia': {
      if (q.visual?.type !== 'line') return null;
      return String(q.visual.start + q.visual.step * q.visual.hidden);
    }
    case 'lien':
      return String(q.prompt.includes('liền sau') ? nums[0] + 1 : nums[0] - 1);
    case 'dau':
      if (nums[0] === nums[1]) return '=';
      return nums[0] > nums[1] ? '>' : '<';
    case 'lon-be': {
      const values = q.options.map((o) => Number(optionText(o)));
      return String(q.prompt.includes('lớn nhất') ? Math.max(...values) : Math.min(...values));
    }
    case 'so-voi': {
      const pivot = nums.at(-1) ?? 0;
      const list = nums.slice(0, -1);
      const above = q.prompt.includes('lớn hơn');
      return String(list.filter((v) => (above ? v > pivot : v < pivot)).length);
    }
    case 'tong':
      return q.prompt.endsWith('= ?') ? String(addUp(q.prompt.replace(' = ?', ''))) : null;
    case 'doc':
      return q.prompt.includes('đọc là') ? readTo1000(nums[0]) : null;
    default:
      return null;
  }
}

describe('the mixed round', () => {
  it('covers every kind with fourteen different questions', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const round = buildRound(seed);
      if (new Set(round.map((q) => q.kind)).size !== KINDS.length) bad.push(['kinds', seed]);
      if (round.length !== 14) bad.push(['length', seed]);
      if (new Set(round.map(questionKey)).size !== round.length) bad.push(['repeat', seed]);
    }
    expect(bad).toEqual([]);
    expect(Object.keys(KIND_LABELS)).toEqual(KINDS);
  });

  it('stores the answer the question asks for, across many seeds', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map(optionText);
        const expected = recompute(q);
        if (expected !== null && texts[q.answer] !== expected) {
          bad.push(`${q.prompt} → ${texts[q.answer]}`);
        }
        if (new Set(texts).size !== texts.length || texts.length < 2) bad.push(texts.join('/'));
        if (q.answer < 0 || q.answer >= texts.length) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes the number that is read and the right sum', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        if (q.kind === 'doc' && q.prompt.includes('viết là')) {
          const reading = q.prompt.match(/"(.+)"/)?.[1];
          if (readTo1000(Number(right)) !== reading) bad.push(q.prompt);
        }
        if (q.kind === 'tong' && q.prompt.includes('bằng tổng')) {
          const n = Number(q.prompt.match(/\d+/)?.[0]);
          if (addUp(right) !== n) bad.push(q.prompt);
          const wrongEqual = q.options.map(optionText).filter((o) => o !== right && addUp(o) === n);
          if (wrongEqual.length > 0) bad.push(wrongEqual.join());
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('points at the digit asked for', () => {
    const bad = [];
    const places = { 'hàng trăm': 0, 'hàng chục': 1, 'hàng đơn vị': 2 };
    for (const seed of SEEDS) {
      for (const q of buildRound(seed).filter((x) => x.kind === 'hang')) {
        const right = optionText(q.options[q.answer]);
        const digits = [...(q.prompt.match(/\d+/g) ?? [])];
        if (q.prompt.startsWith('Trong số')) {
          const at = digits[0].indexOf(digits[1]);
          if (places[/** @type {keyof typeof places} */ (right.toLowerCase())] !== at) {
            bad.push(q.prompt);
          }
        } else {
          const name = Object.keys(places).find((p) => q.prompt.includes(p));
          const at = places[/** @type {keyof typeof places} */ (name)];
          if (digits[0][at] !== right) bad.push(q.prompt);
        }
        if (new Set(digits[0]).size !== 3) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('answers the stories from the two amounts', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed).filter((x) => x.kind === 'bai-toan')) {
        const right = optionText(q.options[q.answer]);
        const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
        const story = STORIES.find((s) => s.ask && q.prompt.endsWith(s.ask));
        if (story) {
          const firstWins = story.more ? nums[0] > nums[1] : nums[0] < nums[1];
          if (right !== (firstWins ? story.first : story.second)) bad.push(q.prompt);
          if (nums[0] === nums[1]) bad.push(q.prompt);
        } else if (Number(right) !== nums[0] * 100 + nums[2] * 10 + nums[4]) {
          bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never gives the answer away in a hint', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        if (/^\d{3,}$/.test(right) && q.hint.includes(right)) bad.push(q.hint);
      }
    }
    expect(bad).toEqual([]);
  });

  it('is the same for the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});

describe('wrong options', () => {
  it('offers three different three-digit slips for any number', () => {
    const rand = rng(3);
    const bad = [];
    for (let n = 100; n <= 999; n += 7) {
      const slips = digitSlips(rand, n);
      if (slips.length !== 3 || new Set(slips).size !== 3 || slips.includes(n)) bad.push(n);
      if (slips.some((v) => v < 100 || v > 999)) bad.push(n);
    }
    expect(bad).toEqual([]);
  });

  it('moves a part of a sum to the wrong place', () => {
    expect(sumSlips(408)).toEqual(['40 + 8', '400 + 80']);
    expect(sumSlips(345)).toContain('300 + 4 + 5');
    expect(sumSlips(345)).not.toContain('300 + 40 + 5');
  });
});

describe('the pictures', () => {
  const line = /** @type {const} */ ({ type: 'line', start: 360, step: 1, count: 6, hidden: 3 });

  it('hides the number on the line until the question ends', () => {
    expect(tickText(line, 363, false)).toBe('?');
    expect(tickText(line, 363, true)).toBe('363');
    expect(tickText(line, 362, false)).toBe('362');
    expect(lineLabel(line, false)).toBe('Tia số có các vạch: 360, 361, 362, số bị che, 364, 365');
    expect(lineLabel(line, true)).toContain('363');
  });

  it('lets the blocks be counted, and gives the totals only at the end', () => {
    const pile = /** @type {const} */ ({ type: 'pile', hundreds: 2, tens: 0, ones: 1 });
    expect(pileLabel(pile, false)).toBe('tấm trăm, tấm trăm, khối đơn vị');
    expect(pileLabel(pile, true)).toBe('2 tấm trăm, 1 khối đơn vị');
  });
});
