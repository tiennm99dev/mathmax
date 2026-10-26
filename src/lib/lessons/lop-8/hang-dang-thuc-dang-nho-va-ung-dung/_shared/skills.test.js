import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { intText } from '#lib/core/number-format.js';
import {
  CHAPTER_SKILLS,
  SKILLS_TRANG_40,
  SKILLS_TRANG_45,
  binhPhuong,
  datNhanTuChung,
  dungHangDangThuc,
  lapPhuong,
  nhomHangTu,
  tongHieuLapPhuong,
  vanDung,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * Turns a plain-text expression as the prompts print it ('2x(x − 3) + □')
 * into a function of x and y, independently of the generators. `fill` replaces
 * every box.
 * @param {string} text
 * @param {number} [fill]
 * @returns {(x: number, y?: number) => number}
 */
function expr(text, fill = 0) {
  const js = [...text.replace(/□/g, `(${fill})`).replace(/−/g, '-').replace(/·/g, '*')]
    .map((ch) => (SUP.includes(ch) ? `**${SUP.indexOf(ch)}` : ch))
    .join('')
    .replace(/(\d)\s+(\d)/g, '$1$2')
    .replace(/([\dxy)])(?=[xy(])/g, '$1*');
  return /** @type {(x: number, y?: number) => number} */ (
    new Function('x', 'y = 0', `return ${js};`)
  );
}

const XS = [-3, -1, 0, 2, 5, 7];

/**
 * Whether two expressions agree at several points.
 * @param {(x: number, y?: number) => number} f
 * @param {(x: number, y?: number) => number} g
 */
function same(f, g) {
  return XS.every((x) => XS.every((y) => f(x, y) === g(x, y)));
}

/**
 * The equation 'LHS = RHS' after a colon or "Viết … dưới dạng …".
 * @param {string} prompt
 * @param {number} answer
 */
function identityHolds(prompt, answer) {
  let m = /: (.+?) = (.+?)(?:, hai ô|\. Số|\.$)/.exec(prompt);
  if (m && !/^Phân tích/.test(prompt)) return same(expr(m[1], answer), expr(m[2], answer));
  m = /^Phân tích (.+?) thành nhân tử: (?:.+? = )?(.+?)(?:\. Số|, hai ô)/.exec(prompt);
  if (m) return same(expr(m[1]), expr(m[2], answer));
  m = /^Viết (.+?) dưới dạng (.+?)\. Số/.exec(prompt);
  if (m) return same(expr(m[1]), expr(m[2], answer));
  throw new Error(`unparsed: ${prompt}`);
}

describe('every chapter skill', () => {
  it('lists one skill per lesson or method', () => {
    expect(CHAPTER_SKILLS).toEqual([...SKILLS_TRANG_40, ...SKILLS_TRANG_45]);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(7);
  });

  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives integer answers with hints and a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.hints?.length).toBeGreaterThan(0);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.steps.at(-1)).toContain(intText(q.answer));
        expect(q.prompt).not.toMatch(/[+−-] [+−-]|\b1x|undefined|NaN/);
        for (const h of q.hints ?? []) expect(h).not.toMatch(/undefined|NaN/);
      }
    });
  }
});

describe('stored answers', () => {
  it('checks the number tricks and value questions', () => {
    for (const skill of [
      binhPhuong,
      lapPhuong,
      tongHieuLapPhuong,
      datNhanTuChung,
      dungHangDangThuc,
      vanDung,
    ]) {
      for (const { prompt, answer } of sample(skill)) {
        let m = /^Tính nhanh (.+)\.$/.exec(prompt);
        if (m) {
          expect(expr(m[1])(0)).toBe(answer);
          continue;
        }
        m = /^Tính giá trị của biểu thức (.+) tại x = (\d+)(?:, y = (\d+))?\.$/.exec(prompt);
        if (m) {
          expect(expr(m[1])(Number(m[2]), Number(m[3] ?? 0))).toBe(answer);
          continue;
        }
        m = /^Biết a \+ b = (\d+) và ab = (\d+)\. Tính a([²³]) \+ b[²³]\.$/.exec(prompt);
        if (m) {
          const s = Number(m[1]);
          const p = Number(m[2]);
          // Recover a and b as the roots of t² − st + p.
          const d = Math.sqrt(s * s - 4 * p);
          const a = (s + d) / 2;
          const b = (s - d) / 2;
          const e = m[3] === '²' ? 2 : 3;
          expect(Math.round(a ** e + b ** e)).toBe(answer);
          continue;
        }
        m = /^Khai triển (.+)([²³])\. Hệ số của (x²|x) trong/.exec(prompt);
        if (m) {
          const f = expr(`${m[1]}${m[2]}`);
          // Coefficients of a cubic or quadratic from its values at 0, ±1, 2.
          const [f0, f1, fm, f2] = [f(0), f(1), f(-1), f(2)];
          const c2 = (f1 + fm) / 2 - f0;
          const odd = (f1 - fm) / 2; // c1 + c3
          const c3 = ((f2 - f0 - 4 * c2) / 2 - odd) / 3;
          const c1 = odd - c3;
          expect(m[3] === 'x²' ? c2 : c1).toBe(answer);
          continue;
        }
        m = /^Rút gọn biểu thức (.+)\. Kết quả/.exec(prompt);
        if (m) {
          const f = expr(m[1]);
          for (const x of XS) expect(f(x)).toBe(answer);
          continue;
        }
        m = /^Tìm x (≠ 0 )?biết (.+) = 0\.$/.exec(prompt);
        if (m) {
          expect(expr(m[2])(answer)).toBe(0);
          if (m[1]) expect(answer).not.toBe(0);
          continue;
        }
        expect(identityHolds(prompt, answer)).toBe(true);
      }
    }
  });

  it('checks the grouping questions by substituting the answer', () => {
    for (const { prompt, answer } of sample(nhomHangTu)) {
      expect(identityHolds(prompt, answer)).toBe(true);
      // A wrong number in the box breaks the identity.
      expect(identityHolds(prompt, answer + 1)).toBe(false);
    }
  });

  it('rejects a wrong answer for every identity question', () => {
    for (const skill of CHAPTER_SKILLS) {
      for (const { prompt, answer } of sample(skill, 100)) {
        if (!prompt.includes('□')) continue;
        expect(identityHolds(prompt, answer)).toBe(true);
        expect(identityHolds(prompt, answer + 1)).toBe(false);
      }
    }
  });
});
