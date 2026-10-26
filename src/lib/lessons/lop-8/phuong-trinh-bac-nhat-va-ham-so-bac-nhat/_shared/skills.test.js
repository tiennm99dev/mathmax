import { describe, expect, it } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  SKILLS_TRANG_37,
  SKILLS_TRANG_55,
  hamSo,
  hamSoBacNhat,
  heSoGoc,
  lapPhuongTrinh,
  phuongTrinh,
} from './skills.js';
import { numberText } from '#lib/core/decimal.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * One side of an equation as the prompts print it ('3(x − 2) + 4',
 * '(x + 1)/3') turned into a function of x, independently of the writer.
 * @param {string} text
 * @returns {(x: number) => number}
 */
function side(text) {
  const js = text
    .replace(/−/g, '-')
    .replace(/·/g, '*')
    .replace(/x²/g, '(x*x)')
    .replace(/(\d)\s*(?=[x(])/g, '$1*')
    .replace(/\)\s*(?=[x(])/g, ')*');
  if (!/^[\d\sx+\-*/().]+$/.test(js)) throw new Error(`cannot read ${text}`);
  return /** @type {(x: number) => number} */ (new Function('x', `return ${js};`));
}

/** @param {string} eq */
function equation(eq) {
  const [l, r] = eq.split(' = ').map(side);
  return (/** @type {number} */ x) => l(x) - r(x);
}

/**
 * A number as the prompts print it: '−3', '13,5', '1 250'.
 * @param {string} text
 */
const num = (text) => Number(text.replace(/−/g, '-').replace(',', '.').replace(/\s/g, ''));

/**
 * The point '(p; q)' that follows `label` in a prompt.
 * @param {string} text
 * @param {string} label
 */
function point(text, label = '') {
  const m = new RegExp(`${label}\\((−?\\d+); (−?\\d+)\\)`).exec(text);
  if (!m) throw new Error(`no point in ${text}`);
  return [num(m[1]), num(m[2])];
}

/**
 * The right-hand side of every 'y = ...' line in a prompt, cut before the
 * next word, with the parameter `name` replaced by `value`.
 * @param {string} prompt
 * @param {string} name
 * @param {number} value
 */
function lines(prompt, name = '', value = 0) {
  return [
    ...prompt.matchAll(
      /y = (?:f\(x\) = )?([^ac-ln-wyzA-Zđàáảãạ.?]*?[^\s])(?= (?:với|song|và|cắt|đi|có)|\.|$)/g,
    ),
  ].map((m) => side(name ? m[1].replaceAll(name, `(${value})`) : m[1]));
}

describe('chapter drill skills', () => {
  it('every equation question has the stored answer as its only root', () => {
    for (const q of sample(phuongTrinh)) {
      const m = /Giải phương trình (.+)\. Nhập nghiệm x\./.exec(q.prompt);
      expect(m, q.prompt).not.toBeNull();
      const f = equation(/** @type {RegExpExecArray} */ (m)[1]);
      expect(f(q.answer)).toBeCloseTo(0, 9);
      expect(Math.abs(f(q.answer + 1))).toBeGreaterThan(1e-9);
    }
  });

  it('every word problem states an equation whose root gives the answer', () => {
    for (const q of sample(lapPhuongTrinh)) {
      const line = q.steps.find((s) => s.startsWith('Phương trình: '));
      expect(line, q.prompt).toBeDefined();
      const f = equation(/** @type {string} */ (line).slice('Phương trình: '.length, -1));
      const root = -f(0) / (f(1) - f(0));
      expect(Number.isInteger(Math.round(root * 1e9) / 1e9), q.prompt).toBe(true);
      expect(root).toBeGreaterThan(0);
      if (q.unit === 'sản phẩm') {
        const per = Number(/mỗi ngày một tổ làm (\d+)/.exec(q.prompt)?.[1]);
        expect(q.answer).toBe(per * Math.round(root));
      } else {
        expect(q.answer).toBe(Math.round(root));
      }
      expect(q.steps.at(-1)).toContain(String(q.answer));
    }
  });

  it('every function question checks against its own formula', () => {
    for (const q of sample(hamSo)) {
      const p = q.prompt;
      if (p.includes('cho bởi bảng')) {
        const ys = /tương ứng = (.+)\. Tính/.exec(p)?.[1].split('; ').map(num) ?? [];
        const [i, j] = [...p.matchAll(/f\((−?\d)\)/g)].map((m) => num(m[1]) + 2);
        expect(q.answer, p).toBe(ys[i] + ys[j]);
      } else if (p.includes('y = ax')) {
        const [x, y] = point(p, 'A');
        expect(q.answer * x).toBeCloseTo(y, 9);
      } else if (p.includes('Tìm x để')) {
        const f = side(/f\(x\) = (.+)\. Tìm/.exec(p)?.[1] ?? '');
        expect(f(q.answer), p).toBe(num(/f\(x\) = (−?\d+)\.$/.exec(p)?.[1] ?? ''));
      } else {
        const [f] = lines(p);
        expect(f(num(/Tính f\((−?\d+)\)/.exec(p)?.[1] ?? '')), p).toBe(q.answer);
      }
      expect(q.steps.at(-1)).toContain(numberText(q.answer));
    }
    for (const q of sample(hamSoBacNhat)) {
      const p = q.prompt;
      if (p.includes('trục hoành')) {
        const [f] = lines(p);
        expect(f(q.answer), p).toBeCloseTo(0, 9);
      } else if (p.includes('Tìm m')) {
        const [f] = lines(p, 'm', q.answer);
        const [x, y] = point(p, 'A');
        expect(f(x), p).toBe(y);
        expect(f(1) - f(0), p).not.toBe(0);
      } else if (p.includes('Tìm b')) {
        const [f] = lines(p, 'b', q.answer);
        const [x, y] = point(p, 'B');
        expect(f(x), p).toBe(y);
      } else if (p.includes('taxi')) {
        const t = side(/T\(x\) = (.+) \(nghìn/.exec(p)?.[1] ?? '');
        expect(t(q.answer), p).toBe(num(/trả (.+) nghìn/.exec(p)?.[1] ?? ''));
      } else {
        const v = side(/V\(x\) = (.+) \(triệu/.exec(p)?.[1] ?? '');
        expect(v(q.answer), p).toBeCloseTo(num(/còn (\S+) triệu đồng\?/.exec(p)?.[1] ?? ''), 9);
        expect(q.answer).toBeGreaterThan(0);
      }
      expect(q.steps.at(-1)).toContain(numberText(q.answer));
    }
    for (const q of sample(heSoGoc)) {
      const p = q.prompt;
      if (p.startsWith('Tìm hệ số góc')) {
        const f = side(/y = (.+?)\.(?: \(|$)/.exec(p)?.[1] ?? '');
        expect(f(1) - f(0), p).toBeCloseTo(q.answer, 9);
      } else if (p.includes('song song')) {
        const [f, g] = lines(p, 'm', q.answer);
        expect(f(1) - f(0), p).toBe(g(1) - g(0));
        expect(f(0), p).not.toBe(g(0));
      } else if (p.includes('trục tung')) {
        const [f, g] = lines(p, 'm', q.answer);
        expect(f(0), p).toBe(g(0));
        expect(f(1) - f(0), p).not.toBe(g(1) - g(0));
      } else if (p.includes('cắt nhau tại điểm A')) {
        const [f, g] = lines(p);
        const x = -(f(0) - g(0)) / (f(1) - f(0) - (g(1) - g(0)));
        expect(p.includes('tung độ') ? f(x) : x, p).toBeCloseTo(q.answer, 9);
      } else {
        const a = num(/hệ số góc bằng (−?\d+)/.exec(p)?.[1] ?? '');
        const [x, y] = point(p);
        expect(a * x + q.answer, p).toBe(y);
      }
      expect(q.steps.at(-1)).toContain(numberText(q.answer));
    }
  });

  it('writes the book minus sign and no doubled signs', () => {
    for (const q of CHAPTER_SKILLS.flatMap((skill) => sample(skill))) {
      for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
        expect(text).not.toMatch(/[+−] [+−]|\d-|(?<![fTV])\(x\)/);
      }
    }
  });

  it('builds a full practice set without repeats', () => {
    const set = buildSet(SKILLS_TRANG_37, 5, 7);
    expect(set).toHaveLength(10);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(10);
  });

  it('builds the function practice set and the chapter test without repeats', () => {
    for (const [skills, per] of /** @type {const} */ ([
      [SKILLS_TRANG_55, 4],
      [CHAPTER_SKILLS, 2],
    ])) {
      for (const seed of [1, 2, 3]) {
        const set = buildSet(skills, per, seed);
        expect(set).toHaveLength(skills.length * per);
        expect(new Set(set.map((q) => q.prompt)).size).toBe(set.length);
      }
    }
  });
});
