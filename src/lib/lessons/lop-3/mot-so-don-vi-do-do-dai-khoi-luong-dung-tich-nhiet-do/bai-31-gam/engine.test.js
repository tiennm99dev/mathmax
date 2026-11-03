import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { optionText } from '#lib/core/kid/quiz.js';
import {
  FIRST_TARGET,
  KIND_LABELS,
  THINGS,
  buildRound,
  fits,
  makeTarget,
  plateGrams,
  reachable,
  weighMessage,
} from './engine.js';

describe('the things on the scale', () => {
  it('reaches every task target and adds up what lies on the plate', () => {
    expect(reachable(FIRST_TARGET)).toBe(true);
    expect(reachable(1000)).toBe(true);
    expect(plateGrams(['apple', 'orange'])).toBe(350);
    expect(plateGrams([])).toBe(0);
  });

  it('never lets the plate pass the last mark', () => {
    const grapes = THINGS.find((t) => t.id === 'grapes');
    expect(grapes && fits(['block', 'orange', 'banana'], grapes)).toBe(false);
    expect(grapes && fits(['block', 'orange'], grapes)).toBe(true);
  });

  it('says where the needle stands', () => {
    expect(weighMessage(350, 0)).toContain('còn trống');
    expect(weighMessage(350, 200)).toContain('chưa đến 350 g');
    expect(weighMessage(350, 500)).toContain('quá 350 g');
    expect(weighMessage(350, 350)).toBe('Đúng rồi! Kim chỉ 350 g.');
    expect(weighMessage(1000, 1000)).toContain('đúng bằng 1 kg');
  });

  it('makes reachable targets, different from the one on screen', () => {
    const rand = rng(31);
    const bad = [];
    for (let i = 0; i < 100; i++) {
      const t = makeTarget(rand, FIRST_TARGET);
      if (t === FIRST_TARGET || !reachable(t) || t > 1000 || t % 50 !== 0) bad.push(t);
    }
    expect(bad).toEqual([]);
  });
});

describe('the practice round', () => {
  it('holds eight sound questions on every seed', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildRound(seed);
      if (round.length !== 8) bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (
          !q.kind ||
          !(q.kind in KIND_LABELS) ||
          q.answer < 0 ||
          new Set(texts).size !== texts.length ||
          texts.length < 2 ||
          q.hint.includes(texts[q.answer])
        ) {
          bad.push({ seed, q });
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('stays within the numbers up to 1 000 this grade has met', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const text = [q.prompt, q.solution, ...q.options.map(optionText)].join(' ');
        const numbers = text.replaceAll(GROUP, '').match(/\d+/g) ?? [];
        if (numbers.some((v) => Number(v) > 1000)) bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps every stored answer right', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]).replaceAll(GROUP, '');
        const n = parseInt(right, 10);
        if (q.visual && n !== q.visual.g) bad.push(q);
        const have = /^Đĩa cân có (\d+) g\./.exec(q.prompt);
        if (have && n !== 1000 - Number(have[1])) bad.push(q);
        const sum = /^(\d+) g ([+−×]) (\d+)( g)? = /.exec(q.prompt);
        if (sum) {
          const [a, b] = [Number(sum[1]), Number(sum[3])];
          const value = sum[2] === '+' ? a + b : sum[2] === '−' ? a - b : a * b;
          if (n !== value) bad.push(q);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
