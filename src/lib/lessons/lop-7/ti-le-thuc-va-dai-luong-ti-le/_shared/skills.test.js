import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { PAGE_10_SKILLS, dayTiSo, tiLeThuc } from './skills.js';
import { intText, readInteger } from './numbers.js';

/**
 * Recomputes an answer from the prompt alone, by trying every integer: the
 * generators never share code with this check.
 * @param {string} prompt
 */
function recompute(prompt) {
  const p = prompt.replace(/−/g, '-');
  /** @type {RegExpExecArray | null} */
  let m;
  if ((m = /^Tìm x, biết (\S+)\/(\S+) = (\S+)\/(\S+)\.$/.exec(p))) {
    const terms = m.slice(1, 5);
    const at = terms.indexOf('x');
    if (at >= 0) {
      const t = terms.map(Number);
      return solveFor((x) => {
        const v = [...t];
        v[at] = x;
        return v[0] * v[3] === v[1] * v[2] && v[1] !== 0 && v[3] !== 0;
      });
    }
  }
  if ((m = /^Tìm x, biết \(x ([+-]) (\d+)\)\/(\d+) = (-?\d+)\/(\d+)\.$/.exec(p))) {
    const e = (m[1] === '+' ? 1 : -1) * Number(m[2]);
    const [b, c, d] = [Number(m[3]), Number(m[4]), Number(m[5])];
    return solveFor((x) => (x + e) * d === b * c);
  }
  if (p.startsWith('Có bao nhiêu cặp tỉ số')) {
    const pairs = [...p.matchAll(/(\d+) : (\d+) và (\d+) : (\d+)/g)];
    return pairs.filter((q) => Number(q[1]) * Number(q[4]) === Number(q[2]) * Number(q[3])).length;
  }
  if ((m = /^Cho x\/(\d+) = y\/(\d+) và x ([+-]) y = (-?\d+)\. Tính ([xy])\.$/.exec(p))) {
    const [a, b, k] = [Number(m[1]), Number(m[2]), Number(m[4])];
    const sign = m[3] === '+' ? 1 : -1;
    // x = a·t and y = b·t for the common value t.
    const t = solveFor((t) => a * t + sign * b * t === k);
    return m[5] === 'x' ? a * t : b * t;
  }
  if (
    (m = /^Cho x\/(\d+) = y\/(\d+) = z\/(\d+) và x \+ y - z = (-?\d+)\. Tính ([xyz])\.$/.exec(p))
  ) {
    const [a, b, c, k] = m.slice(1, 5).map(Number);
    const t = solveFor((t) => a * t + b * t - c * t === k);
    return { x: a, y: b, z: c }[/** @type {'x' | 'y' | 'z'} */ (m[5])] * t;
  }
  m = /(\d+) (?:quyển sách|cây|cm), .*tỉ lệ với (\d+); (\d+); (\d+)\. (.*)$/.exec(p);
  if (m) {
    const n = Number(m[1]);
    const r = [Number(m[2]), Number(m[3]), Number(m[4])];
    const ask = m[5];
    const i = /7A|Tổ 1|số thứ nhất/.test(ask) ? 0 : /7B|Tổ 2|số thứ hai/.test(ask) ? 1 : 2;
    const t = solveFor((t) => (r[0] + r[1] + r[2]) * t === n);
    return r[i] * t;
  }
  throw new Error(`no recompute rule for: ${prompt}`);
}

/**
 * The single integer from −500 to 500 that satisfies `ok`.
 * @param {(x: number) => boolean} ok
 */
function solveFor(ok) {
  const found = [];
  for (let x = -500; x <= 500; x++) if (ok(x)) found.push(x);
  if (found.length !== 1) throw new Error(`expected one solution, got ${found.length}`);
  return found[0];
}

describe('chapter skills', () => {
  for (const skill of [tiLeThuc, dayTiSo]) {
    it(`${skill.id}: every answer matches a fresh computation from the prompt`, () => {
      const rand = rng(2026);
      for (let i = 0; i < 400; i++) {
        const q = skill.make(rand);
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(recompute(q.prompt), q.prompt).toBe(q.answer);
        expect(q.steps.join(' '), q.prompt).toContain(intText(q.answer));
        expect(readInteger(intText(q.answer))).toBe(q.answer);
        for (const h of q.hints ?? []) expect(h).not.toMatch(/\bundefined\b|NaN/);
        expect(q.prompt).not.toMatch(/\bundefined\b|NaN|--|\+ -/);
      }
    });
  }

  it('builds a page set with no repeated prompt', () => {
    for (let seed = 1; seed < 30; seed++) {
      const set = buildSet(PAGE_10_SKILLS, 5, seed);
      expect(set).toHaveLength(10);
      expect(new Set(set.map((q) => q.prompt)).size).toBe(10);
    }
  });
});
