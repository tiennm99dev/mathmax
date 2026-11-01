import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { readNumber } from '#lib/core/kid/numbers.js';
import { optionText, weakLabels } from '#lib/core/kid/quiz.js';
import {
  KINDS,
  KIND_LABELS,
  buildRound,
  compareQuestion,
  extremesQuestion,
  makeQuestion,
  neighbourQuestion,
  placeQuestion,
  rayQuestion,
} from './engine.js';

/** @param {number} x @param {number} y */
const sign = (x, y) => (x === y ? '=' : x > y ? '>' : '<');

/** @param {string} text */
function evaluate(text) {
  const m = text.match(/(\d+) ([+−]) (\d+)/);
  if (!m) return NaN;
  return m[2] === '+' ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
}

const SPECIAL = /** @type {Record<string, number>} */ ({
  'số lớn nhất có hai chữ số': 99,
  'số tròn chục lớn nhất có hai chữ số': 90,
  'số bé nhất có hai chữ số': 10,
  'số tròn chục bé nhất có hai chữ số': 10,
});

/**
 * The right option worked out again from the prompt alone.
 * @param {import('#lib/core/kid/quiz.js').KidQuestion<any>} q
 * @returns {string}
 */
function recompute(q) {
  const p = q.prompt;
  const nums = (p.match(/\d+/g) ?? []).map(Number);
  if (p.startsWith('Số nào còn thiếu')) {
    const parts = p.slice(p.indexOf(':') + 1, -1).split(', ');
    const at = parts.findIndex((x) => x.trim() === '?');
    const vals = parts.map(Number);
    const i = vals.findIndex((v, k) => k < 4 && k !== at && k + 1 !== at);
    const step = vals[i + 1] - vals[i];
    return String(at > 0 ? vals[at - 1] + step : vals[at + 1] - step);
  }
  if (p.startsWith('Số gồm')) return String(10 * nums[0] + nums[1]);
  if (/^\d+ = \d+ \+ \?$/.test(p)) return String(nums[0] - nums[1]);
  if (p.startsWith('Số "')) {
    const words = p.slice(4, p.indexOf('"', 4));
    for (let n = 0; n <= 100; n++) if (readNumber(n) === words) return String(n);
    return '';
  }
  const near = p.match(/^Số (liền trước|liền sau) của (.+) là số nào\?$/);
  if (near) {
    const base = /^\d+$/.test(near[2]) ? Number(near[2]) : SPECIAL[near[2]];
    return String(near[1] === 'liền sau' ? base + 1 : base - 1);
  }
  if (p.startsWith('Chọn dấu đúng')) {
    const m = p.match(/: (.+) \.\.\. (\d+)$/);
    if (!m) return '';
    const left = /[+−]/.test(m[1]) ? evaluate(m[1]) : Number(m[1]);
    return sign(left, Number(m[2]));
  }
  if (p.startsWith('Trong các số')) {
    const list = nums;
    return String(p.includes('bé nhất') ? Math.min(...list) : Math.max(...list));
  }
  if (p.startsWith('Có các số')) return String(Math.min(...nums) + Math.max(...nums));
  return '';
}

/** @param {import('#lib/core/kid/quiz.js').KidQuestion<any>} q */
const wellFormed = (q) => {
  const texts = q.options.map(optionText);
  return (
    texts.length >= 2 &&
    new Set(texts).size === texts.length &&
    q.answer >= 0 &&
    q.answer < texts.length &&
    !q.hint.includes(`= ${texts[q.answer]}.`)
  );
};

describe('mixed practice of the review chapter', () => {
  it('builds the same round from the same seed', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
    expect(buildRound(1)).not.toEqual(buildRound(2));
  });

  it('asks each kind twice', () => {
    const round = buildRound(7);
    expect(round).toHaveLength(KINDS.length * 2);
    const missing = KINDS.filter((k) => round.filter((q) => q.kind === k).length !== 2);
    expect(missing).toEqual([]);
  });

  it('stores answers that match the prompt', () => {
    const rand = rng(11);
    const makers = [
      rayQuestion,
      placeQuestion,
      neighbourQuestion,
      compareQuestion,
      extremesQuestion,
    ];
    const bad = [];
    for (let i = 0; i < 1000; i++) {
      const q = makers[i % makers.length](rand);
      const right = recompute(q);
      if (right !== '' && right !== optionText(q.options[q.answer])) bad.push(q);
      if (!wellFormed(q)) bad.push(q);
    }
    expect(bad).toEqual([]);
  });

  it('keeps every number of a question within 100, sums without carrying', () => {
    const rand = rng(5);
    const bad = [];
    for (let i = 0; i < 600; i++) {
      const q = makeQuestion(KINDS[i % KINDS.length], rand);
      const text = `${q.prompt} ${q.options.map(optionText).join(' ')}`;
      if ((text.match(/\d+/g) ?? []).some((n) => Number(n) > 99)) bad.push(q);
      if (!wellFormed(q)) bad.push(q);
      if (q.prompt.startsWith('Có các số')) {
        const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
        if ((Math.min(...nums) % 10) + (Math.max(...nums) % 10) > 9) bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });

  it('hides exactly one number of the ray shown', () => {
    const rand = rng(3);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const q = rayQuestion(rand);
      const v = q.visual;
      if (v?.type !== 'ray') {
        bad.push(q);
        continue;
      }
      const at = v.numbers.indexOf(null);
      if (v.numbers.filter((n) => n === null).length !== 1 || at < 1 || at > 3) bad.push(q);
      const [lo, hi] = [Number(v.numbers[at - 1]), Number(v.numbers[at + 1])];
      if ((lo + hi) / 2 !== Number(q.options[q.answer])) bad.push(q);
    }
    expect(bad).toEqual([]);
  });

  it('names the kinds missed at the first try', () => {
    const round = buildRound(4);
    expect(
      weakLabels(
        round,
        round.map((q) => q.kind !== 'lien-ke'),
        KIND_LABELS,
      ),
    ).toEqual(['Số liền trước, số liền sau']);
  });
});
