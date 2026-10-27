import { describe, it, expect } from 'vitest';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { buildSet, hintsFor, rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, SKILLS_TRANG_79, TRIPLES, rounded } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const R = Math.PI / 180;
const fn = {
  sin: (/** @type {number} */ d) => Math.sin(d * R),
  cos: (/** @type {number} */ d) => Math.cos(d * R),
  tan: (/** @type {number} */ d) => Math.tan(d * R),
  cot: (/** @type {number} */ d) => 1 / Math.tan(d * R),
};
const num = (/** @type {string} */ s) => /** @type {number} */ (readNumber(s));
const near = (/** @type {number} */ a, /** @type {number} */ b, tol = 1e-9) =>
  Math.abs(a - b) <= tol;

/** Special-angle values, computed from the functions themselves. */
function special(/** @type {string} */ term) {
  const m = /^(sin|cos|tan|cot)(²?) ?(\d+)°$/.exec(term);
  if (!m) throw new Error(term);
  const v = fn[/** @type {keyof typeof fn} */ (m[1])](Number(m[3]));
  return m[2] ? v * v : v;
}

/**
 * Recomputes a question's answer from its prompt alone, independently of
 * the generators: the value before rounding and the rounding step.
 * @param {string} p
 * @returns {{ value: number, step: number }}
 */
function solve(p) {
  let m = /^Tam giác ABC vuông tại A có (.+)\. Tính (sin|cos|tan|cot) ([BC]) \(/.exec(p);
  if (m) {
    /** @type {Record<string, number>} */
    const s = {};
    for (const [, k, v] of m[1].matchAll(/(AB|AC|BC) = (\d+)/g)) s[k] = Number(v);
    if (!s.BC) s.BC = Math.hypot(s.AB, s.AC);
    if (!s.AB) s.AB = Math.sqrt(s.BC ** 2 - s.AC ** 2);
    if (!s.AC) s.AC = Math.sqrt(s.BC ** 2 - s.AB ** 2);
    const opp = m[3] === 'B' ? s.AC : s.AB;
    const adj = m[3] === 'B' ? s.AB : s.AC;
    const v = { sin: opp / s.BC, cos: adj / s.BC, tan: opp / adj, cot: adj / opp }[m[2]];
    return { value: /** @type {number} */ (v), step: 0 };
  }
  m = /^Tính (\d?)(\S+ \d+°|\S+°) ([+−]) (\d?)(\S+ \d+°|\S+°) \(/.exec(p);
  if (m) {
    const a = Number(m[1] || 1);
    const b = Number(m[4] || 1);
    const v = a * special(m[2]) + (m[3] === '−' ? -b : b) * special(m[5]);
    return { value: v, step: 0 };
  }
  m = /^Tìm góc nhọn x \(theo độ\) biết (\w+) x = (\w+) (\d+)°\.$/.exec(p);
  if (m) {
    const target = fn[/** @type {keyof typeof fn} */ (m[2])](Number(m[3]));
    const f = fn[/** @type {keyof typeof fn} */ (m[1])];
    for (let x = 1; x < 90; x++) if (near(f(x), target, 1e-12)) return { value: x, step: 0 };
    throw new Error(p);
  }
  m =
    /^Không dùng máy tính, tính (?:(\d)·)?sin (\d+)° \/ cos (\d+)° \+ (?:(\d)·)?tan (\d+)°·tan (\d+)°\.$/.exec(
      p,
    );
  if (m) {
    const v =
      Number(m[1] || 1) * (fn.sin(Number(m[2])) / fn.cos(Number(m[3]))) +
      Number(m[4] || 1) * fn.tan(Number(m[5])) * fn.tan(Number(m[6]));
    return { value: v, step: 0 };
  }
  m = /^Dùng máy tính cầm tay, tính (\w+) (\d+)°/.exec(p);
  if (m) return { value: fn[/** @type {keyof typeof fn} */ (m[1])](Number(m[2])), step: 3 };
  m = /^Tìm góc nhọn α .* biết (sin|cos|tan) α = ([\d,]+)\.$/.exec(p);
  if (m) {
    const r = num(m[2]);
    const inv = { sin: Math.asin, cos: Math.acos, tan: Math.atan }[m[1]];
    return { value: /** @type {(x: number) => number} */ (inv)(r) / R, step: 1 };
  }
  m = /^Tam giác ABC vuông tại A có (\w+) = (\d+) cm, góc ([BC]) = (\d+)°\. Tính (\w+) \(cm/.exec(
    p,
  );
  if (m) {
    const given = m[1];
    const s = Number(m[2]);
    const B = m[3] === 'B' ? Number(m[4]) : 90 - Number(m[4]);
    // Rebuild the whole triangle from BC = 1 and scale.
    const unit = { BC: 1, AC: fn.sin(B), AB: fn.cos(B) };
    const k = s / unit[/** @type {'BC' | 'AC' | 'AB'} */ (given)];
    return { value: k * unit[/** @type {'BC' | 'AC' | 'AB'} */ (m[5])], step: 0.1 };
  }
  m = /^Tam giác ABC vuông tại A có AB = (\d+) cm, AC = (\d+) cm\. Tính góc ([BC])/.exec(p);
  if (m) {
    const B = Math.atan2(Number(m[2]), Number(m[1])) / R;
    return { value: m[3] === 'B' ? B : 90 - B, step: 1 };
  }
  m = /^Tam giác ABC vuông tại A có BC = (\d+) cm, (AB|AC) = (\d+) cm\. Tính góc ([BC])/.exec(p);
  if (m) {
    const bc = Number(m[1]);
    const leg = Number(m[3]);
    const other = Math.sqrt(bc * bc - leg * leg);
    const ab = m[2] === 'AB' ? leg : other;
    const ac = m[2] === 'AC' ? leg : other;
    const B = Math.atan2(ac, ab) / R;
    return { value: m[4] === 'B' ? B : 90 - B, step: 1 };
  }
  m =
    /^Giác kế cao ([\d,]+) m đặt cách chân toà nhà (\d+) m, góc nâng ngắm đỉnh toà nhà là (\d+)°/.exec(
      p,
    );
  if (m) return { value: num(m[1]) + Number(m[2]) * fn.tan(Number(m[3])), step: 0.1 };
  m = /^Thang dài (\d+) m dựa vào tường, tạo với mặt đất góc (\d+)°/.exec(p);
  if (m) return { value: Number(m[1]) * fn.sin(Number(m[2])), step: 0.1 };
  m = /^Bóng một cột điện trên mặt đất dài (\d+) m, tia nắng tạo với mặt đất góc (\d+)°/.exec(p);
  if (m) return { value: Number(m[1]) * fn.tan(Number(m[2])), step: 0.1 };
  m = /^Từ đỉnh ngọn hải đăng cao (\d+) m, nhìn một con thuyền với góc hạ (\d+)°/.exec(p);
  if (m) return { value: Number(m[1]) * fn.cot(Number(m[2])), step: 1 };
  m = /^Một con dốc dài (\d+) m, đỉnh dốc cao hơn chân dốc (\d+) m/.exec(p);
  if (m) return { value: Math.asin(Number(m[2]) / Number(m[1])) / R, step: 1 };
  throw new Error(`unparsed prompt: ${p}`);
}

describe('chapter drill skills', () => {
  it('has a matching answer key for every generated question', () => {
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        const { value, step } = solve(q.prompt);
        if (step === 0) {
          expect(near(q.answer, value, 1e-9), q.prompt).toBe(true);
        } else {
          const places = step === 3 ? 3 : step === 0.1 ? 1 : 0;
          expect(Math.abs(q.answer - value), q.prompt).toBeLessThanOrEqual(
            0.5 * 10 ** -places + 1e-9,
          );
        }
      }
    }
  });

  it('stores answers exactly as a learner types them', () => {
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 300)) {
        expect(readNumber(numberText(q.answer).replace('−', '-')), q.prompt).toBe(q.answer);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(hintsFor({ skill: skill.id, ...q }).length).toBeGreaterThan(0);
        expect(q.prompt).not.toMatch(/\d\.\d/);
      }
    }
  });

  it('builds full sets without repeats', () => {
    const set = buildSet(CHAPTER_SKILLS, 2, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(12);
    expect(buildSet(SKILLS_TRANG_79, 2, 7)).toHaveLength(10);
  });

  it('rounds away from boundaries and keeps triples Pythagorean', () => {
    expect(rounded(7.9488, 1)).toBe(7.9);
    expect(rounded(2.25, 1)).toBeNull();
    expect(rounded(109.899, 0)).toBe(110);
    for (const [a, b, c] of TRIPLES) expect(a * a + b * b).toBe(c * c);
  });
});
