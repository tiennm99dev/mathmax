import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import { hoursText } from '#lib/core/number-format.js';
import { CHAPTER_SKILLS, SKILLS_TRANG_18, SKILLS_TRANG_28 } from './skills.js';

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
  m = /^Không giải phương trình, tính (tổng|tích) hai nghiệm của phương trình \$(.+) = 0\$\.$/.exec(
    prompt,
  );
  if (m) {
    const [a, b, c] = parsePoly(m[2]);
    const r = roots([a, b, c]);
    expect(r.length).toBe(2);
    return m[1] === 'tổng' ? r[0] + r[1] : r[0] * r[1];
  }
  m =
    /^Gọi \$x_1\$, \$x_2\$ là hai nghiệm của phương trình \$(.+) = 0\$\. Không giải phương trình, tính \$(.+)\$\.$/.exec(
      prompt,
    );
  if (m) {
    const [x1, x2] = roots(parsePoly(m[1]));
    if (m[2] === 'x_1^2 + x_2^2') return x1 ** 2 + x2 ** 2;
    if (m[2] === '(x_1 - x_2)^2') return (x1 - x2) ** 2;
    if (m[2] === 'x_1^3 + x_2^3') return x1 ** 3 + x2 ** 3;
  }
  m = /^Nhẩm nghiệm của phương trình \$(.+) = 0\$\. Nhập nghiệm khác \$(.+)\$\.$/.exec(prompt);
  if (m) {
    const known = num(m[2]);
    const r = roots(parsePoly(m[1]));
    expect(r.some((x) => Math.abs(x - known) < 1e-9)).toBe(true);
    const other = r.filter((x) => Math.abs(x - known) > 1e-9);
    expect(other.length).toBe(1);
    return other[0];
  }
  m =
    /^Tìm hai số biết tổng của chúng bằng \$(.+)\$ và tích bằng \$(.+)\$\. Nhập số (lớn|nhỏ) hơn\.$/.exec(
      prompt,
    );
  if (m) {
    const r = roots([1, -num(m[1]), num(m[2])]);
    return m[3] === 'lớn' ? r[0] : r[1];
  }
  m = /^Tích của hai số tự nhiên liên tiếp bằng \$(\d+)\$\. Tìm số nhỏ hơn\.$/.exec(prompt);
  if (m) {
    const p = Number(m[1]);
    for (let n = 0; n <= p; n++) if (n * (n + 1) === p) return n;
  }
  m =
    /^Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng \$(\d+)\$ m và diện tích bằng \$(\d+)\$ m²\./.exec(
      prompt,
    );
  if (m) return roots([1, Number(m[1]), -Number(m[2])])[0];
  m =
    /^Hai đội công nhân cùng làm một công việc thì hoàn thành sau (.+)\. Nếu làm riêng, đội I hoàn thành công việc nhanh hơn đội II \$(\d+)\$ giờ\./.exec(
      prompt,
    );
  if (m) {
    const t = readHours(m[1]);
    const k = Number(m[2]);
    // 1/x + 1/(x + k) = 1/t, solved by bisection on x > 0.
    return bisect((x) => 1 / x + 1 / (x + k) - 1 / t, 1e-6, 1000);
  }
  m =
    /^Một ô tô đi quãng đường \$(\d+)\$ km với vận tốc không đổi\. Nếu mỗi giờ ô tô đi nhanh hơn \$(\d+)\$ km thì đến nơi sớm hơn (.+)\. Tính/.exec(
      prompt,
    );
  if (m) {
    const [d, k, t] = [Number(m[1]), Number(m[2]), readHours(m[3])];
    return bisect((x) => d / x - d / (x + k) - t, 1e-6, 1000);
  }
  m = /^Giá một chiếc áo là \$(\d+)\$ nghìn đồng\..+ giá chiếc áo là \$(\d+)\$ nghìn đồng\./.exec(
    prompt,
  );
  if (m) return (Math.sqrt(Number(m[2]) / Number(m[1])) - 1) * 100;
  throw new Error(`unknown prompt: ${prompt}`);
}

/**
 * Hours written by `hoursText`: '$1$ giờ $12$ phút' → 1.2.
 * @param {string} text
 */
function readHours(text) {
  const h = /\$(\d+)\$ giờ/.exec(text);
  const m = /\$(\d+)\$ phút/.exec(text);
  return (h ? Number(h[1]) : 0) + (m ? Number(m[1]) / 60 : 0);
}

/**
 * The root of a decreasing-or-increasing f on [lo, hi] by bisection.
 * @param {(x: number) => number} f
 * @param {number} lo
 * @param {number} hi
 */
function bisect(f, lo, hi) {
  const sign = Math.sign(f(lo));
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (Math.sign(f(mid)) === sign) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Every `$...$` span of a rich text. @param {string} text */
const texSpans = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('chapter skills', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id}: answers match a fresh solution of the prompt`, () => {
      for (const q of sample(skill)) {
        const expected = solve(q.prompt);
        expect(Math.abs(q.answer - expected), q.prompt).toBeLessThan(1e-6);
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

  it('builds the practice sets from the chapter skills', () => {
    expect(CHAPTER_SKILLS).toEqual([...SKILLS_TRANG_18, ...SKILLS_TRANG_28]);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(CHAPTER_SKILLS.length);
  });

  it('reads hours back from the way prompts write them', () => {
    expect(readHours(hoursText(3.75))).toBe(3.75);
  });

  it('reads coefficients back', () => {
    expect(parsePoly('-0{,}5x^{2} + 3x - 7')).toEqual([-0.5, 3, -7]);
    expect(parsePoly('x^{2} - x')).toEqual([1, -1, 0]);
    expect(parsePoly('-x^{2} + 4')).toEqual([-1, 0, 4]);
  });
});
