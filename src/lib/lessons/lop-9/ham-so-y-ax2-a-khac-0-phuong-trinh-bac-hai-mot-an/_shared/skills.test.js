import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import { SKILLS_TRANG_18 } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** A TeX number such as '-0{,}5' as a JS number. @param {string} s */
const num = (s) => Number(s.replace('{,}', '.').replace(/\s/g, ''));

/**
 * Coefficients [a, b, c] of a polynomial written by `quadTex`, read back from
 * its TeX: '-0{,}5x^{2} + 3x - 7' → [-0.5, 3, -7].
 * @param {string} tex
 */
function parsePoly(tex) {
  const out = [0, 0, 0];
  const s = tex.replace(/\s/g, '');
  const re = /([+-]?)([\d{},]*)(x(?:\^\{2\})?)?/g;
  let m;
  while ((m = re.exec(s)) && m[0] !== '') {
    const sign = m[1] === '-' ? -1 : 1;
    const mag = m[2] === '' ? 1 : num(m[2]);
    const power = m[3] === undefined ? 0 : m[3] === 'x' ? 1 : 2;
    out[2 - power] += sign * mag;
  }
  return out;
}

/**
 * Real roots of ax² + bx + c = 0, larger first.
 * @param {number[]} coefs
 */
function roots([a, b, c]) {
  const d = b * b - 4 * a * c;
  if (d < -1e-9) return [];
  const s = Math.sqrt(Math.max(0, d));
  return [(-b + s) / (2 * a), (-b - s) / (2 * a)].sort((p, q) => q - p);
}

/**
 * Recomputes the answer from the prompt alone.
 * @param {string} prompt
 */
function solve(prompt) {
  let m = /^Cho hàm số \$y = (.+)\$\. Tính giá trị của \$y\$ tại \$x = (.+)\$\.$/.exec(prompt);
  if (m) {
    const x = num(m[2]);
    return parsePoly(m[1])[0] * x * x;
  }
  m = /^Đồ thị của hàm số \$y = ax\^2\$ đi qua điểm \$A\((.+); (.+)\)\$\. Tìm \$a\$\.$/.exec(
    prompt,
  );
  if (m) return num(m[2]) / num(m[1]) ** 2;
  m = /^Trên parabol \$y = (.+)\$, tìm hoành độ dương của điểm có tung độ bằng \$(.+)\$\.$/.exec(
    prompt,
  );
  if (m) return Math.sqrt(num(m[2]) / parsePoly(m[1])[0]);
  m = /^Tính biệt thức \$\\Delta\$ của phương trình \$(.+) = 0\$\.$/.exec(prompt);
  if (m) {
    const [a, b, c] = parsePoly(m[1]);
    return b * b - 4 * a * c;
  }
  m = /^Tính \$\\Delta'\$ của phương trình \$(.+) = 0\$\.$/.exec(prompt);
  if (m) {
    const [a, b, c] = parsePoly(m[1]);
    return (b / 2) ** 2 - a * c;
  }
  m = /^Tìm \$m\$ để phương trình \$(.+) \+ m = 0\$ có nghiệm kép\.$/.exec(prompt);
  if (m) {
    const [, b] = parsePoly(m[1]);
    return (b * b) / 4;
  }
  m = /^Giải phương trình \$(.+) = 0\$\. Nhập nghiệm (lớn hơn|nhỏ hơn|khác \$0\$|dương)\.$/.exec(
    prompt,
  );
  if (m) {
    const r = roots(parsePoly(m[1]));
    expect(r.length).toBe(2);
    expect(r[0]).not.toBe(r[1]);
    const which = m[2];
    if (which === 'lớn hơn') return r[0];
    if (which === 'nhỏ hơn') return r[1];
    const pickOne = r.filter((x) => (which === 'dương' ? x > 0 : Math.abs(x) > 1e-9));
    expect(pickOne.length).toBe(1);
    return pickOne[0];
  }
  m = /^Phương trình \$(.+) = 0\$ có nghiệm kép\. Tìm nghiệm kép đó\.$/.exec(prompt);
  if (m) {
    const [a, b, c] = parsePoly(m[1]);
    expect(Math.abs(b * b - 4 * a * c)).toBeLessThan(1e-9);
    return -b / (2 * a);
  }
  throw new Error(`unknown prompt: ${prompt}`);
}

/** Every `$...$` span of a rich text. @param {string} text */
const texSpans = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('chapter skills', () => {
  for (const skill of SKILLS_TRANG_18) {
    it(`${skill.id}: answers match a fresh solution of the prompt`, () => {
      for (const q of sample(skill)) {
        const expected = solve(q.prompt);
        expect(Math.abs(q.answer - expected), q.prompt).toBeLessThan(1e-9);
      }
    });

    it(`${skill.id}: answers survive being typed back`, () => {
      for (const q of sample(skill, 300)) {
        expect(readNumber(numberText(q.answer)), q.prompt).toBe(q.answer);
      }
    });

    it(`${skill.id}: TeX parses in strict mode`, () => {
      for (const q of sample(skill, 200)) {
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          for (const tex of texSpans(text)) {
            expect(
              () => katex.renderToString(tex, { strict: 'error', throwOnError: true }),
              tex,
            ).not.toThrow();
          }
        }
      }
    });
  }

  it('reads coefficients back', () => {
    expect(parsePoly('-0{,}5x^{2} + 3x - 7')).toEqual([-0.5, 3, -7]);
    expect(parsePoly('x^{2} - x')).toEqual([1, -1, 0]);
    expect(parsePoly('-x^{2} + 4')).toEqual([-1, 0, 4]);
  });
});
