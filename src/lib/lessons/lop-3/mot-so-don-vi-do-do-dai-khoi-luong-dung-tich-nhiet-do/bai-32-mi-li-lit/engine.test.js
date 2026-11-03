import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { FIRST_TARGET, KIND_LABELS, buildRound, makeTarget, pour, pourMessage } from './engine.js';

describe('pouring into the cylinder', () => {
  it('stays between empty and full', () => {
    expect(pour(950, 100)).toBe(1000);
    expect(pour(50, -100)).toBe(0);
    expect(pour(200, 50)).toBe(250);
  });

  it('says where the water stands', () => {
    expect(pourMessage(300, 0)).toContain('còn trống');
    expect(pourMessage(300, 200)).toContain('chưa đến vạch 300 ml');
    expect(pourMessage(300, 400)).toContain('quá vạch 300 ml');
    expect(pourMessage(300, 300)).toBe('Đúng rồi! Trong ống có 300 ml nước.');
    expect(pourMessage(1000, 1000)).toContain('1 l = 1 000 ml');
  });

  it('makes targets on a mark, different from the one on screen', () => {
    const rand = rng(32);
    const bad = [];
    for (let i = 0; i < 100; i++) {
      const t = makeTarget(rand, FIRST_TARGET);
      if (t === FIRST_TARGET || t < 50 || t > 1000 || t % 50 !== 0) bad.push(t);
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

  it('keeps every stored answer right', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]).replaceAll(GROUP, '');
        const n = parseInt(right, 10);
        if (q.visual && n !== q.visual.ml) bad.push(q);
        const l = /^(\d) l bằng/.exec(q.prompt);
        if (l && n !== Number(l[1]) * 1000) bad.push(q);
        const sum = /^(\d+) ml ([+−×]) (\d+)( ml)? = /.exec(q.prompt);
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
