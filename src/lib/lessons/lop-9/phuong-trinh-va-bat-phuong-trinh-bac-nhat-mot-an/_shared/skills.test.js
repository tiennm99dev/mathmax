import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  factorText,
  linTex,
  linText,
  signedFracTex,
  signedFracText,
} from '#lib/core/algebra-text.js';
import {
  CHAPTER_SKILLS,
  SKILLS_TRANG_36,
  batDangThuc,
  batPhuongTrinh,
  chuaAnOMau,
  phuongTrinhTich,
  thucTe,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** @param {string} s */
const num = (s) => Number(s.replace(/−/g, '-').replace(/\s/g, ''));

/**
 * Evaluates a printed linear expression such as '−3x + 5' at x,
 * independently of the writer.
 * @param {string} text
 * @param {number} x
 */
function lin(text, x) {
  const src = text.replace(/\s/g, '').replace(/−/g, '-');
  let total = 0;
  for (const m of src.matchAll(/([+-]?)(\d*)(x?)/g)) {
    if (m[0] === '') continue;
    const sign = m[1] === '-' ? -1 : 1;
    if (m[3] === 'x') total += sign * (m[2] === '' ? 1 : Number(m[2])) * x;
    else if (m[2] !== '') total += sign * Number(m[2]);
  }
  return total;
}

const RANGE = Array.from({ length: 401 }, (_, i) => i - 200);

describe('linear text', () => {
  it('writes expressions and fractions the book way', () => {
    expect(linText(-1, 0)).toBe('−x');
    expect(linText(3, -2)).toBe('3x − 2');
    expect(linText(0, 5)).toBe('5');
    expect(linText(0, 0)).toBe('0');
    expect(linTex(-2, 7)).toBe('-2x + 7');
    expect(factorText(-4)).toBe('x + 4');
    expect(factorText(0)).toBe('x');
    expect(signedFracTex(3, -7)).toBe('-\\frac{3}{7}');
    expect(signedFracTex(-6, -3)).toBe('2');
    expect(signedFracText(-3, -7)).toBe('3/7');
    expect(signedFracText(10, -4)).toBe('−5/2');
  });

  it('reads back what it writes', () => {
    for (let a = -5; a <= 5; a++) {
      for (let b = -9; b <= 9; b++) {
        expect(lin(linText(a, b), 3)).toBe(3 * a + b);
      }
    }
  });
});

describe('every chapter skill', () => {
  it('lists the skills of the practice lesson, then inequalities and applications', () => {
    expect(CHAPTER_SKILLS).toEqual([...SKILLS_TRANG_36, batPhuongTrinh, thucTe]);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(5);
  });

  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives integer answers with hints and a clean worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer), q.prompt).toBe(true);
        expect(q.steps.length).toBeGreaterThanOrEqual(2);
        expect(q.hints?.length ?? 0).toBeGreaterThanOrEqual(1);
        const all = [q.prompt, ...q.steps, ...(q.hints ?? [])].join(' ');
        expect(all, all).not.toMatch(
          /NaN|undefined|Infinity|\+ −|− −|\+ -|- |\b1x\b|\(\)|\(x\)|(^|[^\d])1\(/,
        );
        // Hints must not print the answer as the final result.
        for (const h of q.hints ?? []) {
          expect(h, h).not.toMatch(new RegExp(`là ${String(q.answer).replace('-', '−')}\\.$`));
        }
      }
    });
  }
});

describe('answers recomputed from the prompts', () => {
  it('product equations', () => {
    for (const q of sample(phuongTrinhTich)) {
      /** @type {RegExpExecArray | null} */
      let m;
      if ((m = /^Giải phương trình \((.+)\)\((.+)\) = 0\. Nhập nghiệm lớn hơn\.$/.exec(q.prompt))) {
        const [f1, f2] = [m[1], m[2]];
        const roots = RANGE.filter((x) => lin(f1, x) * lin(f2, x) === 0);
        expect(roots).toHaveLength(2);
        expect(q.answer).toBe(Math.max(...roots));
      } else if (
        (m = /^Giải phương trình x\((.+)\) ([+−]) (\d*)\((.+)\) = 0\. Nhập nghiệm nhỏ hơn\.$/.exec(
          q.prompt,
        ))
      ) {
        const k = (m[2] === '+' ? 1 : -1) * Number(m[3] || 1);
        const f = m[1];
        expect(m[4]).toBe(f);
        const roots = RANGE.filter((x) => x * lin(f, x) + k * lin(f, x) === 0);
        expect(roots).toHaveLength(2);
        expect(q.answer).toBe(Math.min(...roots));
      } else if (
        (m = /^Phương trình x² = (.+) có hai nghiệm\. Nhập nghiệm khác 0\.$/.exec(q.prompt))
      ) {
        const rhs = m[1];
        const roots = RANGE.filter((x) => x * x === lin(rhs, x));
        expect(roots).toHaveLength(2);
        expect(roots).toContain(0);
        expect(q.answer).toBe(roots.find((x) => x !== 0));
      } else {
        throw new Error(`unexpected prompt: ${q.prompt}`);
      }
    }
  });

  it('equations with the unknown in the denominator', () => {
    for (const q of sample(chuaAnOMau)) {
      /** @type {RegExpExecArray | null} */
      let m;
      /** @type {number[]} */
      let roots;
      if ((m = /^Giải phương trình (?:\((.+)\)|(x))\/\((.+)\) = (−?\d+)\.$/.exec(q.prompt))) {
        const [n, d, k] = [m[1] ?? m[2], m[3], num(m[4])];
        roots = RANGE.filter((x) => lin(d, x) !== 0 && lin(n, x) === k * lin(d, x));
      } else if (
        (m = /^Giải phương trình (−?\d+)\/\((.+)\) = (−?\d+)\/\((.+)\)\.$/.exec(q.prompt))
      ) {
        const [c1, d1, c2, d2] = [num(m[1]), m[2], num(m[3]), m[4]];
        roots = RANGE.filter(
          (x) => lin(d1, x) !== 0 && lin(d2, x) !== 0 && c1 * lin(d2, x) === c2 * lin(d1, x),
        );
      } else if ((m = /^Giải phương trình x²\/\((.+)\) = (\d+)\/\((.+)\)\.$/.exec(q.prompt))) {
        const [d, k] = [m[1], num(m[2])];
        roots = RANGE.filter((x) => lin(d, x) !== 0 && x * x === k);
      } else {
        throw new Error(`unexpected prompt: ${q.prompt}`);
      }
      expect(roots, q.prompt).toEqual([q.answer]);
    }
  });

  it('inequalities and their properties', () => {
    for (const q of sample(batDangThuc)) {
      /** @type {RegExpExecArray | null} */
      let m;
      if ((m = /^Cho x ≥ (−?\d+)\. Tìm giá trị nhỏ nhất của biểu thức (.+)\.$/.exec(q.prompt))) {
        const lo = num(m[1]);
        const expr = m[2];
        const values = RANGE.filter((x) => x >= lo).map((x) => lin(expr, x));
        expect(q.answer).toBe(Math.min(...values));
      } else if (
        (m = /^Cho x ≤ (−?\d+)\. Tìm giá trị nhỏ nhất của biểu thức (.+)\.$/.exec(q.prompt))
      ) {
        const hi = num(m[1]);
        const expr = m[2];
        const values = RANGE.filter((x) => x <= hi).map((x) => lin(expr, x));
        expect(q.answer).toBe(Math.min(...values));
      } else if ((m = /^Cho a < b\. So sánh (.+) và (.+): nhập 1/.exec(q.prompt))) {
        const [l, r] = [m[1].replace('a', 'x'), m[2].replace('b', 'x')];
        const less = lin(l, 1) < lin(r, 2);
        expect(q.answer).toBe(less ? 1 : 2);
        // Same verdict for another pair a < b.
        expect(lin(l, -3) < lin(r, 4)).toBe(less);
      } else {
        throw new Error(`unexpected prompt: ${q.prompt}`);
      }
    }
  });

  it('first-degree inequalities', () => {
    /** @type {Record<string, (u: number, v: number) => boolean>} */
    const OPS = {
      '<': (u, v) => u < v,
      '>': (u, v) => u > v,
      '≤': (u, v) => u <= v,
      '≥': (u, v) => u >= v,
    };
    for (const q of sample(batPhuongTrinh)) {
      /** @type {RegExpExecArray | null} */
      let m;
      if (
        (m =
          /^Tìm số nguyên (nhỏ nhất|lớn nhất) thoả mãn bất phương trình (.+) ([<>≤≥]) (.+)\.$/.exec(
            q.prompt,
          ))
      ) {
        const op = OPS[m[3]];
        const [l, r] = [m[2], m[4]];
        const good = RANGE.filter((x) => op(lin(l, x), lin(r, x)));
        expect(good.length).toBeGreaterThan(0);
        // The solution set is a ray, so the extreme must not be at the edge of the search.
        const ans = m[1] === 'nhỏ nhất' ? Math.min(...good) : Math.max(...good);
        expect(Math.abs(ans)).toBeLessThan(150);
        expect(q.answer, q.prompt).toBe(ans);
      } else if (
        (m = /^Có bao nhiêu số nguyên dương x thoả mãn bất phương trình (.+) ([<>≤≥]) 0\?$/.exec(
          q.prompt,
        ))
      ) {
        const op = OPS[m[2]];
        const expr = m[1];
        const count = RANGE.filter((x) => x > 0 && op(lin(expr, x), 0)).length;
        expect(q.answer, q.prompt).toBe(count);
      } else {
        throw new Error(`unexpected prompt: ${q.prompt}`);
      }
    }
  });

  it('word problems', () => {
    for (const q of sample(thucTe)) {
      /** @type {RegExpExecArray | null} */
      let m;
      if (
        (m =
          /có (\d[\d\u202f]*) nghìn đồng\. Bạn mua .+ giá (\d+) nghìn đồng .+ giá (\d+) nghìn đồng/.exec(
            q.prompt,
          ))
      ) {
        const [money, f, u] = [num(m[1]), num(m[2]), num(m[3])];
        const ok = RANGE.filter((x) => x >= 0 && f + u * x <= money);
        expect(q.answer).toBe(Math.max(...ok));
        expect(q.unit).toBeTruthy();
      } else if (
        (m = /tối đa (\d[\d\u202f]*) kg\. Một người nặng (\d+) kg .+ mỗi thùng nặng (\d+) kg/.exec(
          q.prompt,
        ))
      ) {
        const [T, d, w] = [num(m[1]), num(m[2]), num(m[3])];
        const ok = RANGE.filter((x) => x >= 0 && d + w * x <= T);
        expect(q.answer).toBe(Math.max(...ok));
      } else if (
        (m = /thu (\d+) nghìn đồng mỗi tháng và (\d+) nghìn đồng .+ thu (\d+) nghìn đồng/.exec(
          q.prompt,
        ))
      ) {
        const [F, p1, p2] = [num(m[1]), num(m[2]), num(m[3])];
        const ok = RANGE.filter((x) => x >= 0 && F + p1 * x < p2 * x);
        expect(q.answer).toBe(Math.min(...ok));
      } else {
        throw new Error(`unexpected prompt: ${q.prompt}`);
      }
    }
  });
});
