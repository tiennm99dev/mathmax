import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { resultOf } from '#lib/core/kid/column.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { carryCount } from '../_shared/columns.js';
import { KIND_LABELS, SAME_RESULT, buildRound, oneCarry, platesFor } from './engine.js';

/**
 * The value of "3 × 4" or "12 : 3".
 * @param {string} text
 */
function evaluate(text) {
  const m = text.match(/(\d+) ([×:]) (\d+)/);
  if (!m) throw new Error(`not a calculation: ${text}`);
  return m[2] === '×' ? Number(m[1]) * Number(m[3]) : Number(m[1]) / Number(m[3]);
}

/**
 * The number of the right option, without its unit.
 * @param {import('#lib/core/kid/quiz.js').KidQuestion<any>} q
 */
const chosen = (q) => parseInt(optionText(q.options[q.answer]).replace(/\s/g, ''), 10);

/**
 * Every question of a kind over many rounds.
 * @param {keyof typeof KIND_LABELS} kind
 */
function questionsOf(kind) {
  const found = [];
  for (let seed = 1; seed <= 60; seed++) {
    const q = buildRound(seed).find((x) => x.kind === kind);
    if (q) found.push(q);
  }
  return found;
}

describe('multiplying and dividing with 1 and 0 on plates', () => {
  it('puts the right fruit on the plates', () => {
    expect(platesFor('nhan-1', 3).plates).toEqual([1, 1, 1]);
    expect(platesFor('nhan-0', 3).plates).toEqual([0, 0, 0]);
    expect(platesFor('chia-1', 3).plates).toEqual([3]);
    expect(platesFor('chia-so-0', 3).plates).toEqual([0, 0, 0]);
  });

  it('says the sentence of each rule', () => {
    expect(platesFor('nhan-1', 3).words).toContain('1 × 3 = 1 + 1 + 1 = 3');
    expect(platesFor('nhan-0', 3).words).toContain('0 × 3 = 0 + 0 + 0 = 0');
    expect(platesFor('chia-1', 3).line).toBe('3 : 1 = 3');
    expect(platesFor('chia-so-0', 3).line).toBe('0 : 3 = 0');
  });
});

describe('the mixed round', () => {
  it('asks every part once, with the right option among distinct ones', () => {
    const kinds = Object.keys(KIND_LABELS).sort();
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const round = buildRound(seed);
      if (
        round
          .map((q) => q.kind)
          .sort()
          .join() !== kinds.join()
      )
        bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (new Set(texts).size !== texts.length) bad.push([seed, q.kind, texts]);
        if (texts.length < 3) bad.push([seed, q.kind, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q.kind, 'index']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps column calculations to one carry and a result below 1 000', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const { a, b, op, result } = oneCarry(rng(seed));
      if (result !== resultOf(a, b, op) || result > 999 || carryCount(a, b, op) !== 1) {
        bad.push([a, b, op]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('computes the column answer', () => {
    const bad = questionsOf('dat-tinh').filter((q) => {
      if (q.visual?.type !== 'column') return true;
      return chosen(q) !== resultOf(q.visual.a, q.visual.b, q.visual.op);
    });
    expect(bad).toEqual([]);
  });

  it('writes a number as its hundreds, tens and ones', () => {
    const bad = questionsOf('cau-tao').filter((q) => {
      const n = Number(q.prompt.match(/\d+/)?.[0]);
      const parts = optionText(q.options[q.answer]).split(' + ').map(Number);
      const sum = parts.reduce((s, p) => s + p, 0);
      return sum !== n || parts[0] % 100 !== 0 || parts[1] % 10 !== 0 || parts[2] > 9;
    });
    expect(bad).toEqual([]);
  });

  it('finds the extreme weight', () => {
    const bad = questionsOf('so-sanh').filter((q) => {
      const kgs = [...q.prompt.matchAll(/(\D+?) nặng (\d+) kg/g)].map((m) => ({
        name: m[1].replace(/^[.\s]+/, ''),
        kg: Number(m[2]),
      }));
      const best = q.prompt.includes('nhẹ nhất')
        ? kgs.reduce((x, y) => (y.kg < x.kg ? y : x))
        : kgs.reduce((x, y) => (y.kg > x.kg ? y : x));
      return best.name !== optionText(q.options[q.answer]);
    });
    expect(bad).toEqual([]);
  });

  it('finds the missing number', () => {
    const bad = questionsOf('tim-so').filter((q) => {
      const x = chosen(q);
      const m = q.prompt.match(/^(\?|\d+) ([+−]) (\?|\d+) = (\d+)/);
      if (!m) return true;
      const left = m[1] === '?' ? x : Number(m[1]);
      const right = m[3] === '?' ? x : Number(m[3]);
      return (m[2] === '+' ? left + right : left - right) !== Number(m[4]);
    });
    expect(bad).toEqual([]);
  });

  it('finds the missing factor or divisor', () => {
    const bad = questionsOf('tim-thua-so').filter((q) => {
      const x = chosen(q);
      const m = q.prompt.match(/^(\d+) ([×:]) \? = (\d+)/);
      if (!m) return true;
      const value = m[2] === '×' ? Number(m[1]) * x : Number(m[1]) / x;
      return value !== Number(m[3]);
    });
    expect(bad).toEqual([]);
  });

  it('answers the tables, 1 and 0', () => {
    const bad = [...questionsOf('bang'), ...questionsOf('voi-1'), ...questionsOf('voi-0')].filter(
      (q) => chosen(q) !== evaluate(q.prompt),
    );
    expect(bad).toEqual([]);
  });

  it('pairs calculations of one value and no other', () => {
    const wrong = SAME_RESULT.filter(([a, b, v]) => evaluate(a) !== v || evaluate(b) !== v);
    expect(wrong).toEqual([]);
    expect(new Set(SAME_RESULT.map((p) => p[2])).size).toBe(SAME_RESULT.length);
    const bad = questionsOf('cung-ket-qua').filter((q) => {
      const asked = q.prompt.match(/bằng (.+)\?/)?.[1] ?? '';
      const values = q.options.map((o) => evaluate(optionText(o)));
      const hits = values.filter((v) => v === evaluate(asked)).length;
      return hits !== 1 || values[q.answer] !== evaluate(asked);
    });
    expect(bad).toEqual([]);
  });

  it('solves the broken line and word problems', () => {
    const bad = [...questionsOf('gap-khuc'), ...questionsOf('bai-toan')].filter(
      (q) => chosen(q) !== evaluate(q.solution),
    );
    expect(bad).toEqual([]);
  });

  it('adds for more and subtracts for fewer', () => {
    const bad = questionsOf('nhieu-it').filter((q) => {
      const [a, b] = (q.prompt.match(/\d+/g) ?? []).map(Number);
      const right = q.prompt.includes('nhiều hơn') ? a + b : a - b;
      return chosen(q) !== right;
    });
    expect(bad).toEqual([]);
  });
});
