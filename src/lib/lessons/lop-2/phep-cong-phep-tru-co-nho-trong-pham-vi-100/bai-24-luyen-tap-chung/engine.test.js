import { describe, expect, it } from 'vitest';
import { optionText, weakLabels } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { isCarry } from '../_shared/carry.js';
import { KINDS, KIND_LABELS, buildRound, differenceOptions } from './engine.js';

/**
 * A calculation worked from left to right.
 * @param {string} text such as "25 + 65 − 30"
 */
function value(text) {
  const tokens = text.trim().split(' ');
  let total = Number(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    total += (tokens[i] === '+' ? 1 : -1) * Number(tokens[i + 1]);
  }
  return total;
}

/**
 * The right option worked out again from the prompt and options alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const p = q.prompt;
  const texts = q.options.map(optionText);
  /** @param {string[]} fits */
  const only = (fits) => (fits.length === 1 ? fits[0] : 'several');
  if (p.startsWith('Chọn chữ số thích hợp: ')) {
    const [left, sign, right] = p
      .slice('Chọn chữ số thích hợp: '.length)
      .match(/^(.+) ([<>]) (\d)□$/)
      ?.slice(1) ?? ['', '', ''];
    const x = value(left);
    return only(
      texts.filter((d) => {
        const y = Number(right + d);
        return sign === '>' ? x > y : x < y;
      }),
    );
  }
  if (p.startsWith('Phép trừ nào')) {
    const [lo, hi] = (p.match(/\d+/g) ?? []).map(Number);
    return only(
      texts.filter((t) => {
        const x = value(t);
        return x > lo && x < hi;
      }),
    );
  }
  if (p.endsWith(' = ?')) {
    return String(value(p.replace('Đặt tính rồi tính: ', '').replace(' = ?', '')));
  }
  const [a, b] = (p.match(/\d+/g) ?? []).map(Number);
  return String(p.includes('tất cả') ? a + b : a - b);
}

describe('the mixed practice round of the chapter', () => {
  it('asks each kind twice and every answer checks out', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const round = buildRound(seed);
      if (round.length !== 2 * KINDS.length) bad.push([seed, 'length']);
      for (const k of KINDS) {
        if (round.filter((q) => q.kind === k).length !== 2) bad.push([seed, 'kind', k]);
      }
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts[q.answer] !== recompute(q)) bad.push([seed, q.prompt, texts]);
        if (new Set(texts).size !== texts.length || texts.length < 3)
          bad.push([seed, 'options', q.prompt, texts]);
        if (q.hint.includes(`= ${texts[q.answer]}.`)) bad.push([seed, 'hint', q.hint]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps every number within 100 and every column calculation carrying', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const nums = [q.prompt, ...q.options.map(optionText), q.solution].flatMap((t) =>
          (t.match(/\d+/g) ?? []).map(Number),
        );
        if (nums.some((n) => n > 99)) bad.push(q.prompt);
        if (q.visual && !isCarry(q.visual.a, q.visual.b, q.visual.op)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('makes every option of a between question a carrying subtraction', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        if (!q.prompt.startsWith('Phép trừ nào')) continue;
        for (const t of q.options.map(optionText)) {
          const [a, b] = t.split(` ${MINUS} `).map(Number);
          if (!isCarry(a, b, '-')) bad.push(t);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('asks both comparison questions over the rounds', () => {
    const prompts = [];
    for (let seed = 1; seed <= 20; seed++) {
      prompts.push(...buildRound(seed).filter((q) => q.kind === 'so-sanh'));
    }
    expect(prompts.some((q) => q.prompt.includes('□'))).toBe(true);
    expect(prompts.some((q) => q.prompt.startsWith('Phép trừ nào'))).toBe(true);
  });

  it('offers the forgotten carry among the options', () => {
    const { options, answer } = differenceOptions(() => 0.5, 25);
    expect(options[answer]).toBe('25');
    expect(options).toContain('35');
  });

  it('builds the same first round on server and browser, and names weak parts', () => {
    const round = buildRound(1);
    expect(buildRound(1)).toEqual(round);
    const firstTry = round.map((q) => q.kind !== 'ba-so');
    expect(weakLabels(round, firstTry, KIND_LABELS)).toEqual([KIND_LABELS['ba-so']]);
  });
});
