import { describe, it, expect } from 'vitest';
import { eqTex, eqText, linText, pairText, substituteText } from '#lib/core/algebra-text.js';
import { rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  SKILLS_TRANG_19,
  heCong,
  heThe,
  lapHe,
  nghiemHe,
  phuongTrinh,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** @param {string} s */
const num = (s) => Number(s.replace(/−/g, '-').replace(/\s|\u202f/g, ''));

/**
 * Reads a printed equation 'ax + by = c' back into coefficients,
 * independently of the writer.
 * @param {string} text
 */
function readEq(text) {
  const [left, right] = text.split(' = ');
  const src = left.replace(/\s/g, '').replace(/−/g, '-');
  let a = 0;
  let b = 0;
  for (const m of src.matchAll(/([+-]?)(\d*)([xy])/g)) {
    const v = (m[1] === '-' ? -1 : 1) * (m[2] === '' ? 1 : Number(m[2]));
    if (m[3] === 'x') a += v;
    else b += v;
  }
  return { a, b, c: num(right) };
}

const EQ = '(−?\\d*x(?: [+−] \\d*y)?|−?\\d*y) = (−?[\\d\u202f]+)';

describe('equation text', () => {
  it('writes equations the book way', () => {
    expect(eqText(2, -3, -5)).toBe('2x − 3y = −5');
    expect(eqText(-1, 1, 4)).toBe('−x + y = 4');
    expect(eqText(0, 2, 6)).toBe('2y = 6');
    expect(eqText(3, 0, 0)).toBe('3x = 0');
    expect(eqTex(-1, -2, -3)).toBe('-x - 2y = -3');
    expect(pairText(2, -1)).toBe('(2; −1)');
    expect(substituteText(2, -3, 3, -1)).toBe('2 · 3 − 3 · (−1) = 9');
    expect(substituteText(-1, 1, 2, 5)).toBe('−2 + 5 = 3');
    expect(linText(-1, 0)).toBe('−x');
    expect(linText(3, -2)).toBe('3x − 2');
    expect(linText(0, 5)).toBe('5');
  });

  it('reads back what it writes', () => {
    for (const [a, b, c] of [
      [2, -3, -5],
      [-1, 1, 4],
      [0, -1, 7],
      [5, 0, -12],
    ]) {
      expect(readEq(eqText(a, b, c))).toEqual({ a, b, c });
    }
  });
});

describe('every chapter skill', () => {
  it('lists the skills of the practice lesson, then the word problems', () => {
    expect(CHAPTER_SKILLS).toEqual([...SKILLS_TRANG_19, lapHe]);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(5);
  });

  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} gives integer answers with hints and a worked solution`, () => {
      for (const q of sample(skill)) {
        expect(Number.isInteger(q.answer), q.prompt).toBe(true);
        expect(q.steps.length).toBeGreaterThan(1);
        expect(q.hints?.length).toBeGreaterThan(0);
        const all = q.prompt + q.steps.join(' ') + (q.hints ?? []).join(' ');
        expect(all, all).not.toMatch(
          /undefined|NaN|Infinity|null|--|\+ −|\+ -|−−|- |\(\)|(?<!\d)[01][xy]| {2}/,
        );
        const asked = /Tìm (m|x|y)\b/.exec(q.prompt)?.[1];
        for (const hint of asked ? (q.hints ?? []) : []) {
          const said = new RegExp(`${asked} = ${String(q.answer).replace('-', '−')}(?!\\d)`);
          expect(hint, q.prompt).not.toMatch(said);
        }
      }
    });
  }
});

describe('answers recomputed from the prompts', () => {
  it('a single equation', () => {
    for (const q of sample(phuongTrinh)) {
      let m = /Cặp số \((−?\d+); y\) là một nghiệm của phương trình (.+)\. Tìm y/.exec(q.prompt);
      if (m) {
        const { a, b, c } = readEq(m[2]);
        expect(a * num(m[1]) + b * q.answer, q.prompt).toBe(c);
        continue;
      }
      m = /cặp số \((−?\d+); (−?\d+)\) .* phương trình mx ([+−]) (\d*)y = (−?\d+)/.exec(q.prompt);
      if (m) {
        const b = (m[3] === '−' ? -1 : 1) * (m[4] === '' ? 1 : Number(m[4]));
        expect(q.answer * num(m[1]) + b * num(m[2]), q.prompt).toBe(num(m[5]));
        continue;
      }
      m = /phương trình (.+) cắt trục Oy/.exec(q.prompt);
      expect(m, q.prompt).not.toBeNull();
      const { b, c } = readEq(/** @type {RegExpExecArray} */ (m)[1]);
      expect(b * q.answer, q.prompt).toBe(c);
    }
  });

  it('a solution of a system', () => {
    for (const q of sample(nghiemHe)) {
      const eqs = [...q.prompt.matchAll(new RegExp(EQ, 'g'))].map((m) => readEq(m[0]));
      const pairs = [...q.prompt.matchAll(/\((\d)\) \((−?\d+); (−?\d+)\)/g)].map((m) => ({
        i: Number(m[1]),
        x: num(m[2]),
        y: num(m[3]),
      }));
      expect(eqs.length).toBe(2);
      expect(pairs.length).toBe(3);
      const good = pairs.filter((p) => eqs.every((e) => e.a * p.x + e.b * p.y === e.c));
      expect(
        good.map((p) => p.i),
        q.prompt,
      ).toEqual([q.answer]);
    }
  });

  for (const skill of [heThe, heCong]) {
    it(`solves the system of ${skill.id}`, () => {
      for (const q of sample(skill)) {
        const eqs = [...q.prompt.matchAll(new RegExp(EQ, 'g'))].map((m) => readEq(m[0]));
        expect(eqs.length, q.prompt).toBe(2);
        const [e1, e2] = eqs;
        const det = e1.a * e2.b - e2.a * e1.b;
        expect(det).not.toBe(0);
        const x = (e1.c * e2.b - e2.c * e1.b) / det;
        const y = (e1.a * e2.c - e2.a * e1.c) / det;
        expect(q.answer, q.prompt).toBe((/Tìm x\.$/.test(q.prompt) ? x : y) + 0);
        if (skill === heThe) expect(Math.abs(e1.b), q.prompt).toBe(1);
        if (skill === heCong) {
          for (const v of [e1.a, e1.b, e2.a, e2.b]) expect(Math.abs(v)).toBeGreaterThan(1);
        }
      }
    });
  }

  it('word problems', () => {
    for (const q of sample(lapHe)) {
      let m = /(\d+) con, (\d+) chân chẵn\. Hỏi có bao nhiêu con (gà|chó)/.exec(q.prompt);
      if (m) {
        const heads = Number(m[1]);
        const legs = Number(m[2]);
        const dogs = (legs - 2 * heads) / 2;
        expect(q.answer).toBe(m[3] === 'chó' ? dogs : heads - dogs);
        expect(dogs).toBeGreaterThan(0);
        expect(heads - dogs).toBeGreaterThan(0);
        continue;
      }
      m =
        /giá (\d+) nghìn đồng và vé trẻ em giá (\d+) nghìn đồng\. Một buổi chiếu bán được ([\d\u202f]+) vé, thu được ([\d\u202f]+) nghìn đồng\. Hỏi bán được bao nhiêu vé (người lớn|trẻ em)/.exec(
          q.prompt,
        );
      if (m) {
        const [p, c, n, money] = [m[1], m[2], m[3], m[4]].map(num);
        const adults = (money - c * n) / (p - c);
        expect(q.answer).toBe(m[5] === 'người lớn' ? adults : n - adults);
        continue;
      }
      m =
        /Mua (\d) kg \S+ và (\d) kg \S+ hết ([\d\u202f]+) nghìn đồng; mua (\d) kg \S+ và (\d) kg \S+ hết ([\d\u202f]+) nghìn đồng\. Hỏi giá 1 kg (\S+)/.exec(
          q.prompt,
        );
      if (m) {
        const [m1, n1, t1, m2, n2, t2] = m.slice(1, 7).map(num);
        const det = m1 * n2 - m2 * n1;
        const x = (t1 * n2 - t2 * n1) / det;
        const y = (m1 * t2 - m2 * t1) / det;
        const first = /Mua \d kg (\S+)/.exec(q.prompt)?.[1];
        expect(q.answer, q.prompt).toBe(m[7] === first ? x : y);
        continue;
      }
      m =
        /cách nhau ([\d\u202f]+) km, .* gặp nhau sau (\d) giờ\. .* nhanh hơn xe đi từ B (\d+) km\. Tính vận tốc của xe đi từ (A|B)/.exec(
          q.prompt,
        );
      expect(m, q.prompt).not.toBeNull();
      const [s, t, d] = /** @type {RegExpExecArray} */ (m).slice(1, 4).map(num);
      const fast = (s / t + d) / 2;
      expect(q.answer, q.prompt).toBe(
        /** @type {RegExpExecArray} */ (m)[4] === 'A' ? fast : fast - d,
      );
    }
  });
});
