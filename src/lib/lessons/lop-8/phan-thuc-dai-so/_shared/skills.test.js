import { describe, expect, it } from 'vitest';
import { buildSet, hintsFor, rng } from '#lib/core/drill.js';
import { readNumber, numberText } from '#lib/core/decimal.js';
import {
  CHAPTER_SKILLS,
  SKILLS_TRANG_13,
  SKILLS_TRANG_23,
  congTru,
  fracText,
  nhanChia,
  phanThuc,
  substText,
  tinhChat,
} from './skills.js';
import { lcm } from './factors.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * Reads a polynomial in x as the prompts print it ('x² − 4x + 4') into a
 * function of x, independently of the writer.
 * @param {string} text
 * @returns {(x: number) => number}
 */
function poly(text) {
  const src = text.replace(/−/g, '-').replace(/\s+/g, '');
  const terms = src.match(/[+-]?[^+-]+/g) ?? [];
  const parsed = terms.map((t) => {
    const m = /^([+-]?)(\d*)(x?)([⁰¹²³⁴⁵⁶⁷⁸⁹]*)$/.exec(t);
    if (!m) throw new Error(`cannot read ${text}`);
    const sign = m[1] === '-' ? -1 : 1;
    const coef = m[2] === '' ? 1 : Number(m[2]);
    const exp = m[3] === '' ? 0 : m[4] === '' ? 1 : SUP.indexOf(m[4]);
    return { c: sign * coef, e: exp };
  });
  return (x) => parsed.reduce((s, { c, e }) => s + c * x ** e, 0);
}

/**
 * The fractions (top)/(bottom) or top/(bottom) of a prompt.
 * @param {string} prompt
 */
function fractions(prompt) {
  return [...prompt.matchAll(/(?:\(([^()]+)\)|([\dx²³A]+))\/\(([^()]+)\)/g)].map((m) => ({
    top: m[1] ?? m[2],
    bottom: m[3],
  }));
}

/** @param {string} prompt */
function at(prompt) {
  const m = /tại x = (−?\d+)/.exec(prompt);
  if (!m) throw new Error(prompt);
  return Number(m[1].replace('−', '-'));
}

describe('writers', () => {
  it('write fractions and substitutions the book way', () => {
    expect(fracText([3, 1], [-8, 2])).toBe('(x + 3)/(2x − 8)');
    expect(fracText([1], [0, 0, 6])).toBe('1/(6x²)');
    expect(fracText([0, 0, 6], [0, 0, 1])).toBe('6x²/x²');
    expect(substText([-1, 3, 1], -2)).toBe('(−2)² + 3 · (−2) − 1');
    expect(substText([4, 1], 3)).toBe('3 + 4');
  });
});

describe('chapter skills', () => {
  it('list one skill per lesson', () => {
    expect(SKILLS_TRANG_13.map((s) => s.id)).toEqual(['phan-thuc', 'tinh-chat']);
  });

  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives readable answers with hints and a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isFinite(q.answer)).toBe(true);
        expect(readNumber(numberText(q.answer).replace('−', '-'))).toBeCloseTo(q.answer, 9);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(hintsFor({ skill: skill.id, ...q }).length).toBeGreaterThan(0);
        expect(q.prompt).not.toMatch(/undefined|NaN|\+ −|− −/);
      }
    });
  }

  it('phan-thuc answers match the fractions in the prompts', () => {
    for (const q of sample(phanThuc)) {
      const [f, g] = fractions(q.prompt);
      const top = poly(f.top);
      const bottom = poly(f.bottom);
      if (q.prompt.includes('không xác định')) {
        expect(bottom(q.answer)).toBe(0);
        if (q.prompt.includes('giá trị dương')) expect(q.answer).toBeGreaterThan(0);
      } else if (q.prompt.startsWith('Tính giá trị')) {
        const t = at(q.prompt);
        expect(bottom(t)).not.toBe(0);
        expect(q.answer).toBeCloseTo(top(t) / bottom(t), 9);
      } else {
        // A/D = top/bottom, so A(t) = top(t) · D(t) / bottom(t).
        const t = at(q.prompt);
        const d = poly(g.bottom);
        expect(q.answer).toBeCloseTo((top(t) * d(t)) / bottom(t), 9);
      }
    }
  });

  it('tinh-chat answers match the prompts', () => {
    for (const q of sample(tinhChat)) {
      if (q.prompt.startsWith('Rút gọn')) {
        const [f] = fractions(q.prompt);
        const t = at(q.prompt);
        const bottom = poly(f.bottom);
        expect(bottom(t)).not.toBe(0);
        expect(q.answer).toBeCloseTo(poly(f.top)(t) / bottom(t), 9);
      } else if (q.prompt.startsWith('Mẫu thức chung')) {
        const m = /1\/\((\d+)x[²³]?\) và 1\/\((\d+)x[²³]?\)/.exec(q.prompt);
        if (!m) throw new Error(q.prompt);
        expect(q.answer).toBe(lcm(Number(m[1]), Number(m[2])));
      } else {
        // Extra factor x + m of the first denominator: (x + m) · first = x² − a².
        const m = /1\/\(([^()]+)\) và 1\/\(([^()]+)\)/.exec(q.prompt);
        if (!m) throw new Error(q.prompt);
        const first = poly(m[1]);
        const second = poly(m[2]);
        for (const x of [-3, 0, 2, 7])
          expect((x + q.answer) * first(x) - second(x)).toBeCloseTo(0, 9);
      }
    }
  });

  it('build a practice set without repeated prompts', () => {
    const set = buildSet(SKILLS_TRANG_13, 5, 1);
    expect(set).toHaveLength(10);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(10);
  });
});

const OPERAND = String.raw`(?:\(([^()]+)\)|([\dx²³]+))(?:\/(?:\(([^()]+)\)|([\dx²³]+)))?`;
const BINARY = new RegExp(`${OPERAND} ([+−·:]) ${OPERAND}`);

/**
 * The first binary operation between two fractions (or a fraction and a
 * polynomial) in a prompt, as a function of x.
 * @param {string} prompt
 * @returns {(x: number) => number}
 */
function operation(prompt) {
  const m = BINARY.exec(prompt);
  if (!m) throw new Error(prompt);
  const side = (/** @type {number} */ i) => {
    const top = poly(m[i] ?? m[i + 1]);
    const bottomText = m[i + 2] ?? m[i + 3];
    const bottom = bottomText ? poly(bottomText) : () => 1;
    return (/** @type {number} */ x) => top(x) / bottom(x);
  };
  const f = side(1);
  const g = side(6);
  const op = m[5];
  return (x) =>
    op === '+' ? f(x) + g(x) : op === '−' ? f(x) - g(x) : op === '·' ? f(x) * g(x) : f(x) / g(x);
}

describe('operation skills', () => {
  it('list one skill per lesson after page 13', () => {
    expect(SKILLS_TRANG_23.map((s) => s.id)).toEqual(['cong-tru', 'nhan-chia']);
    expect(CHAPTER_SKILLS.map((s) => s.id)).toEqual([
      'phan-thuc',
      'tinh-chat',
      'cong-tru',
      'nhan-chia',
    ]);
  });

  it('cong-tru answers match the operations in the prompts', () => {
    for (const q of sample(congTru)) {
      const e = operation(q.prompt);
      if (q.prompt.includes('Kết quả là một số')) {
        for (const x of [-7.5, 0.5, 11.25]) expect(e(x)).toBeCloseTo(q.answer, 9);
      } else if (q.prompt.startsWith('Biết')) {
        const m = /= k\/\(([^()]+)\)/.exec(q.prompt);
        if (!m) throw new Error(q.prompt);
        const d = poly(m[1]);
        for (const x of [-7.5, 0.5, 11.25]) expect(e(x) * d(x)).toBeCloseTo(q.answer, 9);
      } else {
        const t = at(q.prompt);
        expect(Number.isFinite(e(t))).toBe(true);
        expect(q.answer).toBeCloseTo(e(t), 9);
      }
    }
  });

  it('nhan-chia answers match the operations in the prompts', () => {
    for (const q of sample(nhanChia)) {
      const t = at(q.prompt);
      if (q.prompt.includes('nghịch đảo')) {
        const [f] = fractions(q.prompt);
        const top = poly(f.top)(t);
        expect(top).not.toBe(0);
        expect(q.answer).toBeCloseTo(poly(f.bottom)(t) / top, 9);
      } else {
        const m = BINARY.exec(q.prompt);
        if (!m) throw new Error(q.prompt);
        // Every denominator and the divisor's numerator are non-zero at t.
        for (const text of [m[3], m[4], m[8], m[9], m[5] === ':' ? (m[6] ?? m[7]) : undefined])
          if (text) expect(poly(text)(t)).not.toBe(0);
        expect(q.answer).toBeCloseTo(operation(q.prompt)(t), 9);
      }
    }
  });

  it('build a practice set without repeated prompts', () => {
    const set = buildSet(SKILLS_TRANG_23, 5, 1);
    expect(set).toHaveLength(10);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(10);
  });
});
