import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { SKILLS, divMessage, mulMessage, relatedDivisions, runningTotals } from './engine.js';

const SEEDS = Array.from({ length: 200 }, (_, i) => i + 1);

/** @param {string} id */
const skill = (id) => /** @type {(typeof SKILLS)[number]} */ (SKILLS.find((s) => s.id === id));

/**
 * The value of "a × b" or "a : b".
 * @param {string} text
 */
function evaluate(text) {
  const [a, sign, b] = text.trim().split(' ');
  return sign === '×' ? Number(a) * Number(b) : Number(a) / Number(b);
}

describe('the dot grid', () => {
  it('adds up row by row', () => {
    expect(runningTotals(5, 3)).toEqual([5, 10, 15]);
    expect(mulMessage(5, 3)).toBe('3 hàng, mỗi hàng 5 chấm. 5 + 5 + 5 = 15. 5 × 3 = 15.');
    expect(mulMessage(2, 1)).toBe('1 hàng, mỗi hàng 2 chấm. 2 × 1 = 2.');
  });

  it('turns a multiplication into two divisions', () => {
    expect(relatedDivisions(5, 3)).toEqual(['15 : 5 = 3', '15 : 3 = 5']);
    expect(divMessage(5, 3, 0)).toBe('Có 15 chấm. Em khoanh từng hàng 5 chấm.');
    expect(divMessage(5, 3, 2)).toBe('Đã khoanh 2 hàng, còn 5 chấm.');
    expect(divMessage(5, 3, 3)).toContain('15 : 5 = 3');
    expect(divMessage(5, 3, 3)).toContain('15 : 3 = 5');
  });
});

describe('review questions', () => {
  it('always has the right answer among distinct options', () => {
    const bad = [];
    for (const s of SKILLS) {
      for (const seed of SEEDS) {
        const q = s.make(rng(seed));
        const texts = q.options.map(optionText);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([s.id, seed, 'answer']);
        if (new Set(texts).size !== texts.length) bad.push([s.id, seed, texts]);
        if (texts.length < 2) bad.push([s.id, seed, 'few']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('computes tables', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const id of ['bang-nhan', 'bang-chia']) {
        const q = skill(id).make(rng(seed));
        const want = evaluate(q.prompt.replace(' = ?', ''));
        if (Number(q.options[q.answer]) !== want) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('offers exactly one true division of the given multiplication', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('lien-he').make(rng(seed));
      const holds = q.options.map((o) => {
        const [lhs, rhs] = optionText(o).split(' = ');
        return evaluate(lhs) === Number(rhs);
      });
      if (!holds[q.answer] || holds.filter(Boolean).length !== 1) bad.push(q.options);
    }
    expect(bad).toEqual([]);
  });

  it('matches the dot grid', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('luoi-cham').make(rng(seed));
      const v = q.visual;
      if (!v) {
        bad.push(seed);
        continue;
      }
      if (q.prompt.startsWith('Phép nhân')) {
        if (optionText(q.options[q.answer]) !== `${v.base} × ${v.rows} = ${v.base * v.rows}`) {
          bad.push(q.prompt);
        }
      } else if (Number(q.options[q.answer]) !== v.rows) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('continues a sequence', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('dem-them').make(rng(seed));
      const [a, b, c] = (q.prompt.match(/\d+/g) ?? []).map(Number);
      if (Number(q.options[q.answer]) !== c + (b - a) || c + (b - a) <= 0) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('compares with the right sign', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('so-sanh').make(rng(seed));
      const [l, r] = q.prompt.replace('Điền dấu: ', '').split(' ? ');
      if (q.options[q.answer] !== compareSign(evaluate(l), evaluate(r))) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('solves stories', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('bai-toan').make(rng(seed));
      const [a, b] = (q.prompt.match(/\d+/g) ?? []).map(Number);
      const asked = q.prompt.startsWith('Mỗi') ? a * b : a / b;
      if (Number(q.options[q.answer]) !== asked) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
